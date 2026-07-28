import { Link, useParams } from "react-router-dom"
import useProducts from "../hooks/useProducts"
import { use, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useForm } from "react-hook-form"

const ProductDetail = () => {
    const { id } = useParams()
    const {user} = use(AuthContext)
    const { data: products } = useProducts()
    const product = products?.find(p => p._id === id)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        const bid = {
        productId: product._id,
        productTitle: product.title,
        buyer: {
            name: data.buyerName,
            email: data.buyerEmail,
            imageURL: data.buyerImageURL,
            contact: data.contactInfo,
        },
        offeredPrice: parseFloat(data.price),
        status: 'Pending',
        postedAt: new Date(),
        }
        
        fetch('http://localhost:3000/bids', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bid)
        })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged) {
                    alert('success')
                }
            })
        reset()
        setIsModalOpen(false)
    }

    if (!product) return <p className="text-center mt-20">Loading...</p>

    return (
        <div className="min-h-screen py-10 px-6">
            <div className="max-w-6xl mx-auto">

                <div className="grid grid-cols-2 gap-8">

                {/* Left Column */}
                    <div className="flex flex-col gap-6">

                        {/* Product Image */}
                        <div className="bg-gray-200 rounded-lg overflow-hidden h-96">
                            <img
                                src={product.imageURL}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Product Description */}
                        <div className="bg-white rounded-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
                            <div className="flex items-center gap-10 border-b pb-4 mb-4">
                                <p className="text-sm">
                                <span className="text-purple-600 font-medium">Condition : </span>
                                <span className="font-medium">{product.condition}</span>
                                </p>
                                <p className="text-sm">
                                <span className="text-purple-600 font-medium">Usage Time : </span>
                                <span className="font-medium">{product.usageTime}</span>
                                </p>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-6">

                        <Link to="/products" className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-700">
                        ← Back To Products
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-3">{product.title}</h1>
                            <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
                                {product.category}
                            </span>
                        </div>

                        {/* Price */}
                        <div className="bg-white rounded-lg p-6">
                            <p className="text-3xl font-bold text-[#4CAF50]">
                                ${product.minPrice} - {product.maxPrice}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">Price starts from</p>
                        </div>

                        {/* Product Details */}
                        <div className="bg-white rounded-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Product Details</h2>
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-bold">Product ID: </span>
                                {product._id}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-bold">Posted: </span>
                                {new Date(product.postedAt).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Seller Information */}
                        <div className="bg-white rounded-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Seller Information</h2>
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                src={product.seller.imageURL}
                                alt={product.seller.name}
                                className="w-12 h-12 rounded-full object-cover bg-gray-200"
                                />
                                <div>
                                <p className="font-semibold text-gray-800">{product.seller.name}</p>
                                <p className="text-sm text-gray-400">{product.seller.email}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-bold">Location: </span>
                                {product.seller.location}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-bold">Contact: </span>
                                {product.seller.contact}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                                <span className="font-bold">Status: </span>
                                <span className="bg-[#FFC107] text-black text-xs px-3 py-1 rounded-full font-medium">
                                {product.status}
                                </span>
                            </p>
                        </div>

                        <div>

                        {/* Buy Button */}
                        <button
                            disabled={user?.email === product.seller.email}
                            onClick={() => setIsModalOpen(true)}
                            className={`w-full bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-white font-medium py-4 rounded-lg transition-colors duration-200 
                            ${user?.email === product.seller.email ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            {user?.email === product.seller.email ? 'This is Your Product' : 'I Want Buy This Product'}
                        </button>

                        {/* Modal */}
                        {isModalOpen && (
                        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
                            <div className='bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4'>

                                {/* Modal Header */}
                                <div className='border-b-2 border-dashed border-blue-300 p-6'>
                                    <h2 className='text-xl font-bold text-center text-gray-900'>
                                        Give Seller Your Offered Price
                                    </h2>
                                </div>

                                {/* Modal Body */}
                                <form onSubmit={handleSubmit(onSubmit)} className='p-6 flex flex-col gap-4'>

                                {/* Buyer Name & Email */}
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label className='text-sm font-medium text-gray-700'>Buyer Name</label>
                                        <input
                                            {...register('buyerName', { required: true })}
                                            type='text'
                                            placeholder='Your name'
                                            defaultValue={user?.displayName}
                                            className='w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm'
                                        />
                                    </div>
                                    <div>
                                        <label className='text-sm font-medium text-gray-700'>Buyer Email</label>
                                        <input
                                            {...register('buyerEmail', { required: true })}
                                            type='email'
                                            placeholder='Your Email'
                                            defaultValue={user?.email}
                                            className='w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm'
                                        />
                                    </div>
                                </div>

                                {/* Buyer Image URL */}
                                <div>
                                    <label className='text-sm font-medium text-gray-700'>Buyer Image URL</label>
                                    <input
                                    {...register('buyerImageURL')}
                                    type='text'
                                    placeholder='https://...your_img_url'
                                    defaultValue={user?.photoURL}
                                    className='w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm'
                                    />
                                </div>

                                {/* Place your Price */}
                                <div>
                                    <label className='text-sm font-medium text-gray-700'>Place your Price</label>
                                    <input
                                    {...register('price', { required: true })}
                                    type='number'
                                    placeholder='599'
                                    className='w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm'
                                    />
                                </div>

                                {/* Contact Info */}
                                <div>
                                    <label className='text-sm font-medium text-gray-700'>Contact Info</label>
                                    <input
                                    {...register('contactInfo', { required: true })}
                                    type='text'
                                    placeholder='e.g. +1-555-1234'
                                    className='w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm'
                                    />
                                </div>

                                {/* Buttons */}
                                <div className='flex items-center justify-end gap-3 mt-2'>
                                    <button
                                    type='button'
                                    onClick={() => setIsModalOpen(false)}
                                    className='px-6 py-2 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 transition-colors duration-200 font-medium'
                                    >
                                    Cancel
                                    </button>
                                    <button
                                    type='submit'
                                    className='px-6 py-2 bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-white cursor-pointer rounded-lg transition-colors duration-200 font-medium'
                                    >
                                    Submit Bid
                                    </button>
                                </div>

                                </form>
                            </div>
                            </div>
                        )}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
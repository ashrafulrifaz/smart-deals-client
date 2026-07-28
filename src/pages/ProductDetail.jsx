import { Link, useParams } from "react-router-dom"
import useProducts from "../hooks/useProducts"

const ProductDetail = () => {
    const { id } = useParams()
    const { data: products } = useProducts()
    const product = products?.find(p => p._id === id)

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

                        {/* Buy Button */}
                        <button className="w-full bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-white font-medium py-4 rounded-lg transition-colors duration-200 cursor-pointer">
                        I Want Buy This Product
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
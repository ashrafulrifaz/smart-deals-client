import { use } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const categories = [
  'Electronics',
  'Furniture',
  'Computers',
  'Photography',
  'Art And Hobbies',
  'Sports',
  'Clothing',
  'Books',
]

function CreateProduct() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { condition: 'Brand New' }
    })
    const {user} = use(AuthContext)
    const navigate = useNavigate()

    const onSubmit = (data) => {
        const newProduct = {
            title: data.title,
            category: data.category,
            minPrice: parseFloat(data.minPrice),
            maxPrice: data.maxPrice ? parseFloat(data.maxPrice) : parseFloat(data.minPrice),
            condition: data.condition,
            usageTime: data.usageTime,
            imageURL: data.imageURL,
            seller: {
                name: data.sellerName,
                email: data.sellerEmail,
                contact: data.sellerContact,
                imageURL: data.sellerImageURL,
                location: data.location,
            },
            description: data.description,
            status: 'On Sale',
            postedAt: new Date(),
        }
        
        fetch('http://localhost:3000/products', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged) {
                    navigate('/products')
                }
            })
    }

    const inputClass = 'w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm'
    const labelClass = 'text-sm font-medium text-gray-700'
    const errorClass = 'text-red-500 text-xs mt-1'

    return (
        <div className='min-h-screen bg-gray-100 py-10 px-4'>

        {/* Header */}
        <div className='text-center mb-6'>
            <Link to='/products' className='text-sm text-gray-500 flex items-center justify-center gap-1 mb-2'>
                ← Back To Products
            </Link>
            <h1 className='text-4xl font-bold text-gray-900'>
            Create <span className='text-purple-600'>A Product</span>
            </h1>
        </div>

        {/* Form */}
        <div className='bg-white max-w-3xl mx-auto rounded-2xl shadow p-8'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>

            {/* Title & Category */}
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className={labelClass}>Title</label>
                    <input
                        {...register('title', { required: 'Title is required' })}
                        type='text'
                        placeholder='e.g. Yamaha Fz Guitar for Sale'
                        className={inputClass}
                    />
                    {errors.title && <p className={errorClass}>{errors.title.message}</p>}
                </div>
                <div>
                    <label className={labelClass}>Category</label>
                    <select
                        {...register('category', { required: 'Category is required' })}
                        className={'w-full mt-1 px-4 py-2 h-9.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm'}
                    >
                        <option value=''>Select a Category</option>
                        {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    {errors.category && <p className={errorClass}>{errors.category.message}</p>}
                </div>
            </div>

            {/* Min & Max Price */}
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className={labelClass}>Min Price You want to Sale ($)</label>
                    <input
                        {...register('minPrice', { required: 'Min price is required' })}
                        type='number'
                        placeholder='e.g. 18.5'
                        className={inputClass}
                    />
                    {errors.minPrice && <p className={errorClass}>{errors.minPrice.message}</p>}
                </div>
                <div>
                    <label className={labelClass}>Max Price You want to Sale ($)</label>
                    <input
                        {...register('maxPrice')}
                        type='number'
                        placeholder='Optional (default = Min Price)'
                        className={inputClass}
                    />
                </div>
            </div>

            {/* Condition & Usage Time */}
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className={labelClass}>Product Condition</label>
                    <div className='flex items-center gap-6 mt-2'>
                        <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                            {...register('condition')}
                            type='radio'
                            value='Brand New'
                            className='accent-purple-600 w-5 h-5'
                        />
                        <span className='text-sm'>Brand New</span>
                        </label>
                        <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                            {...register('condition')}
                            type='radio'
                            value='Used'
                            className='accent-purple-600 w-5 h-5'
                        />
                        <span className='text-sm'>Used</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label className={labelClass}>Product Usage time</label>
                    <input
                        {...register('usageTime')}
                        type='text'
                        placeholder='e.g. 1 year 3 month'
                        className={inputClass}
                    />
                </div>
            </div>

            {/* Image URL */}
            <div>
                <label className={labelClass}>Your Product Image URL</label>
                <input
                {...register('imageURL', { required: 'Image URL is required' })}
                type='text'
                placeholder='https://...'
                className={inputClass}
                />
                {errors.imageURL && <p className={errorClass}>{errors.imageURL.message}</p>}
            </div>

            {/* Seller Name & Email */}
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className={labelClass}>Seller Name</label>
                    <input
                        {...register('sellerName', { required: 'Seller name is required' })}
                        type='text'
                        defaultValue={user?.displayName}
                        placeholder='e.g. Artisan Roasters'
                        className={inputClass}
                    />
                    {errors.sellerName && <p className={errorClass}>{errors.sellerName.message}</p>}
                </div>
                <div>
                    <label className={labelClass}>Seller Email</label>
                    <input
                        {...register('sellerEmail', { required: 'Seller email is required' })}
                        defaultValue={user?.email}
                        type='email'
                        placeholder='leli31955@nrlord.com'
                        className={inputClass}
                    />
                    {errors.sellerEmail && <p className={errorClass}>{errors.sellerEmail.message}</p>}
                </div>
            </div>

            {/* Seller Contact & Image URL */}
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className={labelClass}>Seller Contact</label>
                    <input
                        {...register('sellerContact')}
                        type='text'
                        placeholder='e.g. +1-555-1234'
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className={labelClass}>Seller Image URL</label>
                    <input
                        {...register('sellerImageURL')}
                        type='text'
                        defaultValue={user?.photoURL}
                        placeholder='https://...'
                        className={inputClass}
                    />
                </div>
            </div>

            {/* Location */}
            <div>
                <label className={labelClass}>Location</label>
                <input
                {...register('location')}
                type='text'
                placeholder='City, Country'
                className={inputClass}
                />
            </div>

            {/* Description */}
            <div>
                <label className={labelClass}>Simple Description about your Product</label>
                <textarea
                {...register('description', { required: 'Description is required' })}
                rows={4}
                placeholder='e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough.....'
                className={inputClass}
                />
                {errors.description && <p className={errorClass}>{errors.description.message}</p>}
            </div>

            {/* Submit */}
            <button
                type='submit'
                className='w-full bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-white font-medium py-3 rounded-lg transition-colors duration-200 cursor-pointer'
            >
                Create A Product
            </button>

            </form>
        </div>
        </div>
    )
}

export default CreateProduct
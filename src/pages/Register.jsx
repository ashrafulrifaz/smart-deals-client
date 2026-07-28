import { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const {createUser, signInWithGoogle} = use(AuthContext)
    const navigate = useNavigate()

    const onSubmit = (data) => {
        const newUser = {
            name: data.name,
            email: data.email,
            image: data.imageURL,
            password: data.password
        }

        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged) {
                    createUser(data.email, data.password)
                    navigate('/')
                } else {
                    navigate('/login')
                }
            })
    }

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                }
                fetch('http://localhost:3000/users', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        navigate('/')
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="py-12 flex items-center justify-center">
            <div className='bg-white p-10 rounded-md shadow-md w-1/3'>

                <h2 className='text-3xl font-bold text-center text-gray-900'>Register Now!</h2>
                <p className='text-center text-gray-500 mt-2'>
                Already have an account?{' '}
                <Link to='/login' className='text-purple-600 hover:underline'>Login Now</Link>
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col gap-4'>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Name</label>
                        <input
                        {...register('name', { required: 'Name is required' })}
                        type='text'
                        placeholder='Mariam Swarna'
                        className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                        />
                        {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Email</label>
                        <input
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Enter a valid email'
                            }
                        })}
                        type='email'
                        placeholder='smsowkothasan@gmail.com'
                        className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                        />
                        {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Image-URL</label>
                        <input
                        {...register('imageURL', {
                            required: 'Image URL is required',
                            pattern: {
                            value: /^https?:\/\/.+/,
                            message: 'Enter a valid URL'
                            }
                        })}
                        type='text'
                        placeholder='https://...'
                        className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                        />
                        {errors.imageURL && <p className='text-red-500 text-xs mt-1'>{errors.imageURL.message}</p>}
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Password</label>
                        <input
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                            }
                        })}
                        type='password'
                        placeholder='**************'
                        className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                        />
                        {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-white font-medium py-3 rounded-lg transition-colors duration-200 cursor-pointer'
                    >
                        Register
                    </button>

                </form>

                <div className='flex items-center gap-3 my-4'>
                <hr className='flex-1 border-gray-300' />
                <span className='text-gray-500 text-sm font-medium'>OR</span>
                <hr className='flex-1 border-gray-300' />
                </div>

                <button
                onClick={handleGoogleLogin}
                className='w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer'
                >
                    <img
                        src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
                        alt='Google'
                        className='w-5 h-5'
                    />
                    <span className='font-medium text-gray-700'>Sign Up With Google</span>
                </button>

            </div>
        </div>
    );
};

export default Register;
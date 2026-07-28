import { use, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const {pathname} = useLocation()
  const {user} = use(AuthContext)
  const [showLogout, setShowLogout] = useState(false)
  const {signOutUser} = use(AuthContext)
  
  const handleLogout = () => {
    signOutUser()
  }
  
  return (
    <div className='grid grid-cols-4 gap-4 items-center px-20 py-3 bg-white'>
      <div>
        <h3 className='text-2xl font-bold'>Smart<span className='bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Deals</span></h3>
      </div>
      <nav className='flex justify-center items-center gap-5 col-span-2'>
        <NavLink to="/" className={`${pathname === '/' ? 'text-[#9F62F2]' : 'text-black'}`}>Home</NavLink>
        <NavLink to="/products" className={`${pathname === '/products' ? 'text-[#9F62F2]' : 'text-black'}`}>All Products</NavLink>
        <NavLink to="/my-products" className={`${pathname === '/my-products' ? 'text-[#9F62F2]' : 'text-black'}`}>My Products</NavLink>
        <NavLink to="/my-bids" className={`${pathname === '/my-bids' ? 'text-[#9F62F2]' : 'text-black'}`}>My Bids</NavLink>
        <NavLink to="/create-product" className={`${pathname === '/create-product' ? 'text-[#9F62F2]' : 'text-black'}`}>Create Product</NavLink>
      </nav>
      {
        user ? 
        <div className='flex items-center justify-end relative'>
          <img
            src={user?.photoURL}
            alt={user?.name}
            onClick={() => setShowLogout(!showLogout)}
            className='w-10 h-10 rounded-full object-cover cursor-pointer'
          />
          {showLogout && (
            <div className='absolute top-12 right-0 bg-white shadow-lg rounded-lg p-2 z-50'>
              <button
                onClick={handleLogout}
                className='px-4 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-lg w-full text-left'
              >
                Logout
              </button>
            </div>
          )}
        </div>
        : 
        <div className='flex gap-3 items-center justify-end'>
          <Link to={'/login'} className='bg-linear-to-tr from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent border border-[#632EE3] rounded-sm py-1.5 px-5'>Login</Link>
          <Link to={'/register'} className='bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-white rounded-sm py-1.5 px-5'>Register</Link>
        </div>
      }
    </div>
  )
}

export default Navbar
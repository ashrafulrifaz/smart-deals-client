import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='grid grid-cols-3 gap-4 items-center px-20 py-3'>
      <div>
        <h3 className=''>Smart<span>Deals</span></h3>
      </div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>
    </div>
  )
}

export default Navbar
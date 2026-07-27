import { Link } from "react-router-dom";


const Hero = () => {
    return (
        <div className="bg-linear-to-br from-[#FFE6FD] to-[#E0F8F5] py-16 px-20 ">
            <h1 className="text-6xl font-bold leading-snug text-center text-[#001931]">Deal your <span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">Products</span> <br />in a <span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">Smart</span> way !</h1>
            <p className="text-lg mt-4 text-center text-[#627382] font-normal">SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!</p>
            <form className="flex items-center w-2/5 mx-auto mt-6 shadow-xl rounded-full">
                <input type="search" name="search" id="search" placeholder="search For Products, Categoriees..." className="w-full bg-white py-2.5 px-3 rounded-s-full text-sm focus:outline-0" />
                <button className="bg-linear-to-br from-[#632EE3] to-[#9F62F2] p-2.5 rounded-e-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 17L21 21"></path>
                        <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"></path>
                    </svg>
                </button>
            </form>
            <div className="mt-8 flex gap-4 justify-center items-center">
                <Link to={'/products'} className='bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-white rounded-sm py-2 px-2'>Watch All Products</Link>
                <Link to={'/create-product'} className='bg-linear-to-tr from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent border border-[#632EE3] rounded-sm py-1.5 px-2'>Post an Product</Link>
            </div>
        </div>
    );
};

export default Hero;
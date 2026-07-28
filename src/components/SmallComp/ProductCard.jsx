import { Link } from "react-router-dom";


const ProductCard = ({product}) => {
    const {title, minPrice, maxPrice, imageURL, _id} = product || {}

    return (
        <div className="p-2 pb-4 bg-white rounded-sm shadow-md">
            {/* <div className="w-full h-40 bg-gray-300 rounded-sm"></div> */}
            <img src={imageURL} alt="product image" className="rounded-sm h-72 w-full" />
            <h3 className="mt-4 text-lg text-[#001931]">{title}</h3>
            <h5 className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent mt-1 mb-4">$ {minPrice} - {maxPrice}</h5>
            <Link to={_id} className='bg-linear-to-tr from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent border border-[#632EE3] rounded-sm py-1.5 block text-center'>View Details</Link>
        </div>
    );
};

export default ProductCard;
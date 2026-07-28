import ProductCard from "../components/SmallComp/ProductCard";
import useProducts from "../hooks/useProducts";

const AllProducts = () => {
    const {data: products} = useProducts()
    
    return (
        <div className="py-20 px-20">
            <h2 className="text-center font-semibold text-3xl">All <span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">Products</span></h2>
            <div className="mt-6 grid grid-cols-3 gap-5">
                {
                    products?.map(product => (
                        <ProductCard key={product._id} product={product}></ProductCard>
                    ))
                }
            </div>
        </div>
    );
};

export default AllProducts;
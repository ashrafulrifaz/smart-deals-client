import ProductCard from "./SmallComp/ProductCard";


const Products = () => {
    return (
        <div className="py-12 px-20">
            <h2 className="text-center font-semibold text-3xl">Recent <span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">Products</span></h2>
            <div className="mt-6 grid grid-cols-3 gap-5">
                <ProductCard></ProductCard>
            </div>
        </div>
    );
};

export default Products;
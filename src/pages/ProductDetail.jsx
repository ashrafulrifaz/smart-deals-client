import useProducts from "../hooks/useProducts";


const ProductDetail = ({params}) => {
    console.log(params)
    const {data: products} = useProducts()
    // const singleProducts = products.find()

    return (
        <div>
            
        </div>
    );
};

export default ProductDetail;
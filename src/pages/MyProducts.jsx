import { use } from "react";
import useProducts from "../hooks/useProducts";
import { AuthContext } from "../context/AuthContext";

const MyProducts = () => {
    const { data: products = [] } = useProducts();
    const {user} = use(AuthContext)
    const myProducts = products?.filter(product => product?.seller?.email == user?.email)
    console.log(myProducts)

    return (
        <div className="py-16 px-20">
            <h2 className="text-center font-semibold text-3xl">My Products: <span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">{myProducts?.length}</span></h2>
            <div className="mt-10 rounded-lg bg-white">
                <table border="1" cellpadding="10" cellspacing="0" className="w-full border border-[#e9e9e9] text-left">
                    <thead className="border-b border-[#e9e9e9] bg-gray-50">
                        <tr>
                            <th className="font-medium text-[#001931] px-4 py-2">SL No</th>
                            <th className="font-medium text-[#001931] px-4 py-2">Image</th>
                            <th className="font-medium text-[#001931] px-4 py-2">Product Name</th>
                            <th className="font-medium text-[#001931] px-4 py-2">Category</th>
                            <th className="font-medium text-[#001931] px-4 py-2">Price</th>
                            <th className="font-medium text-[#001931] px-4 py-2">Status</th>
                            <th className="font-medium text-[#001931] px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {
                            myProducts?.map((product, idx) => (
                                <tr key={idx} className="border-b border-[#e9e9e9]">
                                    <th className="font-medium text-[#001931] px-4 py-2">
                                        {idx + 1}
                                    </th>

                                    {/* Product */}
                                    <td className="px-4 py-2">
                                        <img
                                            src={product?.imageURL}
                                            alt={product?.title}
                                            className="w-16 h-12 rounded-lg"
                                        />
                                    </td>

                                    {/* Seller */}
                                    <td className="px-4 py-2">
                                        {product?.title}
                                    </td>

                                    {/* Bid Price */}
                                    <td className="px-4 py-2 font-medium text-[#001931]">
                                        {product?.category}
                                    </td>

                                    <td className="px-4 py-2 font-medium text-[#001931]">
                                        ${product?.minPrice} - {product.maxPrice}
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-2">
                                        <span className="bg-[#FFC107] rounded-full text-sm px-2 py-1.5">
                                            {product?.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-2">
                                        <div className="flex gap-2 items-center">
                                            <button className="text-[#632EE3] border border-[#632EE3] rounded-md py-1 px-2 text-sm font-medium cursor-pointer">
                                                Edit
                                            </button>
                                            <button className="text-[#FF3D00] border border-[#FF3D00] rounded-md py-1 px-2 text-sm font-medium cursor-pointer">
                                                Delete
                                            </button>
                                            <button className="text-[#4CAF50] border border-[#4CAF50] rounded-md py-1 px-2 text-sm font-medium cursor-pointer">
                                                Make Sold
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;
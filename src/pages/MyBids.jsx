import { use } from "react";
import useBids from "../hooks/useBids";
import useProducts from "../hooks/useProducts";
import { AuthContext } from "../context/AuthContext";

const MyBids = () => {
    const {data: bids = [], refetch} = useBids()
    const { data: products = [] } = useProducts();
    const {user} = use(AuthContext)

    const productMap = Object.fromEntries(
        products.map(product => [product._id, product])
    );

    const handleDeleteBid = (id) => {
        fetch(`http://localhost:3000/bids/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount) {
                    alert('deleted successfully')
                    refetch();
                }
            })
    }

    return (
        <div className="py-16 px-20">
            <h2 className="text-center font-semibold text-3xl">My Bids: <span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">{bids?.length}</span></h2>
            <div className="mt-10 rounded-lg bg-white">
                <table border="1" cellpadding="10" cellspacing="0" className="w-full border border-[#e9e9e9] text-left">
                    <thead className="border-b border-[#e9e9e9] bg-gray-50">
                        <tr>
                            <th className="font-medium text-[#001931] px-4 py-2">SL No</th>
                            <th className="font-medium text-[#001931] px-4 py-2">Product</th>
                            <th className="font-medium text-[#001931] px-4 py-2">Seller</th>
                            <th className="font-medium text-[#001931] px-4 py-2">Bid Price</th>
                            <th className="font-medium text-[#001931] px-4 py-2">Status</th>
                            <th className="font-medium text-[#001931] px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {
                            bids?.map((bid, idx) => {
                                const product = productMap[bid.productId];

                                return (
                                    <tr key={bid._id} className="border-b border-[#e9e9e9]">
                                        <th className="font-medium text-[#001931] px-4 py-2">
                                            {idx + 1}
                                        </th>

                                        {/* Product */}
                                        <td className="px-4 py-2">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={product?.imageURL}
                                                    alt={product?.title}
                                                    className="w-8 h-8 rounded-lg"
                                                />
                                                <div>
                                                    <h5 className="text-sm font-medium text-[#001931]">
                                                        {product?.title}
                                                    </h5>
                                                    <h6 className="text-sm text-gray-500">
                                                        ${product?.minPrice} - {product?.maxPrice}
                                                    </h6>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Seller */}
                                        <td className="px-4 py-2">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={product?.seller?.imageURL}
                                                    alt={product?.seller?.name}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <div>
                                                    <h5 className="text-sm font-medium text-[#001931]">
                                                        {product?.seller?.name}
                                                    </h5>
                                                    <h6 className="text-sm text-gray-500">
                                                        {product?.seller?.email}
                                                    </h6>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Bid Price */}
                                        <td className="px-4 py-2 font-medium text-[#001931]">
                                            ${bid.offeredPrice}
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-2">
                                            <span className="bg-[#FFC107] rounded-full text-sm px-2 py-1.5">
                                                {bid.status}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 py-2">
                                            <button onClick={() => handleDeleteBid(bid._id)} className="text-[#FF3D00] border border-[#FF3D00] rounded-md py-1 px-2 text-sm font-medium cursor-pointer">
                                                Remove Bid
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;
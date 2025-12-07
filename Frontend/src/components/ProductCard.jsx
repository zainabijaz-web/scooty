import { Heart, ShoppingCart } from "lucide-react";


export function ProductCard({ item }) {
return (
<div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 w-full p-4">
<div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden">
<img src={item.image} alt={item.name} className="w-full h-full object-cover" />
<button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition">
<Heart size={18} />
</button>
</div>
<h2 className="text-lg font-semibold mt-3">{item.name}</h2>
<p className="text-gray-500 text-sm">{item.description}</p>
<div className="flex items-center justify-between mt-4">
<span className="text-xl font-bold text-blue-600">PKR {item.price}</span>
<button className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition">
<ShoppingCart size={16} /> Add
</button>
</div>
</div>
);
}
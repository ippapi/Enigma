export default function ProductCard({ product, onAddToCart }) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-4 text-center">
        <img src={product.image || '/default.png'} alt={product.name} className="mx-auto h-40 mb-2 object-contain" />
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-sm text-gray-500">${product.price}</p>
        <button
          onClick={() => onAddToCart(product._id)}
          className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Add to Cart
        </button>
      </div>
    )
  }
  
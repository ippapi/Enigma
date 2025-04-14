export default function ProductCard({ product, onAddToCart }) {
  const imageSrc =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : '/default-product.jpg';

  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 text-center">
      <img
        src={imageSrc}
        alt={product.name}
        className="mx-auto h-40 mb-2 object-contain"
      />
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-sm text-gray-500">
        {product.stock !== 0 ? `${product.stock} in stock` : 'Out of stock'}
      </p>
      <p className="text-sm text-gray-500">{product.price} VND</p>
      <button
        onClick={() => !isOutOfStock && onAddToCart(product._id)}
        disabled={isOutOfStock}
        className={`mt-2 px-4 py-2 rounded text-white transition ${
          isOutOfStock
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        {isOutOfStock ? 'Hết hàng rồi công chúa ơi' : 'Thêm vào giỏ'}
      </button>
    </div>
  );
}

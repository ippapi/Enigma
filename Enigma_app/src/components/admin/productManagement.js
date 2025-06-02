import { useState, useEffect } from 'react';
import ImageUploader from '../product/imageUploader';

const ImageModal = ({ images, currentIndex, onClose, onNext, onPrev, onSelect }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-4 rounded-lg relative max-w-lg w-full">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">&times;</button>
        <img src={images[currentIndex]} alt="Product" className="w-full h-80 object-contain" />
        <div className="flex justify-between mt-2">
          <button onClick={onPrev} className="px-4 py-2 bg-gray-300 rounded">Prev</button>
          <button onClick={onNext} className="px-4 py-2 bg-gray-300 rounded">Next</button>
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="Thumbnail"
              className={`w-16 h-16 object-cover cursor-pointer rounded ${idx === currentIndex ? 'border-2 border-blue-500' : ''}`}
              onClick={() => onSelect(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onOpenModal, onEdit }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-l font-semibold pb-2">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>
      <div className="mt-2 cursor-pointer" onClick={() => onOpenModal(product.images)}>
        {product.images.length > 0 ? (
          <div className="flex overflow-x-auto">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image} 
                alt={`product-image-${index}`}
                className="w-20 h-20 object-cover rounded mr-2"
              />
            ))}
          </div>
        ) : (
          <p>No images available</p>
        )}
      </div>
      <p className="mt-2 font-medium">Stock: {product.stock}</p>
      <p className="mt-2 font-medium">Price: {product.price} VND</p>
      <button onClick={() => onEdit(product)} className="mt-2 text-custom-purple">Edit</button>
    </div>
  );
};

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);  
  const [limit] = useState(6); 
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState(0);
  const [productImages, setProductImages] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/product?page=${page}&limit=${limit}`);
      const data = await res.json();
      const formattedProducts = data.products.map((product) => ({
        ...product,
        images: product.images.map((img) => `${img}`),
      }));
      setProducts(formattedProducts);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
    setLoading(false);
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      stock: parseInt(productStock),
      images: productImages,
    };

    try {
      const res = await fetch('/api/product', {
        method: 'POST',
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        fetchProducts()
        setIsAddFormOpen(false);
      }
    } catch (error) {
      console.error('Failed to add product', error);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      stock: parseInt(productStock),
      images: productImages,
    };
    
    try {
      const res = await fetch(`/api/product/${editProduct._id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedProduct),
      });
      if (res.ok) {
        fetchProducts();
        setIsAddFormOpen(false);
        setEditProduct(null); 
      }
    } catch (error) {
      console.error('Failed to edit product', error);
    }
  };

  const handleImageSelect = (images) => {
    setProductImages(images);
  };

  const openModal = (images) => {
    setSelectedImages(images);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]); 

  return (
    <div className="p-4 pt-2">
      <h1 className="text-xl font-bold mb-4">Product Management</h1>
      <button
        onClick={() => setIsAddFormOpen(true)}
        className="bg-custom-purple text-white px-4 py-2 rounded mb-4"
      >
        Add Product
      </button>

      {isAddFormOpen && (
        <form onSubmit={editProduct ? handleEditProduct : handleAddProduct} className="bg-white rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">{editProduct ? 'Edit Product' : 'Add Product'}</h2>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="border p-2 w-full mb-4"
          />
          <label className="block mb-2">Description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            className="border p-2 w-full mb-4"
          />
          <label className="block mb-2">Price</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            className="border p-2 w-full mb-4"
          />
          <label className="block mb-2">Stock</label>
          <input
            type="number"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            required
            className="border p-2 w-full mb-4"
          />
          <label className="block mb-2">Images</label>
          <ImageUploader initialImages={productImages} onImageSelect={handleImageSelect} />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {editProduct ? 'Save Changes' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAddFormOpen(false);
                setEditProduct(null); 
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onOpenModal={openModal}
              onEdit={(product) => {
                setEditProduct(product);
                setProductName(product.name);
                setProductDescription(product.description);
                setProductPrice(product.price);
                setProductStock(product.stock);
                setProductImages(product.images);
                setIsAddFormOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Prev
        </button>
        <span className="flex items-center">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <ImageModal
          images={selectedImages}
          currentIndex={currentImageIndex}
          onClose={closeModal}
          onNext={nextImage}
          onPrev={prevImage}
          onSelect={(index) => setCurrentImageIndex(index)}
        />
      )}
    </div>
  );
};

export default ProductManagement;

import { useState } from 'preact/hooks';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  onAddToCart: (id: string) => void;
}

export default function ProductCard({ id, title, price, imageUrl, onAddToCart }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(id);
    setIsAdding(false);
  };

  return (
    <div class='max-w-sm rounded-lg shadow-lg bg-white overflow-hidden'>
      <img class='w-full h-48 object-cover' src={imageUrl} alt={title} />
      <div class='p-4'>
        <h3 class='text-lg font-semibold text-gray-800'>{title}</h3>
        <p class='text-xl font-bold text-green-600 mt-2'>${price.toFixed(2)}</p>
        <button
          type='button'
          onClick={handleAddToCart}
          disabled={isAdding}
          class='mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors'
        >
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

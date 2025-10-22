import { useState } from 'preact/hooks';
import { signal } from '@preact/signals';
import { Product } from '../types/product.ts';

const count = signal(0);

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      class={`p-4 border rounded-lg shadow-md transition-transform ${isHovered ? 'scale-105' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role='article'
      aria-label={`Product: ${product.name}`}
    >
      <img src={product.image} alt={product.name} class='w-full h-48 object-cover' />
      <h3 class='text-lg font-semibold mt-2'>{product.name}</h3>
      <p class='text-gray-600'>${product.price}</p>
      <button
        type='button'
        onClick={() => count.value++}
        class='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
        aria-label='Add to cart'
      >
        Add to Cart ({count})
      </button>
    </div>
  );
}

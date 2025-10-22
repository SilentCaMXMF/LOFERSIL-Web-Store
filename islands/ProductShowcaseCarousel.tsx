import { useEffect, useState } from 'preact/hooks';
import { t } from '../utils/i18n.ts';
import ProductCard from './ProductCard.tsx';
import { Product } from '../types/product.ts';

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Notebook',
    description: 'High-quality notebook for office use.',
    price: 15.99,
    image: '/static/images/notebook.jpg', // Fallback if not exists
    inventory: 100,
  },
  {
    id: '2',
    name: 'Ergonomic Chair',
    description: 'Comfortable chair for long work hours.',
    price: 299.99,
    image: '/static/images/chair.jpg',
    inventory: 50,
  },
  {
    id: '3',
    name: 'Desk Organizer',
    description: 'Keep your desk tidy and organized.',
    price: 25.50,
    image: '/static/images/organizer.jpg',
    inventory: 200,
  },
];

export default function ProductShowcaseCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 4000); // Auto-advance every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);

  return (
    <div class='relative max-w-6xl mx-auto'>
      <h2 class='text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800'>
        {t('showcase.title')}
      </h2>
      <p class='text-center text-gray-600 mb-12'>
        {t('showcase.subtitle')}
      </p>
      <div class='relative overflow-hidden'>
        <div
          class='flex transition-transform duration-500 ease-in-out'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {featuredProducts.map((product) => (
            <div key={product.id} class='w-full flex-shrink-0 px-4'>
              <div class='flex justify-center'>
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        type='button'
        onClick={prev}
        class='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow'
        aria-label='Previous product'
      >
        &#8249;
      </button>
      <button
        type='button'
        onClick={next}
        class='absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow'
        aria-label='Next product'
      >
        &#8250;
      </button>
      <div class='flex justify-center mt-6 space-x-2'>
        {featuredProducts.map((_, index) => (
          <button
            type='button'
            key={index}
            onClick={() => setCurrentIndex(index)}
            class={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-yellow-500' : 'bg-gray-300'
            }`}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'preact/hooks';
import { currentLanguage, t } from '../utils/i18n.ts';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Ana Silva',
    role: 'Office Manager',
    content: 'Excellent quality and fast delivery!',
    avatar: '👩‍💼',
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    role: 'Business Owner',
    content: 'Great support team, highly recommend.',
    avatar: '👨‍💻',
  },
  {
    id: '3',
    name: 'Maria Santos',
    role: 'HR Director',
    content: 'Affordable prices for premium products.',
    avatar: '👩‍🎓',
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState(testimonialsData);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Update testimonials when language changes
  useEffect(() => {
    const updatedTestimonials = testimonialsData.map((testimonial) => ({
      ...testimonial,
      content: t(`testimonials.review${testimonial.id}`) || testimonial.content,
    }));
    setTestimonials(updatedTestimonials);
  }, [currentLanguage.value]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div class='relative max-w-4xl mx-auto'>
      <h2 class='text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800'>
        {t('testimonials.title')}
      </h2>
      <p class='text-center text-gray-600 mb-12'>
        {t('testimonials.subtitle')}
      </p>
      <div class='relative overflow-hidden'>
        <div
          class='flex transition-transform duration-500 ease-in-out'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} class='w-full flex-shrink-0 px-4'>
              <div class='bg-white p-8 rounded-lg shadow-lg text-center'>
                <div class='text-6xl mb-4'>{testimonial.avatar}</div>
                <p class='text-lg italic mb-4'>"{testimonial.content}"</p>
                <h3 class='font-semibold'>{testimonial.name}</h3>
                <p class='text-gray-600'>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        type='button'
        onClick={prev}
        class='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow'
        aria-label='Previous testimonial'
      >
        &#8249;
      </button>
      <button
        type='button'
        onClick={next}
        class='absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow'
        aria-label='Next testimonial'
      >
        &#8250;
      </button>
      <div class='flex justify-center mt-6 space-x-2'>
        {testimonials.map((_, index) => (
          <button
            type='button'
            key={index}
            onClick={() => setCurrentIndex(index)}
            class={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-yellow-500' : 'bg-gray-300'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

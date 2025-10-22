import { useState } from 'preact/hooks';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        class='md:hidden text-white text-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded p-2'
        onClick={() => setIsOpen(!isOpen)}
        aria-label='Toggle mobile menu'
        aria-expanded={isOpen}
        type='button'
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {isOpen && (
        <div class='md:hidden absolute top-full left-0 right-0 bg-slate-800 bg-opacity-95 backdrop-blur-md shadow-xl'>
          <div class='px-4 py-6 space-y-4'>
            <a
              href='#features'
              class='block text-white hover:text-yellow-300 focus:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-3 py-2 transition-all'
              onClick={() => setIsOpen(false)}
            >
              Características
            </a>
            <a
              href='#about'
              class='block text-white hover:text-yellow-300 focus:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-3 py-2 transition-all'
              onClick={() => setIsOpen(false)}
            >
              Sobre Nós
            </a>
            <a
              href='#contact'
              class='block text-white hover:text-yellow-300 focus:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-3 py-2 transition-all'
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </a>
          </div>
        </div>
      )}
    </>
  );
}

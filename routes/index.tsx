import { Handlers, PageProps } from '$fresh/server.ts';
import { getSession } from '../utils/session.ts';
import { Button } from '../components/Button.tsx';
import Counter from '../islands/Counter.tsx';
import MobileMenu from '../islands/MobileMenu.tsx';
import { signal } from '@preact/signals';

export const handler: Handlers = {
  async GET(req, ctx) {
    const cookies = req.headers.get('cookie') || '';
    const sessionCookie = cookies.split(';').find((c) => c.trim().startsWith('session='));
    let user = null;
    if (sessionCookie) {
      const sessionId = sessionCookie.split('=')[1];
      const session = await getSession(sessionId);
      if (session) {
        user = { email: session.email, role: session.role };
      }
    }
    return ctx.render({ user });
  },
};

export default function Home(
  { data }: PageProps<{ user: { email: string; role: string } | null }>,
) {
  const { user } = data;
  const count = signal(0);
  return (
    <div class='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      {/* Fixed Header */}
      <header class='fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-800 to-slate-900 bg-opacity-90 backdrop-blur-md shadow-xl'>
        <nav
          class='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'
          role='banner'
          aria-label='Main site navigation'
        >
          {/* Logo/Store Image */}
          <a
            href='/'
            class='flex items-center space-x-3 hover:scale-105 transition-transform'
            aria-label='LOFERSIL home'
          >
            <img
              src='/static/images/frente-loja.jpg'
              alt='LOFERSIL store front with blue awning and glass entrance'
              class='w-10 h-10 rounded-full object-cover shadow-md'
              loading='lazy'
              decoding='async'
            />
            <h1 class='text-2xl md:text-3xl font-bold text-white tracking-wide'>LOFERSIL</h1>
          </a>

          {/* Navigation Links */}
          <div class='hidden md:flex space-x-8'>
            <a
              href='#features'
              class='text-white hover:text-yellow-300 focus:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-3 py-2 transition-all'
            >
              Características
            </a>
            <a
              href='#about'
              class='text-white hover:text-yellow-300 focus:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-3 py-2 transition-all'
            >
              Sobre Nós
            </a>
            <a
              href='#contact'
              class='text-white hover:text-yellow-300 focus:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-3 py-2 transition-all'
            >
              Contacto
            </a>
          </div>

          <MobileMenu />

          {/* User Authentication */}
          <div class='flex space-x-3'>
            {user
              ? (
                <>
                  <span class='text-white text-sm hidden sm:inline bg-slate-700 px-3 py-1 rounded-full'>
                    Bem-vindo, {user.email}
                  </span>
                  <a
                    href='/account'
                    class='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-all'
                  >
                    Conta
                  </a>
                  <a
                    href='/logout'
                    class='bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-full shadow-lg transition-all'
                  >
                    Sair
                  </a>
                </>
              )
              : (
                <a
                  href='/login'
                  class='bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-full shadow-lg transition-all'
                >
                  Entrar
                </a>
              )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section class='hero pt-32 pb-20 px-4 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white'>
        <div class='max-w-6xl mx-auto text-center'>
          <img
            src='/static/images/frente-loja.jpg'
            alt='LOFERSIL office supplies storefront with blue awning and glass entrance'
            class='w-40 h-40 mx-auto mb-8 rounded-full shadow-2xl border-4 border-white'
            loading='lazy'
            decoding='async'
          />
          <h1 class='text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 animate-pulse'>
            LOFERSIL Material de Escritório
          </h1>
          <p class='text-xl md:text-2xl lg:text-3xl opacity-90 mb-8'>
            A sua fonte confiável para todo o material de escritório
          </p>
          <div class='flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6'>
            {user
              ? (
                <>
                  <span class='text-xl md:text-2xl bg-white bg-opacity-20 px-4 py-2 rounded-full'>
                    Bem-vindo de volta, {user.email}!
                  </span>
                  <Button
                    onClick={() => count.value += 1}
                    class='bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-bold shadow-lg transition-all'
                  >
                    Comprar Agora
                  </Button>
                  <a
                    href='/logout'
                    class='bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all'
                  >
                    Sair
                  </a>
                </>
              )
              : (
                <Button
                  onClick={() => count.value += 1}
                  class='bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-bold shadow-lg transition-all'
                >
                  Começar
                </Button>
              )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' class='py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50'>
        <div class='max-w-6xl mx-auto'>
          <h2 class='text-4xl md:text-5xl font-bold mb-12 text-center text-slate-800'>
            As Nossas Características
          </h2>
          <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div class='card bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all text-center border-t-4 border-blue-500'>
              <img
                src='/static/images/interior-funcionario.jpg'
                alt='LOFERSIL store interior with staff assisting customers at office supply counters'
                class='w-20 h-20 mx-auto mb-6 rounded-full shadow-md'
                loading='lazy'
                decoding='async'
              />
              <h3 class='text-2xl font-bold mb-4 text-slate-800'>Equipa Especializada</h3>
              <p class='text-lg text-slate-600'>
                Conheça a nossa equipa dedicada, sempre pronta para ajudar com conselhos
                especializados e um serviço amigável.
              </p>
            </div>
            <div class='card bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all text-center border-t-4 border-green-500'>
              <img
                src='/static/images/interior.jpg'
                alt='LOFERSIL organized store interior with shelves of office supplies'
                class='w-20 h-20 mx-auto mb-6 rounded-full shadow-md'
                loading='lazy'
                decoding='async'
              />
              <h3 class='text-2xl font-bold mb-4 text-slate-800'>Interior Organizado</h3>
              <p class='text-lg text-slate-600'>
                Explore o nosso interior bem organizado, concebido para uma navegação fácil e uma
                experiência de compra agradável.
              </p>
            </div>
            <div class='card bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all text-center border-t-4 border-purple-500'>
              <img
                src='/static/images/frente-loja.jpg'
                alt='LOFERSIL storefront located in business district'
                class='w-20 h-20 mx-auto mb-6 rounded-full shadow-md'
                loading='lazy'
                decoding='async'
              />
              <h3 class='text-2xl font-bold mb-4 text-slate-800'>Localização Privilegiada</h3>
              <p class='text-lg text-slate-600'>
                Convenientemente localizado no distrito de negócios para fácil acesso a todas as
                suas necessidades de material de escritório.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Counter Section */}
      <section class='py-16 px-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black'>
        <div class='max-w-4xl mx-auto text-center'>
          <h2 class='text-3xl md:text-4xl font-bold mb-8'>
            Experimente o Nosso Contador Interativo
          </h2>
          <Counter count={count} />
          <p class='text-lg mt-4'>Contagem: {count}</p>
        </div>
      </section>

      {/* About Us */}
      <section id='about' class='py-20 px-4 bg-white'>
        <div class='max-w-4xl mx-auto text-center'>
          <h2 class='text-4xl md:text-5xl font-bold mb-8 text-slate-800'>Sobre Nós</h2>
          <p class='text-xl leading-relaxed text-slate-600'>
            Fundada em 2023, a LOFERSIL tem servido a comunidade com material de escritório de alta
            qualidade há mais de um ano. A nossa missão é fornecer produtos acessíveis e de alta
            qualidade que ajudam empresas e indivíduos a ter sucesso. Orgulhamo-nos do nosso
            excelente serviço ao cliente e entrega rápida.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section id='contact' class='py-20 px-4 bg-gradient-to-br from-slate-100 to-gray-200'>
        <div class='max-w-4xl mx-auto text-center'>
          <h2 class='text-4xl md:text-5xl font-bold mb-8 text-slate-800'>Contacte-nos</h2>
          <div class='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div class='card bg-white rounded-lg p-6 shadow-lg'>
              <h3 class='text-xl font-semibold mb-2 text-slate-700'>Telefone</h3>
              <p class='text-lg text-slate-600'>(555) 123-4567</p>
            </div>
            <div class='card bg-white rounded-lg p-6 shadow-lg'>
              <h3 class='text-xl font-semibold mb-2 text-slate-700'>Email</h3>
              <p class='text-lg text-slate-600'>info@lofersil.com</p>
            </div>
            <div class='card bg-white rounded-lg p-6 shadow-lg'>
              <h3 class='text-xl font-semibold mb-2 text-slate-700'>Website</h3>
              <p class='text-lg text-slate-600'>www.lofersil.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class='bg-gradient-to-r from-slate-800 to-slate-900 text-white text-center py-12'>
        <div class='max-w-4xl mx-auto'>
          <p class='text-xl'>
            &copy; 2024 LOFERSIL Material de Escritório. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

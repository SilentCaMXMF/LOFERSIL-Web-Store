import { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import { getSession } from '../utils/session.ts';
import { Button } from '../components/Button.tsx';
import MobileMenu from '../islands/MobileMenu.tsx';
import LanguageSwitcher from '../islands/LanguageSwitcher.tsx';
import TestimonialsCarousel from '../islands/TestimonialsCarousel.tsx';
import ProductShowcaseCarousel from '../islands/ProductShowcaseCarousel.tsx';
import { signal } from '@preact/signals';
import { t } from '../utils/i18n.ts';

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
    <>
      <Head>
        <title>{t('seo.title') || 'LOFERSIL - Premium Office Supplies'}</title>
        <meta
          name='description'
          content={t('seo.description') ||
            'Discover high-quality office materials at LOFERSIL. Fast delivery and expert support for your business needs.'}
        />
        <meta
          property='og:title'
          content={t('seo.title') || 'LOFERSIL - Premium Office Supplies'}
        />
        <meta
          property='og:description'
          content={t('seo.description') || 'Discover high-quality office materials at LOFERSIL.'}
        />
        <meta property='og:image' content='/static/images/interior.jpg' />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <div class='min-h-screen bg-gray-50'>
        {/* Fixed Header */}
        <header class='fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-lg shadow-2xl border-b border-white/10'>
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
                src='/static/images/interior.jpg'
                alt={t('alt.storeInterior')}
                class='w-10 h-10 rounded-full object-cover shadow-md'
                loading='lazy'
                decoding='async'
              />
              <h1 class='text-xl md:text-2xl font-bold text-white tracking-wide drop-shadow-lg'>
                LOFERSIL
              </h1>
            </a>

            {/* Navigation Links */}
            <div class='hidden md:flex space-x-8'>
              <a
                href='/products'
                class='text-white hover:text-yellow-300 focus:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-lg px-3 py-2 transition-all duration-300 hover:bg-white/10'
              >
                {t('nav.products')}
              </a>
              <a
                href='/about'
                class='text-white hover:text-yellow-300 focus:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-lg px-3 py-2 transition-all duration-300 hover:bg-white/10'
              >
                {t('nav.about')}
              </a>
              <a
                href='/contact'
                class='text-white hover:text-yellow-300 focus:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-lg px-3 py-2 transition-all duration-300 hover:bg-white/10'
              >
                {t('nav.contact')}
              </a>
            </div>

            <MobileMenu />

            <LanguageSwitcher className='hidden md:flex' />

            {/* User Authentication */}
            <div class='flex space-x-3'>
              {user
                ? (
                  <>
                    <span class='text-white text-sm hidden sm:inline bg-slate-700 px-3 py-1 rounded-full'>
                      {t('hero.welcome').replace('{email}', user.email)}
                    </span>
                    <a
                      href='/account'
                      class='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105'
                    >
                      {t('hero.account')}
                    </a>
                    <a
                      href='/logout'
                      class='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105'
                    >
                      {t('hero.logout')}
                    </a>
                  </>
                )
                : (
                  <a
                    href='/login'
                    class='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105'
                  >
                    {t('hero.login')}
                  </a>
                )}
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section class='hero pt-32 pb-20 px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white relative overflow-hidden'>
          <div class='max-w-6xl mx-auto text-center'>
            <img
              src='https://api.figma.com/v1/images/F875oCto4aJIcTUUSfgHFC?ids=1669-162202&format=png'
              alt={t('alt.officeIcon')}
              class='w-32 h-32 mx-auto mb-8 rounded-full shadow-2xl border-4 border-white'
              loading='lazy'
              decoding='async'
            />
            <h1 class='text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 animate-bounce drop-shadow-2xl'>
              {t('hero.title')}
            </h1>
            <p class='text-lg md:text-xl lg:text-2xl opacity-90 mb-8 leading-relaxed'>
              {t('hero.subtitle')}
            </p>
            <div class='flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6'>
              {user
                ? (
                  <>
                    <span class='text-lg md:text-xl bg-white bg-opacity-20 px-4 py-2 rounded-full'>
                      {t('hero.welcome').replace('{email}', user.email)}
                    </span>
                    <Button
                      onClick={() => count.value += 1}
                      class='bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105'
                    >
                      {t('hero.shopNow')}
                    </Button>
                    <a
                      href='/logout'
                      class='bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105'
                    >
                      {t('hero.logout')}
                    </a>
                  </>
                )
                : (
                  <Button
                    onClick={() => count.value += 1}
                    class='bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105'
                  >
                    {t('hero.getStarted')}
                  </Button>
                )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section class='py-20 px-4 bg-gray-100'>
          <div class='max-w-6xl mx-auto'>
            <h2 class='text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800'>
              {t('features.title') || 'Why Choose LOFERSIL?'}
            </h2>
            <div class='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div class='text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow'>
                <div class='text-4xl mb-4'>📦</div>
                <h3 class='text-xl font-semibold mb-2'>
                  {t('features.quality') || 'High Quality Products'}
                </h3>
                <p class='text-gray-600'>
                  {t('features.qualityDesc') || 'Premium office supplies for your business needs.'}
                </p>
              </div>
              <div class='text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow'>
                <div class='text-4xl mb-4'>🚚</div>
                <h3 class='text-xl font-semibold mb-2'>
                  {t('features.delivery') || 'Fast Delivery'}
                </h3>
                <p class='text-gray-600'>
                  {t('features.deliveryDesc') || 'Quick and reliable shipping to your location.'}
                </p>
              </div>
              <div class='text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow'>
                <div class='text-4xl mb-4'>💼</div>
                <h3 class='text-xl font-semibold mb-2'>
                  {t('features.support') || 'Expert Support'}
                </h3>
                <p class='text-gray-600'>
                  {t('features.supportDesc') || 'Professional assistance for all your queries.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section class='py-20 px-4 bg-white'>
          <TestimonialsCarousel />
        </section>

        {/* Product Showcase Section */}
        <section class='py-20 px-4 bg-gray-50'>
          <ProductShowcaseCarousel />
        </section>

        {/* Footer */}
        <footer class='bg-slate-900 text-white py-12'>
          <div class='max-w-6xl mx-auto px-4'>
            <div class='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div>
                <h3 class='text-xl font-bold mb-4'>LOFERSIL</h3>
                <p class='text-gray-300'>
                  {t('footer.description') || 'Your trusted partner for office supplies.'}
                </p>
              </div>
              <div>
                <h3 class='text-xl font-bold mb-4'>{t('footer.links') || 'Quick Links'}</h3>
                <ul class='space-y-2'>
                  <li>
                    <a
                      href='/products'
                      class='text-gray-300 hover:text-yellow-300 transition-colors'
                    >
                      {t('nav.products')}
                    </a>
                  </li>
                  <li>
                    <a href='/about' class='text-gray-300 hover:text-yellow-300 transition-colors'>
                      {t('nav.about')}
                    </a>
                  </li>
                  <li>
                    <a
                      href='/contact'
                      class='text-gray-300 hover:text-yellow-300 transition-colors'
                    >
                      {t('nav.contact')}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class='text-xl font-bold mb-4'>{t('footer.newsletter') || 'Newsletter'}</h3>
                <p class='text-gray-300 mb-4'>
                  {t('footer.newsletterDesc') || 'Subscribe for updates and offers.'}
                </p>
                <form class='flex'>
                  <input
                    type='email'
                    placeholder='Email'
                    class='flex-1 px-3 py-2 rounded-l-lg text-black'
                  />
                  <button
                    type='submit'
                    class='bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-r-lg transition-colors'
                  >
                    {t('footer.subscribe') || 'Subscribe'}
                  </button>
                </form>
              </div>
            </div>
            <div class='border-t border-gray-700 mt-8 pt-8 text-center'>
              <p class='text-gray-400'>
                {t('footer.copyright')}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

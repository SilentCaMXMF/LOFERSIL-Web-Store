import { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import { getSession } from '../utils/session.ts';
import LanguageSwitcher from '../islands/LanguageSwitcher.tsx';
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
        <meta property='og:image' content='https://via.placeholder.com/400x300' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:image:alt' content={t('alt.storeInterior')} />
        <meta name='twitter:card' content='summary_large_image' />
        <link rel='preload' as='image' href='https://via.placeholder.com/400x300' />
      </Head>

      <div class='min-h-screen bg-white'>
        {/* Skip Links for Accessibility */}
        <a
          href='#main-content'
          class='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50'
        >
          Skip to main content
        </a>
        <a
          href='#footer'
          class='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-32 bg-blue-600 text-white px-4 py-2 rounded z-50'
        >
          Skip to footer
        </a>

        {/* Simple Header */}
        <header class='fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200'>
          <nav class='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'>
            {/* Logo */}
            <a href='/' class='flex items-center space-x-3'>
              <img
                src='https://via.placeholder.com/400x300'
                alt={t('alt.storeInterior') || 'LOFERSIL office supplies store interior'}
                class='w-8 h-8 rounded-full'
                width='32'
                height='32'
              />
              <h1 class='text-xl font-bold text-gray-900'>LOFERSIL</h1>
            </a>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* User Authentication */}
            <div class='flex items-center space-x-4'>
              {user ? (
                <div class='flex items-center space-x-3'>
                  <span class='text-sm text-gray-600'>{user.email}</span>
                  <a
                    href='/logout'
                    class='text-sm text-gray-900 hover:text-gray-600'
                  >
                    {t('hero.logout')}
                  </a>
                </div>
              ) : (
                <a
                  href='/login'
                  class='text-sm text-gray-900 hover:text-gray-600'
                >
                  {t('hero.login')}
                </a>
              )}
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main id='main-content' class='pt-16'>
          {/* About Section */}
          <section class='py-20 px-4'>
            <div class='max-w-4xl mx-auto'>
              <div class='text-center mb-16'>
                <h2 class='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                  {t('about.title') || 'About LOFERSIL'}
                </h2>
                <p class='text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto'>
                  {t('about.description') || 'LOFERSIL is your trusted partner for premium office supplies. We provide high-quality materials and expert support to help your business thrive.'}
                </p>
              </div>

              <div class='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
                <div class='text-center p-6'>
                  <div class='text-4xl mb-4'>📦</div>
                  <h3 class='text-xl font-semibold text-gray-900 mb-3'>
                    {t('about.quality.title') || 'Premium Quality'}
                  </h3>
                  <p class='text-gray-600'>
                    {t('about.quality.description') || 'We source only the finest office supplies to ensure your business operates at peak efficiency.'}
                  </p>
                </div>

                <div class='text-center p-6'>
                  <div class='text-4xl mb-4'>🚚</div>
                  <h3 class='text-xl font-semibold text-gray-900 mb-3'>
                    {t('about.delivery.title') || 'Fast Delivery'}
                  </h3>
                  <p class='text-gray-600'>
                    {t('about.delivery.description') || 'Quick and reliable shipping ensures you get what you need, when you need it.'}
                  </p>
                </div>

                <div class='text-center p-6'>
                  <div class='text-4xl mb-4'>💼</div>
                  <h3 class='text-xl font-semibold text-gray-900 mb-3'>
                    {t('about.support.title') || 'Expert Support'}
                  </h3>
                  <p class='text-gray-600'>
                    {t('about.support.description') || 'Our knowledgeable team is here to help with any questions or special requirements.'}
                  </p>
                </div>
              </div>

              <div class='text-center'>
                <h3 class='text-2xl font-semibold text-gray-900 mb-6'>
                  {t('about.mission.title') || 'Our Mission'}
                </h3>
                <p class='text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto'>
                  {t('about.mission.description') || 'To empower businesses with the tools they need to succeed. We believe that the right office supplies can make all the difference in productivity and success.'}
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section class='py-20 px-4 bg-gray-50'>
            <div class='max-w-4xl mx-auto'>
              <h2 class='text-3xl font-bold text-gray-900 text-center mb-8'>
                {t('contact.title') || 'Contact Us'}
              </h2>
              <div class='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                  <h3 class='text-xl font-semibold text-gray-900 mb-4'>
                    {t('contact.subtitle') || 'Get in Touch'}
                  </h3>
                  <p class='text-gray-600 mb-4'>{t('contact.email') || 'Email: info@lofersil.com'}</p>
                  <p class='text-gray-600 mb-4'>{t('contact.phone') || 'Phone: +1 (555) 123-4567'}</p>
                  <p class='text-gray-600'>{t('contact.address') || 'Address: 123 Office Street, Business City'}</p>
                </div>
                <div>
                  <form class='space-y-4' action='/api/contact' method='post'>
                    <div>
                      <label for='name' class='block text-sm font-medium text-gray-700 mb-1'>
                        {t('contact.form.name') || 'Name'}
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        placeholder={t('contact.form.name.placeholder') || 'Your full name'}
                        class='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
                        required
                      />
                    </div>
                    <div>
                      <label for='email' class='block text-sm font-medium text-gray-700 mb-1'>
                        {t('contact.form.email') || 'Email'}
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        placeholder={t('contact.form.email.placeholder') || 'your.email@example.com'}
                        class='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
                        required
                      />
                    </div>
                    <div>
                      <label for='message' class='block text-sm font-medium text-gray-700 mb-1'>
                        {t('contact.form.message') || 'Message'}
                      </label>
                      <textarea
                        id='message'
                        name='message'
                        rows={4}
                        placeholder={t('contact.form.message.placeholder') || 'How can we help you?'}
                        class='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
                        required
                      ></textarea>
                    </div>
                    <button
                      type='submit'
                      class='w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors'
                    >
                      {t('contact.form.send') || 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Google Maps Style Testimonials */}
          <section class='py-20 px-4 bg-white'>
            <div class='max-w-4xl mx-auto'>
              <h2 class='text-3xl font-bold text-gray-900 text-center mb-12'>
                {t('testimonials.title') || 'Customer Reviews'}
              </h2>
              <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <div class='bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
                  <div class='flex items-center justify-between mb-3'>
                    <div class='flex text-yellow-400'>
                      {'★'.repeat(5)}
                    </div>
                    <span class='text-xs text-gray-500'>2 weeks ago</span>
                  </div>
                  <p class='text-gray-700 mb-4 text-sm leading-relaxed'>
                    "{t('testimonials.review1') || 'Excellent quality and fast delivery! Highly recommend LOFERSIL for all office needs.'}"
                  </p>
                  <div class='flex items-center'>
                    <div class='w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-gray-600 text-xs font-semibold'>
                      AS
                    </div>
                    <div>
                      <p class='font-semibold text-gray-900 text-sm'>
                        {t('testimonials.name1') || 'Ana Silva'}
                      </p>
                      <p class='text-xs text-gray-500'>
                        {t('testimonials.role1') || 'Office Manager'}
                      </p>
                    </div>
                  </div>
                </div>

                <div class='bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
                  <div class='flex items-center justify-between mb-3'>
                    <div class='flex text-yellow-400'>
                      {'★'.repeat(5)}
                    </div>
                    <span class='text-xs text-gray-500'>1 month ago</span>
                  </div>
                  <p class='text-gray-700 mb-4 text-sm leading-relaxed'>
                    "{t('testimonials.review2') || 'Great support team and premium products. Exactly what our business needed.'}"
                  </p>
                  <div class='flex items-center'>
                    <div class='w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-gray-600 text-xs font-semibold'>
                      CM
                    </div>
                    <div>
                      <p class='font-semibold text-gray-900 text-sm'>
                        {t('testimonials.name2') || 'Carlos Mendes'}
                      </p>
                      <p class='text-xs text-gray-500'>
                        {t('testimonials.role2') || 'Business Owner'}
                      </p>
                    </div>
                  </div>
                </div>

                <div class='bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
                  <div class='flex items-center justify-between mb-3'>
                    <div class='flex text-yellow-400'>
                      {'★'.repeat(5)}
                    </div>
                    <span class='text-xs text-gray-500'>3 weeks ago</span>
                  </div>
                  <p class='text-gray-700 mb-4 text-sm leading-relaxed'>
                    "{t('testimonials.review3') || 'Affordable prices for top-quality office supplies. Very satisfied with the service.'}"
                  </p>
                  <div class='flex items-center'>
                    <div class='w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-gray-600 text-xs font-semibold'>
                      MS
                    </div>
                    <div>
                      <p class='font-semibold text-gray-900 text-sm'>
                        {t('testimonials.name3') || 'Maria Santos'}
                      </p>
                      <p class='text-xs text-gray-500'>
                        {t('testimonials.role3') || 'HR Director'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Simple Footer */}
        <footer id='footer' class='bg-gray-900 text-white py-8'>
          <div class='max-w-7xl mx-auto px-4'>
            <div class='flex flex-col md:flex-row justify-between items-center'>
              <div class='mb-4 md:mb-0'>
                <h3 class='text-lg font-bold'>LOFERSIL</h3>
                <p class='text-gray-400 text-sm'>Your trusted partner for office supplies.</p>
              </div>
              <div class='flex space-x-6'>
                <a href='/about' class='text-gray-400 hover:text-white text-sm'>
                  {t('nav.about')}
                </a>
                <a href='/contact' class='text-gray-400 hover:text-white text-sm'>
                  {t('nav.contact')}
                </a>
              </div>
            </div>
            <div class='border-t border-gray-700 mt-6 pt-6 text-center'>
              <p class='text-gray-400 text-sm'>
                {t('footer.copyright')}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

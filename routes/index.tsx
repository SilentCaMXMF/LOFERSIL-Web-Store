import { Handlers, PageProps } from '$fresh/server.ts';
import { getSession } from '../utils/session.ts';
import { Button } from '../components/Button.tsx';
import MobileMenu from '../islands/MobileMenu.tsx';
import LanguageSwitcher from '../components/LanguageSwitcher.tsx';
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
    <div class='min-h-screen bg-gray-50'>
      {/* Fixed Header */}
       <header class='fixed top-0 left-0 right-0 z-50 bg-slate-800 bg-opacity-90 backdrop-blur-md shadow-xl'>
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
               alt='Interior da loja LOFERSIL'
               class='w-10 h-10 rounded-full object-cover shadow-md'
               loading='lazy'
               decoding='async'
             />
             <h1 class='text-xl md:text-2xl font-bold text-white tracking-wide'>LOFERSIL</h1>
          </a>

           {/* Navigation Links */}
           <div class='hidden md:flex space-x-8'>
             <a
               href='/products'
               class='text-white hover:text-yellow-300 focus:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-3 py-2 transition-all'
             >
               {t('nav.products')}
             </a>
             <a
               href='/about'
               class='text-white hover:text-yellow-300 focus:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-3 py-2 transition-all'
             >
               {t('nav.about')}
             </a>
             <a
               href='/contact'
               class='text-white hover:text-yellow-300 focus:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-3 py-2 transition-all'
             >
               {t('nav.contact')}
             </a>
           </div>

           <MobileMenu />

           <LanguageSwitcher className="hidden md:flex" />

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
                     class='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-all'
                   >
                     {t('hero.account')}
                   </a>
                   <a
                     href='/logout'
                     class='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg transition-all'
                   >
                     {t('hero.logout')}
                   </a>
                </>
              )
              : (
                <a
                  href='/login'
                   class='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-lg transition-all'
                 >
                   {t('hero.login')}
                 </a>
              )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
       <section class='hero pt-32 pb-20 px-4 bg-indigo-600 text-white'>
        <div class='max-w-6xl mx-auto text-center'>
           <img
             src='https://api.figma.com/v1/images/F875oCto4aJIcTUUSfgHFC?ids=1669-162202&format=png'
             alt='Ícone de materiais de escritório LOFERSIL'
             class='w-32 h-32 mx-auto mb-8 rounded-full shadow-2xl border-4 border-white'
             loading='lazy'
             decoding='async'
           />
           <h1 class='text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 animate-pulse'>
             {t('hero.title')}
           </h1>
           <p class='text-lg md:text-xl lg:text-2xl opacity-90 mb-8'>
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
                    class='bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-bold shadow-lg transition-all'
                   >
                     {t('hero.shopNow')}
                   </Button>
                   <a
                     href='/logout'
                     class='bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all'
                   >
                     {t('hero.logout')}
                   </a>
                </>
              )
              : (
                <Button
                  onClick={() => count.value += 1}
                  class='bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-bold shadow-lg transition-all'
                 >
                   {t('hero.getStarted')}
                 </Button>
              )}
          </div>
        </div>
      </section>



      {/* Footer */}
       <footer class='bg-slate-800 text-white text-center py-12'>
         <div class='max-w-4xl mx-auto'>
           <p class='text-lg'>&copy; 2024 LOFERSIL Materiais de Escritório. Todos os direitos reservados.</p>
         </div>
      </footer>
    </div>
  );
}

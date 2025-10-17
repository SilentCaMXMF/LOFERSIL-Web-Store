import { Handlers, PageProps } from "$fresh/server.ts";
import { getSession } from "../utils/session.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const cookies = req.headers.get("cookie") || "";
    const sessionCookie = cookies.split(";").find((c) =>
      c.trim().startsWith("session=")
    );
    let user = null;
    if (sessionCookie) {
      const sessionId = sessionCookie.split("=")[1];
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
        <div class="min-h-screen bg-gray-100 pt-24">
         {/* Fixed Header */}
         <header class="fixed top-0 left-0 right-0 z-50 bg-slate-800 bg-opacity-80 backdrop-blur-sm shadow-lg">
           <nav class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between" role="banner" aria-label="Main site navigation">
             {/* Logo/Store Image */}
             <a href="/" class="flex items-center space-x-2" aria-label="LOFERSIL home">
                  <div class="image-container min-h-8 flex justify-center">
                    <img src="/static/images/frente-loja.jpg" alt="LOFERSIL store front" class="w-8 h-8 rounded-full object-cover image block" loading="lazy" />
                  </div>
                <h1 class="text-2xl md:text-3xl font-bold text-white">LOFERSIL</h1>
              </a>

               {/* Navigation Links */}
               <div class="hidden md:flex space-x-6">
                 <a href="#about" class="text-white hover:text-gray-200 focus:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded px-2 py-1 transition-colors">Sobre</a>
                 <a href="#contact" class="text-white hover:text-gray-200 focus:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded px-2 py-1 transition-colors">Contacto</a>
               </div>

              {/* User Authentication */}
              <div class="flex space-x-2">
                {user ? (
                  <>
                    <span class="text-white text-base hidden sm:inline">Bem-vindo, {user.email}</span>
                    <a href="/account" class="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white px-3 py-1 rounded text-base transition-colors">Conta</a>
                    <a href="/logout" class="bg-red-500 hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 text-white px-3 py-1 rounded text-base transition-colors">Sair</a>
                  </>
                ) : (
                  <a href="/login" class="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white px-3 py-1 rounded text-base transition-colors">Entrar</a>
                )}
             </div>
           </nav>
         </header>

           {/* Hero Section */}
           <section class="hero py-16 md:py-32 px-4">
             <div class="max-w-6xl mx-auto text-center">
                 <div class="image-container min-h-32 md:min-h-40 flex justify-center">
                   <img src="/static/images/frente-loja.jpg" alt="LOFERSIL store front" class="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 md:mb-8 rounded-full shadow-lg image block" loading="lazy" />
                 </div>
                <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">LOFERSIL Materiais de Escritório</h1>
                <p class="text-lg md:text-xl lg:text-2xl opacity-90 mb-6 md:mb-8">A sua fonte confiável para todas as necessidades de escritório</p>
                <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  {user ? (
                    <>
                      <span class="text-lg md:text-xl">Bem-vindo, {user.email}</span>
                      <a href="/account" class="btn btn-primary">Minha Conta</a>
                      <a href="/logout" class="btn btn-secondary">Sair</a>
                    </>
                  ) : (
                    <a href="/login" class="btn btn-primary">Entrar</a>
                  )}
               </div>
             </div>
           </section>

           {/* Features Section */}
            <section class="section bg-gray-50">
              <div class="max-w-6xl mx-auto text-center">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-slate-700">As Nossas Funcionalidades</h2>
                <div class="grid-container">
                  <div class="card text-center">
                    <div class="image-container min-h-16 md:min-h-20 flex justify-center">
                      <img src="/static/images/interior-funcionario.jpg" alt="Interior com funcionário" class="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 image block" loading="lazy" />
                    </div>
                    <h3 class="text-xl md:text-2xl font-semibold mb-4 text-slate-700">Equipa Especializada</h3>
                    <p class="text-base md:text-lg">Conheça a nossa equipa dedicada, sempre pronta para o ajudar com conselhos especializados e um serviço amigável.</p>
                  </div>
                  <div class="card text-center">
                    <div class="image-container min-h-16 md:min-h-20 flex justify-center">
                      <img src="/static/images/interior.jpg" alt="Interior da loja" class="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 image block" loading="lazy" />
                    </div>
                    <h3 class="text-xl md:text-2xl font-semibold mb-4 text-slate-700">Interior Organizado</h3>
                    <p class="text-base md:text-lg">Explore o nosso interior bem organizado, projetado para uma navegação fácil e uma experiência de compra agradável.</p>
                  </div>
                  <div class="card text-center">
                    <div class="image-container min-h-16 md:min-h-20 flex justify-center">
                      <img src="/static/images/frente-loja.jpg" alt="Frente da loja" class="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 image block" loading="lazy" />
                    </div>
                    <h3 class="text-xl md:text-2xl font-semibold mb-4 text-slate-700">Localização Privilegiada</h3>
                    <p class="text-base md:text-lg">Convenientemente localizado no distrito comercial para fácil acesso a todas as suas necessidades de materiais de escritório.</p>
                  </div>
                </div>
             </div>
           </section>

          {/* Store Hours and Location */}
           <section class="section bg-white">
             <div class="max-w-6xl mx-auto text-center">
               <h2 class="text-4xl md:text-5xl font-bold mb-12 text-slate-700">Visite-nos</h2>
               <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="card text-center">
                   <h3 class="text-2xl font-semibold mb-4 text-slate-700">Horários da Loja</h3>
                   <ul class="space-y-2 text-lg">
                     <li>Segunda - Sexta: 9:00 - 18:00</li>
                     <li>Sábado: 10:00 - 16:00</li>
                     <li>Domingo: Fechado</li>
                   </ul>
                 </div>
                 <div class="card text-center">
                   <h3 class="text-2xl font-semibold mb-4 text-slate-600">Localização</h3>
                   <p class="text-lg">
                     123 Rua do Escritório<br />Distrito Comercial<br />Cidade, Estado 12345
                   </p>
                 </div>
               </div>
            </div>
          </section>

          {/* About Us */}
          <section class="section bg-gray-50">
            <div class="max-w-4xl mx-auto text-center">
               <h2 class="text-4xl md:text-5xl font-bold mb-6 text-slate-700">Sobre Nós</h2>
               <p class="text-xl leading-relaxed">
                 Fundada em 2023, a LOFERSIL tem servido a comunidade com
                 materiais de escritório de alta qualidade há mais de um ano. A nossa missão é fornecer
                 produtos acessíveis e de alta qualidade que ajudam empresas e
                 indivíduos a ter sucesso. Orgulhamo-nos do nosso excelente atendimento ao cliente
                 e entrega rápida.
               </p>
            </div>
          </section>

          {/* Contact Information */}
          <section class="section bg-white">
            <div class="max-w-4xl mx-auto text-center">
               <h2 class="text-4xl md:text-5xl font-bold mb-6 text-slate-700">Contacte-nos</h2>
               <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div class="card">
                   <h3 class="text-xl font-semibold mb-2 text-slate-600">Telefone</h3>
                   <p class="text-lg">(555) 123-4567</p>
                 </div>
                 <div class="card">
                   <h3 class="text-xl font-semibold mb-2 text-slate-600">Email</h3>
                   <p class="text-lg">info@lofersil.com</p>
                 </div>
                 <div class="card">
                   <h3 class="text-xl font-semibold mb-2 text-slate-600">Website</h3>
                   <p class="text-lg">www.lofersil.com</p>
                 </div>
               </div>
            </div>
          </section>



         {/* Footer */}
         <footer class="hero text-white text-center py-8">
           <div class="max-w-4xl mx-auto">
               <p class="text-xl">&copy; 2024 LOFERSIL Materiais de Escritório. Todos os direitos reservados.</p>
           </div>
          </footer>
      </div>
   );
}

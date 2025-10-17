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
        <header class="fixed top-0 left-0 right-0 z-50 bg-slate-800 bg-opacity-80 backdrop-blur-sm shadow-lg" style="background-image: url('/images/frente-loja.svg'); background-size: cover; background-position: center;">
          <nav class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between" role="banner" aria-label="Main site navigation">
            {/* Logo/Store Image */}
            <a href="/" class="flex items-center space-x-2" aria-label="LOFERSIL home">
              <img src="/images/frente-loja.svg" alt="LOFERSIL store front" class="w-6 h-6 rounded-full object-cover" />
              <h1 class="text-2xl md:text-3xl font-bold text-white">LOFERSIL</h1>
            </a>

            {/* Navigation Links */}
            <div class="hidden md:flex space-x-6">
              <a href="#store-info" class="text-white hover:text-gray-200 focus:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded px-2 py-1 transition-colors">About</a>
              <a href="#contact" class="text-white hover:text-gray-200 focus:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded px-2 py-1 transition-colors">Contact</a>
            </div>

            {/* User Authentication */}
            <div class="flex space-x-2">
              {user ? (
                <>
                  <span class="text-white text-base hidden sm:inline">Welcome, {user.email}</span>
                  <a href="/account" class="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white px-3 py-1 rounded text-base transition-colors">Account</a>
                  <a href="/logout" class="bg-red-500 hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 text-white px-3 py-1 rounded text-base transition-colors">Logout</a>
                </>
              ) : (
                <a href="/login" class="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white px-3 py-1 rounded text-base transition-colors">Login</a>
              )}
            </div>
          </nav>
        </header>

         {/* Hero Section */}
         <section class="hero py-32 px-4">
           <div class="max-w-6xl mx-auto text-center">
             <img src="/images/frente-loja.svg" alt="LOFERSIL store front" class="w-32 h-32 mx-auto mb-8 rounded-full shadow-lg" />
             <h1 class="text-5xl md:text-6xl font-bold mb-6">LOFERSIL Office Supplies</h1>
             <p class="text-xl md:text-2xl opacity-90 mb-8">Your trusted source for all office needs</p>
             <div class="flex justify-center space-x-4">
               {user ? (
                 <>
                   <span class="text-xl">Welcome, {user.email}</span>
                   <a href="/account" class="btn btn-primary">My Account</a>
                   <a href="/logout" class="btn btn-secondary">Logout</a>
                 </>
               ) : (
                 <a href="/login" class="btn btn-primary">Login</a>
               )}
             </div>
           </div>
         </section>

         {/* Features Section */}
         <section class="section bg-gray-50">
           <div class="max-w-6xl mx-auto">
             <h2 class="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-700">Our Features</h2>
             <div class="grid-container">
               <div class="card text-center">
                 <img src="/images/interior-funcionario.svg" alt="Interior with employee" class="w-16 h-16 mx-auto mb-4" />
                 <h3 class="text-2xl font-semibold mb-4 text-slate-700">Expert Team</h3>
                 <p class="text-lg">Meet our dedicated staff, always ready to assist you with expert advice and friendly service.</p>
               </div>
               <div class="card text-center">
                 <img src="/images/interior.svg" alt="Store interior" class="w-16 h-16 mx-auto mb-4" />
                 <h3 class="text-2xl font-semibold mb-4 text-slate-700">Organized Interior</h3>
                 <p class="text-lg">Explore our well-organized store interior, designed for easy browsing and a pleasant shopping experience.</p>
               </div>
               <div class="card text-center">
                 <img src="/images/frente-loja.svg" alt="Store front" class="w-16 h-16 mx-auto mb-4" />
                 <h3 class="text-2xl font-semibold mb-4 text-slate-700">Prime Location</h3>
                 <p class="text-lg">Conveniently located in the business district for easy access to all your office supply needs.</p>
               </div>
             </div>
           </div>
         </section>

         {/* Store Hours and Location */}
         <section class="section bg-white">
           <div class="max-w-6xl mx-auto">
             <h2 class="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-700">Visit Us</h2>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div class="card text-center">
                 <h3 class="text-2xl font-semibold mb-4 text-slate-700">Store Hours</h3>
                 <ul class="space-y-2 text-lg">
                   <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                   <li>Saturday: 10:00 AM - 4:00 PM</li>
                   <li>Sunday: Closed</li>
                 </ul>
               </div>
               <div class="card text-center">
                 <h3 class="text-2xl font-semibold mb-4 text-slate-600">Location</h3>
                 <p class="text-lg">
                   123 Office Street<br />Business District<br />City, State 12345
                 </p>
               </div>
             </div>
           </div>
         </section>

         {/* About Us */}
         <section class="section bg-gray-50">
           <div class="max-w-4xl mx-auto text-center">
             <h2 class="text-4xl md:text-5xl font-bold mb-6 text-slate-700">About Us</h2>
             <p class="text-xl leading-relaxed">
               Founded in 2023, LOFERSIL has been serving the community with
               top-notch office supplies for over a year. Our mission is to provide
               affordable, high-quality products that help businesses and
               individuals succeed. We pride ourselves on excellent customer
               service and fast delivery.
             </p>
           </div>
         </section>

         {/* Contact Information */}
         <section class="section bg-white">
           <div class="max-w-4xl mx-auto text-center">
             <h2 class="text-4xl md:text-5xl font-bold mb-6 text-slate-700">Contact Us</h2>
             <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div class="card">
                 <h3 class="text-xl font-semibold mb-2 text-slate-600">Phone</h3>
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
             <p class="text-xl">&copy; 2024 LOFERSIL Office Supplies. All rights reserved.</p>
          </div>
         </footer>
      </div>
   );
}

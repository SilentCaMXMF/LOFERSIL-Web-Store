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
    <div class="landing-page">
      {/* Header */}
      <header class="header">
        <div class="container">
          <h1 class="store-name">LOFERSIL Office Supplies</h1>
          <p class="tagline">Your trusted source for all office needs</p>
          <div class="auth-buttons">
            {user
              ? (
                <>
                  <span>Welcome, {user.email}</span>
                  <a href="/account" class="button">My Account</a>
                  <a href="/logout" class="button">Logout</a>
                </>
              )
              : <a href="/login" class="button">Login</a>}
          </div>
        </div>
      </header>

      {/* Store Information */}
      <section class="store-info">
        <div class="container">
          <h2>Store Information</h2>
          <p>
            Welcome to LOFERSIL, your one-stop shop for high-quality office
            supplies. We offer a wide range of products including stationery,
            furniture, electronics, and more to keep your workspace productive
            and organized.
          </p>
        </div>
      </section>

      {/* Store Hours and Location */}
      <section class="hours-location">
        <div class="container">
          <div class="hours">
            <h3>Store Hours</h3>
            <ul>
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
          <div class="location">
            <h3>Location</h3>
            <p>
              123 Office Street<br />Business District<br />City, State 12345
            </p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section class="about-us">
        <div class="container">
          <h2>About Us</h2>
          <p>
            Founded in 2023, LOFERSIL has been serving the community with
            top-notch office supplies for over a year. Our mission is to provide
            affordable, high-quality products that help businesses and
            individuals succeed. We pride ourselves on excellent customer
            service and fast delivery.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section class="contact">
        <div class="container">
          <h2>Contact Us</h2>
          <p>Phone: (555) 123-4567</p>
          <p>Email: info@lofersil.com</p>
          <p>Website: www.lofersil.com</p>
        </div>
      </section>

      {/* Footer */}
      <footer class="footer">
        <div class="container">
          <p>&copy; 2024 LOFERSIL Office Supplies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

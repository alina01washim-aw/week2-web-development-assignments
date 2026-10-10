
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <section className="page">
      <span className="page-icon">♡</span>
      <p className="eyebrow">WELCOME HOME</p>
      <h1>Every great journey starts somewhere.</h1>
      <p>
        This is our home page. Explore the website using the navigation above.
      </p>
      <NavLink to="/about" className="primary-button">
        Discover More →
      </NavLink>
    </section>
  )
}

function About() {
  return (
    <section className="page">
      <span className="page-icon">✿</span>
      <p className="eyebrow">GET TO KNOW US</p>
      <h1>A little about this website.</h1>
      <p>
        This project demonstrates React Router, reusable components, and
        navigation between multiple pages without reloading the website.
      </p>
      <NavLink to="/contact" className="primary-button">
        Contact Us →
      </NavLink>
    </section>
  )
}

function Contact() {
  return (
    <section className="page">
      <span className="page-icon">♡</span>
      <p className="eyebrow">LET'S CONNECT</p>
      <h1>We'd love to hear from you.</h1>
      <p>
        Have a question or an idea? This is our contact page.
      </p>
      <a className="primary-button" href="mailto:hello@example.com">
        Send an Email →
      </a>
    </section>
  )
}

function NotFound() {
  return (
    <section className="page">
      <p className="eyebrow">404 ERROR</p>
      <h1>Oops! Page not found.</h1>
      <p>The page you are looking for does not exist.</p>
      <NavLink to="/" className="primary-button">
        Back to Home
      </NavLink>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="website">
        <header className="navbar">
          <NavLink to="/" className="brand">
            <span className="brand-icon">♡</span> Pink Pages
          </NavLink>

          <nav>
            <NavLink to="/" end className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }>
              Contact
            </NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="footer">
          Made with care ♡ · React Router Practice
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
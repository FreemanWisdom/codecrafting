import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Learn from './components/Learn'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen font-sans antialiased text-deep-slate bg-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Learn />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

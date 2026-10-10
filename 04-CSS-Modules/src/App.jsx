
import ProductCard from './ProductCard';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Pink Petals</h1>
        <p>Little things that make you feel special.</p>
      </header>

      <main className="main">
        <h2 className="sectionTitle">Our Featured Product</h2>
        <ProductCard />
      </main>

      <footer className="footer">
        <p>Made with care at Pink Petals.</p>
      </footer>
    </div>
  );
}

export default App;
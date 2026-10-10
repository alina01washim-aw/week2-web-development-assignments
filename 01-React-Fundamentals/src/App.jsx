import { useState } from 'react'
import './App.css'

function ProductCard({ name, price, description, image }) {
const [cartCount, setCartCount] = useState(0)

return ( <div className="product-card"> <img src={image} alt={name} /> <h2>{name}</h2> <p className="price">₹{price}</p> <p>{description}</p>
<button onClick={() => setCartCount(cartCount + 1)}>
Add to Cart </button> <p>Items added: {cartCount}</p> </div>
)
}

function App() {
return ( <div className="app"> <h1>Our Products</h1> <ProductCard
     name="Wireless Headphones"
     price={1499}
     description="Enjoy clear sound and comfortable listening every day."
     image="https://placehold.co/300x200/fce7f3/db2777?text=Headphones"
   /> </div>
)
}

export default App

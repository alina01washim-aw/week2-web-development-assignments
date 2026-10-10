
import styles from './ProductCard.module.css';

function ProductCard() {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=600"
        alt="Perfume bottle"
      />

      <h2 className={styles.name}>Rose Bloom Perfume</h2>

      <p className={styles.description}>
        A refreshing floral fragrance for everyday elegance.
      </p>

      <p className={styles.price}>₹799</p>

      <button
        className={styles.button}
        onClick={() => alert('Rose Bloom Perfume added to cart!')}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
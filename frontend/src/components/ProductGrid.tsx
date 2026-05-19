import { Product } from "../types/product";

interface ProductGridProps {
  title: string;
  products: Product[];
  actionLabel: string;
  emptyMessage: string;
  disabled?: boolean;
  favoriteIds?: number[];
  onAction: (product: Product) => void;
}

export function ProductGrid({
  title,
  products,
  actionLabel,
  emptyMessage,
  disabled = false,
  favoriteIds = [],
  onAction
}: ProductGridProps) {
  return (
    <section className="panel product-section">
      <div className="panel-heading">
        <h2>{title}</h2>
        <span>{products.length} itens</span>
      </div>

      <div className="product-grid">
        {products.map((product) => {
          const isFavorite = favoriteIds.includes(product.id);

          return (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-content">
                <h3>{product.title}</h3>
                <p>R$ {product.price.toFixed(2)}</p>
                {product.rating && (
                  <small>
                    Avaliação {product.rating.rate} ({product.rating.count})
                  </small>
                )}
              </div>
              <button type="button" disabled={disabled || isFavorite} onClick={() => onAction(product)}>
                {isFavorite ? "Favoritado" : actionLabel}
              </button>
            </article>
          );
        })}
      </div>

      {products.length === 0 && <p className="empty">{emptyMessage}</p>}
    </section>
  );
}

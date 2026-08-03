import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/shop/product-card";
import type { Product } from "@/content/products";

export function ProductGrid({ products, priorityCount = 0 }: { products: Product[]; priorityCount?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, i) => (
        <Reveal key={product.id} delay={(i % 4) * 70} y={20}>
          <ProductCard product={product} priority={i < priorityCount} />
        </Reveal>
      ))}
    </div>
  );
}

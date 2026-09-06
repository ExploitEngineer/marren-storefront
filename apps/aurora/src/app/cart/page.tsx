import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SiteShell } from "@/components/layout/site-shell";
import { CartView } from "@/components/cart/cart-view";
import { ProductGrid } from "@/components/shop/product-grid";
import { featuredProducts } from "@/content/products";

export const metadata: Metadata = {
  title: "Your cart",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <SiteShell>
      <Section tone="base" size="sm">
        <Container>
          <h1 className="font-heading text-[clamp(2rem,1.6rem+1.8vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.015em] text-carbon-50">
            Your cart
          </h1>
          <p className="measure-wide mt-4 text-lg text-carbon-200">
            Check the sizes, then head to checkout. Nothing is charged until you pay.
          </p>
        </Container>
      </Section>

      <Section tone="base" size="sm" className="pt-0">
        <Container>
          <CartView />
        </Container>
      </Section>

      {/* Rendered on the server so it is useful whether or not the cart is empty. */}
      <Section tone="panel">
        <Container>
          <h2 className="font-heading text-[clamp(1.5rem,1.3rem+1vw,2rem)] leading-tight font-medium tracking-[-0.01em] text-carbon-50">
            People usually add these.
          </h2>
          <div className="mt-8">
            <ProductGrid products={featuredProducts.slice(0, 4)} />
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}

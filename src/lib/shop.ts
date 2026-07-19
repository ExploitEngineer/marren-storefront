import { products, type Product } from "@/content/products";

export interface ShopQuery {
  material?: string;
  size?: string;
  style?: string;
  sort?: string;
}

export function filterAndSortProducts(query: ShopQuery, source: Product[] = products): Product[] {
  let list = source.filter((p) => {
    if (query.material && p.material !== query.material) return false;
    if (query.size && !p.sizes.includes(query.size as Product["sizes"][number])) return false;
    if (query.style && p.style !== query.style) return false;
    return true;
  });

  switch (query.sort) {
    case "price-asc":
      list = [...list].sort((a, b) => a.priceFrom - b.priceFrom);
      break;
    case "price-desc":
      list = [...list].sort((a, b) => b.priceFrom - a.priceFrom);
      break;
    case "newest":
      list = [...list].sort((a, b) => Number(b.badges?.includes("New")) - Number(a.badges?.includes("New")));
      break;
    default: // featured: bestsellers first, preserve source order otherwise
      list = [...list].sort((a, b) => Number(b.badges?.includes("Bestseller")) - Number(a.badges?.includes("Bestseller")));
  }

  return list;
}

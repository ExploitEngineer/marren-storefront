import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/seo";
import { collections } from "@/content/collections";
import { products } from "@/content/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/shop", "/gallery-wall", "/about", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${baseUrl}/shop/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productRoutes = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}

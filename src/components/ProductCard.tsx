import Link from "next/link";
import type { Product } from "@content/products";
import { Picture } from "./Picture";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <article className="group">
      <Link href={`/saunas/${product.slug}`} className="block focus-visible:outline-offset-8">
        <div className="overflow-hidden bg-paper-deep">
          <Picture
            image={product.images.card}
            desktop={{ width: 1000, height: 1250 }}
            sizes="(min-width: 768px) 45vw, 100vw"
            priority={priority}
            className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-[1200ms] ease-calm group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-6 flex items-baseline justify-between gap-6">
          <div>
            <h3 className="text-title">{product.name}</h3>
            <p className="mt-1 text-ink-soft">{product.tagline}</p>
          </div>
          <span className="shrink-0 text-[0.8125rem] font-medium underline decoration-1 underline-offset-[6px] decoration-ink/30 transition-colors group-hover:decoration-ink">
            Explore<span className="sr-only"> {product.name}</span>
          </span>
        </div>
      </Link>
    </article>
  );
}

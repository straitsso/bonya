import Link from "next/link";
import { formatDate, type Post } from "@/lib/journal";
import { Picture } from "./Picture";

export function JournalCard({ post }: { post: Post }) {
  return (
    <article className="group">
      <Link href={`/journal/${post.slug}`} className="block">
        <div className="overflow-hidden bg-paper-deep">
          <Picture
            image={post.cover}
            desktop={{ width: 800, height: 600 }}
            sizes="(min-width: 768px) 30vw, 100vw"
            className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-[1200ms] ease-calm group-hover:scale-[1.03]"
          />
        </div>
        <p className="mt-5 text-[0.8125rem] text-ink-soft">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h3 className="mt-2 text-[1.5rem] leading-tight">{post.title}</h3>
        <p className="mt-2 text-ink-soft">{post.excerpt}</p>
      </Link>
    </article>
  );
}

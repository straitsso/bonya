import type { MDXComponents } from "mdx/types";

/** Global typography for journal MDX. */
const components: MDXComponents = {
  h2: (props) => <h2 className="mt-14 mb-4 text-title" {...props} />,
  h3: (props) => <h3 className="mt-10 mb-3 text-[1.25rem]" {...props} />,
  p: (props) => <p className="mb-6 text-[1.0625rem] leading-[1.8] text-ink/90" {...props} />,
  a: (props) => <a className="underline decoration-1 underline-offset-4 hover:text-timber" {...props} />,
  ul: (props) => <ul className="mb-6 list-disc space-y-2 pl-5 text-[1.0625rem]" {...props} />,
  ol: (props) => <ol className="mb-6 list-decimal space-y-2 pl-5 text-[1.0625rem]" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-10 border-l border-timber pl-6 font-serif text-title text-ink" {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}

import { blogs } from "#site/content";
import { MDXContent } from "@/components/mdx/mdx-components";
import ProgressBar from "@/components/mdx/progress-bar";
import { cn } from "@/lib/utils";
import "@/styles/mdx.css";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: {
    slug: string[];
  };
}

async function getBlogFromParams(params: BlogPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const blog = blogs.find((blog) => blog.slugAsParams === slug);
  return blog;
}

export async function generateStaticParams(): Promise<
  BlogPageProps["params"][]
> {
  return blogs.map((blog) => ({
    slug: blog.slugAsParams.split("/"),
  }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlogFromParams(params);
  if (!blog) {
    notFound();
  }
  return (
    <section className="w-full max-w-5xl mx-auto">
      <ProgressBar />
      <div
        className={cn(
          "w-full max-w-4xl",
          blog.status === "draft" && "opacity-30"
        )}
      >
        <MDXContent code={blog.content} />
      </div>
    </section>
  );
}

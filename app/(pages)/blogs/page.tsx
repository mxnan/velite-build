import { blogs } from "#site/content";
import { Icons } from "@/components/icons";

import BounceLoader from "@/components/ui/bounce-loader";
import { sortBlogs } from "@/lib/utils";
import { FadeText } from "@/showcase/_components/fade-text";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";

const BlogCard = dynamic(() => import("@/components/blog-card"), {
  ssr: false,
  loading: () => (
    <div className="h-3/4 w-3/4 my-6 bg-secondary rounded-lg flex items-center justify-center ">
      <BounceLoader />
    </div>
  ),
});
export const metadata: Metadata = {
  title: "Blogs",
  description: "Blogs of mxnan",
};
export default async function BlogsPage() {
  const sortedBlogs = sortBlogs(blogs.filter((blog) => blog));
  const displayBlogs = sortedBlogs;
  return (
    <section
      className="w-full relative max-w-4xl mx-auto flex-1 max-lg:space-y-32 
  py-12 "
    >
      {/* BlogCards div */}
      <div className="flex-1 h-max flex flex-col gap-8 ">
        <div className="space-y-5 flex flex-col max-md:items-center">
          <FadeText
            text="Blogs"
            direction="left"
            className="scroll-m-10  tracking-tight
        text-[5rem]  xl:text-[6rem] md:leading-[7rem] 
        font-semibold "
          />

          <p className="[view-transition-name:text2] flex">
            Just some blogs to showcase learnings and findings 
            <Icons.chevronDown className="w-6 h-6" />
          </p>
        </div>
        {displayBlogs?.length > 0 && (
          <div
            className="flex-1 p-4 
                    grid grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-2
                    justify-items-center content-center"
          >
            {displayBlogs?.map((blog, index) => (
              <BlogCard key={blog.slug} index={index} {...blog} />
            ))}
          </div>
        )}
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
    </section>
  );
}

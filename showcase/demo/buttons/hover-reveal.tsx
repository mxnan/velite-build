"use client";
import React from "react";
import { motion } from "framer-motion";

export default function GithubStarDemo() {
  const buttonVariant = {
    initial: {
      opacity: 0,
      y: -30,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const svgTraceVariant = {
    initial: {
      pathLength: 0,
      scale: 1,
    },
    hover: {
      scale: 1.1,
      pathLength: 1,
      transition: {
        duration: 1.3,
        delay: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const bghoverVariant = {
    initial: {
      scale: 1,
      opacity: 0,
    },
    hover: {
      opacity: 1,
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const textVariant = {
    initial: {
      y: -50,
    },
    hover: {
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="z-10">
      <a
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Github Star"
        href="https://github.com/mxnan/nextjs-velite-tailwind-framer"
      >
        <motion.button
          variants={buttonVariant}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="flex items-center gap-8 my-4 py-2 px-4 rounded-xl max-sm:hidden
     bg-primary overflow-hidden group/button
     border border-primary"
        >
          <span className="flex items-center text-lg font-medium text-primary-foreground gap-1">
            Find Repo ?{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid"
              className="w-7 h-7 fill-none  stroke-[3px]
         stroke-primary-foreground group-hover/button:scale-90
         group-hover/button:translate-x-3 duration-500 ease-in-out
         "
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
          <span className="relative px-2 py-1 flex items-center gap-2">
            <motion.span
              variants={bghoverVariant}
              className="absolute z-10 rounded-lg inset-0 dark:bg-indigo-600 bg-lime-400"
            />
            <motion.span
              className="text-primary font-bold z-20"
              variants={textVariant}
            >
              Give a Star on Github ?
            </motion.span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid"
              className="w-6 h-6  pb-1  fill-transparent stroke-[2px] stroke-primary z-20"
            >
              <motion.polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                variants={svgTraceVariant}
              />
            </svg>
          </span>
        </motion.button>
      </a>
    </section>
  );
}

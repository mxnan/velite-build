import {
  BlurVignetteEffect,
  BlurVignetteEffectArticle,
} from "@/showcase/_components/blur-vignette-effect";
import React from "react";

export default function BlurVignetteDemo() {
  return (
    <>
      <div className="w-full h-96 rounded-xl overflow-hidden">
        <BlurVignetteEffect
          radius="0px"
          inset="0px"
          transitionLength="200px"
          blur="100px"
          className="w-full h-full"
          whileHover={{
            scale: 1.02,
            y: -5,
            opacity: 0.8,
            transition: {
              duration: 0.5,
              ease: "easeInOut",
              type: "spring",
              damping: 50,
              stiffness: 200,
            },
          }}
        >
          <video
            autoPlay={true}
            muted
            loop
            playsInline
            preload="auto"
            content="true"
            className="w-full h-full object-cover"
          >
            <source
              src="https://cdn.pixabay.com/video/2023/11/13/188912-884171167_large.mp4"
              type="video/mp4"
            />
          </video>
          <BlurVignetteEffectArticle />
        </BlurVignetteEffect>
      </div>
    </>
  );
}

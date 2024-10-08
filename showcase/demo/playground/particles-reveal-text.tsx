import ParticlesReveal from "@/showcase/_components/particles-reveal";
import React from "react";

export default function ParticlesRevealTextDemo() {
  return (
    <div className="w-2/3 h-80 flex items-center justify-center">
      <ParticlesReveal width="fit-content" duration={2}>
        <h1 className="text-5xl py-6 text-center font-semibold ">
          Just a Heading with reveal animations
        </h1>
      </ParticlesReveal>
    </div>
  );
}

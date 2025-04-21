'use client'

import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import AnimatedListDemo from "../listdemo/page";
import { SparklesText } from "@/components/magicui/sparkles-text";

export default function LandingPage() {
  return (
    <>
      <SmoothCursor />
      <div className="min-h-screen relative overflow-hidden">
        {/* Neon Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_rgba(120,119,198,0.3),_rgba(255,255,255,0))]">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/90 via-[#1e1b4b]/90 to-[#4c1d95]/90" />
          
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3b82f6]/20 via-[#8b5cf6]/20 to-[#ec4899]/20 animate-pulse" />
          
          {/* Neon grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(59,130,246,0.1)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(59,130,246,0.1)_1px,_transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          
          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#3b82f6]/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#ec4899]/20 blur-3xl animate-pulse [animation-delay:1s]" />
        </div>
        
        {/* Content */}
        <div className="relative">
          {/* Main Content - Fixed to Viewport */}
          <div className="h-screen flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Animated Gradient Text */}
              <div className="group relative mx-auto flex items-center justify-center rounded-full px-2 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] w-fit bg-black">
                <span
                  className={cn(
                    "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
                  )}
                  style={{
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "destination-out",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "subtract",
                    WebkitClipPath: "padding-box",
                  }}
                />
                🔥⛓️ <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
                <AnimatedGradientText className="text-sm font-medium bg-amber-100">
                  Introducing zkML Platform
                </AnimatedGradientText>
                <ChevronRight
                  className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
                />
              </div>

              {/* Main Title */}
              <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
                <LineShadowText className="italic text-white" shadowColor="white">
                  zugging
                </LineShadowText>
                <LineShadowText className="italic text-blue-600" shadowColor="white">
                  Face.
                </LineShadowText>
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-white max-w-2xl mx-auto font-bold italic">
                Snug your models, prove with love — zkML on Sei just got huggable.
              </p>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mt-4">
                A zkML model execution and verification hub powered by zero-knowledge proofs on the Sei blockchain.
              </p>

              {/* Partner Logos */}
              <div className="flex items-center justify-center gap-6 mt-8 mb-8">
                <div className="relative group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] p-[2px] shadow-lg shadow-[#3b82f6]/30 group-hover:shadow-[#3b82f6]/50 transition-shadow">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src="/dynamic.png"
                        alt="Dynamic Logo"
                        className="w-full h-full object-cover"
                        style={{ background: 'white' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#dc2626] to-[#ef4444] blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-[#dc2626] to-[#ef4444] p-[2px] shadow-lg shadow-[#dc2626]/30 group-hover:shadow-[#dc2626]/50 transition-shadow">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src="/sei.png"
                        alt="Sei Logo"
                        className="w-full h-full object-cover"
                        style={{ background: '#dc2626' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Started Button */}
              <div className="group relative mx-auto flex items-center justify-center rounded-full px-3 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] w-fit bg-black">
                <a href="/connect" className="flex items-center">
                  <span
                    className={cn(
                      "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
                    )}
                    style={{
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "destination-out",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "subtract",
                      WebkitClipPath: "padding-box",
                    }}
                  />
                  <AnimatedGradientText className="text-sm font-medium bg-amber-100">
                    Get started 🐻
                  </AnimatedGradientText>
                  <ChevronRight
                    className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Animated List Demo - Between Main Content and Video */}
          <div className="relative z-10 -mt-32 mb-32">
            <div className="max-w-4xl mx-auto">
              <AnimatedListDemo />
            </div>
          </div>

          {/* Hero Video Dialog - Below Viewport */}
          <div className="h-[80vh] flex items-start justify-center pt-8">
            <div className="max-w-4xl mx-auto">
              <HeroVideoDialog
                className="block dark:hidden"
                animationStyle="top-in-bottom-out"
                videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                thumbnailAlt="Hero Video"
              />
              <HeroVideoDialog
                className="hidden dark:block"
                animationStyle="top-in-bottom-out"
                videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                thumbnailAlt="Hero Video"
              />
            </div>
          </div>

          {/* Steps Section */}
          <div className="relative py-20">
            {/* Background gradient for steps */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1e1b4b]/20 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="group relative mx-auto flex items-center justify-center rounded-full px-3 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] w-fit bg-black">
                  <span
                    className={cn(
                      "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
                    )}
                    style={{
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "destination-out",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "subtract",
                      WebkitClipPath: "padding-box",
                    }}
                  />
                  <AnimatedGradientText className="text-xl font-medium sm:text-medium bg-amber-100">
                    How it works 🛠️
                  </AnimatedGradientText>
                  <ChevronRight
                    className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
                  />
                </div>
                <p className="mt-4 text-2xl text-white font-bold italic">
                  Three simple steps to get started with zkML on Sei
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-[#1e1b4b]/50 to-[#0f172a]/50 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105">
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#3b82f6]/20 to-transparent rounded-tl-3xl" />
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#8b5cf6]/20 to-transparent rounded-br-3xl" />
                  
                  {/* Number circle with glow */}
                  <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-white font-bold shadow-lg shadow-[#3b82f6]/30 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow duration-500">
                    <span className="text-3xl">1</span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">
                        Upload Your Model
                      </span>
                    </h3>
                    <p className="text-white/70 text-lg leading-relaxed">
                      Upload your machine learning model to ZuggingFace. We support various model formats and architectures.
                    </p>
                    <div className="mt-6">
                      <span className="inline-flex items-center text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                        Learn more
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-[#1e1b4b]/50 to-[#0f172a]/50 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:scale-105">
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#8b5cf6]/20 to-transparent rounded-tl-3xl" />
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#ec4899]/20 to-transparent rounded-br-3xl" />
                  
                  {/* Number circle with glow */}
                  <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] flex items-center justify-center text-white font-bold shadow-lg shadow-[#8b5cf6]/30 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-shadow duration-500">
                    <span className="text-3xl">2</span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8b5cf6] to-[#ec4899]">
                        Generate Proofs
                      </span>
                    </h3>
                    <p className="text-white/70 text-lg leading-relaxed">
                      Our platform automatically generates zero-knowledge proofs for your model's inferences using Halo2.
                    </p>
                    <div className="mt-6">
                      <span className="inline-flex items-center text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                        Learn more
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-[#1e1b4b]/50 to-[#0f172a]/50 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:scale-105">
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#ec4899]/20 to-transparent rounded-tl-3xl" />
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#3b82f6]/20 to-transparent rounded-br-3xl" />
                  
                  {/* Number circle with glow */}
                  <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-r from-[#ec4899] to-[#3b82f6] flex items-center justify-center text-white font-bold shadow-lg shadow-[#ec4899]/30 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-shadow duration-500">
                    <span className="text-3xl">3</span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ec4899] to-[#3b82f6]">
                        Verify on Sei
                      </span>
                    </h3>
                    <p className="text-white/70 text-lg leading-relaxed">
                      Deploy your verified proofs on the Sei blockchain for trustless verification and integration with smart contracts.
                    </p>
                    <div className="mt-6">
                      <span className="inline-flex items-center text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                        Learn more
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sparkles Text Section */}
          <div className="relative py-12 text-center">
            <div className="max-w-7xl mx-auto">
              <SparklesText className="text-4xl font-bold text-white">
                built by rahul shanmugam.
              </SparklesText>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
'use client'

import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

export default function LandingPage() {
  return (
    <>
      <SmoothCursor />
      <div className="min-h-screen relative overflow-hidden">
        {/* Neon Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_rgba(120,119,198,0.3),_rgba(255,255,255,0))]" />
        </div>
        
        {/* Content */}
        <div className="relative">
          {/* Main Content - Fixed to Viewport */}
          <div className="h-screen flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Animated Gradient Text */}
              <div className="group relative mx-auto flex items-center justify-center rounded-full px-2 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] w-fit">
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
                🚀 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
                <AnimatedGradientText className="text-sm font-medium">
                  Introducing zkML Platform
                </AnimatedGradientText>
                <ChevronRight
                  className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
                />
              </div>

              {/* Main Title */}
              <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
                <LineShadowText className="italic" shadowColor="black">
                  zugging
                </LineShadowText>
                <LineShadowText className="italic text-blue-600" shadowColor="black">
                  Face.
                </LineShadowText>
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Zero-knowledge machine learning platform for secure and private AI inference
              </p>
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
        </div>
      </div>
    </>
  );
} 
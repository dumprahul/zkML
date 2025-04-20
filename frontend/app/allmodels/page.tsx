'use client';

import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";

const models = [
  {
    name: "Image Classifier",
    description: "Advanced image classification model with zero-knowledge proofs for privacy-preserving inference",
    color: "#3b82f6",
  },
  {
    name: "NLP Model",
    description: "Natural language processing model with verifiable text classification capabilities",
    color: "#8b5cf6",
  },
  {
    name: "Security Model",
    description: "Security-focused model for anomaly detection with privacy guarantees",
    color: "#ec4899",
  },
  {
    name: "Recommendation",
    description: "Personalized recommendation system with privacy-preserving user data handling",
    color: "#f59e0b",
  },
  {
    name: "Time Series",
    description: "Time series prediction model with verifiable forecasting capabilities",
    color: "#10b981",
  },
  {
    name: "Privacy Model",
    description: "Differential privacy model for secure data analysis and inference",
    color: "#6366f1",
  },
  {
    name: "Optimization",
    description: "Optimization model for resource allocation with verifiable results",
    color: "#f43f5e",
  },
  {
    name: "Network Model",
    description: "Network analysis model with privacy-preserving graph processing",
    color: "#8b5cf6",
  },
  {
    name: "Custom Model",
    description: "Upload and verify your own custom machine learning model",
    color: "#3b82f6",
  },
];

export default function AllModelsPage() {
  const { user } = useDynamicContext();
  const router = useRouter();

  return (
    <>
      <SmoothCursor />
      <div className="min-h-screen relative overflow-hidden">
        {/* Wallet Status */}
        <div className="absolute top-4 right-4 z-20">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="bg-white/5 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10">
                <span className="text-white/90 text-sm font-medium">
                  {user.email || 'Connected'}
                </span>
              </div>
              <button
                onClick={() => router.push('/connect')}
                className="bg-white/5 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-white/90 text-sm font-medium">Change Wallet</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push('/connect')}
              className="bg-white/5 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-white/90 text-sm font-medium">Connect Wallet</span>
            </button>
          )}
        </div>

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
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-7xl">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="relative">
                <LineShadowText className="italic text-white text-7xl font-bold" shadowColor="white">
                  Models.
                </LineShadowText>
                <div className="absolute -bottom-4 left-0 w-full">
                  <LineShadowText className="italic text-white/30 text-5xl font-bold" shadowColor="transparent">
                    available
                  </LineShadowText>
                </div>
              </div>
              <AnimatedGradientText className="text-xl text-white/90 font-medium tracking-tight mt-8">
                Choose from our collection of pre-verified models or upload your own
              </AnimatedGradientText>
            </div>

            {/* Model Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {models.map((model, index) => (
                <div
                  key={model.name}
                  className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:scale-[1.02]"
                >
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {model.name}
                    </h3>
                    <p className="text-white/70 text-base leading-relaxed">
                      {model.description}
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                        Select model
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>

                  {/* Glass effect overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
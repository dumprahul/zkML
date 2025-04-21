'use client';

import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight, Upload, X, Plus, FileUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from 'react';

const models = [
  {
    name: "Upload Your Model",
    description: "Upload and verify your own custom machine learning model",
    isUpload: true,
    color: "#3b82f6",
    status: "NotAvailable"
  },
  {
    name: "Carbon Weight Calculator",
    description: "Calculate your carbon credits based on your inputs. Prove your carbon credits without revealing your data.",
    owner: "0x0612D26676869aFcF8BCfdcC55Bd62a307fBF4b5",
    costPerCall: "0.01 ETH",
    color: "#3b82f6",
    status: "Available"
  },
  {
    name: "NLP Model",
    description: "Natural language processing model with verifiable text classification capabilities",
    owner: "0x0612D26676869aFcF8BCfdcC55Bd62a307fBF4b5",
    costPerCall: "0.02 ETH",
    color: "#8b5cf6",
    status: "NotAvailable"
  },
  {
    name: "Security Model",
    description: "Security-focused model for anomaly detection with privacy guarantees",
    owner: "0x0612D26676869aFcF8BCfdcC55Bd62a307fBF4b5",
    costPerCall: "0.015 ETH",
    color: "#ec4899",
    status: "NotAvailable"
  },
  {
    name: "Recommendation",
    description: "Personalized recommendation system with privacy-preserving user data handling",
    owner: "0x0612D26676869aFcF8BCfdcC55Bd62a307fBF4b5",
    costPerCall: "0.01 ETH",
    color: "#f59e0b",
    status: "NotAvailable"
  },
  {
    name: "Time Series",
    description: "Time series prediction model with verifiable forecasting capabilities",
    owner: "0x0612D26676869aFcF8BCfdcC55Bd62a307fBF4b5",
    costPerCall: "0.02 ETH",
    color: "#10b981",
    status: "NotAvailable"
  },
  {
    name: "Privacy Model",
    description: "Differential privacy model for secure data analysis and inference",
    owner: "0x0612D26676869aFcF8BCfdcC55Bd62a307fBF4b5",
    costPerCall: "0.015 ETH",
    color: "#6366f1",
    status: "NotAvailable"
  },
  {
    name: "Optimization",
    description: "Optimization model for resource allocation with verifiable results",
    owner: "0x0612D26676869aFcF8BCfdcC55Bd62a307fBF4b5",
    costPerCall: "0.01 ETH",
    color: "#f43f5e",
    status: "NotAvailable"
  },
  {
    name: "Network Model",
    description: "Network analysis model with privacy-preserving graph processing",
    owner: "0x0612D26676869aFcF8BCfdcC55Bd62a307fBF4b5",
    costPerCall: "0.02 ETH",
    color: "#8b5cf6",
    status: "NotAvailable"
  },
  {
    name: "Custom Model",
    description: "Upload and verify your own custom machine learning model",
    owner: "0x0612D26676869aFcF8BCfdcC55Bd62a307fBF4b5",
    costPerCall: "0.01 ETH",
    color: "#3b82f6",
    status: "NotAvailable"
  },
];

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  description: string;
  costPerCall: string;
  category: string;
  version: string;
  tags: string;
}

// Add Modal Component
const UploadModal = ({ isOpen, onClose }: UploadModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    costPerCall: '',
    category: '',
    version: '',
    tags: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData, selectedFile);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#1a1b1e] border border-white/10">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-xl font-medium text-white">Upload Your Model</h3>
          <button
            onClick={onClose}
            className="p-1 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* File Upload Section */}
          <div className="relative group">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="model-file"
              accept=".h5,.pkl,.pt,.onnx"
            />
            <label
              htmlFor="model-file"
              className="flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/[0.07] hover:border-white/30 transition-all cursor-pointer group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {selectedFile ? (
                  <>
                    <FileUp className="w-10 h-10 mb-3 text-[#3b82f6]" />
                    <p className="mb-2 text-sm text-white/90">
                      <span className="font-semibold">{selectedFile.name}</span>
                    </p>
                    <p className="text-xs text-white/60">
                      Click to change file
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="w-10 h-10 mb-3 text-white/70" />
                    <p className="mb-2 text-sm text-white/90">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-white/60">
                      Supported formats: .h5, .pkl, .pt, .onnx
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-6">
            {/* Model Name */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white/90 mb-2">
                Model Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-[#3b82f6]/50 focus:ring-2 focus:ring-[#3b82f6]/20 text-white placeholder-white/40 transition-all"
                placeholder="Enter model name"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white/90 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-[#3b82f6]/50 focus:ring-2 focus:ring-[#3b82f6]/20 text-white placeholder-white/40 transition-all resize-none"
                placeholder="Describe your model..."
              />
            </div>

            {/* Cost Per Call */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Cost Per Call (ETH)
              </label>
              <input
                type="text"
                name="costPerCall"
                value={formData.costPerCall}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-[#3b82f6]/50 focus:ring-2 focus:ring-[#3b82f6]/20 text-white placeholder-white/40 transition-all"
                placeholder="0.01"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-[#3b82f6]/50 focus:ring-2 focus:ring-[#3b82f6]/20 text-white placeholder-white/40 transition-all"
              >
                <option value="" disabled>Select category</option>
                <option value="nlp">Natural Language Processing</option>
                <option value="cv">Computer Vision</option>
                <option value="rl">Reinforcement Learning</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Version */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Version
              </label>
              <input
                type="text"
                name="version"
                value={formData.version}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-[#3b82f6]/50 focus:ring-2 focus:ring-[#3b82f6]/20 text-white placeholder-white/40 transition-all"
                placeholder="1.0.0"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-[#3b82f6]/50 focus:ring-2 focus:ring-[#3b82f6]/20 text-white placeholder-white/40 transition-all"
                placeholder="Enter tags separated by commas"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white font-medium rounded-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300"
            >
              Upload Model
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function AllModelsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
                  zkModeLs
                </LineShadowText>
                <div className="absolute -bottom-4 left-0 w-full">
                  <LineShadowText className="italic text-white/30 text-5xl font-bold" shadowColor="transparent">
                    available
                  </LineShadowText>
                </div>
              </div>
              <div className="mt-12 mb-8">
                <AnimatedGradientText className="text-xl text-white/90 font-medium tracking-tight italic">
                  Choose from our collection of pre-verified models or upload your own - to get monitized. 
                </AnimatedGradientText>
              </div>
            </div>

            {/* Model Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {models.map((model, index) => (
                <div
                  key={model.name}
                  onClick={() => {
                    if (model.name === "Carbon Weight Calculator") {
                      router.push('/zkmodel');
                    } else if (model.isUpload) {
                      setIsModalOpen(true);
                    }
                  }}
                  className={`group relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02] ${
                    (model.name === "Carbon Weight Calculator" || model.isUpload) 
                      ? "cursor-pointer" 
                      : "cursor-not-allowed opacity-50"
                  } ${
                    model.isUpload
                      ? "bg-gradient-to-br from-[#3b82f6]/20 to-[#8b5cf6]/20 border-[#3b82f6]/30 hover:border-[#3b82f6]/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                      : "bg-white/5 border-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                  }`}
                >
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white">
                        {model.name}
                      </h3>
                      {!model.isUpload && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          model.status === "Available" 
                            ? "bg-green-500/20 text-green-400" 
                            : "bg-red-500/20 text-red-400"
                        }`}>
                          {model.status}
                        </span>
                      )}
                    </div>
                    {model.isUpload ? (
                      <div className="space-y-4">
                        <p className="text-white/70 text-base leading-relaxed">
                          {model.description}
                        </p>
                        <div className="flex items-center justify-center p-4 border-2 border-dashed border-white/20 rounded-xl hover:border-white/30 transition-colors">
                          <div className="text-center">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-white/70" />
                            <span className="text-white/70 text-sm">Drag and drop your model here</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-white/70 text-sm">
                          <span className="text-white/50">Owner: </span>
                          <span className="font-mono">{model.owner?.slice(0, 6)}...{model.owner?.slice(-4)}</span>
                        </div>
                        <p className="text-white/70 text-base leading-relaxed">
                          {model.description}
                        </p>
                        <div className="text-white/70 text-sm">
                          <span className="text-white/50">Cost per call: </span>
                          <span className="font-medium">{model.costPerCall}</span>
                        </div>
                      </div>
                    )}
                    <div className="mt-4">
                      <span className="inline-flex items-center text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                        {model.isUpload ? "Upload model" : "Select model"}
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
      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
} 
'use client'

// app/page.tsx

import { useState, FormEvent, ChangeEvent } from 'react';
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight, Upload, FileJson, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

type StepStatus = 'pending' | 'in-progress' | 'completed' | 'error';

interface Step {
  name: string;
  status: StepStatus;
  description: string;
}

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [proof, setProof] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [steps, setSteps] = useState<Step[]>([
    { name: 'Witness Generation', status: 'pending', description: 'Generating witness from input' },
    { name: 'Proof Generation', status: 'pending', description: 'Creating zero-knowledge proof' },
    { name: 'Proof Verification', status: 'pending', description: 'Verifying the generated proof' }
  ]);

  const updateStepStatus = (stepIndex: number, status: StepStatus) => {
    setSteps(prev => prev.map((step, idx) => 
      idx === stepIndex ? { ...step, status } : step
    ));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.name !== 'input.json') {
        setMessage('Please upload input.json file only');
        return;
      }
      setFile(selectedFile);
      setMessage('');
      setProof(null);
      setSteps(steps.map(step => ({ ...step, status: 'pending' })));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select input.json file first.');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json();
        setMessage(result.error || 'Error processing file.');
        setSteps(steps.map(step => ({ ...step, status: 'error' })));
      } else {
      const result = await response.json();
        setMessage('All steps completed successfully!');
        setProof(result);
        setSteps(steps.map(step => ({ ...step, status: 'completed' })));
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error processing file.');
      setSteps(steps.map(step => ({ ...step, status: 'error' })));
    } finally {
      setLoading(false);
    }
  };

  const getStepColor = (status: StepStatus) => {
    switch (status) {
      case 'completed': return 'bg-[#22c55e] shadow-lg shadow-[#22c55e]/20';
      case 'in-progress': return 'bg-blue-500 shadow-lg shadow-blue-200 animate-pulse';
      case 'error': return 'bg-red-500 shadow-lg shadow-red-200';
      default: return 'bg-gray-300 shadow-md';
    }
  };

  const getStepIcon = (status: StepStatus) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5" />;
      case 'in-progress': return <Loader2 className="w-5 h-5 animate-spin" />;
      case 'error': return <XCircle className="w-5 h-5" />;
      default: return <div className="w-5 h-5 rounded-full bg-white/20" />;
    }
  };

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
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Section - Title and Description */}
              <div className="flex flex-col justify-center h-full">
                <div className="space-y-6">
                  <div className="relative">
                    <LineShadowText className="italic text-white text-7xl font-bold" shadowColor="white">
                      zkML.
                    </LineShadowText>
                    <div className="absolute -bottom-4 left-0 w-full">
                      <LineShadowText className="italic text-white/30 text-5xl font-bold" shadowColor="transparent">
                        proofs generator
                      </LineShadowText>
                    </div>
                  </div>
                  <AnimatedGradientText className="text-xl text-white/90 font-medium tracking-tight">
                    Generate zero-knowledge proofs for your machine learning models with ease and confidence
                  </AnimatedGradientText>
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-3 text-white/80 group">
                      <div className="relative p-1.5 rounded-full bg-[#3b82f6]/20 group-hover:bg-[#3b82f6]/30 transition-all duration-300">
                        <div className="absolute inset-0 rounded-full border border-[#3b82f6] animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CheckCircle2 className="w-4 h-4 text-[#3b82f6] relative z-10 transform group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-lg font-medium group-hover:text-white transition-colors">Secure and private ML inference</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80 group">
                      <div className="relative p-1.5 rounded-full bg-[#8b5cf6]/20 group-hover:bg-[#8b5cf6]/30 transition-all duration-300">
                        <div className="absolute inset-0 rounded-full border border-[#8b5cf6] animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CheckCircle2 className="w-4 h-4 text-[#8b5cf6] relative z-10 transform group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-lg font-medium group-hover:text-white transition-colors">Trustless verification on blockchain</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80 group">
                      <div className="relative p-1.5 rounded-full bg-[#ec4899]/20 group-hover:bg-[#ec4899]/30 transition-all duration-300">
                        <div className="absolute inset-0 rounded-full border border-[#ec4899] animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CheckCircle2 className="w-4 h-4 text-[#ec4899] relative z-10 transform group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-lg font-medium group-hover:text-white transition-colors">Seamless integration with your workflow</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Upload and Processing */}
              <div className="space-y-8">
                {/* Upload Section */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transform hover:scale-[1.02] transition-all duration-300">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <label className="block text-white text-lg font-medium">
                        Upload input.json
                      </label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-white/40 transition-colors group">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                              <FileJson className="w-12 h-12 mb-3 text-white/60 group-hover:text-white/80 transition-colors" />
                            </div>
                            <p className="mt-4 mb-2 text-sm text-white/60 group-hover:text-white/80 transition-colors">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-white/40">input.json only</p>
                          </div>
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                      {file && (
                        <div className="text-white/60 text-sm flex items-center gap-2">
                          <FileJson className="w-4 h-4" />
                          <span className="font-medium">{file.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Preview Section */}
                    <div className="mt-4 p-4 bg-black/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FileJson className="w-4 h-4 text-white/60" />
                        <span className="text-sm text-white/60">Expected format:</span>
                      </div>
                      <pre className="text-xs text-white/60 overflow-auto bg-black/10 p-3 rounded">
                        {`{
  "input_data": [
    [0.8329, 1.0286, 0.6701, 0.6694, -1.0937]
  ]
}`}
                      </pre>
                    </div>

        <button
          type="submit"
                      disabled={loading || !file}
                      className={cn(
                        "w-full py-4 px-6 rounded-lg font-medium transition-all duration-200",
                        "bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white",
                        "hover:from-[#4b92f6] hover:to-[#9b6cf6] hover:shadow-lg hover:shadow-[#3b82f6]/20",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "flex items-center justify-center gap-2"
                      )}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          Generate Proof
                        </>
                      )}
        </button>
      </form>
                </div>

                {/* Processing Steps */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <ChevronRight className="w-5 h-5 text-white/60" />
                    Processing Steps
                  </h2>
                  <div className="space-y-6">
                    {steps.map((step, index) => (
                      <div key={step.name} className="flex items-center gap-4 group">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                          getStepColor(step.status),
                          "group-hover:scale-105"
                        )}>
                          {getStepIcon(step.status)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium group-hover:text-white/90 transition-colors">
                            {step.name}
                          </h3>
                          <p className="text-white/60 text-sm group-hover:text-white/70 transition-colors">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Display */}
                {message && (
                  <div className={cn(
                    "p-4 rounded-lg",
                    message.includes('Error') ? 'bg-red-500/10 border border-red-500/20' : 'bg-green-500/10 border border-green-500/20'
                  )}>
                    <p className={cn(
                      "text-sm flex items-center gap-2",
                      message.includes('Error') ? 'text-red-400' : 'text-green-400'
                    )}>
                      {message.includes('Error') ? (
                        <XCircle className="w-4 h-4" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      {message}
                    </p>
                  </div>
                )}

                {/* View Proof Button */}
                {proof && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => setShowModal(true)}
                      className={cn(
                        "py-3 px-6 rounded-lg font-medium transition-all duration-200",
                        "bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white",
                        "hover:from-[#4b92f6] hover:to-[#9b6cf6] hover:shadow-lg hover:shadow-[#3b82f6]/20",
                        "flex items-center gap-2"
                      )}
                    >
                      <FileJson className="w-5 h-5" />
                      View Proof
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Proof Modal */}
        {showModal && proof && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Generated Proof</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="bg-black/20 rounded-lg p-4">
                <pre className="text-white/80 text-sm overflow-auto">
                  {JSON.stringify(proof.proof, null, 2)}
                </pre>
              </div>
              {proof.verification && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Verification Result</h3>
                  <div className="bg-black/20 rounded-lg p-4">
                    <pre className="text-white/80 text-sm">
                      {proof.verification}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
    </>
  );
}
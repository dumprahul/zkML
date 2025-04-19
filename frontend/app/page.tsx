'use client'

// app/page.tsx

import { useState, FormEvent, ChangeEvent } from 'react';

type StepStatus = 'pending' | 'in-progress' | 'completed' | 'error';

interface Step {
  name: string;
  status: StepStatus;
  description: string;
}

export default function Home() {
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
      case 'completed': return 'bg-green-500 shadow-lg shadow-green-200';
      case 'in-progress': return 'bg-blue-500 shadow-lg shadow-blue-200 animate-pulse';
      case 'error': return 'bg-red-500 shadow-lg shadow-red-200';
      default: return 'bg-gray-300 shadow-md';
    }
  };

  const getStepIcon = (status: StepStatus) => {
    switch (status) {
      case 'completed': return '✓';
      case 'in-progress': return '⟳';
      case 'error': return '✕';
      default: return '○';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            zkML Proof Generator
          </h1>
          <p className="text-gray-600">Upload your input.json file to generate zero-knowledge proofs</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform hover:shadow-2xl transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-gray-700 text-sm font-semibold">
                Upload input.json
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">input.json only</p>
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
                <div className="mt-2 text-sm text-gray-600">
                  Selected file: <span className="font-medium">{file.name}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              disabled={loading || !file}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                'Generate Proof'
              )}
            </button>
          </form>
        </div>

        {/* Progress Timeline */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform hover:shadow-2xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Processing Steps
          </h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.name} className="flex items-center group">
                <div className="flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getStepColor(step.status)} transition-all duration-300`}>
                    {getStepIcon(step.status)}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {step.name}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      step.status === 'completed' ? 'bg-green-100 text-green-800' :
                      step.status === 'error' ? 'bg-red-100 text-red-800' :
                      step.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    } transition-all duration-300`}>
                      {step.status === 'completed' ? 'Completed' :
                       step.status === 'error' ? 'Failed' :
                       step.status === 'in-progress' ? 'In Progress' :
                       'Pending'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200 ml-3.5 group-hover:bg-blue-200 transition-colors duration-300" />
                )}
              </div>
            ))}
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-4 transform transition-all duration-300 ${
            message.includes('Error') ? 
            'bg-red-50 border-l-4 border-red-500 hover:shadow-lg hover:shadow-red-100' : 
            'bg-green-50 border-l-4 border-green-500 hover:shadow-lg hover:shadow-green-100'
          }`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {message.includes('Error') ? (
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm ${message.includes('Error') ? 'text-red-700' : 'text-green-700'}`}>{message}</p>
              </div>
            </div>
          </div>
        )}

        {proof && (
          <div className="flex justify-center transform hover:scale-105 transition-transform duration-300">
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl hover:shadow-green-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Proof
            </button>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto shadow-2xl transform transition-all duration-300">
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <h2 className="text-2xl font-bold text-gray-800">Generated Proof</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Proof</h3>
                  <pre className="text-sm text-gray-800 overflow-auto bg-white p-4 rounded">
                    {JSON.stringify(proof.proof, null, 2)}
                  </pre>
                </div>
                {proof.verification && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Verification Result</h3>
                    <div className="bg-white p-4 rounded">
                      <pre className="text-sm text-gray-800">
                        {proof.verification}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

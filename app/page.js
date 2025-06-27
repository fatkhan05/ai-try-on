'use client';

import { useState, useRef, useEffect } from 'react';
import Image from "next/image";

export default function Home() {
  // State Management
  const [selectedGarment, setSelectedGarment] = useState('');
  const [selectedFabric, setSelectedFabric] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tryOnResult, setTryOnResult] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Data untuk garment options
  const garmentOptions = [
    { 
      id: 'dress', 
      name: 'Dress', 
      icon: '👗', 
      desc: 'Elegant & Feminine',
      image: '/images/dress-template.jpg'
    },
    { 
      id: 'blouse', 
      name: 'Blouse', 
      icon: '👚', 
      desc: 'Professional & Chic',
      image: '/images/blouse-template.jpg'
    },
    { 
      id: 'pants', 
      name: 'Pants', 
      icon: '👖', 
      desc: 'Versatile & Comfortable',
      image: '/images/pants-template.jpg'
    },
    { 
      id: 'skirt', 
      name: 'Skirt', 
      icon: '🩱', 
      desc: 'Stylish & Modern',
      image: '/images/skirt-template.jpg'
    }
  ];

  // Data untuk fabric options
  const fabricOptions = [
    { 
      id: 'cotton', 
      name: 'Cotton', 
      texture: 'Soft & Breathable',
      price: 'Rp 150.000/m',
      pattern: 'bg-gradient-to-br from-green-100 to-green-200'
    },
    { 
      id: 'silk', 
      name: 'Silk', 
      texture: 'Luxury & Smooth',
      price: 'Rp 350.000/m',
      pattern: 'bg-gradient-to-br from-purple-100 to-rose-200'
    },
    { 
      id: 'linen', 
      name: 'Linen', 
      texture: 'Natural & Cool',
      price: 'Rp 200.000/m',
      pattern: 'bg-gradient-to-br from-yellow-100 to-orange-200'
    },
    { 
      id: 'wool', 
      name: 'Wool', 
      texture: 'Warm & Cozy',
      price: 'Rp 300.000/m',
      pattern: 'bg-gradient-to-br from-gray-100 to-gray-200'
    },
    { 
      id: 'denim', 
      name: 'Denim', 
      texture: 'Durable & Classic',
      price: 'Rp 180.000/m',
      pattern: 'bg-gradient-to-br from-blue-100 to-blue-200'
    },
    { 
      id: 'velvet', 
      name: 'Velvet', 
      texture: 'Rich & Elegant',
      price: 'Rp 400.000/m',
      pattern: 'bg-gradient-to-br from-red-100 to-pink-200'
    }
  ];

  // Color options
  const colorOptions = [
    { name: 'Black', value: '#000000', hex: '#000000' },
    { name: 'White', value: '#FFFFFF', hex: '#FFFFFF' },
    { name: 'Gold', value: '#D4AF37', hex: '#D4AF37' },
    { name: 'Brown', value: '#8B4513', hex: '#8B4513' },
    { name: 'Navy', value: '#000080', hex: '#000080' },
    { name: 'Burgundy', value: '#800020', hex: '#800020' },
    { name: 'Forest', value: '#228B22', hex: '#228B22' },
    { name: 'Rose', value: '#FF69B4', hex: '#FF69B4' }
  ];

  // Size options
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      return canvas.toDataURL('image/jpeg');
    }
    return null;
  };

  // AI Try-On simulation
  const processAITryOn = async () => {
    if (!selectedGarment || !selectedFabric || !selectedColor) {
      alert('Silakan lengkapi pilihan garment, fabric, dan warna terlebih dahulu');
      return;
    }

    setIsProcessing(true);
    
    // Capture current frame
    const photoData = capturePhoto();
    
    // Simulate AI processing
    setTimeout(() => {
      // In real implementation, this would call your AI API
      const mockResult = {
        originalPhoto: photoData,
        tryOnResult: '/api/placeholder/400/600', // This would be the AI-generated result
        garment: selectedGarment,
        fabric: selectedFabric,
        color: selectedColor,
        size: selectedSize
      };
      
      setTryOnResult(mockResult);
      setIsProcessing(false);
      setCurrentStep(5); // Move to results step
    }, 3000);
  };

  const resetSelection = () => {
    setSelectedGarment('');
    setSelectedFabric('');
    setSelectedColor('');
    setSelectedSize('');
    setTryOnResult(null);
    setCurrentStep(1);
    stopCamera();
  };

  // Progress calculation
  const getProgress = () => {
    let progress = 0;
    if (selectedGarment) progress += 25;
    if (selectedFabric) progress += 25;
    if (selectedColor) progress += 25;
    if (selectedSize) progress += 25;
    return progress;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light via-gray-50 to-background-light">
      {/* Header Section */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="container">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-accent-color to-secondary-color rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary-color">Fashion Studio</h1>
                <p className="text-text-secondary">Virtual Try-On Experience</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => alert('Bantuan: Pilih garment → fabric → warna → ukuran, lalu coba virtual try-on')}
                className="btn btn-secondary touch-target"
              >
                📞 Help
              </button>
              <button 
                onClick={resetSelection}
                className="btn btn-primary touch-target"
              >
                🔄 Start Over
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="pb-4">
            <div className="flex justify-between text-sm text-text-secondary mb-2">
              <span>Progress</span>
              <span>{getProgress()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-accent-color to-secondary-color h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Left Panel - Selection */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            
            {/* Garment Selection */}
            <div className="card">
              <h2 className="text-2xl mb-4 flex items-center">
                <span className="mr-2">👗</span> Pilih Model
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {garmentOptions.map((garment) => (
                  <button
                    key={garment.id}
                    onClick={() => setSelectedGarment(garment.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 touch-target ${
                      selectedGarment === garment.id 
                        ? 'border-accent-color bg-yellow-50 shadow-lg' 
                        : 'border-gray-200 hover:border-accent-color hover:shadow-md'
                    }`}
                  >
                    <div className="text-3xl mb-2">{garment.icon}</div>
                    <div className="text-sm font-semibold">{garment.name}</div>
                    <div className="text-xs text-text-secondary">{garment.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric Selection */}
            <div className="card">
              <h2 className="text-2xl mb-4 flex items-center">
                <span className="mr-2">🧵</span> Pilih Kain
              </h2>
              <div className="space-y-3">
                {fabricOptions.map((fabric) => (
                  <button
                    key={fabric.id}
                    onClick={() => setSelectedFabric(fabric.id)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 touch-target ${
                      selectedFabric === fabric.id 
                        ? 'border-accent-color bg-yellow-50 shadow-lg' 
                        : 'border-gray-200 hover:border-accent-color hover:shadow-md'
                    } ${fabric.pattern}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-lg">{fabric.name}</div>
                        <div className="text-sm text-text-secondary">{fabric.texture}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-accent-color">{fabric.price}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="card">
              <h2 className="text-2xl mb-4 flex items-center">
                <span className="mr-2">🎨</span> Pilih Warna
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-12 h-12 rounded-full border-4 transition-all duration-300 touch-target ${
                      selectedColor === color.name 
                        ? 'border-accent-color scale-110 shadow-lg' 
                        : 'border-gray-300 hover:border-accent-color hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
              {selectedColor && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-semibold">Warna terpilih: {selectedColor}</span>
                </div>
              )}
            </div>

            {/* Size Selection */}
            <div className="card">
              <h2 className="text-2xl mb-4 flex items-center">
                <span className="mr-2">📏</span> Pilih Ukuran
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 rounded-lg border-2 font-bold transition-all duration-300 touch-target ${
                      selectedSize === size 
                        ? 'border-accent-color bg-yellow-50 text-accent-color shadow-lg' 
                        : 'border-gray-200 hover:border-accent-color hover:shadow-md'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center Panel - Virtual Try-On */}
          <div className="col-span-12 lg:col-span-6">
            <div className="card h-[80vh] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Virtual Try-On</h2>
                <div className="flex gap-2">
                  <button
                    onClick={cameraActive ? stopCamera : startCamera}
                    className={`btn ${cameraActive ? 'btn-secondary' : 'btn-primary'} touch-target`}
                  >
                    {cameraActive ? '📹 Stop Camera' : '📷 Start Camera'}
                  </button>
                </div>
              </div>
              
              <div className="flex-1 bg-gray-100 rounded-lg relative overflow-hidden">
                {!cameraActive && !tryOnResult && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📸</div>
                      <p className="text-xl mb-4">Aktifkan kamera untuk memulai</p>
                      <button 
                        onClick={startCamera}
                        className="btn btn-primary touch-target"
                      >
                        📷 Mulai Kamera
                      </button>
                    </div>
                  </div>
                )}
                
                {cameraActive && (
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <canvas
                      ref={canvasRef}
                      className="hidden"
                    />
                    
                    {/* Overlay untuk menunjukkan area deteksi */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-4 border-dashed border-accent-color rounded-lg"></div>
                      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg">
                        <span className="text-sm">Posisikan tubuh dalam frame</span>
                      </div>
                    </div>
                  </div>
                )}

                {isProcessing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
                      <p className="text-xl">Memproses AI Try-On...</p>
                      <p className="text-sm">Mohon tunggu sebentar</p>
                    </div>
                  </div>
                )}

                {tryOnResult && (
                  <div className="absolute inset-0 bg-white flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">✨</div>
                      <h3 className="text-2xl font-bold mb-2">Hasil Try-On Anda!</h3>
                      <p className="text-text-secondary mb-4">
                        {selectedGarment} dengan {selectedFabric} warna {selectedColor}
                      </p>
                      <div className="flex gap-4 justify-center">
                        <button 
                          onClick={() => setTryOnResult(null)}
                          className="btn btn-secondary touch-target"
                        >
                          🔄 Coba Lagi
                        </button>
                        <button 
                          onClick={() => alert('Fitur download akan segera tersedia')}
                          className="btn btn-primary touch-target"
                        >
                          💾 Simpan Hasil
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center gap-4 mt-4">
                <button 
                  onClick={capturePhoto}
                  disabled={!cameraActive || isProcessing}
                  className="btn btn-secondary touch-target disabled:opacity-50"
                >
                  📸 Ambil Foto
                </button>
                <button 
                  onClick={processAITryOn}
                  disabled={!cameraActive || isProcessing || !selectedGarment || !selectedFabric || !selectedColor}
                  className="btn btn-primary touch-target disabled:opacity-50"
                >
                  {isProcessing ? '⏳ Memproses...' : '✨ Try On AI'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Summary & Actions */}
          <div className="col-span-12 lg:col-span-3">
            <div className="card sticky top-32">
              <h2 className="text-2xl mb-4">Ringkasan Pilihan</h2>
              
              <div className="space-y-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-text-secondary">Model Pakaian</div>
                  <div className="font-semibold">
                    {selectedGarment ? garmentOptions.find(g => g.id === selectedGarment)?.name : 'Belum dipilih'}
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-text-secondary">Jenis Kain</div>
                  <div className="font-semibold">
                    {selectedFabric ? fabricOptions.find(f => f.id === selectedFabric)?.name : 'Belum dipilih'}
                  </div>
                  {selectedFabric && (
                    <div className="text-sm text-accent-color font-bold">
                      {fabricOptions.find(f => f.id === selectedFabric)?.price}
                    </div>
                  )}
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-text-secondary">Warna</div>
                  <div className="font-semibold">{selectedColor || 'Belum dipilih'}</div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-text-secondary">Ukuran</div>
                  <div className="font-semibold">{selectedSize || 'Belum dipilih'}</div>
                </div>
              </div>

              {/* Estimasi Harga */}
              {selectedFabric && (
                <div className="border-t pt-4 mb-6">
                  <h3 className="font-bold mb-2">Estimasi Harga</h3>
                  <div className="text-2xl font-bold text-accent-color">
                    {fabricOptions.find(f => f.id === selectedFabric)?.price}
                  </div>
                  <div className="text-sm text-text-secondary">*Harga per meter kain</div>
                </div>
              )}

              <div className="space-y-3">
                <button 
                  onClick={() => alert('Fitur konsultasi akan menghubungkan dengan staff')}
                  className="w-full btn btn-secondary touch-target"
                >
                  💬 Konsultasi Staff
                </button>
                <button 
                  onClick={() => alert('Fitur pemesanan akan segera tersedia')}
                  disabled={!selectedGarment || !selectedFabric || !selectedColor || !selectedSize}
                  className="w-full btn btn-primary touch-target disabled:opacity-50"
                >
                  🛒 Pesan Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container py-8">
          <div className="text-center">
            <p className="text-text-secondary mb-2">
              AI Fashion Studio - Virtual Try-On Experience
            </p>
            <p className="text-sm text-text-secondary">
              Sentuh layar untuk memulai perjalanan fashion virtual Anda
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

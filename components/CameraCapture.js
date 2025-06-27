/**
 * Advanced Camera Capture Component
 * Menangani kamera, pose detection, dan quality checking
 */

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export default function CameraCapture({ 
  onCapture, 
  onPoseDetected, 
  isActive, 
  onToggle,
  className = "" 
}) {
  const [stream, setStream] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [poseStatus, setPoseStatus] = useState('no-pose');
  const [imageQuality, setImageQuality] = useState('unknown');
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  // Konfigurasi kamera
  const cameraConfig = {
    video: {
      width: { ideal: 1280, min: 640 },
      height: { ideal: 720, min: 480 },
      facingMode: 'user',
      frameRate: { ideal: 30, min: 15 }
    },
    audio: false
  };

  /**
   * Mulai streaming kamera
   */
  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(cameraConfig);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        
        // Mulai pose detection interval
        intervalRef.current = setInterval(checkPoseAndQuality, 1000);
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Hentikan streaming kamera
   */
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setPoseStatus('no-pose');
    setImageQuality('unknown');
  }, [stream]);

  /**
   * Toggle kamera on/off
   */
  const toggleCamera = useCallback(() => {
    if (isActive) {
      stopCamera();
      onToggle(false);
    } else {
      startCamera();
      onToggle(true);
    }
  }, [isActive, startCamera, stopCamera, onToggle]);

  /**
   * Capture foto dari video stream
   */
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !isActive) {
      return null;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas size sesuai video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame ke canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert ke base64
    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    
    // Callback dengan data gambar
    if (onCapture) {
      onCapture({
        imageData,
        timestamp: Date.now(),
        resolution: {
          width: canvas.width,
          height: canvas.height
        },
        poseStatus,
        quality: imageQuality
      });
    }

    return imageData;
  }, [isActive, onCapture, poseStatus, imageQuality]);

  /**
   * Check pose dan kualitas gambar secara berkala
   */
  const checkPoseAndQuality = useCallback(() => {
    if (!videoRef.current || !isActive) return;

    // Simulasi pose detection
    const mockPoseDetection = () => {
      const poses = ['good-pose', 'partial-pose', 'no-pose'];
      const randomPose = poses[Math.floor(Math.random() * poses.length)];
      setPoseStatus(randomPose);
      
      if (onPoseDetected) {
        onPoseDetected({
          status: randomPose,
          confidence: Math.random() * 0.5 + 0.5,
          timestamp: Date.now()
        });
      }
    };

    // Simulasi quality check
    const mockQualityCheck = () => {
      const qualities = ['excellent', 'good', 'fair', 'poor'];
      const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];
      setImageQuality(randomQuality);
    };

    mockPoseDetection();
    mockQualityCheck();
  }, [isActive, onPoseDetected]);

  /**
   * Get error message berdasarkan error type
   */
  const getErrorMessage = (error) => {
    switch (error.name) {
      case 'NotAllowedError':
        return 'Akses kamera ditolak. Silakan izinkan akses kamera.';
      case 'NotFoundError':
        return 'Kamera tidak ditemukan.';
      case 'NotReadableError':
        return 'Kamera sedang digunakan aplikasi lain.';
      case 'OverconstrainedError':
        return 'Konfigurasi kamera tidak didukung.';
      default:
        return 'Terjadi kesalahan saat mengakses kamera.';
    }
  };

  /**
   * Get pose status styling
   */
  const getPoseStatusStyle = () => {
    switch (poseStatus) {
      case 'good-pose':
        return 'bg-green-500 text-white';
      case 'partial-pose':
        return 'bg-yellow-500 text-white';
      case 'no-pose':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  /**
   * Get quality status styling
   */
  const getQualityStatusStyle = () => {
    switch (imageQuality) {
      case 'excellent':
        return 'bg-green-500 text-white';
      case 'good':
        return 'bg-blue-500 text-white';
      case 'fair':
        return 'bg-yellow-500 text-white';
      case 'poor':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Cleanup saat component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className={`relative ${className}`}>
      {/* Video Element */}
      <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
        {!isActive && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-xl mb-4">Kamera Tidak Aktif</p>
              <button
                onClick={toggleCamera}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Aktifkan Kamera
              </button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
              <p className="text-xl">Mengaktifkan Kamera...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-900">
            <div className="text-center text-white p-6">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="text-lg mb-4">{error}</p>
              <button
                onClick={toggleCamera}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        )}

        {isActive && !error && (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Pose Detection Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Frame Guide */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-4 border-dashed border-yellow-400 rounded-lg opacity-70"></div>
              
              {/* Status Indicators */}
              <div className="absolute top-4 left-4 space-y-2">
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getPoseStatusStyle()}`}>
                  Pose: {poseStatus === 'good-pose' ? 'Bagus' : 
                          poseStatus === 'partial-pose' ? 'Sebagian' : 'Tidak Terdeteksi'}
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getQualityStatusStyle()}`}>
                  Kualitas: {imageQuality === 'excellent' ? 'Sangat Baik' :
                            imageQuality === 'good' ? 'Baik' :
                            imageQuality === 'fair' ? 'Cukup' :
                            imageQuality === 'poor' ? 'Buruk' : 'Checking...'}
                </div>
              </div>

              {/* Instructions */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black bg-opacity-50 text-white p-3 rounded-lg text-center">
                  <p className="text-sm">
                    {poseStatus === 'no-pose' && 'Posisikan tubuh dalam frame'}
                    {poseStatus === 'partial-pose' && 'Sesuaikan posisi agar seluruh tubuh terlihat'}
                    {poseStatus === 'good-pose' && '✓ Posisi bagus! Siap untuk foto'}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Hidden Canvas untuk capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera Controls */}
      {isActive && !error && (
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={capturePhoto}
            disabled={poseStatus !== 'good-pose'}
            className={`p-3 rounded-full transition-all ${
              poseStatus === 'good-pose'
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
            title="Ambil Foto"
          >
            📸
          </button>
          <button
            onClick={toggleCamera}
            className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
            title="Matikan Kamera"
          >
            🔴
          </button>
        </div>
      )}
    </div>
  );
} 
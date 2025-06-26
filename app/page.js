import Image from "next/image";

export default function Home() {
  return (
    <div className="container fade-in">
      {/* Header Section */}
      <header className="flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold">AI Fashion Studio</h1>
        <div className="flex items-center gap-4">
          <button className="btn btn-secondary touch-target">Help</button>
          <button className="btn btn-primary touch-target">Start Over</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-8 mt-8">
        {/* Left Panel - Garment Selection */}
        <div className="col-span-3">
          <div className="card">
            <h2 className="text-2xl mb-4">Select Garment</h2>
            <div className="grid grid-cols-2 gap-4">
              {['Dress', 'Blouse', 'Pants', 'Skirt'].map((item) => (
                <button
                  key={item}
                  className="btn btn-secondary touch-target w-full text-center"
                >
                  {item}
                </button>
              ))}
            </div>

            <h3 className="text-xl mt-8 mb-4">Fabric Options</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                'Cotton',
                'Silk',
                'Linen',
                'Wool',
                'Denim',
                'Velvet'
              ].map((fabric) => (
                <div
                  key={fabric}
                  className="card cursor-pointer hover:border-2 hover:border-secondary-color p-2 text-center touch-target"
                >
                  <div className="w-full h-16 bg-gray-200 rounded-md mb-2"></div>
                  <span className="text-sm">{fabric}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Panel - Virtual Try-On View */}
        <div className="col-span-6">
          <div className="card h-[80vh] flex flex-col">
            <div className="flex-1 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-xl mb-4">Stand in front of the camera</p>
                <button className="btn btn-primary touch-target">
                  Start Camera
                </button>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button className="btn btn-secondary touch-target">
                Take Photo
              </button>
              <button className="btn btn-primary touch-target">
                Try On
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Customization */}
        <div className="col-span-3">
          <div className="card">
            <h2 className="text-2xl mb-4">Customize</h2>
            
            <div className="mb-6">
              <h3 className="text-xl mb-3">Colors</h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  '#000000',
                  '#FFFFFF',
                  '#D4AF37',
                  '#9F8054',
                  '#FF0000',
                  '#0000FF',
                  '#008000',
                  '#800080'
                ].map((color) => (
                  <button
                    key={color}
                    className="w-12 h-12 rounded-full touch-target"
                    style={{
                      backgroundColor: color,
                      border: '2px solid #eee'
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl mb-3">Size</h3>
              <div className="grid grid-cols-4 gap-3">
                {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((size) => (
                  <button
                    key={size}
                    className="btn btn-secondary touch-target"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <button className="btn btn-primary w-full touch-target">
                Save Design
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 mt-8">
        <p className="text-text-secondary">
          Touch anywhere to begin your virtual fashion journey
        </p>
      </footer>
    </div>
  );
}

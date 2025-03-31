import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { QrCode, Link } from 'lucide-react';

const QRCodeGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [qrValue, setQrValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const generateQRCode = () => {
    // Only generate if there's input to avoid empty QR codes
    if (inputValue.trim()) {
        setQrValue(inputValue);
    } else {
        // Optionally clear the QR code if input is empty
        setQrValue('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      generateQRCode();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex items-center justify-center space-x-2 text-2xl font-semibold text-gray-700">
          <QrCode className="text-indigo-500" size={28} />
          <h1>QR Code Generator</h1>
        </div>

        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter text or URL"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 pr-12"
          />
           <Link className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <button
          onClick={generateQRCode}
          disabled={!inputValue.trim()}
          className="w-full py-3 px-4 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate QR Code
        </button>

        {qrValue && (
          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-300 ease-in-out">
             <p className="text-sm text-gray-500 mb-3">Scan the code below:</p>
            <QRCode
              value={qrValue}
              size={256} // Increased size for better scannability
              level="H" // High error correction level
              includeMargin={true}
              bgColor="#FFFFFF"
              fgColor="#1f2937" // Dark gray color for QR code
              className="rounded-md shadow-sm"
            />
          </div>
        )}
      </div>
       <p className="mt-8 text-sm text-gray-500">
        Built with React, Tailwind CSS, and qrcode.react
      </p>
    </div>
  );
};

export default QRCodeGenerator;

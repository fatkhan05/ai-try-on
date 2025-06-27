# AI Fashion Studio - Virtual Try-On Application

Aplikasi AI Try-On untuk bisnis fashion yang memungkinkan customer mencoba pakaian secara virtual menggunakan teknologi Artificial Intelligence dan computer vision.

## 🌟 Features

### Core Features
- **Virtual Try-On AI**: Teknologi AI untuk mencoba pakaian secara real-time
- **Camera Integration**: Integrasi kamera dengan pose detection
- **Garment Selection**: Pilihan berbagai model pakaian (Dress, Blouse, Pants, Skirt)
- **Fabric Options**: Berbagai jenis kain dengan sample pattern visual (Cotton, Silk, Linen, Wool, Denim, Velvet)
- **Color Customization**: Pilihan warna yang beragam
- **Size Selection**: Berbagai ukuran dari XS hingga 2XL
- **Kiosk Mode**: Optimized untuk penggunaan touchscreen kiosk

### Technical Features
- **Real-time Processing**: AI processing dengan feedback real-time
- **Pose Detection**: Deteksi pose untuk positioning yang optimal
- **Image Quality Check**: Validasi kualitas gambar secara otomatis
- **Progress Tracking**: Progress bar untuk user experience yang lebih baik
- **Responsive Design**: Optimized untuk berbagai ukuran layar
- **Touch-friendly UI**: Minimum 44px touch targets untuk kiosk

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Webcam/Camera untuk try-on functionality

### Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd ai-try-on-clothes
```

2. **Install dependencies**
```bash
npm install
# atau
yarn install
```

3. **Setup environment variables**
```bash
cp env.example .env.local
# Edit .env.local sesuai kebutuhan
```

4. **Run development server**
```bash
npm run dev
# atau
yarn dev
```

5. **Open browser**
```
http://localhost:3000
```

## 📁 Project Structure

```
ai-try-on-clothes/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── ai-tryon/            # AI Try-On API endpoint
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout
│   └── page.js                  # Home page
├── components/                   # React Components
│   ├── AITryOnEngine.js         # AI processing engine
│   └── CameraCapture.js         # Camera component
├── public/                       # Static assets
│   └── images/                  # Image assets
├── env.example                   # Environment variables template
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
└── README.md                    # Documentation
```

## 🎨 UI/UX Design

### Design Principles
- **Professional**: Tampilan yang elegan dan profesional untuk bisnis fashion
- **Intuitive**: Interface yang mudah dipahami dan digunakan
- **Touch-friendly**: Optimized untuk touchscreen dengan target minimum 44px
- **Responsive**: Bekerja optimal di berbagai ukuran layar
- **Accessible**: Mengikuti standar accessibility

### Color Palette
- **Primary**: `#0a0a0a` (Charcoal Black)
- **Secondary**: `#8b7355` (Warm Brown)
- **Accent**: `#d4af37` (Elegant Gold)
- **Background**: `#fefdfb` (Warm White)

### Typography
- **Display**: Playfair Display (Elegant serif untuk headings)
- **Body**: Poppins (Modern sans-serif untuk readability)

## 🔧 Configuration

### Environment Variables

Salin `env.example` ke `.env.local` dan sesuaikan:

```bash
# Application Settings
NEXT_PUBLIC_APP_NAME="AI Fashion Studio"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# API Configuration
NEXT_PUBLIC_AI_API_ENDPOINT="/api/ai-tryon"
NEXT_PUBLIC_API_TIMEOUT=30000

# Business Configuration
BUSINESS_NAME="Fashion Studio"
BUSINESS_PHONE="+62-XXX-XXXX-XXXX"
BUSINESS_EMAIL="info@fashionstudio.com"

# Fabric Configuration
FABRIC_DISPLAY_PATTERNS=true
FABRIC_SHOW_PRICING=false
```

### Kiosk Mode Setup

Untuk penggunaan kiosk, aktifkan konfigurasi berikut:

```bash
KIOSK_MODE=true
KIOSK_IDLE_TIMEOUT=300000  # 5 menit
KIOSK_AUTO_RESET=true
TOUCH_TARGET_MIN_SIZE=44
```

## 🤖 AI Integration

### Current Implementation
Aplikasi saat ini menggunakan simulasi AI untuk development. Untuk production, Anda dapat mengintegrasikan dengan:

### Recommended AI Services
1. **OpenAI DALL-E**: Untuk image generation
2. **Replicate**: Untuk model hosting
3. **Hugging Face**: Untuk open-source models
4. **Custom AI Endpoint**: Untuk model yang di-host sendiri

### Integration Steps
1. Pilih AI service provider
2. Update `components/AITryOnEngine.js`
3. Set environment variables untuk API keys
4. Test dengan data real

### Example Integration (OpenAI)
```javascript
// components/AITryOnEngine.js
async function callAIAPI(requestData) {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: `Person wearing ${requestData.garment} made of ${requestData.fabric} in ${requestData.color}`,
      n: 1,
      size: "512x512"
    })
  });
  
  return await response.json();
}
```

## 📱 Kiosk Deployment

### Hardware Requirements
- **Touchscreen Monitor**: 24" - 32" dengan resolusi minimal 1920x1080
- **Computer**: Intel i5 atau equivalent, 8GB RAM, SSD
- **Camera**: 1080p webcam dengan auto-focus
- **Stand**: Adjustable height untuk berbagai user

### Software Setup
1. **Operating System**: Windows 10/11 atau Ubuntu
2. **Browser**: Chrome atau Edge dalam fullscreen mode
3. **Kiosk Software**: Chrome kiosk mode atau dedicated kiosk software

### Chrome Kiosk Mode
```bash
chrome --kiosk --disable-web-security --disable-features=TranslateUI --disable-ipc-flooding-protection http://localhost:3000
```

### Auto-start Setup (Windows)
1. Buat batch file untuk auto-start
2. Tambahkan ke Windows Startup folder
3. Configure auto-login

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

### Adding New Garments
1. Update `garmentOptions` array di `app/page.js`
2. Tambahkan icon dan description
3. Update AI processing logic jika diperlukan

### Adding New Fabrics
1. Update `fabricOptions` array di `app/page.js`
2. Set harga di environment variables
3. Update pattern/texture styling

### Custom Styling
Aplikasi menggunakan Tailwind CSS. Untuk customization:
1. Edit `tailwind.config.js` untuk theme changes
2. Update `app/globals.css` untuk custom components
3. Gunakan CSS variables untuk easy theming

## 🔒 Security Considerations

### Data Privacy
- Gambar customer tidak disimpan secara permanen
- Processing dilakukan secara local/secure
- Implementasi GDPR compliance jika diperlukan

### API Security
- Rate limiting untuk API endpoints
- Input validation dan sanitization
- HTTPS untuk production deployment

## 📊 Analytics & Monitoring

### Metrics to Track
- Usage frequency per garment type
- Popular fabric selections
- Average session duration
- Conversion rate (try-on to inquiry)

### Integration Options
- Google Analytics untuk web metrics
- Custom analytics untuk business insights
- Error monitoring dengan Sentry

## 🚀 Production Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Setup
1. Set production environment variables
2. Configure domain dan SSL
3. Setup monitoring dan logging
4. Configure backup strategy

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

Untuk pertanyaan atau support:
- **Email**: info@fashionstudio.com
- **Phone**: +62-XXX-XXXX-XXXX
- **Documentation**: [Link to docs]
- **Issues**: [GitHub Issues]

## 📄 License

Copyright © 2024 AI Fashion Studio. All rights reserved.

---

**Dibuat dengan ❤️ untuk bisnis fashion Indonesia**

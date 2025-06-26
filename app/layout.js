import './globals.css'

export const metadata = {
  title: 'AI Fashion Try-On Kiosk',
  description: 'Experience virtual fashion try-on with our state-of-the-art AI technology',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}

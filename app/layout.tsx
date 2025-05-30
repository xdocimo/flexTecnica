import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'flexus prueba tecnica'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}

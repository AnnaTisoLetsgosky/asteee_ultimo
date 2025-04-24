import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mr Auctions',
  description: 'Mr Auctions',
  generator: 'Mr Auctions',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

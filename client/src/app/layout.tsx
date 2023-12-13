import HeaderClient from '@/components/header'
import React from 'react'
import StoreProvider from '../store/provider'
import DispatchAsync from '@/context/DispatchAsync'

import './globals.css'
import ReactQueryProvider from '@/context/query-client'

export const metadata = {
  title: 'Tour Dasboard',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="">
        <ReactQueryProvider>
          <StoreProvider>
            <div className="flex-col md:flex">
              <HeaderClient />

              <div className="mt-[5rem] relative min-h-screen mx-10">
                <DispatchAsync>{children}</DispatchAsync>
              </div>
            </div>
          </StoreProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}

import { ClerkProvider } from '@clerk/nextjs'
 
export const metadata = {
  title: 'Connectify',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className='flex justify-center items-center h-full mt-24'>{children}</body>
      </html>
      </ClerkProvider>
  )
}
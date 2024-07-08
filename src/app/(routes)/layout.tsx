import { type Metadata } from "next"

import { GeistSans } from "geist/font/sans"

import { type WithReactChildren } from "@types"

import "@styles/globals.css"

export const metadata: Metadata = {
  title: "Baduk Club DB",
  description: "Baduk Club DB",
}

export default function RootLayout({
  children,
}: Readonly<WithReactChildren>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TITAAN DEVELOPMENT | Building Legacies",
  description:
    "Titaan Development is gespecialiseerd in het ontwikkelen en beheren van hoogwaardig vastgoed. Wij creëren duurzame waarde door strategische investeringen in premium locaties.",
  keywords: "vastgoed, ontwikkeling, investering, Den Haag, Nederland, luxe, commercieel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}

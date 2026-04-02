import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Laksh-man - Premium Clothes and Outfits",
  description:
    "Discover premium clothes and outfits at Laksh-man. Shop shirts, pants, dresses, shoes, and more with exclusive discounts and fast delivery.",
  keywords:
    "clothes, shirts, shoes, tshirts, Tshirts, Hoodies, Men Clothes, Women Clothes, Kid Clothes, shop clothes, buy clothes",
  authors: [{ name: "Laksh-man" }],
  creator: "Laksh-man",
  publisher: "Laksh-man",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL("https://laksh-man.in/"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Laksh-man - Premium Clothes & Outfits",
    description: "Discover premium clothes and outfits at Laksh-man.",
    url: "https://laksh-man.in/",
    siteName: "Laksh-man",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laksh-man - Premium Clothes & Outfits",
    description: "Discover premium clothes and outfits at Laksh-man.",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: { index: true, follow: false, noimageindex: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: { google: "yzl5U-a6Iz9CFcJd0tBTp-HFrE_ZRvS-kgNXuF9w2CE" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Premium fonts for luxury editorial aesthetic */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
        <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" strategy="afterInteractive" />
        <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" strategy="afterInteractive" />
        <Script id="aos-init" strategy="afterInteractive">{`
          (function(){var t=setInterval(function(){if(window.AOS&&typeof window.AOS.init==='function'){try{window.AOS.init({duration:800,once:true,offset:80});}catch(e){}clearInterval(t);}},100);setTimeout(function(){clearInterval(t);},8000);})();
        `}</Script>
        <Script id="app-init" strategy="afterInteractive">{`
          document.addEventListener('DOMContentLoaded', function() {
            const preloader = document.querySelector('.preloader-wrapper');
            if (preloader) setTimeout(() => { preloader.style.opacity = '0'; preloader.style.transition = 'opacity 0.5s'; setTimeout(() => preloader.style.display = 'none', 500); }, 800);
          });
        `}</Script>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}</Script>
          </>
        ) : null}
      </body>
    </html>
  );
}

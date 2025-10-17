import type { Metadata } from "next";
import { Inter, Nunito, Open_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({ subsets: ["latin"] });

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Laksh-man - Premium Furniture & Home Decor",
  description:
    "Discover premium furniture and home decor at Laksh-man. Shop sofas, beds, dining tables, office furniture, and more with exclusive discounts and fast delivery.",
  keywords:
    "furniture, home decor, sofas, beds, dining tables, office furniture, wardrobes, premium furniture, home furnishing",
  authors: [{ name: "Laksh-man" }],
  creator: "Laksh-man",
  publisher: "Laksh-man",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://lakshman.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Laksh-man - Premium Furniture & Home Decor",
    description:
      "Discover premium furniture and home decor at Laksh-man. Shop sofas, beds, dining tables, office furniture, and more with exclusive discounts and fast delivery.",
    url: "https://lakshman.com",
    siteName: "Laksh-man",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laksh-man - Premium Furniture & Home Decor",
    description:
      "Discover premium furniture and home decor at Laksh-man. Shop sofas, beds, dining tables, office furniture, and more with exclusive discounts and fast delivery.",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification=verification_token_here",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${openSans.variable}`}>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>

        {/* Bootstrap JS */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        {/* Iconify */}
        <Script
          src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
          strategy="afterInteractive"
        />

        {/* AOS Animation */}

        <Script
          src="https://unpkg.com/aos@2.3.1/dist/aos.js"
          strategy="afterInteractive"
        />
        <Script id="aos-init" strategy="afterInteractive">
          {`
                      (function initAOSWithPolling(){
                        var maxAttempts = 50; // ~5s at 100ms
                        var attempts = 0;
                        var timer = setInterval(function(){
                          attempts++;
                          if (typeof window !== 'undefined' && window.AOS && typeof window.AOS.init === 'function') {

                            try {
                              window.AOS.init({

                                duration: 1000,

                                once: true,

                                offset: 100,

                              });

                            } catch (e) {}

                            clearInterval(timer);
                          }
                          if (attempts >= maxAttempts) {
                            clearInterval(timer);
                          }
                        }, 100);
                      })();
                    `}
        </Script>

        {/* Custom initialization script */}
        <Script id="app-init" strategy="afterInteractive">
          {`
            // Initialize app after all scripts are loaded
            document.addEventListener('DOMContentLoaded', function() {
              // Remove preloader
              const preloader = document.querySelector('.preloader-wrapper');
              if (preloader) {
                setTimeout(() => {
                  preloader.style.display = 'none';
                }, 1000);
              }

              // Initialize tooltips
              if (typeof bootstrap !== 'undefined') {
                var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                  return new bootstrap.Tooltip(tooltipTriggerEl);
                });
              }
            });
          `}
        </Script>

        {/* Google Analytics - load only if NEXT_PUBLIC_GA_ID is set */}
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
              {`

                window.dataLayer = window.dataLayer || [];

                function gtag(){dataLayer.push(arguments);}

                gtag('js', new Date());

                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}

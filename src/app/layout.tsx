import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import PopupBar from "@/components/layout/PopupBar";
import { Toaster } from "react-hot-toast";
import { siteConfig } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Advanced Medical Equipment Manufacturer & Global Exporter`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.name} - ${siteConfig.tagline}. Certified manufacturer and global exporter of 19,000+ medical devices, motorized ICU beds, surgical operating tables, orthopaedic implants, and hospital infrastructure based in Hajipur, Bihar, India.`,
  keywords: [
    "medical equipment manufacturer India",
    "hospital furniture manufacturer",
    "ICU beds supplier",
    "surgical instruments exporter",
    "orthopaedic implants India",
    "medical devices supplier Bihar",
    "Hajipur medical equipment",
    "EKOSYS Corporation"
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.name} | Advanced Medical Equipment Manufacturer`,
    description: "Certified manufacturer and global exporter of 19,000+ medical products across 31 categories based in Hajipur, Bihar, India.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/backgrounds/hero-medical-theatre.webp`,
        width: 1200,
        height: 630,
        alt: "EKOSYS Corporation Advanced Medical Technology",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: "Advanced medical equipment manufacturer and global exporter based in Hajipur, Bihar, India.",
    images: [`${siteConfig.url}/images/backgrounds/hero-medical-theatre.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "MedicalBusiness"],
    name: siteConfig.name,
    legalName: "EKOSYS Corporation",
    description: "Global manufacturer and exporter of 19,000+ medical devices, hospital furniture, and surgical instruments.",
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/images/backgrounds/hero-medical-theatre.webp`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$$",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "sales and institutional tenders",
        email: siteConfig.email,
        areaServed: ["IN", "Global"],
        availableLanguage: ["English", "Hindi"],
      }
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Opposite to Municipal Office",
      addressLocality: "Hajipur",
      addressRegion: "Bihar",
      postalCode: "844101",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "ISO 13485:2016 Medical Device Quality Standard"
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "ISO 9001:2015 Quality Management System"
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "Government of India Star Export House"
      }
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:30"
      }
    ]
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <FloatingButtons />
        <PopupBar />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

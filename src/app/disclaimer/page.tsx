import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer | EKOSYS Corporation",
  description: "Legal disclaimer and product information notice for EKOSYS Corporation medical equipment.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DisclaimerPage() {
  return (
    <div className="bg-gray-50 pb-20 min-h-screen">
      <div className="bg-emerald-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
          <div className="flex items-center text-emerald-100 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>Disclaimer</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 max-w-4xl mx-auto prose prose-emerald prose-lg">
          <p className="text-gray-500 text-sm mb-8">Last Updated: March 2024</p>
          
          <h2>General Information</h2>
          <p>The information contained on this website is for general information purposes only. The information is provided by EKOSYS Corporation and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>
          
          <h2>Medical Equipment Use</h2>
          <p>The medical equipment and devices displayed on this website are intended for use by qualified healthcare professionals in clinical settings. The information provided is not intended to be a substitute for professional medical advice, diagnosis, or treatment. End-users must read and follow the User Manual and Instructions for Use (IFU) provided with the specific product before operation.</p>

          <h2>Product Specifications and Images</h2>
          <p>Product specifications, features, and appearances are subject to change without prior notice due to continuous product development and improvement. The images shown on the website are for representational purposes only and the actual product may vary in color, design, and accessories.</p>

          <h2>Regulatory Approvals</h2>
          <p>Not all products shown on this website may be cleared or approved for sale in all countries or regions. It is the responsibility of the distributor or purchaser to ensure that the importation and use of the equipment comply with local regulatory requirements and laws.</p>

          <h2>Limitation of Liability</h2>
          <p>In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website or the products described herein.</p>
        </div>
      </div>
    </div>
  );
}

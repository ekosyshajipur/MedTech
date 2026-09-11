import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | EKOSYS Corporation",
  description: "Terms and conditions for purchasing and using EKOSYS Corporation medical equipment.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsPage() {
  return (
    <div className="bg-gray-50 pb-20 min-h-screen">
      <div className="bg-emerald-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <div className="flex items-center text-emerald-100 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>Terms & Conditions</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 max-w-4xl mx-auto prose prose-emerald prose-lg">
          <p className="text-gray-500 text-sm mb-8">Last Updated: March 2024</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website&apos;s particular services or purchasing products, you shall be subject to any posted guidelines or rules applicable to such services.</p>
          
          <h2>2. Ordering and Pricing</h2>
          <ul>
            <li>All orders are subject to acceptance and availability.</li>
            <li>Prices are subject to change without notice. Quotations are valid for 30 days unless otherwise specified.</li>
            <li>Customs duties, taxes, and other levies applicable in the buyer&apos;s country are the sole responsibility of the buyer.</li>
          </ul>

          <h2>3. Payment Terms</h2>
          <p>Payment terms will be specified in the formal Proforma Invoice. Standard terms usually involve an advance payment with the order and the balance against dispatch documents, or an Irrevocable Letter of Credit (LC) at sight for international orders, subject to mutual agreement.</p>

          <h2>4. Shipping and Delivery</h2>
          <p>Delivery timelines are estimates and commence from the date of receipt of the confirmed order and advance payment. EKOSYS Corporation shall not be held liable for any delays in delivery due to circumstances beyond our control (Force Majeure), including but not limited to natural disasters, customs delays, strikes, or transportation issues.</p>

          <h2>5. Warranty</h2>
          <p>Our products carry a standard manufacturer&apos;s warranty against defects in materials and workmanship for a period of 12 months from the date of invoice, unless otherwise stated. The warranty does not cover damage caused by misuse, unauthorized modifications, normal wear and tear, or failure to follow operating instructions.</p>

          <h2>6. Returns and Claims</h2>
          <p>Any claims regarding short supply or damage in transit must be reported in writing with supporting photographs within 7 days of receipt of goods. Returns are only accepted with prior written authorization from EKOSYS Corporation.</p>

          <h2>7. Intellectual Property</h2>
          <p>The website and its original content, features, and functionality are owned by EKOSYS Corporation and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
          
          <h2>8. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Bihar, India.</p>
        </div>
      </div>
    </div>
  );
}

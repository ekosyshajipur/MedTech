import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Target, Eye, Award, Globe, ShieldCheck, ThumbsUp } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | EKOSYS Corporation",
  description: "Learn about EKOSYS Corporation, our history, mission, vision, and our commitment to manufacturing high-quality medical equipment.",
};

export default function AboutPage() {
  return (
    <div className="bg-gray-50 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-emerald-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <div className="flex items-center text-emerald-100 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>About Us</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {/* Story Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                EKOSYS Corporation, located in Hajipur, Bihar, stands as a beacon of innovation in the medical equipment manufacturing sector. Since our inception, we have been dedicated to providing high-quality, reliable, and technologically advanced medical solutions to healthcare facilities worldwide.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With a focus on continuous improvement and customer satisfaction, we have expanded our reach to over 80 countries, ensuring that healthcare professionals have access to the best tools to save lives and improve patient care.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <h3 className="text-3xl font-bold text-emerald-600 mb-2">15+</h3>
                  <p className="text-sm text-gray-600 font-medium">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <h3 className="text-3xl font-bold text-emerald-600 mb-2">8+</h3>
                  <p className="text-sm text-gray-600 font-medium">Countries Served</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <h3 className="text-3xl font-bold text-emerald-600 mb-2">500+</h3>
                  <p className="text-sm text-gray-600 font-medium">Products</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <h3 className="text-3xl font-bold text-emerald-600 mb-2">24/7</h3>
                  <p className="text-sm text-gray-600 font-medium">Support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-emerald-500">
            <Target className="w-12 h-12 text-emerald-500 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">To innovate and deliver world-class medical equipment that empowers healthcare professionals and improves patient outcomes globally, while maintaining the highest standards of quality and ethics.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-blue-500">
            <Eye className="w-12 h-12 text-blue-500 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">To be the globally recognized ecosystem of innovation in healthcare technology, setting benchmarks for quality, reliability, and affordability in medical equipment manufacturing.</p>
          </div>
        </section>

        {/* Manufacturing & Quality */}
        <section className="mb-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Excellence in Manufacturing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <Award className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Certified Quality</h4>
              <p className="text-sm text-gray-600">ISO 9001:2015, ISO 13485:2016, and CE marked products ensuring global compliance.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <Globe className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Global Presence</h4>
              <p className="text-sm text-gray-600">Recognized as a Star Export House, delivering to healthcare facilities across 8+ nations.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <ShieldCheck className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Rigorous Testing</h4>
              <p className="text-sm text-gray-600">Every product undergoes strict quality control checks before leaving our facility.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section>
          <div className="bg-emerald-900 rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">Why Choose EKOSYS?</h2>
            <p className="max-w-2xl mx-auto text-emerald-100 mb-10">We are committed to building long-term relationships through trust, quality, and exceptional service.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {[
                "Uncompromising Quality",
                "Cost-Effective Solutions",
                "Timely Delivery",
                "Excellent After-Sales Support"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3 bg-emerald-800 p-4 rounded-lg">
                  <ThumbsUp className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

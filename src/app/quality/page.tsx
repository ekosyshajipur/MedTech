import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Award, Shield, CheckCircle, Target, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Quality & Certifications | EKOSYS Corporation",
  description: "Learn about our rigorous quality standards and global certifications including ISO 9001:2015, ISO 13485:2016, and CE Mark.",
};

export default function QualityPage() {
  return (
    <div className="bg-gray-50 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-emerald-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Quality & Certifications</h1>
          <div className="flex items-center text-emerald-100 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>Quality</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {/* Quality Policy */}
        <section className="mb-20 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <Shield className="w-48 h-48 text-emerald-100" />
                <Award className="w-24 h-24 text-emerald-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Quality Policy</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                At EKOSYS Corporation, quality is not just a standard—it is an intrinsic part of our culture. We are committed to designing, manufacturing, and supplying medical equipment that consistently meets and exceeds customer expectations and regulatory requirements worldwide.
              </p>
              <ul className="space-y-4">
                {[
                  "Continuous improvement of manufacturing processes",
                  "Strict adherence to international safety standards",
                  "Regular training and development of our workforce",
                  "Robust quality control at every stage of production"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Certifications Grid */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Certifications</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our facilities and products are certified by leading global authorities, ensuring the highest level of safety and reliability.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center border-t-4 border-emerald-500 hover:-translate-y-1 transition-transform">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold text-emerald-600">ISO</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ISO 9001:2015</h3>
              <p className="text-sm text-gray-600">Quality Management System ensuring consistent provision of products and services.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center border-t-4 border-emerald-500 hover:-translate-y-1 transition-transform">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold text-emerald-600">ISO</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ISO 13485:2016</h3>
              <p className="text-sm text-gray-600">Specific Quality Management Standard for the design and manufacture of medical devices.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center border-t-4 border-blue-500 hover:-translate-y-1 transition-transform">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">CE</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">CE Mark</h3>
              <p className="text-sm text-gray-600">Conformity with European health, safety, and environmental protection standards.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center border-t-4 border-amber-500 hover:-translate-y-1 transition-transform">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold text-amber-600">STAR</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Star Export House</h3>
              <p className="text-sm text-gray-600">Recognized by the Government of India for excellence in international trade.</p>
            </div>
          </div>
        </section>

        {/* Manufacturing Standards */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Manufacturing Standards</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our state-of-the-art manufacturing facility in Hajipur utilizes advanced machinery and automated processes to ensure precision engineering. We source only the highest grade raw materials—including premium stainless steel, CRCA sheets, and non-toxic ABS plastics.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <Target className="w-8 h-8 text-emerald-500 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Precision Engineering</h4>
                  <p className="text-sm text-gray-600">CNC machining, laser cutting, and robotic welding for exact specifications.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Activity className="w-8 h-8 text-emerald-500 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Surface Treatment</h4>
                  <p className="text-sm text-gray-600">Anti-microbial powder coating and advanced chemical pretreatment for durability and hygiene.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-emerald-900 rounded-2xl p-10 text-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-6 text-emerald-400">Quality Testing Procedures</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Raw Material Inspection (Chemical & Physical)</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>In-process Dimensional Accuracy Checks</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Load Bearing & Stress Testing</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Electrical Safety Tests (for motorized equipment)</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Final Assembly & Functional Validation</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

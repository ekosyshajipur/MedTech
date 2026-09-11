import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | EKOSYS Corporation",
  description: "Get in touch with EKOSYS Corporation for premium medical equipment. Located in Hajipur, Bihar. Contact us via phone, email, or WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="bg-gray-50 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-emerald-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <div className="flex items-center text-emerald-100 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>Contact Us</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <a href="tel:+917644868086" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-emerald-500 hover:shadow-md transition-all text-center group">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500 transition-colors">
              <Phone className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600">+91 76 44 86 80 86</p>
          </a>
          <a href="mailto:ekosys.corp@gmail.com" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-emerald-500 hover:shadow-md transition-all text-center group">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500 transition-colors">
              <Mail className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600">ekosys.corp@gmail.com</p>
          </a>
          <a href="https://wa.me/917644868086" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-emerald-500 hover:shadow-md transition-all text-center group">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500 transition-colors">
              <MessageCircle className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-gray-600">Chat with Sales</p>
          </a>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-emerald-500 hover:shadow-md transition-all text-center group">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500 transition-colors">
              <Clock className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Business Hours</h3>
            <p className="text-gray-600">Mon-Sat: 9AM - 6PM</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>
          
          {/* Company Info & Map */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Headquarters</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-emerald-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Corporate Office & Manufacturing Facility</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Opposite to Municipal Office,<br />
                      Hajipur - 844101,<br />
                      Vaishali, Bihar, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative bg-white p-2 rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-[400px] group">
              <iframe 
                src="https://maps.google.com/maps?q=Opposite+to+Municipal+Office,+Hajipur+-+844101,+Vaishali,+Bihar,+India&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '0.75rem' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="EKOSYS Corporation Office Address Map in Hajipur Bihar"
              ></iframe>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Opposite+to+Municipal+Office,+Hajipur+-+844101,+Vaishali,+Bihar,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Reach Office on Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

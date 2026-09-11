import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { categories, Category } from '@/data/products';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Col 1: Company Info */}
          <div>
            <Link href="/" className="inline-block bg-white px-3 py-1.5 rounded-lg mb-4 shadow-sm hover:opacity-95 transition-opacity">
              <Image 
                src="/logo.png" 
                alt="EKOSYS Corporation" 
                width={150} 
                height={45} 
                className="h-8 w-auto object-contain" 
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
            <h3 className="text-xl font-bold text-emerald-500 mb-2">EKOSYS Corporation</h3>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              An Ecosystem of Innovation. A globally trusted manufacturer and exporter of over 19,000 premium medical products, hospital furniture, and surgical instruments.
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Opposite to Municipal Office, Hajipur - 844101, Vaishali, Bihar, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="tel:+917644868086" className="hover:text-white transition-colors">+91 76 44 86 80 86</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="mailto:ekosys.corp@gmail.com" className="hover:text-white transition-colors">ekosys.corp@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Col 2: Product Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Product Categories</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-400">
              {categories?.slice(0, 10).map((cat: Category) => (
                <li key={cat.slug}>
                  <Link href={`/products/${cat.slug}`} className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <span className="text-emerald-500 text-xs">▸</span> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-400">
              {['About Us', 'Quality Standards', 'Blog', 'Privacy Policy', 'Terms & Conditions', 'Disclaimer'].map((link) => (
                <li key={link}>
                  <Link 
                    href={`/${link.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} 
                    className="hover:text-emerald-400 transition-colors flex items-center gap-2"
                  >
                    <span className="text-emerald-500 text-xs">▸</span> {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Certificates & Facility Map */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Certifications</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-400 mb-6">
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-teal-500 rounded-full"></span> ISO 9001:2015 Certified</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-teal-500 rounded-full"></span> ISO 13485:2016 Certified</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-teal-500 rounded-full"></span> CE Certified Products</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-teal-500 rounded-full"></span> Star Export House</li>
            </ul>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Facility Location
                </span>
                <a 
                  href="https://maps.google.com/?q=Hajipur+Vaishali+Bihar+India" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 hover:underline"
                >
                  View Map &rarr;
                </a>
              </div>
              <div className="w-full h-28 rounded-xl overflow-hidden border border-gray-800 shadow-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115132.86475730248!2d85.13220463990868!3d25.687255952876022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed594589d701df%3A0xcda1387d7b0453de!2sHajipur%2C%20Bihar!5e0!3m2!1sen!2sin!4v1709664531885!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="EKOSYS Corporation Facility Map"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            Copyright &copy; 2024-{currentYear} EKOSYS Corporation. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
            <a href="#" aria-label="Twitter / X" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

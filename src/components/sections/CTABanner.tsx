import Link from 'next/link';

export default function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-700 to-teal-800 text-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Become an Authorized EKOSYS Distributor
          </h2>
          <p className="text-emerald-50 text-xl mb-10 max-w-2xl">
            Let&apos;s grow together! We are looking for passionate distributors worldwide to join our ecosystem of innovation. High margins, superior quality, and dedicated support.
          </p>
          <Link 
            href="/contact/distributor" 
            className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Apply for Distributorship
          </Link>
        </div>
      </div>
    </section>
  );
}

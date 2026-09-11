import { Cpu, Shield, Palette } from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: 'Cutting-Edge Technology',
    description: 'We integrate the latest technological advancements in our medical equipment, ensuring precision, reliability, and superior performance for healthcare professionals worldwide.'
  },
  {
    icon: Shield,
    title: 'Robust Construction',
    description: 'Built to last. Our products undergo rigorous quality control and are manufactured with high-grade materials to withstand the demanding environments of modern hospitals and clinics.'
  },
  {
    icon: Palette,
    title: 'Custom Designs',
    description: 'Understanding that every medical facility has unique needs, we offer tailored manufacturing solutions and custom configurations to perfectly match your specific requirements.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-bold text-emerald-600 tracking-wider uppercase mb-2">The EKOSYS Advantage</h2>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Why Choose EKOSYS Corporation?</h3>
          <p className="text-sm md:text-base text-gray-600">
            For over three decades, we have been at the forefront of medical technology, delivering products that save lives and improve patient care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base md:text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

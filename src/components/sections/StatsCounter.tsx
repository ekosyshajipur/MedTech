'use client';
import { useEffect, useState, useRef } from 'react';
import { Package, Globe, Clock, Users } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { id: 1, label: 'Products', value: 5000, suffix: '+', icon: Package, duration: 2 },
  { id: 2, label: 'Countries', value: 8, suffix: '+', icon: Globe, duration: 1.5 },
  { id: 3, label: 'Years Experience', value: 10, suffix: '+', icon: Clock, duration: 1.5 },
  { id: 4, label: 'Happy Clients', value: 1000, suffix: '+', icon: Users, duration: 2 },
];

function Counter({ value, duration, inView }: { value: number, duration: number, inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Easing function for smooth slowdown at the end
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value, duration, inView]);

  return <span>{count.toLocaleString()}</span>;
}

export default function StatsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-10 md:py-12 bg-emerald-900 text-white">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-11 h-11 bg-emerald-800 rounded-xl flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-br from-white to-emerald-200">
                  <Counter value={stat.value} duration={stat.duration} inView={isInView} />
                  {stat.suffix}
                </div>
                <div className="text-emerald-300 font-medium tracking-wide uppercase text-xs">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

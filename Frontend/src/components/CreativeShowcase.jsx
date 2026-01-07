// src/components/WelcomeSection.jsx
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import person from "../assets/images/person.png";

// مكون صغير للعداد المتحرك
function Counter({ from = 0, to = 100, duration = 2 }) {
  const count = useMotionValue(from);
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    let controls;

    const startAnimation = () => {
      controls = animate(count, to, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => setDisplay(Math.floor(latest)),
        onComplete: () => {
          // ✅ لما يخلص العد يرجع يبدأ من الصفر
          count.set(from);
          startAnimation();
        },
      });
    };

    startAnimation();

    return () => controls && controls.stop();
  }, [to, duration, from, count]);

  return (
    <motion.span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white">
      {display}
    </motion.span>
  );
}

export default function WelcomeSection() {
  return (
    <section className="relative bg-gradient-to-r from-[#143939] via-[#1f4d4d] to-[#2a5f5f] overflow-hidden">
      {/* موجة */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 150"
          className="w-full h-32"
          preserveAspectRatio="none"
        >
          <path
            fill="#f5f5f5"
            d="M0,80 Q90,40 180,80 T360,80 T540,80 T720,80 T900,80 T1080,80 T1260,80 T1440,80 V0 H0 Z"
          ></path>
        </svg>
      </motion.div>

      {/* المحتوى */}
      <div className="relative z-10 py-20 md:py-28 container mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center gap-12">
        {/* Left: Text */}
        <div className="flex-1">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-wide"
          >
            Welcome to DOUBLE H ARCHITECTURE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-100 leading-relaxed mb-6"
          >
            At <span className="font-semibold">DOUBLE H</span>, we redefine
            modern architecture through innovative solutions that merge beauty
            with functionality. Our services cover creative architectural
            design, project supervision, and sustainable development — all
            tailored to reflect your identity and achieve the highest standards
            of quality.
          </motion.p>

          {/* Key Points */}
          <div className="space-y-4 text-gray-200">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="text-2xl">🏛️</span>
              <span>
                Innovative architectural design that tells your story.
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center gap-3"
            >
              <span className="text-2xl">🌿</span>
              <span>
                Sustainable solutions balancing modernity and environment.
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex items-center gap-3"
            >
              <span className="text-2xl">✨</span>
              <span>
                Luxury detailing for a refined architectural experience.
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right: Circle with PNG image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-1 relative flex justify-center items-center"
        >
          <div className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[480px] md:h-[480px] rounded-full bg-white/60 shadow-2xl flex items-center justify-center relative">
            {/* Glow */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0.4 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute w-[320px] h-[320px] sm:w-[520px] sm:h-[520px] rounded-full bg-green-300 blur-2xl"
            ></motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-green-200 blur-2xl"
            ></motion.div>

            {/* صورة الشخص */}
            <img
              src={person}
              alt="Architectural Team Member"
              className="w-[220px] h-[220px] sm:w-[340px] sm:h-[340px] md:w-[340px] md:h-[340px] object-contain relative z-10"
            />
          </div>
        </motion.div>
      </div>

      {/* Counters Section */}
      <div className="relative z-10 -mt-6 flex justify-center gap-12 md:gap-24">
        {/* خبرة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-white"
        >
          <span className="text-2xl sm:text-3xl md:text-4xl">⏳</span>
          <Counter to={15} duration={3} />
          <span className="mt-2 text-sm sm:text-base md:text-lg">
            Years of Experience
          </span>
        </motion.div>

        {/* مشاريع */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-white"
        >
          <span className="text-2xl sm:text-3xl md:text-4xl">🏗️</span>
          <Counter to={120} duration={3} />
          <span className="mt-2 text-sm sm:text-base md:text-lg">
            Projects Completed
          </span>
        </motion.div>

        {/* عملاء */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-white"
        >
          <span className="text-2xl sm:text-3xl md:text-4xl">🤝</span>
          <Counter to={80} duration={3} />
          <span className="mt-2 text-sm sm:text-base md:text-lg">
            Happy Clients
          </span>
        </motion.div>
      </div>
    </section>
  );
}

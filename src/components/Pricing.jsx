import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  HiSparkles,
  HiOutlineHeart,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

function FeatureChip({ icon, label }) {
  return (
    <div
      className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start
                 text-center sm:text-left gap-2 sm:gap-2.5 px-3 sm:px-4 py-3 sm:py-2 rounded-2xl sm:rounded-full
                 bg-white/50 border border-steel/20 w-full h-full sm:w-auto sm:h-auto
                 shadow-[0_2px_5px_rgba(11,20,38,0.08),0_1px_0_rgba(255,255,255,0.6)_inset]
                 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(11,20,38,0.12)]"
    >
      <span
        className="w-7 h-7 rounded-full bg-navy-deep flex items-center justify-center flex-shrink-0
                   shadow-[0_2px_4px_rgba(11,20,38,0.4),0_1px_0_rgba(255,255,255,0.15)_inset]"
      >
        <span className="text-sky text-xs">{icon}</span>
      </span>
      <span className="font-body text-xs sm:text-sm text-navy-slate/80 leading-snug">
        {label}
      </span>
    </div>
  );
}

export default function Pricing() {
  const cardRef = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springCfg = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), springCfg);
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), springCfg);

  const sheenX = useTransform(px, [0, 1], ["0%", "100%"]);
  const sheenY = useTransform(py, [0, 1], ["0%", "100%"]);
  const sheenBg = useMotionTemplate`radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.6), rgba(255,255,255,0) 45%)`;

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <section className="py-24 bg-sky/30 relative overflow-hidden" style={{ perspective: 1600 }}>
      {/* soft ambient depth orbs behind the card */}
      <div className="pointer-events-none absolute -top-10 left-1/4 w-72 h-72 rounded-full bg-sand/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-1/4 w-80 h-80 rounded-full bg-navy-deep/10 blur-3xl" />

      <div className="max-w-3xl mx-auto px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative bg-cream rounded-3xl p-12 border border-steel/20 will-change-transform
                       shadow-[0_25px_50px_-15px_rgba(11,20,38,0.3),0_3px_6px_rgba(11,20,38,0.12)]"
          >
            <motion.div
              style={{ background: sheenBg }}
              className="pointer-events-none absolute inset-0 rounded-3xl mix-blend-overlay"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(11,20,38,0.05)",
              }}
            />

            <motion.div style={{ transform: "translateZ(30px)" }}>
              <span
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-navy-deep mb-6
                           shadow-[0_6px_14px_rgba(11,20,38,0.4),0_1px_0_rgba(255,255,255,0.15)_inset,0_-2px_4px_rgba(0,0,0,0.3)_inset]"
              >
                <HiSparkles className="text-sand text-2xl" />
              </span>

              <h2 className="font-display text-3xl md:text-4xl text-navy-slate font-light mb-4">
                Every practice is personal —
                <br />
                <span className="italic">so is your plan</span>
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-body text-navy-slate/70 mb-5 max-w-md mx-auto"
              >
                Pricing is tailored to your goals, format, and frequency. Reach
                out and the team will help you find the right fit.
              </motion.p>

              {/* Small animated accent divider between the two paragraphs */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="w-12 h-px mx-auto mb-5 bg-sand"
              />

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-body text-navy-slate/70 mb-6 max-w-md mx-auto"
              >
                
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="grid grid-cols-2 sm:flex sm:flex-wrap items-stretch sm:items-center justify-center gap-3 mb-9"
              >
                <FeatureChip icon={<HiOutlineHeart />} label="Personalized goals" />
                <FeatureChip icon={<HiOutlineClock />} label="30–60 min sessions" />
                <FeatureChip icon={<HiOutlineGlobeAlt />} label="Bangalore - offline & worldwide - online" />
                <FeatureChip icon={<HiOutlineCalendar />} label="Flexible timings" />
              </motion.div>

              
              <a href="#contact"
                className="inline-block px-10 py-3.5 rounded-full bg-navy-deep text-cream font-body font-medium
                           shadow-[0_6px_14px_rgba(11,20,38,0.4),0_1px_0_rgba(255,255,255,0.15)_inset]
                           transition-all duration-150 ease-out
                           hover:-translate-y-0.5 hover:bg-sand hover:text-navy-deep hover:shadow-[0_10px_20px_rgba(11,20,38,0.35)]
                           active:translate-y-0 active:shadow-[0_2px_4px_rgba(11,20,38,0.3),inset_0_2px_6px_rgba(0,0,0,0.25)]"
              >
                Get Pricing Details
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
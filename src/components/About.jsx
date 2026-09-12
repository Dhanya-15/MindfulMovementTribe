import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bio } from "../content";

const CLIPS = [
  "/videos/About/about1.mp4",
  "/videos/About/about2.mp4",
  "/videos/About/about3.mp4",
];

export default function About() {
  // Index of the clip currently in the wide/active slot.
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);

  const handleEnded = () => {
    setActiveIndex((prev) => (prev + 1) % CLIPS.length);
  };

  // Play only the active video; pause every shrunk one so nothing plays
  // while collapsed, and it resumes from the start next time it's active.
  useEffect(() => {
    CLIPS.forEach((_, i) => {
      const v = videoRefs.current[i];
      if (!v) return;
      if (i === activeIndex) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [activeIndex]);

  return (
    <section id="about" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative h-[520px] [perspective:1500px] flex gap-3"
        >
          {/*
            Each clip has a fixed slot index (0, 1, 2 left-to-right) that
            never changes — only its width/state changes. The active clip
            expands to fill the wide slot in place; the other two stay
            collapsed as narrow side panels. No reordering, ever.
          */}
          {CLIPS.map((clip, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={clip}
                animate={{ flexGrow: isActive ? 20 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative h-full rounded-2xl overflow-hidden border border-sand/30 flex-shrink-0 ${
                  isActive ? "shadow-2xl z-20" : "shadow-xl z-10"
                }`}
                style={{
                  flexBasis: isActive ? "0%" : "2.25rem",
                  minWidth: isActive ? undefined : "1.75rem",
                  maxWidth: isActive ? undefined : "3rem",
                }}
              >
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={clip}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  onEnded={isActive ? handleEnded : undefined}
                />
                {!isActive && <div className="absolute inset-0 bg-navy-deep/10" />}
              </motion.div>
            );
          })}

          <div className="absolute -inset-4 border border-sand/40 rounded-2xl -z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="[perspective:1200px]"
        >
          <motion.p
            initial={{ opacity: 0, z: -30 }}
            whileInView={{ opacity: 1, z: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-sand uppercase tracking-[0.25em] text-xs mb-4"
          >
            About Rathi
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, rotateX: 20, z: -60 }}
            whileInView={{ opacity: 1, rotateX: 0, z: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            whileHover={{
              rotateX: -3,
              rotateY: 2,
              transition: { duration: 0.4 },
            }}
            style={{
              transformStyle: "preserve-3d",
              textShadow:
                "0 1px 0 rgba(15,30,45,0.12), 0 2px 0 rgba(15,30,45,0.09), 0 4px 6px rgba(15,30,45,0.15)",
            }}
            className="font-display text-4xl md:text-5xl text-navy-slate font-light mb-6 will-change-transform"
          >
            4 years of guiding
            <br />
            <span className="italic">mindful practice</span>
          </motion.h2>

          <p className="font-body text-navy-slate/80 leading-relaxed mb-4">
            {bio}
          </p>
          <p className="font-body text-navy-slate/70 leading-relaxed italic">
            Certified by the International Yoga Alliance.
          </p>

          <div className="mt-8 flex gap-8 [perspective:800px]">
            {[
              { value: "4+", label: "Years Teaching" },
              { value: "500+", label: "Hours Trained" },
              { value: "4", label: "Yoga Styles" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, rotateX: 25 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                whileHover={{
                  rotateX: -8,
                  y: -4,
                  transition: { duration: 0.3 },
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="cursor-default"
              >
                <p
                  className="font-display text-4xl text-navy-deep"
                  style={{
                    textShadow:
                      "0 1px 0 rgba(15,30,45,0.1), 0 3px 4px rgba(15,30,45,0.18)",
                  }}
                >
                  {stat.value}
                </p>
                <p className="font-body text-sm text-navy-slate/60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

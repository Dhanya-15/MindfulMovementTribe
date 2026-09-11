import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { classes } from "../content";

const mediaItems = [
  { type: "image", src: "/images/kids-1on1.jpg", alt: "Kids tutoring session 1" },
  { type: "image", src: "/images/kids-group.jpg", alt: "Kids tutoring session 2" },
  { type: "video", src: "/videos/group-session1.mp4", alt: "Kids tutoring video 1" },
  { type: "image", src: "/images/group-session2.jpeg", alt: "Kids tutoring session 4" },
  { type: "video", src: "/videos/solo-session1.mp4", alt: "Kids tutoring video 2" },
  { type: "image", src: "/images/solo-session2.jpeg", alt: "Kids tutoring session 5" },
  { type: "video", src: "/videos/wellness.mp4", alt: "Kids tutoring video 3" },
];

function WaveTop({ fill }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="absolute top-0 left-0 w-full h-12 md:h-16 -translate-y-full"
      aria-hidden="true"
    >
      <path
        d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
        fill={fill}
      />
    </svg>
  );
}

function WaveBottom({ fill }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 w-full h-12 md:h-16 translate-y-full z-10"
      aria-hidden="true"
    >
      <path
        d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,0 L0,0 Z"
        fill={fill}
      />
    </svg>
  );
}

function LotusGraphic({ className, delay = 0, duration = 8, yRange = [0, -16, 0], rotateRange = [0, 6, 0] }) {
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      animate={{ y: yRange, rotate: rotateRange }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <svg viewBox="0 0 64 64" fill="none">
        <path
          d="M32 8 C34 20 40 26 50 30 C40 32 34 38 32 50 C30 38 24 32 14 30 C24 26 30 20 32 8Z"
          stroke="#001532"
          strokeWidth="1.2"
        />
      </svg>
    </motion.div>
  );
}

// Handles both images and videos in the same stack/fade cycle.
// Images auto-advance after 3 seconds. Videos auto-advance when
// their playback ends (their natural duration), not on a fixed timer.
function KidsImageFader() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const current = mediaItems[index];

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % mediaItems.length);
  }, []);

  useEffect(() => {
    // Clear any pending image timer whenever the active item changes
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (current.type === "image") {
      timerRef.current = setTimeout(() => {
        goNext();
      }, 3200);
    }
    // Videos advance via their own onEnded handler below,
    // not via this timer.

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [index, current.type, goNext]);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20"
      style={{ perspective: "1400px", aspectRatio: "3 / 4" }}
    >
      <AnimatePresence mode="sync">
        {current.type === "video" ? (
          <motion.video
            key={current.src}
            ref={videoRef}
            src={current.src}
            autoPlay
            muted
            playsInline
            onEnded={goNext}
            initial={{ opacity: 0, scale: 1.08, rotateY: 6 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 1.02, rotateY: -6 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt}
            initial={{ opacity: 0, scale: 1.08, rotateY: 6 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 1.02, rotateY: -6 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {mediaItems.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === index ? "#d9c896" : "rgba(255,255,255,0.55)",
              width: i === index ? "18px" : "6px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Splits one paragraph of description text into separate bullet points.
// Splits on sentence-ending punctuation followed by a space or end of
// string, trims whitespace, drops empty fragments. Since class
// descriptions vary in length, this also means different classes will
// naturally produce different numbers of points - which is exactly why
// the card below sizes itself to content rather than using a fixed height.
function splitIntoPoints(text) {
  if (!text) return [];
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function ClassCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = classes.length;

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const cls = classes[index];
  const points = splitIntoPoints(cls.description);

  const variants = {
    enter: (dir) => ({
      rotateY: dir > 0 ? 65 : -65,
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      rotateY: 0,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -65 : 65,
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.9,
    }),
  };

  // Each bullet point gets its own 3D entrance - tilting in from a slight
  // depth offset and settling flat, staggered so they read as distinct
  // items arriving in space rather than static text appearing all at once.
  const pointVariants = {
    hidden: { opacity: 0, rotateX: -20, z: -40, y: 8 },
    visible: (i) => ({
      opacity: 1,
      rotateX: 0,
      z: 0,
      y: 0,
      transition: { duration: 0.45, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className="relative w-full max-w-lg"
        style={{ perspective: "1600px" }}
      >
        {/* Left arrow - positioned to the left of the card */}
        <button
          onClick={goPrev}
          aria-label="Previous class"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(100%+16px)] z-20 w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-300 hover:bg-white/20 hidden md:flex"
          style={{ borderColor: "#001532", color: "#001532", backgroundColor: "#f5f2eaaa" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Right arrow - positioned to the right of the card */}
        <button
          onClick={goNext}
          aria-label="Next class"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+16px)] z-20 w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-300 hover:bg-white/20 hidden md:flex"
          style={{ borderColor: "#001532", color: "#001532", backgroundColor: "#f5f2eaaa" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-full rounded-2xl p-8 md:p-10 border shadow-2xl flex flex-col justify-center min-h-[380px] sm:min-h-[420px] md:min-h-[460px]"
          >
            <div
              className="absolute inset-0 rounded-2xl -z-10"
              style={{ backgroundColor: "#f5f2ea", borderColor: "#13243033" }}
            />
            <p
              className="font-body text-xs uppercase tracking-wider mb-3"
              style={{ color: "#d9c896" }}
            >
              {cls.modes}
            </p>
            <h3
              className="font-display text-2xl sm:text-3xl mb-5"
              style={{ color: "#001532" }}
            >
              {cls.name}
            </h3>

            <ul className="flex flex-col gap-3" style={{ transformStyle: "preserve-3d" }}>
              {points.map((point, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={pointVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ transformStyle: "preserve-3d" }}
                  className="flex items-baseline gap-3"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 translate-y-[-2px]"
                    style={{ backgroundColor: "#d9c896" }}
                  />
                  <span
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "#132430", opacity: 0.85 }}
                  >
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Single set of controls: arrows + counter, outside the card, for all screen sizes */}
      <div className="flex items-center justify-center gap-6 mt-7">
        <button
          onClick={goPrev}
          aria-label="Previous class"
          className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-300 hover:bg-white/20 md:hidden"
          style={{ borderColor: "#001532", color: "#001532" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="font-display text-sm tracking-widest w-12 text-center" style={{ color: "#001532" }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25 }}
              className="inline-block"
            >
              {index + 1}
            </motion.span>
          </AnimatePresence>
          <span className="mx-1">/</span>
          {total}
        </div>

        <button
          onClick={goNext}
          aria-label="Next class"
          className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-300 hover:bg-white/20 md:hidden"
          style={{ borderColor: "#001532", color: "#001532" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Classes() {
  return (
    <section
      id="classes"
      className="relative py-24"
      style={{ backgroundColor: "#8d9fb4" }}
    >
      <WaveTop fill="#8d9fb4" />

      <LotusGraphic
        className="absolute top-16 left-[6%] w-14 h-14 opacity-20 hidden md:block"
        delay={0}
        duration={7}
      />
      <LotusGraphic
        className="absolute bottom-20 right-[7%] w-16 h-16 opacity-20 hidden md:block"
        delay={1.2}
        duration={9}
        yRange={[0, 14, 0]}
        rotateRange={[0, -6, 0]}
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="font-body uppercase tracking-[0.25em] text-xs mb-4"
            style={{ color: "#d9c896" }}
          >
            Practice With Us
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-light mb-4"
            style={{ color: "#001532" }}
          >
            Classes Offered
          </h2>
          <p
            className="font-body max-w-xl mx-auto"
            style={{ color: "#132430" }}
          >
            30–60 minute sessions for every level. Offline in Bangalore, online
            anywhere in the world. Timings are flexible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 items-center"
        >
          <ClassCarousel />
          <div className="w-full max-w-sm mx-auto lg:max-w-none">
            <KidsImageFader />
          </div>
        </motion.div>
      </div>

      <WaveBottom fill="#8d9fb4" />
    </section>
  );
}
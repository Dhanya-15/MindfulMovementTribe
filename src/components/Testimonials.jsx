import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight, HiPlay, HiX } from "react-icons/hi";
import { testimonials } from "../content";

const PER_PAGE = 3;
const totalPages = Math.ceil(testimonials.length / PER_PAGE);

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
      className="absolute bottom-0 left-0 w-full h-12 md:h-16 translate-y-full"
      aria-hidden="true"
    >
      <path
        d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,0 L0,0 Z"
        fill={fill}
      />
    </svg>
  );
}

function Sticker({ className, rotate = 0, size = 40, color = "#d9c896", delay = 0 }) {
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{ width: size, height: size }}
      animate={{ y: [0, -10, 0], rotate: [rotate, rotate + 8, rotate] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <svg viewBox="0 0 64 64" fill="none">
        <path
          d="M32 8 C34 20 40 26 50 30 C40 32 34 38 32 50 C30 38 24 32 14 30 C24 26 30 20 32 8Z"
          stroke={color}
          strokeWidth="1.4"
        />
      </svg>
    </motion.div>
  );
}

function Avatar({ testimonial }) {
  const initials = testimonial.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="relative w-16 h-16 rounded-full bg-navy-deep flex items-center justify-center flex-shrink-0">
      <span className="font-display text-2xl text-sky">{initials}</span>
      {testimonial.mediaType === "video" && (
        <div
          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#d9c896" }}
        >
          <HiPlay className="text-navy-deep text-xs" />
        </div>
      )}
    </div>
  );
}

function TestimonialCard({ testimonial, onOpen, index }) {
  return (
    <motion.button
      onClick={() => onOpen(testimonial)}
      whileHover={{ y: -6, rotateY: 4 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d" }}
      className="relative text-left w-full rounded-2xl p-6 border transition-colors duration-300"
    >
      <div
        className="absolute inset-0 rounded-2xl -z-10"
        style={{ backgroundColor: "#f5f2ea", borderColor: "#13243033" }}
      />
      <div className="flex items-center gap-4 mb-4">
        <Avatar testimonial={testimonial} />
        <div>
          <p className="font-display text-xl" style={{ color: "#001532" }}>
            {testimonial.name}
          </p>
          <p className="font-body text-xs" style={{ color: "#132430", opacity: 0.65 }}>
            {testimonial.location}
          </p>
        </div>
      </div>
      <p
        className="font-display italic text-sm leading-relaxed line-clamp-3"
        style={{ color: "#132430" }}
      >
        "{testimonial.quote}"
      </p>
      <p className="font-body text-xs mt-4" style={{ color: "#d9c896" }}>
        {testimonial.mediaCount} {testimonial.mediaType}
        {testimonial.mediaCount > 1 ? "s" : ""} · Read more
      </p>
    </motion.button>
  );
}

function DetailModal({ testimonial, onClose }) {
  if (!testimonial) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-navy-deep/90 backdrop-blur-sm flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-cream rounded-3xl max-w-lg w-full p-8 relative max-h-[85vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-navy-slate/50 hover:text-navy-slate text-2xl"
            aria-label="Close"
          >
            <HiX />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-navy-deep flex items-center justify-center">
              <span className="font-display text-2xl text-sky">
                {testimonial.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
            <div>
              <p className="font-display text-2xl text-navy-slate">
                {testimonial.name}
              </p>
              <p className="font-body text-sm text-navy-slate/60">
                {testimonial.location}
              </p>
            </div>
          </div>

          <p className="font-display italic text-navy-slate/85 text-lg leading-relaxed mb-6">
            "{testimonial.quote}"
          </p>

          <div className="grid grid-cols-3 gap-2">
            {testimonial.mediaIds.map((id) => (
              <div
                key={id}
                className="aspect-square rounded-lg bg-sky/40 border border-dashed border-steel/40 flex items-center justify-center"
              >
                {testimonial.mediaType === "video" ? (
                  <HiPlay className="text-navy-slate/40 text-xl" />
                ) : (
                  <span className="font-body text-[10px] text-navy-slate/40 px-1 text-center">
                    {id}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Testimonials() {
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = () => {
    setDirection(1);
    setPage((p) => (p + 1) % totalPages);
  };
  const goPrev = () => {
    setDirection(-1);
    setPage((p) => (p - 1 + totalPages) % totalPages);
  };

  const currentTrio = testimonials.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const pageVariants = {
    enter: (dir) => ({ rotateY: dir > 0 ? 55 : -55, opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { rotateY: 0, opacity: 1, x: 0 },
    exit: (dir) => ({ rotateY: dir > 0 ? -55 : 55, opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <section
      id="testimonials"
      className="relative py-24"
      style={{ backgroundColor: "#8d9fb4" }}
    >
      <WaveTop fill="#8d9fb4" />

      <div className="relative overflow-hidden">
        <Sticker className="absolute top-20 left-[4%] hidden lg:block" size={44} rotate={-10} delay={0} />
        <Sticker className="absolute top-40 right-[6%] hidden lg:block" size={32} rotate={15} delay={1.5} color="#f5f2ea" />
        <Sticker className="absolute bottom-24 left-[8%] hidden lg:block" size={36} rotate={20} delay={0.8} />

        <div className="max-w-6xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p
                className="font-body uppercase tracking-[0.25em] text-xs mb-4"
                style={{ color: "#d9c896" }}
              >
                From the Tribe
              </p>
              <h2
                className="font-display text-4xl md:text-5xl font-light"
                style={{ color: "#001532" }}
              >
                Student Stories
              </h2>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={goPrev}
                className="w-11 h-11 rounded-full border flex items-center justify-center transition-colors"
                style={{ borderColor: "#13243066", color: "#001532" }}
                aria-label="Previous testimonials"
              >
                <HiChevronLeft />
              </button>
              <div className="font-display text-sm tracking-widest w-14 text-center" style={{ color: "#001532" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={page}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25 }}
                    className="inline-block"
                  >
                    {page + 1}
                  </motion.span>
                </AnimatePresence>
                <span className="mx-1">/</span>
                {totalPages}
              </div>
              <button
                onClick={goNext}
                className="w-11 h-11 rounded-full border flex items-center justify-center transition-colors"
                style={{ borderColor: "#13243066", color: "#001532" }}
                aria-label="Next testimonials"
              >
                <HiChevronRight />
              </button>
            </div>
          </motion.div>

          <div style={{ perspective: "1800px" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {currentTrio.map((t, i) => (
                  <TestimonialCard key={t.name} testimonial={t} onOpen={setSelected} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex md:hidden items-center justify-center gap-4 mt-8">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full border flex items-center justify-center"
              style={{ borderColor: "#13243066", color: "#001532" }}
              aria-label="Previous testimonials"
            >
              <HiChevronLeft />
            </button>
            <span className="font-display text-sm" style={{ color: "#001532" }}>
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full border flex items-center justify-center"
              style={{ borderColor: "#13243066", color: "#001532" }}
              aria-label="Next testimonials"
            >
              <HiChevronRight />
            </button>
          </div>
        </div>
      </div>

      <DetailModal testimonial={selected} onClose={() => setSelected(null)} />

      <WaveBottom fill="#8d9fb4" />
    </section>
  );
}
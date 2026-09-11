import { useState, useEffect, useCallback } from "react";
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

// A testimonial "has video" if any of its mediaIds entries are type
// "video" (each person can have a mix of images and videos), rather
// than checking a single top-level mediaType field.
function hasVideo(testimonial) {
  return testimonial.mediaIds?.some((m) => m.type === "video");
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
      {hasVideo(testimonial) && (
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

// Single preview tile shown on the card: just the first media item, plus a
// "+N more" badge when there's more than one, and a "View more" label under
// it. Clicking either opens the full gallery lightbox starting at index 0.
function MediaPreview({ testimonial, onOpen }) {
  const items = testimonial.mediaIds;
  if (!items?.length) return null;

  const first = items[0];
  const remaining = items.length - 1;

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // don't also trigger the card's onOpen(testimonial)
          onOpen(testimonial, 0);
        }}
        className="relative aspect-square rounded-lg overflow-hidden border border-steel/30 w-20 sm:w-24 block"
      >
        {first.type === "video" ? (
          <>
            <video
              src={first.src}
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-navy-deep/30 flex items-center justify-center">
              <HiPlay className="text-cream text-lg" />
            </div>
          </>
        ) : (
          <img
            src={first.src}
            alt="Testimonial preview"
            className="w-full h-full object-cover pointer-events-none"
          />
        )}

        {remaining > 0 && (
          <div className="absolute inset-0 bg-navy-deep/0 hover:bg-navy-deep/10 transition-colors" />
        )}
        {remaining > 0 && (
          <div
            className="absolute bottom-1 right-1 rounded-full px-1.5 py-0.5 text-[10px] font-body font-semibold"
            style={{ backgroundColor: "#001532", color: "#f5f2ea" }}
          >
            +{remaining}
          </div>
        )}
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onOpen(testimonial, 0);
        }}
        className="font-body text-xs mt-2 hover:underline block"
        style={{ color: "#d9c896" }}
      >
        View more ({testimonial.mediaCount} item{testimonial.mediaCount > 1 ? "s" : ""})
      </button>
    </div>
  );
}

function TestimonialCard({ testimonial, onOpen, onOpenGallery, index }) {
  return (
    <motion.div
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

      <button
        type="button"
        onClick={() => onOpen(testimonial)}
        className="w-full text-left"
      >
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
      </button>

      {/* Single preview tile + "View more" — opens the full gallery */}
      <MediaPreview testimonial={testimonial} onOpen={onOpenGallery} />
    </motion.div>
  );
}

function DetailModal({ testimonial, onClose, onOpenGallery }) {
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

          {/* Single preview tile + "View more" here too, instead of the full grid */}
          <MediaPreview testimonial={testimonial} onOpen={onOpenGallery} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Full gallery lightbox: shows every image/video attached to a testimonial,
// one at a time, with left/right arrow navigation (buttons + keyboard +
// swipe). Shown on top of everything, including the detail modal. Works the
// same on mobile and desktop — media is always capped to the viewport so
// it's never cropped or overflowing.
function MediaGalleryLightbox({ testimonial, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex ?? 0);

  // Reset to the clicked item whenever a new testimonial's gallery opens
  useEffect(() => {
    setIndex(startIndex ?? 0);
  }, [testimonial, startIndex]);

  const items = testimonial?.mediaIds ?? [];
  const total = items.length;

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  // Keyboard navigation (desktop) — arrow keys + Escape
  useEffect(() => {
    if (!testimonial) return;
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [testimonial, goNext, goPrev, onClose]);

  if (!testimonial || total === 0) return null;

  const current = items[index];

  // Simple touch-swipe support (mobile) — left/right swipe changes item
  let touchStartX = 0;
  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return; // ignore small taps/drags
    if (dx < 0) goNext();
    else goPrev();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-cream/70 hover:text-cream text-3xl z-20"
          aria-label="Close"
        >
          <HiX />
        </button>

        {/* Counter */}
        <div
          className="absolute top-6 left-1/2 -translate-x-1/2 font-body text-sm tracking-widest z-20"
          style={{ color: "#f5f2ea" }}
        >
          {index + 1} / {total}
        </div>

        {/* Prev arrow */}
        {total > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-20 bg-black/40 hover:bg-black/60 text-cream text-xl sm:text-2xl transition-colors"
            aria-label="Previous media"
          >
            <HiChevronLeft />
          </button>
        )}

        {/* Next arrow */}
        {total > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-20 bg-black/40 hover:bg-black/60 text-cream text-xl sm:text-2xl transition-colors"
            aria-label="Next media"
          >
            <HiChevronRight />
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[92vw] max-h-[80vh] flex items-center justify-center"
          >
            {current.type === "video" ? (
              <video
                src={current.src}
                controls
                autoPlay
                playsInline
                className="max-w-[92vw] max-h-[80vh] rounded-lg"
              />
            ) : (
              <img
                src={current.src}
                alt={`${testimonial.name} testimonial media ${index + 1}`}
                className="max-w-[92vw] max-h-[80vh] rounded-lg object-contain"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Testimonials() {
  const [selected, setSelected] = useState(null);
  const [gallery, setGallery] = useState({ testimonial: null, index: 0 });
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const openGallery = (testimonial, index = 0) => {
    setGallery({ testimonial, index });
  };
  const closeGallery = () => {
    setGallery({ testimonial: null, index: 0 });
  };

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
                  <TestimonialCard
                    key={t.name}
                    testimonial={t}
                    onOpen={setSelected}
                    onOpenGallery={openGallery}
                    index={i}
                  />
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

      <DetailModal
        testimonial={selected}
        onClose={() => setSelected(null)}
        onOpenGallery={openGallery}
      />

      <MediaGalleryLightbox
        testimonial={gallery.testimonial}
        startIndex={gallery.index}
        onClose={closeGallery}
      />

      <WaveBottom fill="#8d9fb4" />
    </section>
  );
}

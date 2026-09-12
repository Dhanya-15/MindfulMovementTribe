import { useState, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";

function WaveBottom({ fill }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 w-full h-16 md:h-20 translate-y-[1px] z-30"
      aria-hidden="true"
    >
      <path
        d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z"
        fill={fill}
      />
    </svg>
  );
}

const spiralImages = [
  { src: "/images/Hero/beach-kneeling.jpg", alt: "Beach kneeling stretch" },
  { src: "/images/Hero/beach-camel.jpg", alt: "Beach camel pose" },
  { src: "/images/Hero/aerial-fold.jpg", alt: "Aerial yoga fabric fold" },
  { src: "/images/Hero/aerial-extension.jpg", alt: "Aerial yoga side extension" },
  { src: "/images/Hero/wild-thing-pose.jpeg", alt: "wild thing pose" },
  { src: "/images/Hero/aerial-extension.jpg", alt: "aerial-extension" },
  { src: "/images/Hero/aerial-fold.jpg", alt: "aerial-fold" },
  { src: "/images/Hero/aerial-upsidedown.png", alt: "aerial-upsidedown" },
  { src: "/images/Hero/backbend-half.png", alt: "backbend-half" },
  { src: "/images/Hero/beach-pose.jpg", alt: "beach-pose" },
  { src: "/images/Hero/backbend.png", alt: "backbend" },
  { src: "/images/Hero/beach-pose2.jpg", alt: "beach-pose" },
  { src: "/images/Hero/beach-sideangle.jpg", alt: "beach-sideangle" },
  { src: "/images/Hero/forward-bend.png", alt: "forward-bend" },
  { src: "/images/Hero/fullsplit.png", alt: "fullsplit" },
  { src: "/images/Hero/headstand.png", alt: "headstand" },
  { src: "/images/Hero/homepose.png", alt: "homepose" },
  { src: "/images/Hero/headstand2.png", alt: "headstand" },
  { src: "/images/Hero/homepose2.png", alt: "homepose" },
  { src: "/images/Hero/homepose3.png", alt: "homepose3" },

  // Add up to 4 more here as you get them - the spiral automatically
  // rebalances spacing/radius/size for whatever count is in this array.
];

const count = spiralImages.length;

// Base (desktop) sizing - unchanged from before
const BASE_RADIUS_DESKTOP = 130;
const RADIUS_STEP_DESKTOP = Math.max(28, 260 / count);
const IMG_W_DESKTOP = Math.max(180, 280 - count * 8);
const VERTICAL_STEP_DESKTOP = Math.max(14, 160 / count);

// Tracks viewport width AND height, since on mobile the vertical spread
// needs to be driven by how tall the screen actually is (to fill the
// gap between the logo/menu bar and the buttons), not just width.
function useViewportSize() {
  const [size, setSize] = useState(
    typeof window !== "undefined"
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 1024, height: 768 }
  );

  useEffect(() => {
    const onResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return size;
}

// Horizontal/depth scale factor - controls radius and image width.
function getSpiralScale(width) {
  if (width < 400) return 0.4;
  if (width < 640) return 0.48;
  if (width < 768) return 0.7;
  if (width < 1024) return 0.85;
  return 1;
}

// Vertical spread factor is separate from horizontal scale on mobile:
// we want the ring to fan out tall enough to cover the space between
// the header and the CTA buttons, even though each image is small and
// the radius is tight. This returns a multiplier applied on top of
// VERTICAL_STEP_DESKTOP.
function getVerticalSpreadMultiplier(width, height) {
  if (width < 640) {
    // Taller phones get a bit more vertical fan so the ring doesn't
    // bunch up in the middle third of the screen.
    return Math.min(3.2, Math.max(2.2, height / 260));
  }
  if (width < 1024) return 1.4;
  return 1;
}

export default function Hero() {
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  const scale = getSpiralScale(viewportWidth);
  const verticalMultiplier = getVerticalSpreadMultiplier(viewportWidth, viewportHeight);
  const isMobile = viewportWidth < 640;

  const BASE_RADIUS = BASE_RADIUS_DESKTOP * scale;
  const RADIUS_STEP = RADIUS_STEP_DESKTOP * scale;
  const MAX_RADIUS = BASE_RADIUS + RADIUS_STEP * (count - 1);
  const ANGLE_SPREAD = 360 * (1 + count * 0.08);
  const VERTICAL_STEP = VERTICAL_STEP_DESKTOP * scale * verticalMultiplier;

  const IMG_W = IMG_W_DESKTOP * scale;
  const IMG_H = Math.round(IMG_W * 1.35);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#8d9fb4" }}
    >
      <RotatingSpiral
        count={count}
        BASE_RADIUS={BASE_RADIUS}
        RADIUS_STEP={RADIUS_STEP}
        MAX_RADIUS={MAX_RADIUS}
        ANGLE_SPREAD={ANGLE_SPREAD}
        VERTICAL_STEP={VERTICAL_STEP}
        IMG_W={IMG_W}
        IMG_H={IMG_H}
        isMobile={isMobile}
      />

      <div
        className="absolute inset-0 z-[5]"
        style={{
          background: isMobile
            ? "radial-gradient(ellipse at center, rgba(141,159,180,0.35) 0%, rgba(141,159,180,0.6) 65%, #8d9fb4 100%)"
            : "radial-gradient(ellipse at center, rgba(141,159,180,0.55) 0%, rgba(141,159,180,0.85) 65%, #8d9fb4 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] max-w-[600px] max-h-[600px] rounded-full blur-3xl animate-breathe z-[6]"
        style={{ backgroundColor: "#f7f5f0", opacity: 0.15 }}
      />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body tracking-[0.3em] uppercase text-xs md:text-sm mb-6"
          style={{ color: "#001532" }}
        >
          Heal · Move · Live
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-light leading-tight mb-6"
          style={{ color: "#f7f5f0" }}
        >
          Find Your Flow with
          <br />
          <span className="italic" style={{ color: "#001532" }}>
            Mindful Movement Tribe
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-body text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: "#132430" }}
        >
          Yoga, aerial, and mindful movement with Rathi Meena — a practice that
          meets you exactly where you are.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-full font-body font-medium transition-colors duration-300"
            style={{ backgroundColor: "#001532", color: "#f7f5f0" }}
          >
            Begin Your Practice
          </motion.a>
          <motion.a
            href="#classes"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-full border font-body transition-colors duration-300"
            style={{ borderColor: "#132430", color: "#132430" }}
          >
            Explore Classes
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 animate-float z-20"
      >
        <div
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1"
          style={{ borderColor: "#132430" }}
        >
          <div className="w-1 h-2 rounded-full" style={{ backgroundColor: "#001532" }} />
        </div>
      </motion.div>

      <WaveBottom fill="#f7f5f0" />
    </section>
  );
}

function RotatingSpiral({
  count,
  BASE_RADIUS,
  RADIUS_STEP,
  MAX_RADIUS,
  ANGLE_SPREAD,
  VERTICAL_STEP,
  IMG_W,
  IMG_H,
  isMobile,
}) {
  const angle = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    angle.set(angle.get() + (delta / 1000) * 7);
  });

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        perspective: "1600px",
        transform: isMobile ? "translateY(-15%)" : "none",
      }}
    >
      <div className="relative" style={{ transformStyle: "preserve-3d" }}>
        {spiralImages.map((img, i) => {
          const offsetAngle = (ANGLE_SPREAD / count) * i;
          const radius = BASE_RADIUS + RADIUS_STEP * i;
          const verticalOffset = (i - (count - 1) / 2) * VERTICAL_STEP;

          return (
            <SpiralItem
              key={img.src}
              img={img}
              offsetAngle={offsetAngle}
              radius={radius}
              verticalOffset={verticalOffset}
              ringAngle={angle}
              MAX_RADIUS={MAX_RADIUS}
              IMG_W={IMG_W}
              IMG_H={IMG_H}
              isMobile={isMobile}
            />
          );
        })}
      </div>
    </div>
  );
}

function SpiralItem({
  img,
  offsetAngle,
  radius,
  verticalOffset,
  ringAngle,
  MAX_RADIUS,
  IMG_W,
  IMG_H,
  isMobile,
}) {
  const currentAngle = useTransform(ringAngle, (a) => a + offsetAngle);

  const x = useTransform(currentAngle, (a) => radius * Math.sin((a * Math.PI) / 180));
  const z = useTransform(currentAngle, (a) => radius * Math.cos((a * Math.PI) / 180));
  const faceRotateY = useTransform(currentAngle, (a) => -a);

  // On mobile, raise the opacity floor so images at the back of the ring
  // stay visibly present across the screen instead of nearly disappearing
  // (that's what was making the middle of the hero look empty).
  const opacity = useTransform(
    z,
    [-MAX_RADIUS, MAX_RADIUS],
    isMobile ? [0.55, 1] : [0.3, 1]
  );
  const scale = useTransform(
    z,
    [-MAX_RADIUS, MAX_RADIUS],
    isMobile ? [0.75, 1] : [0.6, 1]
  );

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 rounded-2xl overflow-hidden shadow-2xl"
      style={{
        width: IMG_W,
        height: IMG_H,
        marginTop: -IMG_H / 2,
        marginLeft: -IMG_W / 2,
        x,
        y: verticalOffset,
        z,
        rotateY: faceRotateY,
        opacity,
        scale,
        transformStyle: "preserve-3d",
      }}
    >
      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
    </motion.div>
  );
}
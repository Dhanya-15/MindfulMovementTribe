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
  { src: "/images/beach-kneeling.jpg", alt: "Beach kneeling stretch" },
  { src: "/images/beach-camel.jpg", alt: "Beach camel pose" },
  { src: "/images/aerial-fold.jpg", alt: "Aerial yoga fabric fold" },
  { src: "/images/aerial-extension.jpg", alt: "Aerial yoga side extension" },
  { src: "/images/wild-thing-pose.jpeg", alt: "wild thing pose" },
  { src: "/images/aerial-extension.jpg", alt: "aerial-extension" },
  { src: "/images/aerial-fold.jpg", alt: "aerial-fold" },
  { src: "/images/aerial-upsidedown.png", alt: "aerial-upsidedown" },
  { src: "/images/backbend-half.png", alt: "backbend-half" },
  { src: "/images/beach-pose.jpg", alt: "beach-pose" },
  { src: "/images/backbend.png", alt: "backbend" },
  { src: "/images/beach-pose2.jpg", alt: "beach-pose" },
  { src: "/images/beach-sideangle.jpg", alt: "beach-sideangle" },
  { src: "/images/forward-bend.png", alt: "forward-bend" },
  { src: "/images/fullsplit.png", alt: "fullsplit" },
  { src: "/images/headstand.png", alt: "headstand" },
  { src: "/images/homepose.png", alt: "homepose" },
  { src: "/images/headstand2.png", alt: "headstand" },
  { src: "/images/homepose2.png", alt: "homepose" },
  { src: "/images/homepose3.png", alt: "homepose3" },
  
  // Add up to 4 more here as you get them - the spiral automatically
  // rebalances spacing/radius/size for whatever count is in this array.
];

// These scale with spiralImages.length rather than being fixed numbers,
// so the layout stays balanced whether there are 6 images or 10.
const count = spiralImages.length;
const BASE_RADIUS = 130;
const RADIUS_STEP = Math.max(28, 260 / count); // tighter step as count grows, floor so it never collapses
const MAX_RADIUS = BASE_RADIUS + RADIUS_STEP * (count - 1);
const ANGLE_SPREAD = 360 * (1 + count * 0.08); // more images = slightly more wrap, keeps neighbors from overlapping
const VERTICAL_STEP = Math.max(14, 160 / count); // vertical fan tightens as count grows

// Image footprint also scales down modestly as count grows, so 10 images
// don't individually claim as much room as 6 do - this is what keeps it
// from feeling crowded at higher counts while staying larger than before
// at the current 6.
const IMG_W = Math.max(180, 280 - count * 8);
const IMG_H = Math.round(IMG_W * 1.35);

function RotatingSpiral() {
  const angle = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    angle.set(angle.get() + (delta / 1000) * 7);
  });

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ perspective: "1600px" }}
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
            />
          );
        })}
      </div>
    </div>
  );
}

function SpiralItem({ img, offsetAngle, radius, verticalOffset, ringAngle }) {
  const currentAngle = useTransform(ringAngle, (a) => a + offsetAngle);

  const x = useTransform(currentAngle, (a) => radius * Math.sin((a * Math.PI) / 180));
  const z = useTransform(currentAngle, (a) => radius * Math.cos((a * Math.PI) / 180));
  const faceRotateY = useTransform(currentAngle, (a) => -a);

  const opacity = useTransform(z, [-MAX_RADIUS, MAX_RADIUS], [0.3, 1]);
  const scale = useTransform(z, [-MAX_RADIUS, MAX_RADIUS], [0.6, 1]);

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

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#8d9fb4" }}
    >
      <RotatingSpiral />

      <div
        className="absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(141,159,180,0.55) 0%, rgba(141,159,180,0.85) 65%, #8d9fb4 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-breathe z-[6]"
        style={{ backgroundColor: "#f7f5f0", opacity: 0.2 }}
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
          className="font-display text-5xl md:text-7xl font-light leading-tight mb-6"
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
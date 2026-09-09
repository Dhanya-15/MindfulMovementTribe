import { motion } from "framer-motion";
import { HiCheckCircle } from "react-icons/hi";
import { experience } from "../content";

function Column({ title, items, delay, tiltDirection = 1 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: 15 * tiltDirection, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileHover={{
        rotateY: 4 * tiltDirection,
        rotateX: -3,
        y: -8,
        scale: 1.02,
        transition: { duration: 0.4 },
      }}
      animate={{
        y: [0, -6, 0],
      }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative bg-sky/20 rounded-2xl p-8 border border-steel/20 shadow-lg [transform-style:preserve-3d] will-change-transform"
    >
      {/* floating idle animation layered on top of scroll/hover transforms */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.h3
          style={{ transform: "translateZ(30px)" }}
          className="font-display text-3xl text-navy-deep mb-6"
        >
          {title}
        </motion.h3>

        <ul className="space-y-4">
          {items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -15 * tiltDirection }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: delay + i * 0.08 }}
              style={{ transform: "translateZ(15px)" }}
              className="flex items-start gap-3"
            >
              <motion.span
                animate={{
                  rotate: [0, 8, -8, 0],
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
                className="flex-shrink-0 mt-0.5"
              >
                <HiCheckCircle className="text-sand text-xl drop-shadow-sm" />
              </motion.span>
              <span className="font-body text-navy-slate/85">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* subtle glow / depth backdrop that shifts with hover */}
      <div className="absolute -inset-2 bg-sand/10 rounded-2xl -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-cream overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sand uppercase tracking-[0.25em] text-xs mb-4">
            Where She's Taught
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-navy-slate font-light">
            Work Experience
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 [perspective:1600px]">
          <Column
            title="Offline"
            items={experience.offline}
            delay={0}
            tiltDirection={1}
          />
          <Column
            title="Online"
            items={experience.online}
            delay={0.15}
            tiltDirection={-1}
          />
        </div>
      </div>
    </section>
  );
}
import { motion } from "framer-motion";
import { certifications } from "../content";

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

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative py-24" // overflow-hidden removed so the waves can bleed outside this section
      style={{ backgroundColor: "#8d9fb4" }}
    >
      <WaveTop fill="#8d9fb4" />

      {/* Ambient floating 3D orbs for depth in the background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="hidden md:block absolute w-40 h-40 rounded-full blur-2xl"
          style={{ backgroundColor: "#d9c89633", top: "8%", left: "6%" }}
          animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hidden md:block absolute w-56 h-56 rounded-full blur-2xl"
          style={{ backgroundColor: "#00153222", bottom: "10%", right: "8%" }}
          animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative [perspective:1800px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-body uppercase tracking-[0.25em] text-xs mb-4" style={{ color: "#d9c896" }}>
            Training & Certification
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light" style={{ color: "#001532" }}>
            Yoga Alliance Certified
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px overflow-hidden" style={{ backgroundColor: "#132430", opacity: 0.3 }}>
            <motion.div
              className="absolute left-0 w-full h-24"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, #d9c896, transparent)",
              }}
              animate={{ y: ["-10%", "110%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {certifications.map((cert, i) => {
            const fromLeft = i % 2 === 0;
            return (
              <motion.div
                key={cert.title}
                initial={{
                  opacity: 0,
                  y: 40,
                  rotateY: fromLeft ? -55 : 55,
                  z: -150,
                }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0, z: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.15,
                  type: "spring",
                  stiffness: 60,
                  damping: 14,
                }}
                style={{ transformStyle: "preserve-3d" }}
                className={`relative flex md:items-center mb-12 last:mb-0 ${
                  fromLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`md:w-1/2 ${
                    fromLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <motion.div
                    whileHover={{
                      rotateY: fromLeft ? -6 : 6,
                      rotateX: 3,
                      scale: 1.03,
                      transition: { duration: 0.4 },
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      boxShadow:
                        "0 10px 15px -3px rgba(0,21,50,0.15), 0 20px 40px -10px rgba(0,21,50,0.2)",
                    }}
                    className="rounded-xl p-6 border cursor-default"
                  >
                    <div
                      className="rounded-xl p-6 border -m-6"
                      style={{ backgroundColor: "#f5f2ea", borderColor: "#13243033" }}
                    >
                      <p className="font-display text-2xl mb-1" style={{ color: "#001532" }}>
                        {cert.title}
                      </p>
                      <p className="font-body" style={{ color: "#132430" }}>{cert.place}</p>
                      <p className="font-body text-sm mt-2" style={{ color: "#132430", opacity: 0.65 }}>
                        {cert.date}
                      </p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="hidden md:flex w-5 h-5 rounded-full absolute left-1/2 -translate-x-1/2 items-center justify-center"
                  style={{ backgroundColor: "#001532" }}
                  animate={{
                    y: [0, -6, 0],
                    boxShadow: [
                      "0 0 0 4px #8d9fb4, 0 0 0 4px rgba(217,200,150,0)",
                      "0 0 0 4px #8d9fb4, 0 0 12px 6px rgba(217,200,150,0.6)",
                      "0 0 0 4px #8d9fb4, 0 0 0 4px rgba(217,200,150,0)",
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />

                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>

      <WaveBottom fill="#8d9fb4" />
    </section>
  );
}
import { motion } from "framer-motion";
import { bio } from "../content";

export default function About() {
  return (
    <section id="about" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative h-[520px] [perspective:1500px]"
        >
          <motion.div
            className="absolute top-0 left-0 w-[60%] h-[55%] rounded-2xl overflow-hidden shadow-2xl border border-sand/30"
            style={{ transform: "rotateY(8deg) rotateX(2deg)" }}
            whileHover={{ rotateY: 4, scale: 1.03, transition: { duration: 0.4 } }}
          >
            <video src="/videos/solo-session1.mp4" alt="Video1" className="w-full h-full object-cover" autoPlay muted loop playsInline />
          </motion.div>

          <motion.div
            className="absolute bottom-0 right-0 w-[65%] h-[60%] rounded-2xl overflow-hidden shadow-2xl border border-sand/40 z-10"
            style={{ transform: "rotateY(-6deg) rotateX(-2deg)" }}
            whileHover={{ rotateY: -3, scale: 1.03, transition: { duration: 0.4 } }}
          >
            <video src="/videos/group-session1.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline />
          </motion.div>

          <motion.div
            className="absolute top-[18%] left-[20%] w-[55%] h-[50%] rounded-2xl overflow-hidden shadow-2xl border-2 border-cream z-20"
            style={{ transform: "rotateY(2deg)" }}
            whileHover={{ rotateY: 0, scale: 1.05, transition: { duration: 0.4 } }}
          >
            <video src="/videos/wellness.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline />
          </motion.div>

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
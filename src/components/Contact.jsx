import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiPhone,
  HiMail,
  HiOutlineChatAlt2,
} from "react-icons/hi";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import {
  contact,
  genderOptions,
  modeOptions,
  contactModeOptions,
} from "../content";

function Field({ label, required, children }) {
  return (
    <label className="block mb-5">
      <span className="font-body text-sm text-navy-slate/80 mb-1.5 block">
        {label}
        {required && <span className="text-sand ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputClasses =
  "w-full px-4 py-2.5 rounded-lg border border-steel/30 bg-cream font-body text-navy-slate focus:outline-none focus:border-sand focus:ring-1 focus:ring-sand transition-colors";

function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          type="button"
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-1.5 rounded-full text-sm font-body border transition-colors duration-200 ${
            value === opt
              ? "bg-navy-deep text-cream border-navy-deep"
              : "border-steel/30 text-navy-slate/70 hover:border-sand"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

const initialForm = {
  email: "",
  name: "",
  gender: "",
  contactNumber: "",
  preferredMode: "",
  preferredContactMode: "",
  queries: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const update = (key) => (e) =>
    setForm({ ...form, [key]: e.target ? e.target.value : e });

  const handleSubmit = (e) => {
    e.preventDefault();
    // NOTE: This currently only logs the submission locally.
    // Wire this up to your backend endpoint (see the backend features
    // discussed separately) to actually receive these leads by email/WhatsApp.
    console.log("Form submitted:", form);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2"
        >
          <p className="font-body text-sand uppercase tracking-[0.25em] text-xs mb-4">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-navy-slate font-light mb-6">
            Let's begin
            <br />
            your practice
          </h2>
          <p className="font-body text-navy-slate/70 mb-10 leading-relaxed">
            Fill out the form and the team will reach out with everything you
            need — including pricing tailored to what you're looking for.
          </p>

          <div className="space-y-5">
            
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-4 group"
            >
              <div className="w-11 h-11 rounded-full bg-navy-deep flex items-center justify-center flex-shrink-0">
                <HiPhone className="text-sky" />
              </div>
              <span className="font-body text-navy-slate group-hover:text-sand transition-colors">
                {contact.phone}
              </span>
            </a>

            
              <a href={`https://wa.me/${contact.whatsapp.replace(/[\s+]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <div className="w-11 h-11 rounded-full bg-navy-deep flex items-center justify-center flex-shrink-0">
                <FaWhatsapp className="text-sky" />
              </div>
              <span className="font-body text-navy-slate group-hover:text-sand transition-colors">
                {contact.whatsapp}
              </span>
            </a>

            
              <a href={`mailto:${contact.email}`}
              className="flex items-center gap-4 group"
            >
              <div className="w-11 h-11 rounded-full bg-navy-deep flex items-center justify-center flex-shrink-0">
                <HiMail className="text-sky" />
              </div>
              <span className="font-body text-navy-slate group-hover:text-sand transition-colors break-all">
                {contact.email}
              </span>
            </a>

            
            <a href={`https://instagram.com/${contact.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <div className="w-11 h-11 rounded-full bg-navy-deep flex items-center justify-center flex-shrink-0">
                <FaInstagram className="text-sky" />
              </div>
              <span className="font-body text-navy-slate group-hover:text-sand transition-colors">
                @{contact.instagram}
              </span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-3 bg-white/60 border border-steel/20 rounded-3xl p-8"
        >
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <HiOutlineChatAlt2 className="text-5xl text-sand mb-4" />
              <h3 className="font-display text-2xl text-navy-slate mb-2">
                Thank you!
              </h3>
              <p className="font-body text-navy-slate/70">
                Your message has been received. The team will reach out via
                your preferred contact method soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-x-6">
                <Field label="Name" required>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={update("name")}
                    className={inputClasses}
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    className={inputClasses}
                  />
                </Field>
                
              </div>

              <Field label="Gender">
                <RadioGroup
                  options={genderOptions}
                  value={form.gender}
                  onChange={update("gender")}
                />
              </Field>

              <Field label="Contact Number" required>
                <input
                  type="tel"
                  required
                  value={form.contactNumber}
                  onChange={update("contactNumber")}
                  className={inputClasses}
                />
              </Field>

              <Field label="Preferred Mode for Classes">
                <RadioGroup
                  options={modeOptions}
                  value={form.preferredMode}
                  onChange={update("preferredMode")}
                />
              </Field>

              <Field label="Any Other Queries">
                <textarea
                  rows={3}
                  value={form.queries}
                  onChange={update("queries")}
                  className={inputClasses}
                />
              </Field>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-full bg-navy-deep text-cream font-body font-medium hover:bg-sand hover:text-navy-deep transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
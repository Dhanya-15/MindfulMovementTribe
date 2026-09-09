export default function Footer() {
  return (
    <footer className="bg-navy-deep py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <img
          src="/images/logo1.png"
          alt="Mindful Movement Tribe"
          className="h-16 w-auto opacity-80 brightness-0 invert"
        />
        <p className="font-body text-xs text-steel/60 text-center">
          © {new Date().getFullYear()} Mindful Movement Tribe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
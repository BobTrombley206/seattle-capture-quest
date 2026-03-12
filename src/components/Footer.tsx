const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-meta text-xs">
      <span>© {new Date().getFullYear()} PNW Portraits. All rights reserved.</span>
      <div className="flex gap-6">
        <a href="#packages" className="hover:text-foreground transition-colors">Packages</a>
        <a href="#gallery" className="hover:text-foreground transition-colors">Gallery</a>
        <a href="#about" className="hover:text-foreground transition-colors">About</a>
      </div>
    </div>
  </footer>
);

export default Footer;

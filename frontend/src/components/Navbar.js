import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X, ShoppingBag, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_vegetal-dining/artifacts/o8f7tlpb_WhatsApp%20Image%202026-02-09%20at%2018.03.35.jpeg';

const languages = [
  { code: 'fr', label: 'Francais', flag: 'FR' },
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'nl', label: 'Nederlands', flag: 'NL' },
];

export default function Navbar({ cartCount = 0 }) {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/menu', label: t('nav.menu') },
    { to: '/order', label: t('nav.order') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0F120D]/90 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
          <img
            src={LOGO_URL}
            alt="Filo d'Olio"
            className="h-10 md:h-12 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-testid={`nav-${link.to.replace('/', '') || 'home'}`}
              className={`font-body text-sm uppercase tracking-[0.2em] transition-colors duration-300 ${
                isActive(link.to)
                  ? 'text-olive-400'
                  : 'text-cream/70 hover:text-cream'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger
              data-testid="language-switcher"
              className="flex items-center gap-1.5 text-cream/70 hover:text-cream transition-colors text-sm uppercase tracking-wider"
            >
              <Globe className="w-4 h-4" />
              {lang.toUpperCase()}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1C2117] border-[#2E3626]">
              {languages.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  data-testid={`lang-${l.code}`}
                  onClick={() => setLang(l.code)}
                  className={`cursor-pointer text-cream/80 hover:text-cream hover:bg-olive-800 ${
                    lang === l.code ? 'text-olive-400 bg-olive-900' : ''
                  }`}
                >
                  <span className="font-medium mr-2">{l.flag}</span>
                  {l.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <Link
            to="/order"
            data-testid="nav-cart"
            className="relative text-cream/70 hover:text-cream transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="cart-badge absolute -top-2 -right-2 bg-terra text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/order" className="relative text-cream/70" data-testid="mobile-cart">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="cart-badge absolute -top-2 -right-2 bg-terra text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-cream"
            data-testid="mobile-menu-toggle"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          data-testid="mobile-menu"
          className="md:hidden absolute top-full left-0 w-full bg-[#0F120D]/95 backdrop-blur-md border-t border-[#2E3626] animate-fade-in"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-body text-lg tracking-wide ${
                  isActive(link.to) ? 'text-olive-400' : 'text-cream/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-3 border-t border-[#2E3626]">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  data-testid={`mobile-lang-${l.code}`}
                  className={`px-3 py-1.5 text-sm rounded-sm border transition-colors ${
                    lang === l.code
                      ? 'bg-olive-600 border-olive-600 text-cream'
                      : 'border-[#2E3626] text-cream/60 hover:border-olive-600'
                  }`}
                >
                  {l.flag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

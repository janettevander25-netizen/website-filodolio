import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { menuItems } from '../data/menuData';
import MenuItem from '../components/MenuItem';
import { Flame, Pizza, ShieldCheck, MapPin, Phone, Mail, Clock, ChevronRight, Leaf } from 'lucide-react';

const HERO_BG = 'https://images.unsplash.com/photo-1503767849114-976b67568b02?crop=entropy&cs=srgb&fm=jpg&q=85';

export default function HomePage() {
  const { t } = useLanguage();
  const previewItems = menuItems.filter(i => i.category === 'special').slice(0, 6);

  return (
    <div data-testid="home-page">
      {/* ─── HERO ─────────────────────────────── */}
      <section
        data-testid="hero-section"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-[#0F120D]/75" />
        {/* Subtle grain */}
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl px-6">
          <p className="font-body text-olive-400 uppercase tracking-[0.3em] text-sm mb-4 opacity-0 animate-fade-in-up stagger-1">
            {t('hero.welcome')}
          </p>
          <h1 className="font-accent text-6xl sm:text-7xl lg:text-8xl text-cream mb-4 opacity-0 animate-fade-in-up stagger-2">
            Filo d'Olio
          </h1>
          <p className="font-heading text-lg sm:text-xl text-cream/60 tracking-wide mb-2 opacity-0 animate-fade-in-up stagger-3">
            Pizzeria Artisanale
          </p>
          <p className="font-body text-cream/50 text-base max-w-xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-up stagger-4">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up stagger-5">
            <Link
              to="/menu"
              data-testid="hero-cta-menu"
              className="bg-olive-600 text-cream px-8 py-3 uppercase tracking-[0.2em] text-sm font-body font-semibold rounded-sm hover:bg-olive-500 transition-all duration-300 shadow-[0_4px_14px_0_rgba(85,107,47,0.39)]"
            >
              {t('hero.cta_menu')}
            </Link>
            <Link
              to="/order"
              data-testid="hero-cta-order"
              className="border border-olive-600 text-olive-400 px-8 py-3 uppercase tracking-[0.2em] text-sm font-body rounded-sm hover:bg-olive-600 hover:text-cream transition-all duration-300"
            >
              {t('hero.cta_order')}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in stagger-6">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-olive-500/50 to-transparent" />
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────── */}
      <section className="py-20 bg-[#0F120D] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div data-testid="feature-wood" className="bg-transparent border border-[#2E3626] p-8 flex flex-col items-center text-center gap-3 hover:bg-surface transition-colors rounded-sm">
              <Flame className="w-8 h-8 text-terra" />
              <h3 className="font-heading text-lg text-cream">{t('features.wood_fire')}</h3>
              <p className="text-cream/50 text-sm font-body">{t('features.wood_fire_desc')}</p>
            </div>
            <div data-testid="feature-pizzas" className="bg-transparent border border-[#2E3626] p-8 flex flex-col items-center text-center gap-3 hover:bg-surface transition-colors rounded-sm">
              <Pizza className="w-8 h-8 text-olive-400" />
              <h3 className="font-heading text-lg text-cream">50+</h3>
              <p className="text-cream/50 text-sm font-body">{t('features.pizzas')}</p>
            </div>
            <div data-testid="feature-halal" className="bg-transparent border border-[#2E3626] p-8 flex flex-col items-center text-center gap-3 hover:bg-surface transition-colors rounded-sm">
              <ShieldCheck className="w-8 h-8 text-gold" />
              <h3 className="font-heading text-lg text-cream">{t('features.halal')}</h3>
              <p className="text-cream/50 text-sm font-body">{t('features.halal_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MENU PREVIEW ─────────────────────── */}
      <section className="py-24 bg-[#0F120D] relative" data-testid="menu-preview">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <Leaf className="w-6 h-6 text-olive-500 mx-auto mb-3" />
            <h2 className="font-heading text-4xl sm:text-5xl text-cream mb-3">{t('menu.title')}</h2>
            <p className="text-cream/50 font-body text-base md:text-lg">{t('menu.subtitle')}</p>
            <div className="inline-block mt-3 bg-olive-900/50 px-4 py-1 rounded-sm">
              <span className="text-olive-400 text-xs uppercase tracking-[0.2em] font-body">{t('menu.halal_badge')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {previewItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/menu"
              data-testid="view-all-menu"
              className="inline-flex items-center gap-2 border border-olive-600 text-olive-400 px-8 py-3 uppercase tracking-[0.2em] text-sm font-body rounded-sm hover:bg-olive-600 hover:text-cream transition-all duration-300"
            >
              {t('menu.view_all')}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CONTACT PREVIEW ──────────────────── */}
      <section className="py-24 bg-surface relative" data-testid="contact-preview">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl text-cream mb-6">{t('contact.title')}</h2>
              <p className="text-cream/50 font-body mb-8">{t('contact.subtitle')}</p>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-olive-500 mt-0.5 flex-shrink-0" />
                  <div className="text-cream/70 font-body text-sm">
                    <p>{t('contact.address')}</p>
                    <p>{t('contact.city')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-olive-500 flex-shrink-0" />
                  <a href="tel:+3223777892" className="text-cream/70 font-body text-sm hover:text-olive-400 transition-colors">
                    {t('contact.phone')}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-olive-500 flex-shrink-0" />
                  <a href="mailto:filodolio23@gmail.com" className="text-cream/70 font-body text-sm hover:text-olive-400 transition-colors">
                    {t('contact.email')}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#0F120D] border border-[#2E3626] p-8 rounded-sm">
              <h3 className="font-heading text-xl text-cream mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-olive-500" />
                {t('contact.hours_label')}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[#2E3626] pb-3">
                  <span className="text-cream/60 font-body text-sm">{t('contact.hours.mon_thu')}</span>
                  <span className="text-cream font-body text-sm">{t('contact.hours.mon_thu_time')}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#2E3626] pb-3">
                  <span className="text-cream/60 font-body text-sm">{t('contact.hours.fri')}</span>
                  <span className="text-cream font-body text-sm">{t('contact.hours.fri_time')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cream/60 font-body text-sm">{t('contact.hours.sat_sun')}</span>
                  <span className="text-cream font-body text-sm">{t('contact.hours.sat_sun_time')}</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#2E3626]">
                <Link
                  to="/contact"
                  data-testid="contact-cta"
                  className="block w-full text-center bg-olive-600 text-cream py-3 uppercase tracking-[0.15em] text-sm font-body rounded-sm hover:bg-olive-500 transition-colors"
                >
                  {t('nav.contact')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

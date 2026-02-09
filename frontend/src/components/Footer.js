import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Phone, Mail, Clock, Flame } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer data-testid="footer" className="bg-[#0A0D08] border-t border-[#2E3626]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-accent text-3xl text-cream mb-2">Filo d'Olio</h3>
            <p className="text-cream/40 font-body text-sm mb-4">Pizzeria Artisanale</p>
            <div className="flex items-center gap-2 text-olive-400 text-sm">
              <Flame className="w-4 h-4" />
              <span>{t('footer.wood_fire')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg text-cream mb-4">Navigation</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-cream/50 hover:text-olive-400 transition-colors text-sm font-body">{t('nav.home')}</Link>
              <Link to="/menu" className="text-cream/50 hover:text-olive-400 transition-colors text-sm font-body">{t('nav.menu')}</Link>
              <Link to="/order" className="text-cream/50 hover:text-olive-400 transition-colors text-sm font-body">{t('nav.order')}</Link>
              <Link to="/contact" className="text-cream/50 hover:text-olive-400 transition-colors text-sm font-body">{t('nav.contact')}</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg text-cream mb-4">{t('contact.title')}</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 text-cream/50 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-olive-500 flex-shrink-0" />
                <div>
                  <p>{t('contact.address')}</p>
                  <p>{t('contact.city')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-cream/50 text-sm">
                <Phone className="w-4 h-4 text-olive-500 flex-shrink-0" />
                <a href="tel:+32237789200" className="hover:text-olive-400 transition-colors">{t('contact.phone')}</a>
              </div>
              <div className="flex items-center gap-2 text-cream/50 text-sm">
                <Mail className="w-4 h-4 text-olive-500 flex-shrink-0" />
                <a href="mailto:filodolio23@gmail.com" className="hover:text-olive-400 transition-colors">{t('contact.email')}</a>
              </div>
              <div className="flex items-start gap-2 text-cream/50 text-sm">
                <Clock className="w-4 h-4 mt-0.5 text-olive-500 flex-shrink-0" />
                <div>
                  <p>{t('contact.hours.mon_thu')}: {t('contact.hours.mon_thu_time')}</p>
                  <p>{t('contact.hours.fri')}: {t('contact.hours.fri_time')}</p>
                  <p>{t('contact.hours.sat_sun')}: {t('contact.hours.sat_sun_time')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#2E3626] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/30 text-xs font-body">
            &copy; {new Date().getFullYear()} Filo d'Olio. {t('footer.rights')}.
          </p>
          <p className="text-cream/30 text-xs font-body">
            {t('contact.takeaway')}
          </p>
        </div>
      </div>
    </footer>
  );
}

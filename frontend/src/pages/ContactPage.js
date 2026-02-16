import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Leaf } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      setSent(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error('Contact error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page" className="min-h-screen pt-24 pb-20 bg-[#0F120D]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <Leaf className="w-6 h-6 text-olive-500 mx-auto mb-3" />
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-cream mb-3">
            {t('contact.title')}
          </h1>
          <p className="text-cream/50 font-body text-base md:text-lg">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Address */}
            <div data-testid="contact-address" className="bg-surface border border-white/5 p-6 rounded-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-olive-900/50 rounded-sm flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-olive-400" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-cream mb-1">{t('contact.address_label')}</h3>
                  <p className="text-cream/60 font-body text-sm">{t('contact.address')}</p>
                  <p className="text-cream/60 font-body text-sm">{t('contact.city')}</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div data-testid="contact-phone" className="bg-surface border border-white/5 p-6 rounded-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-olive-900/50 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-olive-400" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-cream mb-1">{t('contact.phone_label')}</h3>
                  <a href="tel:+3223777892" className="text-cream/60 font-body text-sm hover:text-olive-400 transition-colors">
                    {t('contact.phone')}
                  </a>
                  <p className="text-cream/40 font-body text-xs mt-1">{t('contact.phone_desc')}</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div data-testid="contact-email" className="bg-surface border border-white/5 p-6 rounded-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-olive-900/50 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-olive-400" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-cream mb-1">{t('contact.email_label')}</h3>
                  <a href="mailto:filodolio23@gmail.com" className="text-cream/60 font-body text-sm hover:text-olive-400 transition-colors">
                    {t('contact.email')}
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div data-testid="contact-hours" className="bg-surface border border-white/5 p-6 rounded-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-olive-900/50 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-olive-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg text-cream mb-3">{t('contact.hours_label')}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between border-b border-[#2E3626] pb-2">
                      <span className="text-cream/50 font-body text-sm">{t('contact.hours.mon_thu')}</span>
                      <span className="text-cream/80 font-body text-sm">{t('contact.hours.mon_thu_time')}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#2E3626] pb-2">
                      <span className="text-cream/50 font-body text-sm">{t('contact.hours.fri')}</span>
                      <span className="text-cream/80 font-body text-sm">{t('contact.hours.fri_time')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream/50 font-body text-sm">{t('contact.hours.sat_sun')}</span>
                      <span className="text-cream/80 font-body text-sm">{t('contact.hours.sat_sun_time')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface border border-white/5 p-8 rounded-sm h-fit">
            <h2 className="font-heading text-2xl text-cream mb-6">{t('contact.form.title')}</h2>

            {sent && (
              <div data-testid="contact-success" className="flex items-center gap-2 bg-olive-900/50 border border-olive-600/30 px-4 py-3 rounded-sm mb-6">
                <CheckCircle className="w-4 h-4 text-olive-400" />
                <span className="text-olive-400 text-sm font-body">{t('contact.form.success')}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  data-testid="contact-form-name"
                  placeholder={t('contact.form.name')}
                  value={form.name}
                  onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                  required
                  className="bg-[#0F120D] border-[#2E3626] text-cream placeholder:text-cream/30 focus:border-olive-600"
                />
              </div>
              <div>
                <Input
                  data-testid="contact-form-email"
                  type="email"
                  placeholder={t('contact.form.email')}
                  value={form.email}
                  onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                  required
                  className="bg-[#0F120D] border-[#2E3626] text-cream placeholder:text-cream/30 focus:border-olive-600"
                />
              </div>
              <div>
                <Input
                  data-testid="contact-form-phone"
                  placeholder={t('contact.form.phone')}
                  value={form.phone}
                  onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                  className="bg-[#0F120D] border-[#2E3626] text-cream placeholder:text-cream/30 focus:border-olive-600"
                />
              </div>
              <div>
                <Textarea
                  data-testid="contact-form-message"
                  placeholder={t('contact.form.message')}
                  value={form.message}
                  onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                  required
                  className="bg-[#0F120D] border-[#2E3626] text-cream placeholder:text-cream/30 focus:border-olive-600 min-h-[120px]"
                />
              </div>
              <Button
                type="submit"
                data-testid="contact-form-submit"
                disabled={loading}
                className="w-full bg-olive-600 hover:bg-olive-500 text-cream uppercase tracking-[0.15em] text-sm py-3 rounded-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? '...' : t('contact.form.send')}
              </Button>
            </form>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-16 text-center">
          <p className="text-cream/30 font-body text-sm">{t('contact.tagline')}</p>
          <p className="text-cream/20 font-body text-xs mt-1">{t('contact.takeaway')}</p>
        </div>
      </div>
    </div>
  );
}

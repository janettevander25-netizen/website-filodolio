import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { menuItems, menuCategories } from '../data/menuData';
import MenuItem from '../components/MenuItem';
import { Leaf } from 'lucide-react';

export default function MenuPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('traditional');

  const filtered = menuItems.filter(i => i.category === activeCategory);

  return (
    <div data-testid="menu-page" className="min-h-screen pt-24 pb-20 bg-[#0F120D]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-10">
          <Leaf className="w-6 h-6 text-olive-500 mx-auto mb-3" />
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-cream mb-3">
            {t('menu.title')}
          </h1>
          <p className="text-cream/50 font-body text-base md:text-lg">
            {t('menu.subtitle')}
          </p>
          <div className="inline-block mt-3 bg-olive-900/50 px-4 py-1 rounded-sm">
            <span className="text-olive-400 text-xs uppercase tracking-[0.2em] font-body">
              {t('menu.halal_badge')}
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div
          data-testid="menu-categories"
          className="flex overflow-x-auto gap-3 pb-4 mb-8 md:justify-center md:flex-wrap sticky top-16 z-40 bg-[#0F120D]/95 py-4 backdrop-blur-sm hide-scrollbar"
        >
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              data-testid={`cat-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-5 py-2 text-sm font-body uppercase tracking-[0.1em] rounded-sm border transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-olive-600 border-olive-600 text-cream'
                  : 'border-[#2E3626] text-cream/50 hover:border-olive-600/50 hover:text-cream/80'
              }`}
            >
              {t(`menu.categories.${cat.key}`)}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <MenuItem item={item} />
            </div>
          ))}
        </div>

        {/* Supplements */}
        <div className="mt-12 text-center">
          <p className="text-cream/40 font-body text-sm italic">
            {t('menu.supplement')}
          </p>
        </div>
      </div>
    </div>
  );
}

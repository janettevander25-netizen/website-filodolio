import { useLanguage } from '../contexts/LanguageContext';
import { Pizza } from 'lucide-react';

export default function MenuItem({ item, onAdd, showAddButton = false }) {
  const { t } = useLanguage();
  const hasSizes = item.prices.length > 1;

  return (
    <div
      data-testid={`menu-item-${item.id}`}
      className="menu-card group relative bg-surface border border-white/5 overflow-hidden rounded-sm"
    >
      {/* Photo Placeholder */}
      <div className="relative h-44 bg-olive-900/40 flex items-center justify-center overflow-hidden">
        <div className="photo-placeholder absolute inset-0" />
        <div className="relative z-10 flex flex-col items-center gap-2 text-olive-500/60">
          <Pizza className="w-10 h-10" strokeWidth={1.2} />
          <span className="text-[10px] uppercase tracking-[0.2em] font-body">
            {t('menu.photo_placeholder')}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-olive-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading text-lg text-cream font-medium group-hover:text-olive-400 transition-colors">
            {item.name}
          </h3>
          {!hasSizes && (
            <span className="text-gold font-heading text-lg font-semibold whitespace-nowrap">
              {item.prices[0]}&euro;
            </span>
          )}
        </div>

        <p className="text-cream/50 text-sm font-body leading-relaxed mb-3 line-clamp-2">
          {item.description}
        </p>

        {hasSizes && (
          <div className="flex items-center gap-3 mb-3">
            {item.prices.map((price, i) => {
              if (price === null) return null;
              const sizeLabels = [t('menu.sizes.small'), t('menu.sizes.medium'), t('menu.sizes.large')];
              return (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-cream/40 text-[10px] uppercase tracking-wider font-body">{sizeLabels[i]}</span>
                  <span className="text-gold font-heading text-sm font-semibold">{price}&euro;</span>
                </div>
              );
            })}
          </div>
        )}

        {showAddButton && (
          <button
            data-testid={`add-${item.id}`}
            onClick={() => onAdd && onAdd(item)}
            className="w-full mt-1 bg-olive-600 text-cream text-sm uppercase tracking-[0.15em] py-2.5 rounded-sm hover:bg-olive-500 transition-colors duration-300 font-body font-medium"
          >
            {t('order.add')}
          </button>
        )}
      </div>
    </div>
  );
}

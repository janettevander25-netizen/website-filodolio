import { useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { menuItems, menuCategories } from '../data/menuData';
import MenuItem from '../components/MenuItem';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { ShoppingBag, Plus, Minus, Trash2, CheckCircle, Leaf, X } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function OrderPage({ cart, setCart }) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('traditional');
  const [orderType, setOrderType] = useState('pickup');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', address: '', notes: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [sizeDialog, setSizeDialog] = useState(null);

  const filtered = menuItems.filter(i => i.category === activeCategory);

  const addToCart = useCallback((item, sizeIndex, price) => {
    const sizeLabels = ['small', 'medium', 'large'];
    const sizeName = item.prices.length > 1 ? sizeLabels[sizeIndex] : 'unique';
    const cartKey = `${item.id}-${sizeName}`;

    setCart(prev => {
      const existing = prev.find(c => c.key === cartKey);
      if (existing) {
        return prev.map(c => c.key === cartKey ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { key: cartKey, id: item.id, name: item.name, size: sizeName, price, quantity: 1 }];
    });
    setSizeDialog(null);
  }, [setCart]);

  const handleAddClick = useCallback((item) => {
    if (item.prices.length === 1) {
      addToCart(item, 0, item.prices[0]);
    } else {
      setSizeDialog(item);
    }
  }, [addToCart]);

  const updateQuantity = (key, delta) => {
    setCart(prev =>
      prev.map(c => c.key === key ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c).filter(c => c.quantity > 0)
    );
  };

  const total = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0 || !formData.name || !formData.phone) return;
    setLoading(true);
    try {
      const payload = {
        items: cart.map(c => ({ name: c.name, size: c.size, price: c.price, quantity: c.quantity })),
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email || null,
        order_type: orderType,
        delivery_address: orderType === 'delivery' ? formData.address : null,
        notes: formData.notes || null,
      };
      const res = await axios.post(`${API}/orders`, payload);
      setOrderId(res.data.id);
      setShowSuccess(true);
      setCart([]);
      setFormData({ name: '', phone: '', email: '', address: '', notes: '' });
    } catch (err) {
      console.error('Order error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="order-page" className="min-h-screen pt-24 pb-20 bg-[#0F120D]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-10">
          <Leaf className="w-6 h-6 text-olive-500 mx-auto mb-3" />
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">
            {t('order.title')}
          </h1>
          <p className="text-cream/50 font-body text-base md:text-lg">
            {t('order.subtitle')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-3 pb-4 mb-8 md:justify-center md:flex-wrap sticky top-16 z-40 bg-[#0F120D]/95 py-4 backdrop-blur-sm hide-scrollbar">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              data-testid={`order-cat-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-5 py-2 text-sm font-body uppercase tracking-[0.1em] rounded-sm border transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-olive-600 border-olive-600 text-cream'
                  : 'border-[#2E3626] text-cream/50 hover:border-olive-600/50'
              }`}
            >
              {t(`menu.categories.${cat.key}`)}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <MenuItem key={item.id} item={item} showAddButton onAdd={handleAddClick} />
          ))}
        </div>
      </div>

      {/* Size Selection Dialog */}
      <Dialog open={!!sizeDialog} onOpenChange={() => setSizeDialog(null)}>
        <DialogContent className="bg-surface border-[#2E3626] text-cream max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">{sizeDialog?.name}</DialogTitle>
          </DialogHeader>
          <p className="text-cream/50 text-sm font-body mb-4">{t('order.select_size')}</p>
          <div className="space-y-2">
            {sizeDialog?.prices.map((price, i) => {
              if (price === null) return null;
              const sizeLabels = [t('menu.sizes.small'), t('menu.sizes.medium'), t('menu.sizes.large')];
              return (
                <button
                  key={i}
                  data-testid={`size-${i}`}
                  onClick={() => addToCart(sizeDialog, i, price)}
                  className="w-full flex justify-between items-center px-4 py-3 border border-[#2E3626] rounded-sm hover:bg-olive-900/50 hover:border-olive-600/50 transition-all"
                >
                  <span className="font-body text-cream">{sizeLabels[i]}</span>
                  <span className="font-heading text-gold font-semibold">{price}&euro;</span>
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Cart Button */}
      <Sheet>
        <SheetTrigger asChild>
          <button
            data-testid="cart-trigger"
            className="fixed bottom-8 right-8 bg-terra text-cream p-4 rounded-full shadow-2xl hover:scale-105 transition-transform z-50 flex items-center gap-2"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="bg-cream text-terra text-sm font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </SheetTrigger>
        <SheetContent className="bg-[#0F120D] border-l border-[#2E3626] text-cream w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-heading text-2xl text-cream flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-olive-500" />
              {t('order.cart')}
            </SheetTitle>
          </SheetHeader>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-cream/40">
              <ShoppingBag className="w-12 h-12 mb-4" strokeWidth={1} />
              <p className="font-body">{t('order.empty_cart')}</p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {cart.map((item) => (
                <div key={item.key} className="flex items-center gap-3 bg-surface p-3 rounded-sm border border-white/5">
                  <div className="flex-1">
                    <p className="font-body text-sm text-cream">{item.name}</p>
                    <p className="text-cream/40 text-xs font-body capitalize">{item.size} - {item.price}&euro;</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      data-testid={`cart-minus-${item.key}`}
                      onClick={() => updateQuantity(item.key, -1)}
                      className="w-7 h-7 flex items-center justify-center border border-[#2E3626] rounded-sm text-cream/60 hover:text-cream hover:border-olive-600 transition-colors"
                    >
                      {item.quantity === 1 ? <Trash2 className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                    </button>
                    <span className="text-cream font-body text-sm w-6 text-center">{item.quantity}</span>
                    <button
                      data-testid={`cart-plus-${item.key}`}
                      onClick={() => updateQuantity(item.key, 1)}
                      className="w-7 h-7 flex items-center justify-center border border-[#2E3626] rounded-sm text-cream/60 hover:text-cream hover:border-olive-600 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="border-t border-[#2E3626] pt-4 flex justify-between items-center">
                <span className="font-heading text-lg text-cream">{t('order.total')}</span>
                <span className="font-heading text-2xl text-gold font-semibold">{total.toFixed(2)}&euro;</span>
              </div>

              {/* Order Form */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-4 border-t border-[#2E3626]">
                <Input
                  data-testid="order-name"
                  placeholder={t('order.name')}
                  value={formData.name}
                  onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                  required
                  className="bg-[#0F120D] border-[#2E3626] text-cream placeholder:text-cream/30 focus:border-olive-600"
                />
                <Input
                  data-testid="order-phone"
                  placeholder={t('order.phone')}
                  value={formData.phone}
                  onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                  required
                  className="bg-[#0F120D] border-[#2E3626] text-cream placeholder:text-cream/30 focus:border-olive-600"
                />
                <Input
                  data-testid="order-email"
                  placeholder={t('order.email')}
                  value={formData.email}
                  onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                  className="bg-[#0F120D] border-[#2E3626] text-cream placeholder:text-cream/30 focus:border-olive-600"
                />

                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger data-testid="order-type" className="bg-[#0F120D] border-[#2E3626] text-cream">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-surface border-[#2E3626]">
                    <SelectItem value="pickup" className="text-cream hover:bg-olive-900">{t('order.pickup')}</SelectItem>
                    <SelectItem value="delivery" className="text-cream hover:bg-olive-900">{t('order.delivery')}</SelectItem>
                  </SelectContent>
                </Select>

                {orderType === 'delivery' && (
                  <Input
                    data-testid="order-address"
                    placeholder={t('order.address')}
                    value={formData.address}
                    onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))}
                    className="bg-[#0F120D] border-[#2E3626] text-cream placeholder:text-cream/30 focus:border-olive-600"
                  />
                )}

                <Textarea
                  data-testid="order-notes"
                  placeholder={t('order.notes')}
                  value={formData.notes}
                  onChange={(e) => setFormData(p => ({ ...p, notes: e.target.value }))}
                  className="bg-[#0F120D] border-[#2E3626] text-cream placeholder:text-cream/30 focus:border-olive-600 min-h-[60px]"
                />

                <Button
                  type="submit"
                  data-testid="submit-order"
                  disabled={loading || cart.length === 0}
                  className="w-full bg-olive-600 hover:bg-olive-500 text-cream uppercase tracking-[0.15em] text-sm py-3 rounded-sm"
                >
                  {loading ? '...' : t('order.checkout')}
                </Button>
              </form>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-surface border-[#2E3626] text-cream max-w-sm text-center">
          <div className="flex flex-col items-center py-6">
            <CheckCircle className="w-16 h-16 text-olive-400 mb-4" />
            <h3 className="font-heading text-2xl text-cream mb-2">{t('order.success')}</h3>
            <p className="text-cream/50 font-body text-sm mb-4">{t('order.success_desc')}</p>
            {orderId && (
              <div className="bg-[#0F120D] px-4 py-2 rounded-sm border border-[#2E3626]">
                <span className="text-cream/40 text-xs font-body">{t('order.order_number')}: </span>
                <span className="text-olive-400 text-xs font-body font-medium">{orderId.slice(0, 8).toUpperCase()}</span>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

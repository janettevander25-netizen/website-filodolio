# Filo d'Olio - Pizzeria Artisanale Website

## Problem Statement
Build a professional pizzeria website for "Filo d'Olio" in Laeken, Belgium. Inspired by their existing Bolt site, with olive green/Mediterranean vegetal theme, immersive design, photo placeholders for each menu item, online ordering, multi-language support (FR/EN/NL).

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI
- **Backend**: FastAPI + MongoDB (Motor async driver)
- **Theme**: Dark olive green (#0F120D bg, #556B2F primary, #C65D3B secondary)
- **Fonts**: Playfair Display (headings), DM Sans (body), Great Vibes (accent)

## User Personas
1. Local customers in Brussels/Laeken seeking pizza
2. French-speaking, Dutch-speaking, English-speaking visitors
3. Halal food seekers
4. Online food ordering customers

## Core Requirements
- [x] Full menu showcase with 60+ items across 5 categories
- [x] Photo placeholder with pizza icon for each menu item
- [x] Online ordering with cart, size selection, checkout form
- [x] Contact page with address, phone, email, hours, message form
- [x] Multi-language (FR/EN/NL) with context-based switcher
- [x] Professional dark olive Mediterranean design
- [x] Logo integration (user-provided)
- [x] Responsive design (mobile + desktop)

## What's Been Implemented (Feb 9, 2026)
- Full 4-page website: Home, Menu, Order, Contact
- Hero section with parallax background, animated text
- Feature cards (Wood Fire, 50+ Pizzas, 100% Halal)
- Menu page with 5 category tabs and 60+ items
- Order page with add-to-cart, size selection dialog, cart sheet, checkout form
- Contact page with info cards + message form
- Language switcher (FR/EN/NL) in navbar dropdown
- Footer with brand, navigation, contact info
- Backend APIs: POST /api/orders, POST /api/contact, GET /api/orders

## Prioritized Backlog
### P0 (Done)
- Site vitrine complet
- Commande en ligne fonctionnelle
- Multi-langue FR/EN/NL

### P1 (Next)
- Google Maps embed on contact page
- Order confirmation email/SMS
- Admin dashboard for managing orders

### P2 (Future)
- Real pizza photos (replace placeholders)
- Loyalty program / rewards system
- Integration Stripe/payment gateway
- SEO optimization
- Social media links

## Updates (Feb 17, 2026)
- Updated ALL menu prices from new documents (PDF + image)
- Added 8 new pizzas: Jambon Champignon, Boscaiola, Scampi, Regina, Vegan, Saporita, Spaccanapoli, Genovese
- Added new dessert: Panna Cotta
- New category: "Speciales Sans Sauce Tomate"
- Updated supplements: 1.50€, XL 2.50€, Mozza/Scampi/Charcuterie 3€, Burrata 5€
- Updated phone: 02 377 78 92
- Updated drinks: 2.5€ with more options
- Panuozzi prices reduced to 8-10€
- Smart image system: auto-loads photos from /public/images/pizzas/{id}.jpg, falls back to placeholder
- Created LIRE-MOI-PHOTOS.md guide for adding pizza photos

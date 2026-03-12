# Welcome Dry Fruit House — Website Management Guide

> **For non-technical users**: This guide explains how to update prices, images, products, and content on your website. Follow the steps carefully — no coding knowledge needed!

---

## 📁 Project Structure (Important Files & Folders)

```
📂 public/
  📂 images/
    📄 logo.png                          ← Your brand logo
    📂 products/                         ← All product images go here
      📄 california-almonds.jpg
      📄 mamra-almonds.jpg
      📄 gurbandi-almonds.jpg
      📄 w240-cashews.jpg
      📄 roasted-cashews.jpg
      📄 iranian-pistachios.jpg
      📄 salted-pistachios.jpg
      📄 chile-walnuts.jpg
      📄 kashmiri-walnuts.jpg
      📄 medjool-dates.jpg
      📄 ajwa-dates.jpg
      📄 green-kishmish.jpg
      📄 black-raisins.jpg
      📄 mixed-dry-fruits.jpg
      📄 trail-mix.jpg
      📄 royal-gift-hamper.jpg
      📄 festive-hamper.jpg
      📄 corporate-elite-hamper.jpg
    📂 hampers/                          ← Gift hamper display images
      📄 royal-collection-hamper.jpg
      📄 festive-celebration-hamper.jpg
      📄 corporate-elite-hamper.jpg
    📄 owner-profile.jpg                 ← Founder photo (for About section)
    📄 owner-profile-2.jpg               ← Alternative founder photo
    📄 owner-profile-3.jpg               ← Splash screen photo

📂 src/
  📂 data/
    📄 products.json                     ← ⭐ ALL PRODUCTS & PRICES (Main file to edit!)
  📂 components/
    📂 sections/
      📄 ContactSection.tsx              ← Enquiry form (3-step)
      📄 ProductSelector.tsx             ← Product picker dropdown
      📄 ProductsSection.tsx             ← Products display on homepage
      📄 HeroSection.tsx                 ← Top banner/hero area
      📄 GiftHampersSection.tsx          ← Gift hampers showcase
      📄 OwnerStorySection.tsx           ← Founder story section
      📄 TestimonialsSection.tsx         ← Customer reviews
      📄 ContactSection.tsx              ← Contact/enquiry form
    📂 layout/
      📄 Navbar.tsx                      ← Top navigation bar
      📄 Footer.tsx                      ← Bottom footer
    📄 SplashScreen.tsx                  ← Loading screen animation
```

---

## 💰 How to Change Product Prices

### File to edit: `src/data/products.json`

This is the **ONLY file** you need to edit to change prices. All prices on the website update automatically from this file.

### Step-by-step:

1. Open the file `src/data/products.json`
2. Find the product you want to change. Each product looks like this:

```json
{
  "id": "premium-almonds",
  "name": "Premium California Almonds",
  "category": "almonds",
  "price": "₹900/kg",              ← CHANGE THIS for new price
  "description": "Handpicked, crunchy California almonds rich in vitamin E",
  "image": "california-almonds.jpg",
  "featured": true
}
```

3. Change the `"price"` value to the new price
4. Save the file

### Example: Change almonds price from ₹900 to ₹950

**Before:**
```json
"price": "₹900/kg",
```

**After:**
```json
"price": "₹950/kg",
```

### Current Products & Their Line Numbers in products.json:

| Line | Product | Current Price |
|------|---------|---------------|
| 13 | Premium California Almonds | ₹900/kg |
| 14 | Mamra Almonds | ₹1,800/kg |
| 15 | Gurbandi Almonds | ₹1,200/kg |
| 16 | Premium W240 Cashews | ₹1,100/kg |
| 17 | Roasted & Salted Cashews | ₹1,200/kg |
| 18 | Iranian Pistachios | ₹1,400/kg |
| 19 | Roasted Salted Pistachios | ₹1,500/kg |
| 20 | Chile Walnuts | ₹1,000/kg |
| 21 | Kashmiri Walnuts | ₹800/kg |
| 22 | Medjool Dates | ₹1,600/kg |
| 23 | Ajwa Dates | ₹2,200/kg |
| 24 | Green Kishmish | ₹400/kg |
| 25 | Black Raisins | ₹450/kg |
| 26 | Premium Mixed Dry Fruits | ₹950/kg |
| 27 | Healthy Trail Mix | ₹750/kg |
| 28 | Royal Gift Hamper | ₹2,500 |
| 29 | Festive Celebration Box | ₹1,800 |
| 30 | Corporate Elite Hamper | ₹3,500 |

---

## 🖼️ How to Change Product Images

### Folder: `public/images/products/`

1. Prepare your new image (JPG format recommended, square or 4:3 ratio works best)
2. Name it **exactly** the same as the old image file
3. Replace the file in the `public/images/products/` folder

### Image File Names (must match exactly):

| Product | Image File Name |
|---------|----------------|
| California Almonds | `california-almonds.jpg` |
| Mamra Almonds | `mamra-almonds.jpg` |
| Gurbandi Almonds | `gurbandi-almonds.jpg` |
| W240 Cashews | `w240-cashews.jpg` |
| Roasted Cashews | `roasted-cashews.jpg` |
| Iranian Pistachios | `iranian-pistachios.jpg` |
| Salted Pistachios | `salted-pistachios.jpg` |
| Chile Walnuts | `chile-walnuts.jpg` |
| Kashmiri Walnuts | `kashmiri-walnuts.jpg` |
| Medjool Dates | `medjool-dates.jpg` |
| Ajwa Dates | `ajwa-dates.jpg` |
| Green Kishmish | `green-kishmish.jpg` |
| Black Raisins | `black-raisins.jpg` |
| Mixed Dry Fruits | `mixed-dry-fruits.jpg` |
| Trail Mix | `trail-mix.jpg` |
| Royal Gift Hamper | `royal-gift-hamper.jpg` |
| Festive Hamper | `festive-hamper.jpg` |
| Corporate Elite Hamper | `corporate-elite-hamper.jpg` |

### Tips for images:
- Use **square images** (e.g., 800x800 pixels) for best results
- Keep file size under **500 KB** for fast loading
- Use `.jpg` format (not .png or .webp)

---

## ➕ How to Add a New Product

### File to edit: `src/data/products.json`

1. Open `src/data/products.json`
2. Go to the `"products"` array (starts around line 12)
3. Add a new product entry at the end, **before the closing `]`**

### Template for new product:

```json
,
{
  "id": "your-product-id",
  "name": "Your Product Name",
  "category": "almonds",
  "price": "₹XXX/kg",
  "description": "Short description of the product",
  "image": "your-image-file.jpg",
  "featured": false
}
```

### Available categories:
- `almonds`
- `cashews`
- `pistachios`
- `walnuts`
- `dates`
- `raisins`
- `mixed`
- `gift-hampers`

### Important rules:
- The `"id"` must be unique (use lowercase with hyphens, e.g., `"roasted-almonds"`)
- The `"image"` must match a file in `public/images/products/`
- Set `"featured": true` to show it prominently on the homepage
- Don't forget the comma before the new entry!

---

## ❌ How to Remove a Product

1. Open `src/data/products.json`
2. Find the product entry you want to remove
3. Delete the entire block from `{` to `}` (including the comma before it)
4. Save the file

---

## 🔄 How to Change the Logo

1. Prepare your new logo image (PNG with transparent background works best)
2. Name it `logo.png`
3. Replace the file at `public/images/logo.png`

---

## 👤 How to Change the Founder/Owner Photo

### Splash screen photo:
- Replace: `public/images/owner-profile-3.jpg`

### About section photo:
- Replace: `public/images/owner-profile.jpg`

---

## 📊 Google Sheets Integration

The enquiry form sends data to Google Sheets. See `GOOGLE_SHEETS_SETUP.md` for the full setup guide.

### Google Sheet Column Layout:

| Column | Data |
|--------|------|
| A | Timestamp |
| B | Name |
| C | Phone |
| D | Email |
| E | Address |
| F | City |
| G | State |
| H | Pincode |
| I | Products (comma-separated) |
| J | Quantities (comma-separated) |
| K | Prices (comma-separated) |
| L | Occasion |
| M | Delivery Date |
| N | Message (+ Custom Hamper items if any) |
| O | Product Count |

### To change the Google Sheets URL:
- File: `src/components/sections/ContactSection.tsx`
- Line: `9`
- Replace the URL in `GOOGLE_SHEETS_URL`

---

## 📱 Form Features

The enquiry form has **3 steps**:

1. **Step 1 — Your Details**: Name, phone, email, address
2. **Step 2 — Select Products**: Pick from catalog + build custom hamper
3. **Step 3 — Finalize Order**: Occasion, delivery date, special instructions, order summary

### Custom Hamper Feature:
Customers can tap "Custom Hamper" tab in the product selector to add any custom items they want. These items are sent to Google Sheets in the Message column.

---

## 🎨 How to Change Colors / Branding

### File: `src/index.css` (lines 10-75)

Key brand colors (in HSL format):
- **Rose Pink** (accent): line 45 → `--rose-pink: 335 87% 71%`
- **Steel Blue** (primary): line 44 → `--steel-blue: 216 26% 55%`
- **Background**: line 12 → `--background: 30 30% 97%`
- **Footer color**: Set in `src/components/layout/Footer.tsx` line 35

---

## 🆘 Need Help?

If something breaks after making changes:
1. **Check for missing commas** in products.json — this is the #1 cause of errors
2. **Check image file names** — they must match exactly (case-sensitive)
3. **Check that JSON is valid** — use https://jsonlint.com to verify your products.json

---

## 📋 Quick Reference Cheat Sheet

| What to change | File to edit | Where in file |
|---------------|-------------|---------------|
| Product prices | `src/data/products.json` | `"price"` field |
| Product names | `src/data/products.json` | `"name"` field |
| Product descriptions | `src/data/products.json` | `"description"` field |
| Product images | `public/images/products/` | Replace image file |
| Logo | `public/images/logo.png` | Replace file |
| Owner photo | `public/images/owner-profile-3.jpg` | Replace file |
| Google Sheets URL | `src/components/sections/ContactSection.tsx` | Line 9 |
| Store address | `src/components/sections/ContactSection.tsx` | Line 93 |
| Store hours | `src/components/sections/ContactSection.tsx` | Line 94 |
| Footer address | `src/components/layout/Footer.tsx` | Line 53 |
| Brand colors | `src/index.css` | Lines 10-75 |

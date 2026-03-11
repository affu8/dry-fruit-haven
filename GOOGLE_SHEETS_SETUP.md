# Google Sheets Integration - Step by Step Guide

This guide will help you connect the website enquiry form to Google Sheets so every customer submission appears automatically in your spreadsheet.

---

## Step 1: Create a Google Sheet

1. Open your browser and go to **https://sheets.google.com**
2. Click the **"+ Blank"** button to create a new spreadsheet
3. Name it: **Welcome Dry Fruit House - Enquiries** (click on "Untitled spreadsheet" at the top to rename)
4. In **Row 1**, type these headers in each column:

| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H | Column I | Column J | Column K | Column L | Column M | Column N | Column O |
|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
| Timestamp | Name | Phone | Email | Address | City | State | Pincode | Product | Quantity | Prices | Occasion | Delivery Date | Message | Product Count |

5. You can make Row 1 **bold** for better visibility

---

## Step 2: Open Apps Script

1. In your Google Sheet, click on **Extensions** in the top menu bar
2. Click on **Apps Script** — a new tab will open
3. You will see some default code like `function myFunction() {}`
4. **Delete ALL the default code**

---

## Step 3: Paste This Code

Copy and paste this entire code block into the Apps Script editor:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.address || '',
      data.city || '',
      data.state || '',
      data.pincode || '',
      data.product || '',
      data.quantity || '',
      data.prices || '',
      data.occasion || '',
      data.deliveryDate || '',
      data.message || '',
      data.productCount || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## Step 4: Deploy as Web App

1. Click the **"Deploy"** button (top right of Apps Script editor)
2. Click **"New deployment"**
3. Next to "Select type", click the **gear icon** and choose **"Web app"**
4. Fill in:
   - **Description**: `Enquiry Form Handler`
   - **Execute as**: Select **"Me"** (your email)
   - **Who has access**: Select **"Anyone"**
5. Click **"Deploy"**
6. Google will ask you to **authorize** — click "Authorize access" and follow the prompts
   - If you see "This app isn't verified", click **"Advanced"** then **"Go to (project name)"**
7. After deploying, you will see a **Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/LONG_STRING_OF_CHARACTERS/exec
   ```
8. **Copy this URL** — you will need it in the next step

---

## Step 5: Add the URL to Your Website

1. Open the file `src/components/sections/ContactSection.tsx`
2. Find this line near the top (around line 8):
   ```typescript
   const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with the URL you copied:
   ```typescript
   const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
4. Save the file

---

## Step 6: Test It!

1. Go to your website
2. Fill out the enquiry form with test data
3. Click "Submit Enquiry"
4. Check your Google Sheet — the data should appear as a new row!

---

## Troubleshooting

**Form submits but no data in sheet?**
- Make sure the URL is correct (no extra spaces)
- Make sure the deployment access is set to "Anyone"
- Try redeploying with a new version

**Getting an error on submit?**
- Check that you authorized the Apps Script correctly
- Try the authorization again: In Apps Script, go to Deploy > Manage deployments > click the pencil icon > Deploy

**Need to update the code?**
- Open Apps Script again
- Make your changes
- Click Deploy > Manage deployments > Edit (pencil icon) > Version: "New version" > Deploy

---

## Image Placeholders

Upload your images to these folders:

### Logo
- `/public/images/logo.png` — Your brand logo

### Founder Photo
- `/public/images/owner-profile.jpg` — Photo of the founder/owner

### Product Images (upload to `/public/images/products/`)
- `california-almonds.jpg`
- `premium-cashews.jpg`
- `iranian-pistachios.jpg`
- `chile-walnuts.jpg`
- `medjool-dates.jpg`
- `golden-raisins.jpg`
- `mixed-dry-fruits.jpg`
- `premium-trail-mix.jpg`
- `dried-apricots.jpg`
- `pine-nuts.jpg`
- `macadamia-nuts.jpg`
- `dried-cranberries.jpg`

### Gift Hamper Images (upload to `/public/images/hampers/`)
- `royal-collection-hamper.jpg`
- `festive-celebration-hamper.jpg`
- `corporate-elite-hamper.jpg`

That's it! Your form is now connected to Google Sheets.

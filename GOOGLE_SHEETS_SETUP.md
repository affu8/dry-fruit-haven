# Google Sheets Integration - Step by Step Guide (For Beginners)

This guide will walk you through connecting your website's enquiry form to Google Sheets so every form submission automatically appears in your spreadsheet.

---

## Step 1: Create a Google Sheet

1. Open your browser and go to **https://sheets.google.com**
2. Click the **"+" (Blank)** button to create a new spreadsheet
3. Click on "Untitled spreadsheet" at the top-left and rename it to: **Welcome Dry Fruit House - Enquiries**
4. In **Row 1**, type these headers (one per cell, from A1 to L1):

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 | J1 | K1 | L1 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Phone | Email | Address | City | State | Pincode | Product | Quantity | Delivery Date | Occasion | Message |

5. **Save** the spreadsheet (it auto-saves, but you can press Ctrl+S)

---

## Step 2: Open Google Apps Script

1. In your Google Sheet, look at the top menu bar
2. Click on **Extensions** (in the menu bar)
3. Click on **Apps Script** — a new tab will open

---

## Step 3: Paste the Script Code

1. In the Apps Script editor, you'll see some default code like `function myFunction() {}`
2. **Delete all** the existing code
3. **Copy and paste** this entire code:

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
      data.deliveryDate || '',
      data.occasion || '',
      data.message || ''
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

4. Press **Ctrl+S** to save (or click the floppy disk icon)
5. When asked for a project name, type: **Enquiry Form Handler** and click OK

---

## Step 4: Deploy as Web App

1. Click the blue **Deploy** button (top right of Apps Script editor)
2. Select **New deployment**
3. Click the **gear icon** next to "Select type" and choose **Web app**
4. Fill in these settings:
   - **Description**: `Enquiry Form Handler`
   - **Execute as**: Select **Me** (your email)
   - **Who has access**: Select **Anyone**
5. Click **Deploy**
6. Google will ask for permissions — click **Authorize access**
   - If you see "Google hasn't verified this app", click **Advanced** → **Go to Enquiry Form Handler (unsafe)** → **Allow**
7. You'll see a **Web app URL** — it looks like:
   ```
   https://script.google.com/macros/s/ABCDEF.../exec
   ```
8. **Copy this URL** (click the copy icon)

---

## Step 5: Add the URL to Your Website

1. Open your project code and find the file: `src/components/sections/ContactSection.tsx`
2. At the top of the file, find this line:
   ```typescript
   const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with the URL you copied. It should look like:
   ```typescript
   const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/ABCDEF.../exec';
   ```
4. Save the file

---

## Step 6: Test It!

1. Go to your website
2. Fill in the enquiry form with test data
3. Click **Submit Enquiry**
4. Go back to your Google Sheet — you should see the data appear as a new row!

---

## Troubleshooting

**Form submits but data doesn't appear?**
- Make sure you selected "Anyone" for "Who has access" in Step 4
- Make sure you authorized the permissions in Step 4
- Double check the URL is correctly pasted (no extra spaces)

**Getting an error message?**
- Make sure the Google Sheet headers match exactly (Timestamp, Name, Phone, etc.)
- Try redeploying: Go to Apps Script → Deploy → Manage deployments → Edit → New version → Deploy

**Need to update the script?**
- Go back to Apps Script, make changes, then Deploy → Manage deployments → Edit the existing one → New version → Deploy

---

## That's it!
All future form submissions will automatically appear in your Google Sheet. You can sort, filter, and manage all enquiries from there.

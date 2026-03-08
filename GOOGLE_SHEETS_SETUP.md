# Google Sheets Integration Setup

## Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it "Welcome Dry Fruit House - Enquiries"
3. Add headers in Row 1: `Timestamp | Name | Phone | Email | Product | Quantity | Delivery Date | Message`

## Step 2: Create a Google Apps Script
1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete the default code and paste the following:

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
      data.product || '',
      data.quantity || '',
      data.deliveryDate || '',
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

3. Click **Deploy → New deployment**
4. Select type: **Web app**
5. Set "Execute as": **Me**
6. Set "Who has access": **Anyone**
7. Click **Deploy** and copy the Web App URL

## Step 3: Add the URL to Your Website
1. Open `src/components/sections/ContactSection.tsx`
2. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL'` with your actual Web App URL

Example:
```typescript
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

## That's it! 
All form submissions will now automatically appear in your Google Sheet.

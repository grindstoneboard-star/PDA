
import { PDAData } from '../types';

/**
 * Google Apps Script Web App URL for Munters PDA Backend.
 * This endpoint handles incoming POST requests and appends data to the linked Google Sheet.
 */
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyTAE88Gf83L-0FPYDegE6ffeDc_ZCPIWPlIaSAWgQdRa4L6X1NjVc0hVDmXDCcvJ2k/exec';

export const saveToGoogleSheets = async (data: PDAData): Promise<boolean> => {
  // Safeguard against missing URL
  if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL.includes('PASTE_YOUR_APPS_SCRIPT_URL_HERE')) {
    console.warn('Google Sheets URL not configured. Data not saved to sheet.');
    return true; 
  }

  try {
    // We use 'no-cors' because Google Apps Script redirects after POST, 
    // which often causes CORS issues in standard browsers. 
    // The data is still transmitted correctly to the script.
    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    // Request sent successfully
    return true;
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return false;
  }
};

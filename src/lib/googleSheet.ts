export const saveToGoogleSheet = async (data: Record<string, string>) => {
  try {
    const sheetUrl = process.env.GOOGLE_SHEET_URL;
    if (!sheetUrl) {
      console.warn('GOOGLE_SHEET_URL is not defined');
      return false;
    }

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const response = await fetch(sheetUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Google Sheets API responded with status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error saving to Google Sheet:', error);
    return false;
  }
};

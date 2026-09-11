export const saveToCRM = async (leadData: Record<string, unknown>) => {
  try {
    const crmUrl = process.env.CRM_API_URL;
    const apiKey = process.env.CRM_API_KEY;

    if (!crmUrl || !apiKey) {
      console.warn('CRM credentials are not fully defined in environment variables');
      return false;
    }

    const response = await fetch(crmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      throw new Error(`CRM API responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving to CRM:', error);
    return false;
  }
};

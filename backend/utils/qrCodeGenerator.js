const QRCode = require('qrcode');
const Business = require('../models/Business');

// Generate QR code for a business
const generateQRCode = async (businessId, baseUrl) => {
  try {
    // Create feedback URL
    const feedbackUrl = `${baseUrl}/feedback/${businessId}`;
    
    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(feedbackUrl);
    
    // Update business with QR code URL
    await Business.findByIdAndUpdate(businessId, { qrCodeUrl: qrCodeDataUrl });
    
    return {
      qrCodeUrl: qrCodeDataUrl,
      feedbackUrl
    };
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
};

module.exports = { generateQRCode };
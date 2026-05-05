// Production-ready M-Pesa logic
export const getMpesaPassword = (shortCode: string, passKey: string) => {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const password = btoa(shortCode + passKey + timestamp);
  return { password, timestamp };
};

export const initiateSTKPush = async (phone: string, amount: number) => {
  // In production, this call must go through your secure proxy to hide your Keys
  const response = await fetch('https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.MPESA_ACCESS_TOKEN}` },
    body: JSON.stringify({
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: getMpesaPassword(process.env.MPESA_SHORTCODE!, process.env.MPESA_PASSKEY!).password,
      Timestamp: getMpesaPassword(process.env.MPESA_SHORTCODE!, process.env.MPESA_PASSKEY!).timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone, 
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: "https://hustlehub-api.vercel.app/api/callback",
      AccountReference: "HustleHubRef",
      TransactionDesc: "Payment for Services"
    })
  });
  return response.json();
};
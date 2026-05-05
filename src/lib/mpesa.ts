// HustleHub M-Pesa Logic - Vite Optimized
export const getMpesaPassword = (shortCode: string, passKey: string) => {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const password = btoa(shortCode + passKey + timestamp);
  return { password, timestamp };
};

export const initiateSTKPush = async (phone: string, amount: number) => {
  // Using import.meta.env for Vite/React 19 compatibility
  const accessToken = import.meta.env.VITE_MPESA_ACCESS_TOKEN;
  const shortCode = import.meta.env.VITE_MPESA_SHORTCODE || '174379';
  const passKey = import.meta.env.VITE_MPESA_PASSKEY;

  const { password, timestamp } = getMpesaPassword(shortCode, passKey);

  const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone, 
      PartyB: shortCode,
      PhoneNumber: phone,
      CallBackURL: "https://hustlehub-sim.vercel.app/api/callback",
      AccountReference: "HustleHubTest",
      TransactionDesc: "Testing M-Pesa Integration"
    })
  });
  
  return response.json();
};
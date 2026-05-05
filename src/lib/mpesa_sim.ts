export const simulatePayment = async (amount: number) => {
  console.log(`Initiating simulated M-Pesa push for KES ${amount}...`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        MerchantRequestID: "SIM_" + Math.random().toString(36).substr(2, 9),
        ResponseCode: "0",
        CustomerMessage: "Success. Please enter M-Pesa PIN."
      });
    }, 2000);
  });
};
export function generateReference() {
  const prefix = "TXN";
  const timestamp = Date.now(); // e.g. 1714039200000
  const random = Math.floor(1000 + Math.random() * 9000); // 4 digits

  return `${prefix}-${timestamp}-${random}`;
}
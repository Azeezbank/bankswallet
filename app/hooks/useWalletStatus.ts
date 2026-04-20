// import { useEffect, useState } from "react";

// export function useWalletStatus(balance: string) {
//   const [balanceColor, setBalanceColor] = useState("");

//   useEffect(() => {
//     const bal = Number(balance);

//     if (bal >= 1000) {
//       setBalanceColor("enoughbalance");
//     } else if (bal < 1000 && bal > 500) {
//       setBalanceColor("lowbalance");
//     } else {
//       setBalanceColor("insulficientbalance");
//     }
//   }, [balance]);

//   return { balanceColor };
// }
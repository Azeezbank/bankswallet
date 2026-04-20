"use client";
import React from "react";

interface Info {
  notification: string;
  onButtonClick: () => void;
  title: string;
  isNotification: boolean
}

// Notification Modal
export const ModalNotification: React.FC<Info> = ({ notification, title, onButtonClick }) => {
  const titleTxt = title.charAt(0).toLocaleLowerCase();
  return (
    <div className="fixed inset-0 flex justify-center bg-black/40 z-50">
      <div className="bg-white h-fit mt-24 w-full max-w-87.5 p-4 rounded-lg shadow-lg wrap-break-word">
        <div className="flex justify-between items-center">
          <h5 className={`font-bold ${titleTxt === 'e' ? 'text-red-600' : titleTxt === 's' ? 'text-green-600' : 'text-yellow-500'}`}>{title}</h5>

          <button
            type="button"
            onClick={onButtonClick}
            className={`ml-4 text-gray-500 hover:text-gray-800 text-lg cursor-pointer`}
          >
            ✕
          </button>
        </div>

        <p className="mt-2">{notification}</p>
      </div>
    </div>
  );
};

// // Success Modal
// export const ModalSus: React.FC<InfoSus> = ({ notificationSus, onButtonClick }) => {
//   return (
//     <div className="fixed inset-0 flex justify-center bg-black/40 z-50">
//       <div className="bg-white mt-24 w-full max-w-87.5 p-4 rounded-lg shadow-lg wrap-break-word">
//         <div className="flex justify-between items-center">
//           <h5 className="font-bold text-green-600">Success!</h5>

//           <button
//             type="button"
//             onClick={onButtonClick}
//             className="ml-4 text-gray-500 hover:text-gray-800 text-lg"
//           >
//             ✕
//           </button>
//         </div>

//         <p className="mt-2">{notificationSus}</p>
//       </div>
//     </div>
//   );
// };

// // Warning Modal
// export const ModalWar: React.FC<InfoWar> = ({ warning, onButtonClick }) => {
//   return (
//     <div className="fixed inset-0 flex justify-center bg-black/40 z-50">
//       <div className="bg-white mt-24 w-full max-w-87.5 p-4 rounded-lg shadow-lg wrap-break-word">
//         <div className="flex justify-between items-center">
//           <h5 className="font-bold text-yellow-500">Warning!</h5>

//           <button
//             type="button"
//             onClick={onButtonClick}
//             className="ml-4 text-gray-500 hover:text-gray-800 text-lg"
//           >
//             ✕
//           </button>
//         </div>
//         <p className="mt-2">{warning}</p>
//       </div>
//     </div>
//   );
// };
"use client";

import React from "react";

interface ModalProps {
  message: string;
  onButtonClick: () => void;
}

// We can add a warning CSS variable
// In your global CSS: :root { --color-warning: #f59e0b; }

const baseModalClasses =
  "fixed inset-0 flex items-start justify-center pt-20 z-50 animate-slide-down";

const modalBoxClasses =
  "p-4 w-11/12 md:w-1/2 rounded shadow-lg transition-all duration-300";

export const ModalErr: React.FC<ModalProps> = ({ message, onButtonClick }) => (
  <div className={baseModalClasses}>
    <div
      className={`${modalBoxClasses} bg-primary/20 border-l-4 border-primary text-primary`}
    >
      <div className="flex justify-between items-start">
        <h5 className="font-bold text-lg">Error!</h5>
        <button
          onClick={onButtonClick}
          className="font-bold hover:opacity-70 transition-opacity"
        >
          ×
        </button>
      </div>
      <p className="mt-2">{message}</p>
    </div>
  </div>
);

export const ModalSus: React.FC<ModalProps> = ({ message, onButtonClick }) => (
  <div className={baseModalClasses}>
    <div
      className={`${modalBoxClasses} bg-secondary/20 border-l-4 border-secondary text-secondary`}
    >
      <div className="flex justify-between items-start">
        <h5 className="font-bold text-lg">Success!</h5>
        <button
          onClick={onButtonClick}
          className="font-bold hover:opacity-70 transition-opacity"
        >
          ×
        </button>
      </div>
      <p className="mt-2">{message}</p>
    </div>
  </div>
);

export const ModalWar: React.FC<ModalProps> = ({ message, onButtonClick }) => (
  <div className={baseModalClasses}>
    <div
      className={`${modalBoxClasses} bg-yellow-100 border-l-4 border-warning text-warning`}
      style={{ backgroundColor: "var(--color-warning)", color: "white" }}
    >
      <div className="flex justify-between items-start">
        <h5 className="font-bold text-lg">Warning!</h5>
        <button
          onClick={onButtonClick}
          className="font-bold hover:opacity-70 transition-opacity"
        >
          ×
        </button>
      </div>
      <p className="mt-2">{message}</p>
    </div>
  </div>
);
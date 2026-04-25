import { useRef, useState } from "react";

interface PinInputProps {
  pin: string[];
  setPin: (val: string[]) => void;
  FetchDataBundle: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function PinInput({pin, setPin, FetchDataBundle}: PinInputProps) {
    const PIN_LENGTH = 4;
    // const [pin, setPin] = useState(Array(PIN_LENGTH).fill(""));
    const inputsRef = useRef<HTMLInputElement[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const value = e.target.value;

        if (/^\d$/.test(value)) { // only digits
            const newPin = [...pin];
            newPin[idx] = value;
            setPin(newPin);

            // move focus to next input
            if (idx < PIN_LENGTH - 1) {
                inputsRef.current[idx + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === "Backspace") {
            const newPin = [...pin];
            newPin[idx] = "";
            setPin(newPin);

            if (idx > 0) {
                inputsRef.current[idx - 1]?.focus();
            }
        }
    };

    return (
        <div>
            <div className="flex gap-2 justify-center">
                {pin.map((digit, idx) => (
                    <input
                        key={idx}
                        ref={(el) => { inputsRef.current[idx] = el!; }}
                        type="password"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e, idx)}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        className="w-12 h-12 mt-2 text-center bg-gray-100 border-2 border-gray-300 rounded-lg outline-none focus:outline-none"
                    />
                ))}
            </div>

            <div className="text-white mt-10 mb-5">
                <button
                    type="button"
                    onClick={FetchDataBundle}
                    disabled={pin.join("").length !== PIN_LENGTH}
                    className={`w-full py-2 rounded-lg ${pin.join("").length === PIN_LENGTH
                        ? "bg-gradient cursor-pointer"
                        : "bg-gray-300 cursor-not-allowed"
                        }`}
                >
                    Proceed to pay
                </button>
            </div>
        </div>
    );
}
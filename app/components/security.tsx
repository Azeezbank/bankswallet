/* ================= INPUT ================= */
export function Input({
    label,
    type,
    value,
    onChange,
}: {
    label: string;
    type: string;
    value: string;
    onChange: (val: string) => void;
}) {
    return (
        <div>
            <label className="text-sm text-gray-600">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-(--color-primary)"
            />
        </div>
    );
}

/* ================= PIN INPUT ================= */
export function PinInput({
    label,
    value,
    setValue,
}: {
    label: string;
    value: string;
    setValue: (val: string) => void;
}) {
    return (
        <div>
            <label className="text-sm text-gray-600">{label}</label>
            <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={value}
                onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 4) setValue(val);
                }}
                placeholder="••••"
                className="mt-1 w-full tracking-[0.5em] text-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-lg outline-none focus:ring-2 focus:ring-orange-400"
            />
        </div>
    );
}
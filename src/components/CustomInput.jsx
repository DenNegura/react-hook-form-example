import {forwardRef} from "react";

const CustomInput = forwardRef(
    ({label, value, onChange, name, ...props}, ref) => {
        return (
            <label>
                {label}
                <input
                    ref={ref}
                    name={name}
                    value={value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                />
            </label>
        );
    }
);

export {CustomInput};
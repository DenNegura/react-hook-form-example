function CustomInput({label, value, onChange, onBlur}) {
    return (
        <>
            <label>{label}
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                />
            </label>
        </>
    );
}

export {CustomInput};
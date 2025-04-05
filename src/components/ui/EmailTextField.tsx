import TextField from "@mui/material/TextField";
import React from "react";

interface EmailTextFieldProps
    extends React.ComponentPropsWithoutRef<typeof TextField> {}

const EmailTextField = ({
    value,
    onChange,
    onBlur,
    error,
    ...props
}: EmailTextFieldProps) => {
    return (
        <TextField
            fullWidth
            label="Email"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            helperText={error ? "Введите корректный email" : ""}
            {...props}
        />
    );
};

export default EmailTextField;

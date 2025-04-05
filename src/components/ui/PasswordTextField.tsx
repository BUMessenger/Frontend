import TextField from "@mui/material/TextField";
import React from "react";

interface PasswordTextFieldProps
    extends React.ComponentPropsWithoutRef<typeof TextField> {}

const PasswordTextField = ({
    label = "Пароль",
    value,
    onChange,
    error,
    ...props
}: PasswordTextFieldProps) => {
    return (
        <TextField
            fullWidth
            type="password"
            label={label}
            value={value}
            onChange={onChange}
            error={error}
            {...props}
        />
    );
};

export default PasswordTextField;

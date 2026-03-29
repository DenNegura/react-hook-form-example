import * as yup from "yup";

const userSchema = yup.object({
    fullName: yup
        .string()
        .required("Name is required")
        .min(5, "Minimum length is 5")
        .max(20, "Maximum length is 20")
        .matches(/^[A-Za-z ]+$/, "Only letters"),

    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email"),
});

export default userSchema;
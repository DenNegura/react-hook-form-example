import './App.css'
import {Controller, useForm, useWatch} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {fetchUser} from "./api/api.js";
import {Errors} from "./components/Errors.jsx";
import {CustomInput} from "./components/CustomInput.jsx";
import userSchema from "./schema.js";

function App() {

    const {
        formState: {isDirty},
        handleSubmit,
        reset,
        control,
        setValue,
        getValues,
        trigger,
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        criteriaMode: "all",
        defaultValues: async () => {
            const data = await fetchUser(1);
            return {
                fullName: data.firstName + " " + data.lastName,
                email: data.email
            };
        },
        resolver: yupResolver(userSchema)
    });

    const fullName = useWatch({
        control,
        name: "fullName"
    });

    const email = useWatch({
        control,
        name: "email"
    });

    const fillDemoUser = () => {
        setValue("fullName", "John Doe", {
            shouldDirty: true,
            shouldValidate: true
        });

        setValue("email", "john@company.com", {
            shouldDirty: true,
            shouldValidate: true
        });
    };

    const normalizeName = () => {
        const currentName = getValues("fullName");

        if (currentName) {
            setValue("fullName", currentName.trim(), {
                shouldDirty: true
            });
        }
    };

    const checkEmailType = () => {
        const currentEmail = getValues("email");

        if (currentEmail?.endsWith("@company.com")) {
            alert("Corporate user detected");
        } else {
            alert("Regular user");
        }
    };

    const validateEmail = async () => {
        const isValid = await trigger("email");
        const email = getValues("email");

        if (isValid) {
            alert(`Email (${email}) is valid`);
        } else {
            alert(`Email (${email}) is not valid`);
        }
    }

    const onSubmit = (data) => {
        console.log(data);
        reset();
    }

    return (
        <div className="app">
            <h1>React Hook Form</h1>
            <hr/>

            <h2>Hello, {fullName || "Guest"}</h2>

            <form onSubmit={(handleSubmit(onSubmit))}
                  autoComplete={'off'}>
                <Controller
                    name={"fullName"}
                    control={control}
                    defaultValue={""}
                    render={({field, fieldState}) => (
                        <>
                            <CustomInput
                                {...field}
                                label={"Full name"}
                                onBlur={() => {
                                    field.onBlur();
                                    normalizeName();
                                }}/>
                            <Errors errors={fieldState.error}/>
                        </>
                    )}
                />
                <Controller
                    name={"email"}
                    control={control}
                    defaultValue={""}
                    render={({field, fieldState}) => (
                        <>
                            <CustomInput {...field} label={"Email"}/>
                            <Errors errors={fieldState.error}/>
                        </>
                    )}
                />
                {email?.endsWith("@company.com") && (
                    <p className={'p__success'}>Corporate email detected</p>
                )}
                <div className="buttons">
                    <button type="button" onClick={fillDemoUser}>Fill demo data</button>
                    <button type="button" onClick={checkEmailType}>Check email type</button>
                    <button type="button" onClick={validateEmail}>Validate email</button>
                </div>
                <input
                    type="submit"
                    value="Submit"
                    disabled={!isDirty}
                />
            </form>
        </div>
    )
}

export default App
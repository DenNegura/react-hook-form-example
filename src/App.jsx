import './App.css'
import {useForm, useWatch} from "react-hook-form";
import {fetchUser} from "./api/api.js";
import {Errors} from "./components/Errors.jsx";

const restrictions = {
    fullName: {
        required: "This field is required",
        minLength: {value: 5, message: "Minimum length should be 5"},
        maxLength: {value: 20, message: "Maximum length should be 10"},
        pattern: {value: /^[A-Za-z ]+$/, message: "Must contain only letters"},
    },
    email: {
        required: "This field is required",
        minLength: {value: 5, message: "Minimum length should be 5"},
        maxLength: {value: 50, message: "Maximum length should be 10"},
        pattern: {
            value: /^[A-Za-z0-9\\.]+@[A-Za-z0-9\\.]+.[a-z]+$/,
            message: "Should be a valid email"
        },
    }
}

function App() {

    const {
        register,
        formState: {errors, isDirty},
        handleSubmit,
        reset,
        control,
    } = useForm({
        mode: "onChange",
        reValidateMode: "onSubmit",
        criteriaMode: "all",
        defaultValues: async () => {
            const data = await fetchUser(1);
            return {
                fullName: data.firstName + " " + data.lastName,
                email: data.email
            };
        }
    });

    const fullName = useWatch({
        control,
        name: "fullName"
    });

    const email = useWatch({
        control,
        name: "email"
    });

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
                <label htmlFor="name">Full name</label>
                <input type="text" {...register("fullName", restrictions.fullName)} />
                <Errors errors={errors.fullName}/>
                <label htmlFor="email">Email</label>
                <input type="text" {...register("email", restrictions.email)} />
                <Errors errors={errors.email}/>
                {email?.endsWith("@company.com") && (
                    <p className={'p__success'}>Corporate email detected</p>
                )}
                <input type="submit"
                       value="Submit" disabled={!isDirty}/>
            </form>
        </div>
    )
}

export default App

import './App.css'
import {useForm} from "react-hook-form";

function App() {

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onSubmit"
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="app">
            <h1>React Hook Form</h1>
            <hr/>

            <form onSubmit={(handleSubmit(onSubmit))}
                  autoComplete={'off'}>
                <input type="text"
                       placeholder="Enter your name"
                       {...register("name", {
                           required: "This field is required",
                           minLength: {
                               value: 5,
                               message: "Minimum length should be 5"
                           },
                           maxLength: {
                               value: 10,
                               message: "Maximum length should be 10"
                           },
                           pattern: {
                               value: /^[A-Za-z]+$/,
                               message: "Must contain only letters"
                           },
                       })} />
                <div className="errors">
                    {errors?.name && <span>{errors.name.message}</span>}
                </div>
                <input type="submit"
                       value="Submit"/>
            </form>
        </div>
    )
}

export default App

import './App.css'
import {useForm} from "react-hook-form";

function App() {

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset
    } = useForm({
        mode: "onChange",
        reValidateMode: "onSubmit",
        criteriaMode: "all",
        defaultValues: async () => {
                const data = await fetch('https://dummyjson.com/users/1')
                    .then(res => res.json());
                return {name: data.firstName + " " + data.lastName};
            }
    });

    const onSubmit = (data) => {
        console.log(data);
        reset();
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
                               value: 20,
                               message: "Maximum length should be 10"
                           },
                           pattern: {
                               value: /^[A-Za-z ]+$/,
                               message: "Must contain only letters"
                           },
                       })} />
                <div className="errors">
                    {errors?.name?.types ?
                        Object.values(errors.name.types).map((message, index) => (
                            <p key={index}>{message}</p>
                        )) :
                        errors?.name && <p>{errors.name.message}</p>
                    }
                </div>
                <input type="submit"
                       value="Submit"/>
            </form>
        </div>
    )
}

export default App

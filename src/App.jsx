import './App.css'
import {useForm} from "react-hook-form";

function App() {

    const {
        register,
        formState: {errors, isDirty, dirtyFields, touchedFields},
        handleSubmit,
        reset
    } = useForm({
        mode: "onChange",
        reValidateMode: "onSubmit",
        criteriaMode: "all",
        defaultValues: async () => {
            const data = await fetch('https://dummyjson.com/users/1')
                .then(res => res.json());
            return {
                fullName: data.firstName + " " + data.lastName,
                email: data.email
            };
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
                <label htmlFor="name">Full name</label>
                <input type="text"
                       {...register("fullName", {
                           required: "This field is required",
                           minLength: {value: 5, message: "Minimum length should be 5"},
                           maxLength: {value: 20, message: "Maximum length should be 10"},
                           pattern: {value: /^[A-Za-z ]+$/, message: "Must contain only letters"},
                       })} />
                <div className="errors">
                    {errors?.fullName?.types ?
                        Object.values(errors.fullName.types).map((message, index) => (
                            <p key={index}>{message}</p>
                        )) :
                        errors?.fullName && <p>{errors.fullName.message}</p>
                    }
                </div>
                <label htmlFor="email">Email</label>
                <input type="text"
                       {...register("email", {
                           required: "This field is required",
                           minLength: {value: 5, message: "Minimum length should be 5"},
                           maxLength: {value: 50, message: "Maximum length should be 10"},
                           pattern: {
                               value: /^[A-Za-z0-9\\.]+@[A-Za-z0-9\\.]+.[a-z]+$/,
                               message: "Should be a valid email"
                           },
                       })} />
                <div className="errors">
                    {errors?.email?.types ?
                        Object.values(errors.email.types).map((message, index) => (
                            <p key={index}>{message}</p>
                        )) :
                        errors?.email && <p>{errors.email.message}</p>
                    }
                </div>
                <input type="submit"
                       value="Submit" disabled={!isDirty}/>
                {Object.values(dirtyFields).length > 0
                    && <p className={'dirty-fields'}>
                        Modified fields: {Object.keys(dirtyFields).join(", ")}
                    </p>}
                {Object.values(touchedFields).length > 0
                    && <p className={'dirty-fields'}>
                        Touched fields: {Object.keys(touchedFields).join(", ")}
                    </p>}
            </form>
        </div>
    )
}

export default App

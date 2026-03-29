import './App.css'
import {useForm} from "react-hook-form";

function App() {

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="app">
            <h1>React Hook Form</h1>
            <hr/>

            <form onSubmit={(handleSubmit(onSubmit))}
                  autoComplete={'false'}>
                <input type="text"
                       placeholder="Enter your name"
                       {...register("name")} />
                <input type="submit"
                       value="Submit"/>
            </form>
        </div>
    )
}

export default App

function Errors({errors}) {
    return (
        <div className="errors">
            {errors?.types ?
                Object.values(errors.types).map((message, index) => (
                    <p key={index}>{message}</p>
                )) :
                errors && <p>{errors.message}</p>
            }
        </div>
    )
}

export {Errors};
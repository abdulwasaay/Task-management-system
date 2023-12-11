import "./Button.css"

export default function Button({name}){
    // This is my button component
    return(
        <div className="button-container">
            <button className="button">{name}</button>
        </div>
    )
}
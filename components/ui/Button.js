import Link from "next/link";
import classes from "./Button.module.css"

function Button(props) {
    if(props.link) {
        return ( 
            <Link 
            href={props.link}>
            <p className={classes.btn}>{props.children}</p>
            </Link>
        );
    }

    return <button 
        className={classes.btn} 
        onClick={props.onClick}>
            {props.children}
        </button>
}

export default Button;
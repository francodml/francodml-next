import { useRef } from "react";
import { useRouter } from "next/router";
import styles from "../styles/projecteditor.module.scss";

export default function ProjectEditor() {
    
    const nameInputRef = useRef();
    const subtitleInputRef = useRef();
    const shortcontentInputRef = useRef();
    const longcontentInputRef = useRef();
    const pagepathInputRef = useRef();

    const submitData = async (event) => {
        event.preventDefault();

        const data = {
            name: nameInputRef.current.value,
            subtitle: subtitleInputRef.current.value,
            shortcontent: shortcontentInputRef.current.value,
            longcontent: longcontentInputRef.current.value,
            pagepath: pagepathInputRef.current.value
        }

        const response = await fetch("/api/new_project", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        });

        const res = await response.json();
    }

    return (

        <div className={styles.Editor}>
            <div className={styles.Row}>Text Editor Options</div>
        </div>

    )
}
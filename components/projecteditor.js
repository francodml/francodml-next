import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "../styles/projecteditor.module.scss";

export default function ProjectEditor() {
    
    const nameInputRef = useRef();
    const subtitleInputRef = useRef();
    const pagepathInputRef = useRef();

    useEffect(() => {
        subtitleInputRef.current.text = nameInputRef.current.text;
    });
    
    const longcontentInputRef = useRef();
    const shortcontentInputRef = useRef();
    
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
            <div className={styles.settings}>
                <input name="pagepath" id="pagename" ref={pagepathInputRef} type="text"/>
                <label htmlFor="pagepath">Page path</label>
                <input name="name" id="name" ref={nameInputRef} type="text" autoComplete="none"/>
                <label htmlFor="name">Project name</label>
                <input name="subtitle" id="subtitle" ref={subtitleInputRef} type="text"/>
                <label htmlFor="subtitle">Project subtitle</label>
            </div>
            <div className={styles.inputContainer}>
                <input className={styles.small} ref={shortcontentInputRef} type="text" placeholder="Short Description" />
                <input className={styles.large} ref={longcontentInputRef} type="text" placeholder="Long Description" />
            </div>
        </div>

    )
}
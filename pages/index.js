import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import Keyboard from "../components/keyboard";

import styles from "../styles/Home.module.scss";

export default function Home() {
    const [letterArray, setLetterArray] = useState(["", "", "", "", ""]);
    const [letterPointer, setLetterPointer] = useState(0);
    const contentRef = useRef(null);

    function keyPressed({ key }) {
        const keyUpper = key.toUpperCase();

        if (keyUpper === "BACKSPACE" && letterPointer > 0) {
            const newArray = [...letterArray];
            newArray[letterPointer - 1] = "";
            setLetterArray(newArray);
            setLetterPointer(letterPointer - 1);
        }
        else if (keyUpper.match(/^[A-Z]$/) && letterPointer < letterArray.length) {
            const newArray = [...letterArray];
            newArray[letterPointer] = keyUpper;
            setLetterArray(newArray);
            setLetterPointer(letterPointer + 1);
        }
    }

    useEffect(() => {
        if (contentRef.current)
            contentRef.current.focus();
    }, []);

    return (
        <div className={styles.content} onKeyDown={keyPressed} tabIndex={-1} ref={contentRef}>
            <Head>
                <title>Letrados</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className={styles.main}>
                <h1>Pense em uma palavra para outra pessoa adivinhar</h1>
                <ul>
                    {letterArray.map((letter, i) => (
                        <li key={i}>
                            <p>{letterArray[i]}</p>
                        </li>
                    ))}
                </ul>
                <div className={styles.generateButton}>
                    <h3>GERAR JOGO</h3>
                </div>
            </div>

            <Keyboard onKeyClick={keyPressed}/>

            <div className={styles.footer}>
                <p>Criado por <a href="https://github.com/GuiArcencio" target="_blank" rel="noreferrer">GuiArcencio</a></p>
            </div>
        </div>
    );
}

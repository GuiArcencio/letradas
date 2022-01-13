import Head from "next/head";
import { useState, useEffect } from "react";

import styles from "../styles/Home.module.scss";

export default function Home() {
    const [letterArray, setLetterArray] = useState(["", "", "", "", ""]);

    function keyPressed({ key }) {
        const keyUpper = key.toUpperCase();
    }

    useEffect(() => {
        window.addEventListener("keyup", keyPressed);
        return () => {
            window.removeEventListener("keyup", keyPressed);
        };
    }, []);

    return (
        <div className={styles.content}>
            <Head>
                <title>Letrados</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className={styles.main}>
                <h1>Pense em uma palavra para outra pessoa adivinhar</h1>
                <ul>
                    {letterArray.map((letter, i) => (
                        <li key={i}>
                            {letterArray[i]}
                        </li>
                    ))}
                </ul>
                <button>
                    <h3>CRIAR JOGO</h3>
                </button>
            </div>

            <div className={styles.footer}>
                <p>Feito por <a href="https://github.com/GuiArcencio" target="_blank" rel="noreferrer">GuiArcencio</a></p>
            </div>
        </div>
    );
}

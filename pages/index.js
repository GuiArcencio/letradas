import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { HiClipboardCopy } from "react-icons/hi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Keyboard from "../components/Keyboard";

import styles from "../styles/Home.module.scss";

export default function Home() {
    const [letterArray, setLetterArray] = useState(["", "", "", "", ""]);
    const [letterPointer, setLetterPointer] = useState(0);
    const [linkStatus, setLinkStatus] = useState("hidden");
    const [linkText, setLinkText] = useState("");
    const contentRef = useRef(null);

    function keyPressed({ key }) {
        const keyUpper = key.toUpperCase();

        if (keyUpper === "BACKSPACE" && letterPointer > 0) {
            const newArray = [...letterArray];
            newArray[letterPointer - 1] = "";
            setLetterArray(newArray);
            setLetterPointer(letterPointer - 1);
        }
        else if (keyUpper === "ENTER")
            generateLink();
        else if (keyUpper.match(/^[A-Z]$/) && letterPointer < letterArray.length) {
            const newArray = [...letterArray];
            newArray[letterPointer] = keyUpper;
            setLetterArray(newArray);
            setLetterPointer(letterPointer + 1);
        }
    }

    function generateLink() {
        if (letterArray.every(s => s.match(/^[A-Z]$/))) {
            const data = Buffer.from(letterArray.join(""));
            const key = Math.floor(Math.random() * 256);

            for (let i in data)
                data.writeUInt8(key ^ data[i], i);

            const data_with_key = Buffer.concat([data, Buffer.from([key])]);

            const code = data_with_key.toString("hex");
            setLinkText(`${process.env.APP_URL}/${code}`);
            setLinkStatus("visible");
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
                <div className={styles.generateButton} onClick={generateLink}>
                    <h3>GERAR JOGO</h3>
                </div>
            </div>

            <div className={styles.linkClipboard} style={{ visibility: linkStatus }}>
                <div className={styles.linkClipboardText}>
                    <p>{linkText}</p>
                </div>
                <CopyToClipboard text={linkText}>
                    <div className={styles.linkClipboardButton}>
                        <HiClipboardCopy />
                    </div>
                </CopyToClipboard>
            </div>

            <Keyboard onKeyClick={keyPressed}/>

            <div className={styles.footer}>
                <p>Criado por <a href="https://github.com/GuiArcencio" target="_blank" rel="noreferrer">GuiArcencio</a></p>
            </div>
        </div>
    );
}

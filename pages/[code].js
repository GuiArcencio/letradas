import Head from "next/head";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { BsQuestionCircle } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";

import Keyboard from "../components/Keyboard";
import Help from "../components/Help";
import checkWord from "../utils/checkWord";

import styles from "../styles/Game.module.scss";

const COLOR = {
    "BLANK": "#1E3048",
    "FILLED": "#06080F",
    "YELLOW": "#8F891A",
    "GREEN": "#35471C"
};

export default function Game() {
    const router = useRouter();
    const [correctWord, setCorrectWord] = useState("");
    const [tries, setTries] = useState([]);
    const [colors, setColors] = useState([]);
    const [letterPointer, setLetterPointer] = useState(0);
    const [rowPointer, setRowPointer] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [wordWrong, setWordWrong] = useState(false);
    const [helpModalOpen, setHelpModalOpen] = useState(false);
    const [possibleWords, setPossibleWords] = useState([]);
    const [loss, setLoss] = useState(false);

    const contentRef = useRef(null);

    function keyPressed({ key }) {
        if (!gameOver) {
            const keyUpper = key.toUpperCase();

            if (keyUpper === "BACKSPACE" && letterPointer > 0) {
                setWordWrong(false);
                setTries(old => {
                    old[rowPointer][letterPointer - 1] = "";
                    return JSON.parse(JSON.stringify(old));
                });
                setColors(old => {
                    old[rowPointer][letterPointer - 1] = "BLANK";
                    return JSON.parse(JSON.stringify(old));
                });
                setLetterPointer(l => l - 1);
            }
            else if (keyUpper === "ENTER") {
                if (letterPointer === tries[rowPointer].length && possibleWords.includes(tries[rowPointer].join(""))) {
                    setWordWrong(false);
                    const newColors = checkWord(tries[rowPointer], correctWord);
                    setColors(old => {
                        old[rowPointer] = [...newColors];
                        return JSON.parse(JSON.stringify(old));
                    });

                    const won = !!newColors.every(s => s === "GREEN");
                    const lost = rowPointer === tries.length - 1;
                    if (won || lost)
                        setGameOver(true);
                    else
                        setRowPointer(r => r + 1);

                    setLetterPointer(0);
                    setLoss(lost);
                } else {
                    setWordWrong(true);
                }
            }
            else if (keyUpper.match(/^[A-Z]$/) && letterPointer < tries[rowPointer].length) {
                setWordWrong(false);
                setTries(old => {
                    old[rowPointer][letterPointer] = keyUpper;
                    return JSON.parse(JSON.stringify(old));
                });
                setColors(old => {
                    old[rowPointer][letterPointer] = "FILLED";
                    return JSON.parse(JSON.stringify(old));
                });
                setLetterPointer(l => l + 1);
            }
        }
    }

    useEffect(() => {
        async function fetchWords() {
            const res = await fetch("/words.txt");
            const data = await res.text();
            setPossibleWords(data.split("\n"));
        }
        fetchWords();
    }, []);

    useEffect(() => {
        const startingArray = [];
        for (let i = 0; i < 6; i++)
            startingArray.push(Array(5).fill(""));

        const startingColors = [];
        for (let i = 0; i < 6; i++)
            startingColors.push(Array(5).fill("BLANK"));

        setTries(startingArray);
        setColors(startingColors);

        if (contentRef.current)
            contentRef.current.focus();
    }, []);

    useEffect(() => {
        try {
            if (router.query.code) {
                const code = Buffer.from(router.query.code, "hex");
                const key = code[code.length - 1];

                const decoded = Buffer.alloc(5);
                for (let i = 0; i < decoded.length; i++) {
                    const byte = code.readUInt8(i);
                    decoded.writeUInt8(byte ^ key, i);
                }

                const word = decoded.toString("utf-8");
                if (!word.match(/^[A-Z]{5}$/)) throw Error("Invalid code");

                setCorrectWord(decoded.toString("utf-8"));
            }
        } catch (e) {
            router.push("/");
        }
    }, [router]);

    useEffect(() => {
        contentRef.current.style.height = `${window.innerHeight}px`;
    });

    return (
        <div 
            className={styles.content}
            tabIndex={-1}
            ref={contentRef}
            onKeyDown={keyPressed}
        >
            <Head>
                <title>Letrados</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={styles.question}>
                <BsQuestionCircle onClick={() => setHelpModalOpen(true)} />
            </div>
            <Link href="/" passHref>
                <div className={styles.home}>
                    <AiOutlineHome />
                </div>
            </Link>

            <header>    
                <h1>
                    Letrados
                </h1>
            </header>

            <div className={styles.table}>
                {tries.map((word, row_i) => (
                    <ul key={`row${row_i}`}>
                        {tries[row_i].map((letter, letter_i) => (
                            <li 
                                key={`row${row_i}letter${letter_i}`} 
                                style={ row_i === rowPointer && wordWrong ?
                                    { 
                                        backgroundColor: COLOR[colors[row_i][letter_i]],
                                        opacity: row_i > rowPointer ? 0.3 : 1 ,
                                        borderColor: "#660f14"
                                    }
                                    :
                                    { 
                                        backgroundColor: COLOR[colors[row_i][letter_i]],
                                        opacity: row_i > rowPointer ? 0.3 : 1 
                                    }}
                            >
                                <p>{tries[row_i][letter_i]}</p>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>

            <footer>
                <Keyboard onKeyClick={keyPressed} colorState={colors} rowPointer={rowPointer} tries={tries} />
            </footer>

            <Help open={helpModalOpen} closeModalFunction={() => setHelpModalOpen(false)} />
        </div>
    );
}

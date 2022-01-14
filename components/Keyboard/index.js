import { CgBackspace } from "react-icons/cg";

import styles from "../../styles/Keyboard.module.scss";

const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const thirdRow = ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"];

export default function Keyboard({ onKeyClick }) {
    return (
        <div className={styles.contentBox}>
            <ul>
                {firstRow.map((letter, i) => (
                    <li key={`1keyboard${i}`} onClick={() => onKeyClick({ key: letter })}>
                        <p>{letter}</p>
                    </li>
                ))}
            </ul>
            <ul>
                {secondRow.map((letter, i) => (
                    <li key={`2keyboard${i}`} onClick={() => onKeyClick({ key: letter })}>
                        <p>{letter}</p>
                    </li>
                ))}
            </ul>
            <ul>
                {thirdRow.map((letter, i) => (
                    <li key={`3keyboard${i}`} onClick={() => onKeyClick({ key: letter })}>
                        {letter === "Backspace" ? <CgBackspace /> : <p>{letter}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

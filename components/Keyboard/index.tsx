import { useEffect, useState } from 'react'

import { CgBackspace } from 'react-icons/cg'

import styles from '../../styles/Keyboard.module.scss'

const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const thirdRow = ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']

const UNTESTED = 0
const WRONG = 1
const YELLOW = 2
const GREEN = 3

export default function Keyboard({ onKeyClick, colorState, rowPointer, tries }: any) {
    const [keyColors, setKeyColors] = useState({})

    function generateStyle(letter) {
        if (!keyColors || Object.entries(keyColors).length === 0)
            return { opacity: 1 }

        if (keyColors[letter] === UNTESTED)
            return { opacity: 1 }
        else if (keyColors[letter] === WRONG)
            return { opacity: 0.3 }
        else if (keyColors[letter] === YELLOW)
            return { backgroundColor: '#8F891A' }
        else if (keyColors[letter] === GREEN)
            return { backgroundColor: '#35471C' }
    }

    useEffect(() => {
        const dict = {}
        for (const x of firstRow.concat(secondRow, thirdRow))
            dict[x] = UNTESTED
        setKeyColors(dict)
    }, [])

    useEffect(() => {
        setKeyColors((old) => {
            for (let i = 0; i < rowPointer; i++) {
                for (let j = 0; j < colorState[i].length; j++) {
                    const currentColorState = colorState[i][j]
                    const colorNum = ({
                        FILLED: 1,
                        YELLOW: 2,
                        GREEN: 3,
                    })[currentColorState]

                    if (colorNum > old[tries[i][j]])
                        old[tries[i][j]] = colorNum
                }
            }
            return { ...old }
        })
    }, [colorState, rowPointer, tries])

    return (
        <div className={styles.contentBox}>
            <ul>
                {firstRow.map((letter, i) => (
                    <li key={`1keyboard${i}`} onClick={() => onKeyClick({ key: letter })} style={generateStyle(letter)}>
                        <p>{letter}</p>
                    </li>
                ))}
            </ul>
            <ul>
                {secondRow.map((letter, i) => (
                    <li key={`2keyboard${i}`} onClick={() => onKeyClick({ key: letter })} style={generateStyle(letter)}>
                        <p>{letter}</p>
                    </li>
                ))}
            </ul>
            <ul>
                {thirdRow.map((letter, i) => (
                    <li key={`3keyboard${i}`} onClick={() => onKeyClick({ key: letter })} style={generateStyle(letter)}>
                        {letter === 'Backspace' ? <CgBackspace /> : <p>{letter}</p>}
                    </li>
                ))}
            </ul>
        </div>
    )
}

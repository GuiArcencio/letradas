import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { HiClipboardCopy } from 'react-icons/hi'
import { BsQuestionCircle } from 'react-icons/bs'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Keyboard from '../components/Keyboard'
import Help from '../components/Help'

import styles from '../styles/Home.module.scss'
import { encodeWordIndex } from '../utils/word-encoding'

export default function Home() {
    const [letterArray, setLetterArray] = useState(['', '', '', '', ''])
    const [letterPointer, setLetterPointer] = useState(0)
    const [linkStatus, setLinkStatus] = useState<VisibilityState>('hidden')
    const [linkText, setLinkText] = useState('')
    const [wordWrong, setWordWrong] = useState(false)
    const [helpModalOpen, setHelpModalOpen] = useState(false)
    const [possibleWords, setPossibleWords] = useState([])
    const contentRef = useRef(null)

    function keyPressed({ key }) {
        const keyUpper = key.toUpperCase()

        if (keyUpper === 'BACKSPACE' && letterPointer > 0) {
            setWordWrong(false)
            const newArray = [...letterArray]
            newArray[letterPointer - 1] = ''
            setLetterArray(newArray)
            setLetterPointer(letterPointer - 1)
        }
        else if (keyUpper === 'ENTER') { generateLink() }
        else if (keyUpper.match(/^[A-Z]$/) && letterPointer < letterArray.length) {
            setWordWrong(false)
            const newArray = [...letterArray]
            newArray[letterPointer] = keyUpper
            setLetterArray(newArray)
            setLetterPointer(letterPointer + 1)
        }
    }

    function generateLink() {
        if (letterArray.every(s => s.match(/^[A-Z]$/)) && possibleWords.includes(letterArray.join(''))) {
            const word = letterArray.join('')
            const wordIndex = possibleWords.indexOf(word)
            const encodedWordIndex = encodeWordIndex(wordIndex)
            setLinkText(`${process.env.APP_URL}/${encodedWordIndex}`)
            setLinkStatus('visible')
        }
        else {
            setWordWrong(true)
        }
    }

    useEffect(() => {
        if (contentRef.current)
            contentRef.current.focus()
    }, [])

    useEffect(() => {
        async function fetchWords() {
            const res = await fetch('/words.txt')
            const data = await res.text()
            setPossibleWords(data.split('\n'))
        }
        fetchWords()
    }, [])

    useEffect(() => {
        contentRef.current.style.height = `${window.innerHeight}px`
    })

    return (
        <div className={styles.content} onKeyDown={keyPressed} tabIndex={-1} ref={contentRef}>
            <Head>
                <title>Letradas</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <div className={styles.question}>
                <BsQuestionCircle onClick={() => setHelpModalOpen(true)} />
            </div>

            <div className={styles.main}>
                <h1>Pense em uma palavra para outra pessoa adivinhar</h1>
                <ul>
                    {letterArray.map((letter, i) => (
                        <li key={i} style={ wordWrong ? { borderColor: '#660f14' } : { opacity: 1 } }>
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

            <footer className={styles.keyboard}>
                <Keyboard onKeyClick={keyPressed}/>
            </footer>

            <Help open={helpModalOpen} closeModalFunction={() => setHelpModalOpen(false)} />
        </div>
    )
}

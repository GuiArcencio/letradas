import Modal from 'react-modal'
import { AiOutlineClose } from 'react-icons/ai'
import { BsGithub, BsTwitter } from 'react-icons/bs'

import styles from '../../styles/Help.module.scss'

Modal.setAppElement('body')

export default function Help({ open, closeModalFunction }: any) {
    return (
        <Modal
            isOpen={open}
            className={styles.box}
            overlayClassName={styles.overlay}
        >
            <AiOutlineClose onClick={() => closeModalFunction()} className={styles.closeButton} />
            <div className={styles.content}>
                <h3>O jogo envolve descobrir a palavra em 6 tentaivas. A cada tentativa, você recebe um resultado.</h3>
                <div className={styles.letter} style={{ backgroundColor: '#35471C' }}>
                    <p>G</p>
                </div>
                <h3>A letra G está na palavra e na posição correta.</h3>
                <div className={styles.letter} style={{ backgroundColor: '#8F891A' }}>
                    <p>P</p>
                </div>
                <h3>A letra P está na palavra mas na posição incorreta.</h3>
                <div className={styles.letter} style={{ backgroundColor: '#0C131D' }}>
                    <p>J</p>
                </div>
                <h3>A letra J não está na palavra.</h3>
                <hr></hr>
                <h3>Letradas é a versão <span style={{ fontStyle: 'italic' }}>multiplayer</span> de <a href="https://www.powerlanguage.co.uk/wordle/" target="_blank" rel="noreferrer">Wordle</a>.</h3>

                <footer className={styles.footer}>
                    <p>Criado por Guilherme Arcencio</p>
                    <a href="https://github.com/GuiArcencio" target="_blank" rel="noreferrer"><BsGithub /></a>
                    <a href="https://twitter.com/GuiArcencio" target="_blank" rel="noreferrer"><BsTwitter /></a>
                </footer>
            </div>
        </Modal>
    )
}

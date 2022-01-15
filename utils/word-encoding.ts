import { decode as decodeB62, encode as encodeB62 } from 'base62'

export const encodeWordIndex = (index: number) => {
    // random hex char
    const randomHexChar = Math.floor(Math.random() * 16).toString(16)
    // encode index
    const encodedIndex = encodeB62(index)
    const encoded = ceaserCipherEncode(String(encodedIndex), parseInt(randomHexChar, 16))
    // encode ceaser cipher with base62
    return encoded + randomHexChar
}

export const decodeWordIndex = (encodedWord: string) => {
    const key = encodedWord.slice(-1)
    const decoded = ceaserCipherDecode(
        encodedWord.slice(0, -1),
        parseInt(key, 16),
    )
    return decodeB62(decoded)
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function ceaserCipherDecode(string: string, key: number) {
    return string.split('').map((char) => {
        const index = LETTERS.indexOf(char)
        if (index === -1) return char
        const newIndex = index - key
        return LETTERS[newIndex < 0 ? newIndex + LETTERS.length : newIndex]
    }).join('')
}

export function ceaserCipherEncode(content: string, key: number) {
    return content.split('').map((char) => {
        const index = LETTERS.indexOf(char)
        if (index === -1) return char
        const newIndex = index + key
        return LETTERS[newIndex > LETTERS.length - 1 ? newIndex - LETTERS.length : newIndex]
    }).join('')
}

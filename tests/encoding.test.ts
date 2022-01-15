import { readFileSync } from 'fs'
import { describe, expect, it } from 'vitest'
import { ceaserCipherDecode, ceaserCipherEncode, decodeWordIndex, encodeWordIndex } from '../utils/word-encoding'

// load words from file
const POSSIBLE_WORDS = readFileSync('./public/words.txt', 'utf8').split('\n')

describe('encoding', () => {
    it('ceaser cipher should encode and decode to the same', () => {
        const sampleWord = 'C2YX'
        const key = 12
        const encoded = ceaserCipherEncode(sampleWord, key)
        const decoded = ceaserCipherDecode(encoded, key)
        expect(decoded).toEqual(sampleWord)
    })
    it('should encode word index and decode to the same word', () => {
        const sampleWord = 'TESTE'
        const sampleWordIndex = POSSIBLE_WORDS.indexOf(sampleWord)
        const encodedWord = encodeWordIndex(sampleWordIndex)
        const decodedWordIndex = decodeWordIndex(encodedWord)
        expect(decodedWordIndex).to.eq(sampleWordIndex)
        expect(POSSIBLE_WORDS[decodedWordIndex]).to.eq(sampleWord)
    })
})

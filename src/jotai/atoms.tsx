import initialData from '@/data.json'
import { atom } from 'jotai'

export const boardStateAtom = atom(initialData.boards)

export const currentBoardIndexSelector = atom(0)

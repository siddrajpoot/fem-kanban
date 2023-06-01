import initialData from '@/data.json'
import { atom } from 'jotai'
import { splitAtom } from 'jotai/utils'

// atoms
export const initialDataAtom = atom(initialData.boards)
export const boardStateAtom = splitAtom(initialDataAtom)
export const currentBoardIndexAtom = atom(0)

// selectors

export const boardSelecter = atom(get => {
  const index = get(currentBoardIndexAtom)
  const boardState = get(boardStateAtom)

  return get(boardState[index])
})

export const boardsNameListSelector = atom(get =>
  get(boardStateAtom).map(board => get(board).name)
)

export const currentBoardNameSelector = atom(get => {
  const index = get(currentBoardIndexAtom)
  const boardState = get(boardStateAtom)

  return get(boardState[index]).name
})

// actions

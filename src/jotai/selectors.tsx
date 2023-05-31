import { atom } from 'jotai'
import { currentBoardIndexSelector, boardStateAtom } from './atoms'

export const selectedBoardAtom = atom(get => {
  const index = get(currentBoardIndexSelector)
  const boardState = get(boardStateAtom)

  return boardState[index]
})

export const boardsListSelector = atom(get =>
  get(boardStateAtom).map(board => board.name)
)

export const currentBoardNameSelector = atom(get => {
  const index = get(currentBoardIndexSelector)
  const boardState = get(boardStateAtom)

  return boardState[index].name
})

import { atom } from 'jotai'
import { boardSelecter } from './board'

//atoms
export const selectedTaskIndexAtom = atom<{
  columnIndex: number | null
  taskIndex: number | null
}>({ columnIndex: null, taskIndex: null })

//selectors
export const selectedTaskSelector = atom(get => {
  const currentBoard = get(boardSelecter)
  const { columnIndex, taskIndex } = get(selectedTaskIndexAtom)

  if (columnIndex !== null && taskIndex !== null) {
    return currentBoard.columns[columnIndex].tasks[taskIndex]
  } else {
    return null
  }
})

//actions

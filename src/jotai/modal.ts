import { MODAL_ACTION } from '@/types'
import { atom } from 'jotai'
import { selectedTaskIndexAtom } from './tasks'

// atoms
export const modalAtom = atom<MODAL_ACTION | null>(null)

// selectors
export const shouldShowModalAtom = atom(get => get(modalAtom) !== null)

// actions
export const modalActionAtom = atom(
  modalAtom,
  (get, set, type: MODAL_ACTION | null) => {
    if (type !== null && MODAL_ACTION[type]) {
      set(modalAtom, type)
    }
  }
)

export const hideActionAtom = atom(null, (get, set) => {
  set(modalAtom, null)
  set(selectedTaskIndexAtom, { columnIndex: null, taskIndex: null })
})

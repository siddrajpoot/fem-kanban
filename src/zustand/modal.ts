import { create } from 'zustand'

type MODAL_ACTION =
  | 'VIEW_TASK'
  | 'EDIT_TASK'
  | 'ADD_TASK'
  | 'DELETE_TASK'
  | 'ADD_BOARD'
  | 'EDIT_BOARD'
  | 'DELETE_BOARD'

type State = {
  modalType: null | MODAL_ACTION
}

type Action = {
  setModalType: (type: State['modalType']) => void
}

export const useModalStore = create<State & Action>()(set => ({
  modalType: null,
  setModalType: type => set(() => ({ modalType: type })),
}))

// export const modalAtom = atom<MODAL_ACTION | null>(null)

// // selectors
// export const shouldShowModalAtom = atom(get => get(modalAtom) !== null)

// // actions
// export const modalActionAtom = atom(
//   modalAtom,
//   (get, set, type: MODAL_ACTION | null) => {
//     if (type !== null && MODAL_ACTION[type]) {
//       set(modalAtom, type)
//     }
//   }
// )

// export const hideActionAtom = atom(null, (get, set) => {
//   set(modalAtom, null)
//   set(selectedTaskIndexAtom, { columnIndex: null, taskIndex: null })
// })

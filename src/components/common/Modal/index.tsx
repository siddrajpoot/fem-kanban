import * as Dialog from '@radix-ui/react-dialog'
import styles from '@/styles/Modal.module.scss'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { atom, useAtom, useAtomValue } from 'jotai'
import ViewTask from './ViewTask'
const pjs = Plus_Jakarta_Sans({ subsets: ['latin'] })

// export const MODAL_ACTION = {
//   VIEW_TASK: 'VIEW_TASK',
//   EDIT_TASK: 'EDIT_TASK',
//   ADD_TASK: 'ADD_TASK',
//   DELETE_TASK: 'DELETE_TASK',
//   ADD_BOARD: 'ADD_BOARD',
//   EDIT_BOARD: 'EDIT_BOARD',
//   DELETE_BOARD: 'DELETE_BOARD',
// }

export enum MODAL_ACTION {
  VIEW_TASK,
  EDIT_TASK,
  ADD_TASK,
  DELETE_TASK,
  ADD_BOARD,
  EDIT_BOARD,
  DELETE_BOARD,
}

const modalAtom = atom<MODAL_ACTION | null>(null)
const shouldShowModalAtom = atom(
  get => get(modalAtom) !== null,
  (get, set) => set(modalAtom, null)
)

export const modalActionAtom = atom(
  modalAtom,
  (get, set, type: MODAL_ACTION | null) => {
    if (type !== null && MODAL_ACTION[type]) {
      set(modalAtom, type)
    }
  }
)

const Modal = () => {
  const [shouldShowModal, hideModal] = useAtom(shouldShowModalAtom)

  return (
    <Dialog.Root open={shouldShowModal}>
      <Dialog.Portal className={pjs.className}>
        <Dialog.Overlay className={styles.dialogOverlay} onClick={hideModal} />
        <Dialog.Content className={styles.dialogContent}>
          <ViewTask />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal

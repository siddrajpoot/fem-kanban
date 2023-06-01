import * as Dialog from '@radix-ui/react-dialog'
import styles from '@/styles/Modal.module.scss'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { useAtom, useSetAtom } from 'jotai'
import ViewTask from './ViewTask'
import classNames from 'classnames'
import { hideActionAtom, shouldShowModalAtom } from '@/jotai/modal'
const pjs = Plus_Jakarta_Sans({ subsets: ['latin'] })

const Modal = () => {
  const [shouldShowModal] = useAtom(shouldShowModalAtom)
  const hideModal = useSetAtom(hideActionAtom)

  return (
    <Dialog.Root open={shouldShowModal}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} onClick={hideModal} />
        <Dialog.Content
          className={classNames(styles.dialogContent, pjs.className)}
        >
          <ViewTask />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal

import * as Dialog from '@radix-ui/react-dialog'
import classNames from 'classnames'
import styles from '@/styles/Modal.module.scss'

const ViewTask = () => {
  return (
    <>
      <Dialog.Title className={styles.dialogTitle}>
        Research pricing points of various competitors and trial different
        business models
      </Dialog.Title>
      <Dialog.Description className={styles.dialogDescription} />
      <Dialog.Close />
    </>
  )
}
export default ViewTask

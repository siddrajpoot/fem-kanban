import * as Dialog from '@radix-ui/react-dialog'
import classNames from 'classnames'
import styles from '@/styles/Modal.module.scss'
import { useAtomValue } from 'jotai'

import ElipIcon from '/public/icon-vertical-ellipsis.svg'
import { selectedTaskSelector } from '@/jotai/tasks'
import { getCompletedSubtasks } from '@/utils/helpers'
import { type SubtasksType } from '@/types'

const ViewTask = () => {
  const selectedTask = useAtomValue(selectedTaskSelector)

  if (!selectedTask) return null

  const { subtasks, title } = selectedTask

  const completedSubtasks = getCompletedSubtasks(subtasks)

  const renderSubtasks = (subtasks: SubtasksType) =>
    subtasks.map(subtask => (
      <div key={`${title}-${subtask.title}`} className={styles.subtasks}>
        <div className={styles.subtask}>
          <input type='checkbox' id={`${title}-${subtask.title}`} />
          <label htmlFor={`${title}-${subtask.title}`}>{subtask.title}</label>
        </div>
      </div>
    ))

  return (
    <>
      <div className={styles.dialogHeader}>
        <Dialog.Title className={styles.dialogTitle}>
          {selectedTask.title}
        </Dialog.Title>
        <button className={styles.elipButton}>
          <ElipIcon />
        </button>
      </div>
      <Dialog.Description className={styles.dialogDescription}>
        {selectedTask.description}
      </Dialog.Description>
      <p className={styles.subtaskTitle}>
        Subtasks ({completedSubtasks} of {subtasks.length})
      </p>
      {renderSubtasks(subtasks)}
      <Dialog.Close />
    </>
  )
}
export default ViewTask

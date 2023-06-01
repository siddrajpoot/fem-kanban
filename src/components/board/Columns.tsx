import { type TasksType, type ColumnsType, MODAL_ACTION } from '@/types'
import styles from '@/styles/Columns.module.scss'
import { getCompletedSubtasks } from '@/utils/helpers'
import { useSetAtom } from 'jotai'
import { modalActionAtom } from '@/jotai/modal'
import { selectedTaskIndexAtom } from '@/jotai/tasks'

const Columns = ({ columns }: { columns: ColumnsType }) => {
  const setModalAction = useSetAtom(modalActionAtom)
  const setSelectedTaskIndex = useSetAtom(selectedTaskIndexAtom)

  const handleTaskClick = (columnIndex: number, taskIndex: number) => {
    setModalAction(MODAL_ACTION.VIEW_TASK)
    setSelectedTaskIndex({ columnIndex, taskIndex })
  }

  const renderColumns = (columns?: ColumnsType) => {
    return (
      <>
        {columns?.map((column, columnIndex) => (
          <div key={column.name} className={styles.column}>
            <p className={styles.columnTitle}>
              {column.name} ({column.tasks.length})
            </p>

            {renderTasks(column.tasks, columnIndex)}
          </div>
        ))}
        <div className={styles.newColumn}>+ New Column</div>
      </>
    )
  }

  const renderTasks = (tasks: TasksType, columnIndex: number) => {
    return tasks.map((task, taskIndex) => {
      const numberOfSubtasks = task.subtasks.length
      const numberOfCompleted = getCompletedSubtasks(task.subtasks)

      return (
        <div
          key={task.title}
          className={styles.task}
          onClick={() => handleTaskClick(columnIndex, taskIndex)}
        >
          <p className={styles.taskTitle}>{task.title}</p>
          <p className={styles.subtask}>
            {numberOfCompleted} of {numberOfSubtasks} subtasks
          </p>
        </div>
      )
    })
  }

  return (
    <>
      {columns?.map((column, columnIndex) => (
        <div key={column.name} className={styles.column}>
          <p className={styles.columnTitle}>
            {column.name} ({column.tasks.length})
          </p>

          {renderTasks(column.tasks, columnIndex)}
        </div>
      ))}
      <div className={styles.newColumn}>+ New Column</div>
    </>
  )
}
export default Columns

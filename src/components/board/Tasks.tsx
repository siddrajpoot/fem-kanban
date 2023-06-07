import { getCompletedSubtasks } from '@/utils/helpers'
import styles from '@/styles/Tasks.module.scss'
import { useBoardStore } from '@/zustand/board'
import { type TaskType } from '@/utils/types'
import { useModalStore } from '@/zustand/modal'

const Tasks = ({
  tasks,
  columnIndex,
}: {
  tasks: TaskType[]
  columnIndex: number
}) => {
  const { updateColumnAndTaskIndex } = useBoardStore()
  const { setModalType } = useModalStore()

  const handleTaskClick = (taskIndex: number) => {
    updateColumnAndTaskIndex(columnIndex, taskIndex)
    setModalType('VIEW_TASK')
  }

  return (
    <>
      {tasks.map((task, taskIndex) => {
        const numberOfSubtasks = task.subtasks.length
        const numberOfCompleted = getCompletedSubtasks(task.subtasks)
        return (
          <div
            key={task.title}
            className={styles.task}
            onClick={() => handleTaskClick(taskIndex)}
          >
            <p className={styles.taskTitle}>{task.title}</p>
            <p className={styles.subtask}>
              {numberOfCompleted} of {numberOfSubtasks} subtasks
            </p>
          </div>
        )
      })}
    </>
  )
}
export default Tasks

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import styles from '@/styles/index.module.scss'
import { type NextPage } from 'next'
import Head from 'next/head'
import { useAtom, useSetAtom } from 'jotai'

import { selectedBoardAtom } from '@/jotai/selectors'
import { type TasksType, type ColumnsType } from '@/types'
import { MODAL_ACTION, modalActionAtom } from '@/components/common/Modal'

const Home: NextPage = () => {
  const [selectedBoard] = useAtom(selectedBoardAtom)
  const setModalAction = useSetAtom(modalActionAtom)

  const handleTaskClick = () => {
    setModalAction(MODAL_ACTION.VIEW_TASK)
  }

  const renderColumns = (columns?: ColumnsType) => {
    return (
      <>
        {columns?.map(column => (
          <div key={column.name} className={styles.column}>
            <p className={styles.columnTitle}>
              {column.name} ({column.tasks.length})
            </p>

            {renderTasks(column.tasks)}
          </div>
        ))}
        <div className={styles.newColumn}>+ New Column</div>
      </>
    )
  }

  const renderTasks = (tasks: TasksType) => {
    return tasks.map(task => {
      const numberOfSubtasks = task.subtasks.length
      const numberOfCompleted = task.subtasks.reduce(
        (prevValue: number, newSubtask) => {
          return newSubtask.isCompleted ? prevValue + 1 : prevValue
        },
        0
      )

      return (
        <div key={task.title} className={styles.task} onClick={handleTaskClick}>
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
      <Head>
        <title>Kanban</title>
      </Head>

      <div className={styles.board}>
        {renderColumns(selectedBoard?.columns)}
      </div>
    </>
  )
}

export default Home

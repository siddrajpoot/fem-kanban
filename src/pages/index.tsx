/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import styles from '@/styles/index.module.scss'
import { type NextPage } from 'next'
import Head from 'next/head'

import initialData from '@/data.json'

export type Board = {
  name: string
  columns: Column[]
}

type Column = {
  name: string
  tasks: Task[]
}

type Task = {
  title: string
  description: string
  status: string
  subtasks: Subtask[]
}

type Subtask = {
  title: string
  isCompleted: boolean
}

const Home: NextPage = () => {
  const selectedBoard = initialData.boards[0] as Board

  const renderColumns = (columns: Column[]) => {
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

  const renderTasks = (tasks: Task[]) => {
    return tasks.map(task => {
      const numberOfSubtasks = task.subtasks.length
      const numberOfCompleted = task.subtasks.reduce(
        (prevValue: number, newSubtask) => {
          return newSubtask.isCompleted ? prevValue + 1 : prevValue
        },
        0
      )

      return (
        <div key={task.title} className={styles.task}>
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

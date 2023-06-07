export type SubtaskType = {
  title: string
  isCompleted: boolean
}

export type TaskType = {
  title: string
  description: string
  status: string
  subtasks: SubtaskType[]
}

export type ColumnType = {
  name: string
  tasks: TaskType[]
}

export type BoardType = {
  name: string
  columns: ColumnType[]
}

import type initialData from '@/data.json'

export type Datatype = typeof initialData

export type BoardsType = Datatype['boards']

export type ColumnsType = BoardsType[number]['columns']

export type TasksType = ColumnsType[number]['tasks']

export type SubtasksType = TasksType[number]['subtasks']

export enum MODAL_ACTION {
  VIEW_TASK,
  EDIT_TASK,
  ADD_TASK,
  DELETE_TASK,
  ADD_BOARD,
  EDIT_BOARD,
  DELETE_BOARD,
}

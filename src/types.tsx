import type initialData from '@/data.json'

export type Datatype = typeof initialData

export type BoardsType = Datatype['boards']

export type ColumnsType = BoardsType[number]['columns']

export type TasksType = ColumnsType[number]['tasks']

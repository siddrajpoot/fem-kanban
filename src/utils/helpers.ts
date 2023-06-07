import { type SubtaskType } from '@/zustand'

export const getCompletedSubtasks = (subtasks: SubtaskType[]) => {
  return subtasks.reduce((prevValue: number, newSubtask) => {
    return newSubtask.isCompleted ? prevValue + 1 : prevValue
  }, 0)
}

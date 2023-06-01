import { type SubtasksType } from '@/types'

export const getCompletedSubtasks = (subtasks: SubtasksType) => {
  return subtasks.reduce((prevValue: number, newSubtask) => {
    return newSubtask.isCompleted ? prevValue + 1 : prevValue
  }, 0)
}

import initialData from "@/data.json";
import { type TaskType, type BoardType, type SubtaskType } from "@/utils/types";
import { produce } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  boards: BoardType[];
  selectedBoardIndex: number;
  selectedColumnIndex: null | number;
  selectedTaskIndex: null | number;
};

type Actions = {
  updateSelectedBoardIndex: (newIndex: State["selectedBoardIndex"]) => void;
  updateColumnAndTaskIndex: (
    columnIndex: State["selectedColumnIndex"],
    taskIndex: State["selectedColumnIndex"]
  ) => void;
  updateSubtask: (subtaskIndex: number, updatedSubtask: SubtaskType) => void;
};

export const useBoardStore = create(
  immer<State & Actions>((set) => ({
    boards: initialData.boards,
    selectedBoardIndex: 0,
    selectedColumnIndex: null,
    selectedTaskIndex: null,
    updateSelectedBoardIndex: (newIndex) =>
      set((state) => {
        state.selectedBoardIndex = newIndex;
      }),
    updateColumnAndTaskIndex: (columnIndex, taskIndex) =>
      set((state) => {
        state.selectedColumnIndex = columnIndex;
        state.selectedTaskIndex = taskIndex;
      }),
    updateSubtask: (subtaskIndex, updatedSubtask) =>
      set((state) => {
        if (
          state.selectedColumnIndex !== null &&
          state.selectedTaskIndex !== null
        ) {
          state.boards[state.selectedBoardIndex].columns[
            state.selectedColumnIndex
          ].tasks[state.selectedTaskIndex].subtasks[subtaskIndex] =
            updatedSubtask;
        }
      }),
  }))
);

export const taskSelector = ({
  boards,
  selectedBoardIndex,
  selectedColumnIndex,
  selectedTaskIndex,
}: State) => {
  if (selectedColumnIndex !== null && selectedTaskIndex !== null) {
    const selectedBoard = boards[selectedBoardIndex];
    const selectedColumn = selectedBoard.columns[selectedColumnIndex];
    const selectedTask = selectedColumn.tasks[selectedTaskIndex];
    return selectedTask;
  } else {
    return null;
  }
};

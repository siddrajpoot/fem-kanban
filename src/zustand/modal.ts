import { create } from "zustand";

type MODAL_ACTION =
  | "VIEW_TASK"
  | "EDIT_TASK"
  | "ADD_TASK"
  | "DELETE_TASK"
  | "ADD_BOARD"
  | "EDIT_BOARD"
  | "DELETE_BOARD";

type State = {
  modalType: null | MODAL_ACTION;
};

type Action = {
  setModalType: (type: State["modalType"]) => void;
};

export const useModalStore = create<State & Action>()((set) => ({
  modalType: null,
  setModalType: (type) => set(() => ({ modalType: type })),
}));

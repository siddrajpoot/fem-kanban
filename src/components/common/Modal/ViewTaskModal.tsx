import * as Dialog from "@radix-ui/react-dialog";
import styles from "@/styles/Modal.module.scss";

import ElipIcon from "/public/icon-vertical-ellipsis.svg";
import { getCompletedSubtasks } from "@/utils/helpers";
import { taskSelector, useBoardStore } from "@/zustand/board";
import { type SubtaskType } from "@/utils/types";
import { Checkbox } from "@/components/ui/checkbox";
import classNames from "classnames";
import { Label } from "@/components/ui/label";

const ViewTaskModal = () => {
  const selectedTask = useBoardStore(taskSelector);
  const { updateSubtask } = useBoardStore();

  if (!selectedTask) return null;

  const { title, subtasks } = selectedTask;

  const completedSubtasks = getCompletedSubtasks(subtasks);

  const handleSubtaskClick = (subtaskIndex: number, subtask: SubtaskType) => {
    const updatedSubtask = { ...subtask, isCompleted: !subtask.isCompleted };
    updateSubtask(subtaskIndex, updatedSubtask);
  };

  const renderSubtasks = (subtasks: SubtaskType[]) => (
    <div className={styles.subtasks}>
      {subtasks.map((subtask, index) => (
        <div
          key={`${title}-${subtask.title}`}
          className={classNames(styles.subtask, {
            [styles.isCompleted]: subtask.isCompleted,
          })}
        >
          <Checkbox
            id={`${title}-${subtask.title}`}
            checked={subtask.isCompleted}
            onClick={() => handleSubtaskClick(index, subtask)}
          />
          <Label htmlFor={`${title}-${subtask.title}`}>{subtask.title}</Label>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className={styles.dialogHeader}>
        <Dialog.Title className={styles.dialogTitle}>
          {selectedTask.title}
        </Dialog.Title>
        <button className={styles.elipButton}>
          <ElipIcon />
        </button>
      </div>
      <Dialog.Description className={styles.dialogDescription}>
        {selectedTask.description}
      </Dialog.Description>
      <p className={styles.subtaskHeader}>
        Subtasks ({completedSubtasks} of {subtasks.length})
      </p>
      {renderSubtasks(subtasks)}
    </>
  );
};
export default ViewTaskModal;

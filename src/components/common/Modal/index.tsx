import * as Dialog from "@radix-ui/react-dialog";
import styles from "@/styles/Modal.module.scss";
import { Plus_Jakarta_Sans } from "next/font/google";
import ViewTaskModal from "./ViewTaskModal";
import classNames from "classnames";
import { useModalStore } from "@/zustand/modal";
import { useBoardStore } from "@/zustand/board";
import AddTaskModal from "./AddTaskModal";
const pjs = Plus_Jakarta_Sans({ subsets: ["latin"] });

const Modal = () => {
  const { modalType, setModalType } = useModalStore();
  const shouldShowModal = Boolean(modalType);

  const { updateColumnAndTaskIndex } = useBoardStore();

  const handleDialogClose = () => {
    setModalType(null);
    updateColumnAndTaskIndex(null, null);
  };

  const handleModalView = () => {
    switch (modalType) {
      case "VIEW_TASK":
        return <ViewTaskModal />;
      case "ADD_TASK":
        return <AddTaskModal />;
      default:
        return null;
    }
  };

  return (
    <Dialog.Root open={shouldShowModal}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={styles.dialogOverlay}
          onClick={handleDialogClose}
        />
        <Dialog.Content
          className={classNames(styles.dialogContent, pjs.className)}
        >
          {handleModalView()}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;

import styles from "@/styles/Navbar.module.scss";
import EllipsisIcon from "/public/icon-vertical-ellipsis.svg";
import { useBoardStore } from "@/zustand/board";
import { useModalStore } from "@/zustand/modal";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { setModalType } = useModalStore();
  const currentBoardName = useBoardStore(
    (state) => state.boards[state.selectedBoardIndex]?.name
  );

  const user = useUser();

  const handleClick = () => {
    setModalType("ADD_TASK");
  };

  return (
    <nav className={styles.navbar}>
      <h3 className={styles.title}>
        <div>{currentBoardName}</div>
        {user.isSignedIn ? <SignOutButton /> : <SignInButton />}
      </h3>
      <button className={styles.addNew} onClick={handleClick}>
        + Add New Task
      </button>
      <EllipsisIcon className={styles.ellipsisIcon} />
    </nav>
  );
};
export default Navbar;

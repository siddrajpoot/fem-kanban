import styles from "@/styles/Navbar.module.scss";
import EllipsisIcon from "/public/icon-vertical-ellipsis.svg";
import { useBoardStore } from "@/zustand/board";

const Navbar = () => {
  const currentBoardName = useBoardStore(
    (state) => state.boards[state.selectedBoardIndex]?.name
  );

  const handleClick = () => {
    console.log("1");
  };

  return (
    <nav className={styles.navbar}>
      <h3 className={styles.title}>{currentBoardName}</h3>
      <button className={styles.addNew} onClick={handleClick}>
        + Add New Task
      </button>
      <EllipsisIcon className={styles.ellipsisIcon} />
    </nav>
  );
};
export default Navbar;

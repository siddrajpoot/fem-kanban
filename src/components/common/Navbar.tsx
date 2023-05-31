import styles from '@/styles/Navbar.module.scss'
import EllipsisIcon from '/public/icon-vertical-ellipsis.svg'
import { useAtomValue } from 'jotai'
import { currentBoardNameSelector } from '@/jotai/selectors'

const Navbar = () => {
  const currentBoardName = useAtomValue(currentBoardNameSelector)

  return (
    <nav className={styles.navbar}>
      <h3 className={styles.title}>{currentBoardName}</h3>
      <button className={styles.addNew}>+ Add New Task</button>
      <EllipsisIcon className={styles.ellipsisIcon} />
    </nav>
  )
}
export default Navbar

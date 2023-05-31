import styles from '@/styles/Navbar.module.scss'
import EllipsisIcon from '/public/icon-vertical-ellipsis.svg'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className={styles.navbar}>
      <h3 className={styles.title}>Platform Launch</h3>
      <button className={styles.addNew}>+ Add New Task</button>
      <EllipsisIcon className={styles.ellipsisIcon} />
    </nav>
  )
}
export default Navbar

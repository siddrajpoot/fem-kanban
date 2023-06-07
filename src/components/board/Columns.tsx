import styles from '@/styles/Columns.module.scss'
import Tasks from './Tasks'
import { type ColumnType } from '@/utils/types'

const Columns = ({ columns }: { columns: ColumnType[] }) => {
  return (
    <>
      {columns?.map((column, columnIndex) => (
        <div key={column.name} className={styles.column}>
          <p className={styles.columnTitle}>
            {column.name} ({column.tasks.length})
          </p>
          <Tasks tasks={column.tasks} columnIndex={columnIndex} />
        </div>
      ))}
      <div className={styles.newColumn}>+ New Column</div>
    </>
  )
}
export default Columns

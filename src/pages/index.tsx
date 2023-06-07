import styles from '@/styles/index.module.scss'
import { type NextPage } from 'next'
import Head from 'next/head'
import Columns from '@/components/board/Columns'
import { useBoardStore } from '@/zustand/board'

const Home: NextPage = () => {
  const selectedBoard = useBoardStore(
    state => state.boards[state.selectedBoardIndex]
  )

  return (
    <>
      <Head>
        <title>Kanban</title>
      </Head>

      <div className={styles.board}>
        <Columns columns={selectedBoard.columns} />
      </div>
    </>
  )
}

export default Home

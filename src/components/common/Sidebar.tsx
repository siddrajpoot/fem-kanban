/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styles from '@/styles/Sidebar.module.scss'

import LogoDark from '/public/logo-dark.svg'
import BoardIcon from '/public/icon-board.svg'
import LightThemeIcon from '/public/icon-light-theme.svg'
import DarkThemeIcon from '/public/icon-dark-theme.svg'
import HideIcon from '/public/icon-hide-sidebar.svg'

import initialData from '@/data.json'
import { type Board } from '@/pages'

const boardsData: Board[] = initialData.boards

// type Props = {}
const Sidebar = () => {
  const renderCreateBoardButton = () => {
    return (
      <button className={styles.createButton}>
        <BoardIcon alt='board-icon' className={styles.listIcon} />
        Create New Board
      </button>
    )
  }

  const renderListOfBoards = (boards: Board[]) => {
    return boards.map(board => (
      <div key={board.name} className={styles.listItem}>
        <BoardIcon alt='board-icon' className={styles.listIcon} />
        <p className={styles.name}>{board.name}</p>
      </div>
    ))
  }

  const renderBottomControls = () => {
    return (
      <div className={styles.bottomControls}>
        <div className={styles.displayControl}>
          <LightThemeIcon />
          {renderSwitch()}
          <DarkThemeIcon />
        </div>

        <div className={styles.hideControl}>
          <HideIcon className={styles.hideIcon} />
          Hide Sidebar
        </div>
      </div>
    )
  }

  const renderSwitch = () => {
    return (
      <>
        <input className={styles.switchCheckbox} id='switch' type='checkbox' />
        <label className={styles.switchLabel} htmlFor='switch'>
          <span className={styles.switchButton} />
        </label>
      </>
    )
  }

  return (
    <div className={styles.sidebar}>
      <LogoDark alt='logo-dark' className={styles.logo} />

      <div className={styles.list}>
        <p className={styles.title}>All Boards ({boardsData.length})</p>
        {renderListOfBoards(boardsData)}
      </div>

      {renderCreateBoardButton()}

      {renderBottomControls()}
    </div>
  )
}
export default Sidebar

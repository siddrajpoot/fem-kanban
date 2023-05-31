/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styles from '@/styles/Sidebar.module.scss'

import LogoDark from '/public/logo-dark.svg'
import BoardIcon from '/public/icon-board.svg'
import LightThemeIcon from '/public/icon-light-theme.svg'
import DarkThemeIcon from '/public/icon-dark-theme.svg'
import HideIcon from '/public/icon-hide-sidebar.svg'
import { useAtom, useAtomValue } from 'jotai'
import { boardStateAtom, currentBoardIndexSelector } from '@/jotai/atoms'
import { boardsListSelector } from '@/jotai/selectors'
import classNames from 'classnames'

const Sidebar = () => {
  const boardState = useAtomValue(boardStateAtom)
  const [currentBoardIndex, setCurrentBoardIndex] = useAtom(
    currentBoardIndexSelector
  )
  const [boardList] = useAtom(boardsListSelector)

  const handleListClick = (index: number) => {
    setCurrentBoardIndex(index)
  }

  const renderCreateBoardButton = () => {
    return (
      <button className={styles.createButton}>
        <BoardIcon alt='board-icon' className={styles.listIcon} />
        Create New Board
      </button>
    )
  }

  const renderListOfBoards = () => {
    return boardList.map((board, index) => (
      <div
        key={board}
        className={classNames(styles.listItem, {
          [styles.active]: index === currentBoardIndex,
        })}
        onClick={() => handleListClick(index)}
      >
        <BoardIcon alt='board-icon' className={styles.listIcon} />
        <p className={styles.name}>{board}</p>
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
        <p className={styles.title}>All Boards ({boardState.length})</p>
        {renderListOfBoards()}
      </div>

      {renderCreateBoardButton()}

      {renderBottomControls()}
    </div>
  )
}
export default Sidebar

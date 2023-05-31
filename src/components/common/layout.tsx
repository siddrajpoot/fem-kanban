import React, { type PropsWithChildren } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Plus_Jakarta_Sans } from 'next/font/google'
import styles from '@/styles/layout.module.scss'
import classNames from 'classnames'

const pjs = Plus_Jakarta_Sans({ subsets: ['latin'] })

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={classNames(pjs.className, styles.layout)}>
      <Sidebar />
      <Navbar />
      <main className={styles.mainBoard}>{children}</main>
    </div>
  )
}

export default Layout

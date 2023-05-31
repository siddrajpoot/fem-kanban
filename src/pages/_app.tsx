/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import { api } from '@/utils/api'
import Modal from '@/components/common/Modal'

import '@/styles/reset.css'
import '@/styles/globals.scss'
import Layout from '@/components/common/layout'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
        <Modal />
      </Layout>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)

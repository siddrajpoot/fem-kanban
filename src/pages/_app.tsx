/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type Session } from "next-auth";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import Modal from "@/components/common/Modal";

import "@/styles/reset.css";
import "@/styles/globals.scss";
import Layout from "@/components/common/layout";
import { ClerkProvider } from "@clerk/nextjs";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  return (
    <ClerkProvider>
      <Layout>
        <Component {...pageProps} />
        <Modal />
      </Layout>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);

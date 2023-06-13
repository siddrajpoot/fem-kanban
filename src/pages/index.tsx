import styles from "@/styles/index.module.scss";
import { type NextPage } from "next";
import Head from "next/head";
import Columns from "@/components/board/Columns";
import { useBoardStore } from "@/zustand/board";
import { api } from "@/utils/api";

const Home: NextPage = () => {
  const selectedBoard = useBoardStore(
    (state) => state.boards[state.selectedBoardIndex]
  );

  const { data } = api.posts.getAll.useQuery();

  console.log(data);

  return (
    <>
      <Head>
        <title>Kanban</title>
      </Head>

      <div className={styles.board}>
        {/* <Columns columns={selectedBoard.columns} /> */}
        {data?.map((task) => (
          <div key={task.id}>{task.title}</div>
        ))}
      </div>
    </>
  );
};

export default Home;

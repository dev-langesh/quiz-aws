import Head from "next/head";
import Form from "../components/form/Form";
import { connectDB } from "../utils/connectDB";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Quiz Time</title>
      </Head>
      <Form />
    </div>
  );
}

export function getServerSideProps() {
  connectDB();

  return {
    props: {},
  };
}

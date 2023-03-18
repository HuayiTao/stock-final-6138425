import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>WEb Application Final Exam</title>
      </Head>
      <h1>Huayi Tao</h1>
      <h2>6138425</h2>
      <p>Click below link to exam pages</p>
      <Link href="/suppliers">Suppliers</Link>
    </div>
  );
}
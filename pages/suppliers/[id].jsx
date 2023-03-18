import Head from "next/head";
import Link from "next/link";
import axios from "axios";

export default function Supplier({ supplier }) {
  console.log("supplier 2", supplier);
  if (!supplier)
    return (
      <div>
        <p>Supplier not found</p>
        <Link href="/suppliers">Back</Link>
      </div>
    );

  return (
    <>
      <Head>
        <title>{supplier.supplier_name}</title>
      </Head>
    
      <form>
        <h1>{supplier.supplier_name}</h1>
        <p>Phone Number: {supplier.phone_number}</p>
        <p>Email: {supplier.email}</p>
        <p>Address: {supplier.address}</p>
      </form>

      <Link href="/suppliers">
        Back
      </Link>
    </>
  );
}

export async function getServerSideProps({ params }) {
  console.debug("params", params);
  try {
    const response = await axios.get(
      `https://stock-final-6138425.vercel.app/api/suppliers/profile/${params.id}`
    );
    const supplier = response.data;
    console.debug("supplier 1", supplier);
    return { props: { supplier } };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}
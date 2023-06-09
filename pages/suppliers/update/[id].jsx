import Head from "next/head";
import Link from "next/link";
import axios from "axios";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Supplier({ supplier }) {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState("");

  useEffect(() => {
    reset(supplier);
  }, []);

  const updateSupplier = async (data) => {
    const response = await fetch(`/api/suppliers/prfile/${supplier._id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // serialisation
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const result = await response.json(); // deserialise
    if (result.error) {
      alert("Error: " + result.error);
    } else {
      alert("Supplier updated");
      window.location.href = "/suppliers";
    }
    console.log(result);
    setData(JSON.stringify(data));
  };

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
        <title>Update {supplier.supplier_name}</title>
      </Head>

      <div>
        <form onSubmit={handleSubmit(updateSupplier)}>
          <h1>Update Supplier</h1>
          <label htmlFor="supplier_name">Supplier Name</label>
          <br />
          <input
            id="supplier_name"
            {...register("supplier_name", { required: true })}
            placeholder="Supplier Name"
          />
          <br />

          <label htmlFor="phone_number">Phone Number</label>
          <br />
          <input
            id="phone_number"
            {...register("phone_number", { required: true })}
            placeholder="Phone Number"
          />
          <br />

          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          <br />

          <label htmlFor="address">Address</label>
          <br />
          <input
            id="address"
            {...register("address", { required: true })}
            placeholder="Address"
          />
          <br />

          <input type="submit" />
        </form>

        <Link href="/suppliers">
          Back
        </Link>

      </div>
    </>
  );
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug("params", params);
  const res = await axios.get(
    `"https://stock-final-6138425.vercel.app/api/suppliers/profile/"${params.id}`
  );
  const supplier = res.data;
  console.debug("supplier 1", supplier);
  return { props: { supplier } };
}
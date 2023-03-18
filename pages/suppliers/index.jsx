import Head from "next/head";
import Link from "next/link";
import axios from "axios";

export default function Home({ suppliers }) {
  function deleteSupplier(id) {
    fetch(`/api/suppliers/profile/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // alert("Deleting " + id)
        window.location.reload(false);
      });
  }

  const sortedSuppliers = suppliers

  return (
    <>
    <style jsx>{`
        h1 {
          margin-top: 1%;
          margin-bottom: 2%;
          color: #7FFFD4;
        }
        table {
          border-spacing: 0 5px;
          width: 100%;
          max-width: 1000px;
          text-align: center;
        
        }
        th {
          background-color: #778899;
          padding: 12px;
        }
        td {
          border: none;
          padding: 12px;
          background-color: #696969;
        }

        .delete-button {
          background-color: #B22222;
          padding: 8px 16px;
        }
        
        p {
           margin-left: 2rem;
           margin-bottom: 2rem;
        }
      `}</style>
      <Head>
        <title>Suppliers</title>

      </Head>
      <h1>Suppliers</h1>

      <table>
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {sortedSuppliers.map((supplier) => {
            return (
              <tr key={supplier._id}>
                <td>
                  <Link
                    href={`/suppliers/${supplier._id}`}
                    style={{
                      color: "#7FFFD4",
                      borderBottom: "1px solid #7FFFD4",
                    }}
                  >
                    {supplier.supplier_name}
                  </Link>
                </td>
                <td>{supplier.phone_number}</td>
                <td>{supplier.email}</td>
                <td>{supplier.address}</td>
                <td>
                  {
                    <>
                      <Link
                        href={`/suppliers/update/${supplier._id}`}
                        style={{
                          color: "#7FFFD4",
                        }}
                      >
                        Update
                      </Link>
                      &nbsp;&nbsp;&nbsp;
                      <button
                        onClick={() => deleteSupplier(supplier._id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </>
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        <Link
          href="/suppliers/add"
          style={{
            color: "#7FFFD4",
            padding: "3px 8px",
          }}
          hover={{}}
        >
          Add New Supplier
        </Link>
      </p>
    </>
  );
}
export async function getServerSideProps() {
  const response = await axios.get(
    "https://stock-final-6138425.vercel.app/api/suppliers/profile/"
  );
  const suppliers = response.data;
  // console.debug('supplier 1', suppliers)
  return { props: { suppliers } };
}
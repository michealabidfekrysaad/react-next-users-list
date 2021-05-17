import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const getStaticPaths = async () => {
  let data = [];
  await axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
    data = res.data;
  });
  const paths = data.map((user) => {
    return {
      params: { id: user.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  let person = '';
  await axios
    .get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((res) => {
      person = res.data;
    });
  return { props: { person: person } };
};

const Details = ({ person }) => {
  const [status, setStatus] = useState(true);
  let history = useRouter();

  return (
    <>
      <Head>
        <title>User Info</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="User Info" key="title" />
      </Head>
      <div className="card">
        <div className="card-header flexActive">
          {person.id}-{person.name}
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={status}
              onChange={() => {
                setStatus(!status);
              }}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              <span
                data-testid="spanActive"
                className={`text-${status ? 'success' : 'danger'}`}
              >{`${status ? 'Active' : 'InActive'}`}</span>
            </label>
          </div>
        </div>
        <div className="card-body flexActive">
          <div>
            <h5 className="card-title">Email:- {person.email}</h5>
            <p className="card-text">Company:- {person.company.name}</p>
            <p className="card-text">Phone:- {person.phone}</p>
          </div>
          <div className="btnLink">
            <Link href={history.pathname.slice(0, -5)}>Back</Link>
            {/* <a href={history.pathname.slice(0, -5)}>Back</a> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;

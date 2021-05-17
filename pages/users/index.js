import styles from '../../styles/Users.module.css';
import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head';

export const getStaticProps = async () => {
  let allPersons = '';
  await axios.get(`https://jsonplaceholder.typicode.com/users/`).then((res) => {
    allPersons = res.data;
  });
  return { props: { allPersons: allPersons } };
};

const Users = ({ allPersons }) => {
  return (
    <>
      <Head>
        <title>Users List</title>
        <meta name="keywords" content="Users List" />
        <meta property="og:title" content="Users List" key="title" />
      </Head>
      <h1>All Users:</h1>
      {allPersons.map((singleUser) => {
        return (
          <Link href={`/users/${singleUser.id}`} key={singleUser.id}>
            <a className={styles.single}>
              <h1>{singleUser.name}</h1>
              <h4>Phone:-&nbsp;{singleUser.phone}</h4>
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default Users;

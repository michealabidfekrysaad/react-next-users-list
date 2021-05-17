import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter, Router } from 'next/router';

const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, []);
  return (
    <div className="not-found">
      <h1>Ooooops ....</h1>
      <h2>This page not found</h2>
      <p>
        Go back to{' '}
        <Link href="/">
          <a>HomePage</a>
        </Link>
      </p>
    </div>
  );
};

export default NotFound;

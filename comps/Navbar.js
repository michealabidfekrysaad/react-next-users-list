import Link from 'next/link';
import Image from 'next/image';

const Navbar = ({ privateRoute }) => {
  return (
    <nav>
      <div className="logo">
        <Image src="/logo1.png" width={120} height={80} />
      </div>
      {!privateRoute && (
        <>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </>
      )}
      {privateRoute && (
        <div className="flexBox">
          <span>Welcome: {privateRoute.email.split('@')[0]}</span>
          <div>
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/users">
              <a>Users-listing</a>
            </Link>
            <Link href="/login">
              <a
                onClick={() => {
                  localStorage.removeItem('Login');
                }}
              >
                Logout
              </a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

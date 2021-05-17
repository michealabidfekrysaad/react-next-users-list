import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  let history = useRouter();

  const [privateRoute, setPrivateRoute] = useState(false);
  useEffect(() => {
    setPrivateRoute(JSON.parse(localStorage.getItem('Login')));
  }, [history.pathname]);

  return (
    <div className="container">
      <Navbar privateRoute={privateRoute} />
      <div className="mainContent">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

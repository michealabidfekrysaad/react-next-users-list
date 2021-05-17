import { Fragment } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Head from 'next/head';

const Login = () => {
  const history = useRouter();
  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string().email('Must be valid E-mail').required('Required'),
    password: Yup.string()
      .required('Required')
      .min(5, 'Password too short (5) '),
  });
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.resetForm();
    localStorage.setItem('Login', JSON.stringify(values));
    setTimeout(() => {
      history.push('/');
    }, 1000);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <Fragment>
      <Head>
        <title>Login</title>
        <meta name="keywords" content="Login" />
        <meta property="og:title" content="Login" key="title" />
      </Head>
      <div className="mt-5 w-50 mx-auto">
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className={
                !(formik.errors.email && formik.touched.email)
                  ? 'form-control'
                  : 'form-control border border-danger'
              }
              id="email"
              placeholder="enter email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <small className="form-text text-muted">
              {formik.errors.email && formik.touched.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : (
                <span>It must be valid email address</span>
              )}
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={
                !(formik.errors.password && formik.touched.password)
                  ? 'form-control'
                  : 'form-control border border-danger'
              }
              id="password"
              name="password"
              placeholder="enter password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <small className="form-text text-muted">
              {formik.errors.password && formik.touched.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : (
                <span>Enter Strong password</span>
              )}
            </small>
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className={
                !(formik.isValid && formik.dirty)
                  ? 'btn btn-secondary'
                  : 'btn btn-outline-primary'
              }
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;

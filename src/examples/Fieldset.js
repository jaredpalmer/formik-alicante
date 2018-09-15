import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Debug } from '../Debug';

function Fieldset(props) {
  return (
    <React.Fragment>
      <Field {...props} />
      <ErrorMessage name={props.name} component="div" className="error" />
    </React.Fragment>
  );
}

// While you can use any validation library (or write you own), Formik
// comes with special support for Yup by @jquense. It has a builder API like
// React PropTypes / Hapi.js's Joi. You can define these inline or, you may want
// to keep them separate so you can reuse schemas (e.g. address) across your application.
const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  firstName: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(20, 'Nice try, nobody has a first name that long')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(20, 'Nice try, nobody has a last name that long')
    .required('Required'),
});

const SignUp = () => (
  <div>
    <h1>Sign up</h1>
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
      }}
      validationSchema={SignUpSchema}
      onSubmit={values => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
      render={({ errors, touched }) => (
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Fieldset name="firstName" placeholder="Jane" type="text" />

          {errors.firstName &&
            touched.firstName && (
              <div className="field-error">{errors.firstName}</div>
            )}

          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" placeholder="Doe" type="text" />

          {errors.lastName &&
            touched.lastName && (
              <div className="field-error">{errors.lastName}</div>
            )}

          <label htmlFor="email">Email</label>
          <Field name="email" placeholder="jane@acme.com" type="email" />

          {errors.email &&
            touched.email && <div className="field-error">{errors.email}</div>}

          <button type="submit">Submit</button>
          <Debug />
        </Form>
      )}
    />
  </div>
);

export default SignUp;

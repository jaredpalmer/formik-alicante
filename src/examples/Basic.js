import React from 'react';
import { Formik, FastField, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Debug } from '../components/Debug';

const Fieldset = ({ label, name, ...props }) => (
  <React.Fragment>
    <label htmlFor={name}>{label}</label>
    <FastField name={name} {...props} />
    <ErrorMessage name={name}>
      {msg => <div className="field-error">{msg}</div>}
    </ErrorMessage>
  </React.Fragment>
);

const Basic = () => (
  <div>
    <h1>Sign Up</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required('Required!'),
        lastName: Yup.string().required('Required!'),
        email: Yup.string()
          .email('Invalid email')
          .required('Required!'),
      })}
      onSubmit={values => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
      render={({
        handleSubmit,
        handleReset,
        isSubmitting,
        errors,
        touched,
      }) => (
        <Form>
          <Fieldset
            name="firstName"
            label="First Name"
            type="text"
            placeholder="jane"
          />
          <Fieldset
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Doe"
          />
          <Fieldset
            name="email"
            label="Email"
            placeholder="jane@acme.com"
            type="email"
          />

          <button type="reset" className="secondary" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" disable={isSubmitting}>
            Submit
          </button>
          <Debug />
        </Form>
      )}
    />
  </div>
);

export default Basic;

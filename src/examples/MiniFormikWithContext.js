import React from 'react';

const MiniFormikContext = React.createContext(null);

class MiniFormik extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.initialValues || {},
      touched: {},
      errors: {},
    };
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    event.persist();

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };

  handleBlur = event => {
    const target = event.target;
    const name = target.name;
    event.persist();
    this.setState(prevState => ({
      touched: {
        ...prevState.touched,
        [name]: true,
      },
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    // touch all fields
    // set submitting
    // validating
    this.props.onSubmit(this.state.values);
  };

  render() {
    console.log(this.state);
    const ctx = {
      ...this.state,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
      handleSubmit: this.handleSubmit,
    };
    return (
      <MiniFormikContext.Provider value={ctx}>
        {this.props.children(ctx)}
      </MiniFormikContext.Provider>
    );
  }
}

const withMiniFormik = Comp => props => (
  <MiniFormikContext.Consumer>
    {formik => <Comp formik={formik} {...props} />}
  </MiniFormikContext.Consumer>
);

const Field = withMiniFormik(
  ({ component = 'input', formik, children, ...props }) => {
    const fieldProps = {
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      [props.type === 'checkbox' ? 'checked' : 'value']: formik.values[
        props.name
      ],
    };
    if (typeof children === 'function') {
      return children(fieldProps);
    }

    return React.createElement(
      component,
      { ...fieldProps, ...props },
      children
    );
  }
);

export default class Reservation extends React.Component {
  handleSubmit = values => {
    alert(JSON.stringify(values, null, 2));
  };

  render() {
    return (
      <MiniFormik
        onSubmit={this.handleSubmit}
        initialValues={{ isGoing: 'hello', numberOfGuests: 0 }}
      >
        {({ values, touched, error, handleBlur, handleChange, handleSubmit }) =>
          console.log(values) || (
            <form onSubmit={handleSubmit}>
              <label>
                Is going:
                <Field name="isGoing" type="checkbox" value="hello" />
              </label>
              <br />
              <label>
                Number of guests:
                <Field name="numberOfGuests" type="number" />
              </label>
            </form>
          )
        }
      </MiniFormik>
    );
  }
}

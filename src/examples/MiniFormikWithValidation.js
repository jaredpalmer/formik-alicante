import React from 'react';

class MiniFormik extends React.Component {
  state = {
    values: this.props.initalValues || {},
    touched: {},
    errors: {},
    isValidating: false,
    isSubmitting: false,
    submitCOUnt: 0,
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    event.persist();
    this.setState(
      prevState => ({
        values: {
          ...prevState.values,
          [name]: value,
        },
      }),
      () => {
        this.executeValidate();
      }
    );
  };

  executeValidate = (values = this.state) => {
    if (this.props.validate) {
      Promise.resolve(this.props.validate(values)).then(errors =>
        this.setState({ errors })
      );
    }
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
    this.executeValidate();
  };

  handleSubmit = event => {
    event.preventDefault();
    //
    Promise.resolve(this.props.validate(this.state.values)).then(errors => {
      this.setState({ errors }, () => {
        if (Object.keys(this.state.errors).length === 0)
          this.props.onSubmit(this.state.values);
      });
    });
  };

  render() {
    return this.props.children({
      ...this.state,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
      handleSubmit: this.handleSubmit,
    });
  }
}

export default class Reservation extends React.Component {
  handleSubmit(values) {
    alert(JSON.stringify(values, null, 2));
  }

  render() {
    return (
      <MiniFormik
        initialValues={{
          isGoing: true,
          numberOfGuests: 2,
        }}
        onSubmit={this.handleSubmit}
        validate={values => {
          let errors = {};
          if (true) {
            errors.numberOfGuests = `Can't have negative humans!`;
          }

          return errors;
        }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <label>
              Is going:
              <input
                name="isGoing"
                type="checkbox"
                checked={values.isGoing}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
            <br />
            <label>
              Number of guests:
              <input
                name="numberOfGuests"
                type="number"
                value={values.numberOfGuests}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
            <pre>
              {JSON.stringify(
                {
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                },
                null,
                2
              )}
            </pre>
          </form>
        )}
      </MiniFormik>
    );
  }
}

import React, { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';
import api from '../db';

const CustomFormField = (props) => {
  const { shouldValidate, setFieldValue, setFieldError, name, hr } = props;

  const checkUsernameEmail = async (emailOrUsername) => {
    const message = await api
      .post('/user', emailOrUsername)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err);
      });
    if (message) {
      setFieldError(Object.keys(emailOrUsername)[0], message);
    }
  };
  const handleChange = (e) => {
    setFieldValue(name, e.target.value);

    if (name === 'email' || name === 'username') {
      checkUsernameEmail({ [name]: e.target.value });
    }
  };
  return (
    <Fragment>
      <Field {...props} {...(shouldValidate ? { onChange: handleChange } : {})} />
      <ErrorMessage name={name}>{(msg) => <p style={{ color: 'red' }}>{msg}</p>}</ErrorMessage>
      {hr && <hr />}
    </Fragment>
  );
};

export default CustomFormField;

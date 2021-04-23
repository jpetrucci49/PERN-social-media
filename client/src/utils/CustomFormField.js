import React, { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';

const CustomFormField = (props) => {
  return (
    <Fragment>
      <Field {...props} />
      <ErrorMessage name={props.name}>
        {(msg) => <p style={{ color: 'red' }}>{msg}</p>}
      </ErrorMessage>
      {props.hr && <hr />}
    </Fragment>
  );
};

export default CustomFormField;

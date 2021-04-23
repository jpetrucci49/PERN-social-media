import React, { Fragment, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import CustomFormField from '../utils/CustomFormField';
import './LoginRegisterModal.scss';

import { emailSignInStart, signUpStart } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    flexDirection: 'column',
    textAlign: 'center',
    border: '2px solid #000',
    flexGrow: 0.5,
    justifyContent: 'center',
    maxWidth: '750px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0.6,
    justifyItems: 'center',
  },
  field: {
    textAlign: 'center',
  },
  button: {
    display: 'flex',
    flexGrow: 0.5,
  },
  span: {
    cursor: 'pointer',
    color: 'blue',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const LoginRegisterModal = ({ emailSignInStart, signUpStart, formVersion }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [currentFormVersion, setCurrentFormVersion] = useState(formVersion);
  const [isRegister, setIsRegister] = useState(true);

  useEffect(() => {
    setIsRegister(currentFormVersion === 'register');
  }, [currentFormVersion]);

  const formProps = {
    initialValues: {
      email: '',
      password: '',
      ...(isRegister
        ? { confirmPassword: '', username: '', firstName: '', lastName: '', userName: '' }
        : {}),
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Sorry, this is required')
        .email('Sorry, this must be email format'),
      password: Yup.string()
        .required('Sorry, this is required')
        .min(6, 'Password must be at least 6 characters'),
      ...(isRegister
        ? {
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
            firstName: Yup.string().required('Sorry, this is required'),
            lastName: Yup.string().required('Sorry, this is required'),
            username: Yup.string().required('Sorry, this is required'),
          }
        : {}),
    }),
  };

  return (
    <div>
      <button
        type='button'
        onClick={() => {
          setOpen(true);
        }}
      >
        {formVersion[0].toUpperCase() + formVersion.slice(1)}
      </button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Formik
              initialValues={formProps.initialValues}
              validationSchema={formProps.validationSchema}
              onSubmit={(values, { resetForm }) => {
                if (isRegister) {
                  try {
                    signUpStart(values);
                    setOpen(false);
                  } catch (err) {
                    throw new Error(err);
                  }
                } else {
                  try {
                    emailSignInStart(values.email, values.password);
                    setOpen(false);
                  } catch (err) {
                    throw new Error(err);
                  }
                }
                resetForm({});
              }}
              validateOnMount={true}
            >
              {({ isValid }) => {
                return (
                  <Form className={classes.form}>
                    {isRegister ? (
                      <Fragment>
                        <CustomFormField
                          hr
                          name='firstName'
                          type='text'
                          placeholder='First Name'
                          className={classes.field}
                        />
                        <CustomFormField
                          hr
                          name='lastName'
                          type='text'
                          placeholder='Last Name'
                          className={classes.field}
                        />
                        <CustomFormField
                          hr
                          name='username'
                          type='text'
                          placeholder='Username'
                          className={classes.field}
                        />
                      </Fragment>
                    ) : null}
                    <CustomFormField
                      hr
                      name='email'
                      type='email'
                      placeholder='Email'
                      className={classes.field}
                    />
                    <CustomFormField
                      hr
                      name='password'
                      type='password'
                      placeholder='Password'
                      className={classes.field}
                    />
                    {isRegister ? (
                      <CustomFormField
                        hr
                        name='confirmPassword'
                        type='password'
                        placeholder='Confirm Password'
                        className={classes.field}
                      />
                    ) : null}
                    <Button disabled={!isValid} color='primary' variant='contained' type='submit'>
                      Submit
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            <p>
              {`${isRegister ? 'Already' : "Don't"}`} have an account?{' '}
              <span
                className={classes.span}
                onClick={() => setCurrentFormVersion(isRegister ? 'login' : 'register')}
              >
                {isRegister ? 'Login' : 'Register'}
              </span>
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
  signUpStart: (values) => dispatch(signUpStart(values)),
});

export default connect(null, mapDispatchToProps)(LoginRegisterModal);

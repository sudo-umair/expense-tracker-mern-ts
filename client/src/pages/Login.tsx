import React from 'react';
import { Box, Button, Heading, useToast } from '@chakra-ui/react';
import TextInput from 'components/UI/TextInput';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { handleApi } from 'utils/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { login } from 'redux/user';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .min(5, 'Email is too short'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password is too short'),
});

type AxiosResponse = {
  status: number;
  data: {
    message: string;
    user?: Object;
  };
};

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    console.log(values);
    try {
      setIsLoading(true);
      const response: AxiosResponse = await handleApi(
        '/user/login',
        'POST',
        values
      );
      setIsLoading(false);
      toast({
        title: response.status === 200 ? 'Success' : 'Warning',
        description: response.data.message,
        status: response.status === 200 ? 'success' : 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });

      if (response.status === 200) {
        dispatch(login(response.data.user));
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      width={'100%'}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Box width='100%' maxWidth='400px'>
        <Heading
          style={{
            textAlign: 'center',
            margin: '1rem 0rem',
          }}
          fontFamily='Comic Neue, cursive'
        >
          Login
        </Heading>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnMount={false}
          validateOnBlur={false}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextInput
                label='Email Address'
                name='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
              />
              <TextInput
                label='Password'
                name='password'
                type='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
              />

              <Button
                type='submit'
                width='100%'
                style={{
                  marginTop: '1rem',
                }}
                styleConfig={{
                  baseStyle: {
                    color: 'white',
                    padding: '0.5rem',
                    backgroundColor: 'blue.500',
                    _hover: {
                      backgroundColor: 'blue.600',
                    },
                    _active: {
                      backgroundColor: 'blue.700',
                    },
                  },
                }}
                _loading={{
                  backgroundColor: 'blue.700',
                }}
                loadingText='Processing, please wait...'
                isLoading={isLoading}
              >
                Login
              </Button>
            </form>
          )}
        </Formik>
        <Box textAlign='center' style={{ marginTop: '1rem' }}>
          Don't have an account?{' '}
          <Button
            variant='link'
            style={{
              padding: '0rem',
              margin: '0rem',
            }}
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

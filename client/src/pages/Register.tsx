import React from 'react';
import { Box, Button, Heading, useToast } from '@chakra-ui/react';
import TextInput from 'components/UI/TextInput';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { handleApi } from 'utils/axios';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required').min(5, 'Name is too short'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .min(5, 'Email is too short'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password is too short'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

type AxiosResponse = {
  status: number;
  data: {
    message: string;
  };
};

export default function Register() {
  const toast = useToast();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    console.log(values);
    try {
      setIsLoading(true);
      const response: AxiosResponse = await handleApi(
        '/user/register',
        'POST',
        values
      );
      setIsLoading(false);
      toast({
        title: response.status === 201 ? 'Success' : 'Warning',
        description: response.data.message,
        status: response.status === 201 ? 'success' : 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });

      if (response.status === 201) {
        navigate('/login');
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
      margin={'1rem 0'}
    >
      <Box width='100%' maxWidth='400px'>
        <Heading
          style={{
            textAlign: 'center',
          }}
          fontFamily='Comic Neue, cursive'
        >
          Register
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
                label='Name'
                name='name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
              />
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
              <TextInput
                label='Confirm Password'
                name='confirmPassword'
                type='password'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
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
                isLoading={isLoading}
                _loading={{
                  backgroundColor: 'blue.500',
                }}
                loadingText='Processing, please wait...'
              >
                Register
              </Button>
            </form>
          )}
        </Formik>
        <Box textAlign='center' style={{ marginTop: '1rem' }}>
          Already have an account?{' '}
          <Button
            variant='link'
            style={{
              padding: '0rem',
              margin: '0rem',
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

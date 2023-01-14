import React from 'react';
import {
  Box,
  Button,
  Heading,
  useToast,
  Textarea,
  Text,
} from '@chakra-ui/react';
import TextInput from 'components/UI/TextInput';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { handleApi } from 'utils/axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

type AxiosResponse = {
  status: number;
  data: {
    message: string;
    user?: Object;
  };
};

export default function UpdateExpense() {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    _id: location.state._id || '',
    title: location.state.title as string,
    amount: (location.state.amount as string) ?? '',
    date: location.state.date as string,
    description: location.state.description || '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').min(5, 'Too short'),
    amount: Yup.number().required('Amount is required'),
    date: Yup.date().required('Date is required'),
    description: Yup.string(),
  });

  const { email, token } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    console.log(values);
    try {
      setIsLoading(true);
      console.log(values);
      const response: AxiosResponse = await handleApi(
        '/expense/update',
        'POST',
        {
          ...values,
          email,
          token,
        }
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
          Update Expense
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
                name='title'
                label='Title'
                value={values.title}
                placeholder='Enter title'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.title}
                touched={touched.title}
              />
              <TextInput
                name='amount'
                label='Amount'
                value={values.amount}
                placeholder='0.00'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.amount}
                touched={touched.amount}
                showLeftAddon={true}
                leftAddon='Rs.'
              />
              <TextInput
                name='date'
                label='Date'
                type='date'
                placeholder='Enter date'
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.date}
                touched={touched.date}
              />
              <Text mb='8px'>Description</Text>
              <Textarea
                name='description'
                placeholder='Enter description'
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                size='sm'
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
                Update Expense
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

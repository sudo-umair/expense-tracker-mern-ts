import { Box, Heading } from '@chakra-ui/react';
import { AddIcon, SpinnerIcon } from '@chakra-ui/icons';
import { GLOBAL_STYLES as GS } from 'utils/constants';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseItem from 'components/ExpenseItem';
import { handleApi } from 'utils/axios';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

export default function Home() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const { email, token } = user;

  useEffect(() => {
    const getExpenses = async () => {
      try {
        setLoading(true);
        await handleApi('/expense/get', 'POST', {
          email,
          token,
        })
          .then((response) => {
            console.log(response.data.expenses);
            setExpenses(response.data.expenses.reverse());
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    };

    getExpenses();
  }, [email, token, refresh]);

  return (
    <Box width={'100%'}>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Heading margin={'1rem 0rem'} fontFamily='Comic Neue, cursive'>
          Your Expenses
        </Heading>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'row'}
        flexWrap={'wrap'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {loading ? (
          <SpinnerIcon
            style={{
              height: '40px',
              width: '40px',
              color: GS.primary,
            }}
          />
        ) : (
          expenses.map((expense: any) => (
            <ExpenseItem
              key={expense._id}
              _id={expense._id}
              title={expense.title}
              amount={expense.amount}
              date={expense.date}
              description={expense.description}
              setRefresh={setRefresh}
            />
          ))
        )}

        {expenses.length === 0 && !loading && (
          <Box
            style={{
              height: '100px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Heading
              style={{
                textAlign: 'center',
                margin: '1rem 0rem',
                color: GS.quaternary,
              }}
              fontFamily='Comic Neue, cursive'
              fontSize={'1.5rem'}
            >
              No expenses found. Add one now!
            </Heading>
          </Box>
        )}
      </Box>

      <Box
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          height: '40px',
          width: '40px',
          backgroundColor: GS.quaternary,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
        shadow={'xl'}
      >
        <AddIcon
          style={{}}
          _hover={{
            color: GS.tertiary,
          }}
          color={GS.primary}
          onClick={() => navigate('/add-expense')}
        />
      </Box>
    </Box>
  );
}

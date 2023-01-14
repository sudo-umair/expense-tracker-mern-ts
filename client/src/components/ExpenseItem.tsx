import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Button,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { handleApi } from 'utils/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

type ExpenseItemProps = {
  _id?: string;
  title: string;
  amount: number;
  date: Date;
  description: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExpenseItem = ({
  _id,
  title,
  amount,
  date,
  description,
  setRefresh,
}: ExpenseItemProps) => {
  const toast = useToast();
  const navigate = useNavigate();

  const { email, token } = useSelector((state: RootState) => state.user);

  const handleEdit = () => {
    navigate('/update-expense', {
      state: {
        _id,
        title,
        amount,
        date,
        description,
      },
    });
  };

  const handleDelete = async () => {
    try {
      const response: AxiosResponse = await handleApi(
        '/expense/delete',
        'POST',
        {
          email,
          token,
          _id,
        }
      );
      toast({
        title: response.status === 200 ? 'Success' : 'Warning',
        description: response.data.message,
        status: response.status === 200 ? 'success' : 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const DATE = new Date(date);
  const FORMATTED_DATE = DATE.toUTCString().split(' ').slice(0, 4).join(' ');

  return (
    <Card margin={'1rem'} minWidth={'200px'}>
      <CardHeader padding={'1rem'}>
        <Heading fontSize={'1.5rem'}>{title}</Heading>
      </CardHeader>
      <CardBody padding={'1rem'}>
        <Text>Rs. {amount}</Text>
        <Text>{FORMATTED_DATE}</Text>
        <Text>{description}</Text>
      </CardBody>
      <CardFooter padding={'1rem'} justifyContent={'flex-end'}>
        <Button colorScheme='blue' marginRight={'1rem'} onClick={handleEdit}>
          <EditIcon />
        </Button>
        <Button colorScheme='red' onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExpenseItem;

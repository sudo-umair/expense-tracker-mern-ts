import {
  Box,
  Image,
  Text,
  Avatar,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
} from '@chakra-ui/react';
import { NavLink as RouterLink } from 'react-router-dom';
import { GLOBAL_STYLES as GS } from 'utils/constants';
import LOGO from 'assets/logo.png';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/user';
import { type AppDispatch } from 'redux/store';

type NavbarProps = {
  isLoggedIn: boolean;
  name?: string;
};

const Navbar = ({ isLoggedIn, name }: NavbarProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box
      width={'100%'}
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      bg={GS.quaternary}
      padding={3}
    >
      <Box
        as={RouterLink}
        to='/'
        display='flex'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
        title='Expense Tracker'
      >
        <Image src={LOGO} alt={'logo'} height={'7'} borderRadius='md' />
        <Text
          marginLeft={3}
          fontSize={'xl'}
          fontFamily={'Comic Neue, cursive'}
          color={'white'}
          style={{ textDecoration: 'none' }}
        >
          Expense Tracker
        </Text>
      </Box>
      {isLoggedIn && (
        <Box display='flex' alignItems='center'>
          <Menu>
            <MenuButton marginLeft={3}>
              <Box display='flex' flexDirection='row' alignItems='center'>
                <Avatar
                  color={'white'}
                  bg={GS.tertiary}
                  size='sm'
                  name={name}
                  title={name}
                />
              </Box>
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to='/add-expense'>
                Add Expense
              </MenuItem>
              <MenuItem onClick={handleLogout} as={RouterLink} to='/'>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;

import { AppBar, Box, List, ListItem, ListItemButton } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { HeaderLinkInterface } from './header.link.interface';

const headerDataLink: HeaderLinkInterface[] = [
  {
    link: 'books',
    name: 'Книги',
  },
];

export const Header: FC = () => {
  return (
    <AppBar component="header" sx={{ padding: '5px 10px' }}>
      <Box
        component="nav"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <List sx={{ display: 'flex', padding: '0' }}>
          {headerDataLink.map(({ link, name }) => (
            <ListItem key={link}>
              <ListItemButton
                component={Link}
                to={link}
                sx={{
                  color: '#fff',
                  width: 'auto',
                  padding: '0',
                  fontSize: '14px',
                }}
              >
                {name}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </AppBar>
  );
};

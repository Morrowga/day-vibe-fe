import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ThemeMode from './ThemeMode';
import { useRouter } from 'next/router';
import { useThemeContext } from '@/app/ThemeContext';
import Image from 'next/image';

const pages = [
  {
    title: 'စျေး၀ယ်မည်',
    url: '/mini-mart',
  },
  // {
  //   title: 'သတင်းအချက်အလက်များ',
  //   url: '/news',
  // }
];

function NavBar() {

  const { mode } = useThemeContext(); 

  const router = useRouter();

  const handleNavigate = (targetUrl: string) => {
      router.push(targetUrl);
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" 
      sx={{
        backgroundColor: mode === 'light' ? '#053020' : '#121212', // Background color based on theme mode
      }}
  >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              padding: 2,
              display: { xs: 'flex', md: 'flex' },
              flexGrow: 1,
            }}
            onClick={() => handleNavigate('/mini-mart')}
          >
           <Image src="/images/G.png" alt="logo-day-vibes" width="100" height="70" />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'end' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ 
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={() => handleNavigate(page.url)} sx={{width: '100%'}}>
                  <Typography sx={{ textAlign: 'center' }}>{page.title}</Typography>
                </MenuItem>
              ))}
              <MenuItem sx={{width: '100%'}}>
                <ThemeMode />
              </MenuItem>
            </Menu>
          </Box>
         
          <Box sx={{ flexGrow: 1, justifyContent: 'end', display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => handleNavigate(page.url)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
            <Box sx={{my: 2}}>
              <ThemeMode />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;

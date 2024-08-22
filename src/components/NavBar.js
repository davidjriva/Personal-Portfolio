import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import slugify from 'slugify';

const pages = ['About', 'Projects', 'Contact'];

function NavBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <IconButton href="/about" color="inherit">
              <PhonelinkIcon />
              <Typography variant="h6" sx={{ fontWeight: 700, ml: 1 }}>
                David Riva
              </Typography>
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Link
                key={page}
                href={`/${slugify(page.toLowerCase())}`}
                color="inherit"
                sx={{ mx: 2 }}
              >
                {page}
              </Link>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton href="/about">
              <Avatar
                alt="Photo of David Riva"
                src="/images/headshot2.jpeg"
                sx={{ width: 50, height: 50 }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;

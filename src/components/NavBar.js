import * as React from 'react';
import { Link, Avatar, IconButton, Container, Typography, Toolbar, Box, AppBar, } from '@mui/material';
import slugify from 'slugify';

const pages = ['About', 'Projects', 'Contact'];

function NavBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#3c4142' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <IconButton href="/about" color="inherit">
              <img src="/images/Portfolio-Icon.svg" alt="Computer Icon" style={{ width: 50, height: 50 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, ml: 1 }}>
                David Riva
              </Typography>
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Link
                href={`/${slugify(page.toLowerCase())}`}
                color="inherit"
                sx={{
                  mx: 2,
                }}
                key={page}
              >
                {page}
              </Link>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton href="/about">
              <Avatar alt="Photo of David Riva" src="/images/headshot.jpeg" sx={{ width: 50, height: 50 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;

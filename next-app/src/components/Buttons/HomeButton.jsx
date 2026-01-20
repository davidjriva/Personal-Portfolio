import Link from 'next/link';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const HomeButton = () => {
    return (        
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} // Center content and add spacing
          >
            <HomeIcon /> Return to home
          </Button>
        </Link>
    );
}

export default HomeButton;
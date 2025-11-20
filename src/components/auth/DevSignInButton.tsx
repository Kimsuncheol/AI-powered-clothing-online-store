'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/useAuth';

const DevSignInButton = () => {
  const router = useRouter();
  const { signInDev } = useAuth();

  const handleClick = () => {
    signInDev();
    router.push('/');
  };

  return (
    <Button variant="outlined" fullWidth onClick={handleClick} sx={{ mb: 2 }}>
      Sign in with dev account
    </Button>
  );
};

export default DevSignInButton;

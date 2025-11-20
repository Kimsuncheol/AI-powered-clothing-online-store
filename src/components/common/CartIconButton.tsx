'use client';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';

const CartIconButton = () => {
  const router = useRouter();

  return (
    <IconButton aria-label="cart" onClick={() => router.push('/cart')}>
      <ShoppingCartIcon />
    </IconButton>
  );
};

export default CartIconButton;

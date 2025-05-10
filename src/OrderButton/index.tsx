import { Typography } from '@mui/material';
import OutlinedButton from '../OutlinedButton';

const OrderButton = () => {
  const url =
    'https://driftershoots.myshopify.com/checkouts/co/8a5266bb3d276b0349039b698273cde5';

  return (
    <OutlinedButton
      href={url}
      target="_blank"
      text="Order"
      clientside={false}
      fullWidth={false}
    >
      <Typography variant="h4">Order</Typography>
    </OutlinedButton>
  );
};

export { OrderButton };

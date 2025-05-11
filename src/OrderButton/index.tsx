import OutlinedButton from '../OutlinedButton';

const OrderButton = ({ children }: { children: React.ReactNode }) => {
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
      {children}
    </OutlinedButton>
  );
};

export { OrderButton };

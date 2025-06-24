import OutlinedButton from '../OutlinedButton';

const OrderButton = ({
  children,
  quantity,
  fullWidth = false,
  style,
}: {
  children: React.ReactNode;
  quantity: number;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}) => {
  const url = `https://driftershoots.myshopify.com/cart/46136485970178:${quantity}?channel=buy_button`;

  return (
    <OutlinedButton
      href={url}
      target="_blank"
      text="Order"
      clientside={false}
      fullWidth={fullWidth}
      sx={style}
    >
      {children}
    </OutlinedButton>
  );
};

export { OrderButton };

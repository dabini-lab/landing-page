import className from 'classnames';

enum ButtonColor {
  PRIMARY = 'primary',
  DISCORD = 'discord',
}

type IButtonProps = {
  xl?: boolean;
  color?: ButtonColor;
  children: string;
};

const Button = (props: IButtonProps) => {
  const btnClass = className({
    btn: true,
    'btn-xl': props.xl,
    'btn-base': !props.xl,
    'btn-primary':
      props.color === ButtonColor.PRIMARY || props.color === undefined,
    'btn-discord': props.color === ButtonColor.DISCORD,
  });

  return (
    <div className={btnClass}>
      {props.children}

      <style jsx>
        {`
          .btn {
            @apply inline-block rounded-md text-center;
          }

          .btn-base {
            @apply text-lg font-semibold py-2 px-4;
          }

          .btn-xl {
            @apply font-extrabold text-xl py-4 px-6;
          }

          .btn-primary {
            @apply text-white bg-primary-500;
          }

          .btn-primary:hover {
            @apply bg-primary-600;
          }

          .btn-discord {
            @apply text-white bg-discord-100;
          }

          .btn-discord:hover {
            @apply text-white bg-discord-200;
          }
        `}
      </style>
    </div>
  );
};

export { Button, ButtonColor };

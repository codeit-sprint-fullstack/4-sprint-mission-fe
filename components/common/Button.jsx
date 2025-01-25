import clsx from 'clsx';

function Button({
  children,
  disabled = false,
  onClick,
  cancel = false,
  width,
  height,
}) {
  const defaultClassNames = clsx(
    `shrink-0 px-6 py-2 bg-[#3692FF] text-white rounded-lg hover:bg-[#1469CF] ${
      !width ? '' : `w-[${width}px]`
    } ${disabled ? '' : 'active:brightness-75'} `
  );

  const disableClassNames = clsx({
    'bg-[#9da3ae] cursor-default hover:bg-[#9da3ae]': disabled,
  });

  const cancelClassName = clsx({
    '!text-[#3692FF] mr-2 font-semibold bg-transparent hover:bg-transparent':
      cancel,
  });

  return (
    <button
      className={clsx(defaultClassNames, disableClassNames, cancelClassName)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

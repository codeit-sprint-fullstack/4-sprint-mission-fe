import clsx from 'clsx';

function Button({
  children,
  disabled = false,
  onClick,
  color = 'blue',
  outline = false,
  width,
  height,
}) {
  const defaultClassNames = clsx(
    'shrink-0 px-6 py-2 text-white rounded-lg hover:brightness-90 active:brightness-75'
  );

  const outlineClassName = clsx({
    'border border-solid !bg-transparent !text-[#3692FF]':
      outline === true && color === 'blue',
    'border border-solid !bg-transparent !text-[#f74747]':
      outline === true && color === 'red',
  });

  const colorClassNames = clsx({
    'bg-[#f74747] border-red-500': color === 'red',
    ' bg-[#3692FF] border-blue-500': color === 'blue',
  });

  const disableClassNames = clsx({
    'bg-[#9da3ae] cursor-default hover:brightness-100 active:brightness-100':
      disabled,
  });

  const sizeClassName = clsx({
    'w-[165px]': width === '165',
  });

  return (
    <button
      className={clsx(
        defaultClassNames,
        colorClassNames,
        outlineClassName,
        disableClassNames,
        sizeClassName
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

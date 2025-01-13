import clsx from 'clsx';

function Button({ children, isDisabled = false, onClick }) {
  const defaultClassNames = clsx(
    'shrink-0 px-6 py-2 bg-[#3692FF] text-white rounded-lg'
  );

  const disableClassNames = clsx({
    'bg-[#9da3ae] cursor-default': isDisabled,
  });

  return (
    <button
      className={clsx(defaultClassNames, disableClassNames)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

interface ErrorProps {
  error?: any;
  children: JSX.Element;
}

export default function Error({ error, children }: ErrorProps) {
  return (
    <>
      {children}
      {error && <span className='text-xs text-red-500 text-right m-0'>{error}</span>}
    </>
  );
}

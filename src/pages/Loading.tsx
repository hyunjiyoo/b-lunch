export default function Loading() {
  return (
    <div className='flex flex-col justify-center items-center pt-10'>
      <h3 className='text-center my-4'>B-Lunch Application is loading... Please wait a moment 🙏 </h3>
      <img className='max-w-full max-h-full m-0' src='/image/loading.gif' alt='loading' />
    </div>
  );
}

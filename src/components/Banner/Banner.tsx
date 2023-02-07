export default function Banner() {
  return (
    <div className='h-96 h-w-full bg-slate-300 relative'>
      <img className='opacity-80 h-full m-auto object-cover w-full rounded' src='/image/banner.png' alt='banner' />
      <h1 className='text-white absolute bottom-1/2 w-max right-1/2 translate-x-1/2 translate-y-1/2 lg:text-3xl md:text-2xl sm:text-2xl'>Style Your Balanced Lunch!</h1>
      <p className='text-white absolute top-56 right-1/2 translate-x-1/2 w-max lg:text-base md:text-sm sm:text-sm'>Best Products, Healthy Food.</p>
    </div>
  );
}


export default function Banner() {
  return (
    <div className="h-96 w-full bg-slate-300 relative">
      <img
        className="object-cover opacity-80 h-full m-auto w-full rounded"
        src="/image/banner.png"
        alt="banner"
      />
      <h1 className="text-white absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 text-3xl w-fit">
        Style Your Balanced Lunch!
      </h1>
      <p className="text-white absolute top-56 right-1/2 translate-x-1/2">
        Best Products, Healthy Food.
      </p>
    </div>
  );
}

import { ProductType } from 'types';

interface ProductProps {
  product: ProductType;
}

export default function Product({ product }: ProductProps) {
  const { name, price, category, imageUrl } = product;

  return (
    <li className='flex flex-col w-23% border border-slate-200 shadow-md'>
      <div className='w-full h-250px bg-orange-50 py-2'>
        <img src={imageUrl} alt={`${name}_image`} className='w-4/5 h-full object-contain m-auto rounded' />
      </div>
      <div className='px-2 pt-1 flex justify-between'>
        <p className=''>{name}</p>
        <p className='text-right'>₩{(+price).toLocaleString('en')}</p>
      </div>
      <p className='mx-2 pb-1 text-zinc-400 text-sm flex-1'>{category}</p>
    </li>
  );
}

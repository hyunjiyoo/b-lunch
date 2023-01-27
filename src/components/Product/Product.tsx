import { useNavigate } from 'react-router-dom';
import { ProductType } from 'types';
import { convertPriceFormat } from 'util/convertFormat';

interface ProductProps {
  product: ProductType;
}

export default function Product({ product }: ProductProps) {
  const navigate = useNavigate();
  const { name, price, category, imageUrl } = product;

  const gotoDetailPage = () => {
    navigate(`/products/detail/${encodeURIComponent(product.id)}`, { state: { product }});
  }

  return (
    <li className='flex flex-col w-23% border border-slate-200 shadow-md cursor-pointer hover:opacity-95' onClick={gotoDetailPage}>
      <div className='w-full h-250px bg-orange-50 py-2'>
        <img src={imageUrl} alt={`${name}_image`} className='w-4/5 h-full object-contain m-auto rounded hover:scale-105 ease-in duration-300' />
      </div>
      <div className='px-2 pt-1 flex justify-between'>
        <p className=''>{name}</p>
        <p className='text-right'>{convertPriceFormat(price)}</p>
      </div>
      <p className='mx-2 pb-1 text-zinc-400 text-sm flex-1'>{category}</p>
    </li>
  );
}

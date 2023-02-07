import { useNavigate } from 'react-router-dom';
import { ProductType } from 'types';
import { convertPriceFormat } from 'util/common';

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
    <li className='flex flex-col border border-slate-200 shadow-md cursor-pointer hover:opacity-95' onClick={gotoDetailPage}>
      <div className='h-220px bg-orange-50'>
        <img src={imageUrl} alt={`${name}_image`} className='w-180px min-w-180px p-2 h-full object-cover m-auto rounded hover:scale-y-105 ease-in duration-300' />
      </div>
      <div className='px-2 pt-1 flex justify-between min-w-fit'>
        <p className=''>{name}</p>
        <p className='text-right'>{convertPriceFormat(price)}</p>
      </div>
      <p className='mx-2 pb-1 text-zinc-400 text-sm flex-1'>{category}</p>
    </li>
  );
}

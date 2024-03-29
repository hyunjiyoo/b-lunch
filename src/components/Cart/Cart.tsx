import { useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
import { ProductType } from 'types';
import { convertPriceFormat } from '@/util/common';

interface CartProps {
  item: ProductType;
  handleDecrease: (key: string) => void;
  handleIncrease: (key: string) => void;
  handleDelete: (key: string) => void;
}

export default function Cart({ item, handleDecrease, handleIncrease, handleDelete }: CartProps): JSX.Element {
  const { id, name, option, price, imageUrl } = item;
  const [count, setCount] = useState<number>(item.count as number);
  const key = `${id}_${option}`;

  const decreaseCount = () => {
    handleDecrease(key);
    setCount((count) => (count < 1 ? 0 : count - 1));
  };

  const increaseCount = () => {
    handleIncrease(key);
    setCount((count) => count + 1);
  };

  const deleteItem = () => {
    handleDelete(key);
  };

  return (
    <li className='flex mb-3 items-center bg-slate-50 justify-between'>
      <div className='flex items-center gap-5'>
        <div className='h-150px w-120px bg-slate-100 p-3 rounded'>
          <img src={imageUrl} alt={name} className='w-full h-full rounded-full object-fill' />
        </div>
        <div>
          <p className='font-semibold'>{name}</p>
          <p className='text-orange-500 font-bold'>{option}</p>
          <p>{convertPriceFormat(price)}</p>
        </div>
      </div>
      <div className='flex items-center gap-2 mr-4'>
        <AiOutlineMinusCircle className='cursor-pointer' onClick={decreaseCount} />
        <p>{count}</p>
        <AiOutlinePlusCircle className='cursor-pointer' onClick={increaseCount} />
        <BsTrashFill className='cursor-pointer' onClick={deleteItem} />
      </div>
    </li>
  );
}

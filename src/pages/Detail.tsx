import { useLocation } from 'react-router-dom';
import { convertPriceFormat } from 'util/convertFormat';
import { getUserFromLocalStorage } from 'util/getUserInfo';

export default function Detail() {
  const {
    state: { product },
  } = useLocation();
  const { name, price, description, imageUrl, option, category } = product;

  const putProductToCart = () => {
    const aa = getUserFromLocalStorage();
    console.log(aa);
    console.log('cart success');
    
  }

  return (
    <div>
      <p>카테고리 🔸 {category}</p>
      <div className='flex'>
        <div className='w-1/2 mt-4 mr-8 bg-orange-50 py-2'>
          <img src={imageUrl} alt={`${name}_image`} className='w-4/5 h-full object-contain m-auto rounded' />
        </div>
        <div className='mt-6 flex-1'>
          <p className='text-xl my-4 font-semibold'>{name}</p>
          <p className='font-semibold'>{convertPriceFormat(price)}</p>
          <hr className='my-4' />
          <p className='text-sm text-zinc-500'>{description}</p>
          <div className='flex items-center'>
            <p className='mr-2 text-sm text-white py-1 px-2 border border-orange-500 bg-orange-500 font-semibold'>옵션</p>
            <select className='my-4 border-2 border-orange-500 flex-1 p-1 text-slate-600 text-sm'>
              <option>옵션을 선택해주세요</option>
              {option.split(',').map((opt: string, idx: number) => (
                <option key={`${opt}_${idx}`}>{opt.trim()}</option>
              ))}
            </select>
          </div>
          <button type='button' className='mt-8 w-full bg-orange-500 text-white py-1 rounded' onClick={putProductToCart}>
            장바구니에 담기
          </button>
        </div>
      </div>
    </div>
  );
}

import { CLOUDINARY_URL, UPLOAD_PRESET } from 'config/const';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProductType, StateReturnType } from 'types';

export default function Register() {
  const [imageUrl, setImageUrl] = useState<string>('https://via.placeholder.com/400');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductType>();

  const previewImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files as FileList;

    if (file.length > 0) {
      const src = URL.createObjectURL(file[0]);
      setImageUrl(src);
    }
  };

  const imageUploadToCloudinary = async (file: File): Promise<StateReturnType> => {
    const body = new FormData();
    body.append('file', file);
    body.append('upload_preset', UPLOAD_PRESET);

    return fetch(CLOUDINARY_URL, { method: 'POST', body })
      .then((res) => res.json())
      .then((data) => {
        alert('새로운 제품이 성공적으로 등록되었습니다.');
        return { success: true, data };
      })
      .catch((error) => {
        console.error(error);

        return { success: false, data: error };
      });
  };

  const registerProduct = async ({ name, price, category, description, option, file }: ProductType) => {
    const { success, data } = await imageUploadToCloudinary(file[0]);
    console.log(success, data);
  };

  return (
    <>
      <h2 className='text-lg font-semibold mt-10'>제품 등록</h2>
      <hr className='mt-2 mb-4' />
      <div className='flex'>
        <div className='w-350px h-350px bg-slate-100 mr-4'>
          <img src={imageUrl} alt='preview_image' className='w-full h-full object-contain' />
        </div>
        <form className='flex flex-col flex-1 gap-2' onSubmit={handleSubmit(registerProduct)}>
          <input
            type='file'
            className='border-2 p-2 text-sm outline-orange-400 mt-2'
            accept='image/*'
            {...register('file', {
              onChange: previewImage,
            })}
          />
          <input type='text' placeholder='제품명' className='text-sm border-2 p-2 outline-orange-400' {...register('name')} />
          <input type='number' placeholder='가격' className='text-sm border-2 p-2 outline-orange-400' {...register('price')} />
          <input type='text' placeholder='카테고리' className='text-sm border-2 p-2 outline-orange-400' {...register('category')} />
          <input type='text' placeholder='제품 설명' className='text-sm border-2 p-2 outline-orange-400' {...register('description')} />
          <input type='text' placeholder='옵션들(콤마(,)로 구분)' className='text-sm border-2 p-2 outline-orange-400' {...register('option')} />
          <button type='submit' className='bg-orange-500 text-white py-2 rounded-xl mt-3'>
            제품 등록하기
          </button>
        </form>
      </div>
    </>
  );
}

import { CLOUDINARY_URL, DEFAULT_IMAGE_URL, UPLOAD_PRESET } from 'config/const';
import { addProduct } from 'db/database';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProductType } from 'types';
import { v4 as uuid } from 'uuid';

export default function Register() {
  const [previewImg, setPreviewImage] = useState<string>(DEFAULT_IMAGE_URL);
  const { register, handleSubmit, reset } = useForm<ProductType>();

  const previewImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files as FileList;

    if (file.length > 0) {
      const src = URL.createObjectURL(file[0]);
      setPreviewImage(src);
    }
  };

  const imageUploadToCloudinary = async (file: File) => {
    const body = new FormData();
    body.append('file', file);
    body.append('upload_preset', UPLOAD_PRESET);

    return fetch(CLOUDINARY_URL, { method: 'POST', body })
      .then((res) => res.json())
      .then((data) => data.url);
  };

  const isValidateForm = (product: ProductType) => {
    const isFileEmpty = (product.file as FileList).length === 0;
    const isEmpty = Object.values(product).slice(1).map((prod: string) => prod.trim()).includes('');
    const invalidOptionValue = product.option.replaceAll(',', '');

    if (isFileEmpty) {
      alert('이미지를 등록해주세요.');
      return false;
    }

    if (isEmpty) {
      alert('빈칸을 모두 채워주세요.');
      return false;
    }

    if (!invalidOptionValue) {
      alert('옵션을 올바로 입력해주세요.');
      return false;
    }

    return true;
  }

  const registerProduct = async (product: ProductType) => {
    try {
      if (!isValidateForm(product)) {
        return;
      }

      const option = product.option.split(',').filter((opt: string) => opt.trim()).join();
      const { name, price, category, description, file } = product;
      const fileObj = (file as unknown as FileList)[0];
      const imageUrl = await imageUploadToCloudinary(fileObj);
      const id = uuid();
      const newItem = { id, name, price, category, description, option, imageUrl };
      console.log(newItem);
      addProduct(newItem);

      alert('새로운 제품이 성공적으로 등록되었습니다.');
      setPreviewImage(DEFAULT_IMAGE_URL);
      reset();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className='text-lg font-semibold mt-10'>제품 등록</h2>
      <hr className='mt-2 mb-4' />
      <div className='flex'>
        <div className='w-350px h-350px bg-slate-100 mr-4'>
          <img src={previewImg} alt='preview_image' className='w-full h-full object-contain' />
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
          <input type='number' min={1} max={1000000} placeholder='가격' className='text-sm border-2 p-2 outline-orange-400' {...register('price')} />
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

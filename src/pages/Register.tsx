import { CLOUDINARY_URL, DEFAULT_IMAGE_URL, MESSAGE, UPLOAD_PRESET } from 'config/const';
import { addProduct } from 'db/database';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProductType } from 'types';
import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import Error from 'components/Error/Error';
import { getUserInfo } from 'util/\bcommon';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  file: yup.mixed().test('filesize', '파일을 등록해주세요', (file: FileList) => file.length > 0),
  name: yup.string().trim().required('제품명을 입력해주세요.').min(2, '2자 이상 입력해주세요!'),
  price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('가격을 입력해주세요.')
    .integer('가격은 정수만 입력가능합니다.')
    .min(100, '100원 이상의 상품만 등록가능합니다.')
    .max(1000000, '1,000,000원 이하의 상품을 등록해주세요.'),
  category: yup.string().trim().required('카테고리를 입력해주세요.'),
  description: yup.string().trim().required('제품 설명을 입력해주세요.'),
  option: yup.string().trim().required('옵션을 입력해주세요.'),
});

export default function Register() {
  const navigate = useNavigate();
  const [previewImg, setPreviewImage] = useState<string>(DEFAULT_IMAGE_URL);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: yupResolver(schema),
  });

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

  const registerProduct = async (product: ProductType) => {
    try {
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

  useEffect(() => {
    if (R.isEmpty(getUserInfo().uid)) {
      alert(MESSAGE.LOGIN_INFO);
      navigate('/');
    }
    
    if (!getUserInfo().isAdmin) {
      alert(MESSAGE.ADMIN_INFO);
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <h2 className='text-lg font-semibold mt-10'>제품 등록</h2>
      <hr className='mt-2 mb-4' />
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:w-350px h-350px w-full bg-slate-100 mr-4'>
          <img src={previewImg} alt='preview_image' className='w-full h-full object-contain' />
        </div>
        <form className='flex flex-col flex-1 gap-2' onSubmit={handleSubmit(registerProduct)}>
          <Error error={errors.file?.message}>
            <input
              type='file'
              className='border-2 p-2 text-sm outline-orange-400 mt-2'
              accept='image/*'
              {...register('file', {
                onChange: previewImage,
              })}
            />
          </Error>
          <Error error={errors.name?.message}>
            <input type='text' placeholder='제품명' className='text-sm border-2 p-2 outline-orange-400' {...register('name')} />
          </Error>
          <Error error={errors.price?.message}>
            <input type='number' placeholder='가격' className='text-sm border-2 p-2 outline-orange-400' {...register('price')} />
          </Error>
          <Error error={errors.category?.message}>
            <input type='text' placeholder='카테고리' className='text-sm border-2 p-2 outline-orange-400' {...register('category')} />
          </Error>
          <Error error={errors.description?.message}>
            <input type='text' placeholder='제품 설명' className='text-sm border-2 p-2 outline-orange-400' {...register('description')} />
          </Error>
          <Error error={errors.option?.message}>
            <input type='text' placeholder='옵션들(콤마(,)로 구분)' className='text-sm border-2 p-2 outline-orange-400' {...register('option')} />
          </Error>
          <button type='submit' className='bg-orange-500 text-white py-2 rounded-xl mt-3'>
            제품 등록하기
          </button>
        </form>
      </div>
    </>
  );
}

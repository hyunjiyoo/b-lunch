import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { ProductType } from "types";

export default function Register() {
  const [file, setFile] = useState<string>("https://via.placeholder.com/400");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductType>();

  const previewImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files as FileList;

    if (file.length > 0) {
      const src = URL.createObjectURL(file[0]);
      setFile(src);
    }
  };

  const registerProduct = (form: ProductType) => {
    console.log(form);
  };

  return (
    <>
      <h2 className="text-lg font-semibold mt-6">제품 등록</h2>
      <hr className="mb-3" />
      <img src={file} alt="preview_image" width="250px" />
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(registerProduct)}
      >
        <input
          type="file"
          className="border-2 p-2 text-sm outline-orange-400 mt-2"
          accept="image/*"
          {...register("file", {
            onChange: previewImage,
          })}
        />
        <input
          type="text"
          placeholder="제품명"
          className="text-sm border-2 p-2 outline-orange-400"
          {...register("name")}
        />
        <input
          type="number"
          placeholder="가격"
          className="text-sm border-2 p-2 outline-orange-400"
          {...register("price")}
        />
        <input
          type="text"
          placeholder="카테고리"
          className="text-sm border-2 p-2 outline-orange-400"
          {...register("category")}
        />
        <input
          type="text"
          placeholder="제품 설명"
          className="text-sm border-2 p-2 outline-orange-400"
          {...register("description")}
        />
        <input
          type="text"
          placeholder="옵션들(콤마(,)로 구분)"
          className="text-sm border-2 p-2 outline-orange-400"
          {...register("option")}
        />
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded-xl mt-3"
        >
          제품 등록하기
        </button>
      </form>
    </>
  );
}

import Banner from 'components/Banner/Banner';
import Product from 'components/Product/Product';
import { getAllProducts } from 'db/database';
import { useEffect, useState } from 'react';
import { ProductType } from 'types';

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProducts = async () => {
    try {
      const products = await getAllProducts();
      console.log(products);
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {window.location.pathname === '/' && <Banner />}
      <ul className='grid lg:grid-cols-4 md:grid-cols-3 gap-3 mt-3'>
        {products.map((product: ProductType) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}

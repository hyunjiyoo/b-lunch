import Banner from 'components/Banner/Banner';
import Product from 'components/Product/Product';

export default function Products() {
  return (
    <>
      {window.location.pathname === '/' && <Banner />}
      <ul>
        <Product />
      </ul>
    </>
  );
}

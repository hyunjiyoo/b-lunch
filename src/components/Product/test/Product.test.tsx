import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductType } from 'types';
import Product from '../Product';
import { convertPriceFormat } from 'util/common';
import { render } from 'tests/utils';
import { Route } from 'react-router-dom';

describe('Product', () => {
  const product: ProductType = {
    id: '1',
    name: 'Test Product',
    price: 1000,
    category: 'Test Category',
    description: 'Test description',
    option: 'Test Option',
    imageUrl: 'http://example.com/test.jpg',
  };

  it('renders product item', () => {
    render(<Route path='/' element={<Product product={product} />} />);

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image.alt).toBe(`${product.name}_image`);
    expect(image.src).toBe(product.imageUrl);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(convertPriceFormat(product.price))).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
  });
});

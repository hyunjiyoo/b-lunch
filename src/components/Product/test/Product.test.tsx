import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { ProductType } from 'types';
import { convertPriceFormat } from 'util/common';
import { withRouter } from 'tests/utils';
import Product from '../Product';

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
    render(withRouter(<Route path='/' element={<Product product={product} />} />));

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image.alt).toBe(`${product.name}_image`);
    expect(image.src).toBe(product.imageUrl);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(convertPriceFormat(product.price))).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const component = renderer.create(withRouter(<Route path='/' element={<Product product={product} />} />));
    expect(component.toJSON()).toMatchSnapshot();
  });
});

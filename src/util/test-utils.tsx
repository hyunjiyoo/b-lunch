import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const customRender = (children: ReactElement) => {
  return render(<MemoryRouter>{children}</MemoryRouter>);
};

export * from '@testing-library/react';
export { customRender as render };

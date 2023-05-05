import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes } from 'react-router-dom';

const withRouter = (children: ReactElement, initialEntry: string = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{children}</Routes>
    </MemoryRouter>
  );
};

export * from '@testing-library/react';
export { withRouter as render };

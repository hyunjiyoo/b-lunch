import { ReactElement } from 'react';
import { MemoryRouter, Routes } from 'react-router-dom';

const withRouter = (children: ReactElement, initialEntry: string = '/') => {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{children}</Routes>
    </MemoryRouter>
  );
};

export * from '@testing-library/react';
export { withRouter };

import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from 'pages/Register';
import { withRouter } from 'tests/utils';
import { DEFAULT_IMAGE_URL, MESSAGE } from 'config/const';
import { UserAuthContext } from 'context/UserAuthContext';
import { Route } from 'react-router-dom';

beforeEach(() => {
  window.alert = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Register', () => {
  it('renders all required form elements', () => {
    render(withRouter(<Route path='/' element={<Register />} />));

    const image = screen.getByRole('img') as HTMLImageElement;
    const button = screen.getByRole('button', { name: '제품 등록하기' }) as HTMLButtonElement;

    expect(image.alt).toBe('preview_image');
    expect(image.src).toBe(DEFAULT_IMAGE_URL);
    expect(button).toBeInTheDocument();

    expect(screen.getByPlaceholderText('제품명')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('제품명')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('제품명')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('제품 설명')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('옵션들(콤마(,)로 구분)')).toBeInTheDocument();
  });

  it('displays an alert message when user is not admin', async () => {
    render(
      withRouter(
        <Route
          path='/'
          element={
            <UserAuthContext.Provider value={{ isAdmin: false }}>
              <Register />
            </UserAuthContext.Provider>
          }
        />
      )
    );

    await waitFor(() => expect(alert).toHaveBeenCalledTimes(1));
    expect(alert).toHaveBeenCalledWith(MESSAGE.ADMIN_INFO);
  });
});

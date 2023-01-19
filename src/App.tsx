import Header from "components/Header/Header";
import Products from "pages/Products";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className='m-auto w-9/12'>
      <Header />
      <Products />
      <Outlet />
    </div>
  );
};

export default App;

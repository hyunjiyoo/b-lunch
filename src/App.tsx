import Header from "components/Header/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className='m-auto w-3/5'>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;

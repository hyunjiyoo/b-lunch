import { useState } from "react";
import { BsGiftFill, BsCart4 } from "react-icons/bs";
import { FiEdit} from "react-icons/fi";
import { Link } from "react-router-dom";
import { logIn, logOut } from "api/sign";
import { writeUserData } from "db/database";
import { getUserFromLocalStorage } from "util/getUserInfo";

export default function Header() {
  const [isLogin, setIsLogin] = useState<boolean>(() => !!getUserFromLocalStorage());
  const [admin, setAdmin] = useState<boolean>(() => getUserFromLocalStorage().isAdmin);

  const onLogIn = async () => {
    const user = await logIn();
    writeUserData(user);
    setAdmin(() => getUserFromLocalStorage().isAdmin);
    setIsLogin(true);
  }

  const onLogOut = async () => {
    await logOut();
    alert("정상적으로 로그아웃되었습니다.");
    localStorage.removeItem("user");
    setIsLogin(false);
    setAdmin(false);
  }

  const handleLogin = () => {
    isLogin ? onLogOut() : onLogIn();
  };

  return (
    <header className="flex items-center justify-between mb-4">
      <Link to="/" className="flex items-center text-orange-600 cursor-pointer">
        <BsGiftFill className="text-xl" />
        <h1 className="text-2xl ml-2">B-Lunch</h1>
      </Link>
      <div className="flex items-center">
        <nav>
          <ul className="flex gap-2">
            <Link to="/products" className="cursor-pointer hover:opacity-70 mr-5">
              Products
            </Link>
          </ul>
        </nav>
        {admin && <FiEdit className="cursor-pointer text-2xl mr-5" />}
        <BsCart4 className="cursor-pointer text-2xl mr-5" />
        <button
          className="bg-orange-600 px-3 py-1 rounded text-white"
          onClick={handleLogin}
        >
          {isLogin ? "Logout" : "Login"}
        </button>
      </div>
    </header>
  );
}

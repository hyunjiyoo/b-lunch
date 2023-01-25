import { useEffect, useState } from "react";
import { BsGiftFill, BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logIn, logOut } from "api/sign";
import { User } from "firebase/auth";

export default function Header() {
  const [user, setUser] = useState<User | null>(() => readUserFromLocalStorage());

  const onLogIn = async () => {
    const user = await logIn();
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  const onLogOut = async () => {
    await logOut();
    alert("정상적으로 로그아웃되었습니다.");
    localStorage.removeItem("user");
    setUser(null);
  }

  const handleClick = () => {
    user ? onLogOut() : onLogIn();
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <header className="flex items-center justify-between mb-4">
      <Link to="/" className="flex items-center text-orange-600 cursor-pointer">
        <BsGiftFill className="text-xl" />
        <h1 className="text-2xl ml-2">B-Lunch</h1>
      </Link>
      <div className="flex items-center">
        <nav>
          <ul className="flex gap-2">
            <Link to="/products" className="cursor-pointer hover:opacity-70">
              Products
            </Link>
          </ul>
        </nav>
        <BsCart4 className="cursor-pointer text-2xl mx-5" />
        <button
          className="bg-orange-600 px-3 py-1 rounded text-white"
          onClick={handleClick}
        >
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </header>
  );
}

function readUserFromLocalStorage() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

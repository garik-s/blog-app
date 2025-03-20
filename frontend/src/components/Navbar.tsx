"use client"
import { FC } from "react";
import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";

const Navbar: FC = () => {
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl">
          Blog App
        </Link>
        
        <div className="space-x-4">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="text-white">
                Login
              </Link>
              <Link href="/signup" className="text-white">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

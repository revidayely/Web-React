import { Link } from "react-router-dom";
import { useAuth } from "../pages/AuthContext"; // Sesuaikan path jika AuthContext ada di folder lain (misal: ../context/AuthContext)

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 text-slate-800 shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-y-4 sm:flex-row">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-x-2">
            <span className="rounded-lg bg-blue-600 px-2.5 py-1 text-lg font-black text-white">
              FS
            </span>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              FuadStore
            </h1>
          </Link>

          {/* Navigasi Menu */}
          <nav className="flex items-center gap-x-6 text-sm font-medium text-slate-600">
            <Link
              to="/"
              className="transition-colors hover:text-blue-600 active:text-blue-700"
            >
              Beranda
            </Link>
            
            <Link
              to="/keranjang"
              className="transition-colors hover:text-blue-600 active:text-blue-700"
            >
              Keranjang
            </Link>

            {/* Tombol Login / Logout Dinamis */}
            {user ? (
              <button
                onClick={logout}
                className="rounded-lg bg-red-500 px-3.5 py-1.5 text-white transition-colors hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-white transition-colors hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </nav>

        </div>
      </div>
    </header>
  );
}

export default Header;
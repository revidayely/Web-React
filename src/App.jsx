import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./pages/AuthContext";
import ProtectedRoute from "./components/ProtectRoute"; // Pastikan komponen ini di-import
import Layout from "./components/Layout";
import Header from "./components/Header";


const Home = lazy(() => import("./pages/Home"));
const DetailProduk = lazy(() => import("./pages/DetailProduk"));
const Keranjang = lazy(() => import("./pages/Keranjang"));
const AuthForm = lazy(() => import("./pages/AuthForm"));
const Register = lazy(() => import("./pages/Register")); 
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <Suspense fallback={<div className="p-10 text-center font-semibold">Memuat...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/produk/:id" element={<DetailProduk />} />
              
              
              <Route
                path="/keranjang"
                element={
                  <ProtectedRoute>
                    <Keranjang />
                  </ProtectedRoute>
                }
              />
              
              <Route path="/register" element={<Register />} />

              <Route path="/login" element={<AuthForm />} />
              <Route path="*" element={<h2 className="p-10 text-center">404 - Halaman Tidak Ditemukan</h2>} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
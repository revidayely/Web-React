import { Link } from "react-router-dom";
import ProdukCard from "../components/ProdukCard";
import { useState, useEffect } from "react";

function Home() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kategoriList, setKategoriList] = useState([]);
  const [kataKunci, setKataKunci] = useState("");
  const [kategori, setKategori] = useState("");
  const [halaman, setHalaman] = useState(1);
  const produkPerHalaman = 6;

  // Fetch daftar kategori untuk dropdown
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setKategoriList(data))
      .catch((err) => console.error("Gagal memuat kategori:", err));
  }, []);

  // Fetch data produk berdasarkan kategori
  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = kategori
      ? `https://fakestoreapi.com/products/category/${kategori}`
      : "https://fakestoreapi.com/products";

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal mengambil data dari server");
        }
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((item) => ({
          id: item.id,
          nama: item.title,
          harga: item.price * 15000,
          gambar: item.image,
        }));
        setProduk(formatted);
        setLoading(false);
        setHalaman(1); // Reset halaman ke 1 saat kategori berganti
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [kategori]);

  // Filter berdasarkan teks pencarian
  const produkTersaring = produk.filter((p) =>
    p.nama.toLowerCase().includes(kataKunci.toLowerCase())
  );

  // Logika Pagination
  const indeksTerakhir = halaman * produkPerHalaman;
  const indeksPertama = indeksTerakhir - produkPerHalaman;
  const produkTampil = produkTersaring.slice(indeksPertama, indeksTerakhir);
  const totalHalaman = Math.ceil(produkTersaring.length / produkPerHalaman);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 text-center sm:mb-12">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Katalog Produk
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Temukan berbagai produk terbaik sesuai kebutuhan Anda
          </p>
          <div className="mt-6">
            <Link
              to="/keranjang"
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition-colors"
            >
              🛒 Lihat Keranjang
            </Link>
          </div>
        </header>

        {/* Control Bar: Input Pencarian & Dropdown Kategori */}
        <div className="mx-auto mb-8 flex max-w-6xl flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Cari produk..."
            value={kataKunci}
            onChange={(e) => setKataKunci(e.target.value)}
            className="flex-1 rounded-lg border border-slate-300 p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white p-2.5 capitalize outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Kategori</option>
            {kategoriList.map((kat) => (
              <option key={kat} value={kat}>
                {kat}
              </option>
            ))}
          </select>
        </div>

        {/* Handling Loading & Error */}
        {loading ? (
          <p className="py-12 text-center text-slate-600">Memuat produk...</p>
        ) : error ? (
          <p className="py-12 text-center text-red-500">Error: {error}</p>
        ) : produkTampil.length === 0 ? (
          <p className="py-12 text-center text-slate-500">
            Produk tidak ditemukan.
          </p>
        ) : (
          /* Grid Produk */
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {produkTampil.map((p) => (
              <ProdukCard key={p.id} produk={p} />
            ))}
          </div>
        )}

        {/* Navigasi Pagination */}
        {!loading && !error && totalHalaman > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              disabled={halaman === 1}
              onClick={() => setHalaman((prev) => prev - 1)}
              className="rounded border border-slate-300 bg-white px-4 py-2 font-medium disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <span className="font-medium text-slate-700">
              Halaman {halaman} dari {totalHalaman}
            </span>
            <button
              disabled={halaman === totalHalaman}
              onClick={() => setHalaman((prev) => prev + 1)}
              className="rounded border border-slate-300 bg-white px-4 py-2 font-medium disabled:opacity-50"
            >
              Selanjutnya
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
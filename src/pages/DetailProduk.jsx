import { useParams, Link } from "react-router-dom";
import { daftarProduk } from "../data/produk";
import { useKeranjang } from "../context/KeranjangContext"; // Impor jika ada context keranjang

function DetailProduk() {
  const { id } = useParams();
  const { tambahKeKeranjang } = useKeranjang?.() || {}; // Penanganan aman jika context digunakan

  const produk = daftarProduk.find((p) => p.id === Number(id));

  if (!produk) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Produk Tidak Ditemukan</h2>
        <p className="mt-2 text-slate-500">Produk dengan ID {id} tidak ada dalam katalog.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigasi */}
      <nav className="mb-6 text-sm font-medium text-slate-500">
        <Link to="/" className="hover:text-blue-600">Beranda</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{produk.nama}</span>
      </nav>

      {/* Grid Detail Produk */}
      <div className="grid grid-cols-1 gap-8 rounded-2xl bg-white p-6 shadow-sm border border-slate-200 md:grid-cols-2 lg:p-10">
        
        {/* Gambar Produk */}
        <div className="flex items-center justify-center rounded-xl bg-slate-100 p-8">
          <img
            src={produk.gambar || "https://via.placeholder.com/400x400?text=Produk"}
            alt={produk.nama}
            className="max-h-80 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Informasi Produk */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              ID Produk: #{id}
            </span>
            
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {produk.nama}
            </h1>

            <p className="mt-4 text-3xl font-black text-blue-600">
              Rp {produk.harga.toLocaleString("id-ID")}
            </p>

            <div className="mt-6 border-t border-slate-100 pt-6">
              <h3 className="text-sm font-semibold text-slate-900">Deskripsi Produk:</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {produk.deskripsi || "Produk berkualitas tinggi dari FuadStore. Cocok untuk penggunaan sehari-hari dengan material terbaik."}
              </p>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => tambahKeKeranjang && tambahKeKeranjang(produk)}
              className="flex-1 rounded-xl bg-blue-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700 active:bg-blue-800"
            >
              + Tambah ke Keranjang
            </button>
            <Link
              to="/keranjang"
              className="rounded-xl border border-slate-300 px-6 py-3.5 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Lihat Keranjang
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DetailProduk;
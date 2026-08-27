import { Link } from "react-router-dom";
import { useKeranjang } from "../context/KeranjangContext";

function ProdukCard({ produk }) {
  const { tambahKeKeranjang } = useKeranjang();

  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div>
        {/* Gambar Produk */}
        <div className="overflow-hidden rounded-lg bg-gray-100">
          <img
            src={produk.gambar}
            alt={produk.nama}
            className="h-48 w-full object-cover object-center transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Informasi Produk */}
        <div className="mt-4">
          <h3 className="line-clamp-1 text-base font-semibold text-gray-800">
            {produk.nama}
          </h3>
          <p className="mt-1 text-lg font-bold text-blue-600">
            Rp {(produk.harga || 0).toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="mt-5 flex items-center gap-2 pt-2">
        <Link
          to={`/produk/${produk.id}`}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100"
        >
          Detail
        </Link>

        <button
          onClick={() => tambahKeKeranjang(produk)}
          className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800"
        >
          + Keranjang
        </button>
      </div>
    </div>
  );
}

export default ProdukCard;
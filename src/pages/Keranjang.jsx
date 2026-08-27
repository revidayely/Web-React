import { useKeranjang } from "../context/KeranjangContext";

function Keranjang() {
  const { item, hapusDariKeranjang, ubahJumlah } = useKeranjang();

  // Menghitung total harga berdasarkan harga * jumlah
  const total = item.reduce(
    (sum, p) => sum + (p.harga || 0) * (p.jumlah || 1),
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100 my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
        Keranjang Belanja
      </h2>

      {item.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg font-medium">Keranjang kamu masih kosong.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {item.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
            >
              {/* Info Produk */}
              <div className="flex-1 min-w-0 pr-4">
                <p className="font-semibold text-gray-800 truncate">
                  {p.title || p.nama}
                </p>
                <p className="text-sm font-medium text-blue-600 mt-1">
                  Rp {((p.harga || 0) * (p.jumlah || 1)).toLocaleString("id-ID")}
                </p>
              </div>

              {/* Kontrol Jumlah & Tombol Hapus */}
              <div className="flex items-center gap-4">
                {/* Tombol Kuantitas */}
                <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => ubahJumlah(p.id, (p.jumlah || 1) - 1)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-sm font-semibold text-gray-800">
                    {p.jumlah || 1}
                  </span>
                  <button
                    onClick={() => ubahJumlah(p.id, (p.jumlah || 1) + 1)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Tombol Hapus */}
                <button
                  onClick={() => hapusDariKeranjang(p.id)}
                  className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}

          {/* Rincian Total */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
            <span className="text-lg font-medium text-gray-600">Total Pembayaran</span>
            <h3 className="text-2xl font-extrabold text-blue-600">
              Rp {total.toLocaleString("id-ID")}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Keranjang; 
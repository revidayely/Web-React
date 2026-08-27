/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const KeranjangContext = createContext();

export function KeranjangProvider({ children }) {
  // Menggunakan custom hook useLocalStorage agar data persisten (Minggu 9)
  const [item, setItem] = useLocalStorage("keranjang", []);

  // Tambah produk ke keranjang (dengan pengecekan quantity)
  function tambahKeKeranjang(produk) {
    setItem((prev) => {
      const ada = prev.find((p) => p.id === produk.id);
      if (ada) {
        return prev.map((p) =>
          p.id === produk.id ? { ...p, jumlah: (p.jumlah || 1) + 1 } : p
        );
      }
      return [...prev, { ...produk, jumlah: 1 }];
    });
  }

  // Hapus produk berdasarkan ID (Minggu 8)
  function hapusDariKeranjang(id) {
    setItem((prev) => prev.filter((p) => p.id !== id));
  }

  // Ubah kuantitas produk (Minggu 8)
  function ubahJumlah(id, jumlahBaru) {
    if (jumlahBaru < 1) return;
    setItem((prev) =>
      prev.map((p) => (p.id === id ? { ...p, jumlah: jumlahBaru } : p))
    );
  }

  return (
    <KeranjangContext.Provider
      value={{ item, tambahKeKeranjang, hapusDariKeranjang, ubahJumlah }}
    >
      {children}
    </KeranjangContext.Provider>
  );
}

export function useKeranjang() {
  return useContext(KeranjangContext);
}
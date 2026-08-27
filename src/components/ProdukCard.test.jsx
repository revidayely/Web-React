import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProdukCard from "./ProdukCard";

describe("ProdukCard Component", () => {
  const dummyProduk = {
    id: 1,
    nama: "Sepatu Casual",
    harga: 150000,
    gambar: "https://via.placeholder.com/150",
  };

  it("berhasil menampilkan nama dan harga produk", () => {
    render(<ProdukCard produk={dummyProduk} />);

    // Memastikan nama produk tampil
    expect(screen.getByText("Sepatu Casual")).toBeInTheDocument();

    // Memastikan gambar memiliki alt text yang sesuai
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", dummyProduk.gambar);
  });
});
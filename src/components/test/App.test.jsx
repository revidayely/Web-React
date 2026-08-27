import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect,  } from "vitest";
import ProdukCard from "../components/ProdukCard";
import AuthForm from "../pages/AuthForm";
import { KeranjangProvider, useKeranjang } from "../context/KeranjangContext";

// Test 1 & 2: ProdukCard Component
describe("ProdukCard Component", () => {
  const dummyProduk = { id: 1, nama: "Kaos Polos", harga: 75000 };

  it("menampilkan nama produk dengan benar", () => {
    render(<ProdukCard produk={dummyProduk} />);
    expect(screen.getByText("Kaos Polos")).toBeInTheDocument();
  });

  it("menampilkan harga produk dengan benar", () => {
    render(<ProdukCard produk={dummyProduk} />);
    expect(screen.getByText(/75000/i)).toBeInTheDocument();
  });
});

// Test 3 & 4: FormLogin (AuthForm) Component
describe("FormLogin Component", () => {
  it("menampilkan pesan error jika email tidak valid", () => {
    render(<AuthForm />);
    const emailInput = screen.getByPlaceholderText("nama@email.com");
    const submitBtn = screen.getByRole("button", { name: /masuk|login/i });

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/email tidak valid/i)).toBeInTheDocument();
  });

  it("menampilkan error jika password kurang dari 6 karakter", () => {
    render(<AuthForm />);
    const emailInput = screen.getByPlaceholderText("nama@email.com");
    const passwordInput = screen.getByPlaceholderText("******");
    const submitBtn = screen.getByRole("button", { name: /masuk|login/i });

    fireEvent.change(emailInput, { target: { value: "user@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/password minimal 6 karakter/i)).toBeInTheDocument();
  });
});

// Test 5: Context Keranjang
const TestKeranjangComponent = () => {
  const { keranjang, tambahKeKeranjang } = useKeranjang();
  return (
    <div>
      <span data-testid="count">{keranjang.length}</span>
      <button onClick={() => tambahKeKeranjang({ id: 1, nama: "Barang" })}>
        Tambah
      </button>
    </div>
  );
};

describe("Keranjang Context", () => {
  it("menambahkan item ke dalam keranjang", () => {
    render(
      <KeranjangProvider>
        <TestKeranjangComponent />
      </KeranjangProvider>
    );

    const btn = screen.getByText("Tambah");
    fireEvent.click(btn);

    expect(screen.getByTestId("count").textContent).toBe("1");
  });
});
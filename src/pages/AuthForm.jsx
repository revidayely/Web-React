import { useState } from "react";

function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    konfirmasiPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi Email
    if (!form.email.includes("@")) {
      setError("Email Tidak Valid");
      return;
    }

    // Validasi Panjang password
    if (form.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    // Validasi Konfirmasi Password (Register Only)
    if (isRegister && form.password !== form.konfirmasiPassword) {
      setError("Konfirmasi Password Tidak Cocok!");
      return;
    }

    setError("");
    alert(isRegister ? "Register Berhasil!" : "Login Berhasil!");
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white border rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isRegister ? "Registrasi Akun" : "Login"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="nama@email.com"
            className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="******"
            className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Input Tambahan Khusus Registrasi */}
        {isRegister && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="konfirmasiPassword"
              value={form.konfirmasiPassword}
              onChange={handleChange}
              placeholder="******"
              className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          {isRegister ? "Daftar" : "Masuk"}
        </button>
      </form>

      {/* Switch Form Mode */}
      <p className="text-center text-sm text-gray-600 mt-4">
        {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setError("");
          }}
          className="text-blue-600 font-semibold underline"
        >
          {isRegister ? "Login" : "Daftar"}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;
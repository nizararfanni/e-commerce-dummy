import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Toko Baju. All rights reserved.</p>
        <div className="mt-2">
          <a href="/contact" className="text-gray-300 hover:text-white mx-2">
            Kontak
          </a>
          <a href="/privacy" className="text-gray-300 hover:text-white mx-2">
            Kebijakan Privasi
          </a>
          <a href="/terms" className="text-gray-300 hover:text-white mx-2">
            Syarat & Ketentuan
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

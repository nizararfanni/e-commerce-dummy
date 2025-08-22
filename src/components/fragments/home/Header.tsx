import { useState } from "react";
import CardNav from "../../react-Layouts/CartNav";

const Header = () => {
  const items = [
    {
      label: "Home",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Beranda", ariaLabel: "Halaman utama toko", href: "/" },
        {
          label: "Promo Hari Ini",
          ariaLabel: "Lihat promo terbaru",
          href: "/promo",
        },
      ],
    },
    {
      label: "Products",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        {
          label: "Semua Produk",
          ariaLabel: "Lihat semua produk",
          href: "/products",
        },
        {
          label: "Kategori",
          ariaLabel: "Jelajahi kategori produk",
          href: "/categories",
        },
        {
          label: "Produk Terbaru",
          ariaLabel: "Produk yang baru dirilis",
          href: "/new",
        },
      ],
    },
    {
      label: "Cart",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        {
          label: "Keranjang Saya",
          ariaLabel: "Lihat isi keranjang",
          href: "/cart",
        },
        {
          label: "Wishlist",
          ariaLabel: "Produk favorit saya",
          href: "/wishlist",
        },
        {
          label: "Checkout",
          ariaLabel: "Lanjut ke pembayaran",
          href: "/checkout",
        },
      ],
    },
    {
      label: "About",
      bgColor: "#3F334D",
      textColor: "#fff",
      links: [
        {
          label: "Tentang Kami",
          ariaLabel: "Informasi tentang toko",
          href: "/about",
        },
        { label: "Kontak", ariaLabel: "Hubungi kami", href: "/contact" },
        {
          label: "Kebijakan Privasi",
          ariaLabel: "Privasi dan data pengguna",
          href: "/privacy",
        },
      ],
    },
  ];
  const [navActive, setNavActive] = useState("home");

  return (
    <div>
      <CardNav
        className="hidden md:block"
        logo={"lool"}
        logoAlt="Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#364153"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      <div className="dock dock-md md:hidden">
        <button
          onClick={() => setNavActive("home")}
          className={navActive === "home" ? "dock-active bg-gray-700" : ""}
        >
          <svg
            className="size-[1.2em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
              <polyline
                points="1 11 12 2 23 11"
                fill="none"
                stroke="currentColor"
                stroke-miterlimit="10"
                strokeWidth="2"
              ></polyline>
              <path
                d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7"
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                stroke-miterlimit="10"
                strokeWidth="2"
              ></path>
              <line
                x1="12"
                y1="22"
                x2="12"
                y2="18"
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                stroke-miterlimit="10"
                strokeWidth="2"
              ></line>
            </g>
          </svg>
          <span className="dock-label">Home</span>
        </button>

        <button
          onClick={() => setNavActive("products")}
          className={navActive === "products" ? "dock-active bg-gray-700" : ""}
        >
          <svg
            className="size-[1.2em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
              <polyline
                points="3 14 9 14 9 17 15 17 15 14 21 14"
                fill="none"
                stroke="currentColor"
                stroke-miterlimit="10"
                strokeWidth="2"
              ></polyline>
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                ry="2"
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                stroke-miterlimit="10"
                strokeWidth="2"
              ></rect>
            </g>
          </svg>
          <span className="dock-label">Inbox</span>
        </button>

        <button
          onClick={() => setNavActive("about")}
          className={navActive === "about" ? "dock-active bg-gray-700" : ""}
        >
          <svg
            className="size-[1.2em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
              <circle
                cx="12"
                cy="12"
                r="3"
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                stroke-miterlimit="10"
                strokeWidth="2"
              ></circle>
              <path
                d="m22,13.25v-2.5l-2.318-.966c-.167-.581-.395-1.135-.682-1.654l.954-2.318-1.768-1.768-2.318.954c-.518-.287-1.073-.515-1.654-.682l-.966-2.318h-2.5l-.966,2.318c-.581.167-1.135.395-1.654.682l-2.318-.954-1.768,1.768.954,2.318c-.287.518-.515,1.073-.682,1.654l-2.318.966v2.5l2.318.966c.167.581.395,1.135.682,1.654l-.954,2.318,1.768,1.768,2.318-.954c.518.287,1.073.515,1.654.682l.966,2.318h2.5l.966-2.318c.581-.167,1.135-.395,1.654-.682l2.318.954,1.768-1.768-.954-2.318c.287-.518.515-1.073.682-1.654l2.318-.966Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                stroke-miterlimit="10"
                strokeWidth="2"
              ></path>
            </g>
          </svg>
          <span className="dock-label">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Header;

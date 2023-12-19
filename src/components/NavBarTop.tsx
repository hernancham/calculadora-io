import Image from "next/image";
import Link from "next/link";

function NavBarTop() {
  return (
    <nav className="h-20 w-[90%] mx-auto overflow-hidden max-w-screen-xl flex items-center justify-between">
      <Link href="/" className="w-1/3 max-w-[140px] grid grid-cols-2">
        <Image
          src="/icon_web.svg"
          alt="logo"
          width="50"
          height="50"
          className="h-full object-center"
        />
        <p className="font-bold text-2xl text-cyan-950 block">Calculadora IO</p>
      </Link>

      <input type="checkbox" id="menu-toggle" className="peer hidden" />
      <label
        htmlFor="menu-toggle"
        className="bg-open-menu w-6 h-5 bg bg-cover bg-center cursor-pointer peer-checked:bg-close-menu transition-all z-50 md:hidden"
      />

      <div className="fixed inset-0 bg-gradient-to-b from-white/70 to-black/70 translate-x-full peer-checked:translate-x-0 transition-transform md:static md:translate-x-0 md:bg-none">
        <ul className="absolute inset-x-0 top-24 p-12 bg-white w-[90%] mx-auto rounded-md h-max text-center grid gap-6 font-bold text-blue-950 shadow-2xl md:w-max md:bg-transparent md:p-0 md:grid-flow-col md:static">
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/calculadora">Calculadora</Link>
          </li>
          <li>
            <Link href="/documentacion">Documentacion</Link>
          </li>
          <li>
            <Link href="/contactanos">Contactanos</Link>
          </li>
        </ul>
      </div>
      <Link
        href="#"
        className="bg-blue-500 text-white w-max py-4 px-12 rounded-full shadow-sm hidden lg:block"
      >
        Comenzar
      </Link>
    </nav>
  );
}

export default NavBarTop;

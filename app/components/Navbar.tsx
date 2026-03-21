import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-primary dark:bg-primary-dark">
      <div className="flex items-center space-x-3">
        <Image
          src="/SGN_09_08_2022_1662626364399-removebg-preview.png"
          alt="Logo"
          width={60}
          height={60}
        />
        <h1 className="text-white font-bold text-2xl">BankyConnect</h1>
      </div>
      <div className="space-x-4">
        <Link href="/register" className="btn-primary">
          Register
        </Link>
        <Link href="/login" className="btn-secondary">
          Login
        </Link>
      </div>
    </nav>
  );
}
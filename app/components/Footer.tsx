import { FaTwitter, FaWhatsapp, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        <h3 className="text-2xl font-bold">BankyConnect</h3>
        <p>Your reliable plug for virtual top up, data subscription, online payment and subscription system in Nigeria.</p>
        <div className="flex justify-center gap-6 text-2xl mt-4">
          <FaTwitter />
          <FaWhatsapp />
          <FaFacebook />
          <FaLinkedin />
        </div>
      </div>
    </footer>
  );
}
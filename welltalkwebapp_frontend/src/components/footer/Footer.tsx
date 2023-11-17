import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" flex bg-gray-50 py-5 bottom-0 items-center px-6 items justify-between border-t-2">
      <h1 className=" text-gray-300 items-center">© WellTalk | 2023 | Guia | Batulan | Nadela | Perez | Prahinog</h1>
      <ul className=" flex gap-3 items-center">
        <FaFacebook className=" h-8 w-8 text-blue-600 " />
        <FaInstagram className=" h-8 w-8 text-pink-600" />
        <FaTwitter className=" h-8 w-8 text-blue-400" />
      </ul>
    </footer>
  );
};

export default Footer;

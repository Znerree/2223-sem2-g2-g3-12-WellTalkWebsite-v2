import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" flex bg-gray-50 py-5 bottom-0 items-center px-6 items justify-between border-t-2">
      <h1 className=" text-slate-300 items-center">© WellTalk | 2023 | Guia | Batulan | Nadela | Perez | Prahinog</h1>
      <ul className=" flex gap-3 items-center text-slate-400">
        <FaFacebook size={20} />
        <FaInstagram size={20} />
        <FaTwitter size={20} />
      </ul>
    </footer>
  );
};

export default Footer;

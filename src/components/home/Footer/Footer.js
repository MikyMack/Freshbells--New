import footerLogo from "../../../assets/logo/logo.png";
import Banner from "../../../assets/images/banner/footer.jpg";
import { MdAttachEmail } from "react-icons/md";
import { CiTimer } from "react-icons/ci";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMobileAlt,
} from "react-icons/fa";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "center", // Changed to center for better responsiveness
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
]; 

const Footer = () => {
  return (
    <div className="flex justify-center items-center w-full font-body3">
      <div style={BannerImg} className="text-primeColor w-full">
        <div className="flex w-full">
          <div  className="flex items-center justify-center pb-10 pt-5 w-full">
            {/* company details */}
            {/* Footer Links */}
            <div className="grid md:grid-cols-3 lg:grid-cols-3 xs:grid-cols-1 sm:grid-cols-1  col-span-2 md:pl-10 w-full">
              <div className="w-full">
                <div className="py-8 px-4 w-full">
                  <h1 className="text-xl font-semibold text-center mb-3">
                    Important Links
                  </h1>
                  <ul className="flex xl:flex-col flex-row lg:flex-col md:flex-col justify-center  gap-3 items-center">
                    {FooterLinks.map((link) => (
                      <li
                        className="cursor-pointer font-normal text-primeColor hover:text-white hover:translate-x-1 duration-300"
                        key={link.title}
                      >
                        <span>{link.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="py-5 px-4 font-body2 w-full text-center">
                <img src={footerLogo} alt="" className="w-44 mx-auto mb-3" />
                <p className="font-medium">
                Fresh Bells provide customers good quantity and combo offers of millets. To grow the new healthy environment and prevent health issues.
                </p>
              </div>
              {/* social links */}
              <div className="w-full">
                <div className="flex justify-center items-center gap-3 mt-6">
                  <a href="/">
                    <FaInstagram className="text-3xl hover:text-purple-600" />
                  </a>
                  <a href="/">
                    <FaFacebook className="text-3xl hover:text-blue-600" />
                  </a>
                  <a href="/">
                    <FaLinkedin className="text-3xl hover:text-blue-600" />
                  </a>
                </div>
                <div className="mt-6 text-center">
                  <div className="flex flex-col xs:flex-row sm:flex-row justify-center items-center gap-3 font-medium">
                    <p className="text-center">Freshbells LLP, H24, Agricultural Urban Wholesale Market, Vengeri, Kozhikode, Kerala-673010</p>
                  </div>
                  <div className="flex flex-col xs:flex-row sm:flex-row justify-center items-center gap-3 mt-3 font-medium">
                    <FaMobileAlt className="self-center mt-1" />
                    <p>+91 9495967722</p>
                  </div>
                  <div className="flex flex-col xs:flex-row sm:flex-row justify-center items-center gap-3 mt-3 font-medium">
                    <MdAttachEmail className="self-center mt-1" />
                    <p>Freshbells@gmail.com</p>
                  </div>
                  <div className="flex flex-col xs:flex-row sm:flex-row justify-center items-center gap-3 mt-3 font-medium">
                    <CiTimer className="self-center mt-1" />
                    <p>Hours: <span>10:00 - 18:00, Mon - Sat</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

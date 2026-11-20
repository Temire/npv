import { FaPhoneAlt } from "react-icons/fa";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="w-full h-full bottom-0 bg-red-400 bg-contain "
      style={{
        background: "url('./footer-bg.png') top"
      }}>
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[100px] pt-[100px] pb-[50px]">
          <div>
            <div className="text-[20px] font-semibold text-white flex items-center gap-2 mb-6">
              <p>Nigeria property vault</p>
            </div>
            <Link
              className="text-white text-base font-medium flex items-center gap-2 mb-3"
              to={"tel:2349031378112"}>
              <div>
                <FaPhoneAlt />
              </div>
              <span>+234-9031378112</span>
            </Link>
            <Link
              className="text-white text-base font-medium flex items-center gap-2 mb-4"
              to={"mailto:support@nigeriapv.com"}>
              <div>
                <FaEnvelope />
              </div>
              <span>support@nigeriapv.com</span>
            </Link>
            <div className="mt-3">
              {/* <p className="text-white text-base font-medium mb-2">
                Follow us on
              </p> */}
              <div className="flex items-center gap-4 ">
                <Link to="#" className="text-white">
                  <FaLinkedinIn />
                </Link>
                <Link to="#" className="text-white">
                  <FaFacebookF />
                </Link>
                <Link to="#" className="text-white">
                  <FaInstagram />
                </Link>
                <Link to="#" className="text-white">
                  <FaTwitter />
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="text-[20px] font-semibold text-white flex items-center gap-2 mb-6">
              Quick Links
            </div>
            <Link
              className="text-white text-base font-normal flex items-center gap-2 mb-3"
              to={"tel:2349031378112"}>
              About us
            </Link>
            <Link
              className="text-white text-base font-normal flex items-center gap-2 mb-3"
              to={"mailto:support@nigeriapv.com"}>
              How it works
            </Link>
            <Link
              className="text-white text-base font-normal flex items-center gap-2 mb-3"
              to={"mailto:support@nigeriapv.com"}>
              Resources
            </Link>
          </div>
          <div>
            <div className="text-[20px] font-semibold text-white flex items-center gap-2 mb-6">
              Legal
            </div>
            <Link
              className="text-white text-base font-normal flex items-center gap-2 mb-3"
              to={"tel:2349031378112"}>
              Terms & Conditions
            </Link>
            <Link
              className="text-white text-base font-normal flex items-center gap-2 mb-3"
              to={"mailto:support@nigeriapv.com"}>
              Privacy & Policy
            </Link>
            <Link
              className="text-white text-base font-normal flex items-center gap-2 mb-3"
              to={"mailto:support@nigeriapv.com"}>
              Contact
            </Link>
          </div>
          <div>
            <div className="text-[20px] font-semibold text-white flex items-center gap-2 mb-6">
              Help
            </div>
            <Link
              className="text-white text-base font-normal flex items-center gap-2 mb-3"
              to={"tel:2349031378112"}>
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

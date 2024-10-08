import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import "./Footer.css";
import evangadiLogo from "../../CommonResource/evanLogo.jpeg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer d-lg-flex d-md-flex d-sm-block  ">
      <div className="footer__left mx-sm-5 ">
        <div className="footer__logo">
          <img src={evangadiLogo} alt="" />
        </div>
        <div className="footer__socialMedias col-sm-12">
          <div className="footer__facebook">
            <Link to="https://www.facebook.com/evangaditech?mibextid=ZbWKwL">
              <i className="fa-brands fa-facebook-f"></i>
              <FaFacebook size={30} />
            </Link>
          </div>
          <div className="footer__instagram">
            <Link to="https://www.instagram.com/evangaditech/">
              <i className="fa-brands fa-instagram"></i>
              <FaInstagram size={30} />
            </Link>
          </div>
          <div className="footer__youtube">
            <Link to="https://www.youtube.com/@EvangadiTech">
              <i className="fa-brands fa-youtube"></i>
              <FaYoutube size={30} />
            </Link>
          </div>
        </div>
      </div>
      <div className="footer__middle mx-sm-5 ">
        <div className="footer__info">Useful Link</div>
        <div className="footer__infoText">
          <div className="mb-2">How it works</div>
          <div className="mb-2">Terms of Service</div>
          <div className="mb-2">Privecy Policy</div>
        </div>
      </div>
      <div className="footer__right mx-sm-5">
        <div className="footer__info">Contact Info</div>
        <div className="footer__infoText">
          <div className="mb-2">Evangadi Network</div>
          <div className="mb-2">support@evangadi.com</div>
          <div className="mb-2">+!-202-386-2702</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

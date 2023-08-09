import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <h2>Weatherly</h2>
      <div className="footer__content">
        <a href="https://www.visualcrossing.com" target="_blank" rel="noreferrer">
          Powered by Visual Crossing Weather
        </a>
        <p>Made with ♥ K.LY</p>
      </div>
    </footer>
  );
};

export default Footer;
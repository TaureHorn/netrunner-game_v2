import zetatech from "../resources/zetatech.png";
import qr from "../resources/follow-me.png";

function Footer() {
  return (
    <>
      <div id="footer">
        <div
          className="inlineBox border bar"
          style={{ justifyContent: "space-between" }}
        >
          <img src={zetatech} height={60} className="image" alt="z logo" title="zetatech"/>
          <p id="footerTitle" className="titlesText subTitles">
            / powered by ZetaTech /|\ protected by Netwatch \
          </p>
          <img src={qr} height={80} className="image" alt="qr code" title="follow the rabbit hole"/>
        </div>
      </div>
    </>
  );
}

export default Footer;

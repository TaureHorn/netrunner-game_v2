import zetatech from "../resources/zetatech.png";
import qr from "../resources/follow-me.png";

function Footer(props) {
  return (
    <>
      <div
        className="inlineBox border hover header"
        style={{ justifyContent: "space-between" }}
      >
        <img src={zetatech} height={60} />
        <p style={{ fontSize:"16pt", fontStyle:"italic" }}>powered by ZetaTech /|\ protected by Netwatch</p>
        <img src={qr} height={80} />
      </div>
    </>
  );
}

export default Footer;

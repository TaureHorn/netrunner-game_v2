import netwatch from "../resources/netwatch.png";

function Header() {
  return (
    <>
      <div id="header">
        <div className="border hover inlineBox header">
          <img src={netwatch} height={30} />
          <p id="title" className="headerText" style={{ fontSize: "32pt" }}>
            NetWatch: Netrunner
          </p>
          <p style={{ fontStyle: "italic", fontSize: "16pt" }}>
            v.1.15.7(modified by shade)
          </p>
        </div>
      </div>
    </>
  );
}

export default Header;

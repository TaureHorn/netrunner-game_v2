import netwatch from "../resources/netwatch.png";

function Header(props) {
  return (
    <>
      <div className="border hover inlineBox header">
        <img src={netwatch} height={30} />
        <p className="headerText" style={{fontSize: "32pt"}}>NetWatch: Netrunner</p>
        <p style={{ fontStyle: "italic", fontSize:"16pt" }}> v.1.15.7(modified by shade)</p>
      </div>
    </>
  );
}

export default Header;

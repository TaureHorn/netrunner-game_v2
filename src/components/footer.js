function Footer(props) {

    const rand = Math.random().toString(28).slice(2,16)

  function shutDown() {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("gameState");
    props.alert("erasing Virtual Machine Environment!");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  return (
    <>
      <div className="inlineBox border" style={{ justifyContent: "space-between"}}>
      <p>{rand}</p>
        <p>
          <em>powered by ZetaTech /|\ protected by Netwatch</em>
        </p>
        <button onClick={() => shutDown()}> VME shutdown </button>
      </div>
    </>
  );
}

export default Footer;

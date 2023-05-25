import { React, useEffect, useState } from "react";

function CommandHistory(props) {
  const [cmds, setCmds] = useState([]);

  useEffect(() => {
    setCmds(props.arr);
  }, [props.arr]);

  return (
    <>
      {cmds.map((cmd) => {
        // most of the time cmd.result2-5 are empty strings and are therefore not rendered
        return (
          <div className="cmdReturn" key={crypto.randomUUID()}>
            <p style={{ fontWeight: "bold" }}>{cmd?.cmd}</p>
            <p className="highlightText" style={{ fontStyle: "italic" }}>{cmd?.result}</p>
            <p className="highlightText" style={{ fontStyle: "italic" }}>{cmd?.result2}</p>
            <p className="highlightText" style={{ fontStyle: "italic" }}>{cmd?.result3}</p>
            <p className="highlightText" style={{ fontStyle: "italic" }}>{cmd?.result4}</p>
            <p className="highlightText" style={{ fontStyle: "italic" }}>{cmd?.result5}</p>
          </div>
        );
      })}
    </>
  );
}

export default CommandHistory;

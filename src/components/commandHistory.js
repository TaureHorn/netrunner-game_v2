import { React, useEffect, useState } from "react";

function CommandHistory(props) {
  const [cmds, setCmds] = useState([]);

  useEffect(() => {
    setCmds(props.arr);
  }, [props.arr]);

  return (
    <>
      {cmds.map(cmd => {
        return (
            <div key={crypto.randomUUID()}>
            <p style={{fontWeight: "bold"}}>{cmd?.cmd}</p>
            <p style={{fontStyle: "italic"}}>{cmd?.return1}</p>
            <p style={{fontStyle: "italic"}}>{cmd?.return2}</p>
            <p style={{fontStyle: "italic"}}>{cmd?.return3}</p>
            <p style={{fontStyle: "italic"}}>{cmd?.return4}</p>
            </div>
        );
      })}
    </>
  );
}

export default CommandHistory;

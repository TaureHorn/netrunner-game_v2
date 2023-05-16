export function sectionSelector(array, section, array2, section2, style) {
    // function to change a selected element by one style and an array of other elements to a different style at once
  const x = document.getElementById(section);
  const y = document.getElementById(section2);

// pre-designated styles -- chosen based on 'style' parameter
    const text = { white: "white", red: "rgb(255,0,85)" };
  const outline = {
    white: "1px solid white",
    red: "1px solid rgb(255,0,85)",
  };
  const background = {
    white: "rgba(255,255,255,0.2)",
    red: "rgba(255,0,85,0.25)",
    none: "none",
  };

  let active = "";
  let inactive = "";
  switch (style) {
    case "red":
      active = {
        text: text.white,
        outline: outline.white,
        background: background.red,
      };
      inactive = {
        text: text.red,
        outline: outline.red,
        background: background.none,
      };
      break;
    default:
      alert("function sectionSelector requires an inputted style");
  }

  array.forEach((id) => {
    document.getElementById(id).style.display = "none";
  });
  array2.forEach((id) => {
    document.getElementById(id).style.outline = inactive.outline;
    document.getElementById(id).style.color = inactive.text;
    document.getElementById(id).style.background = inactive.background;
  });
  x.style.display = "block";
  y.style.color = active.text;
  y.style.outline = active.outline;
  y.style.backgroundColor = active.background;
}

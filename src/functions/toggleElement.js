export const uiElements = {
  footer: "footer",
  header: "header",
  help: "helpSidebar",
  software: "softwareSidebar",
};

export function toggleElement(element) {
  const x = document.getElementById(element);
  if (x.style.display === "none") {
    return (x.style.display = "block");
  }
  return (x.style.display = "none");
}

export function themer(element) {
  const themeSelectors = [
    "darkLowContrast",
    "darkHighContrast",
    "arasaka",
    "white",
    "yellow",
    "BSOD",
  ];
  const x = document.getElementById(element);

  themeSelectors.forEach((selector) => {
    document.getElementById(selector).style.background = "none";
    document.getElementById(selector).style.color = "white";
  });
  x.style.backgroundColor = "white";
  x.style.color = "black";
}

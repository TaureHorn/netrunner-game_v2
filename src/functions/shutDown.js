export function shutDown() {
  window.localStorage.removeItem("username");
  window.localStorage.removeItem("notes");
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}

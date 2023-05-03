export function shutDown() {
  window.localStorage.removeItem("username");
  window.localStorage.removeItem("gameState");
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}

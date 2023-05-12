export function shutDown() {
  const localStorage = ["username", "notes", "plan", "warning"];
  localStorage.forEach((item) => {
    window.localStorage.removeItem(item);
  });
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}

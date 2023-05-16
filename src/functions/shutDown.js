export function shutDown() {
  // erases all data held in local storage and reloads the page - taking the user back to login
  const localStorage = ["username", "notes", "plan", "warning"];
  localStorage.forEach((item) => {
    window.localStorage.removeItem(item);
  });
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}

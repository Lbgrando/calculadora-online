const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", async () => {
  await fetch("http://localhost:3000/logout", {
    method: "POST",
    credentials: "include"
  });

  window.location.href = "index.html";
});

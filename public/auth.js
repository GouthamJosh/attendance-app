/* SIGN UP */
function signup() {
  fetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
  .then(res => res.json())
  .then(msg => {
    alert(msg);
    window.location.href = "/login.html";
  });
}

/* LOGIN */
function login() {
  fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (!data.token) {
      alert(data);
      return;
    }
    localStorage.setItem("token", data.token);
    window.location.href = "/index.html";
  });
}

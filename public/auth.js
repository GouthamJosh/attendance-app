function signup() {
  fetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      captcha: grecaptcha.getResponse()
    })
  })
  .then(res => res.json())
  .then(msg => {
    alert(msg);
    location.href = "login.html";
  });
}

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
    localStorage.setItem("token", data.token);
    location.href = "index.html";
  });
}

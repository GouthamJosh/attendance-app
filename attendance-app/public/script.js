const token = localStorage.getItem("token");

/* PROTECT PAGES */
if (!token && location.pathname !== "/login.html") {
  location.href = "/login.html";
}

/* LOGOUT */
function logout() {
  localStorage.removeItem("token");
  location.href = "/login.html";
}

/* ADD STUDENT */
async function addStudent() {
  await fetch("/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({
      name: name.value,
      rollNo: rollNo.value,
      className: className.value
    })
  });
  alert("Student Added");
}

/* MARK ATTENDANCE */
async function markAttendance() {
  const students = await fetch("/students", {
    headers: { "Authorization": token }
  }).then(res => res.json());

  const records = students.map(s => ({
    studentId: s._id,
    status: "present"
  }));

  const res = await fetch("/attendance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({
      date: date.value,
      records
    })
  });

  const msg = await res.json();
  alert(msg);
}

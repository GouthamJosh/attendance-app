const token = localStorage.getItem("token");

if (!token && location.pathname !== "/login.html") {
  location.href = "/login.html";
}

function logout() {
  localStorage.removeItem("token");
  location.href = "/login.html";
}

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
      className: className.value,
      division: division.value,
      semester: semester.value
    })
  });
  alert("Student Added");
}

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

  alert(await res.json());
}


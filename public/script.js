const token = localStorage.getItem("token");
if (!token && location.pathname !== "/login.html" && location.pathname !== "/signup.html") {
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
      Authorization: token
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

async function loadStudents() {
  const res = await fetch("/students", { headers: { Authorization: token }});
  const data = await res.json();
  students.innerHTML = "";
  data.forEach(s => {
    students.innerHTML += `
      <tr>
        <td>${s.rollNo}</td>
        <td>${s.name}</td>
        <td>${s.division}</td>
        <td>${s.semester}</td>
        <td>
          <select id="status-${s._id}">
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </td>
      </tr>`;
  });
}

if (document.getElementById("students")) loadStudents();

async function markAttendance() {
  const res = await fetch("/students", { headers: { Authorization: token }});
  const list = await res.json();

  const records = list.map(s => ({
    studentId: s._id,
    status: document.getElementById(`status-${s._id}`).value
  }));

  const r = await fetch("/attendance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ date: date.value, records })
  });

  alert(await r.json());
}

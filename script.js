document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("studentForm");
    const studentTableBody = document.getElementById("studentTableBody");

    function loadStudents() {
        const students = JSON.parse(localStorage.getItem("students")) || [];
        studentTableBody.innerHTML = "";
        students.forEach((student, index) => {
            addStudentToTable(student, index);
        });
    }

    function addStudentToTable(student, index) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    }

    function saveStudents(students) {
        localStorage.setItem("students", JSON.stringify(students));
        loadStudents();
    }

    studentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const studentId = document.getElementById("studentId").value.trim();
        const email = document.getElementById("email").value.trim();
        const contact = document.getElementById("contact").value.trim();

        if (!name || !studentId || !email || !contact) {
            alert("All fields are required!");
            return;
        }

        let students = JSON.parse(localStorage.getItem("students")) || [];
        students.push({ name, studentId, email, contact });
        saveStudents(students);

        studentForm.reset();
    });

    window.editStudent = (index) => {
        let students = JSON.parse(localStorage.getItem("students")) || [];
        let student = students[index];

        document.getElementById("name").value = student.name;
        document.getElementById("studentId").value = student.studentId;
        document.getElementById("email").value = student.email;
        document.getElementById("contact").value = student.contact;

        students.splice(index, 1);
        saveStudents(students);
    };

    window.deleteStudent = (index) => {
        if (confirm("Are you sure you want to delete this student?")) {
            let students = JSON.parse(localStorage.getItem("students")) || [];
            students.splice(index, 1);
            saveStudents(students);
        }
    };

    loadStudents();
});

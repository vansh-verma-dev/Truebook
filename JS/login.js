function createact() {
  const username = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const mobile = document.getElementById('Mnumber').value.trim();
  const password = document.getElementById('passward').value.trim();
  const cpassword = document.getElementById('Cpassward').value.trim();

  if (!username || !email || !mobile || !password || !cpassword) {
    alert("All fields are required");
    return;
  }

  if (password !== cpassword) {
    alert("Password does not match");
    return;
  }

  const userData = {
    username,
    email,
    mobile,
    password
  };

  localStorage.setItem("truebook_user", JSON.stringify(userData));
  localStorage.setItem("truebook_login", "true");

  alert("Account created successfully");
  window.location.href = "dashboard.html";
}
// =========sign In page======
function loginUser() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (email === "" || password === "") {
    alert("Please enter email and password");
    return;
  }

  const savedUser = JSON.parse(localStorage.getItem("truebook_user"));

  if (!savedUser) {
    alert("No account found. Please create account first.");
    return;
  }

  if (email === savedUser.email && password === savedUser.password) {
    localStorage.setItem("truebook_login", "true");
    alert("Login successful");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password");
  }
}

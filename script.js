// CADASTRO
function register() {
  let user = document.getElementById("regUser").value
  let pass = document.getElementById("regPass").value

  if (!user || !pass) {
    document.getElementById("msg").innerText = "Preencha tudo!"
    return
  }

  let users = getUsers()

  if (users.find(u => u.user === user)) {
    document.getElementById("msg").innerText = "Usuário já existe"
    return
  }

  users.push({
    user,
    pass,
    createdAt: new Date().toLocaleString(),
    lastLogin: null,
    theme: "dark"
  })

  saveUsers(users)

  document.getElementById("msg").innerText = "Conta criada!"
}

// LOGIN
function login() {
  let user = document.getElementById("loginUser").value
  let pass = document.getElementById("loginPass").value

  let users = getUsers()

  let found = users.find(u => u.user === user && u.pass === pass)

  if (found) {
    found.lastLogin = new Date().toLocaleString()
    saveUsers(users)

    localStorage.setItem("loggedUser", user)

    window.location.href = "dashboard.html"
  } else {
    document.getElementById("msg").innerText = "Login inválido"
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("loggedUser")
  window.location.href = "index.html"
}

// PROTEGER PÁGINAS
function protect() {
  if (!getLoggedUser()) {
    window.location.href = "index.html"
  }
}

// DASHBOARD
if (window.location.pathname.includes("dashboard")) {
  protect()

  let users = getUsers()
  let current = getLoggedUser()
  let user = users.find(u => u.user === current)

  document.getElementById("welcome").innerText = "Bem-vindo, " + user.user
  document.getElementById("lastLogin").innerText = "Último acesso: " + user.lastLogin
}

// PROFILE
if (window.location.pathname.includes("profile")) {
  protect()

  let users = getUsers()
  let current = getLoggedUser()
  let user = users.find(u => u.user === current)

  document.getElementById("username").innerText = "Usuário: " + user.user
  document.getElementById("created").innerText = "Criado em: " + user.createdAt
  document.getElementById("lastLogin").innerText = "Último login: " + user.lastLogin

  if (user.theme === "light") {
    document.body.classList.add("light")
  }
}

// TEMA
function toggleTheme() {
  document.body.classList.toggle("light")

  let users = getUsers()
  let current = getLoggedUser()
  let user = users.find(u => u.user === current)

  user.theme = document.body.classList.contains("light") ? "light" : "dark"

  saveUsers(users)
}
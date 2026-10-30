
// ==========================================
// LOGIN SYSTEM - AUTENTICAÇÃO E USUÁRIOS
// ==========================================

// Cadastro de usuário
function register() {
  const userInput = document.getElementById("regUser");
  const passInput = document.getElementById("regPass");
  const message = document.getElementById("msg");

  if (!userInput || !passInput || !message) return;

  const user = userInput.value.trim();
  const pass = passInput.value;

  if (!user || !pass) {
    message.textContent = "Preencha todos os campos!";
    return;
  }

  const users = getUsers();

  const alreadyExists = users.some(
    (item) => item.user.toLowerCase() === user.toLowerCase()
  );

  if (alreadyExists) {
    message.textContent = "Esse usuário já existe.";
    return;
  }

  const newUser = {
    user: user,
    pass: pass,
    createdAt: new Date().toLocaleString("pt-BR"),
    lastLogin: new Date().toLocaleString("pt-BR"),
    theme: "dark"
  };

  users.push(newUser);
  saveUsers(users);

  // Mantém o usuário conectado após o cadastro
  localStorage.setItem("loggedUser", user);

  window.location.href = "dashboard.html";
}

// Login
function login() {
  const userInput = document.getElementById("loginUser");
  const passInput = document.getElementById("loginPass");
  const message = document.getElementById("msg");

  if (!userInput || !passInput || !message) return;

  const user = userInput.value.trim();
  const pass = passInput.value;

  if (!user || !pass) {
    message.textContent = "Informe seu usuário e sua senha.";
    return;
  }

  const users = getUsers();

  // Compatível com as contas já cadastradas
  const found = users.find(
    (item) =>
      item.user.toLowerCase() === user.toLowerCase() &&
      item.pass === pass
  );

  if (!found) {
    message.textContent = "Usuário ou senha incorretos.";
    return;
  }

  found.lastLogin = new Date().toLocaleString("pt-BR");

  saveUsers(users);
  localStorage.setItem("loggedUser", found.user);

  window.location.href = "dashboard.html";
}

// Logout
function logout() {
  localStorage.removeItem("loggedUser");
  window.location.href = "index.html";
}

// Recupera usuário conectado
function getCurrentUser() {
  const current = getLoggedUser();

  if (!current) return null;

  return getUsers().find(
    (item) => item.user === current
  ) || null;
}

// Proteção de páginas
function protect() {
  const user = getCurrentUser();

  if (!user) {
    localStorage.removeItem("loggedUser");
    window.location.href = "index.html";
    return false;
  }

  return true;
}

// Dashboard
if (window.location.pathname.includes("dashboard")) {
  if (protect()) {
    const user = getCurrentUser();

    const welcome = document.getElementById("welcome");
    const lastLogin = document.getElementById("lastLogin");

    if (welcome) {
      welcome.textContent = "Bem-vindo, " + user.user;
    }

    if (lastLogin) {
      lastLogin.textContent = "Último acesso: " + user.lastLogin;
    }
  }
}

// Perfil
if (window.location.pathname.includes("profile")) {
  if (protect()) {
    const user = getCurrentUser();

    const username = document.getElementById("username");
    const created = document.getElementById("created");
    const lastLogin = document.getElementById("lastLogin");

    if (username) {
      username.textContent = "Usuário: " + user.user;
    }

    if (created) {
      created.textContent = "Criado em: " + user.createdAt;
    }

    if (lastLogin) {
      lastLogin.textContent = "Último login: " + user.lastLogin;
    }

    if (user.theme === "light") {
      document.body.classList.add("light");
    }
  }
}

// Alternar tema
function toggleTheme() {
  const user = getCurrentUser();

  if (!user) return;

  document.body.classList.toggle("light");

  const users = getUsers();
  const index = users.findIndex(
    (item) => item.user === user.user
  );

  if (index !== -1) {
    users[index].theme = document.body.classList.contains("light")
      ? "light"
      : "dark";

    saveUsers(users);
  }
}

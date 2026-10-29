
function showMessage(message) {
  const msg = document.getElementById("msg");
  if (msg) msg.textContent = message;
}

// CADASTRO
function register() {
  const user = document.getElementById("regUser").value.trim();
  const pass = document.getElementById("regPass").value;

  if (!user || !pass) {
    showMessage("Preencha todos os campos.");
    return;
  }

  if (user.length < 3) {
    showMessage("O usuário precisa ter pelo menos 3 caracteres.");
    return;
  }

  if (pass.length < 6) {
    showMessage("A senha precisa ter pelo menos 6 caracteres.");
    return;
  }

  const users = getUsers();

  if (users.some(u => u.user.toLowerCase() === user.toLowerCase())) {
    showMessage("Esse usuário já existe.");
    return;
  }

  const now = new Date().toLocaleString("pt-BR");

  users.push({
    user: user,
    pass: pass,
    createdAt: now,
    lastLogin: now,
    theme: "dark"
  });

  saveUsers(users);

  // Mantém o usuário conectado após criar a conta.
  localStorage.setItem("loggedUser", user);

  // Abre o dashboard imediatamente.
  window.location.href = "dashboard.html";
}

// LOGIN
function login() {
  const userInput = document.getElementById("loginUser");
  const passInput = document.getElementById("loginPass");

  const user = userInput.value.trim();
  const pass = passInput.value;

  if (!user || !pass) {
    showMessage("Informe seu usuário e sua senha.");
    return;
  }

  const users = getUsers();
  const found = users.find(
    u => u.user.toLowerCase() === user.toLowerCase() && u.pass === pass
  );

  if (!found) {
    showMessage("Usuário ou senha incorretos.");
    return;
  }

  found.lastLogin = new Date().toLocaleString("pt-BR");
  saveUsers(users);
  localStorage.setItem("loggedUser", found.user);

  window.location.href = "dashboard.html";
}

// LOGOUT
function logout() {
  localStorage.removeItem("loggedUser");
  window.location.href = "index.html";
}

// PROTEÇÃO DAS PÁGINAS INTERNAS
function protect() {
  if (!getLoggedUser()) {
    window.location.href = "index.html";
    return false;
  }

  return true;
}

// DASHBOARD
if (window.location.pathname.includes("dashboard")) {
  if (protect()) {
    const current = getLoggedUser();
    const user = getUsers().find(u => u.user === current);

    if (!user) {
      logout();
    } else {
      const welcome = document.getElementById("welcome");
      const lastLogin = document.getElementById("lastLogin");

      if (welcome) {
        welcome.textContent = "Bem-vindo, " + user.user;
      }

      if (lastLogin) {
        lastLogin.textContent = "Último acesso: " + user.lastLogin;
      }

      if (user.theme === "light") {
        document.body.classList.add("light");
      }
    }
  }
}

// PERFIL
if (window.location.pathname.includes("profile")) {
  if (protect()) {
    const current = getLoggedUser();
    const user = getUsers().find(u => u.user === current);

    if (!user) {
      logout();
    } else {
      const username = document.getElementById("username");
      const created = document.getElementById("created");
      const lastLogin = document.getElementById("lastLogin");

      if (username) username.textContent = "Usuário: " + user.user;
      if (created) created.textContent = "Criado em: " + user.createdAt;
      if (lastLogin) lastLogin.textContent = "Último login: " + user.lastLogin;

      if (user.theme === "light") {
        document.body.classList.add("light");
      }
    }
  }
}

// TEMA
function toggleTheme() {
  const current = getLoggedUser();
  if (!current) return;

  document.body.classList.toggle("light");

  const users = getUsers();
  const user = users.find(u => u.user === current);

  if (!user) {
    logout();
    return;
  }

  user.theme = document.body.classList.contains("light") ? "light" : "dark";
  saveUsers(users);
}


function showMessage(message) {
  const element = document.getElementById("msg");

  if (element) {
    element.textContent = message;
  }
}

// CADASTRO
function register() {
  const userInput = document.getElementById("regUser");
  const passInput = document.getElementById("regPass");

  if (!userInput || !passInput) return;

  const user = userInput.value.trim();
  const pass = passInput.value;

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

  const alreadyExists = users.some(
    (item) => item.user.toLowerCase() === user.toLowerCase()
  );

  if (alreadyExists) {
    showMessage("Esse nome de usuário já está cadastrado.");
    return;
  }

  const newUser = {
    user,
    pass,
    createdAt: new Date().toLocaleString("pt-BR"),
    lastLogin: new Date().toLocaleString("pt-BR"),
    theme: "dark"
  };

  users.push(newUser);
  saveUsers(users);

  // Inicia a sessão automaticamente após o cadastro.
  localStorage.setItem("loggedUser", user);

  window.location.href = "dashboard.html";
}

// LOGIN
function login() {
  const userInput = document.getElementById("loginUser");
  const passInput = document.getElementById("loginPass");

  if (!userInput || !passInput) return;

  const user = userInput.value.trim();
  const pass = passInput.value;

  if (!user || !pass) {
    showMessage("Informe seu usuário e sua senha.");
    return;
  }

  const users = getUsers();

  const found = users.find(
    (item) =>
      item.user.toLowerCase() === user.toLowerCase() &&
      item.pass === pass
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
    const users = getUsers();
    const current = getLoggedUser();
    const user = users.find((item) => item.user === current);

    if (!user) {
      logout();
    } else {
      const welcome = document.getElementById("welcome");
      const lastLogin = document.getElementById("lastLogin");

      if (welcome) {
        welcome.textContent = `Bem-vindo, ${user.user}`;
      }

      if (lastLogin) {
        lastLogin.textContent = `Último acesso: ${user.lastLogin || "Primeiro acesso"}`;
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
    const users = getUsers();
    const current = getLoggedUser();
    const user = users.find((item) => item.user === current);

    if (!user) {
      logout();
    } else {
      const username = document.getElementById("username");
      const created = document.getElementById("created");
      const lastLogin = document.getElementById("lastLogin");

      if (username) {
        username.textContent = `Usuário: ${user.user}`;
      }

      if (created) {
        created.textContent = `Criado em: ${user.createdAt}`;
      }

      if (lastLogin) {
        lastLogin.textContent = `Último login: ${user.lastLogin || "Ainda não realizado"}`;
      }

      if (user.theme === "light") {
        document.body.classList.add("light");
      }
    }
  }
}

// TEMA
function toggleTheme() {
  if (!getLoggedUser()) return;

  document.body.classList.toggle("light");

  const users = getUsers();
  const current = getLoggedUser();
  const user = users.find((item) => item.user === current);

  if (!user) {
    logout();
    return;
  }

  user.theme = document.body.classList.contains("light")
    ? "light"
    : "dark";

  saveUsers(users);
}

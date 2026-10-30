
# Login System

Projeto desenvolvido para praticar os fundamentos do desenvolvimento web, com foco em autenticação de usuários e manipulação de dados no navegador.

O sistema permite criar uma conta, fazer login e acessar uma área interna com informações do usuário.

## Funcionalidades

- Cadastro de novos usuários
- Login com usuário e senha
- Redirecionamento após autenticação
- Dashboard com mensagem de boas-vindas
- Página de perfil com informações da conta
- Registro da data de criação e do último acesso
- Alternância entre tema claro e escuro
- Logout e proteção das páginas internas

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage

## Organização dos arquivos

```text
system-login/
├── index.html
├── register.html
├── dashboard.html
├── profile.html
├── style.css
├── script.js
├── utils.js
└── README.md
```

## Como executar

O projeto é uma aplicação web estática.

1. Faça o download ou clone este repositório.
2. Abra a pasta do projeto.
3. Execute o arquivo `index.html` no navegador.

Também é possível acessar a versão publicada pelo GitHub Pages.

## Armazenamento de dados

As informações das contas são armazenadas no `LocalStorage` do navegador. Isso permite manter os dados entre acessos no mesmo navegador, sem a necessidade de um banco de dados externo.

**Observação:** este projeto tem finalidade de estudo. Como utiliza armazenamento local e não possui autenticação em servidor, não deve ser utilizado para armazenar contas ou senhas reais.

## Objetivo

O desenvolvimento deste projeto ajudou a colocar em prática conceitos de JavaScript, manipulação do DOM, eventos, armazenamento local e organização de arquivos em uma aplicação web.

## Acesso ao projeto

[Visualizar Login System](https://pedrohenriquedev-lab.github.io/system-login/)

# Sistema de Login (Backend)

## 📖  Descrição

Este é um projeto de um sistema de login backend. Ele armazena os novos usuários, faz a autenticação de usuários já cadastrados.

</br>

## 🛠️ Funcionalidades

- Verificar se o usuário se encontra no banco de dados
- Libera o acesso ao sistema somente se o usuário estiver logado.
- Faz o registro do novo usuário caso todas as regras estejam corretas ( email válido, email já cadastrado, senha forte, senhas iguais )

</br>

## 📡 Tecnologias utilizadas 
<br/>
<div align="center"> 
<img align="left" alt="NodeJs" height="50" width="50" src="./imgREADME/nodejs.svg">
<img align="left" alt="Typescript" height="50" width="50" src="./imgREADME/typescript.svg">
<img align="left" alt="Sequelize" height="50" width="50" src="./imgREADME/sequelize.svg">
<img align="left" alt="Express" height="50" width="50" src="./imgREADME/expressjs.png">
<img align="left" alt="JWT" height="50" width="50" src="./imgREADME/jwt.svg">
</div>
<br/><br/><br/><br/>

## 📖 Aprendizado
- Configurar o servidor, de modo que se comunique via JSON
- Fazer a configuração de rotas com o Router do express
- Modelo MVC
- Criar a instâcia do sequelize para comunicação com o banco de dados
- Configuração das variáveis de ambientes do dotenv
- Trabalhar com a Requisição e Resposta da api via JSON
- Fazer as devidas verificações das requisições envidas pelos usuários
- Fazer a criptografia da senha com o Bcrypt, antes de salvar no banco de dados
- Verificar se o email é um email valido, com o EmailValidator
- Criar um Token, com o JWT, para cada usuário
 - Utilizar esse Token para a verificação se o usuário está logado para autorizar o acesso ao sistema



## 🔎 Status do Projeto
- Projeto rodando em: [Sistema Login - Leonardo Cunha](https://sistema-login.leonardocunha.dev.br/)
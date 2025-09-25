# Sistema de Gerenciamento de Usuários

![Java](https://img.shields.io/badge/Java-8%2B-blue)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-2.x-brightgreen)
![JPA/Hibernate](https://img.shields.io/badge/JPA-Hibernate-orange)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple)

## 📝 Descrição do Projeto

Este é um projeto Full Stack de um sistema de Gerenciamento de Usuários, desenvolvido como parte de um teste técnico. 
A aplicação permite realizar operações de CRUD (Criar, Ler, Atualizar e Deletar) para usuários, 
com uma interface simples e intuitiva e uma API REST robusta no back-end.

## ✨ Funcionalidades

- **Cadastro de Usuários:** Formulário completo para inserção de novos usuários com validação de dados em tempo real.
- **Listagem de Usuários:** Visualização de todos os usuários em uma tabela com paginação eficiente no lado do servidor.
- **Edição de Usuários:** Alteração dos dados de usuários existentes.
- **Exclusão de Usuários:** Remoção de usuários do sistema.
- **Validação Dupla:** As regras de negócio são validadas tanto no front-end (para melhor UX) quanto no back-end (para garantir a integridade dos dados).
- **Preenchimento Automático de Endereço:** Integração com a API ViaCEP para buscar o endereço a partir do CEP.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

#### **Back-end**
- **Java 17** .
- **Spring Boot:** Framework principal para criação da API REST.
- **Spring Data JPA / Hibernate:** Para persistência de dados e comunicação com o banco.
- **Spring Boot Validation:** Para validação das regras de negócio na API.
- **PostgreSQL** .
- **Maven:** Gerenciador de dependências e build.

#### **Front-end**
- **HTML5**
- **CSS3**
- **Bootstrap 5:** Framework CSS para estilização e responsividade.
- **JavaScript (ES6+):** Para manipulação do DOM, requisições à API (`fetch`) e lógica de front-end.
- **IMask.js:** Biblioteca para aplicação de máscaras nos campos do formulário.

# ⚙️ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) (versão 8 ou superior)
- [Maven](https://maven.apache.org/download.cgi) (ou usar o Maven Wrapper incluso no Spring Boot)
- [PostgreSQL](https://www.postgresql.org/download/) ou [MySQL](https://dev.mysql.com/downloads/mysql/)
- Um editor de código, como [IntelliJ IDEA](https://www.jetbrains.com/idea/download/) ou [VS Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/downloads)

## 🏁 Rodando o Projeto

Siga os passos abaixo para executar o projeto localmente.

### 1. Clonar o Repositório

git clone https://github.com/PauloFerdin/teste-tecnico-gerenciamento-usuario.git)

### 2. Configurando o Banco de Dados

- Caso você faça o uso de PostgreSQL, no seu src/main/resources/application.properties

spring.datasource.url=jdbc:postgresql://localhost:5432/[NOME_DO_SEU_BANCO]

spring.datasource.username=[SEU_USUARIO_POSTGRES]

spring.datasource.password=[SUA_SENHA_POSTGRES]

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect


- Caso você faça o uso de MySQL, no seu src/main/resources/application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/[NOME_DO_SEU_BANCO]?createDatabaseIfNotExist=true

spring.datasource.username=[SEU_USUARIO_MYSQL]

spring.datasource.password=[SUA_SENHA_MYSQL]

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

### 3. Execute a Aplicação

Você pode rodar diretamente da sua IDE. Ou via comando com o Maven: 

./mvnw spring-boot:run 
O servidor back-end estará rodando em http://localhost:8081

### 4. Rodando o Front-End

- No seu Intellij (ou a ide que estiver usando) clique no index.html dentro da pasta front end, e rode o arquivo. 
- (No Intellij será botão direito em cima e Run Index.html)

👨‍💻 Autor
Desenvolvido por Paulo Cesar Maximiano Ferdin.

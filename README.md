# Boas vindas ao repositório do projeto <b>Trybe Futebol Clube</b>!

Esse projeto foi desenvolvido durante o módulo de Backend na Trybe! #vqv 

Aqui você vai encontrar os detalhes de como foi o desenvolvimento do projeto e quais foram os requisitos técnicos necessários para a entrega do desafio.

---

# Habilidades desenvolvidas

Neste projeto, fui capaz de:

- Utilizar TypeScript;
- Utilizar os princípios do POO para criar uma estrutura de um campeonato de futebol;
- Utilizar os princípios da arquitetura SOLID para organizar o projeto e deixá-lo com uma manutenibilidade muito maior;
- Construir um backend dockerizado utilizando modelagem de dados através do ORM Sequelize;
- CRUD para criação, leitura, atualização e/ou remoção de usuários, times, partidas e tabela (placar do campeonato);
- Organização do código respeitando também o modelo MSC (Model-Service-Controller), de forma a dividir a responsabilidade do código e das funções/métodos de acordo com suas propostas;
- Construção de testes de integração utilizando **Mocha**, **Chai** e **Sinon**.
   
---

# CRUD

CRUD é um acrônimo para **C**reate, **R**ead, **U**pdate and **D**elete. Em português seria **Criar**, **Ler**, **Atualizar** e **Deletar** registros. Nesse projeto trabalhamos diretamente com a manipulação no banco de dados MySQL, utilizando do ORM Sequelize para a manipulação do banco.

---

# MSC

MSC é um acrônimo para **M**odel, **S**ervices e **C**ontroller. A utilização dessas camadas facilita a manutenção e legibilidade no código, uma vez que cada camada é responsável por apenas uma função. A camada Controller é responsável por retornar as requisições e respostas de nossa API para o usuário, enquanto que a camada Model faz as queries necessárias diretamente ao banco de dados. Já o Service é responsável por fazer a intermediação entre as duas camadas, podendo agir como regulador das regras de negócio da aplicação e lançar erros em caso de algum problema na requisição ou query.

---

# ORM

Os ORMs ou **O**bject-**R**elational **M**appers visam diminuir o uso dos comandos e consultas SQL nas tabelas do banco de dados. Utilizando um framework baseado em ORM, conseguimos utilizar comandos SQL sem utilizar a linguagem do mySQL para tal. Nesse projeto utilizamos o **Sequelize**.

---

# Sequelize

O Sequelize é um ORM baseado em **Promises** para Node.js e pode ser utilizado para diversos bancos de dados. Neste projeto, utilizei em conjunto com o MySQL.

---

# POO

O paradigma da POO (**P**rogramação **O**rientada a **O**bjetos) é um modelo de análise, projeto e programação baseado na aproximação entre o mundo real e o mundo virtual, através da criação e interação entre objetos, atributos, códigos, métodos, entre outros.

---

# SOLID

O SOLID é um facilitador que torna o código mais coeso, além de mais fácil de manter, estender, adaptar e ajustar conforme alterações de escopo. Além disso, ele faz com que o código seja testável e de fácil entendimento, extensível e forneça o máximo de reaproveitamento. O termo SOLID é um acrônimo que representa cinco ideias, originadas pelo famoso Robert Cecil Martin, e significam:

- Single Responsability Principle (Princípio da Responsabilidade Única);
- Open/Closed Principle (Princípio Aberto/Fechado);
- Liskov Substitution Principle (Princípio da substituição de Liskov);
- Interface Segregation Principle (Princípio da Segregação de Interface);
- Dependency Inversion Principle (Princípio da Inversão de Dependência).

Para mais detalhes, sugiro acessar documentações oficiais.

---

# Funcionamento da aplicação

Para rodar está aplicação é necessário ter **Git**, **Docker**, **Node** e o **Docker Compose** instalados no seu computador. O Docker Compose precisa estar na versão **1.29** ou superior e o Node na versão **16**.

### 1 - Clone o repositório e entre na pasta do projeto

```
git clone git@github.com:GJMKauer/trybe-futebol-clube.git && cd trybe-futebol-clube
```

### 2 - Execute o comando para criação dos containers do Docker

```
npm run compose:up
```

### 3 - Acesse a aplicação no seu navegador pelo link

http://localhost:3000/

### 4 - Utilize uma das credenciais abaixo para logar na aplicação e testar

#### Administrador

* email: admin@admin.com
* password: secret_admin

#### Usuário comum

* email: user@user.com
* password: secret_user

O projeto trata-se de um desafio para consolidar todo o aprendizado até então em backend. Sendo o projeto mais desafiador da Trybe até o momento, tivemos que utilizar todos os conceitos ensinados e praticados desde então - utilização de HOFs, CRUD, Sequelize, manipulação do banco de dados, criação e validação de tokens JWT para login/cadastro de usuários, validação/criptografia de senhas com o BCrypt e muito mais.

Com isso, o projeto trata-se de um sistema de gerenciamento de campeonato do *Trybe Futebol Clube* (vide nome do projeto). Nele, é possível realizar login como um usuário comum ou como um administrador; visualizar partidas em andamento e já finalizadas; alterar o placar das partidas em andamento; finalizar partidas em andamento; adicionar novas partidas e visualizar o placar geral do campeonato.

A parte do frontend da aplicação já veio pronta pela Trybe. No entanto, todo o Backend e validações foram realizadas por mim. Além de tudo isso, implementei testes de integração que garantem o funcionamento do código.

---

# Cobertura de testes da aplicação

Execute o comando abaixo no diretório raiz do projeto para verificar a cobertura de testes.

```
cd app/backend/ && npm install && npm run test:coverage
```

Construí a cobertura de pouco mais de 99% das funções do código, porém no futuro pretendo atingir a cobertura da totalidade das linhas.

---

# Histórico de Commits

É possível verificar todo o histórico de commits do projeto, de modo a visualizar passo-a-passo como foi desenvolvido o meu raciocínio até a finalização do projeto.

---

# Requisitos técnicos do desafio:

- ✅ 1. Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela users.

- ✅ 2. Desenvolva testes que cubram no mínimo 5% dos arquivos back-end em /src, com um mínimo de 7 linhas cobertas.

- ✅ 3. Desenvolva o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end.

- ✅ 4. Desenvolva testes que cubram no mínimo 10% dos arquivos back-end em /src, com um mínimo de 19 linhas cobertas.

- ✅ 5. Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso sem informar um email no front-end.

- ✅ 6. Desenvolva testes que cubram no mínimo 15% dos arquivos back-end em /src, com um mínimo de 25 linhas cobertas.

- ✅ 7. Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso sem informar uma senha no front-end.

- ✅ 8. Desenvolva testes que cubram no mínimo 20% dos arquivos back-end em /src, com um mínimo de 35 linhas cobertas.

- ✅ 9. Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso com um email inválido no front-end.

- ✅ 10. Desenvolva testes que cubram no mínimo 30% dos arquivos back-end em /src, com um mínimo de 45 linhas cobertas.

- ✅ 11. Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso com uma senha inválida no front-end.

- ✅ 12. Desenvolva o endpoint /login/validate no back-end de maneira que ele retorne os dados corretamente no front-end.

- ✅ 13. Desenvolva testes que cubram no mínimo 45% dos arquivos back-end em /src, com um mínimo de 70 linhas cobertas.

- ✅ 14. Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de teams.

- ✅ 15. Desenvolva o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente.

- ✅ 16. Desenvolva o endpoint /teams/:id no back-end de forma que ele possa retornar dados de um time específico.

- ✅ 17. Desenvolva testes que cubram no mínimo 60% dos arquivos back-end em /src, com um mínimo de 80 linhas cobertas.

- ✅ 18. Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de matches.

- ✅ 19. Desenvolva o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no front-end..

- ✅ 20. Desenvolva o endpoint /matches de forma que seja possível filtrar as partidas em andamento na tela de partidas do front-end.

- ✅ 21. Desenvolva o endpoint /matches de forma que seja possível filtrar as partidas finalizadas na tela de partidas do front-end.

- ✅ 23. Desenvolva o endpoint /matches de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados.

- ✅ 24. Desenvolva o endpoint /matches/:id/finish de modo que seja possível alterar o status inProgress de uma partida para false no banco de dados.

- ✅ 25. Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com times iguais.

- ✅ 26. Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com um time que não existe na tabela teams.

- ✅ 27. Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida sem um token válido.

- ✅ 28. Desenvolva o endpoint /matches/:id de forma que seja possível atualizar partidas em andamento.

- ✅ 29. Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados.

- ✅ 30. Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional.

- ✅ 31. Desenvolva o endpoint /leaderboard/away, de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados.

- ✅ 32. Desenvolva o endpoint /leaderboard/away de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional.

- ✅ 33. Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados.

- ✅ 34. Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Flamengo 3 X 0 Napoli-SC.

- ✅ 35. Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Minas Brasília 1 X 0 Ferroviária.

# REQUISITOS BÔNUS

- ✅ 22. Desenvolva testes que cubram no mínimo 80% dos arquivos back-end em /src, com um mínimo de 100 linhas cobertas.
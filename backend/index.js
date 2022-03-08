// Dev: Alan Demarcos
// Data: 07/03/2022

// 01 - Importando os módulos do express para o arquivo index.js
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(bodyparser.json());

// 02 - Servidor iniciando na Porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000...");
});

// 03 - Conexão com o banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "xxxxxx",
  database: "xxxxxx",
  port: "3306",
});

// 04 - Testando a conexão com o banco de dados
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Conectado com sucesso!");
  }
});

// 05 - Buscar todos os dados do banco
app.get("/usuario", (req, res) => {
  // Teste de busca de dados
  // console.log("Obtendo usuários...");

  let qr = "SELECT * FROM usuario";
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "errs");
    }
    if (result.length > 0) {
      res.send({
        status: "Todos os dados encontrados...",
        data: result,
      });
    }
  });
});

// 06 - Obter dados simples no banco
app.get("/usuario/:id", (req, res) => {
  // Teste de busca de dados simples
  // console.log(req.params.id, "getid");
  let id = req.params.id;
  let qr = "SELECT * FROM usuario WHERE id = ?";
  db.query(qr, [id], (err, result) => {
    if (err) {
      console.log(err, "errs");
    }
    if (result.length > 0) {
      res.send({
        status: "Dados individuais encontrados...",
        data: result,
      });
    }
  });
});

// 07 - Inserir dados no banco
app.post("/usuario", (req, res) => {
  // Teste de inserção de dados
  // console.log("post Ok");

  console.log(req.body, "createdata");

  let gID = req.params.id;
  let nomeCompleto = req.body.nomecompleto;
  let cel = req.body.celular;
  let eMail = req.body.email;

  let qr = `INSERT INTO usuario (nomecompleto, celular, email) VALUES ('${nomeCompleto}','${cel}','${eMail}')`;
  console.log(qr, "qr");
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result, "result");
    res.send({
      status: "Dados inseridos com sucesso...",
    });
  });
});

// Atualizar dados no banco
app.put("/usuario/:id", (req, res) => {
  // Teste de atualização de dados
  // console.log("put Ok");

  console.log(req.body, "dadosatualizados");

  let gID = req.params.id;
  let nomeCompleto = req.body.nomecompleto;
  let cel = req.body.celular;
  let eMail = req.body.email;

  let qr = `UPDATE usuario SET nomecompleto = '${nomeCompleto}', celular = '${cel}', email = '${eMail}' WHERE id = '${gID}'`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
    }

    res.send({
      status: "Dados atualizados com sucesso...",
      data: result,
    });
  });
});

// Deletar dados no banco
app.delete("/usuario/:id", (req, res) => {
  // Teste de deletar dados
  //console.log("delete Ok");

  console.log(req.body, "dadosdeletados");

  let gID = req.params.id;

  let qr = `DELETE FROM usuario WHERE id = '${gID}'`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
    }

    res.send({
      status: "Dados deletados com sucesso...",
      data: result,
    });
  });
});

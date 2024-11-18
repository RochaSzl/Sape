const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3001; // Você pode escolher uma porta diferente se necessário

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar a conexão com o banco de dados
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // padrão do XAMPP
  password: "", // padrão do XAMPP
  database: "sape_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados: " + err.stack);
    return;
  }
  console.log("Conectado ao banco de dados como ID " + connection.threadId);
});

// Rota de login
app.post("/login", (req, res) => {
  const { matricula, senha } = req.body;

  const query = "SELECT * FROM usuarios WHERE matricula = ? AND senha = ?";
  connection.query(query, [matricula, senha], (error, results) => {
    if (error) {
      console.error("Erro na consulta: " + error.stack);
      res.status(500).send("Erro no servidor");
      return;
    }
    if (results.length > 0) {
      res.send("Login bem-sucedido!");
    } else {
      res.status(401).send("Credenciais inválidas");
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

const db = require('../db');

module.exports = (req, res) => {
  // Headers de CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // ou "http://localhost:5173"
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Tratamento de requisição preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const {
      cpf, nome, data_nascimento, comprovante_residencia, media_final, notas
    } = req.body;

    if (!cpf || !nome || !data_nascimento || !comprovante_residencia || isNaN(media_final)) {
      return res.status(400).json({ mensagem: "Dados inválidos ou incompletos." });
    }

    const insertAluno = `
      INSERT INTO alunos (cpf, nome, data_nascimento, comprovante_residencia, media_final)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(insertAluno, [cpf, nome, data_nascimento, comprovante_residencia, media_final], (err, result) => {
      if (err) {
        console.error("Erro ao inserir aluno:", err);
        return res.status(500).json({ mensagem: "Erro ao cadastrar aluno." });
      }

      const alunoId = result.insertId;

      // Agora inserir as notas
      const valoresNotas = [];
      for (let materia in notas) {
        const anos = notas[materia];
        for (let ano in anos) {
          const nota = parseFloat(anos[ano].toString().replace(',', '.'));
          if (!isNaN(nota)) {
            valoresNotas.push([alunoId, materia, ano, nota]);
          }
        }
      }

      if (valoresNotas.length === 0) {
        return res.status(400).json({ mensagem: "Nenhuma nota válida encontrada." });
      }

      const insertNotas = `
        INSERT INTO notas (aluno_id, materia, ano, nota)
        VALUES ?
      `;

      db.query(insertNotas, [valoresNotas], (err2) => {
        if (err2) {
          console.error("Erro ao inserir notas:", err2);
          return res.status(500).json({ mensagem: "Erro ao cadastrar notas." });
        }

        res.status(200).json({ mensagem: "Aluno e notas cadastrados com sucesso." });
      });
    });
  } else {
    res.status(405).json({ mensagem: "Método não suportado." });
  }
};

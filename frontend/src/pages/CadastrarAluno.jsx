import db from '../db.js'; // ou ajuste o caminho se necessário

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const {
        nome,
        cpf,
        data_nascimento,
        comprovante_residencia,
        media_final,
        cota,
        curso
      } = req.body;

      console.log('[INFO] Dados recebidos:', req.body);

      if (!nome || !cpf || !data_nascimento || !comprovante_residencia || !curso) {
        console.warn('[WARN] Dados incompletos.');
        return res.status(400).json({ mensagem: 'Dados incompletos.' });
      }

      const query = `
        INSERT INTO alunos
        (nome, cpf, data_nascimento, comprovante_residencia, media_final, Cota, Curso)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        query,
        [
          nome,
          cpf,
          data_nascimento,
          comprovante_residencia,
          media_final || null,
          cota || null,
          curso,
        ],
        (err, result) => {
          if (err) {
            console.error('[ERRO] Falha ao executar query:', err);
            return res.status(500).json({ mensagem: 'Erro ao cadastrar aluno.' });
          }

          console.log('[SUCESSO] Aluno cadastrado com ID:', result.insertId);
          res.status(201).json({ mensagem: 'Aluno cadastrado com sucesso!', alunoId: result.insertId });
        }
      );
    } catch (err) {
      console.error('[FATAL] Erro inesperado:', err);
      res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  } else {
    res.status(405).json({ mensagem: 'Método não permitido.' });
  }
}

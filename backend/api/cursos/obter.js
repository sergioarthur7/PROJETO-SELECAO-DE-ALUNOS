import { db } from '../bd';

export default async function handler(req, res) {
  // 1️⃣ Definindo cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2️⃣ Resposta para pré‑flight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3️⃣ Apenas GET permitido
  if (req.method !== 'GET') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  try {
    // 4️⃣ Buscando definição do ENUM no banco
    const [rows] = await db.query("SHOW COLUMNS FROM alunos LIKE 'Curso'");
    if (!rows.length) {
      console.error('Coluna Curso não encontrada no banco');
      return res.status(404).json({ erro: 'Coluna Curso não encontrada' });
    }

    const enumDef = rows[0].Type; // ex: "enum('ENG','MAT')"
    // 5️⃣ Validando se é realmente ENUM
    if (!enumDef.startsWith('enum(')) {
      console.error('Coluna Curso retornou tipo inesperado:', enumDef);
      return res.status(400).json({ erro: 'Coluna Curso não é do tipo enum' });
    }

    // 6️⃣ Extraindo valores do enum
    const cursos = enumDef
      .replace(/^enum\((.*)\)$/, '$1')
      .split(',')
      .map(c => c.replace(/'/g, ''));

    // 7️⃣ Retornando os cursos
    return res.status(200).json(cursos);
  } catch (err) {
    console.error('❌ Erro ao obter cursos:', err);
    return res.status(500).json({ erro: 'Erro ao obter cursos' });
  }
}

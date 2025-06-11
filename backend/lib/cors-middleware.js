import Cors from 'cors';
import initMiddleware from './init-middleware';

// Somente esses domínios podem acessar a API
const cors = initMiddleware(
  Cors({
    origin: ['http://localhost:5173', 'https://projeto-selecao-de-alunos.vercel.app'],
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

export default cors;

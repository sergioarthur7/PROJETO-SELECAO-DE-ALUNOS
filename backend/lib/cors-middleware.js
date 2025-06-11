import Cors from 'cors';
import initMiddleware from './init-middleware';

const cors = initMiddleware(
  Cors({
    origin: ['http://localhost:5173', 'https://projeto-selecao-de-alunos.vercel.app'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

export default cors;

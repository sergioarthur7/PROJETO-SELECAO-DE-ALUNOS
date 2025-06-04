import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Garante que CSS e assets funcionem no Vercel

  // ⚠️ Esse proxy é só útil para desenvolvimento local.
  // Pode manter para testes locais, sem afetar Vercel.
  server: {
    proxy: {
      '/alunos': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/gestores': 'http://localhost:3000'
    }
  }
})

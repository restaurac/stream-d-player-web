# Stream D Player - Development Guide

## Setup Inicial

### Requisitos
- Node.js 16+
- npm ou yarn
- Git

### Instalação

```bash
# Clonar repositório
git clone <repo-url>
cd stream-d-player

# Instalar dependências
npm install

# Copiar arquivo de configuração
cp .env.example .env.local
```

## Desenvolvimento

### Executar em Modo Dev

```bash
# Inicia Electron + Vite dev server
npm run dev

# Ou separadamente:
npm run dev:electron  # Terminal 1
npm run dev:react     # Terminal 2
```

### Estrutura de Pastas

```
src/
├── main.ts              # Processo principal Electron
├── preload.ts           # Preload scripts (segurança)
├── server/
│   ├── auth.ts          # Autenticação
│   └── proxy.ts         # Proxy HTTPS
└── renderer/
    ├── App.tsx          # App principal
    ├── main.tsx         # Entry point React
    ├── components/
    │   ├── Login.tsx
    │   ├── Dashboard.tsx
    │   ├── Browser.tsx
    │   ├── MediaPlayer.tsx
    │   ├── DownloadManager.tsx
    │   └── StreamingPlaylist.tsx
    └── index.css        # Estilos globais
```

## Componentes

### Login
- Autenticação com username/password
- Criptografia SHA256
- Tokens JWT

### Dashboard
- Interface principal
- Navegação por abas
- Integração de todos os componentes

### Browser
- Navegador integrado com iframe
- Suporte a proxy HTTPS
- Histórico de navegação

### Media Player
- Reprodutor de vídeo/áudio
- Controles completos
- Playlist

### Download Manager
- Gerenciador de downloads
- Progresso em tempo real
- Múltiplos downloads simultâneos

### Streaming Playlist
- Lista de canais
- Busca e filtro
- Seleção de qualidade

## Servidores Backend

### Auth Server (Port 3001)
```
POST   /api/auth/login      - Login
POST   /api/auth/logout     - Logout
GET    /api/auth/verify     - Verificar token
```

### Proxy Server (Port 3002)
```
POST   /api/proxy/config    - Configurar proxy
GET    /api/proxy/config    - Obter configuração
POST   /api/proxy/test      - Testar conexão
ALL    /api/proxy/request   - Fazer requisição via proxy
```

## Build

### Build para Produção

```bash
# Build React + TypeScript
npm run build

# Criar distribuível
npm run dist

# Por plataforma específica
npm run dist:win    # Windows
npm run dist:mac    # macOS
npm run dist:linux  # Linux
```

## Testes

```bash
# Executar testes (quando implementados)
npm test

# Testes com coverage
npm test -- --coverage
```

## Debugging

### DevTools no Electron
- Pressione `F12` durante desenvolvimento
- Ou use `npm run dev` (já abre DevTools)

### Logs
- Console do Electron: `npm run dev`
- Network: DevTools > Network tab
- Application: DevTools > Application tab

## Configuração de Proxy

1. Abra a aba "Proxy Settings"
2. Insira:
   - Host: `proxy.example.com`
   - Port: `8080`
   - Username: (opcional)
   - Password: (opcional)
3. Clique "Test Connection"

## Credenciais Padrão

- **Username:** admin
- **Password:** admin123

⚠️ **Mudar em produção!**

## Performance

### Otimizações Implementadas
- Code splitting com Vite
- Lazy loading de componentes
- Memoização de componentes React
- Caching de requisições

### Dicas
- Use React DevTools para profiling
- Monitorar uso de memória no Task Manager
- Testar com múltiplos downloads/streams

## Troubleshooting

### Erro: "Cannot find module"
```bash
npm install
npm run build
```

### Erro: "Port already in use"
```bash
# Mudar porta em vite.config.ts ou .env
```

### Electron não inicia
```bash
# Limpar cache
rm -rf node_modules dist
npm install
npm run dev
```

## Contribuindo

1. Criar branch: `git checkout -b feature/nome`
2. Commit: `git commit -am 'Add feature'`
3. Push: `git push origin feature/nome`
4. Pull Request

## Licença

MIT

---

**Stream D Player** - Desenvolvido com ❤️

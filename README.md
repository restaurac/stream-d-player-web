# Stream D Player

Um app desktop multi-plataforma profissional com navegador integrado, VPN privada, media player e gerenciador de streaming.

## Características

✨ **Interface Premium**
- Design preto com bordas amarelas
- Fundo branco com degradê suave
- Animações suaves e responsivas
- Suporte a temas escuros/claros

🔐 **Segurança**
- Autenticação Admin com login/senha
- Criptografia SHA256 para senhas
- Tokens JWT para sessões
- Suporte a proxy HTTPS

🌐 **Navegador Integrado**
- Chromium integrado
- Suporte a proxy HTTPS
- Gerenciamento de cookies e cache
- Histórico de navegação

▶️ **Media Player Profissional**
- Suporte a múltiplos formatos (MP4, MKV, WebM, etc)
- Controles de reprodução completos
- Legenda automática
- Playlist customizável

📊 **Dashboard com Gráficos**
- Estatísticas em tempo real
- Velocidade de conexão
- Latência
- Uso de dados
- Gráficos animados

🚀 **Download Manager**
- Downloads rápidos e otimizados
- Gerenciamento de múltiplos downloads
- Resumo de downloads
- Histórico

## Requisitos

- Node.js 16+
- npm ou yarn
- Windows, macOS ou Linux

## Instalação

```bash
# Clonar repositório
git clone <repo-url>
cd stream-d-player

# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build
npm run build

# Distribuição
npm run dist:win  # Windows
npm run dist:mac  # macOS
npm run dist:linux # Linux
```

## Uso

### Login Padrão
- **Username:** admin
- **Password:** admin123

### Configuração de Proxy

1. Abra a aba "Proxy Settings"
2. Insira o host e porta do proxy
3. (Opcional) Adicione username e password
4. Clique em "Test Connection"

### Navegação

1. Abra a aba "Browser"
2. Navegue normalmente (conexão via proxy)
3. Todos os dados passam pelo proxy HTTPS configurado

### Media Player

1. Abra a aba "Media Player"
2. Selecione um arquivo local ou URL
3. Use os controles para reproduzir

## Estrutura do Projeto

```
stream-d-player/
├── src/
│   ├── main.ts              # Processo principal Electron
│   ├── preload.ts           # Preload scripts
│   ├── server/
│   │   ├── auth.ts          # Servidor de autenticação
│   │   └── proxy.ts         # Servidor de proxy
│   └── renderer/
│       ├── App.tsx          # Componente principal
│       ├── components/
│       │   ├── Login.tsx    # Tela de login
│       │   └── Dashboard.tsx # Dashboard principal
│       └── main.tsx         # Entry point React
├── index.html               # HTML principal
├── vite.config.ts           # Configuração Vite
├── tsconfig.json            # Configuração TypeScript
└── package.json             # Dependências
```

## Tecnologias

- **Electron** - Framework desktop
- **React 18** - UI framework
- **TypeScript** - Linguagem tipada
- **Vite** - Build tool
- **Express** - Servidor backend
- **Recharts** - Gráficos
- **CryptoJS** - Criptografia

## Segurança

- Senhas criptografadas com SHA256
- Tokens JWT para sessões
- Context isolation no Electron
- Sem acesso direto ao Node.js do renderer

## Licença

MIT

## Suporte

Para problemas ou sugestões, abra uma issue no repositório.

---

**Stream D Player** - Seu navegador e media player profissional com VPN integrada! 🚀

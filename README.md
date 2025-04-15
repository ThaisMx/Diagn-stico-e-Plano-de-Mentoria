# Diagnóstico e Plano de Mentoria

Um aplicativo web moderno construído com Next.js para visualizar e gerenciar estruturas organizacionais, KPIs e responsabilidades de cada cargo em uma empresa.

## 🚀 Funcionalidades

- **Organograma Interativo**: Visualização clara da hierarquia organizacional
- **Detalhes por Cargo**: Informações detalhadas sobre cada posição incluindo:
  - KPIs específicos
  - Responsabilidades
  - Rotinas diárias e semanais
- **Interface Responsiva**: Design adaptável para diferentes tamanhos de tela
- **Modo Dark/Light**: Suporte a diferentes temas

## 🛠️ Tecnologias Utilizadas

- [Next.js 15.2.4](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Docker](https://www.docker.com/)

## �� Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/ThaisMx/Diagn-stico-e-Plano-de-Mentoria.git
cd Diagn-stico-e-Plano-de-Mentoria
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env.local` na raiz do projeto
- Adicione sua chave da API OpenAI:
```bash
NEXT_PUBLIC_OPENAI_API_KEY=sua_chave_api_aqui
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse http://localhost:3000 no seu navegador

## 🐳 Deploy com Docker

### Build Local

```bash
# Construa a imagem
docker build -t diagnostic-app .

# Execute o container
docker run -p 3000:3000 diagnostic-app
```

### Deploy no Easypanel

1. No Easypanel, crie um novo projeto
2. Selecione "Deploy from Git Repository"
3. Configure o deploy:
   - Repository URL: https://github.com/ThaisMx/Diagn-stico-e-Plano-de-Mentoria.git
   - Branch: main
   - Dockerfile Path: ./Dockerfile
   - Port: 3000
4. Clique em "Deploy"

## 🖥️ Uso

Após iniciar o servidor de desenvolvimento ou deploy, acesse:

```
http://localhost:3000
```

- Navegue pelo organograma clicando nos diferentes cargos
- Visualize informações detalhadas sobre cada posição
- Explore KPIs, responsabilidades e rotinas

## 📋 Estrutura do Projeto

```
├── app/                    # Diretório principal do Next.js
│   ├── organograma/       # Página do organograma
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis
├── lib/                   # Utilitários e configurações
├── public/               # Arquivos estáticos
└── styles/               # Estilos globais
```

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👩‍💻 Autora

- **Thais Maximiana** - [GitHub](https://github.com/ThaisMx) 
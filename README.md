# TMS - Transport Management System

Um sistema de gerenciamento de transportes que permite cadastrar motoristas, criar ordens de transporte e acompanhar o status de entregas em tempo real.

## Tecnologias

**Backend:**

- Laravel 12.0
- PHP 8.2+
- MySQL 8.0+

**Frontend:**

- React 19.2
- TypeScript
- Tailwind CSS 4.2
- Vite
- React Router 7.13
- Axios
- Material-UI

## Pré-requisitos

- Node.js 18+ e npm
- PHP 8.2+
- Composer
- Git

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/joseaugtop/teste-tms-jose-augusto-rocha.git
cd teste-tms-jose-augusto-rocha
```

### 2. Backend

```bash
cd backend

# Instale as dependências
composer install

# Configure o .env
cp .env.example .env
php artisan key:generate

# Configure o banco de dados no arquivo .env
# Depois execute as migrações
php artisan migrate

# Popule o banco com dados de teste
php artisan db:seed

# Inicie o servidor
php artisan serve
```

O backend rodará em `http://localhost:8000`

### 3. Frontend

```bash
cd frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend rodará em `http://localhost:3000`

## Rodando o Projeto

### Backend (em um terminal)

```bash
cd backend
php artisan serve
```

### Frontend (em outro terminal)

```bash
cd frontend
npm run dev
```

Abra `http://localhost:3000` no navegador.

## Variáveis de Ambiente

### Backend `.env`

```
APP_NAME="TMS"
APP_ENV=local
APP_KEY=base64:... (gerado automaticamente)
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=teste_tms
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
```

### Frontend `.env`

```
VITE_API_BASE_URL=http://localhost:8000
```

## Estrutura do Projeto

```
backend/
  ├─ app/Models/          # Modelos (Driver, TransportOrder, User)
  ├─ app/Http/Controllers # Controllers da API
  ├─ app/Http/Requests    # Form Requests (validação)
  ├─ app/Http/Resources   # API Resources
  ├─ database/migrations  # Migrações do banco
  └─ routes/api.php       # Rotas da API

frontend/
  ├─ src/pages/           # Páginas da aplicação
  ├─ src/components/      # Componentes reutilizáveis
  ├─ src/services/        # Serviços (requisições HTTP)
  ├─ src/types/           # Tipos TypeScript
  └─ src/api/             # Configuração do Axios
```

## Autenticação

O projeto usa **Laravel Sanctum** para autenticação via tokens. Faça login na página inicial para obter um token de acesso que será armazenado no localStorage.

## Funcionalidades Principais

- Cadastro e edição de motoristas
- Criação de ordens de transporte
- Atualização de status de entrega (5 estágios)
- Listagem e filtros de ordens
- Dashboard com resumo de atividades
- Autenticação segura com tokens

## Troubleshooting

**Erro de conexão entre frontend e backend?**

- Certifique-se de que ambos servidores estão rodando
- Verifique se `VITE_API_BASE_URL` no `.env` aponta para o backend correto

**Erro nas migrações?**

- Garanta que o banco de dados está acessível
- Execute `php artisan migrate:fresh` para resetar e refazer

Dúvidas? Verifique os logs em `backend/storage/logs/laravel.log` para mais detalhes.

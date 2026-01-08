# Horizon 360° Intelligence System

> **"O Horizon 360° Intelligence System é um projecto completo, moderno e coerente, que integra gestão de capital humano, gestão financeira, análise, previsão e inteligência artificial num único ecossistema."**

---

## 🚀 Visão Geral

O **Horizon 360°** é uma plataforma empresarial (ERP) de nova geração projectada para unificar os pilares críticos de uma organização. Diferente de sistemas tradicionais fragmentados, o Horizon 360° utiliza IA no seu núcleo para transformar dados brutos em inteligência acionável.

### Principais Módulos

* **HCM (Human Capital Management)**: Gestão completa do ciclo de vida do colaborador, desde a estrutura organizacional (Departamentos) até à avaliação de desempenho e histórico de alterações (Audit Logs).
* **Gestão Financeira**: Controlo de custos, receitas e fluxo de caixa, com projeções financeiras automatizadas.
* **Payroll Inteligente**: Processamento salarial adaptado à fiscalidade de Moçambique (IRT, INSS), com geração automática de relatórios.
* **Horizon AI Assistant**: Um copiloto virtual integrado que responde a perguntas naturais sobre os dados da empresa (ex: "Qual a previsão de custos com pessoal para o próximo trimestre?").
* **Analytics & Previsão**: Dashboards em tempo real com indicadores de tendência e insights gerados por modelos GPT-4.

---

## 🛠️ Stack Tecnológico

Uma arquitetura moderna, segura e escalável:

* **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Recharts.
* **Backend**: FastAPI (Python), SQLAlchemy, Pydantic, OAuth2 (JWT).
* **Base de Dados**: PostgreSQL (com ORM Prisma no Frontend e SQLAlchemy no Backend).
* **Inteligência Artificial**: Integração OpenAI (GPT-4o-mini) para chat, análise de dados e forecasts.
* **Autenticação**: NextAuth.js (Frontend) + OAuth2 Password Flow (Backend).

---

## ✨ Funcionalidades Implementadas

1. **Autenticação Segura**: Login com JWT, hashing de passwords e proteção de rotas.
2. **Gestão de Departamentos**: Estrutura hierárquica visual.
3. **Auditoria (Audit Log)**: Rastreio automático de todas as alterações nos dados dos colaboradores.
4. **Relatórios Exportáveis**: CSVs instantâneos para Folha, Funcionários e Finanças.
5. **Notificações**: Sistema de alertas centralizado.
6. **AI Insights**: Painel de inteligência que "lê" a base de dados em tempo real.

---

## 📦 Como Iniciar

### Pré-requisitos

* Node.js 18+
* Python 3.10+
* PostgreSQL
* Chave API OpenAI

### Instalação

1. **Backend**

    ```bash
    cd backend
    pip install -r requirements.txt
    # Configurar .env com DATABASE_URL e SECRET_KEY
    uvicorn app.main:app --reload
    ```

2. **Frontend**

    ```bash
    cd frontend
    npm install
    # Configurar .env com DATABASE_URL e OPENAI_API_KEY
    npx prisma db push
    npm run dev
    ```

---

Desenvolvido com foco na experiência do utilizador e na excelência técnica.
**Horizon 360° - Intelligence System**

Desenvolvido com 😍 por Mr. Dimande

2026

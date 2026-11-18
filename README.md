
# 📚 Organizador de Estudos

## 📌 Sobre o projeto

O Organizador de Estudos é um aplicativo desenvolvido para
ajudar estudantes a organizar sua rotina escolar de maneira
simples, prática e eficiente.

O sistema permite organizar matérias, cadastrar tarefas,
acompanhar provas, criar cronogramas e monitorar o progresso
dos estudos.

O objetivo é facilitar a vida dos alunos, ajudando a manter
as atividades escolares organizadas e os prazos em dia.

---

## 🎯 Objetivos

- Organizar as matérias escolares.
- Cadastrar e acompanhar tarefas.
- Controlar datas de entrega.
- Organizar provas e avaliações.
- Criar cronogramas de estudos.
- Definir metas de aprendizagem.
- Registrar notas escolares.
- Acompanhar o desempenho acadêmico.

---

## 💻 Tecnologias utilizadas

O projeto utiliza as seguintes tecnologias:

- **HTML5:** estrutura das páginas.
- **CSS3:** estilização e aparência visual.
- **JavaScript:** funcionalidades e interatividade.
- **Python:** execução do servidor local.
- **SQLite:** banco de dados planejado para armazenar informações.

Não são utilizadas bibliotecas externas na versão inicial.

---

## 📂 Estrutura de diretórios

```text
organizador-de-estudos/
│
├── app.py
├── index.html
│
├── pages/
│   ├── inicio.html
│   ├── login.html
│   ├── cadastro.html
│   ├── perfil.html
│   ├── materias.html
│   ├── tarefas.html
│   ├── calendario.html
│   ├── cronograma.html
│   ├── provas.html
│   ├── notas.html
│   └── estatisticas.html
│
├── materias/
│   ├── matematica/
│   ├── portugues/
│   ├── historia/
│   ├── geografia/
│   ├── biologia/
│   ├── quimica/
│   ├── fisica/
│   └── ingles/
│
├── tarefas/
│   ├── pendentes/
│   ├── concluidas/
│   ├── trabalhos/
│   ├── exercicios/
│   └── pesquisas/
│
├── planejamento/
│   ├── horario-estudos/
│   ├── calendario/
│   ├── metas/
│   └── lembretes/
│
├── provas/
│   ├── proximas-provas/
│   ├── provas-realizadas/
│   └── resultados/
│
├── arquivos/
│   ├── pdf/
│   ├── imagens/
│   ├── resumos/
│   └── anotacoes/
│
├── assets/
│   ├── images/
│   └── fonts/
│
├── css/
│   ├── style.css
│   ├── dashboard.css
│   ├── calendario.css
│   └── responsivo.css
│
├── js/
│   ├── main.js
│   ├── tarefas.js
│   ├── materias.js
│   ├── calendario.js
│   ├── cronograma.js
│   ├── lembretes.js
│   └── estatisticas.js
│
├── database/
│   ├── usuarios.sql
│   ├── materias.sql
│   ├── tarefas.sql
│   ├── horarios.sql
│   └── notas.sql
│
└── README.md
```

---

## ⚙️ Funcionalidades do sistema

### 1. Página inicial
- Apresentação do aplicativo.
- Resumo das atividades.
- Acesso às principais funcionalidades.

### 2. Cadastro e login
- Cadastro de estudantes.
- Acesso à conta.
- Gerenciamento do perfil.

### 3. Gerenciamento de matérias
- Cadastro de disciplinas.
- Organização por matéria.
- Consulta das atividades de cada disciplina.

### 4. Gerenciamento de tarefas
- Adicionar novas tarefas.
- Definir datas de entrega.
- Marcar tarefas como concluídas.
- Separar tarefas pendentes e concluídas.
- Organizar trabalhos, exercícios e pesquisas.

### 5. Calendário
- Visualizar compromissos.
- Consultar datas de entrega.
- Acompanhar provas e atividades.

### 6. Cronograma de estudos
- Organizar horários.
- Criar uma rotina de estudos.
- Definir metas.

### 7. Provas e notas
- Cadastrar próximas provas.
- Registrar resultados.
- Acompanhar notas escolares.

### 8. Estatísticas
- Consultar tarefas concluídas.
- Visualizar atividades pendentes.
- Acompanhar o progresso dos estudos.

---

## 🚀 Como executar o projeto

### Requisitos

- Python 3 instalado.
- Navegador atualizado.
- Editor de código, como Visual Studio Code.

### Passo 1: Abrir o projeto

Abra a pasta `organizador-de-estudos` no Visual Studio Code.

### Passo 2: Abrir o terminal

No Visual Studio Code, abra:

Terminal → Novo Terminal.

### Passo 3: Iniciar o servidor

Execute o comando:

```bash
python app.py
```

### Passo 4: Acessar o aplicativo

Abra o navegador e acesse:

```text
http://127.0.0.1:8000
```

O aplicativo será exibido no navegador.

### Passo 5: Encerrar o servidor

Para encerrar a execução, pressione:

```text
CTRL + C
```

---

## 🗄️ Banco de dados

O projeto prevê a utilização do SQLite para armazenar:

- Dados dos estudantes.
- Matérias cadastradas.
- Tarefas escolares.
- Horários de estudos.
- Notas e avaliações.

Os arquivos SQL ficarão organizados na pasta `database/`.

**Observação:** a integração com o banco de dados ainda precisa ser implementada.

---

## 🔒 Segurança

O projeto poderá receber futuramente:

- Autenticação de usuários.
- Proteção de senhas.
- Validação de formulários.
- Controle de acesso.
- Backup dos dados.

A versão inicial funciona localmente e não possui
autenticação real.

---

## 📱 Responsividade

A interface deverá ser adaptada para diferentes dispositivos:

- Computadores.
- Notebooks.
- Tablets.
- Celulares.

---

## 🔮 Melhorias futuras

- Sincronização de dados.
- Notificações de prazos.
- Gráficos de desempenho.
- Lembretes automáticos.
- Modo escuro.
- Exportação de tarefas em PDF.
- Sistema de metas semanais.
- Integração com calendário.

---

## 👩‍🎓 Público-alvo

Estudantes do Ensino Fundamental, Ensino Médio
e demais pessoas que desejam organizar sua rotina
de estudos.

---

## 📄 Licença

Projeto desenvolvido para fins educacionais.

---

## 📚 Considerações finais

O Organizador de Estudos busca oferecer uma ferramenta
prática para melhorar a organização escolar.

Com ele, os estudantes poderão planejar suas atividades,
acompanhar seus compromissos e desenvolver hábitos
de estudo mais organizados.

**Organize seus estudos, acompanhe seu progresso
e alcance seus objetivos! 🚀**

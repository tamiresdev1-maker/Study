// Study — funcionalidades e armazenamento local no navegador.
"use strict";

const STORAGE_KEY = "study-organizador-v2";

const initialData = {
  subjects: ["Matemática", "Português", "Biologia", "História", "Geografia"],
  tasks: [],
  exams: [],
  schedule: []
};

let data = loadData();
let activeFilter = "all";
let toastTimeout;

// Carrega os dados salvos no navegador.
function loadData() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (
      stored &&
      ["subjects", "tasks", "exams", "schedule"]
        .every(key => Array.isArray(stored[key]))
    ) {
      return stored;
    }
  } catch (error) {
    console.warn("Os dados salvos não puderam ser lidos.", error);
  }

  return JSON.parse(JSON.stringify(initialData));
}

// Salva os dados no armazenamento local.
function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    showToast("Não foi possível salvar os dados neste navegador.");
  }
}

// Evita que textos cadastrados sejam interpretados como HTML.
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

// Exibe mensagens temporárias.
function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// Formata datas para o padrão brasileiro.
function formatDate(value) {
  return value
    ? new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR")
    : "";
}

// Retorna a data local no formato AAAA-MM-DD.
function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Atualiza as informações do cabeçalho.
function updateHeader() {
  const now = new Date();

  document.getElementById("todayLabel").textContent =
    now.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short"
    });

  document.getElementById("fullDate").textContent =
    now.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });

  document.getElementById("year").textContent = now.getFullYear();
}

// Atualiza as opções de matérias nos formulários.
function updateSubjectSelects() {
  const options = data.subjects.map(subject =>
    `<option value="${escapeHTML(subject)}">${escapeHTML(subject)}</option>`
  ).join("");

  ["taskSubject", "examSubject", "scheduleSubject"].forEach(id => {
    document.getElementById(id).innerHTML =
      `<option value="">Selecione</option>${options}`;
  });
}

// Exibe as matérias cadastradas.
function renderSubjects() {
  const list = document.getElementById("subjectList");

  list.innerHTML = data.subjects.length
    ? data.subjects.map((subject, index) => `
        <span class="chip">
          ${escapeHTML(subject)}
          <button
            type="button"
            data-remove-subject="${index}"
            aria-label="Remover ${escapeHTML(subject)}"
          >×</button>
        </span>
      `).join("")
    : '<p class="empty">Adicione sua primeira matéria.</p>';

  updateSubjectSelects();
}

// Exibe as tarefas cadastradas.
function renderTasks() {
  const list = document.getElementById("taskList");

  const tasks = data.tasks
    .filter(task =>
      activeFilter === "all" ||
      (activeFilter === "done" ? task.done : !task.done)
    )
    .sort((a, b) => a.date.localeCompare(b.date));

  list.innerHTML = tasks.length
    ? tasks.map(task => `
        <div class="entry ${task.done ? "done" : ""}">
          <input
            class="entry-check"
            type="checkbox"
            data-task-check="${task.id}"
            ${task.done ? "checked" : ""}
            aria-label="Concluir ${escapeHTML(task.title)}"
          >

          <div class="entry-main">
            <strong>${escapeHTML(task.title)}</strong>
            <small>
              ${escapeHTML(task.subject)}
              · Prazo: ${formatDate(task.date)}
            </small>
          </div>

          <span class="entry-tag">
            ${task.done ? "Concluída" : formatDate(task.date)}
          </span>

          <button
            type="button"
            class="delete-button"
            data-delete-task="${task.id}"
            aria-label="Excluir tarefa"
          >×</button>
        </div>
      `).join("")
    : '<p class="empty">Nenhuma tarefa nesta categoria.</p>';

  updateStats();
}

// Exibe as provas cadastradas.
function renderExams() {
  const list = document.getElementById("examList");

  const exams = [...data.exams].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  list.innerHTML = exams.length
    ? exams.map(exam => `
        <div class="entry">
          <div class="entry-main">
            <strong>${escapeHTML(exam.title)}</strong>
            <small>
              ${escapeHTML(exam.subject)}
              · ${formatDate(exam.date)}
            </small>
          </div>

          <span class="entry-tag">${formatDate(exam.date)}</span>

          <button
            type="button"
            class="delete-button"
            data-delete-exam="${exam.id}"
            aria-label="Excluir avaliação"
          >×</button>
        </div>
      `).join("")
    : '<p class="empty">Nenhuma avaliação cadastrada.</p>';

  updateStats();
}

// Exibe o cronograma de estudos.
function renderSchedule() {
  const list = document.getElementById("scheduleList");

  const sessions = [...data.schedule].sort((a, b) =>
    `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`)
  );

  list.innerHTML = sessions.length
    ? sessions.map(session => `
        <div class="entry">
          <div class="entry-main">
            <strong>${escapeHTML(session.title)}</strong>
            <small>
              ${escapeHTML(session.subject)}
              · ${formatDate(session.date)}
              às ${escapeHTML(session.time)}
              · ${session.duration} min
            </small>
          </div>

          <button
            type="button"
            class="delete-button"
            data-delete-session="${session.id}"
            aria-label="Excluir sessão"
          >×</button>
        </div>
      `).join("")
    : '<p class="empty">Seu planejamento aparecerá aqui.</p>';

  updateStats();
}

// Atualiza os números e a barra de progresso.
function updateStats() {
  const pending = data.tasks.filter(task => !task.done);

  const today = localDateString();

  const end = new Date();
  end.setDate(end.getDate() + 7);

  const endDate = localDateString(end);

  const upcomingExams = data.exams.filter(exam =>
    exam.date >= today && exam.date <= endDate
  ).length;

  const futureSessions = data.schedule.filter(session =>
    session.date >= today
  ).length;

  document.getElementById("pendingCount").textContent =
    pending.length;

  document.getElementById("examCount").textContent =
    upcomingExams;

  document.getElementById("subjectCount").textContent =
    data.subjects.length;

  document.getElementById("studyCount").textContent =
    futureSessions;

  // Conta tarefas concluídas nos últimos sete dias.
  const weekStart = new Date();

  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(weekStart.getDate() - 6);

  const completed = data.tasks.filter(task =>
    task.done &&
    task.completedAt &&
    new Date(task.completedAt) >= weekStart
  ).length;

  document.getElementById("completedCount").textContent =
    completed;

  document.getElementById("progressBar").style.width =
    `${Math.min(completed / 5, 1) * 100}%`;

  document.getElementById("progressMessage").textContent =
    completed >= 5
      ? "Meta de cinco tarefas concluídas alcançada. Parabéns!"
      : `Faltam ${5 - completed} tarefa(s) para alcançar a meta de 5 nesta semana.`;
}

// Atualiza todas as seções.
function renderAll() {
  renderSubjects();
  renderTasks();
  renderExams();
  renderSchedule();
}

// CADASTRO DE MATÉRIAS
document.getElementById("subjectForm")
  .addEventListener("submit", event => {
    event.preventDefault();

    const input = document.getElementById("subjectName");
    const name = input.value.trim();

    if (!name) {
      return showToast("Digite o nome da matéria.");
    }

    if (data.subjects.some(subject =>
      subject.toLowerCase() === name.toLowerCase()
    )) {
      return showToast("Essa matéria já está cadastrada.");
    }

    data.subjects.push(name);

    saveData();
    renderSubjects();
    updateStats();

    input.value = "";

    showToast("Matéria adicionada!");
  });

// EXCLUSÃO DE MATÉRIAS
document.getElementById("subjectList")
  .addEventListener("click", event => {
    const rawIndex = event.target.dataset.removeSubject;

    if (rawIndex === undefined) return;

    const index = Number(rawIndex);
    const subject = data.subjects[index];

    const isUsed =
      data.tasks.some(item => item.subject === subject) ||
      data.exams.some(item => item.subject === subject) ||
      data.schedule.some(item => item.subject === subject);

    if (isUsed) {
      return showToast(
        "Essa matéria está vinculada a um registro. Remova-o primeiro."
      );
    }

    data.subjects.splice(index, 1);

    saveData();
    renderSubjects();
    updateStats();

    showToast("Matéria removida.");
  });

// CADASTRO DE TAREFAS
document.getElementById("taskForm")
  .addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("taskTitle").value.trim();
    const subject = document.getElementById("taskSubject").value;
    const date = document.getElementById("taskDate").value;

    if (!title || !subject || !date) {
      return showToast("Preencha todos os campos da tarefa.");
    }

    data.tasks.push({
      id: Date.now(),
      title,
      subject,
      date,
      done: false,
      completedAt: null
    });

    saveData();
    renderTasks();

    event.target.reset();

    showToast("Tarefa cadastrada!");
  });

// CONCLUSÃO DE TAREFAS
document.getElementById("taskList")
  .addEventListener("change", event => {
    if (!event.target.matches("[data-task-check]")) return;

    const task = data.tasks.find(item =>
      item.id === Number(event.target.dataset.taskCheck)
    );

    if (!task) return;

    task.done = event.target.checked;

    task.completedAt = task.done
      ? new Date().toISOString()
      : null;

    saveData();
    renderTasks();

    showToast(
      task.done ? "Tarefa concluída!" : "Tarefa reaberta."
    );
  });

// EXCLUSÃO DE TAREFAS
document.getElementById("taskList")
  .addEventListener("click", event => {
    const id = Number(event.target.dataset.deleteTask);

    if (!id) return;

    data.tasks = data.tasks.filter(task => task.id !== id);

    saveData();
    renderTasks();

    showToast("Tarefa excluída.");
  });

// FILTROS DE TAREFAS
document.querySelectorAll("[data-filter]")
  .forEach(button => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;

      document.querySelectorAll("[data-filter]")
        .forEach(item => {
          item.classList.toggle("active", item === button);
        });

      renderTasks();
    });
  });

// CADASTRO DE PROVAS
document.getElementById("examForm")
  .addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("examTitle").value.trim();
    const subject = document.getElementById("examSubject").value;
    const date = document.getElementById("examDate").value;

    if (!title || !subject || !date) {
      return showToast("Preencha todos os campos da avaliação.");
    }

    data.exams.push({
      id: Date.now(),
      title,
      subject,
      date
    });

    saveData();
    renderExams();

    event.target.reset();

    showToast("Avaliação cadastrada!");
  });

// EXCLUSÃO DE PROVAS
document.getElementById("examList")
  .addEventListener("click", event => {
    const id = Number(event.target.dataset.deleteExam);

    if (!id) return;

    data.exams = data.exams.filter(exam => exam.id !== id);

    saveData();
    renderExams();

    showToast("Avaliação removida.");
  });

// CADASTRO DE SESSÕES DE ESTUDO
document.getElementById("scheduleForm")
  .addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("scheduleTitle").value.trim();
    const subject = document.getElementById("scheduleSubject").value;
    const date = document.getElementById("scheduleDate").value;
    const time = document.getElementById("scheduleTime").value;
    const duration = Number(
      document.getElementById("scheduleDuration").value
    );

    if (!title || !subject || !date || !time) {
      return showToast("Preencha todos os campos do cronograma.");
    }

    data.schedule.push({
      id: Date.now(),
      title,
      subject,
      date,
      time,
      duration
    });

    saveData();
    renderSchedule();

    event.target.reset();

    showToast("Sessão adicionada ao cronograma!");
  });

// EXCLUSÃO DE SESSÕES DE ESTUDO
document.getElementById("scheduleList")
  .addEventListener("click", event => {
    const id = Number(event.target.dataset.deleteSession);

    if (!id) return;

    data.schedule = data.schedule.filter(
      session => session.id !== id
    );

    saveData();
    renderSchedule();

    showToast("Sessão removida do cronograma.");
  });

// DICAS DE ESTUDO
const studyTips = [
  "Divida um assunto grande em pequenas partes e avance uma etapa por vez.",
  "Tente explicar o conteúdo com suas próprias palavras depois de estudar.",
  "Intercale momentos de concentração com pausas curtas para descansar.",
  "Revise os conteúdos em dias diferentes para fortalecer a memória.",
  "Comece planejando o que é mais importante e possível para hoje."
];

document.getElementById("tipButton")
  .addEventListener("click", () => {
    const tip = studyTips[
      Math.floor(Math.random() * studyTips.length)
    ];

    document.getElementById("tipText").textContent = tip;

    showToast("Nova dica de estudo!");
  });

// MENU RESPONSIVO
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});

mainNav.addEventListener("click", event => {
  if (!event.target.matches("a")) return;

  mainNav.classList.remove("open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";

  document.querySelectorAll(".nav-link")
    .forEach(link => {
      link.classList.toggle("active", link === event.target);
    });
});

// Impede o cadastro de datas anteriores à data atual.
const today = localDateString();

["taskDate", "examDate", "scheduleDate"].forEach(id => {
  document.getElementById(id).min = today;
});

// INICIALIZAÇÃO DO SITE
updateHeader();
renderAll();

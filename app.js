/* ===================================================
   Student Helper — app.js
   =================================================== */

"use strict";

// ──────────────────────────────────────────────────
//  THEME TOGGLE
// ──────────────────────────────────────────────────
const themeToggle = document.getElementById("themeToggle");
const savedTheme  = localStorage.getItem("sh-theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next    = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("sh-theme", next);
  themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
});

// ──────────────────────────────────────────────────
//  TAB NAVIGATION
// ──────────────────────────────────────────────────
function switchTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("tab-" + id).classList.add("active");
  document.querySelector(`.nav-btn[data-tab="${id}"]`).classList.add("active");
}

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    switchTab(btn.dataset.tab);
  });
});

// ──────────────────────────────────────────────────
//  MOTIVATIONAL QUOTES
// ──────────────────────────────────────────────────
const quotes = [
  "The secret of getting ahead is getting started. — Mark Twain",
  "Education is the most powerful weapon you can use to change the world. — Nelson Mandela",
  "The more that you read, the more things you will know. — Dr. Seuss",
  "It always seems impossible until it's done. — Nelson Mandela",
  "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
  "Push yourself, because no one else is going to do it for you.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "A little progress each day adds up to big results.",
  "Study hard, for the well is deep and our brains are shallow.",
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "Hard work beats talent when talent doesn't work hard.",
  "Your future is created by what you do today, not tomorrow.",
];

function showQuote() {
  const idx = Math.floor(Math.random() * quotes.length);
  document.getElementById("quoteText").textContent = quotes[idx];
}
showQuote();
document.getElementById("newQuoteBtn").addEventListener("click", showQuote);

// ──────────────────────────────────────────────────
//  GPA CALCULATOR
// ──────────────────────────────────────────────────
const gradeMap = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F":  0.0,
};

const gradeOptions = ["A+","A","A-","B+","B","B-","C+","C","C-","D+","D","D-","F"];

function createCourseRow() {
  const row = document.createElement("div");
  row.className = "course-row";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "e.g. Mathematics";

  const gradeSelect = document.createElement("select");
  gradeOptions.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = g;
    gradeSelect.appendChild(opt);
  });

  const credInput = document.createElement("input");
  credInput.type = "number";
  credInput.min = "1";
  credInput.max = "6";
  credInput.value = "3";
  credInput.style.width = "100%";

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-course";
  removeBtn.innerHTML = "✕";
  removeBtn.title = "Remove course";
  removeBtn.addEventListener("click", () => {
    row.remove();
    if (document.getElementById("courseList").children.length === 0) {
      addCourseRow();
    }
  });

  row.appendChild(nameInput);
  row.appendChild(gradeSelect);
  row.appendChild(credInput);
  row.appendChild(removeBtn);
  return row;
}

function addCourseRow() {
  document.getElementById("courseList").appendChild(createCourseRow());
}

// Initialise with 3 empty rows
for (let i = 0; i < 3; i++) addCourseRow();

document.getElementById("addCourseBtn").addEventListener("click", addCourseRow);

document.getElementById("clearGpaBtn").addEventListener("click", () => {
  document.getElementById("courseList").innerHTML = "";
  document.getElementById("gpaResult").style.display = "none";
  for (let i = 0; i < 3; i++) addCourseRow();
});

document.getElementById("calcGpaBtn").addEventListener("click", () => {
  const rows = document.querySelectorAll("#courseList .course-row");
  let totalPoints = 0, totalCredits = 0;

  rows.forEach(row => {
    const grade   = row.querySelectorAll("select")[0].value;
    const credits = parseFloat(row.querySelectorAll("input")[1].value) || 0;
    if (credits > 0) {
      totalPoints  += gradeMap[grade] * credits;
      totalCredits += credits;
    }
  });

  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  document.getElementById("gpaValue").textContent = gpa;
  document.getElementById("gpaResult").style.display = "block";

  // Colour feedback
  const el = document.getElementById("gpaValue");
  const g  = parseFloat(gpa);
  el.style.color = g >= 3.5 ? "var(--success)"
                 : g >= 2.5 ? "var(--primary)"
                 : g >= 1.5 ? "var(--warning)"
                 : "var(--danger)";
});

// ──────────────────────────────────────────────────
//  TO-DO LIST
// ──────────────────────────────────────────────────
let tasks = JSON.parse(localStorage.getItem("sh-tasks") || "[]");
let taskFilter = "all";

function saveTasks() {
  localStorage.setItem("sh-tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list    = document.getElementById("taskList");
  const empty   = document.getElementById("todoEmpty");
  list.innerHTML = "";

  const visible = tasks.filter(t => {
    if (taskFilter === "pending") return !t.done;
    if (taskFilter === "done")    return  t.done;
    return true;
  });

  empty.style.display = visible.length === 0 ? "block" : "none";

  visible.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.done ? " done" : "");

    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.className = "task-check";
    chk.checked = task.done;
    chk.addEventListener("change", () => {
      task.done = chk.checked;
      saveTasks();
      renderTasks();
    });

    const badge = document.createElement("span");
    badge.className = `priority-badge priority-${task.priority}`;
    badge.textContent = task.priority;

    const txt = document.createElement("span");
    txt.className = "task-text";
    txt.textContent = task.text;

    const meta = document.createElement("span");
    meta.className = "task-meta";
    if (task.due) meta.textContent = "📅 " + task.due;

    const del = document.createElement("button");
    del.className = "delete-task";
    del.title = "Delete task";
    del.innerHTML = "🗑";
    del.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    li.appendChild(chk);
    li.appendChild(badge);
    li.appendChild(txt);
    li.appendChild(meta);
    li.appendChild(del);
    list.appendChild(li);
  });
}

document.getElementById("addTaskBtn").addEventListener("click", () => {
  const text     = document.getElementById("taskInput").value.trim();
  const priority = document.getElementById("taskPriority").value;
  const due      = document.getElementById("taskDue").value;
  if (!text) return;
  tasks.unshift({ id: Date.now(), text, priority, due, done: false });
  saveTasks();
  renderTasks();
  document.getElementById("taskInput").value = "";
  document.getElementById("taskDue").value   = "";
});

document.getElementById("taskInput").addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("addTaskBtn").click();
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    taskFilter = btn.dataset.filter;
    renderTasks();
  });
});

document.getElementById("clearDoneBtn").addEventListener("click", () => {
  tasks = tasks.filter(t => !t.done);
  saveTasks();
  renderTasks();
});

renderTasks();

// ──────────────────────────────────────────────────
//  POMODORO TIMER
// ──────────────────────────────────────────────────
let pomTimer    = null;
let pomSeconds  = 0;
let pomTotal    = 0;
let pomRound    = 1;
let pomMaxRound = 4;
let pomIsBreak  = false;
let pomRunning  = false;

function pomFocusSec()  { return (parseInt(document.getElementById("focusMin").value, 10) || 25) * 60; }
function pomBreakSec()  { return (parseInt(document.getElementById("breakMin").value, 10) || 5)  * 60; }
function pomMaxRounds() { return  parseInt(document.getElementById("pomRounds").value, 10) || 4; }

function pomFormat(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function pomUpdateUI() {
  document.getElementById("pomClock").textContent    = pomFormat(pomSeconds);
  document.getElementById("pomPhase").textContent    = pomIsBreak ? "Break ☕" : "Focus 🎯";
  document.getElementById("pomRoundsDisplay").textContent = `Round ${pomRound} / ${pomMaxRound}`;
  const pct = pomTotal > 0 ? ((pomTotal - pomSeconds) / pomTotal) * 100 : 0;
  document.getElementById("pomProgressBar").style.width = pct + "%";
}

function pomAddLog(msg) {
  const log   = document.getElementById("pomLog");
  const entry = document.createElement("div");
  entry.className  = "pom-log-entry";
  entry.textContent = new Date().toLocaleTimeString() + " — " + msg;
  log.prepend(entry);
}

function pomInit() {
  pomMaxRound = pomMaxRounds();
  pomRound    = 1;
  pomIsBreak  = false;
  pomSeconds  = pomFocusSec();
  pomTotal    = pomSeconds;
  pomUpdateUI();
}

function pomTick() {
  pomSeconds--;
  pomUpdateUI();

  if (pomSeconds <= 0) {
    clearInterval(pomTimer);
    pomRunning = false;

    if (!pomIsBreak) {
      pomAddLog(`Focus round ${pomRound} complete! 🎉`);
      if (pomRound >= pomMaxRound) {
        pomAddLog("All rounds done! Take a well-deserved rest. 🏆");
        pomInit();
        document.getElementById("pomStart").disabled = false;
        document.getElementById("pomPause").disabled = true;
        return;
      }
      pomIsBreak = true;
      pomSeconds = pomBreakSec();
      pomTotal   = pomSeconds;
      pomAddLog("Break started. Relax! ☕");
    } else {
      pomAddLog("Break over — starting next round.");
      pomRound++;
      pomIsBreak = false;
      pomSeconds = pomFocusSec();
      pomTotal   = pomSeconds;
    }
    pomUpdateUI();
    // Auto-start next phase
    pomRunning = true;
    pomTimer   = setInterval(pomTick, 1000);
    document.getElementById("pomPause").disabled = false;
  }
}

document.getElementById("pomStart").addEventListener("click", () => {
  if (pomRunning) return;
  if (pomSeconds === 0) pomInit();
  pomRunning = true;
  pomTimer   = setInterval(pomTick, 1000);
  document.getElementById("pomStart").disabled = true;
  document.getElementById("pomPause").disabled = false;
  pomAddLog("Session started. 🚀");
});

document.getElementById("pomPause").addEventListener("click", () => {
  if (!pomRunning) return;
  clearInterval(pomTimer);
  pomRunning = false;
  document.getElementById("pomStart").disabled = false;
  document.getElementById("pomPause").disabled = true;
  pomAddLog("Paused.");
});

document.getElementById("pomReset").addEventListener("click", () => {
  clearInterval(pomTimer);
  pomRunning = false;
  document.getElementById("pomStart").disabled = false;
  document.getElementById("pomPause").disabled = true;
  document.getElementById("pomLog").innerHTML = "";
  pomInit();
  pomAddLog("Timer reset.");
});

pomInit();

// ──────────────────────────────────────────────────
//  QUICK NOTES
// ──────────────────────────────────────────────────
let notes = JSON.parse(localStorage.getItem("sh-notes") || "[]");

function saveNotes() {
  localStorage.setItem("sh-notes", JSON.stringify(notes));
}

function renderNotes(filter) {
  const grid  = document.getElementById("notesGrid");
  const empty = document.getElementById("notesEmpty");
  grid.innerHTML = "";

  const list = filter
    ? notes.filter(n =>
        n.title.toLowerCase().includes(filter) ||
        n.body.toLowerCase().includes(filter))
    : notes;

  empty.style.display = list.length === 0 ? "block" : "none";

  list.forEach(note => {
    const card = document.createElement("div");
    card.className = "note-card";

    const titleEl = document.createElement("input");
    titleEl.type       = "text";
    titleEl.className  = "note-title";
    titleEl.value      = note.title;
    titleEl.placeholder = "Title…";
    titleEl.addEventListener("input", () => {
      note.title = titleEl.value;
      saveNotes();
    });

    const bodyEl = document.createElement("textarea");
    bodyEl.className   = "note-body";
    bodyEl.value       = note.body;
    bodyEl.placeholder = "Start typing your note…";
    bodyEl.addEventListener("input", () => {
      note.body = bodyEl.value;
      saveNotes();
    });

    const footer  = document.createElement("div");
    footer.className = "note-footer";

    const dateSpan = document.createElement("span");
    dateSpan.textContent = new Date(note.date).toLocaleDateString();

    const delBtn = document.createElement("button");
    delBtn.className   = "delete-note";
    delBtn.title       = "Delete note";
    delBtn.textContent = "🗑 Delete";
    delBtn.addEventListener("click", () => {
      notes = notes.filter(n => n.id !== note.id);
      saveNotes();
      renderNotes(document.getElementById("noteSearch").value.trim().toLowerCase());
    });

    footer.appendChild(dateSpan);
    footer.appendChild(delBtn);
    card.appendChild(titleEl);
    card.appendChild(bodyEl);
    card.appendChild(footer);
    grid.appendChild(card);
  });
}

document.getElementById("addNoteBtn").addEventListener("click", () => {
  notes.unshift({ id: Date.now(), title: "", body: "", date: Date.now() });
  saveNotes();
  renderNotes();
  // Focus the new note's title
  const firstTitle = document.querySelector(".note-title");
  if (firstTitle) firstTitle.focus();
});

document.getElementById("noteSearch").addEventListener("input", e => {
  renderNotes(e.target.value.trim().toLowerCase());
});

renderNotes();

// ──────────────────────────────────────────────────
//  UNIT CONVERTER
// ──────────────────────────────────────────────────
const converterData = {
  length: {
    label: "Length",
    units: ["Metre (m)", "Kilometre (km)", "Centimetre (cm)", "Millimetre (mm)",
            "Mile (mi)", "Yard (yd)", "Foot (ft)", "Inch (in)", "Nautical Mile (nmi)"],
    toBase: [1, 1000, 0.01, 0.001, 1609.344, 0.9144, 0.3048, 0.0254, 1852],
  },
  mass: {
    label: "Mass",
    units: ["Kilogram (kg)", "Gram (g)", "Milligram (mg)", "Tonne (t)",
            "Pound (lb)", "Ounce (oz)", "Stone (st)"],
    toBase: [1, 0.001, 0.000001, 1000, 0.453592, 0.0283495, 6.35029],
  },
  temp: {
    label: "Temperature",
    units: ["Celsius (°C)", "Fahrenheit (°F)", "Kelvin (K)"],
    toBase: null, // special case
  },
  time: {
    label: "Time",
    units: ["Second (s)", "Minute (min)", "Hour (h)", "Day (d)", "Week (wk)",
            "Month (approx.)", "Year (approx.)"],
    toBase: [1, 60, 3600, 86400, 604800, 2629800, 31557600],
  },
  speed: {
    label: "Speed",
    units: ["m/s", "km/h", "mph", "Knot (kn)", "ft/s"],
    toBase: [1, 1/3.6, 0.44704, 0.514444, 0.3048],
  },
};

let activeCTab = "length";

function buildConverter(type) {
  const body  = document.getElementById("converterBody");
  const data  = converterData[type];
  body.innerHTML = "";

  const row = document.createElement("div");
  row.className = "converter-row";

  const valIn = document.createElement("input");
  valIn.type        = "number";
  valIn.placeholder = "Value";
  valIn.id          = "convVal";

  const fromSel = document.createElement("select");
  fromSel.id = "convFrom";
  data.units.forEach(u => {
    const o = document.createElement("option");
    o.textContent = u; fromSel.appendChild(o);
  });

  const eq = document.createElement("span");
  eq.className   = "converter-eq";
  eq.textContent = "→";

  const toSel = document.createElement("select");
  toSel.id = "convTo";
  data.units.forEach((u, i) => {
    const o = document.createElement("option");
    o.textContent = u;
    if (i === 1) o.selected = true;
    toSel.appendChild(o);
  });

  const res = document.createElement("div");
  res.id = "convResult";
  res.className = "";

  function convert() {
    const val  = parseFloat(valIn.value);
    if (isNaN(val)) { res.textContent = "—"; return; }
    const from = fromSel.selectedIndex;
    const to   = toSel.selectedIndex;

    let result;
    if (type === "temp") {
      // Celsius as base
      let celsius;
      if      (from === 0) celsius = val;
      else if (from === 1) celsius = (val - 32) * 5/9;
      else                 celsius = val - 273.15;

      if      (to === 0) result = celsius;
      else if (to === 1) result = celsius * 9/5 + 32;
      else               result = celsius + 273.15;
    } else {
      const base = val * data.toBase[from];
      result     = base / data.toBase[to];
    }

    const formatted = Math.abs(result) >= 0.0001 && Math.abs(result) < 1e10
      ? parseFloat(result.toPrecision(8)).toString()
      : result.toExponential(4);

    res.textContent = `${formatted} ${data.units[to].split(" ")[0]}`;
  }

  valIn.addEventListener("input",  convert);
  fromSel.addEventListener("change", convert);
  toSel.addEventListener("change",   convert);

  row.appendChild(valIn);
  row.appendChild(fromSel);
  row.appendChild(eq);
  row.appendChild(toSel);
  body.appendChild(row);
  body.appendChild(res);
}

document.querySelectorAll(".ctab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".ctab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCTab = btn.dataset.ctab;
    buildConverter(activeCTab);
  });
});

buildConverter(activeCTab);

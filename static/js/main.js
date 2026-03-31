/* ==============================================
   Student Helpfull – Frontend JavaScript
   ============================================== */

"use strict";

/* ---- Language translations ---- */
const I18N = {
  english: {
    heroTitle: "AI-Powered Exam Preparation",
    heroSubtitle: "Upload your study material <strong>or</strong> enter a subject &amp; topic — get instant notes, flashcards, quizzes, mind maps &amp; infographics in English or Hindi.",
    navUploadLabel: "Upload Material",
    navTopicLabel: "Enter Topic",
    uploadSectionTitle: "Upload Your Study Material",
    uploadSectionDesc: "Upload a PDF, Word document, or text file — our AI will extract the content and generate infographics, quizzes, and mind maps for you.",
    uploadLangLabel: "Language",
    dropzoneText: "Drag &amp; drop your file here",
    dropzoneSubText: "or click to browse",
    uploadBtnText: "Generate",
    uploadResultsTitle: "📚 Generated Study Aids",
    topicSectionTitle: "Enter Subject &amp; Topic",
    topicSectionDesc: "Enter any subject and topic to instantly get full notes, revision notes, flash cards, infographics, quizzes, and a mind map.",
    subjectLabel: "Subject",
    subjectPlaceholder: "e.g. Physics, History…",
    topicLabel: "Topic",
    topicPlaceholder: "e.g. Newton's Laws…",
    topicLangLabel: "Language",
    generateBtnText: "Generate Study Materials",
    examplesLabel: "Try an example: ",
    footerText: "AI-powered exam preparation in English &amp; Hindi",
    flashcardHint: "👆 Click a card to reveal the answer",
    quizSubmitBtn: "Submit Answer",
    quizNextBtn: "Next Question",
    quizRetryBtn: "Retry Quiz",
    quizResultTitle: "Quiz Complete!",
    quizResultSubtitle: "You scored",
    quizResultOutOf: "out of",
    quizResultExcellent: "🎉 Excellent! Outstanding performance!",
    quizResultGood: "👍 Good work! Keep it up!",
    quizResultKeepPracticing: "📖 Keep practising — you'll get there!",
    quizResultRetry: "Retry Quiz",
    demoBannerText: "🎓 Demo Mode – Add your GEMINI_API_KEY to .env for AI-generated content",
  },
  hindi: {
    heroTitle: "AI-संचालित परीक्षा तैयारी",
    heroSubtitle: "अपनी अध्ययन सामग्री अपलोड करें <strong>या</strong> विषय और टॉपिक दर्ज करें — तुरंत नोट्स, फ्लैशकार्ड, क्विज़, माइंड मैप और इन्फोग्राफिक पाएं।",
    navUploadLabel: "सामग्री अपलोड करें",
    navTopicLabel: "टॉपिक दर्ज करें",
    uploadSectionTitle: "अपनी अध्ययन सामग्री अपलोड करें",
    uploadSectionDesc: "PDF, Word दस्तावेज़ या टेक्स्ट फ़ाइल अपलोड करें — हमारा AI सामग्री निकालकर इन्फोग्राफिक, क्विज़ और माइंड मैप बनाएगा।",
    uploadLangLabel: "भाषा",
    dropzoneText: "यहाँ फ़ाइल खींचें और छोड़ें",
    dropzoneSubText: "या ब्राउज़ करने के लिए क्लिक करें",
    uploadBtnText: "बनाएं",
    uploadResultsTitle: "📚 बनाई गई अध्ययन सामग्री",
    topicSectionTitle: "विषय और टॉपिक दर्ज करें",
    topicSectionDesc: "कोई भी विषय और टॉपिक दर्ज करें और तुरंत पूर्ण नोट्स, पुनरावृत्ति नोट्स, फ्लैश कार्ड, इन्फोग्राफिक, क्विज़ और माइंड मैप पाएं।",
    subjectLabel: "विषय",
    subjectPlaceholder: "जैसे: भौतिकी, इतिहास…",
    topicLabel: "टॉपिक",
    topicPlaceholder: "जैसे: न्यूटन के नियम…",
    topicLangLabel: "भाषा",
    generateBtnText: "अध्ययन सामग्री बनाएं",
    examplesLabel: "उदाहरण आज़माएं: ",
    footerText: "AI-संचालित परीक्षा तैयारी हिंदी और अंग्रेज़ी में",
    flashcardHint: "👆 उत्तर देखने के लिए कार्ड पर क्लिक करें",
    quizSubmitBtn: "उत्तर दें",
    quizNextBtn: "अगला प्रश्न",
    quizRetryBtn: "फिर से खेलें",
    quizResultTitle: "क्विज़ पूर्ण!",
    quizResultSubtitle: "आपका स्कोर",
    quizResultOutOf: "में से",
    quizResultExcellent: "🎉 शानदार! बेहतरीन प्रदर्शन!",
    quizResultGood: "👍 अच्छा काम! ऐसे ही जारी रखें!",
    quizResultKeepPracticing: "📖 अभ्यास जारी रखें — आप कर लेंगे!",
    quizResultRetry: "फिर से खेलें",
    demoBannerText: "🎓 डेमो मोड – AI-जनित सामग्री के लिए .env में GEMINI_API_KEY जोड़ें",
  },
};

/* ---- State ---- */
let currentLang = "english";
let quizState = {}; // { questions, currentIndex, score, answered }

/* ---- On DOM Ready ---- */
document.addEventListener("DOMContentLoaded", () => {
  initLangToggle();
  initDropzone();
  initUploadButton();
  initTopicGenerate();
  initExampleButtons();
  checkDemoMode();
});

/* ============================================================
   LANGUAGE TOGGLE
   ============================================================ */
function initLangToggle() {
  const toggle = document.getElementById("langToggle");
  toggle.addEventListener("change", () => {
    currentLang = toggle.checked ? "hindi" : "english";
    applyLanguage(currentLang);

    // Sync both language selects
    document.getElementById("uploadLanguage").value = currentLang;
    document.getElementById("topicLanguage").value = currentLang;
    document.getElementById("langDisplay").textContent = currentLang === "hindi" ? "🇮🇳 हिंदी" : "🇬🇧 English";
  });
}

function applyLanguage(lang) {
  const t = I18N[lang];
  Object.keys(t).forEach((key) => {
    const el = document.getElementById(key);
    if (el) el.innerHTML = t[key];
  });

  // Feature pills
  document.querySelectorAll(".feat-label").forEach((el) => {
    el.textContent = el.dataset[lang] || el.dataset.en;
  });

  // Input placeholders
  const subjectInput = document.getElementById("subjectInput");
  const topicInput = document.getElementById("topicInput");
  if (subjectInput) subjectInput.placeholder = t.subjectPlaceholder;
  if (topicInput) topicInput.placeholder = t.topicPlaceholder;
}

/* ============================================================
   DROPZONE
   ============================================================ */
function initDropzone() {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const fileInfo = document.getElementById("fileInfo");
  const fileName = document.getElementById("fileName");
  const clearFile = document.getElementById("clearFile");
  const uploadBtn = document.getElementById("uploadBtn");

  dropzone.addEventListener("click", () => fileInput.click());

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("drag-over");
  });

  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("drag-over"));

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files[0]) handleFileSelect(fileInput.files[0]);
  });

  clearFile.addEventListener("click", () => {
    fileInput.value = "";
    fileInfo.classList.add("d-none");
    dropzone.classList.remove("d-none");
    uploadBtn.disabled = true;
  });

  function handleFileSelect(file) {
    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword", "text/plain"];
    const ext = file.name.split(".").pop().toLowerCase();
    const allowedExts = ["pdf", "docx", "doc", "txt"];

    if (!allowedExts.includes(ext)) {
      showToast("⚠️ Only PDF, DOCX, and TXT files are supported.", "bg-warning text-dark");
      return;
    }
    if (file.size > 16 * 1024 * 1024) {
      showToast("⚠️ File size must be under 16 MB.", "bg-warning text-dark");
      return;
    }
    fileName.textContent = file.name;
    fileInfo.classList.remove("d-none");
    dropzone.classList.add("d-none");
    uploadBtn.disabled = false;
  }
}

/* ============================================================
   UPLOAD & PROCESS
   ============================================================ */
function initUploadButton() {
  document.getElementById("uploadBtn").addEventListener("click", async () => {
    const fileInput = document.getElementById("fileInput");
    if (!fileInput.files[0]) return;

    const language = document.getElementById("uploadLanguage").value;
    setUploadLoading(true);

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("language", language);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok || json.error) {
        showToast("❌ " + (json.error || "Upload failed."), "bg-danger");
        return;
      }
      renderUploadResults(json.data, language);
    } catch (err) {
      showToast("❌ Network error. Please try again.", "bg-danger");
    } finally {
      setUploadLoading(false);
    }
  });
}

function setUploadLoading(loading) {
  const btn = document.getElementById("uploadBtn");
  const spinner = document.getElementById("uploadSpinner");
  const icon = document.getElementById("uploadIcon");
  btn.disabled = loading;
  spinner.classList.toggle("d-none", !loading);
  icon.classList.toggle("d-none", loading);
}

/* ============================================================
   TOPIC GENERATION
   ============================================================ */
function initTopicGenerate() {
  document.getElementById("generateBtn").addEventListener("click", handleGenerate);
  document.getElementById("subjectInput").addEventListener("keydown", (e) => { if (e.key === "Enter") handleGenerate(); });
  document.getElementById("topicInput").addEventListener("keydown", (e) => { if (e.key === "Enter") handleGenerate(); });
}

function initExampleButtons() {
  document.querySelectorAll(".example-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("subjectInput").value = btn.dataset.subject;
      document.getElementById("topicInput").value = btn.dataset.topic;
    });
  });
}

async function handleGenerate() {
  const subject = document.getElementById("subjectInput").value.trim();
  const topic = document.getElementById("topicInput").value.trim();
  const language = document.getElementById("topicLanguage").value;

  if (!subject) { showToast("⚠️ Please enter a subject.", "bg-warning text-dark"); return; }
  if (!topic)   { showToast("⚠️ Please enter a topic.",   "bg-warning text-dark"); return; }

  setGenerateLoading(true);

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, topic, language }),
    });
    const json = await res.json();
    if (!res.ok || json.error) {
      showToast("❌ " + (json.error || "Generation failed."), "bg-danger");
      return;
    }
    renderTopicResults(json.data, subject, topic, language);
  } catch (err) {
    showToast("❌ Network error. Please try again.", "bg-danger");
  } finally {
    setGenerateLoading(false);
  }
}

function setGenerateLoading(loading) {
  const btn = document.getElementById("generateBtn");
  const spinner = document.getElementById("generateSpinner");
  const icon = document.getElementById("generateIcon");
  btn.disabled = loading;
  spinner.classList.toggle("d-none", !loading);
  icon.classList.toggle("d-none", loading);
}

/* ============================================================
   RENDER: UPLOAD RESULTS
   ============================================================ */
function renderUploadResults(data, lang) {
  const container = document.getElementById("uploadResults");

  document.getElementById("uploadInfographic").innerHTML = renderInfographic(data.infographic);
  document.getElementById("uploadQuiz").innerHTML = "";
  document.getElementById("uploadMindmap").innerHTML = renderMindmap(data.mindmap);

  // Quiz
  renderQuiz("uploadQuiz", data.quiz, lang);

  container.classList.remove("d-none");
  container.classList.add("fade-in-up");
  container.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ============================================================
   RENDER: TOPIC RESULTS
   ============================================================ */
function renderTopicResults(data, subject, topic, lang) {
  const container = document.getElementById("topicResults");

  document.getElementById("topicResultsSubtitle").textContent = `${subject} › ${topic}`;

  document.getElementById("topicNotes").innerHTML = renderNotes(data.notes);
  document.getElementById("topicRevision").innerHTML = renderRevision(data.revision_notes);
  document.getElementById("topicFlashcards").innerHTML = renderFlashcards(data.flashcards, lang);
  document.getElementById("topicInfographic").innerHTML = renderInfographic(data.infographic);
  document.getElementById("topicMindmap").innerHTML = renderMindmap(data.mindmap);

  // Quiz
  document.getElementById("topicQuiz").innerHTML = "";
  renderQuiz("topicQuiz", data.quiz, lang);

  // Bind flashcard flipping
  container.querySelectorAll(".flashcard").forEach((card) => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
  });

  container.classList.remove("d-none");
  container.classList.add("fade-in-up");
  container.scrollIntoView({ behavior: "smooth", block: "start" });

  // Re-activate first tab
  const firstTab = document.querySelector("#topicTabs .nav-link");
  if (firstTab) new bootstrap.Tab(firstTab).show();
}

/* ============================================================
   RENDERERS
   ============================================================ */

function renderNotes(notes) {
  if (!notes) return "<p class='text-muted'>No notes available.</p>";
  let html = `<div class="notes-card fade-in-up">
    <h2 class="notes-title">${esc(notes.title)}</h2>
    <p class="notes-intro">${esc(notes.introduction)}</p>`;
  (notes.sections || []).forEach((s) => {
    html += `<div class="notes-section-heading">${esc(s.heading)}</div>
      <p class="notes-content">${esc(s.content)}</p>
      <ul class="notes-key-points">${(s.key_points || []).map((k) => `<li>${esc(k)}</li>`).join("")}</ul>`;
  });
  html += "</div>";
  return html;
}

function renderRevision(rev) {
  if (!rev) return "<p class='text-muted'>No revision notes available.</p>";
  let html = `<div class="revision-card fade-in-up">
    <h3 class="revision-title">${esc(rev.title)}</h3>
    <div class="mt-3">${(rev.key_points || []).map((p) => `<div class="revision-point">${esc(p)}</div>`).join("")}</div>`;
  if (rev.important_formulas && rev.important_formulas.length) {
    html += `<div class="mt-3"><strong>📐 Formulas / सूत्र</strong><div class="mt-2">${rev.important_formulas.map((f) => `<span class="formula-pill">${esc(f)}</span>`).join("")}</div></div>`;
  }
  if (rev.remember) {
    html += `<div class="remember-box">${esc(rev.remember)}</div>`;
  }
  html += "</div>";
  return html;
}

function renderFlashcards(flashcards, lang) {
  if (!flashcards || !flashcards.length) return "<p class='text-muted'>No flashcards available.</p>";
  const hint = I18N[lang]?.flashcardHint || I18N.english.flashcardHint;
  let html = `<p class="flashcard-hint">${hint}</p><div class="flashcard-grid">`;
  flashcards.forEach((fc) => {
    html += `<div class="flashcard">
      <div class="flashcard-inner">
        <div class="flashcard-front">${esc(fc.front)}</div>
        <div class="flashcard-back">${esc(fc.back)}</div>
      </div>
    </div>`;
  });
  html += "</div>";
  return html;
}

function renderInfographic(info) {
  if (!info) return "<p class='text-muted'>No infographic available.</p>";
  let html = `<div class="infographic-wrap fade-in-up">
    <div class="infographic-title">${esc(info.title)}</div>
    <div class="infographic-grid">`;
  (info.sections || []).forEach((s) => {
    html += `<div class="infographic-section">
      <div class="infographic-heading">${esc(s.heading)}</div>
      ${(s.points || []).map((p) => `<div class="infographic-point">${esc(p)}</div>`).join("")}
    </div>`;
  });
  html += "</div></div>";
  return html;
}

function renderMindmap(mindmap) {
  if (!mindmap) return "<p class='text-muted'>No mind map available.</p>";
  let html = `<div class="mindmap-wrap fade-in-up">
    <div class="mindmap-container">
      <div class="mindmap-central">${esc(mindmap.central_topic)}</div>
      <div class="mindmap-branches">`;
  (mindmap.branches || []).forEach((b) => {
    html += `<div class="mindmap-branch">
      <div class="mindmap-branch-label">${esc(b.label)}</div>
      ${(b.sub_topics || []).map((st) => `<div class="mindmap-subtopic">${esc(st)}</div>`).join("")}
    </div>`;
  });
  html += "</div></div></div>";
  return html;
}

/* ============================================================
   QUIZ ENGINE
   ============================================================ */
function renderQuiz(containerId, questions, lang) {
  if (!questions || !questions.length) {
    document.getElementById(containerId).innerHTML = "<p class='text-muted'>No quiz available.</p>";
    return;
  }
  const t = I18N[lang] || I18N.english;

  quizState[containerId] = {
    questions,
    currentIndex: 0,
    score: 0,
    answered: false,
    lang,
  };

  renderQuizQuestion(containerId, t);

  // Bind to container (delegated)
  const el = document.getElementById(containerId);
  el.addEventListener("click", (e) => {
    const optEl = e.target.closest(".quiz-option");
    const submitBtn = e.target.closest("#quiz-submit-" + containerId);
    const nextBtn = e.target.closest("#quiz-next-" + containerId);
    const retryBtn = e.target.closest("#quiz-retry-" + containerId);

    if (optEl && !quizState[containerId].answered) selectOption(containerId, optEl);
    if (submitBtn) submitAnswer(containerId);
    if (nextBtn) nextQuestion(containerId);
    if (retryBtn) retryQuiz(containerId);
  });
}

function renderQuizQuestion(containerId, t_override) {
  const state = quizState[containerId];
  if (!state) return;
  const t = t_override || I18N[state.lang] || I18N.english;
  const q = state.questions[state.currentIndex];
  const total = state.questions.length;
  const progress = ((state.currentIndex / total) * 100).toFixed(0);

  const el = document.getElementById(containerId);
  el.innerHTML = `<div class="quiz-wrap fade-in-up">
    <div class="quiz-header">
      <div class="quiz-progress-wrap me-3">
        <div class="d-flex justify-content-between mb-1">
          <small class="text-muted">Q${state.currentIndex + 1}/${total}</small>
          <small class="text-muted">${state.score} ✓</small>
        </div>
        <div class="progress" style="height:8px">
          <div class="progress-bar bg-primary" style="width:${progress}%"></div>
        </div>
      </div>
      <span class="quiz-score-badge">${state.score}/${total}</span>
    </div>
    <div class="quiz-card">
      <div class="quiz-q-num">Question ${state.currentIndex + 1} of ${total}</div>
      <div class="quiz-question">${esc(q.question)}</div>
      <div id="quiz-options-${containerId}">
        ${q.options.map((opt, i) => `<div class="quiz-option" data-opt="${esc(opt)}" data-index="${i}">${esc(opt)}</div>`).join("")}
      </div>
      <div id="quiz-explanation-${containerId}"></div>
    </div>
    <div class="quiz-nav">
      <button class="btn btn-primary px-4" id="quiz-submit-${containerId}" disabled>${t.quizSubmitBtn}</button>
    </div>
  </div>`;
  state.answered = false;
  state.selected = null;
}

function selectOption(containerId, optEl) {
  const state = quizState[containerId];
  document.querySelectorAll(`#${containerId} .quiz-option`).forEach((el) => el.classList.remove("selected", "border-primary", "bg-light"));
  optEl.classList.add("border-primary", "bg-light");
  state.selected = optEl.dataset.opt;
  document.getElementById("quiz-submit-" + containerId).disabled = false;
}

function submitAnswer(containerId) {
  const state = quizState[containerId];
  if (!state || state.answered) return;
  const t = I18N[state.lang] || I18N.english;
  const q = state.questions[state.currentIndex];
  const correctOpt = q.options.find((o) => o.startsWith(q.answer + ".") || o === q.answer);

  state.answered = true;

  document.querySelectorAll(`#${containerId} .quiz-option`).forEach((el) => {
    const isSelected = el.dataset.opt === state.selected;
    const isCorrect = correctOpt && (el.dataset.opt === correctOpt || el.dataset.opt.startsWith(q.answer + "."));

    if (isCorrect) el.classList.add("reveal-correct");
    if (isSelected && isCorrect) { el.classList.remove("reveal-correct"); el.classList.add("correct"); state.score++; }
    else if (isSelected && !isCorrect) el.classList.add("wrong");
  });

  document.getElementById("quiz-explanation-" + containerId).innerHTML =
    `<div class="quiz-explanation"><strong>💡</strong> ${esc(q.explanation)}</div>`;

  // Replace submit with next/finish
  const isLast = state.currentIndex >= state.questions.length - 1;
  document.getElementById("quiz-submit-" + containerId).outerHTML =
    isLast
      ? `<button class="btn btn-success px-4" id="quiz-next-${containerId}">${state.lang === "hindi" ? "परिणाम देखें" : "See Results"}</button>`
      : `<button class="btn btn-primary px-4" id="quiz-next-${containerId}">${t.quizNextBtn}</button>`;

  // Update score badge
  const badge = document.querySelector(`#${containerId} .quiz-score-badge`);
  if (badge) badge.textContent = `${state.score}/${state.questions.length}`;
}

function nextQuestion(containerId) {
  const state = quizState[containerId];
  if (!state) return;
  state.currentIndex++;
  if (state.currentIndex >= state.questions.length) {
    showQuizResults(containerId);
  } else {
    renderQuizQuestion(containerId);
  }
}

function showQuizResults(containerId) {
  const state = quizState[containerId];
  const t = I18N[state.lang] || I18N.english;
  const pct = Math.round((state.score / state.questions.length) * 100);
  const msg = pct >= 80 ? t.quizResultExcellent : pct >= 50 ? t.quizResultGood : t.quizResultKeepPracticing;

  document.getElementById(containerId).innerHTML = `
    <div class="quiz-results fade-in-up">
      <div class="quiz-score-circle">
        <span>${state.score}</span>
        <small style="font-size:0.7rem;opacity:0.85">${t.quizResultOutOf} ${state.questions.length}</small>
      </div>
      <h3>${t.quizResultTitle}</h3>
      <p class="lead">${t.quizResultSubtitle} <strong>${state.score}/${state.questions.length}</strong> (${pct}%)</p>
      <p class="fs-5">${msg}</p>
      <button class="btn btn-primary px-4 mt-2" id="quiz-retry-${containerId}">${t.quizResultRetry}</button>
    </div>`;
}

function retryQuiz(containerId) {
  const state = quizState[containerId];
  if (!state) return;
  state.currentIndex = 0;
  state.score = 0;
  state.answered = false;
  renderQuizQuestion(containerId);
}

/* ============================================================
   DEMO MODE BANNER
   ============================================================ */
async function checkDemoMode() {
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: "_ping_", topic: "_ping_", language: "english" }),
    });
    const json = await res.json();
    if (json.success && json._demo) {
      addDemoBanner();
    }
  } catch (_) {}
}

function addDemoBanner() {
  const banner = document.createElement("div");
  banner.className = "demo-banner";
  banner.id = "demoBanner";
  banner.textContent = I18N[currentLang]?.demoBannerText || I18N.english.demoBannerText;
  document.body.prepend(banner);
}

/* ============================================================
   TOAST
   ============================================================ */
function showToast(message, bgClass = "bg-primary") {
  const toastEl = document.getElementById("appToast");
  toastEl.className = `toast align-items-center text-white border-0 ${bgClass}`;
  document.getElementById("toastBody").textContent = message;
  new bootstrap.Toast(toastEl, { delay: 4000 }).show();
}

/* ============================================================
   UTILS
   ============================================================ */
function esc(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ---- Bind flashcards in upload results too ---- */
document.addEventListener("click", (e) => {
  const card = e.target.closest("#uploadResults .flashcard");
  if (card) card.classList.toggle("flipped");
});

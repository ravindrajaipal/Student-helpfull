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
    uploadBtnText: "Generate",
    dropzoneText: "Drag & drop your file here",
    dropzoneSubText: "or click to browse",
    uploadResultsTitle: "📚 Generated Study Aids",
    topicSectionTitle: "Enter Subject & Topic",
    topicSectionDesc: "Enter any subject and topic to instantly get full notes, revision notes, flash cards, infographics, quizzes, and a mind map.",
    subjectLabel: "Subject",
    topicLabel: "Topic",
    topicLangLabel: "Language",
    generateBtnText: "Generate Study Materials",
    examplesLabel: "Try an example:",
    topicResultsTitle: "📖 Study Materials",
    footerText: "AI-powered exam preparation in English & Hindi",
    flashcardHint: "💡 Click a card to flip it and reveal the answer",
    quizSubmitBtn: "Submit Answer",
    quizNextBtn: "Next Question",
    quizResultTitle: "Quiz Complete! 🎉",
    quizResultSubtitle: "You scored",
    quizResultOutOf: "out of",
    quizResultExcellent: "🌟 Excellent! Keep up the great work!",
    quizResultGood: "👍 Good job! A little more practice and you'll ace it!",
    quizResultKeepPracticing: "📚 Keep practising — you'll get there!",
    quizResultRetry: "Retry Quiz",
    langDisplay: "🇬🇧 English",
    demoBannerText: "🔑 Running in Demo Mode – add a GEMINI_API_KEY in .env for live AI content",
    generatingText: "Generating…",
    processingText: "Processing…",
    errorNoSubject: "Please enter a subject.",
    errorNoTopic: "Please enter a topic.",
    errorNoFile: "Please select a file first.",
    errorGeneric: "Something went wrong. Please try again.",
  },
  hindi: {
    heroTitle: "AI-संचालित परीक्षा तैयारी",
    heroSubtitle: "अपनी अध्ययन सामग्री अपलोड करें <strong>या</strong> विषय और टॉपिक दर्ज करें — अंग्रेजी या हिंदी में तुरंत नोट्स, फ्लैशकार्ड, क्विज़, माइंड मैप और इन्फोग्राफिक प्राप्त करें।",
    navUploadLabel: "सामग्री अपलोड करें",
    navTopicLabel: "टॉपिक दर्ज करें",
    uploadSectionTitle: "अपनी अध्ययन सामग्री अपलोड करें",
    uploadSectionDesc: "PDF, Word दस्तावेज़ या टेक्स्ट फ़ाइल अपलोड करें — हमारा AI सामग्री निकालेगा और आपके लिए इन्फोग्राफिक, क्विज़ और माइंड मैप बनाएगा।",
    uploadLangLabel: "भाषा",
    uploadBtnText: "बनाएं",
    dropzoneText: "यहाँ फ़ाइल खींचें और छोड़ें",
    dropzoneSubText: "या ब्राउज़ करने के लिए क्लिक करें",
    uploadResultsTitle: "📚 अध्ययन सहायक सामग्री",
    topicSectionTitle: "विषय और टॉपिक दर्ज करें",
    topicSectionDesc: "कोई भी विषय और टॉपिक दर्ज करें — पूर्ण नोट्स, पुनरावृत्ति नोट्स, फ्लैश कार्ड, इन्फोग्राफिक, क्विज़ और माइंड मैप तुरंत पाएं।",
    subjectLabel: "विषय",
    topicLabel: "टॉपिक",
    topicLangLabel: "भाषा",
    generateBtnText: "अध्ययन सामग्री बनाएं",
    examplesLabel: "उदाहरण आज़माएं:",
    topicResultsTitle: "📖 अध्ययन सामग्री",
    footerText: "अंग्रेजी और हिंदी में AI-संचालित परीक्षा तैयारी",
    flashcardHint: "💡 उत्तर देखने के लिए कार्ड पर क्लिक करें",
    quizSubmitBtn: "उत्तर जमा करें",
    quizNextBtn: "अगला प्रश्न",
    quizResultTitle: "क्विज़ पूरा! 🎉",
    quizResultSubtitle: "आपका स्कोर",
    quizResultOutOf: "में से",
    quizResultExcellent: "🌟 शानदार! इसी तरह जारी रखें!",
    quizResultGood: "👍 अच्छा काम! थोड़े और अभ्यास से आप इसे जीत लेंगे!",
    quizResultKeepPracticing: "📚 अभ्यास करते रहें — आप ज़रूर सफल होंगे!",
    quizResultRetry: "क्विज़ दोबारा करें",
    langDisplay: "🇮🇳 हिंदी",
    demoBannerText: "🔑 डेमो मोड में चल रहा है – लाइव AI सामग्री के लिए .env में GEMINI_API_KEY जोड़ें",
    generatingText: "बन रहा है…",
    processingText: "प्रोसेस हो रहा है…",
    errorNoSubject: "कृपया विषय दर्ज करें।",
    errorNoTopic: "कृपया टॉपिक दर्ज करें।",
    errorNoFile: "कृपया पहले एक फ़ाइल चुनें।",
    errorGeneric: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",
  },
};

/* ---- State ---- */
let currentLang = "english";
let selectedFile = null;
const quizState = {};

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initDropzone();
  initLangToggle();
  initGenerateBtn();
  initUploadBtn();
  initExampleBtns();
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
  });
}

function applyLanguage(lang) {
  const t = I18N[lang];
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };

  setText("heroTitle", t.heroTitle);
  setText("heroSubtitle", t.heroSubtitle);
  setText("navUploadLabel", t.navUploadLabel);
  setText("navTopicLabel", t.navTopicLabel);
  setText("uploadSectionTitle", t.uploadSectionTitle);
  setText("uploadSectionDesc", t.uploadSectionDesc);
  setText("uploadLangLabel", t.uploadLangLabel);
  setText("uploadBtnText", t.uploadBtnText);
  setText("dropzoneText", t.dropzoneText);
  setText("dropzoneSubText", t.dropzoneSubText);
  setText("uploadResultsTitle", t.uploadResultsTitle);
  setText("topicSectionTitle", t.topicSectionTitle);
  setText("topicSectionDesc", t.topicSectionDesc);
  setText("subjectLabel", t.subjectLabel);
  setText("topicLabel", t.topicLabel);
  setText("topicLangLabel", t.topicLangLabel);
  setText("generateBtnText", t.generateBtnText);
  setText("examplesLabel", t.examplesLabel);
  setText("topicResultsTitle", t.topicResultsTitle);
  setText("footerText", t.footerText);
  setText("langDisplay", t.langDisplay);

  // Feature pill labels
  document.querySelectorAll(".feat-label").forEach((el) => {
    const val = lang === "hindi" ? el.dataset.hi : el.dataset.en;
    if (val) el.textContent = val;
  });

  // Sync language dropdowns
  document.getElementById("uploadLanguage").value = lang;
  document.getElementById("topicLanguage").value = lang;

  // Demo banner
  const banner = document.getElementById("demoBanner");
  if (banner) banner.textContent = t.demoBannerText;
}

/* ============================================================
   DROPZONE / FILE INPUT
   ============================================================ */
function initDropzone() {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const clearBtn = document.getElementById("clearFile");

  dropzone.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    if (fileInput.files[0]) setFile(fileInput.files[0]);
  });

  dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("drag-over"); });
  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("drag-over"));
  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("drag-over");
    if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  });

  clearBtn.addEventListener("click", clearFile);
}

function setFile(file) {
  selectedFile = file;
  document.getElementById("fileName").textContent = file.name;
  document.getElementById("fileInfo").classList.remove("d-none");
  document.getElementById("uploadBtn").disabled = false;
}

function clearFile() {
  selectedFile = null;
  document.getElementById("fileInput").value = "";
  document.getElementById("fileInfo").classList.add("d-none");
  document.getElementById("uploadBtn").disabled = true;
}

/* ============================================================
   UPLOAD FLOW
   ============================================================ */
function initUploadBtn() {
  document.getElementById("uploadBtn").addEventListener("click", handleUpload);
}

async function handleUpload() {
  const t = I18N[currentLang];
  if (!selectedFile) { showToast(t.errorNoFile, "bg-danger"); return; }

  const language = document.getElementById("uploadLanguage").value;
  setUploadLoading(true);

  try {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("language", language);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const json = await res.json();

    if (!res.ok || json.error) throw new Error(json.error || t.errorGeneric);

    displayUploadResults(json.data, language);
    showToast("✅ " + (language === "hindi" ? "सामग्री तैयार है!" : "Study aids generated!"), "bg-success");
  } catch (err) {
    showToast("❌ " + (err.message || t.errorGeneric), "bg-danger");
  } finally {
    setUploadLoading(false);
  }
}

function setUploadLoading(loading) {
  const btn = document.getElementById("uploadBtn");
  const spinner = document.getElementById("uploadSpinner");
  const icon = document.getElementById("uploadIcon");
  const text = document.getElementById("uploadBtnText");
  const t = I18N[currentLang];

  btn.disabled = loading;
  spinner.classList.toggle("d-none", !loading);
  icon.classList.toggle("d-none", loading);
  text.textContent = loading ? t.processingText : t.uploadBtnText;
}

function displayUploadResults(data, language) {
  document.getElementById("uploadInfographic").innerHTML = renderInfographic(data.infographic);
  renderQuiz("uploadQuiz", data.quiz, language);
  document.getElementById("uploadMindmap").innerHTML = renderMindmap(data.mindmap);

  const container = document.getElementById("uploadResults");
  container.classList.remove("d-none");
  container.classList.add("fade-in-up");
  container.scrollIntoView({ behavior: "smooth", block: "start" });

  // Re-activate first tab
  const firstTab = document.querySelector("#uploadTabs .nav-link");
  if (firstTab) new bootstrap.Tab(firstTab).show();
}

/* ============================================================
   TOPIC GENERATE FLOW
   ============================================================ */
function initGenerateBtn() {
  document.getElementById("generateBtn").addEventListener("click", handleGenerate);
  // Allow Enter key in inputs
  ["subjectInput", "topicInput"].forEach((id) => {
    document.getElementById(id).addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleGenerate();
    });
  });
}

function initExampleBtns() {
  document.querySelectorAll(".example-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("subjectInput").value = btn.dataset.subject;
      document.getElementById("topicInput").value = btn.dataset.topic;
    });
  });
}

async function handleGenerate() {
  const t = I18N[currentLang];
  const subject = document.getElementById("subjectInput").value.trim();
  const topic = document.getElementById("topicInput").value.trim();
  const language = document.getElementById("topicLanguage").value;

  if (!subject) { showToast(t.errorNoSubject, "bg-danger"); return; }
  if (!topic) { showToast(t.errorNoTopic, "bg-danger"); return; }

  setGenerateLoading(true);

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, topic, language }),
    });
    const json = await res.json();

    if (!res.ok || json.error) throw new Error(json.error || t.errorGeneric);

    displayTopicResults(json.data, subject, topic, language);
    showToast("✅ " + (language === "hindi" ? "सामग्री तैयार है!" : "Study materials generated!"), "bg-success");
  } catch (err) {
    showToast("❌ " + (err.message || t.errorGeneric), "bg-danger");
  } finally {
    setGenerateLoading(false);
  }
}

function setGenerateLoading(loading) {
  const btn = document.getElementById("generateBtn");
  const spinner = document.getElementById("generateSpinner");
  const icon = document.getElementById("generateIcon");
  const text = document.getElementById("generateBtnText");
  const t = I18N[currentLang];

  btn.disabled = loading;
  spinner.classList.toggle("d-none", !loading);
  icon.classList.toggle("d-none", loading);
  text.textContent = loading ? t.generatingText : t.generateBtnText;
}

function displayTopicResults(data, subject, topic, language) {
  document.getElementById("topicResultsSubtitle").textContent = `${subject} – ${topic}`;
  document.getElementById("topicNotes").innerHTML = renderNotes(data.notes);
  document.getElementById("topicRevision").innerHTML = renderRevision(data.revision_notes);
  document.getElementById("topicFlashcards").innerHTML = renderFlashcards(data.flashcards, language);
  document.getElementById("topicInfographic").innerHTML = renderInfographic(data.infographic);
  renderQuiz("topicQuiz", data.quiz, language);
  document.getElementById("topicMindmap").innerHTML = renderMindmap(data.mindmap);

  // Bind flashcard clicks
  document.querySelectorAll("#topicFlashcards .flashcard").forEach((card) => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
  });

  const container = document.getElementById("topicResults");
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
    if (json.success && json.data && json.data._demo) {
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

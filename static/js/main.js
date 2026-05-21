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
    historyLabel: "History",
    historyEmpty: "No recent topics",
    historyClear: "Clear History",
    copySuccess: "📋 Copied to clipboard!",
    copyFail: "Copy failed – please try manually.",
    downloadSuccess: "📥 Notes downloaded!",
    backToTopLabel: "Back to top",
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
    historyLabel: "इतिहास",
    historyEmpty: "कोई हालिया विषय नहीं",
    historyClear: "इतिहास साफ़ करें",
    copySuccess: "📋 क्लिपबोर्ड पर कॉपी हुआ!",
    copyFail: "कॉपी विफल – कृपया मैन्युअल रूप से प्रयास करें।",
    downloadSuccess: "📥 नोट्स डाउनलोड हुए!",
    backToTopLabel: "ऊपर जाएँ",
  },
};

/* ---- State ---- */
let currentLang = "english";
let selectedFile = null;
const quizState = {};
const quizListeners = {};   // Bug fix: track per-container quiz click handlers

/* ---- Recent history (localStorage) ---- */
const HISTORY_KEY = "sh_history";
const MAX_HISTORY = 5;

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initDropzone();
  initLangToggle();
  initGenerateBtn();
  initUploadBtn();
  initExampleBtns();
  initDarkMode();
  initCharCounters();
  initResultActions();
  initHistoryDelegation();
  renderHistoryDropdown();
  checkDemoMode();
  initBackToTop();
  updateGenerateState();
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
  setText("historyLabel", t.historyLabel);
  setText("historyEmpty", t.historyEmpty);
  setText("subjectError", t.errorNoSubject);
  setText("topicError", t.errorNoTopic);

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

  // Back to top accessibility
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.setAttribute("aria-label", t.backToTopLabel);
    backToTop.title = t.backToTopLabel;
  }
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
  document.getElementById("fileMeta").textContent = `(${formatBytes(file.size)})`;
  document.getElementById("fileInfo").classList.remove("d-none");
  document.getElementById("uploadBtn").disabled = false;
}

function clearFile() {
  selectedFile = null;
  document.getElementById("fileInput").value = "";
  document.getElementById("fileInfo").classList.add("d-none");
  document.getElementById("fileMeta").textContent = "";
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
    const input = document.getElementById(id);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleGenerate();
    });
    input.addEventListener("input", () => {
      input.classList.remove("is-invalid");
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
      updateGenerateState();
    });
  });
  updateGenerateState();
}

function initExampleBtns() {
  document.querySelectorAll(".example-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("subjectInput").value = btn.dataset.subject;
      document.getElementById("topicInput").value = btn.dataset.topic;
      updateGenerateState();
    });
  });
}

async function handleGenerate() {
  const t = I18N[currentLang];
  const subject = document.getElementById("subjectInput").value.trim();
  const topic = document.getElementById("topicInput").value.trim();
  const language = document.getElementById("topicLanguage").value;

  if (!subject || !topic) {
    let errorMsg = "";
    if (!subject) {
      markInvalid("subjectInput");
      errorMsg = t.errorNoSubject;
    }
    if (!topic) {
      markInvalid("topicInput");
      if (!errorMsg) errorMsg = t.errorNoTopic;
    }
    if (errorMsg) showToast(errorMsg, "bg-danger");
    updateGenerateState();
    return;
  }

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
    addToHistory(subject, topic);
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
  if (loading) {
    btn.setAttribute("data-loading", "true");
  } else {
    btn.removeAttribute("data-loading");
  }
  spinner.classList.toggle("d-none", !loading);
  icon.classList.toggle("d-none", loading);
  text.textContent = loading ? t.generatingText : t.generateBtnText;
}

function updateGenerateState() {
  const subject = document.getElementById("subjectInput").value.trim();
  const topic = document.getElementById("topicInput").value.trim();
  const btn = document.getElementById("generateBtn");
  if (btn.hasAttribute("data-loading")) {
    btn.disabled = true;
    return;
  }
  btn.disabled = !subject || !topic;
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

  // Bug fix: remove any previously registered handler before adding a new one
  // to prevent duplicate event handling when results are regenerated
  const el = document.getElementById(containerId);
  if (quizListeners[containerId]) {
    el.removeEventListener("click", quizListeners[containerId]);
  }
  const handler = (e) => {
    const optEl = e.target.closest(".quiz-option");
    const submitBtn = e.target.closest("#quiz-submit-" + containerId);
    const nextBtn = e.target.closest("#quiz-next-" + containerId);
    const retryBtn = e.target.closest("#quiz-retry-" + containerId);

    if (optEl && !quizState[containerId].answered) selectOption(containerId, optEl);
    if (submitBtn) submitAnswer(containerId);
    if (nextBtn) nextQuestion(containerId);
    if (retryBtn) retryQuiz(containerId);
  };
  quizListeners[containerId] = handler;
  el.addEventListener("click", handler);
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

  // Robust answer matching: compare by leading letter (handles "A.", "A)", "A " variants)
  const answerLetter = (q.answer || "").trim().charAt(0).toUpperCase();
  function optMatchesAnswer(optText) {
    const first = (optText || "").trim().charAt(0).toUpperCase();
    return first === answerLetter;
  }

  state.answered = true;

  document.querySelectorAll(`#${containerId} .quiz-option`).forEach((el) => {
    const isSelected = el.dataset.opt === state.selected;
    const isCorrect = optMatchesAnswer(el.dataset.opt);

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
    const res = await fetch("/api/health");
    const json = await res.json();
    if (json.demo) addDemoBanner();
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

function markInvalid(id) {
  const input = document.getElementById(id);
  if (!input) return;
  let errorId = "";
  if (id === "subjectInput") {
    errorId = "subjectError";
  } else if (id === "topicInput") {
    errorId = "topicError";
  }
  input.classList.add("is-invalid");
  input.setAttribute("aria-invalid", "true");
  if (errorId) input.setAttribute("aria-describedby", errorId);
  if (typeof input.focus === "function") input.focus();
}

function formatBytes(bytes) {
  if (bytes === null || bytes === undefined) return "";
  if (bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;
  const maxUnitIndex = units.length - 1;
  while (size >= 1024 && unitIndex < maxUnitIndex) {
    size /= 1024;
    unitIndex += 1;
  }
  // Larger units or whole bytes don't need decimals; keep one decimal for small KB/MB values.
  const decimalPlaces = size >= 10 || unitIndex === 0 ? 0 : 1;
  return `${size.toFixed(decimalPlaces)} ${units[unitIndex]}`;
}

/* ---- Bind flashcards in upload results too ---- */
document.addEventListener("click", (e) => {
  const card = e.target.closest("#uploadResults .flashcard");
  if (card) card.classList.toggle("flipped");
});

/* ============================================================
   DARK MODE
   ============================================================ */
function initDarkMode() {
  const btn = document.getElementById("darkModeToggle");
  if (!btn) return;
  if (localStorage.getItem("darkMode") === "1") _applyDarkMode(true);
  btn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-bs-theme") === "dark";
    _applyDarkMode(!isDark);
  });
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  const toggle = () => btn.classList.toggle("show", window.scrollY > 400);
  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function _applyDarkMode(enable) {
  const btn = document.getElementById("darkModeToggle");
  if (enable) {
    document.documentElement.setAttribute("data-bs-theme", "dark");
    if (btn) btn.innerHTML = '<i class="bi bi-sun-fill"></i>';
    localStorage.setItem("darkMode", "1");
  } else {
    document.documentElement.removeAttribute("data-bs-theme");
    if (btn) btn.innerHTML = '<i class="bi bi-moon-fill"></i>';
    localStorage.setItem("darkMode", "0");
  }
}

/* ============================================================
   CHARACTER COUNTERS
   ============================================================ */
function initCharCounters() {
  const pairs = [
    ["subjectInput", "subjectCounter", 100],
    ["topicInput", "topicCounter", 100],
  ];
  pairs.forEach(([inputId, counterId, max]) => {
    const input = document.getElementById(inputId);
    const counter = document.getElementById(counterId);
    if (!input || !counter) return;
    input.addEventListener("input", () => {
      const len = input.value.length;
      counter.textContent = `${len}/${max}`;
      counter.classList.toggle("char-counter--warn", len > max * 0.85);
    });
  });
}

/* ============================================================
   RESULT ACTION BUTTONS (print, copy, download)
   ============================================================ */
function initResultActions() {
  const btn = (id, fn) => { const el = document.getElementById(id); if (el) el.addEventListener("click", fn); };

  btn("printTopicBtn",    () => window.print());
  btn("printUploadBtn",   () => window.print());

  btn("copyTopicBtn", async () => {
    const el = document.getElementById("topicNotes");
    const text = el ? el.innerText : "";
    await copyToClipboard(text);
  });

  btn("downloadTopicBtn", () => {
    const subject = (document.getElementById("subjectInput")?.value || "notes").trim();
    const topic   = (document.getElementById("topicInput")?.value  || "topic").trim();
    const el = document.getElementById("topicNotes");
    const text = el ? el.innerText : "";
    downloadText(text, `${subject}-${topic}-notes.txt`);
  });

  btn("downloadUploadBtn", () => {
    const el = document.getElementById("uploadInfographic");
    const text = el ? el.innerText : "";
    downloadText(text, "study-material-notes.txt");
  });
}

async function copyToClipboard(text) {
  const t = I18N[currentLang] || I18N.english;
  try {
    await navigator.clipboard.writeText(text);
    showToast(t.copySuccess, "bg-success");
  } catch (_) {
    showToast(t.copyFail, "bg-warning");
  }
}

function downloadText(text, filename) {
  const t = I18N[currentLang] || I18N.english;
  // Sanitize: allow only safe characters and prevent directory traversal
  const safe = filename
    .replace(/[^a-z0-9.\-_]/gi, "_")
    .replace(/\.{2,}/g, "_");
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = safe;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(t.downloadSuccess, "bg-success");
}

/* ============================================================
   RECENT HISTORY (localStorage)
   ============================================================ */
function getHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch (_) { return []; }
}

function addToHistory(subject, topic) {
  const history = getHistory().filter((h) => !(h.subject === subject && h.topic === topic));
  history.unshift({ subject, topic, ts: Date.now() });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  renderHistoryDropdown();
}

function renderHistoryDropdown() {
  const list = document.getElementById("historyList");
  if (!list) return;
  const t = I18N[currentLang] || I18N.english;
  const history = getHistory();
  if (!history.length) {
    list.innerHTML = `<li><span class="dropdown-item-text text-muted small py-2 px-3" id="historyEmpty">${t.historyEmpty}</span></li>`;
    return;
  }
  const items = history.map((h, i) =>
    `<li><a class="dropdown-item history-item" href="#" data-idx="${i}">
      <strong>${esc(h.subject)}</strong> &ndash; ${esc(h.topic)}
    </a></li>`
  ).join("");
  list.innerHTML = items +
    `<li><hr class="dropdown-divider"></li>
     <li><a class="dropdown-item text-danger small" href="#" id="clearHistoryBtn">
       <i class="bi bi-trash me-1"></i>${t.historyClear}
     </a></li>`;
}

function initHistoryDelegation() {
  document.addEventListener("click", (e) => {
    // Click on a history item → fill subject/topic and scroll to section
    const histItem = e.target.closest(".history-item");
    if (histItem) {
      e.preventDefault();
      const idx = parseInt(histItem.dataset.idx, 10);
      const history = getHistory();
      if (history[idx]) {
        document.getElementById("subjectInput").value = history[idx].subject;
        document.getElementById("topicInput").value   = history[idx].topic;
        document.getElementById("topicSection").scrollIntoView({ behavior: "smooth" });
      }
      // Close the Bootstrap dropdown
      const dd = document.getElementById("historyDropdown");
      if (dd) bootstrap.Dropdown.getOrCreateInstance(dd).hide();
      return;
    }

    // Click "Clear History"
    if (e.target.closest("#clearHistoryBtn")) {
      e.preventDefault();
      localStorage.removeItem(HISTORY_KEY);
      renderHistoryDropdown();
      const dd = document.getElementById("historyDropdown");
      if (dd) bootstrap.Dropdown.getOrCreateInstance(dd).hide();
    }
  });
}

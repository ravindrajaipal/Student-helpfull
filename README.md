# 🎓 Student Helper

A beautiful, fully-featured **Student Helper Web App** — built with plain HTML, CSS and JavaScript (no dependencies, no build step).

## ✨ Features

| Feature | Description |
|---------|-------------|
| **📊 GPA Calculator** | Add courses, pick letter grades (A+ → F) and credit hours; get your GPA instantly with colour-coded feedback. |
| **✅ To-Do List** | Add tasks with priority (High / Medium / Low) and due dates; filter, complete and delete tasks — all saved locally. |
| **⏱️ Pomodoro Timer** | Configurable focus / break durations and round count; auto-transitions between phases with a live progress bar and session log. |
| **📝 Quick Notes** | Create, edit and search sticky notes; auto-saved to the browser with colour-coded card accents. |
| **🔢 Unit Converter** | Convert Length, Mass, Temperature, Time and Speed across all common units. |
| **🌙 Dark / Light Mode** | One-click theme toggle — preference is remembered between visits. |
| **💬 Motivational Quotes** | A fresh study quote on load and on demand. |

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/ravindrajaipal/Student-helpfull.git
cd Student-helpfull

# Open directly in your browser — no server needed
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or just visit the **GitHub Pages** URL if it's enabled for this repo.

## 📁 Project Structure

```
Student-helpfull/
├── index.html   # Single-page app markup
├── style.css    # Responsive styles + dark-mode variables
├── app.js       # All interactive logic (vanilla JS)
└── README.md
```

## 🛠️ Customisation

- **Add more quotes** — append to the `quotes` array in `app.js`.
- **Change colours** — edit the CSS variables at the top of `style.css`.
- **Add subjects/grades** — extend the `gradeMap` / `gradeOptions` arrays in `app.js`.
- **Add converter categories** — add an entry to `converterData` in `app.js` and a `<button class="ctab">` in `index.html`.

## 📸 Screenshots

> Open `index.html` in a browser to see it in action.

## 📄 License

[MIT](LICENSE)

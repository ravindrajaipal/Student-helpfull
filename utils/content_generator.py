"""
Content generator using Google Gemini AI.
Falls back to demo content when GEMINI_API_KEY is not configured.
"""
import os
import json
import re

_GEMINI_AVAILABLE = False
_genai = None

try:
    import google.generativeai as genai  # type: ignore

    _api_key = os.environ.get("GEMINI_API_KEY", "")
    if _api_key:
        genai.configure(api_key=_api_key)
        _genai = genai
        _GEMINI_AVAILABLE = True
except Exception:
    pass


# ------------------------------------------------------------------
# Public API
# ------------------------------------------------------------------

def generate_from_topic(subject: str, topic: str, language: str = "english") -> dict:
    """Generate full study materials for a given subject and topic."""
    if _GEMINI_AVAILABLE:
        return _gemini_generate_topic(subject, topic, language)
    return _demo_topic_content(subject, topic, language)


def generate_from_material(text: str, language: str = "english") -> dict:
    """Generate study aids from uploaded material text."""
    if _GEMINI_AVAILABLE:
        return _gemini_generate_material(text, language)
    return _demo_material_content(language)


# ------------------------------------------------------------------
# Gemini AI generation
# ------------------------------------------------------------------

_TOPIC_PROMPT_EN = """
You are an expert educational content creator. Generate comprehensive study materials for:
Subject: {subject}
Topic: {topic}
Language: English

Return ONLY valid JSON with this exact structure (no markdown, no code fences):
{{
  "notes": {{
    "title": "...",
    "introduction": "...",
    "sections": [
      {{"heading": "...", "content": "...", "key_points": ["...", "..."]}}
    ]
  }},
  "revision_notes": {{
    "title": "...",
    "key_points": ["...", "..."],
    "important_formulas": ["...", "..."],
    "remember": "..."
  }},
  "flashcards": [
    {{"front": "Question or term", "back": "Answer or definition"}}
  ],
  "quiz": [
    {{
      "question": "...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "answer": "A",
      "explanation": "..."
    }}
  ],
  "mindmap": {{
    "central_topic": "...",
    "branches": [
      {{"label": "...", "sub_topics": ["...", "..."]}}
    ]
  }},
  "infographic": {{
    "title": "...",
    "sections": [
      {{"heading": "...", "points": ["...", "..."]}}
    ]
  }}
}}

Generate at least 6 flashcards and 5 quiz questions. Be thorough and educational.
"""

_TOPIC_PROMPT_HI = """
आप एक विशेषज्ञ शैक्षणिक सामग्री निर्माता हैं। निम्नलिखित के लिए व्यापक अध्ययन सामग्री बनाएं:
विषय: {subject}
टॉपिक: {topic}
भाषा: हिंदी (Hindi)

ONLY valid JSON return करें (no markdown, no code fences):
{{
  "notes": {{
    "title": "...",
    "introduction": "...",
    "sections": [
      {{"heading": "...", "content": "...", "key_points": ["...", "..."]}}
    ]
  }},
  "revision_notes": {{
    "title": "...",
    "key_points": ["...", "..."],
    "important_formulas": ["...", "..."],
    "remember": "..."
  }},
  "flashcards": [
    {{"front": "प्रश्न या शब्द", "back": "उत्तर या परिभाषा"}}
  ],
  "quiz": [
    {{
      "question": "...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "answer": "A",
      "explanation": "..."
    }}
  ],
  "mindmap": {{
    "central_topic": "...",
    "branches": [
      {{"label": "...", "sub_topics": ["...", "..."]}}
    ]
  }},
  "infographic": {{
    "title": "...",
    "sections": [
      {{"heading": "...", "points": ["...", "..."]}}
    ]
  }}
}}

कम से कम 6 फ्लैशकार्ड और 5 क्विज़ प्रश्न बनाएं।
"""

_MATERIAL_PROMPT_EN = """
You are an expert educational content creator. Analyze the following study material and generate study aids.

Material:
{text}

Language: English

Return ONLY valid JSON (no markdown, no code fences):
{{
  "infographic": {{
    "title": "...",
    "sections": [
      {{"heading": "...", "points": ["...", "..."]}}
    ]
  }},
  "quiz": [
    {{
      "question": "...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "answer": "A",
      "explanation": "..."
    }}
  ],
  "mindmap": {{
    "central_topic": "...",
    "branches": [
      {{"label": "...", "sub_topics": ["...", "..."]}}
    ]
  }}
}}

Generate at least 5 quiz questions based on the material.
"""

_MATERIAL_PROMPT_HI = """
आप एक विशेषज्ञ शैक्षणिक सामग्री निर्माता हैं। निम्नलिखित अध्ययन सामग्री का विश्लेषण करें और अध्ययन सहायक सामग्री बनाएं।

सामग्री:
{text}

भाषा: हिंदी (Hindi)

ONLY valid JSON return करें (no markdown, no code fences):
{{
  "infographic": {{
    "title": "...",
    "sections": [
      {{"heading": "...", "points": ["...", "..."]}}
    ]
  }},
  "quiz": [
    {{
      "question": "...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "answer": "A",
      "explanation": "..."
    }}
  ],
  "mindmap": {{
    "central_topic": "...",
    "branches": [
      {{"label": "...", "sub_topics": ["...", "..."]}}
    ]
  }}
}}

कम से कम 5 क्विज़ प्रश्न बनाएं।
"""


def _call_gemini(prompt: str) -> dict:
    model = _genai.GenerativeModel("gemini-1.5-flash")  # type: ignore
    response = model.generate_content(prompt)
    raw = response.text.strip()
    # Strip markdown code fences if present
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)
    return json.loads(raw)


def _gemini_generate_topic(subject: str, topic: str, language: str) -> dict:
    prompt_template = _TOPIC_PROMPT_HI if language == "hindi" else _TOPIC_PROMPT_EN
    prompt = prompt_template.format(subject=subject, topic=topic)
    try:
        return _call_gemini(prompt)
    except Exception:
        return _demo_topic_content(subject, topic, language)


def _gemini_generate_material(text: str, language: str) -> dict:
    # Truncate to avoid token limits
    truncated = text[:8000] if len(text) > 8000 else text
    prompt_template = _MATERIAL_PROMPT_HI if language == "hindi" else _MATERIAL_PROMPT_EN
    prompt = prompt_template.format(text=truncated)
    try:
        return _call_gemini(prompt)
    except Exception:
        return _demo_material_content(language)


# ------------------------------------------------------------------
# Demo content (used when Gemini API is not configured)
# ------------------------------------------------------------------

def _demo_topic_content(subject: str, topic: str, language: str) -> dict:
    if language == "hindi":
        return _demo_topic_hindi(subject, topic)
    return _demo_topic_english(subject, topic)


def _demo_topic_english(subject: str, topic: str) -> dict:
    return {
        "_demo": True,
        "notes": {
            "title": f"{topic} – {subject}",
            "introduction": (
                f"This is a comprehensive overview of {topic} in {subject}. "
                "Understanding this topic is essential for exam preparation as it forms the foundation "
                "of many advanced concepts."
            ),
            "sections": [
                {
                    "heading": "Definition & Overview",
                    "content": (
                        f"{topic} is a fundamental concept in {subject} that explains how key principles "
                        "interact and apply in real-world scenarios. It provides the theoretical basis "
                        "for solving problems in this domain."
                    ),
                    "key_points": [
                        f"{topic} is a core concept in {subject}",
                        "It has both theoretical and practical applications",
                        "Understanding it helps solve complex problems",
                        "First studied systematically in the 17th–20th century",
                    ],
                },
                {
                    "heading": "Key Principles",
                    "content": (
                        "The key principles governing this topic involve understanding the underlying "
                        "mechanisms, cause-effect relationships, and mathematical or logical frameworks."
                    ),
                    "key_points": [
                        "Principle 1: Foundation and basic definitions",
                        "Principle 2: Mathematical or logical formulation",
                        "Principle 3: Real-world applications and examples",
                        "Principle 4: Common misconceptions and corrections",
                    ],
                },
                {
                    "heading": "Applications & Examples",
                    "content": (
                        "Practical applications of this topic appear in everyday life, industry, "
                        "and advanced research. Recognising these applications reinforces understanding."
                    ),
                    "key_points": [
                        "Application in everyday life",
                        "Industrial and technological use",
                        "Connection to other topics in the subject",
                        "Problem-solving strategies",
                    ],
                },
            ],
        },
        "revision_notes": {
            "title": f"⚡ Quick Revision – {topic}",
            "key_points": [
                f"{topic} is a key concept in {subject}",
                "Memorise the definition and core formula",
                "Practice at least 10 problems of each type",
                "Connect with related topics for better retention",
                "Review common exam question patterns",
                "Make sure you can explain it in your own words",
            ],
            "important_formulas": [
                "F = ma  (Newton's Second Law – example)",
                "E = mc²  (Energy-Mass equivalence – example)",
            ],
            "remember": (
                "🧠 Memory Tip: Create a story or acronym linking the key points of this topic. "
                "Regular spaced repetition is the most effective way to retain this material."
            ),
        },
        "flashcards": [
            {"front": f"What is {topic}?", "back": f"{topic} is a fundamental concept in {subject} that forms the basis for advanced study in this domain."},
            {"front": f"Where does {topic} apply?", "back": "It applies in theoretical analysis, practical problem-solving, and real-world scenarios across multiple fields."},
            {"front": "What is the first step in solving problems related to this topic?", "back": "Identify the knowns and unknowns, select the appropriate principle, and apply the formula systematically."},
            {"front": "Name three key terms associated with this topic.", "back": "1. Principle / Law  2. Variable / Constant  3. Application / Example"},
            {"front": "How does this topic connect to others in the subject?", "back": "It provides the foundation on which advanced topics are built and interacts with parallel concepts in the syllabus."},
            {"front": "What is the most common exam question type for this topic?", "back": "Numerical problems, definition-based questions, and application-based scenario questions are most common."},
        ],
        "quiz": [
            {
                "question": f"Which of the following best describes {topic}?",
                "options": [
                    f"A. A core concept in {subject} that explains fundamental principles",
                    "B. An advanced topic studied only at postgraduate level",
                    "C. A concept unrelated to real-world applications",
                    "D. A purely theoretical idea with no practical use",
                ],
                "answer": "A",
                "explanation": f"{topic} is indeed a core concept in {subject} with both theoretical grounding and practical applications.",
            },
            {
                "question": "What is the first step when solving a problem based on this topic?",
                "options": [
                    "A. Write the answer directly",
                    "B. Identify knowns and unknowns, then choose the right principle",
                    "C. Memorise a random formula",
                    "D. Skip the question",
                ],
                "answer": "B",
                "explanation": "Always start by identifying what is given and what needs to be found before selecting the appropriate formula or principle.",
            },
            {
                "question": "Which skill is most important for mastering this topic?",
                "options": [
                    "A. Rote memorisation only",
                    "B. Conceptual understanding combined with practice",
                    "C. Reading the textbook once",
                    "D. Watching videos without practising",
                ],
                "answer": "B",
                "explanation": "Conceptual understanding supported by regular practice is the proven approach for mastering any academic topic.",
            },
            {
                "question": "How many times should you revise a topic before an exam?",
                "options": [
                    "A. Once is enough",
                    "B. Only on the day before the exam",
                    "C. At least 3–5 times using spaced repetition",
                    "D. Revision is not necessary",
                ],
                "answer": "C",
                "explanation": "Spaced repetition (revising 3–5 times at increasing intervals) is scientifically proven to improve long-term retention.",
            },
            {
                "question": "What type of questions are most common in exams for this topic?",
                "options": [
                    "A. Only essay questions",
                    "B. Numerical, definition-based, and application questions",
                    "C. Only True/False questions",
                    "D. Questions about unrelated subjects",
                ],
                "answer": "B",
                "explanation": "Exams typically test definitions, numerical problem-solving, and real-world application scenarios for most academic topics.",
            },
        ],
        "mindmap": {
            "central_topic": topic,
            "branches": [
                {"label": "Definition", "sub_topics": ["Core meaning", "Historical context", "Related terms"]},
                {"label": "Key Principles", "sub_topics": ["Principle 1", "Principle 2", "Mathematical form"]},
                {"label": "Applications", "sub_topics": ["Real-world use", "Industrial use", "Research"]},
                {"label": "Exam Tips", "sub_topics": ["Common questions", "Formula list", "Practice problems"]},
                {"label": "Related Topics", "sub_topics": ["Prerequisite concepts", "Advanced extensions", "Cross-subject links"]},
            ],
        },
        "infographic": {
            "title": f"📊 {topic} at a Glance",
            "sections": [
                {"heading": "🎯 What is it?", "points": [f"Core concept in {subject}", "Theoretical and practical importance", "Examined regularly in competitive exams"]},
                {"heading": "📐 Key Formulas", "points": ["Write the main formula here", "List any variants or special cases", "Units and dimensions"]},
                {"heading": "🔑 Must-Know Points", "points": ["Point 1 – definition", "Point 2 – application", "Point 3 – common mistake to avoid"]},
                {"heading": "📝 Exam Strategy", "points": ["Read the question carefully", "Identify given data", "Select the right approach", "Show working clearly"]},
            ],
        },
    }


def _demo_topic_hindi(subject: str, topic: str) -> dict:
    return {
        "_demo": True,
        "notes": {
            "title": f"{topic} – {subject}",
            "introduction": (
                f"{subject} में {topic} एक महत्वपूर्ण अवधारणा है। परीक्षा की तैयारी के लिए इस विषय को "
                "समझना अत्यंत आवश्यक है क्योंकि यह कई उन्नत अवधारणाओं की नींव बनाता है।"
            ),
            "sections": [
                {
                    "heading": "परिभाषा और परिचय",
                    "content": (
                        f"{topic} {subject} की एक मूलभूत अवधारणा है जो प्रमुख सिद्धांतों की व्याख्या करती है। "
                        "यह वास्तविक जीवन की समस्याओं को हल करने का सैद्धांतिक आधार प्रदान करती है।"
                    ),
                    "key_points": [
                        f"{topic}, {subject} की एक मूल अवधारणा है",
                        "इसके सैद्धांतिक और व्यावहारिक दोनों अनुप्रयोग हैं",
                        "यह जटिल समस्याओं को हल करने में मदद करती है",
                        "इसे 17वीं–20वीं शताब्दी में व्यवस्थित रूप से अध्ययन किया गया",
                    ],
                },
                {
                    "heading": "मुख्य सिद्धांत",
                    "content": (
                        "इस विषय के मूल सिद्धांतों को समझने के लिए अंतर्निहित तंत्र, "
                        "कारण-प्रभाव संबंध और गणितीय ढाँचे को जानना जरूरी है।"
                    ),
                    "key_points": [
                        "सिद्धांत 1: आधार और बुनियादी परिभाषाएँ",
                        "सिद्धांत 2: गणितीय या तार्किक सूत्रीकरण",
                        "सिद्धांत 3: वास्तविक जीवन के उदाहरण और अनुप्रयोग",
                        "सिद्धांत 4: सामान्य भ्रांतियाँ और उनका निराकरण",
                    ],
                },
                {
                    "heading": "अनुप्रयोग और उदाहरण",
                    "content": (
                        "इस विषय के व्यावहारिक अनुप्रयोग दैनिक जीवन, उद्योग और "
                        "उन्नत अनुसंधान में दिखाई देते हैं।"
                    ),
                    "key_points": [
                        "दैनिक जीवन में अनुप्रयोग",
                        "औद्योगिक और तकनीकी उपयोग",
                        "अन्य विषयों से संबंध",
                        "समस्या-समाधान की रणनीतियाँ",
                    ],
                },
            ],
        },
        "revision_notes": {
            "title": f"⚡ त्वरित पुनरावृत्ति – {topic}",
            "key_points": [
                f"{topic}, {subject} की एक प्रमुख अवधारणा है",
                "परिभाषा और मुख्य सूत्र याद करें",
                "प्रत्येक प्रकार के कम से कम 10 प्रश्न हल करें",
                "बेहतर समझ के लिए संबंधित विषयों से जोड़ें",
                "सामान्य परीक्षा प्रश्न-पैटर्न की समीक्षा करें",
                "सुनिश्चित करें कि आप इसे अपने शब्दों में समझा सकते हैं",
            ],
            "important_formulas": [
                "F = ma  (न्यूटन का दूसरा नियम – उदाहरण)",
                "E = mc²  (ऊर्जा-द्रव्यमान संबंध – उदाहरण)",
            ],
            "remember": (
                "🧠 याद रखने का तरीका: इस विषय के मुख्य बिंदुओं को एक कहानी या संक्षिप्त शब्द से जोड़ें। "
                "नियमित स्थान-दोहराव (spaced repetition) सामग्री को याद रखने का सबसे प्रभावी तरीका है।"
            ),
        },
        "flashcards": [
            {"front": f"{topic} क्या है?", "back": f"{topic}, {subject} की एक मूलभूत अवधारणा है जो उन्नत अध्ययन का आधार बनाती है।"},
            {"front": f"{topic} कहाँ लागू होती है?", "back": "यह सैद्धांतिक विश्लेषण, व्यावहारिक समस्या-समाधान और वास्तविक जीवन के परिदृश्यों में लागू होती है।"},
            {"front": "इस विषय से संबंधित समस्याओं को हल करने का पहला चरण क्या है?", "back": "ज्ञात और अज्ञात की पहचान करें, उचित सिद्धांत चुनें और सूत्र व्यवस्थित रूप से लागू करें।"},
            {"front": "इस विषय से जुड़े तीन प्रमुख शब्द बताइए।", "back": "1. सिद्धांत / नियम  2. चर / स्थिरांक  3. अनुप्रयोग / उदाहरण"},
            {"front": "यह विषय अन्य विषयों से कैसे जुड़ता है?", "back": "यह उन्नत विषयों का आधार प्रदान करता है और पाठ्यक्रम की समानांतर अवधारणाओं से जुड़ता है।"},
            {"front": "इस विषय के लिए परीक्षा में सबसे सामान्य प्रश्न-प्रकार क्या है?", "back": "संख्यात्मक, परिभाषा-आधारित और अनुप्रयोग-आधारित प्रश्न सबसे सामान्य हैं।"},
        ],
        "quiz": [
            {
                "question": f"निम्नलिखित में से कौन सा {topic} का सबसे अच्छा वर्णन करता है?",
                "options": [
                    f"A. {subject} की एक मूल अवधारणा जो मूलभूत सिद्धांतों की व्याख्या करती है",
                    "B. केवल स्नातकोत्तर स्तर पर पढ़ा जाने वाला विषय",
                    "C. वास्तविक जीवन से असंबंधित अवधारणा",
                    "D. केवल सैद्धांतिक विचार",
                ],
                "answer": "A",
                "explanation": f"{topic} वास्तव में {subject} की एक मूल अवधारणा है जिसके सैद्धांतिक और व्यावहारिक दोनों पहलू हैं।",
            },
            {
                "question": "इस विषय पर आधारित समस्या हल करते समय पहला कदम क्या होता है?",
                "options": [
                    "A. सीधे उत्तर लिख दें",
                    "B. ज्ञात और अज्ञात की पहचान करके सही सिद्धांत चुनें",
                    "C. कोई भी सूत्र याद कर लें",
                    "D. प्रश्न छोड़ दें",
                ],
                "answer": "B",
                "explanation": "उचित सूत्र या सिद्धांत चुनने से पहले हमेशा दिए गए डेटा और जो खोजना है उसकी पहचान करें।",
            },
            {
                "question": "इस विषय में महारत हासिल करने के लिए कौन सा कौशल सबसे महत्वपूर्ण है?",
                "options": [
                    "A. केवल रटना",
                    "B. अभ्यास के साथ वैचारिक समझ",
                    "C. पाठ्यपुस्तक को एक बार पढ़ना",
                    "D. बिना अभ्यास के वीडियो देखना",
                ],
                "answer": "B",
                "explanation": "नियमित अभ्यास के साथ वैचारिक समझ किसी भी विषय में महारत हासिल करने का सिद्ध तरीका है।",
            },
            {
                "question": "परीक्षा से पहले किसी विषय को कितनी बार दोहराना चाहिए?",
                "options": [
                    "A. एक बार काफी है",
                    "B. केवल परीक्षा के एक दिन पहले",
                    "C. स्थान-दोहराव (spaced repetition) के साथ कम से कम 3–5 बार",
                    "D. दोहराव की जरूरत नहीं",
                ],
                "answer": "C",
                "explanation": "स्थान-दोहराव (3–5 बार बढ़ते अंतराल पर) दीर्घकालिक स्मृति के लिए वैज्ञानिक रूप से सिद्ध है।",
            },
            {
                "question": "इस विषय में परीक्षा में सबसे सामान्य प्रश्न-प्रकार क्या है?",
                "options": [
                    "A. केवल निबंध प्रश्न",
                    "B. संख्यात्मक, परिभाषा-आधारित और अनुप्रयोग प्रश्न",
                    "C. केवल सही/गलत प्रश्न",
                    "D. असंबंधित विषयों के प्रश्न",
                ],
                "answer": "B",
                "explanation": "अधिकांश विषयों के लिए परीक्षाएँ परिभाषाएँ, संख्यात्मक समस्याएँ और वास्तविक जीवन अनुप्रयोग परिदृश्यों का परीक्षण करती हैं।",
            },
        ],
        "mindmap": {
            "central_topic": topic,
            "branches": [
                {"label": "परिभाषा", "sub_topics": ["मूल अर्थ", "ऐतिहासिक संदर्भ", "संबंधित शब्द"]},
                {"label": "मुख्य सिद्धांत", "sub_topics": ["सिद्धांत 1", "सिद्धांत 2", "गणितीय रूप"]},
                {"label": "अनुप्रयोग", "sub_topics": ["वास्तविक जीवन उपयोग", "औद्योगिक उपयोग", "अनुसंधान"]},
                {"label": "परीक्षा टिप्स", "sub_topics": ["सामान्य प्रश्न", "सूत्र सूची", "अभ्यास प्रश्न"]},
                {"label": "संबंधित विषय", "sub_topics": ["पूर्व अवधारणाएँ", "उन्नत विस्तार", "अंतर-विषय संबंध"]},
            ],
        },
        "infographic": {
            "title": f"📊 {topic} – एक नज़र में",
            "sections": [
                {"heading": "🎯 यह क्या है?", "points": [f"{subject} की मूल अवधारणा", "सैद्धांतिक और व्यावहारिक महत्व", "प्रतियोगी परीक्षाओं में नियमित रूप से पूछा जाता है"]},
                {"heading": "📐 मुख्य सूत्र", "points": ["यहाँ मुख्य सूत्र लिखें", "विशेष मामले या रूपांतर", "इकाइयाँ और आयाम"]},
                {"heading": "🔑 ज़रूरी बिंदु", "points": ["बिंदु 1 – परिभाषा", "बिंदु 2 – अनुप्रयोग", "बिंदु 3 – सामान्य गलती जो न करें"]},
                {"heading": "📝 परीक्षा रणनीति", "points": ["प्रश्न ध्यान से पढ़ें", "दिए गए डेटा की पहचान करें", "सही तरीका चुनें", "काम स्पष्ट रूप से दिखाएँ"]},
            ],
        },
    }


def _demo_material_content(language: str) -> dict:
    if language == "hindi":
        return {
            "_demo": True,
            "infographic": {
                "title": "📊 आपकी सामग्री का सारांश",
                "sections": [
                    {"heading": "🎯 मुख्य विषय", "points": ["अपलोड की गई सामग्री से प्रमुख अवधारणाएँ", "मुख्य विषयों की पहचान", "महत्वपूर्ण शब्दावली"]},
                    {"heading": "🔑 मुख्य बिंदु", "points": ["प्रमुख तथ्य और परिभाषाएँ", "महत्वपूर्ण सिद्धांत", "व्यावहारिक अनुप्रयोग"]},
                    {"heading": "📝 परीक्षा फ़ोकस", "points": ["अक्सर पूछे जाने वाले प्रश्न क्षेत्र", "याद करने योग्य महत्वपूर्ण बिंदु", "मुख्य समस्या-प्रकार"]},
                ],
            },
            "quiz": [
                {
                    "question": "अपलोड की गई सामग्री में मुख्य रूप से किस विषय का अध्ययन किया गया है?",
                    "options": ["A. मुख्य विषय A", "B. मुख्य विषय B", "C. मुख्य विषय C", "D. मुख्य विषय D"],
                    "answer": "A",
                    "explanation": "यह सामग्री के मुख्य विषय पर आधारित एक प्रदर्शन प्रश्न है। वास्तविक प्रश्न GEMINI_API_KEY के साथ AI द्वारा उत्पन्न होंगे।",
                },
                {
                    "question": "इस विषय की सबसे महत्वपूर्ण अवधारणा क्या है?",
                    "options": ["A. अवधारणा A", "B. अवधारणा B", "C. अवधारणा C", "D. अवधारणा D"],
                    "answer": "B",
                    "explanation": "सामग्री की सबसे महत्वपूर्ण अवधारणाओं को समझना परीक्षा में सफलता के लिए आवश्यक है।",
                },
                {
                    "question": "इस विषय का व्यावहारिक अनुप्रयोग क्या है?",
                    "options": ["A. अनुप्रयोग A", "B. अनुप्रयोग B", "C. अनुप्रयोग C", "D. अनुप्रयोग D"],
                    "answer": "C",
                    "explanation": "वास्तविक जीवन में अनुप्रयोग को समझना अवधारणाओं को याद रखने में मदद करता है।",
                },
            ],
            "mindmap": {
                "central_topic": "अपलोड की गई सामग्री",
                "branches": [
                    {"label": "मुख्य विषय", "sub_topics": ["विषय 1", "विषय 2", "विषय 3"]},
                    {"label": "प्रमुख अवधारणाएँ", "sub_topics": ["अवधारणा A", "अवधारणा B", "अवधारणा C"]},
                    {"label": "अनुप्रयोग", "sub_topics": ["अनुप्रयोग 1", "अनुप्रयोग 2"]},
                    {"label": "परीक्षा बिंदु", "sub_topics": ["याद करने योग्य बिंदु", "सूत्र", "उदाहरण"]},
                ],
            },
        }
    return {
        "_demo": True,
        "infographic": {
            "title": "📊 Your Material at a Glance",
            "sections": [
                {"heading": "🎯 Main Themes", "points": ["Key concepts from uploaded material", "Identification of core topics", "Important terminology"]},
                {"heading": "🔑 Key Points", "points": ["Main facts and definitions", "Important principles", "Practical applications"]},
                {"heading": "📝 Exam Focus", "points": ["Frequently tested areas", "Important points to memorise", "Key problem types"]},
            ],
        },
        "quiz": [
            {
                "question": "What is the primary subject covered in the uploaded material?",
                "options": ["A. Main Theme A", "B. Main Theme B", "C. Main Theme C", "D. Main Theme D"],
                "answer": "A",
                "explanation": "This is a demo question based on the material's main theme. Real questions will be AI-generated with a GEMINI_API_KEY.",
            },
            {
                "question": "What is the most important concept in this material?",
                "options": ["A. Concept A", "B. Concept B", "C. Concept C", "D. Concept D"],
                "answer": "B",
                "explanation": "Understanding the most important concepts in the material is essential for exam success.",
            },
            {
                "question": "What is a practical application of the topic in this material?",
                "options": ["A. Application A", "B. Application B", "C. Application C", "D. Application D"],
                "answer": "C",
                "explanation": "Understanding real-life applications helps reinforce conceptual understanding.",
            },
        ],
        "mindmap": {
            "central_topic": "Uploaded Material",
            "branches": [
                {"label": "Main Themes", "sub_topics": ["Theme 1", "Theme 2", "Theme 3"]},
                {"label": "Key Concepts", "sub_topics": ["Concept A", "Concept B", "Concept C"]},
                {"label": "Applications", "sub_topics": ["Application 1", "Application 2"]},
                {"label": "Exam Points", "sub_topics": ["Points to remember", "Formulas", "Examples"]},
            ],
        },
    }

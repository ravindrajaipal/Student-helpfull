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


# ---------------------------------------------------------------------------
# Public helpers
# ---------------------------------------------------------------------------

def generate_from_material(extracted_text: str, language: str = "english") -> dict:
    """
    Given extracted text from an uploaded file generate study materials.
    Returns a dict with keys: quiz, mindmap, infographic.
    """
    lang_label = "Hindi" if language == "hindi" else "English"
    if _GEMINI_AVAILABLE and extracted_text.strip():
        return _gemini_from_material(extracted_text, lang_label)
    return _demo_from_material(extracted_text, language)


def generate_from_topic(subject: str, topic: str, language: str = "english") -> dict:
    """
    Generate comprehensive study materials for a given subject/topic.
    Returns a dict with keys: notes, revision_notes, flashcards, quiz,
    mindmap, infographic.
    """
    lang_label = "Hindi" if language == "hindi" else "English"
    if _GEMINI_AVAILABLE:
        return _gemini_from_topic(subject, topic, lang_label)
    return _demo_from_topic(subject, topic, language)


# ---------------------------------------------------------------------------
# Gemini helpers
# ---------------------------------------------------------------------------

def _call_gemini(prompt: str) -> str:
    model = _genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text


def _safe_json(text: str, fallback: dict) -> dict:
    """Try to parse JSON from a Gemini response; return fallback on failure."""
    # Strip markdown code fences if present
    cleaned = re.sub(r"```(?:json)?", "", text).replace("```", "").strip()
    try:
        return json.loads(cleaned)
    except Exception:
        return fallback


def _gemini_from_material(text: str, lang: str) -> dict:
    snippet = text[:3000]
    prompt = f"""
You are an expert educator. Based on the following study material, generate structured study aids in {lang}.

Material:
{snippet}

Return a valid JSON object (no markdown fences) with exactly these keys:
{{
  "infographic": {{
    "title": "...",
    "sections": [{{"heading": "...", "points": ["...", "..."]}}]
  }},
  "quiz": [
    {{"question": "...", "options": ["A. ...", "B. ...", "C. ...", "D. ..."], "answer": "A", "explanation": "..."}}
  ],
  "mindmap": {{
    "central_topic": "...",
    "branches": [{{"label": "...", "sub_topics": ["...", "..."]}}]
  }}
}}

Provide at least 5 quiz questions and at least 4 infographic sections.
"""
    raw = _call_gemini(prompt)
    fallback = _demo_from_material(text, "english" if lang == "English" else "hindi")
    return _safe_json(raw, fallback)


def _gemini_from_topic(subject: str, topic: str, lang: str) -> dict:
    prompt = f"""
You are an expert educator and exam coach. Generate comprehensive study materials for:
Subject: {subject}
Topic: {topic}
Language: {lang}

Return a valid JSON object (no markdown fences) with exactly these keys:
{{
  "notes": {{
    "title": "...",
    "introduction": "...",
    "sections": [{{"heading": "...", "content": "...", "key_points": ["..."]}}]
  }},
  "revision_notes": {{
    "title": "...",
    "key_points": ["..."],
    "important_formulas": ["..."],
    "remember": "..."
  }},
  "flashcards": [
    {{"front": "...", "back": "..."}}
  ],
  "quiz": [
    {{"question": "...", "options": ["A. ...", "B. ...", "C. ...", "D. ..."], "answer": "A", "explanation": "..."}}
  ],
  "mindmap": {{
    "central_topic": "...",
    "branches": [{{"label": "...", "sub_topics": ["...", "..."]}}]
  }},
  "infographic": {{
    "title": "...",
    "sections": [{{"heading": "...", "points": ["...", "..."]}}]
  }}
}}

Provide at least 3 note sections, 10 flashcards, 8 quiz questions, 5 mindmap branches, and 4 infographic sections.
"""
    raw = _call_gemini(prompt)
    fallback = _demo_from_topic(subject, topic, "english" if lang == "English" else "hindi")
    return _safe_json(raw, fallback)


# ---------------------------------------------------------------------------
# Demo / mock content (used when API key is not set)
# ---------------------------------------------------------------------------

def _demo_from_material(text: str, language: str) -> dict:
    is_hindi = language == "hindi"

    if is_hindi:
        return {
            "infographic": {
                "title": "सामग्री का सारांश",
                "sections": [
                    {"heading": "मुख्य अवधारणाएं", "points": ["पहला मुख्य बिंदु", "दूसरा मुख्य बिंदु", "तीसरा मुख्य बिंदु"]},
                    {"heading": "महत्वपूर्ण तथ्य", "points": ["तथ्य 1: प्रमुख जानकारी", "तथ्य 2: विशेष विवरण", "तथ्य 3: अतिरिक्त जानकारी"]},
                    {"heading": "परिभाषाएं", "points": ["शब्द 1 की परिभाषा", "शब्द 2 की परिभाषा", "शब्द 3 की परिभाषा"]},
                    {"heading": "निष्कर्ष", "points": ["मुख्य निष्कर्ष", "व्यावहारिक उपयोग", "आगे की पढ़ाई"]},
                ],
            },
            "quiz": [
                {"question": "सामग्री का मुख्य विषय क्या है?", "options": ["A. विकल्प 1", "B. विकल्प 2", "C. विकल्प 3", "D. विकल्प 4"], "answer": "A", "explanation": "यह सामग्री का मुख्य विषय है।"},
                {"question": "इस सामग्री में कितने मुख्य भाग हैं?", "options": ["A. 2", "B. 3", "C. 4", "D. 5"], "answer": "C", "explanation": "सामग्री में 4 मुख्य भाग हैं।"},
                {"question": "सबसे महत्वपूर्ण अवधारणा कौन सी है?", "options": ["A. पहली", "B. दूसरी", "C. तीसरी", "D. चौथी"], "answer": "A", "explanation": "पहली अवधारणा सबसे महत्वपूर्ण है।"},
                {"question": "इस विषय का व्यावहारिक उपयोग क्या है?", "options": ["A. शिक्षा में", "B. उद्योग में", "C. दैनिक जीवन में", "D. उपरोक्त सभी"], "answer": "D", "explanation": "यह विषय सभी क्षेत्रों में उपयोगी है।"},
                {"question": "सामग्री के अनुसार सही कथन कौन सा है?", "options": ["A. कथन 1", "B. कथन 2", "C. कथन 3", "D. कथन 4"], "answer": "B", "explanation": "कथन 2 सामग्री के अनुसार सही है।"},
            ],
            "mindmap": {
                "central_topic": "अपलोड की गई सामग्री",
                "branches": [
                    {"label": "मुख्य विचार", "sub_topics": ["विचार 1", "विचार 2", "विचार 3"]},
                    {"label": "प्रमुख अवधारणाएं", "sub_topics": ["अवधारणा A", "अवधारणा B"]},
                    {"label": "उदाहरण", "sub_topics": ["उदाहरण 1", "उदाहरण 2"]},
                    {"label": "अनुप्रयोग", "sub_topics": ["उपयोग 1", "उपयोग 2", "उपयोग 3"]},
                ],
            },
        }
    else:
        return {
            "infographic": {
                "title": "Material Summary",
                "sections": [
                    {"heading": "Key Concepts", "points": ["First main concept from the material", "Second important idea", "Third core principle"]},
                    {"heading": "Important Facts", "points": ["Fact 1: Primary information", "Fact 2: Supporting detail", "Fact 3: Additional context"]},
                    {"heading": "Definitions", "points": ["Term 1: its meaning", "Term 2: its meaning", "Term 3: its meaning"]},
                    {"heading": "Conclusions", "points": ["Main takeaway", "Practical application", "Further study suggestions"]},
                ],
            },
            "quiz": [
                {"question": "What is the main topic of this material?", "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"], "answer": "A", "explanation": "This is the primary subject of the material."},
                {"question": "How many key sections does this material contain?", "options": ["A. 2", "B. 3", "C. 4", "D. 5"], "answer": "C", "explanation": "The material has 4 main sections."},
                {"question": "Which concept is most important?", "options": ["A. First", "B. Second", "C. Third", "D. Fourth"], "answer": "A", "explanation": "The first concept is foundational."},
                {"question": "What is a practical application of this topic?", "options": ["A. In education", "B. In industry", "C. In daily life", "D. All of the above"], "answer": "D", "explanation": "This topic is broadly applicable."},
                {"question": "Which statement is correct according to the material?", "options": ["A. Statement 1", "B. Statement 2", "C. Statement 3", "D. Statement 4"], "answer": "B", "explanation": "Statement 2 aligns with the material."},
            ],
            "mindmap": {
                "central_topic": "Uploaded Material",
                "branches": [
                    {"label": "Main Ideas", "sub_topics": ["Idea 1", "Idea 2", "Idea 3"]},
                    {"label": "Key Concepts", "sub_topics": ["Concept A", "Concept B"]},
                    {"label": "Examples", "sub_topics": ["Example 1", "Example 2"]},
                    {"label": "Applications", "sub_topics": ["Use 1", "Use 2", "Use 3"]},
                ],
            },
        }


def _demo_from_topic(subject: str, topic: str, language: str) -> dict:
    is_hindi = language == "hindi"
    subj = subject
    top = topic

    if is_hindi:
        return {
            "notes": {
                "title": f"{subj} – {top}",
                "introduction": f"{top} {subj} का एक महत्वपूर्ण अध्याय है। इसमें छात्रों को मूलभूत सिद्धांतों, व्यावहारिक अनुप्रयोगों और परीक्षा-उपयोगी जानकारी मिलेगी।",
                "sections": [
                    {
                        "heading": "परिचय एवं परिभाषा",
                        "content": f"{top} को {subj} के संदर्भ में व्यापक रूप से समझना आवश्यक है। यह विषय आधुनिक शिक्षा का आधार है।",
                        "key_points": ["मूल अवधारणा की परिभाषा", "ऐतिहासिक पृष्ठभूमि", "महत्व एवं उपयोगिता"],
                    },
                    {
                        "heading": "मुख्य सिद्धांत",
                        "content": f"इस अध्याय के मुख्य सिद्धांत आपस में जुड़े हुए हैं और {top} की संपूर्ण समझ के लिए जरूरी हैं।",
                        "key_points": ["सिद्धांत 1: मूल नियम", "सिद्धांत 2: उपनियम", "सिद्धांत 3: विशेष मामले"],
                    },
                    {
                        "heading": "व्यावहारिक अनुप्रयोग",
                        "content": f"{top} के व्यावहारिक पहलू दैनिक जीवन और उद्योग में अत्यंत महत्वपूर्ण हैं।",
                        "key_points": ["वास्तविक जीवन उदाहरण", "उद्योग में उपयोग", "भविष्य की संभावनाएं"],
                    },
                    {
                        "heading": "परीक्षा से संबंधित बिंदु",
                        "content": "परीक्षा की दृष्टि से निम्नलिखित बिंदु अत्यंत महत्वपूर्ण हैं।",
                        "key_points": ["अधिकतर पूछे जाने वाले प्रश्न", "महत्वपूर्ण सूत्र एवं नियम", "याद रखने योग्य तथ्य"],
                    },
                ],
            },
            "revision_notes": {
                "title": f"त्वरित पुनरावृत्ति – {top}",
                "key_points": [
                    f"✅ {top} की मूल परिभाषा याद करें",
                    "✅ सभी मुख्य सिद्धांत और उनके अपवाद",
                    "✅ महत्वपूर्ण सूत्र और उनके उपयोग",
                    "✅ पिछले वर्षों के प्रश्न पत्र हल करें",
                    "✅ अवधारणाओं के बीच संबंध समझें",
                    "✅ उदाहरण और आरेख बनाएं",
                    "✅ मुख्य शब्दावली की सूची बनाएं",
                ],
                "important_formulas": [
                    f"{top} का मूल सूत्र: A = B × C",
                    "विशेष स्थिति: जब B = 0 तो A = 0",
                    "व्युत्पन्न सूत्र: C = A / B",
                ],
                "remember": f"⚡ {top} परीक्षा में अक्सर आता है। इसकी परिभाषा, सूत्र और उदाहरण भलीभांति याद करें।",
            },
            "flashcards": [
                {"front": f"{top} क्या है?", "back": f"{top} {subj} की एक प्रमुख अवधारणा है जो मूलभूत सिद्धांतों पर आधारित है।"},
                {"front": f"{top} का मुख्य सिद्धांत कौन सा है?", "back": "मुख्य सिद्धांत यह है कि सभी घटनाएं एक निश्चित नियम के अनुसार होती हैं।"},
                {"front": f"{top} की खोज किसने की?", "back": "इस क्षेत्र के प्रमुख वैज्ञानिकों/विद्वानों ने इसे विकसित किया।"},
                {"front": "महत्वपूर्ण सूत्र क्या है?", "back": "A = B × C — यह मूल सूत्र है।"},
                {"front": f"{top} का व्यावहारिक उदाहरण दें।", "back": "दैनिक जीवन में यह अवधारणा कई रूपों में दिखती है जैसे…"},
                {"front": f"{top} और अन्य विषयों में क्या संबंध है?", "back": "यह विषय अन्य अध्यायों से जुड़ा है और उनकी नींव तैयार करता है।"},
                {"front": "मुख्य परिभाषा क्या है?", "back": f"{top}: [विशिष्ट परिभाषा यहाँ आएगी]"},
                {"front": "किन परिस्थितियों में यह लागू होता है?", "back": "यह सामान्यतः तब लागू होता है जब निर्धारित शर्तें पूरी हों।"},
                {"front": "अपवाद क्या हैं?", "back": "विशेष परिस्थितियों में यह नियम अलग तरह से कार्य करता है।"},
                {"front": f"परीक्षा में {top} से क्या पूछा जाता है?", "back": "परिभाषा, सूत्र, उदाहरण, और अनुप्रयोग से प्रश्न पूछे जाते हैं।"},
            ],
            "quiz": [
                {"question": f"{top} की सही परिभाषा कौन सी है?", "options": ["A. पहली परिभाषा", "B. दूसरी परिभाषा", "C. तीसरी परिभाषा", "D. चौथी परिभाषा"], "answer": "A", "explanation": "पहली परिभाषा सबसे सटीक है।"},
                {"question": f"{top} का मूल सूत्र क्या है?", "options": ["A. A = B + C", "B. A = B × C", "C. A = B / C", "D. A = B - C"], "answer": "B", "explanation": "A = B × C मूल सूत्र है।"},
                {"question": "निम्न में से कौन सा कथन सही है?", "options": ["A. कथन 1", "B. कथन 2", "C. कथन 3", "D. कथन 4"], "answer": "C", "explanation": "कथन 3 सैद्धांतिक रूप से सही है।"},
                {"question": f"{top} का व्यावहारिक अनुप्रयोग कहाँ होता है?", "options": ["A. चिकित्सा", "B. अभियांत्रिकी", "C. वाणिज्य", "D. सभी क्षेत्रों में"], "answer": "D", "explanation": "यह विषय सर्वव्यापी है।"},
                {"question": "कौन सा मुख्य सिद्धांत नहीं है?", "options": ["A. सिद्धांत A", "B. सिद्धांत B", "C. सिद्धांत X", "D. सिद्धांत C"], "answer": "C", "explanation": "सिद्धांत X इस विषय से संबंधित नहीं है।"},
                {"question": f"{subj} में {top} का क्या महत्व है?", "options": ["A. न्यूनतम", "B. मध्यम", "C. उच्च", "D. अत्यंत उच्च"], "answer": "D", "explanation": "यह विषय अत्यंत महत्वपूर्ण है।"},
                {"question": "अपवाद कब लागू होता है?", "options": ["A. हमेशा", "B. कभी नहीं", "C. विशेष परिस्थितियों में", "D. सामान्य परिस्थितियों में"], "answer": "C", "explanation": "अपवाद केवल विशेष स्थितियों में होता है।"},
                {"question": "इस विषय की खोज किस काल में हुई?", "options": ["A. प्राचीन काल", "B. मध्यकाल", "C. आधुनिक काल", "D. उत्तर-आधुनिक काल"], "answer": "C", "explanation": "आधुनिक काल में यह विकसित हुआ।"},
            ],
            "mindmap": {
                "central_topic": f"{top} ({subj})",
                "branches": [
                    {"label": "परिभाषा", "sub_topics": ["मूल परिभाषा", "विस्तारित परिभाषा", "तकनीकी परिभाषा"]},
                    {"label": "सिद्धांत", "sub_topics": ["मुख्य सिद्धांत", "उपसिद्धांत", "अपवाद"]},
                    {"label": "सूत्र", "sub_topics": ["मूल सूत्र", "व्युत्पन्न सूत्र", "विशेष सूत्र"]},
                    {"label": "उदाहरण", "sub_topics": ["सरल उदाहरण", "जटिल उदाहरण", "वास्तविक जीवन"]},
                    {"label": "अनुप्रयोग", "sub_topics": ["उद्योग", "शोध", "दैनिक जीवन"]},
                ],
            },
            "infographic": {
                "title": f"{top} – दृश्य सारांश",
                "sections": [
                    {"heading": "🎯 मूल अवधारणा", "points": [f"{top} की परिभाषा", "मुख्य उद्देश्य", "विषय का दायरा"]},
                    {"heading": "📌 मुख्य बिंदु", "points": ["बिंदु 1: मूल नियम", "बिंदु 2: विशेष मामले", "बिंदु 3: अपवाद"]},
                    {"heading": "🔢 महत्वपूर्ण सूत्र", "points": ["A = B × C", "C = A / B", "B ≠ 0"]},
                    {"heading": "💡 याद रखें", "points": ["परीक्षा टिप 1", "परीक्षा टिप 2", "सामान्य गलतियाँ"]},
                ],
            },
        }
    else:
        return {
            "notes": {
                "title": f"{subj} – {top}",
                "introduction": f"{top} is a fundamental chapter in {subj}. This section covers core principles, practical applications, and exam-relevant knowledge to help you master the topic.",
                "sections": [
                    {
                        "heading": "Introduction & Definition",
                        "content": f"{top} is broadly studied within the context of {subj}. Understanding its definition lays the foundation for all further concepts.",
                        "key_points": ["Core definition of the concept", "Historical background and development", "Significance and relevance"],
                    },
                    {
                        "heading": "Key Principles",
                        "content": f"The main principles of {top} are interconnected and essential for a complete understanding of the topic.",
                        "key_points": ["Principle 1: Fundamental rule", "Principle 2: Sub-rule and corollaries", "Principle 3: Special cases"],
                    },
                    {
                        "heading": "Practical Applications",
                        "content": f"The practical aspects of {top} are highly significant in daily life, industry, and research.",
                        "key_points": ["Real-world examples", "Industry use cases", "Future prospects"],
                    },
                    {
                        "heading": "Exam-Relevant Points",
                        "content": "The following points are frequently tested in examinations.",
                        "key_points": ["Commonly asked question types", "Important formulas and laws", "Facts worth memorizing"],
                    },
                ],
            },
            "revision_notes": {
                "title": f"Quick Revision – {top}",
                "key_points": [
                    f"✅ Recall the core definition of {top}",
                    "✅ All major principles and their exceptions",
                    "✅ Important formulas and their applications",
                    "✅ Solve previous years' question papers",
                    "✅ Understand relationships between concepts",
                    "✅ Draw examples and diagrams",
                    "✅ Prepare a glossary of key terms",
                ],
                "important_formulas": [
                    f"Basic formula for {top}: A = B × C",
                    "Special case: when B = 0, then A = 0",
                    "Derived formula: C = A / B",
                ],
                "remember": f"⚡ {top} frequently appears in exams. Thoroughly memorise its definition, formulas, and examples.",
            },
            "flashcards": [
                {"front": f"What is {top}?", "back": f"{top} is a key concept in {subj} based on fundamental principles."},
                {"front": f"What is the main principle of {top}?", "back": "The main principle states that all events follow a specific rule or law."},
                {"front": f"Who discovered / developed {top}?", "back": "Leading scientists/scholars in the field contributed to its development."},
                {"front": "What is the primary formula?", "back": "A = B × C — this is the fundamental formula."},
                {"front": f"Give a practical example of {top}.", "back": "In daily life this concept appears in many forms such as…"},
                {"front": f"How does {top} relate to other topics?", "back": "It connects to other chapters and forms the foundation for advanced concepts."},
                {"front": "State the core definition.", "back": f"{top}: [specific definition goes here]"},
                {"front": "Under what conditions does it apply?", "back": "It applies when the specified conditions are satisfied."},
                {"front": "What are the exceptions?", "back": "In special circumstances the rule behaves differently."},
                {"front": f"What is asked about {top} in exams?", "back": "Questions on definition, formulas, examples, and applications are common."},
            ],
            "quiz": [
                {"question": f"Which is the correct definition of {top}?", "options": ["A. First definition", "B. Second definition", "C. Third definition", "D. Fourth definition"], "answer": "A", "explanation": "The first definition is the most accurate."},
                {"question": f"What is the fundamental formula for {top}?", "options": ["A. A = B + C", "B. A = B × C", "C. A = B / C", "D. A = B - C"], "answer": "B", "explanation": "A = B × C is the basic formula."},
                {"question": "Which of the following statements is correct?", "options": ["A. Statement 1", "B. Statement 2", "C. Statement 3", "D. Statement 4"], "answer": "C", "explanation": "Statement 3 is theoretically correct."},
                {"question": f"Where is {top} practically applied?", "options": ["A. Medicine", "B. Engineering", "C. Commerce", "D. All fields"], "answer": "D", "explanation": "This topic is universally applicable."},
                {"question": "Which is NOT a main principle?", "options": ["A. Principle A", "B. Principle B", "C. Principle X", "D. Principle C"], "answer": "C", "explanation": "Principle X is unrelated to this topic."},
                {"question": f"What is the importance of {top} in {subj}?", "options": ["A. Minimal", "B. Moderate", "C. High", "D. Very high"], "answer": "D", "explanation": "This topic is extremely important."},
                {"question": "When does the exception apply?", "options": ["A. Always", "B. Never", "C. In special cases", "D. In general cases"], "answer": "C", "explanation": "Exceptions apply only in specific conditions."},
                {"question": "In which era was this topic developed?", "options": ["A. Ancient", "B. Medieval", "C. Modern", "D. Post-modern"], "answer": "C", "explanation": "It was developed in the modern era."},
            ],
            "mindmap": {
                "central_topic": f"{top} ({subj})",
                "branches": [
                    {"label": "Definition", "sub_topics": ["Core definition", "Extended definition", "Technical definition"]},
                    {"label": "Principles", "sub_topics": ["Main principle", "Sub-principles", "Exceptions"]},
                    {"label": "Formulas", "sub_topics": ["Basic formula", "Derived formula", "Special formula"]},
                    {"label": "Examples", "sub_topics": ["Simple example", "Complex example", "Real-world example"]},
                    {"label": "Applications", "sub_topics": ["Industry", "Research", "Daily life"]},
                ],
            },
            "infographic": {
                "title": f"{top} – Visual Summary",
                "sections": [
                    {"heading": "🎯 Core Concept", "points": [f"Definition of {top}", "Main objective", "Scope of the topic"]},
                    {"heading": "📌 Key Points", "points": ["Point 1: Fundamental rule", "Point 2: Special cases", "Point 3: Exceptions"]},
                    {"heading": "🔢 Important Formulas", "points": ["A = B × C", "C = A / B", "B ≠ 0"]},
                    {"heading": "💡 Remember", "points": ["Exam tip 1", "Exam tip 2", "Common mistakes to avoid"]},
                ],
            },
        }

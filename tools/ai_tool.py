# Simple AI helpers: extractive summarizer and keyword extractor
# This is plain Python and designed to run in Pyodide (browser).

import re
from collections import Counter, defaultdict

# Minimal stopword list (expand as needed)
STOPWORDS = {
    "the","and","is","in","it","of","to","a","that","this","for","on","with",
    "as","are","was","were","be","by","an","or","from","at","which","but","have","has"
}

def _tokenize_words(text):
    # lowercase and split on non-word characters
    words = re.findall(r"\w+", text.lower())
    return [w for w in words if w and w not in STOPWORDS]

def _split_sentences(text):
    # naive sentence splitter on ., !, ? and newlines
    parts = re.split(r'(?<=[.!?])\s+|\n+', text.strip())
    # filter empties
    return [p.strip() for p in parts if p.strip()]

def extract_keywords(text, n=10):
    """
    Return the top-n keywords (strings) by frequency (simple approach).
    """
    words = _tokenize_words(text)
    if not words:
        return []
    freqs = Counter(words)
    most = [w for w,_ in freqs.most_common(n)]
    return most

def summarize(text, max_sentences=3):
    """
    Simple extractive summarizer: score sentences by sum of word frequencies.
    Returns a string with up to max_sentences best sentences in original order.
    """
    sentences = _split_sentences(text)
    if not sentences:
        return ""

    # build word frequencies from full text
    words = _tokenize_words(text)
    if not words:
        # fallback: return first N sentences
        return " ".join(sentences[:max_sentences])

    freqs = Counter(words)
    # score sentences
    scores = []
    for i, s in enumerate(sentences):
        s_words = _tokenize_words(s)
        score = sum(freqs.get(w,0) for w in s_words)
        # normalize by length to prefer concise sentences
        norm = score / (len(s_words)+1)
        scores.append((i, norm, s))

    # pick top sentences by score
    scores.sort(key=lambda x: x[1], reverse=True)
    top = sorted(scores[:max_sentences], key=lambda x: x[0])  # preserve original order
    summary = " ".join(x[2] for x in top)
    return summary
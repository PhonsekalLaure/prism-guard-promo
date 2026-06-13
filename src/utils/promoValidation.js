export const BLOCKED_TEXT_PATTERNS = [
  {
    pattern: /\b(?:https?:\/\/|www\.|[a-z0-9-]+\.(?:com|net|org|io|ph|xyz|info|biz|ru|cn)\b)/i,
    message: 'Please use plain text only. Links, HTML, or code are not permitted in this field.',
  },
  {
    pattern: /<[^>]+>/,
    message: 'Please use plain text only. Links, HTML, or code are not permitted in this field.',
  },
  {
    pattern: /\b(?:script|iframe|object|embed|onerror|onload|javascript:|data:text\/html|base64|eval\(|document\.|window\.|<\?php)\b/i,
    message: 'Please use plain text only. Links, HTML, or code are not permitted in this field.',
  },
];

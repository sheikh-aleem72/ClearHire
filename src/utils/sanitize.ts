import escapeHtml from 'escape-html';

export const sanitizeText = (text: string): string => {
  return escapeHtml(text.trim());
};

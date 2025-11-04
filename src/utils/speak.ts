export function speak(text: string, lang: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.95;
  try {
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  } catch (e) { console.warn('Speech API error', e); }
}

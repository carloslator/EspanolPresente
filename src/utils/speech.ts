/**
 * Helper utility for Web Speech API text-to-speech in Spanish
 */
export function speakSpanish(text: string, rate: number = 0.9): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      resolve();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Spanish (Spain/Standard)
    utterance.rate = rate;

    // Try to select a natural Spanish voice if available
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(
      (v) => v.lang.startsWith('es') && (v.name.includes('Monica') || v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Paulina') || v.name.includes('Jorge'))
    ) || voices.find((v) => v.lang.startsWith('es'));

    if (esVoice) {
      utterance.voice = esVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeech(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

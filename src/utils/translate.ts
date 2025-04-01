export const translateText = async (text: string): Promise<string> => {
  const response = await fetch('https://libretranslate.de/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      source: 'fr',
      target: 'en',
      format: 'text',
    }),
  })

  const data = await response.json()
  return data.translatedText
}

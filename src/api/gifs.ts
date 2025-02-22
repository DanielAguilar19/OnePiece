const serviceUrl: string = 'https://api.giphy.com/v1/gifs'
const apiKey = 'l5kZb4tEAMxM2OE1GU3ghAfMRzhnQTGW'

export function GetGiphy(searchTag: string) {
  return fetch(`${serviceUrl}/search?api_key=${apiKey}&q=${searchTag}&limit=1`)
    .then((response) => response.json())
    .then((data) => {
      return data.data[0].images.original.url
    })
    .catch((error) => {
      console.error('Error:', error)
      return null
    })
}

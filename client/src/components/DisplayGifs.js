import Gif from './Gif'

export default function DisplayGifs({ gifs }) {

  return (
  <>
    <h2>Your search results:</h2>
    <ul>
      {gifs.map((gif) => (
        <Gif gifId={ gif.id } gifURL={ gif.embed_url } gifAlt={ gif.title } />
      ))}
    </ul>
  </>
  )
}

import Gif from './Gif'

export default function DisplayGifs({ gifs }) {

  return (
  <div className='display'>
    <ul className='gifList'>
      {gifs.map((gif) => (
        <Gif key={gif.id} gifURL={ gif.embed_url } gifAlt={ gif.title } />
      ))}
    </ul>
  </div>
  )
}

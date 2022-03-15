
export default function Gif({ gifURL, gifAlt }) {
  return (
    <li className="gif" ><iframe src={ gifURL } frameBorder="0" alt={ gifAlt } ></iframe></li>
  )
}


export default function Gif({ gifId, gifURL, gifAlt }) {
  return (
    <li><iframe key={ gifId } src={ gifURL } frameBorder="0" alt={ gifAlt } ></iframe></li>
  )
}

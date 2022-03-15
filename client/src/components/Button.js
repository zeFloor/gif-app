
export default function Button({ submitInput, input }) {
  return (
    <button onClick={submitInput} disabled={input.length < 1 ? true : false} >Search</button>
  )
}

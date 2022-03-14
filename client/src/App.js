import axios from 'axios'
import { useState } from 'react';

function App() {
  const [ inputText, setInputText ] = useState()
  console.log(inputText)

  const content = {
    method: "post",
    url: "http://localhost:5000/input",
    data: {
      text: `${inputText}`
    }
  }

  const submitInput = () => {
    axios(content)
      .catch(err => console.log(err))
  }

  return (
    <form>
      <input type="text" onChange={e => setInputText(e.target.value)} />
      <button onClick={submitInput}>Search</button>
    </form>
  )
}

export default App;

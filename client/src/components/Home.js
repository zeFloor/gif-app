import { useState } from 'react'
import axios from 'axios'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import DisplayGifs from './DisplayGifs'

export default function Home() {
  const navigate = useNavigate()

  const [ inputText, setInputText ] = useState('')
  const [ gifs, setGifs] = useState([])

  const content = {
    method: "post",
    url: "http://localhost:5000/input",
    data: {
      text: `${inputText}`
    }
  }

  const submitInput = () => {
    axios(content)
      .then(() => {
        axios('http://localhost:5000/search')
          .then( res => setGifs(res.data.data))
      })
      setInputText('')
  }

  return (
    <div className='home'>
      <h1>Humble GIF searcher</h1>
      <div className='searchBar'>
        <input type="text" value={ inputText } onChange={ e => setInputText(e.target.value) }/>
        <Button submitInput={ submitInput } input={ inputText } />
      </div>
      <DisplayGifs gifs={ gifs } />
    </div>
  )
}

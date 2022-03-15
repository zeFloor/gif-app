const express = require('express')
const cors = require('cors')
const axios = require('axios')
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1')
const { IamAuthenticator } = require('ibm-watson/auth')

const app = express()

app.use(cors())
app.use(express.json())

let searchText = ''

async function naturalLanguage(inputText){
  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
            
    version: '2021-08-01',
    authenticator: new IamAuthenticator({
      apikey: '4allRA2o-g2Hj3cdV9qiLvvWulR6AVLKfY-LruG3j2HQ',
    }),
    serviceUrl: 'https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/ac38bb67-dedb-46c9-b1c9-cca899b355f1',
  })
  
  let analyzeParams = {
    'text': `${inputText}`,
    'features': {
      'concepts': {
        'limit': 3
      }
    }
  }

  await naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
      console.log(analysisResults.result.concepts[0].text)
      searchText = analysisResults.result.concepts[0].text
    })
    .catch(err => {
        console.log("Error:", err)
    })    
}


//Watson natural language API
app.post('/input', (req, res) => {
    let inputText = req.body.text

    if(inputText.split(' ').length <= 4) {
        //If the phrase no longer than 3 words it will not be interprated by Watson Natural language API
        searchText = inputText
        res.send({ success: true })
    } else {
        naturalLanguage(inputText)
          .then(() => res.send({ success: true }))
        
    }  
})

app.get('/search', (req, res) => {
  axios(`http://api.giphy.com/v1/gifs/search?q=${searchText}&api_key=pk9hxKsV2UKy6zMd3jzPBaJsFBIUQsr4&limit=15`)
  .then(result => res.send(result.data))
})


app.listen(5000, console.log("Listening on port 5000"))


const express = require('express')
const cors = require('cors')
const axios = require('axios')
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1')
const { IamAuthenticator } = require('ibm-watson/auth')

const app = express()

app.use(cors())
app.use(express.json())

let inputText = ''
let searchText = ''

app.post('/input', (req, res) => {

    inputText = req.body.text
    if(inputText.split(' ').length < 3) {
        searchText = inputText
    } else {
        console.log(inputText)
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
          
          naturalLanguageUnderstanding.analyze(analyzeParams)
            .then(analysisResults => {
              console.log(analysisResults.result.concepts[0].text)
              searchText = analysisResults.result.concepts[0].text
            })
            .catch(err => {
                console.log("Error:", err)
            })       
    }
    
})




app.listen(5000, console.log("Listening on port 5000"))

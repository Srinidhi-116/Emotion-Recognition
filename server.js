const express = require("express")

const path = require("path")

const Sentiment = require('sentiment')
const port = 3000
const app = express()

const cors = require('cors')

app.use(cors())

app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'index.html'))
})

app.get('/emotion', (req, res) => {
    try {
        const sentiment = new Sentiment();
        const text = req.query.text;
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }
        console.log("Received text:", text);
        const result = sentiment.analyze(text);
        console.log("Result:", JSON.stringify(result));
        console.log("SCORE => "+result.score)

        // Extracting emotion from the result
        let emotion = 'neutral';
        if (result.score > 0) {
            emotion = 'positive';
        } else if (result.score < 0) {
            emotion = 'negative';
        }

        res.json({
            emotion: emotion,
            score: result.score,
            comparative: result.comparative,
            calculation: result.calculation
        });
    } catch (error) {
        console.error("Server error:", error);  // Log actual error
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port,function(){
    console.log("Listening on port : "+port) 
})



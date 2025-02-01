import express from 'express';
const app = express();

app.get('/' , (req,res) => {

    res.send('Server is ready');
});

    app.get('/api/jokes' , (re,res) =>{
        const jokes = [
        {
            id:1,
            title:'joke1',
            desc:'this is about joke 1'
        },
        {
            id:2,
            title: 'joke2',
            desc:'this is about joke 2'
        },
        {
            id:3,
            title: 'joke3',
            desc:'this is about joke 3'
        },

    ]
    res.send(jokes);
    })

const port = process.env.PORT || 5000 ;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
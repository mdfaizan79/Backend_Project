import express from 'express';

const app = express();


app.use(express.static('dist')) ; //middleware hai
// app.get('/',(req,res) => {
//     res.send('Server is ready');
// });


app.get('/api/jokes',(req,res) =>{
    const jokes = [
        {
            id : 1,
            title : 'Mixture',
            content : 'Haldiram'
        },

        {
            id : 2,
            title : 'Soap',
            content : 'Cinthol'
        },

        {
            id : 3,
            title : 'Detergents',
            content : 'Panki Saraf'
        },

    ]
    res.send(jokes);
});


const port =  4000 ;


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  });
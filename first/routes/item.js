//ye file sare item specific route ko store karega
const express = require('express')
const router = express.Router()

//Request ki kahani

//get
router.get('/' ,(req,res) => {
    res.send('GET ki request hai')
    
    // res.sendFile('./dummy.html',
    //   {root:__dirname}
    // );
})

//post

router.post('/items',(req,res) => {
    res.send('POST ki request hai')
})

//PUT

router.put('/items/:id',(req,res) => {
  res.send('PUT ki request')
})

//DELETE

router.delete('/items/:id',(req,res) => {
  res.send('Delete ki request')
})

module.exports = router
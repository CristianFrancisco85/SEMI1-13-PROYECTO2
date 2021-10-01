const dotenv = require('dotenv').config()
const router = require("express").Router()
const mysql = require('mysql')
const mydb = mysql.createPool(JSON.parse(process.env.MYSQL_CRED))


router.get("/",(req, res) => {
  res.sendStatus(200)
})


/**
  Recibe:
  {
    "username":"cristianfrancisco85",
  }

  Retorna:
  {"ERROR":err.name} |
  {
    "OK": {
    "imageUrl": "file/.....",
  }
*/
router.post('/imageProfile',handleLogin = async (req,res) => {
    if(req.body.username){
        mydb.query('SELECT image FROM user WHERE username=?',[req.body.username],(err,result)=>{
            if(err){
                res.json({"ERROR":err})
                return
            }
            if(result[0]==undefined){
                res.json({"ERROR":'Username Not Exist'})
                return
            }
            res.send({"OK":result[0].image})
        })
    }
    else{
        res.json({"ERROR":'Username Not Exist'})
    }
    

})


module.exports = router;
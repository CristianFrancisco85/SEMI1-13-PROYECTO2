const dotenv = require('dotenv').config()
const router = require("express").Router()
const mysql = require('mysql')
const mydb = mysql.createPool(JSON.parse(process.env.MYSQL_CRED))
const AWS = require('aws-sdk')
const uuid = require('uuid');
const S3 = new AWS.S3(JSON.parse(process.env.S3_CRED))
const Rekognition = new AWS.Rekognition(JSON.parse(process.env.REK_CRED))
const Translate = new AWS.Translate(JSON.parse(process.env.TRANSLATE_CRED))

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


/**
  Recibe:
  {
    "username":"cristianfrancisco85",
  * "textContent":"Esta es mi comentario",
  * "image64":"base64code"
  }

  Retorna:
  {
    "OK": "SUCCESS" | "ERROR":err.name
  } 
  }
*/
router.post('/makePublication',handleLogin = async (req,res) => {

    let fileName = "publicationImages/"+req.body.username+uuid.v4()+".png"
    let buffer = new Buffer.from(req.body.image64, 'base64')
    const params = {
        Bucket: "semi1p2-13",
        Key: fileName,
        Body: buffer,
        ContentType: "image",
        ACL: 'public-read'
    }
    S3.upload(params,(errS3,resS3)=>{
        if(errS3){
            res.json({"ERROR":errS3})
            return
        }
        if(req.body.username){

            let rekParams = {
                Image:{
                    S3Object: {
                        Bucket: "semi1p2-13", 
                        Name: fileName
                    }
                },
                MaxLabels: 25
            }
            let labelsArray=[]
            
            Rekognition.detectLabels(rekParams, function(errRek, data) {
                if (errRek) {
                    res.json({"ERROR":errRek})
                    return
                } 
                else {
                    data.Labels.forEach(label => {
                        labelsArray.push(label.Name)
                    })
                    mydb.query('INSERT INTO publication(user_iduser,image,comentario,etiquetas,fecha) VALUES((SELECT iduser FROM user WHERE username=?),?,?,?,(select now()))'
                    ,[req.body.username,fileName,req.body.textContent,labelsArray.toString()],(err,result)=>{
                        if(err){
                            res.json({"ERROR":err})
                            return
                        }
                        res.send({"OK":'Publicacion Hecha'})
                    })
                }
            })
        }
        else{
            res.json({"ERROR":'Username Not Exist'})
        }
    })

    
})

/**
  Recibe:
  {
    "username":"cristianfrancisco85",
  }

  Retorna:
  {
    "OK": "SUCCESS" | "ERROR":err.name
  } 
  }
*/
router.post('/getPersons',handleLogin = async (req,res) => {

    mydb.query('SELECT username,image FROM user WHERE username!=? AND (idUser,(SELECT idUser FROM user WHERE username=?)) NOT IN (SELECT friend1,friend2 FROM friends)AND (idUser,(SELECT idUser FROM user WHERE username=?)) NOT IN (SELECT friend2,friend1 FROM friends);'
    ,[req.body.username,req.body.username,req.body.username],(err,result)=>{
        if(err){
            res.json({"ERROR":err.name})
            return
        }   
        res.json({"OK":result})
    })

})


/**
  Recibe:
  {
    "username":"cristianfrancisco85",
    "friend":"guillermoOC"
  }

  Retorna:
  {
    "OK": "SUCCESS" | "ERROR":err.name
  } 
  }
*/
router.post('/friendRequest',handleLogin = async (req,res) => {
    mydb.query('INSERT INTO friends(friend1,friend2,status) VALUES((SELECT iduser FROM user WHERE username=?),(SELECT iduser FROM user WHERE username=?),?)'
    ,[req.body.username,req.body.friend,0],(err,result)=>{
        if(err){
            res.json({"ERROR":err})
            return
        }   
        res.json({"OK":result})
    })
})

/**
  Recibe:
  {
    "username":"cristianfrancisco85",
  }

  Retorna:
  {
    "OK": [users] | "ERROR":err.name
  } 
  }
*/
router.post('/getfriendRequests',handleLogin = async (req,res) => {
    mydb.query('SELECT username,image FROM user WHERE (idUser,(SELECT idUser FROM user WHERE username=?)) IN (SELECT friend1,friend2 FROM friends WHERE status=0);'
    ,[req.body.username],(err,result)=>{
        if(err){
            res.json({"ERROR":err})
            return
        }   
        res.json({"OK":result})
    })
})

/**
  Recibe:
  {
    "username":"cristianfrancisco85",
    "friend":"guillermoOC"
  }

  Retorna:
  {
    "OK": 'SUCCESS' | "ERROR":err.name
  } 
  }
*/
router.post('/acceptFriendRequest',handleLogin = async (req,res) => {
    mydb.query('UPDATE friends SET status=1 WHERE (friend1,friend2)=((SELECT idUser FROM user WHERE username = ?),(SELECT idUser FROM user WHERE username = ?))'
    ,[req.body.friend,req.body.username],(err,result)=>{
        if(err){
            res.json({"ERROR":err})
            return
        }   
        res.json({"OK":result})
    })
})

/**
  Recibe:
  {
    "username":"cristianfrancisco85",
    "friend":"guillermoOC"
  }

  Retorna:
  {
    "OK": 'SUCCESS' | "ERROR":err.name
  } 
  }
*/
router.post('/rejectFriendRequest',handleLogin = async (req,res) => {
  mydb.query('DELETE FROM friends WHERE (friend1,friend2)=((SELECT idUser FROM user WHERE username = ?),(SELECT idUser FROM user WHERE username = ?))'
  ,[req.body.friend,req.body.username],(err,result)=>{
    if(err){
      res.json({"ERROR":err})
      return
    }   
    res.json({"OK":result})
  })
})

/**
  Recibe:
  {
    "username":"cristianfrancisco85"
  }

  Retorna:
  {
    "OK": [publicaciones] | "ERROR":err.name
  } 
  }
*/
router.post('/getPublications',handleLogin = async (req,res) => {
  mydb.query('CALL GetPublications(?)'
  ,[req.body.username],(err,result)=>{
    if(err){
      res.json({"ERROR":err})
      return
    } 
    res.json({"OK":result[0]})
  })
})

/**
  Recibe:
  {
    "text":"Texto en otro idioma"
  }

  Retorna:
  {
    "OK": "Texto en Español"| "ERROR":err.name
  } 
  }
*/
router.post('/translatePublication',handleLogin = async (req,res) => {

  let params = {
    SourceLanguageCode: 'auto',
    TargetLanguageCode: 'es',
    Text: req.body.text
  }
  
  Translate.translateText(params, function (err, data) {
    if (err) {
      res.send({ "ERROR": err.name })
    } 
    else {
      res.send({ "OK": data })
    }
  })

})


/**
  Recibe:
  {
    "username1":"cristianfrancisco85"
    "username2":"guillermoOC"
  }

  Retorna:
  {
    "OK": 0|1 | "ERROR":err.name
  } 
  }
*/
router.post('/areFriends',handleLogin = async (req,res) => {
  mydb.query('SELECT areFriends(?,?) AS RESULT'
  ,[req.body.username1,req.body.username2],(err,result)=>{
    if(err){
      res.json({"ERROR":err})
      return
    } 
    res.json({"OK":result[0]})
  })
})



module.exports = router;
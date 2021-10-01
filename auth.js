const dotenv = require('dotenv').config()
const router = require("express").Router()
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const crypto = require('crypto')
const mysql = require('mysql')
const AWS = require('aws-sdk')
const uuid = require('uuid');


const CognitoAWS = new AmazonCognitoIdentity.CognitoUserPool(JSON.parse(process.env.COGNITO_CRED))
const S3 = new AWS.S3(JSON.parse(process.env.S3_CRED))
const Rekognition = new AWS.Rekognition(JSON.parse(process.env.REK_CRED))
const mydb = mysql.createPool(JSON.parse(process.env.MYSQL_CRED))


router.get("/",(req, res) => {
  res.sendStatus(200)
})

/**
  Recibe:
  {
    "username":"cristianfrancisco85",
    "name":"Cristian Meoño",
    "email":"haxocas749@ergowiki.com",
    "password":"12345678",
    "botmode":"0|1"
    "image64":"base64code"
  }

  Retorna:
  {"ERROR":err.name} |
  {
    "OK": {
    "username": "cristian2",
    "hash": "7371bfb4d38d7e58d1584569a1eccb9c96298ec585520a96663527cf797700e4"}
  }
*/
router.post('/signUp',handleLogin = async (req,res) => {

  let attributelist = []

  attributelist.push(new AmazonCognitoIdentity.CognitoUserAttribute({
    Name: 'name',
    Value: req.body.name,
  }))

  attributelist.push(new AmazonCognitoIdentity.CognitoUserAttribute({
    Name: 'email',
    Value: req.body.email,
  }))

  attributelist.push(new AmazonCognitoIdentity.CognitoUserAttribute({
    Name: 'custom:botmode',
    Value: req.body.botmode,
  }))

  let hash = crypto.createHash('sha256').update(req.body.password+process.env.SALT).digest('hex')

  let fileName = "profileImages/"+req.body.username+uuid.v4()+".png"
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
      res.json({"ERROR":"S3:"+errS3})
      return
    }
    mydb.query('INSERT INTO user(username,image,hash) VALUES(?,?,?);',[req.body.username,fileName,hash],(errSQL,resSQL)=>{
      if(errSQL){
        res.json({"ERROR":"SQL:"+errSQL})
        return
      }
      CognitoAWS.signUp(req.body.username,hash,attributelist,null, async (errCog, resCog) => {
        if (errCog) {
          res.json({"ERROR":"Cognito:"+errCog.name})
          return
        }
        res.json({"OK":{"username":resCog.user.username,hash}})
      })
    })
  })
})

/**
  Recibe:
  {
   "username":"cristianfrancisco8",
   "password":"12345678" | "hash":"sha256"
  }

  Retorna:
  {"ERROR":err.name} |
  {
    "OK": {
    "sub": "0c97bab2-d8f4-4cf1-afa4-02266f442fa6",
    "email_verified": "false",
    "custom:botmode": "0",
    "name": "Cristian Meoño",
    "email": "pigahi7068@ergowiki.com"}
  }
*/
router.post('/signIn',handleLogin = (req,res) => {
  let hash = req.body.hash || crypto.createHash('sha256').update(req.body.password+process.env.SALT).digest('hex')

  let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: req.body.username,
      Password: hash
  })
  let cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: req.body.username,
    Pool: CognitoAWS,
  })
  cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');

  cognitoUser.authenticateUser(authenticationDetails,{
      onSuccess: (result) => {
        cognitoUser.getUserAttributes(function(err, result) {
          if (err) {
            res.json({"ERROR":err.name})
            return
          }
          let userData = {}
          result.forEach(element => {
            userData[element.getName()]=element.getValue()
          })
          res.json({"OK":userData})
        })
      },
      onFailure: (err) => {
        res.json({"ERROR":err.name})
      }
  })

})

/**
  Recibe:
  {
    "username":"cristianfrancisco85",
  * "name":"Cristian Meoño",
  * "email":"haxocas749@ergowiki.com",
    "password":"12345678" | "hash":"sha256"
  * "newPassword":"12345678",
  * "botmode":"0|1"
  * "image64":"base64code"
  }

  Retorna:
  {
    "resAttributes": {
      "OK": "SUCCESS" | "ERROR":err.name
    },
    "resPassword": {
      "OK": "SUCCESS" | "ERROR":err.name
    }
    "resProfileImage": {
      "OK": "SUCCESS" | "ERROR":err.name
    }
    
  }
*/
router.post('/update',handleLogin = async (req,res) => {

  let attributelist = []

  if(req.body.name) attributelist.push(new AmazonCognitoIdentity.CognitoUserAttribute({
    Name: 'name',
    Value: req.body.name,
  }))

  if(req.body.email) attributelist.push(new AmazonCognitoIdentity.CognitoUserAttribute({
    Name: 'email',
    Value: req.body.email,
  }))

  if(req.body.botmode) attributelist.push(new AmazonCognitoIdentity.CognitoUserAttribute({
    Name: 'custom:botmode',
    Value: req.body.botmode,
  }))
  
  let hash = req.body.hash || crypto.createHash('sha256').update(req.body.password+process.env.SALT).digest('hex')
  let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: req.body.username,
      Password: hash
  })

  let userData = {
    Username: req.body.username,
    Pool: CognitoAWS,
  }
  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
  cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH')

  let verify = await new Promise ((resolve, _) => {
    cognitoUser.authenticateUser(authenticationDetails,{
      onSuccess: (result) => {
        resolve(true)    
      },
      onFailure: (err) => {
        resolve(false)
      }
    })
  })
  if(!verify){
    res.send({"ERROR":'Bad Password'})
    return
  }

  let resAttributes
  if(attributelist.length>0){
    resAttributes = await new Promise ((resolve, _) => {
      cognitoUser.updateAttributes(attributelist, (err, result) => {
        if (err) {
          resolve({"ERROR":err.name})
        } 
        else {
          resolve({"OK":result})
        }
      }) 
    })
  }

  let resPassword
  if(req.body.newPassword){
    resPassword = await new Promise ((resolve, _) => {
      let newHash = crypto.createHash('sha256').update(req.body.newPassword+process.env.SALT).digest('hex')
      cognitoUser.changePassword(hash,newHash,(err, result) => {
        if (err) {
          resolve({"ERROR":err.name})
        } 
        else {
          resolve({"OK":result})
        }
      })
    })
  }

  let resProfileImage
  if(req.body.image64){
    resProfileImage = await new Promise((resolve,_)=>{
      
      let fileName = "profileImages/"+req.body.username+uuid.v4()+".png"
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
          resolve({"ERROR":"S3:"+errS3})
          return
        }
        mydb.query('SELECT image FROM user WHERE username=?',[req.body.username],(errSQL,result)=>{
          if(errSQL){
            resolve({"ERROR":"SQL:"+errSQL})
            return
          }
          S3.deleteObject({Bucket: "semi1p2-13",Key: result[0].image },(errS3,resS3) =>{
            if(errS3){
              resolve({"ERROR":"S3:"+errS3})
              return
            }
            mydb.query('UPDATE user SET image=? WHERE username = ?;',[fileName,req.body.username,],(errSQL,resSQL)=>{
              if(errSQL){
                resolve({"ERROR":"SQL:"+errSQL})
                return
              }
              resolve({"OK":resSQL})
            })
          })
        })
      })

    })
  }

  res.json({resAttributes,resPassword,resProfileImage})



})

/**
  Recibe:
  {
    "username":"cristianfrancisco85",
    "image64":"base64code"
  }

  Retorna:
  {
    "resAttributes": {
      "OK": "SUCCESS" | "ERROR":err.name
    },    
  }
*/

router.post('/faceid',handleLogin = async (req,res) => {

  let userData =  await new Promise((resolve,_)=>{
    mydb.query('SELECT * FROM user WHERE username =?',[req.body.username],(err,result)=>{
      if(err||result.length==0){
        resolve(false)
        return
      }
      resolve(result[0])   
    })
  })
  if(userData==false){
    res.json({"ERROR":'Usuario no existe'})
    return
  }
  let params = { 
    SourceImage: {
      S3Object: {
        Bucket: "semi1p2-13", 
        Name: userData.image
      }    
    }, 
    TargetImage: {
      Bytes: Buffer.from(req.body.image64,'base64')    
    },
    SimilarityThreshold: '80'
  }

  Rekognition.compareFaces(params, function(err, data) {
    if (err) {
      res.json({"ERROR": err})
    } 
    else {
      console.log(data)   
      res.json({Comparacion: data.FaceMatches})     
    }
  });
  

})


module.exports = router;
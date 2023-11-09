import fs from 'fs/promises';
const port = process.env.PORT || 8000;
import express from 'express'
const app = express();

app.use(express.json());

const PET_JSON_URL = "../pets.json"

//Check Input
function checkInput(req, res, next){
  const {age, kind, name} = req.body
  if (parseInt(age) && kind && name){
    req.pet = {age: parseInt(age), kind, name}
    next()
  }else{
    res.status(400).json({error:"Invald Input"})
  }
}

app.use((req, res, next) => {
    const url = req.url;
    if(!url.includes('/pets')) {
        next({message: 'Not found', status: 404})
    } else {
        next()
    }
})

//GET ALL
app.get('/pets', (req,res,next)=>{
  fs.readFile(PET_JSON_URL, "utf8")
    .then(data=>{
      const pets = JSON.parse(data);
      res.status(200).json(pets)
    })
    .catch(err=>{
      next(err)
    }) 
})
//ADD 1
app.post('/pets',checkInput, (req,res,next)=>{
  fs.readFile(PET_JSON_URL, "utf8")
    .then(data=>{
      const pets = JSON.parse(data)
      pets.push(req.pet)
      return fs.writeFile(PET_JSON_URL, JSON.stringify(pets))
    })
    .then(()=>{
      res.status(201).json(req.pet)
    })
    .catch(err=>{
      next(err)
    })
})
//GET 1
app.get('/pets/:id', (req,res,next)=>{
  const index = req.params.id
  fs.readFile(PET_JSON_URL, "utf8")
    .then(data=>{
      const pets = JSON.parse(data)
      pets[parseInt(index)]? res.status(200).send(pets[parseInt(index)]) : res.status(400).json({error:"Invald Input"})
    })
    .catch(err=>{
      next(err)
    })
})
//UPDATE 1
app.put('/pets/:id',checkInput, (req,res,next)=>{
  const index = req.params.id
  fs.readFile(PET_JSON_URL, "utf8")
    .then(data=>{
      const pets = JSON.parse(data)
      if(pets[parseInt(index)]){
        pets[parseInt(index)] = req.pet
        return fs.writeFile(PET_JSON_URL, JSON.stringify(pets))
      }
      else{
        res.status(400).json({error:"Invald Input"})
      }
    })
    .then(()=>{
      res.status(201).json(req.pet)
    })
    .catch(err=>{
      next(err)
    })
})
//DELETE 1
app.delete('/pets/:id', (req,res,next)=>{
  const index = req.params.id
  fs.readFile(PET_JSON_URL, "utf8")
    .then(data=>{
      const pets = JSON.parse(data)
      if(pets[parseInt(index)]){
        req.pet = pets[parseInt(index)]
        delete pets[parseInt(index)] 
        return fs.writeFile(PET_JSON_URL, JSON.stringify(pets))
      }
      else{
        res.status(400).json({error:"Invald Input"})
      }
    })
    .then(()=>{
      res.status(204).json(req.pet)
    })
    .catch(err=>{
      next(err)
    })
})
//CATCH ALL
app.use((req, res)=>{
  res.status(404).json({error: "Page Not Found"})
})
//INTERAL ERROR
app.use((err, req, res)=>{
  res.status(500).json({error: "Internal Error"})
})
//PORT
app.listen(port, ()=>{
  console.log("Server Running on Port:", port)
})

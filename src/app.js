const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url , techs } = request.body;
  const repositorie = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repositorie);
  response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title,  techs } = request.body;
  const index = repositories.map(repo => repo.id).indexOf(id);
  if(index<0) return response.status(400).send();
  if(url || title || techs) {
    url ? repositories[index].url = url : repositories
    title ? repositories[index].title = title : repositories
    techs ? repositories[index].techs = techs : repositories
  }
  return response.json(repositories[index]);    
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const index = repositories.map(repo => repo.id).indexOf(id);
  if(index<0){
    response.status(400).send();
  } else{
    repositories.splice(index,1);
    response.status(204).send();
  }
  
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const index = repositories.map(repo => repo.id).indexOf(id);
  if(index<0){
    response.status(400).send();
  } else {
    repositories[index].likes++;
    response.json({ "likes": repositories[index].likes });
  }    
});

module.exports = app;

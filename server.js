const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.send('P-p-p-p-PALETTE PICKER')
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});

app.locals.projects = [
  
]

app.get('/api/v1/projects', (request, response) => {
  const {projects} = app.locals;

  response.json(projects)
});

app.post('/api/v1/projects/', (request, response) => {
  const id = Date.now().toString();

  const { project } = request.body;
  const palettes = [];

  if (!project) {
    response.status(422).send({
      error: 'Please attach a project name under the project key in a post request header'
    })
  } else {
    app.locals.projects.push({ id, project, palettes });
    response.status(201).json({ id, project, palettes });
  }
});
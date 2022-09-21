const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;


let Team = require('./models/team.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://admin:admin@cluster0.212pn99.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

const mplRoutes = express.Router();

// To handle incoming HTTP GET request on the /api/ URL path and the list of all teams
mplRoutes.route('/').get(function (req, res) {
    Team.find(function (err, teams) {
        if (err) {
            console.log(err);
        } else {
            res.json(teams);
        }
    });
});

// To retrieve a team item by providing an ID
mplRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Team.findById(id, function (err, team) {
        res.json(team);
    });
});

// To add a team to db
mplRoutes.route('/add').post(function (req, res) {
    let team = new Team(req.body);
    team.save()
        .then(team => {
            res.status(200).json({ 'Team': 'Team added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new team failed');
        });
});

// Update by id
mplRoutes.route('/update/:id').post(function (req, res) {
    Team.findById(req.params.id, function (err, team) {
        if (!team) {
            res.status(404).send("data is not found");
        } else {
            team.teamId = req.body.teamId;
            team.teamName = req.body.teamName;
            team.member1 = req.body.member1;
            team.member2 = req.body.member2;
            team.member3 = req.body.member3;
            team.save().then(team => {
                res.json('Team Information updated!');
            })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
});

app.use('/api', mplRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.listen(port, function () {
    console.log("Server is running on Port: " + port);
});
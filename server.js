const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

let Team = require("./models/team.model");
let Track = require("./models/track.model")
let Crossword = require("./models/crossword.model")

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.212pn99.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'mplConnect' }
);

const connection = mongoose.connection;
connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});

const mplRoutes = express.Router();

// To handle incoming HTTP GET request on the /api/ URL path and the list of all teams
mplRoutes.route("/").get(function (req, res) {
    Team.find(function (err, teams) {
        if (err) {
            console.log(err);
        } else {
            res.json(teams);
        }
    });
});

// To retrieve a team item by providing an ID
// mplRoutes.route('/:id').get(function (req, res) {
//     let id = req.params.id;
//     Team.findById(id, function (err, team) {
//         if(!team){res.status(404).json("User doesn't exist");}
//         else{res.json(team);}
//     });
// });

// To add a team to db
mplRoutes.route("/add").post(function (req, res) {
    let team = new Team(req.body);
    team
        .save()
        .then((team) => {
            res.status(200).json({ Team: "Team added successfully" });
        })
        .catch((err) => {
            console.log(err)
            res.status(400).send("adding new team failed");
        });
});

// To login to the account on app
mplRoutes.route("/login").post(function (req, res) {
    let query = req.body;
    // would be in format {teamId: <value>, teamName: <value>}
    Team.findOne(query, function (err, team) {
        console.log(team)
        if (team == null) {
            return res.status(404).json("User doesn't exist");
        } else {
            if (team.firstLog) {
                team.firstLog = !team.firstLog;
                var time = new Date();
                team.time = time
                console.log(time)
                team.save().then((team) => {
                    console.log("First Log In");
                    res.json(team);
                    return;
                })
                    .catch((err) => {
                        console.log(err);
                        return;
                    });
            }
            else {
                console.log("Logged Earlier");
                res.json(team);
            }
        }
    }).catch((err) => {
        res.status(400).send("Login not possible");
    });
});


// Update by id
mplRoutes.route("/update/:id").post(function (req, res) {
    Team.findById(req.params.id, function (err, team) {
        if (err) return handleError(err);
        if (!team) {
            res.status(404).json("data is not found");
        } else {
            team.teamId = req.body.teamId;
            team.teamName = req.body.teamName;
            team.member1 = req.body.member1;
            team.member2 = req.body.member2;
            team.member3 = req.body.member3;
            team
                .save()
                .then((team) => {
                    res.json("Team Information updated!");
                })
                .catch((err) => {
                    res.status(400).send("Update not possible");
                });
        }
    });
});

// To increase the penalty count
mplRoutes.route("/penaltyIncrease/:id").patch(function (req, res) {
    try {
        let id = req.params.id;
        Team.findById(id, async function (err, team) {
            if (err) res.status(400).send(err);
            if (!team) {
                res.status(404).json("data is not found");
            }
            // console.log(team)
            const newC = team.penaltyCount + 1;
            team.penaltyCount = newC;
            // console.log(newC)
            // console.log(team)
            team
                .save()
                .then((team) => {
                    res.json("Works");
                })
                .catch((err) => {
                    res.status(400).send("Update not possible");
                });
        });
    } catch (error) {
        res.send(error);
    }
});

// To increase the penalty count
mplRoutes.route("/checkPointIncrease/:id").patch(function (req, res) {
    try {
        let id = req.params.id;
        Team.findById(id, async function (err, team) {
            if (err) res.status(400).send(err);
            if (!team) {
                res.status(404).json("data is not found");
            }
            // console.log(team)
            const newC = team.checkPoint + 1;
            team.checkPoint = newC;
            // console.log(newC)
            // console.log(team)
            team
                .save()
                .then((team) => {
                    res.json("Works");
                })
                .catch((err) => {
                    res.status(400).send("Update not possible");
                });
        });
    } catch (error) {
        res.send(error);
    }
});


// To get the point to be scanned for specific team
mplRoutes.route("/getNextPos/:id").get(function (req, res) {
    try {
        let id = req.params.id;
        Team.findById(id, async function (err, team) {
            if (err) res.status(400).send(err);
            if (!team) {
                res.status(404).json("data is not found");
            }
            // console.log(team)
            const trackId = team.trackId
            const chNum = team.checkPoint
            if (chNum == 5) {
                res.send("The journey done");
            } else {
                Track.findOne({
                    trackId: trackId
                }, function (err, trackItem) {
                    console.log(trackItem)
                    if (trackItem == null) {
                        return res.status(404).json("No tracks");
                    } else {
                        trackList = trackItem.track
                        console.log(trackList[chNum])
                        res.send(trackList[chNum])
                    }
                })
            }
            // console.log(newC)
            // console.log(team)
        });
    } catch (error) {
        res.send(error);
    }
});


// To get the present clue
mplRoutes.route("/getPresentClue/:id").get(function (req, res) {
    try {
        let id = req.params.id;
        Team.findById(id, async function (err, team) {
            if (err) res.status(400).send(err);
            if (!team) {
                res.status(404).json("data is not found");
            }
            // console.log(team)
            const trackId = team.trackId
            const chNum = team.checkPoint
            if (chNum == 5) {
                Crossword.findOne({
                    trackId: trackId
                }, function (err, crosswordItem) {
                    console.log(crosswordItem)
                    if (crosswordItem == null) {
                        return res.status(404).json("No tracks");
                    } else {
                        clueList = crosswordItem.clues
                        console.log(clueList)
                        res.send(clueList)
                    }
                })
            } else {
                Track.findOne({
                    trackId: trackId
                }, function (err, trackItem) {
                    console.log(trackItem)
                    if (trackItem == null) {
                        return res.status(404).json("No tracks");
                    } else {
                        if (chNum == 2) {
                            r2Clue = trackItem.round2
                            console.log(r2Clue)
                            res.send(r2Clue)
                        } else {
                            const imgLink = "https://mpl-connect.herokuapp.com/images/track" + trackId + "/round" + chNum + ".png"
                            console.log(imgLink)
                            res.send(imgLink)
                        }
                    }
                })
            }
            // console.log(newC)
            // console.log(team)
        });
    } catch (error) {
        res.send(error);
    }
});


// To check for final otp
mplRoutes.route("/finalOtpCheck").post(function (req, res) {
    let query = req.body;
    // would be in format {teamId: <value>, answer: <value>}
    Team.findById(query.id, function (err, team) {
        console.log(team)
        if (team == null) {
            return res.status(404).json("User doesn't exist");
        } else {
            // Take clue and match answer
            // if matches then take final timer and done
            // else increase penalty 
            const trackId = team.trackId
            Crossword.findOne({ trackId: trackId }, function (err, crosswordItem) {
                console.log(crosswordItem)
                if (crosswordItem == null) {
                    return res.status(404).json("No tracks");
                } else {
                    clueAnswer = crosswordItem.answer;
                    if (clueAnswer == query.answer) {
                        var time = new Date();
                        team.finalTime = time
                        team.checkPoint = team.checkPoint + 1
                        team.save().then((team) => {
                            console.log("done");
                            res.send("Completed")
                            return;
                        })
                            .catch((err) => {
                                console.log(err);
                                return;
                            });
                    }
                    else {
                        team.penaltyCount = team.penaltyCount + 1
                        team.save().then((team) => {
                            console.log("Wrong Otp");
                            res.send("Try Again")
                            return;
                        })
                            .catch((err) => {
                                console.log(err);
                                return;
                            });
                    }
                }
            }).catch((err) => {
                res.status(400).send("Verification not possible");
            });
        }
    });
})


app.use("/api", mplRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
    });
}

app.listen(port, function () {
    console.log("Server is running on Port: " + port);
});

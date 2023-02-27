import React from "react";
import axios from 'axios';

function ShowTeam() {
  axios.get("/api/").then(function (response){
    document.getElementById('tableElements').innerHTML = response.data.map(function (team){
      return ('<tr><td>' +team.teamId + '</td><td>' +team.teamName + '</td><td>' + team.member1 + '</td><td>' + team.member2 + '</td><td>' + team.member3 + '</td></tr>');
    }).join(" ");
  }).catch(function (err) {
    document.getElementById('tableElements').innerHTML = err.message;
  });

  return (
    <div className="container">
      <div className="py-5 text-center">
        <img className="d-block mx-auto mb-4" src="/logo.png" alt="" width="102" height="102" />
        <h2>Team Listings</h2>
        <p className="lead">All the allocated teams are shown here.</p>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Team Id</th>
            <th>Team Name</th>
            <th>Member 1</th>
            <th>Member 2</th>
            <th>Member 3</th>
          </tr>
        </thead>
        <tbody id="tableElements">
        </tbody>
      </table>

    </div>
  );
}

export default ShowTeam;
import React, {useState} from "react";
import axios from 'axios';

function AddTeam() {
  const [teamId, setTeamId] = useState('');
  const [teamName, setTeamName] = useState('');
  const [member1, setMember1] = useState('');
  const [member2, setMember2] = useState('');
  const [member3, setMember3] = useState('');

  const handleIdChange = (e) => {
    setTeamId(e.target.value);
  }
  const handleNameChange = (e) => {
    setTeamName(e.target.value);
  }
  const handleMember1Change = (e) => {
    setMember1(e.target.value);
  }
  const handleMember2Change = (e) => {
    setMember2(e.target.value);
  }
  const handleMember3Change = (e) => {
    setMember3(e.target.value);
  }
  const handleSubmit = (e) => {
    alert('A new team was added with TeamId : ' + teamId +
      ' ,TeamName : ' + teamName + ' and members : ' + member1 + ', ' + member2 + ' and ' + member3);
      axios.post('/api/add', {
        teamId: teamId,
        teamName: teamName,
        member1: member1,
        member2: member2,
        member3: member3
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    e.preventDefault();
    window.location.reload()


  }
  return (
    <div className="container" style={{ paddingBottom: 30 }}>
      <main>
        <div className="py-5 text-center">
          <img className="d-block mx-auto mb-4" src="/logo.png" alt="" width="102" height="102" />
          <h2>Team Allocation Form</h2>
          <p className="lead">This form has the team names and stuff.</p>
        </div>

        <div className="row g-5">
          <div className="col-md-7 col-lg-8">
            <form className="needs-validation" onSubmit={(e) => { handleSubmit(e) }}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="teamId" className="form-label">Team Id</label>
                  <input type="text" className="form-control" id="teamId" placeholder="" value={teamId} required onChange={(e) => { handleIdChange(e) }} />
                </div>

                <div className="col-sm-6">
                  <label htmlFor="teamName" className="form-label">Team Name</label>
                  <input type="text" className="form-control" id="teamName" placeholder="" value={teamName} required onChange={(e) => { handleNameChange(e) }} />
                </div>

                <div className="col-12">
                  <label htmlFor="member1" className="form-label">Member 1</label>
                  <input type="text" className="form-control" id="member1" placeholder="" value={member1} required onChange={(e) => { handleMember1Change(e) }} />
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">Member 2</label>
                  <input type="text" className="form-control" id="member2" placeholder="" value={member2} required onChange={(e) => { handleMember2Change(e) }} />
                </div>

                <div className="col-12">
                  <label htmlFor="address2" className="form-label">Member 3</label>
                  <input type="text" className="form-control" id="member3" placeholder="" value={member3} required onChange={(e) => { handleMember3Change(e) }} />
                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit">Create this Team</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddTeam;
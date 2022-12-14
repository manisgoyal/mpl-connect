import React from "react";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="https://www.siamvit.in/assets/images/logo-dark.png"
              alt=""
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">Home page</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
      <div className="py-5 text-center">
          <img className="d-block mx-auto mb-4" src="/logo.png" alt="" width="102" height="102" />
          <h2>Page under Construction</h2>
          <p className="lead">This page is under construction.</p>
        </div>
    </div>
  );
}

export default Home;
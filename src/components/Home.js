import Forum from "./Registration"; // Import the Forum component
import Login from "./Login"; // Import the Forum component

const Home = () => {
  return (
    <div
      style={{ backgroundSize: "cover", minHeight: "100vh" }}
      className="bg-gradient bg-secondary bg-opacity-75 text-light d-flex flex-column justify-content-between"
    >
      <div className="container-fluid text-center">
       
        <div className="mt-5">
          <h3 className="text-body-secondary mb-4">
            Crypto Tracker: All your crypto in one place
          </h3>
          <p className="lead">
            Crypto Tracker is a web app that allows you to easily manage your
            cryptocurrency holdings in one place. Keep track of the prices and
            your profit/loss trends.
          </p>
          <h3 className="text-body-secondary mb-4">Features</h3>
          <ul
            id="features_list"
            className="list-group list-group-horizontal justify-content-around"
          >
            <li
              className="list-group-item feature"
              style={{
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                background: "red",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Add/Remove Crypto Assets
            </li>
            <li
              className="list-group-item feature"
              style={{
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                background: "blue",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Track Prices
            </li>
            <li
              className="list-group-item feature"
              style={{
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                background: "green",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              View PnL
            </li>
          </ul>
          <div className="mt-5 d-flex justify-content-between">
          <div className="mr-4">
            <Forum />
          </div>
          <div>
            <Login />
          </div>
      </div>
      </div>
      </div>
      <footer className="bg-dark text-light text-center py-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="mb-0">Copyright Crypto Tracker</p>
            </div>
            <div className="col">
              <img src="/Cryptoportfolio/facebook.png" alt="Facebook" className="mx-1" />
              <img src="/Cryptoportfolio/twitter.png" alt="Twitter" className="mx-1" />
              <img src="/Cryptoportfolio/linkedin.png" alt="LinkedIn" className="mx-1" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

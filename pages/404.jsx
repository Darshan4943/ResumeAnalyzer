import { useRouter } from "next/router";
import React from "react";


function ErrorPage() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className=" main">
      <div className="customMarginsErr" style={{}}>
        <div className="container main-error">
          <div
            className="container-404"
            // style={{
            //   width: "40%",
            //   height: "100%",
            //   border: "2px solid green",
            //   display: "flex",
            //   flexDirection: "column",
            //   padding: "0px 5rem",
            //   justifyContent: "center",
            //   alignItems: "center",
            //   gap: "24px",
            // }}
          >
            <div
              className="container-404-first"
              //   style={{
              //     border: "2px solid red",
              //     display: "flex",
              //     flexDirection: "column",
              //     gap: "8px",
              //     justifyContent: "center",
              //   }}
            >
              <div>
                <img
                  src="/imagess/error-occured.png"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="error-text">
                Woops. Looks like this page doesn’t exist.
              </div>
            </div>
            <div className="go-to-container" style={{ width: "100%" }}>
              <div className="go-to-home-btn" onClick={handleRedirect}>
                Go to Home Page
                <img
                  style={{ width: "24px", height: "24px" }}
                  src="/imagess/arrowIcon.png"
                />
              </div>
            </div>
          </div>
          <div
            className="img-container-err"
            // style={{ width: "60%", height: "100%", border: "2px solid green" }}
          >
            <img
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              src="/imagess/404page.png"
            />
          </div>
          {/* <div className="row">
                    <div className="col-12 col-sm-6">

                    </div>
                    <div className="col-12 col-sm-12"><img src="images/404.png" alt="" /></div>
                   </div> */}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ErrorPage);

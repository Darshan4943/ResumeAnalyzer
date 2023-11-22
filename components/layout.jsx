
import { connect } from "react-redux";



import "react-toastify/dist/ReactToastify.min.css";

import Header from "./partials/header/header";
import Footer from "./partials/footer/footer";

import { actions } from "../store/demo";



function Layout({ children, }) {


  return (
    <>
      <div >
        <div className="customMargins">
          <Header />
        </div>
        {children}

        <Footer />
      </div>




    </>
  );
}

export default connect(null, { ...actions })(Layout);

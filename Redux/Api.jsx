import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { userAction } from "./actions/user";
import { jwtDecode } from "jwt-decode";
import { setJob } from "./actions";
import {
  currenciesWithIcons,
  currencyMap,
  plans,
  telCode,
} from "../utils/data";
import ResetPasswordModal from "../components/models/resetPasswordModal";
import moment from "moment";
import { recallUser } from "./reducers/userReducer";
import LocationEnablePopup from "../components/models/locationEnablePopup";
export const Api = () => {
  const store = useStore();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const userDataGlobal = useSelector((state) => state.userData);
  const [visible, setVisible] = useState(false);
  const [enablePopup, setEnablePopup] = useState(false);

  const dispatch = useDispatch();

  let timezone = moment().format("YYYY-MM-DD HH:mm:ss");

  // console.log(25,timezone)
  const reCallUser = useSelector((state) => state.reCallUser);
  useEffect(() => {
    if (userDataGlobal?.tempPassword?.length > 0) {
      const timer = setTimeout(() => {
        setLoading(false);
        setVisible(true);
      }, 3400);

      return () => clearTimeout(timer);
    }
  }, [userDataGlobal]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = JSON.parse(localStorage.getItem("authToken"));
      if (token && token != "undefined") {
        const decoded = jwtDecode(token.token);
        axios
          .get(
            "http://localhost:2000/api/skiloteckuser/user/" + decoded._id
          )
          .then((res) => {
            const decode = jwtDecode(res.data.data);
            dispatch(
              userAction({
                ...decode._doc,
                profileScore: res.data.profileScore,
              })
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [reCallUser]);

  useEffect(() => {
    const planActive =
      localStorage.getItem("planActive") == true ? true : false;
    const uploadCount = localStorage.getItem("uploadCount");

    if (userDataGlobal) {
      axios
        .get(
          "http://localhost:2000/api/subscription/" + userDataGlobal._id
        )
        .then((res) => {
          const result = res.data.findIsActive;

          if (result?.isActive == true) {
            const selectedPlan = plans.find(
              (item) => item.duration + " " + item.limit == result.plan
            );

          
            localStorage.setItem("activePlan", selectedPlan.index);
            localStorage.setItem("uploadCount", result.resumeUpladed);
            localStorage.setItem("planActive", result.isActive);
            localStorage.setItem("downloadCount", result.resumeDownloads);
            localStorage.setItem("saveCount", result.resumeSaves.num);
            localStorage.setItem("clientCount", result.clientStored);
            localStorage.setItem("planAvailable", true);
            let newEnddate = moment(result.endDate).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            // console.log(87,newEnddate)
            // { console.log(999, timezone >= newEnddate ? "active" : "inactive") }
            if (timezone >= newEnddate && result.isActive) {
              axios
                .put(
                  "http://localhost:2000/api/subscription/update/" +
                    result._id
                )
                .then((res) => {
                  if (res.data.success) {
                    // window.location.reload();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }

            // console.log(33333,moment(result.endDate).format('YYYY-MM-DD'))
            // console.log(44444,moment(timezone).format('YYYY-MM-DD'))
            // console.log(55555,moment(result.endDate).isBefore(moment(timezone).format('YYYY-MM-DD')))
          } else {
            if (!planActive && uploadCount == 0) {
              localStorage.setItem("uploadCount", 0);
            } else {
              localStorage.setItem("uploadCount", 1);
            }

            localStorage.setItem("planActive", false);
            localStorage.setItem("planAvailable", false);

            localStorage.setItem("downloadCount", 0);
            localStorage.setItem("saveCount", 0);
            localStorage.setItem("clientCount", 0);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userDataGlobal, reCallUser]);
  // const getLocation = () => {
  //   if (navigator.geolocation) {
  //     console.log(138, "again called");
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log(1771, position.coords);
  //         axios
  //           .get(
  //             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyC18Xg49QgJj0NYpDikCbDwaWS00tKUpnM`
  //           )
  //           .then(async (response) => {
  //             const results = response.data.results;
  //             const countryData = response.data.results.find((result) =>
  //               result.types.includes("country")
  //             );
  //             if (countryData) {
  //               const country = countryData.formatted_address;
  //               const codeJson = telCode.find((item) => item.name == country);
  //               const Country = currencyMap.find(
  //                 (item) => item.countryCode == codeJson.code
  //               );
  //               const currency = Country ? Country.currency : "USD";
  //               const icon = currenciesWithIcons.find(
  //                 (item) => item.icon == currency.toLowerCase()
  //               );
  //               const symbol = icon ? icon.symbol : currency;
  //               const exchangeRate = await axios.get(
  //                 "http://localhost:2000/api/exchangeRate/" + currency
  //               );
  //               localStorage.setItem("exchangeRate", exchangeRate.data.rate);
  //               localStorage.setItem("currency", currency);
  //               localStorage.setItem("icon", symbol);
  //             } else {
  //               console.log(err);
  //             }
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       },
  //       (error) => {
  //         console.log(4444444, error);
  //         if (error.code === 1) {
  //           setEnablePopup(true);
  //         }
  //         setError(error.message);
  //       }
  //     );
  //   } else {
  //     setError("Geolocation is not supported by this browser.");
  //   }
  // };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        
        if (result.state === "granted") {
          // Permission was already granted
          navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback,
           
          );
      
        } else if (result.state === "prompt") {
          // Permission is being requested
          navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback
          );
        } else if (result.state === "denied") {
          // Permission was denied
          setEnablePopup(true);
         
        }

        result.onchange = function () {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              successCallback,
              errorCallback
            );
            setEnablePopup(false);
          }
          else{
            setEnablePopup(true);
          }
        };
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const successCallback = (position) => {
    const { latitude, longitude } = position.coords;
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyC18Xg49QgJj0NYpDikCbDwaWS00tKUpnM`
      )
      .then(async (response) => {
        const results = response.data.results;
        const countryData = results.find((result) =>
          result.types.includes("country")
        );
        if (countryData) {
          const country = countryData.formatted_address;
          const codeJson = telCode.find((item) => item.name == country);
          const Country = currencyMap.find(
            (item) => item.countryCode == codeJson.code
          );
          const currency = Country ? Country.currency : "USD";
          const icon = currenciesWithIcons.find(
            (item) => item.icon == currency.toLowerCase()
          );
          const symbol = icon ? icon.symbol : currency;
          const exchangeRate = await axios.get(
            `http://localhost:2000/api/exchangeRate/${currency}`
          );
          localStorage.setItem("exchangeRate", exchangeRate.data.rate);
          localStorage.setItem("currency", currency);
          localStorage.setItem("icon", symbol);
        } else {
          console.log("Error: Country data not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const errorCallback = (error) => {
    console.log(error);
    if (error.code === 1) {
      setEnablePopup(true);
    }
    setError(error.message);
  };

  useEffect(() => {
    getLocation();
  }, []);
  // console.log(123,visible && loading == false);
  return (
    <>
      {enablePopup && (
        <LocationEnablePopup
          setEnablePopup={setEnablePopup}
          enablePopup={enablePopup}
          getLocation={getLocation}
        />
      )}
      {visible && !loading && <ResetPasswordModal />}
    </>
  );
};

import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { userAction } from "./actions/user";
import { jwtDecode } from "jwt-decode";
import { setJob } from "./actions";

import {
  countriesCoordinatesEast,
  countriesCoordinatesNorthEast,
  countriesCoordinatesSouthEast,
  countryCondition1,
  currenciesWithIcons,
  currencyMap,
  plans,
  telCode,
} from "../utils/data";
import ResetPasswordModal from "../components/models/resetPasswordModal";
import moment from "moment";
import { recallUser } from "./reducers/userReducer";
import LocationEnablePopup from "../components/models/locationEnablePopup";
import { io } from "socket.io-client";
import { setPageClosed, setPageOpened } from "./actions/website";
import { setEnablePopup, setShowPlans } from "./actions/popupActions";

const ENDPOINT = "https://jamblix.com"; // Replace with your backend WebSocket server URL

export const Api = ({ }) => {
  const store = useStore();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const userDataGlobal = useSelector((state) => state.userData);
  const [visible, setVisible] = useState(false);
  const enablePopup = useSelector((state) => state.popup.enablePopup);
  const showPlan = useSelector((state) => state.showPlan.show);


  //   useEffect(() => {
  //     const socket = io(ENDPOINT);

  //     socket.on('connect', () => {
  //         console.log('Connected to WebSocket server');
  //     });

  //     socket.on('disconnect', () => {
  //         console.log('Disconnected from WebSocket server');
  //     });

  //     return () => {
  //         socket.disconnect();
  //     };
  // }, []);
  const dispatch = useDispatch();

  let timezone = moment().format("YYYY-MM-DD HH:mm:ss");

  // console.log(25,timezone)
  const reCallUser = useSelector((state) => state.reCallUser);
  dispatch(setPageClosed());
  useEffect(() => {
    if (userDataGlobal?.tempPassword?.length > 0) {
      const timer = setTimeout(() => {
        setLoading(false);
        setVisible(true);
      }, 3400);

      return () => clearTimeout(timer);
    }
  }, [userDataGlobal, showPlan]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = JSON.parse(localStorage.getItem("authToken"));

      if (token && token != "undefined") {
        const decoded = jwtDecode(token.token);
        axios
          .get("https://jamblix.com/api/skiloteckuser/user/" + decoded._id)
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
  }, [reCallUser, showPlan]);

  useEffect(() => {
    const planActive =
      localStorage.getItem("planActive") == true ? true : false;
    const uploadCount = localStorage.getItem("uploadCount");

    if (userDataGlobal) {
      axios
        .get("https://jamblix.com/api/subscription/" + userDataGlobal._id)
        .then((res) => {
          const result = res.data.findIsActive;
console.log(444,result)
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
                  "https://jamblix.com/api/subscription/update/" + result._id
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
  }, [userDataGlobal, reCallUser, showPlan]);
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
  //                 "https://jamblix.com/api/exchangeRate/" + currency
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
            errorCallback
          );
        } else if (result.state === "prompt") {
          // Permission is being requested
          navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback
          );
        } else if (result.state === "denied") {
          // Permission was denied
          dispatch(setEnablePopup(true));
          dispatch(setShowPlans(false));
        }

        result.onchange = function () {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              successCallback,
              errorCallback
            );
            dispatch(setEnablePopup(false));
            dispatch(setShowPlans(true));
          } else {
            dispatch(setEnablePopup(true));
            dispatch(setShowPlans(false));
          }
        };
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const successCallback = async (position) => {
    let { latitude, longitude } = position.coords;
    // let latitude = 19.0154;
    // let longitude =29.1549;
    let countriesData = [];

    const fetchCountryData = async (lat, lon) => {
        console.log(`Fetching data for latitude: ${lat}, longitude: ${lon}`);
        try {
            const response = await axios.get(
                  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyC18Xg49QgJj0NYpDikCbDwaWS00tKUpnM`
            );
            return response.data.results;
        } catch (err) {
            console.error("Error fetching country data:", err);
            return null;
        }
    };

    const processCountryData = async (results) => {
        const countryData = results.find((result) =>
            result.types.includes("country")
        );

        if (countryData) {
            const country = countryData.formatted_address;
            const codeJson = telCode.find((item) => item?.name === country);
            const Country = currencyMap.find(
                (item) => item?.countryCode === codeJson?.code
            );
            const currency = Country ? Country.currency : "USD";
            const icon = currenciesWithIcons?.find(
                (item) => item?.icon === currency?.toLowerCase()
            );
         
            const symbol = icon ? icon.symbol : currency;
            
            const exchangeRate = await axios.get(
                `https://jamblix.com/api/exchangeRate/${currency}`
            );
          
            localStorage.setItem("exchangeRate", exchangeRate?.data === "" ? "1" : exchangeRate?.data?.rate);
            localStorage.setItem("currency", exchangeRate?.data === "" ? "USD" :currency);
            localStorage.setItem("icon", exchangeRate?.data === "" ? "$" : symbol);
        } else {
            console.error("Error: Country data not found");
        }
    };

    const conditions = [
        { lat: Math.abs(latitude), lon: Math.abs(longitude) },
        { lat: Math.abs(latitude), lon: -Math.abs(longitude) },
        { lat: -Math.abs(latitude), lon: Math.abs(longitude) },
        { lat: -Math.abs(latitude), lon: -Math.abs(longitude) },
    ];

  

    for (let i = 0; i < conditions.length; i++) {
        let { lat, lon } = conditions[i];
        let results = await fetchCountryData(lat, lon);
        console.log(`Condition ${i + 1}:`, results);
        if (results) {
            results.forEach((result) => {
                const lat = Math.abs(result.geometry.location.lat);
                const lng = Math.abs(result.geometry.location.lng);
                const distance = haversine(latitude, longitude, lat, lng);

                countriesData.push({
                    condition: i + 1,
                    lat: lat,
                    lon: lng,
                    formatted_address: result.formatted_address,
                    distance: distance,
                    results: results,
                    types: result.types
                });
            });
        }
    }

    function haversine(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        return distance;
    }

    // Sort countriesData by distance
    countriesData.sort((a, b) => a.distance - b.distance);

    let closestPostalCodeData = countriesData.filter(countryData =>
      countryData.types.includes("postal_code")
  );

  const countries = closestPostalCodeData.map(item => item.formatted_address.split(',').slice(-1)[0].trim());


  const allSameCountry = countries.every((value, _, array) => value === array[0]);

  // If no postal_code result, filter for country entries
  if (closestPostalCodeData.length === 0 || (closestPostalCodeData.length > 1 && !allSameCountry)) {
      closestPostalCodeData = countriesData.filter(countryData =>
          countryData.types.includes("country")
      );
  }

    const closestData = closestPostalCodeData[0];
   
    if (closestData) {
        console.log(`The closest data is from condition: ${closestData.condition}`);
        console.log(`Distance: ${closestData.distance} km`);
        console.log(`Address: ${closestData.formatted_address}`);

        // Process the closest country data
        await processCountryData(closestData.results);
    } else {
        console.log("No relevant data found");
    }
};




  const errorCallback = (error) => {
    console.log(error);
    if (error.code === 1) {
      dispatch(setEnablePopup(true));
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
          setEnablePopup={(value) => dispatch(setEnablePopup(value))}
          enablePopup={enablePopup}
          getLocation={getLocation}
        />
      )}
      {visible && !loading && <ResetPasswordModal />}
    </>
  );
};

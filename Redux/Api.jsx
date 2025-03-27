import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";

import {
  currenciesWithIcons,
  currencyMap,
  plans,
  telCode,
} from "../utils/data";
import ResetPasswordModal from "../components/models/resetPasswordModal";
import moment from "moment";

import LocationEnablePopup from "../components/models/locationEnablePopup";
import { io } from "socket.io-client";

import { setEnablePopup, setShowPlans } from "./slices/popupSlice";
import { fetchUserData } from "./slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppliedJob, fetchSavedJobIds } from "./slices/jobSlice";
import { fetchProfileData } from "./slices/profileSlice";
import { setLoginState } from "./slices/loginSlice";
import { useRouter } from "next/router";
import { setShareJobClose } from "./slices/shareJobSlice";

export const Api = ({ }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const { recallData } = useSelector((state) => state.recall);
  const [visible, setVisible] = useState(false);
  const enablePopup = useSelector((state) => state.popup.enablePopup);
  const router = useRouter();



  const [allPlans, setAllPlans] = useState([]);

  const dispatch = useDispatch();
  // dispatch(setShareJobClose());
  useEffect(() => {
    const handleRouteChange = () => {
      localStorage.setItem("viewed", JSON.stringify(false));
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      const isLoggedIn = token && token !== "undefined";
      dispatch(setLoginState(isLoggedIn));
    }
  }, [dispatch]);

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

  // useEffect(() => {

  //   const timeoutId = setTimeout(() => {
  //     if (Object.keys(userDataGlobal).length === 0) {
  //       localStorage.clear();
  //       console.log("Local Storage Cleared");
  //     }
  //   }, 10000);

  //   return () => clearTimeout(timeoutId);
  // }, [userDataGlobal]);

  // if (userDataGlobal?._id) {
  //   axios
  //     .put("https://jamblix.com/api/skiloteckuser/clrLocalStorage/" + userDataGlobal?._id)
  //     .then((res) => {

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // useEffect(() => {
  //   if (!userDataGlobal || (typeof userDataGlobal === 'object' && Object.keys(userDataGlobal).length === 0)) {
  //     localStorage.clear();
  //   }
  // }, [userDataGlobal]);

  let timezone = moment().format("YYYY-MM-DD HH:mm:ss");

  useEffect(() => {
    if (userDataGlobal) {
      dispatch(fetchProfileData(userDataGlobal?._id));
      dispatch(fetchAppliedJob(userDataGlobal?._id));
      dispatch(fetchSavedJobIds(userDataGlobal?._id));
    }
  }, [userDataGlobal]);

  useEffect(() => {
    axios
      .get("https://jamblix.com/api/plans/getAllPlans")
      .then((res) => {
        setAllPlans(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDataGlobal]);

  useEffect(() => {
    if (userDataGlobal?.tempPassword?.length > 0) {
      const timer = setTimeout(() => {
        setLoading(false);
        setVisible(true);
      }, 3400);

      return () => clearTimeout(timer);
    }
  }, [userDataGlobal]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const token = JSON.parse(localStorage.getItem("authToken"));

  //     if (token && token != "undefined") {
  //       const decoded = jwtDecode(token.token);
  //       axios
  //         .get("https://jamblix.com/api/skiloteckuser/user/" + decoded._id)
  //         .then((res) => {
  //           const decode = jwtDecode(res.data.data);
  //           dispatch(
  //             userAction({
  //               ...decode._doc,
  //               profileScore: res.data.profileScore,
  //             })
  //           );
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   }
  // }, [reCallUser]);

  useEffect(() => {
    const planActive =
      localStorage.getItem("planActive") == true ? true : false;
    const uploadCount = localStorage.getItem("uploadCount");

    if (userDataGlobal) {
      axios
        .get("https://jamblix.com/api/subscription/" + userDataGlobal?._id)
        .then((res) => {
          const result = res.data.findIsActive;

          if (result?.isActive == true) {
            const selectedPlan = allPlans.find(
              (item) => item.index == result.index
            );

            localStorage.setItem(
              "activePlan",
              result?.index ? result?.index : null
            );
            localStorage.setItem("planActive", result.isActive);
            localStorage.setItem("uploadCount", result.used.resumeUploded);
            localStorage.setItem("saveCount", result.used.resumeStored);
            localStorage.setItem("chatCountDaily", result.used.chatBot.daily);
            localStorage.setItem(
              "chatCountMonthly",
              result.used.chatBot.monthly
            );
            localStorage.setItem("jdCountDaily", result.used.jdMatching.daily);
            localStorage.setItem("aiHitsMonthly", result.used.aiHits.monthly);
            localStorage.setItem(
              "jdCountMonthly",
              result.used.jdMatching.monthly
            );
            localStorage.setItem("clientCount", result.used.clientStored);
            localStorage.setItem(
              "collectionCountDaily",
              result.used.collectionStored.daily
            );
            localStorage.setItem(
              "collectionCountMonthly",
              result.used.collectionStored.monthly
            );
            localStorage.setItem("jobsApply", result.used.jobsApply);
            localStorage.setItem("coverCount", result.used.coverStored);
            localStorage.setItem("jdMatchingCount", result.used.jdMatching);
            localStorage.setItem("skillTestCount", result.used.skillTest);
            localStorage.setItem(
              "skillCertifiedCount",
              result.used.skillCertified
            );
            localStorage.setItem(
              "uploadCountLimit",
              result.limits.resumeUplodedLimit
            );
            localStorage.setItem(
              "saveCountLimit",
              result.limits.resumeStoredLimit
            );
            localStorage.setItem(
              "clientCountLimit",
              result.limits.clientStoredLimit
            );
            localStorage.setItem("isFree", result.isFree);
            localStorage.setItem(
              "jobsApplyLimit",
              result.limits.jobsApplyLimit
            );
            localStorage.setItem(
              "coverCountLimit",
              result.limits.coverStoredLimit
            );
            localStorage.setItem(
              "skillTestCountLimit",
              result.limits.skillTestLimit
            );
            localStorage.setItem(
              "skillCertifiedCountLimit",
              result.limits.skillCertifiedLimit
            );
            localStorage.setItem(
              "chatCountDailyLimit",
              result.limits.chatBotLimit.daily
            );
            localStorage.setItem(
              "chatCountMonthlyLimit",
              result.limits.chatBotLimit.monthly
            );
            localStorage.setItem(
              "jdCountDailyLimit",
              result.limits.jdMatchingLimit.daily
            );
            localStorage.setItem(
              "jdCountMonthlyLimit",
              result.limits.jdMatchingLimit.monthly
            );
            localStorage.setItem(
              "aiHitsMonthlyLimit",
              result.limits.aiHitsLimit.monthly
            );
            localStorage.setItem(
              "collectionCountDailyLimit",
              result.limits.collectionStoredLimit.daily
            );
            localStorage.setItem(
              "collectionCountMonthlyLimit",
              result.limits.collectionStoredLimit.monthly
            );
            localStorage.setItem("planAvailable", true);

            let newEnddate = moment(result.endDate).format(
              "YYYY-MM-DD HH:mm:ss"
            );
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
          } else {
            if (!planActive && uploadCount == 0) {
              localStorage.setItem("uploadCount", 0);
            } else {
              localStorage.setItem("uploadCount", 1);
            }

            localStorage.setItem("planActive", false);
            localStorage.setItem("planAvailable", false);

            localStorage.setItem("chatCount", 0);

            localStorage.setItem("jdCount", 0);

            localStorage.setItem("uploadCount", 0);
            localStorage.setItem("saveCount", 0);
            localStorage.setItem("clientCount", 0);
            localStorage.setItem("collectionCount", 0);
            localStorage.setItem("jobsApply", 0);
            localStorage.setItem("coverCount", 0);
            localStorage.setItem("skillTestCount", 0);
            localStorage.setItem("skillCertifiedCount", 0);
            localStorage.setItem("uploadCountLimit", 0);
            localStorage.setItem("saveCountLimit", 0);
            localStorage.setItem("clientCountLimit", 0);
            localStorage.setItem("collectionCountLimit", 0);
            localStorage.setItem("jobsApplyLimit", 0);
            localStorage.setItem("coverCountLimit", 0);
            localStorage.setItem("skillTestCountLimit", 0);
            localStorage.setItem("skillCertifiedCountLimit", 0);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userDataGlobal, allPlans, recallData]);

  useEffect(() => {
    if (userDataGlobal?._id) {
      let userId = userDataGlobal?._id;
      let role = userDataGlobal?.role;

      axios
        .post("https://jamblix.com/api/apiLogs/get", {
          userId,
          role,
        })
        .then((res) => {
          const result = res.data.data;
          // localStorage.setItem("chatCount", result.chatBot);
          // localStorage.setItem("jdCount", result.jobMatching.matchCount);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userDataGlobal]);

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
    // let latitude = 13.1339;
    // let longitude =27.8493;
    let countriesData = [];

    const fetchCountryData = async (lat, lon) => {
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
        localStorage.setItem("country", country);
        const codeJson = telCode.find((item) => item?.name === country);
        const Country = currencyMap.find(
          (item) => item?.countryCode === codeJson?.code
        );

        // const currency = Country ? Country.currency : "USD";
        const currency =
          country === "India"
            ? "INR"
            : country === "United Kingdom"
              ? "GBP"
              : "USD";
        // const currency = "USD";
        const icon = currenciesWithIcons?.find(
          (item) => item?.icon === currency?.toLowerCase()
        );

        const symbol = icon ? icon.symbol : currency;

        const exchangeRate = await axios.get(
          `https://jamblix.com/api/exchangeRate/${currency}`
        );

        localStorage.setItem(
          "exchangeRate",
          exchangeRate?.data === "" ? "1" : exchangeRate?.data?.rate
        );
        localStorage.setItem(
          "currency",
          exchangeRate?.data === "" ? "USD" : currency
        );
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

    for (let i = 0; i < conditions?.length; i++) {
      let { lat, lon } = conditions[i];
      let results = await fetchCountryData(lat, lon);

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
            types: result.types,
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

    let closestPostalCodeData = countriesData.filter((countryData) =>
      countryData.types.includes("postal_code")
    );

    const countries = closestPostalCodeData.map((item) =>
      item.formatted_address.split(",").slice(-1)[0].trim()
    );

    const allSameCountry = countries.every(
      (value, _, array) => value === array[0]
    );

    // If no postal_code result, filter for country entries
    if (
      closestPostalCodeData?.length === 0 ||
      (closestPostalCodeData?.length > 1 && !allSameCountry)
    ) {
      closestPostalCodeData = countriesData.filter((countryData) =>
        countryData.types.includes("country")
      );
    }

    const closestData = closestPostalCodeData[0];

    if (closestData) {
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

  return (
    <>
      {!enablePopup && (
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

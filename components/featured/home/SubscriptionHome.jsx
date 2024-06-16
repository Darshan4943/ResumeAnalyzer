import React, { useEffect, useState } from "react";
import SubscriptionPlans from "./SubscriptionPlans";
import axios from "axios";
import { currenciesWithIcons, currencyMap, plans, telCode } from "../../../utils/data";

function SubscriptionPlan({ isLogin, fromMain }) {
  const [showPlan, setShowPlans] = useState(false);
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
          setShowPlans(false);
        }
        result.onchange = function () {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              successCallback,
              errorCallback
            );
            
          } else {
            setShowPlans(false);
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
            `https://jamblix.com/api/exchangeRate/${currency}`
          );
          localStorage.setItem("exchangeRate", exchangeRate.data.rate);
          localStorage.setItem("currency", currency);
          localStorage.setItem("icon", symbol);
          setShowPlans(true)
        } else {
          console.log("Error: Country data not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const errorCallback = (error) => {
    console.log(123,error);

  };

  useEffect(() => {
    getLocation();
  }, []);
  return (
    showPlan&& <div className=" bg-subscriptionPlan  bg-cover bg-no-repeat   pb-12 min-h-[95vh]">
      <div className="flex flex-col lg:gap-12 justify-center items-center gap-4 customMargins ">
        <div className="text-center w-[90%] leading-tight">
          <p className="ml:text-[2.5vw] text-[8vw] text-[#333333] font-[700]">
            Choose the <span className="text-[#06A9EF]">Subscription Plan</span> That Fits Your Needs

          </p>
          <p className="ml:text-[1.3vw] text-[4vw] text-[#646464] font-[400]">
            Unlock Premium Features and Enhance Your Experience.
          </p>
        </div>

        <SubscriptionPlans isLogin={isLogin} fromMain={fromMain} />
      </div>
    </div>
  );
}

export default SubscriptionPlan;

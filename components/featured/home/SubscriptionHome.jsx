import React, { useEffect, useState } from "react";
import SubscriptionPlans from "./SubscriptionPlans";
import axios from "axios";
import { currenciesWithIcons, currencyMap, plans, telCode } from "../../../utils/data";
import MiniLoader from "../../common/miniLoader";

function SubscriptionPlan({ isLogin, fromMain }) {
  const [showPlan, setShowPlans] = useState(false);
  const [loading, setLoading] = useState(true)
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

  const successCallback = async (position) => {
    let { latitude, longitude } = position.coords;
    // let latitude =17.8263;
    // let longitude =31.0504;
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
        const codeJson = telCode.find((item) => item?.name === country);
        const Country = currencyMap.find(
          (item) => item?.countryCode === codeJson?.code
        );
       
        // const currency = Country ? Country.currency : "USD";
          const currency = country ==="India" ? "INR" : country ==="United Kingdom" ? "GBP" : "USD";
          // const currency =  "USD";
        const icon = currenciesWithIcons?.find(
          (item) => item?.icon === currency?.toLowerCase()
        );

        const symbol = icon ? icon.symbol : currency;

        const exchangeRate = await axios.get(
          `http://localhost:2000/api/exchangeRate/${currency}`
        );

        localStorage.setItem("exchangeRate", exchangeRate?.data === "" ? "1" : exchangeRate?.data?.rate);
        localStorage.setItem("currency", exchangeRate?.data === "" ? "USD" : currency);
        localStorage.setItem("icon", exchangeRate?.data === "" ? "$" : symbol);
        setShowPlans(true)
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
    if (closestPostalCodeData?.length === 0 || (closestPostalCodeData?.length > 1 && !allSameCountry)) {
      closestPostalCodeData = countriesData.filter(countryData =>
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
    console.log(123, error);

  };

  useEffect(() => {
    getLocation();
  }, []);
  return (
    showPlan ?
    <div className=" bg-subscriptionPlan  bg-cover bg-no-repeat py-12 min-h-[95vh]">
      <div className="flex flex-col lg:gap-12 justify-center items-center gap-4 customMargins ">
        <div className="text-center w-[90%] leading-tight">
          <p className="ml:text-[2.5vw] text-[28px] text-[#333333] font-[700]">
            Choose the <span className="text-[#06A9EF]">Subscription Plan</span> That Fits Your Needs

          </p>
          <p className="ml:text-[1.3vw] text-[14px] text-[#646464] font-[400]">
            Unlock Premium Features and Enhance Your Experience.
          </p>
        </div>

        <SubscriptionPlans isLogin={isLogin} fromMain={fromMain} setLoading={setLoading} />
      </div>
    </div>
    :
    <MiniLoader/>
  );
}

export default SubscriptionPlan;

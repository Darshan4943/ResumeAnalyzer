import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const LinkedInCallback = () => {
  const router = useRouter();

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const { code, error: queryError } = router.query;
console.log(code);
console.log(queryError);
    if (queryError) {
        
      setError("Authorization failed. Please try again.");
      return;
    }

    if (code) {
      // Exchange authorization code for access token via your backend
      axios
        .post("http://localhost:2000/api/linkedin/exchange-token", { code })
        .then(res => {
          const data = res.data;
          if (data.error) {
            setError(data.error);
          } else {
            setSuccessMessage("LinkedIn connected successfully!");
            // Optional: save token, redirect, etc.
          }
        })
        .catch(err => {
          console.error("Axios error:", err.response?.data || err.message);
          setError("Something went wrong. Please try again.");
        });
    }
  }, [router.query]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-600 font-bold">{successMessage}</p>}
      {!error && !successMessage && <p>Connecting to LinkedIn...</p>}
    </div>
  );
};

export default LinkedInCallback;

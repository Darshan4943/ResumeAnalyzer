// pages/LinkedInConnect.jsx
import React from "react";

const LinkedInConnect = () => {
//  const handleConnect = () => {
//   const clientId = "866gq2fsy7j6ib"; 
//   const redirectUri = encodeURIComponent("https://www.skilotech.com/linkedin/callback");
//   const scope = "r_liteprofile r_emailaddress";

//   const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

//   window.location.href = authUrl;
// };

const handleConnect = () => {
  const clientId = "866gq2fsy7j6ib";
  const redirectUri = encodeURIComponent("https://www.skilotech.com/linkedin/callback");
  const scope = "openid profile email";
  const responseType = "code";
  const state = "DCEEFWF45453sdffef424"; // random string for CSRF protection
  const nonce = "random_nonce"; // for ID token

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&nonce=${nonce}`;

  window.location.href = authUrl;
};


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={handleConnect}
        className="px-4 py-2 bg-blue text-white rounded-lg shadow"
      >
        Connect LinkedIn
      </button>
    </div>
  );
};

export default LinkedInConnect;

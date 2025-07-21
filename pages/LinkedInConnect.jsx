// pages/LinkedInConnect.jsx
import React from "react";

const LinkedInConnect = () => {
 const handleConnect = () => {
  const clientId = "866gq2fsy7j6ib"; 
  const redirectUri = encodeURIComponent("http://localhost:3000/linkedin/callback");
  const scope = "r_liteprofile r_emailaddress w_member_social";

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

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

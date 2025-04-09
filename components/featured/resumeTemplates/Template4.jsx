import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Svg,
  Path,
  Rect,
} from "@react-pdf/renderer";
function Template4({ data, selectedColor, selectedFont, preview ,pageLayout}) {
  const fetchImageAsBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
  
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); 
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  
  const [profileBase64, setProfileBase64] = useState(null);

useEffect(() => {
  const prepareImage = async () => {
    if (data?.profilePhoto && typeof data.profilePhoto === 'string' && data.profilePhoto.startsWith('http')) {
      try {
        const base64Image = await fetchImageAsBase64(data.profilePhoto);
        setProfileBase64(base64Image);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }
  };
  prepareImage();
}, [data?.profilePhoto]);

  const formatLink16 = (link) => {
    if (link?.length > 16) {
      return link?.match(/.{1,16}/g).join('\n');
    }
    return link;
  };

  const formatLink19 = (link) => {
    if (link?.length > 22) {
      return link?.match(/.{1,22}/g).join('\n');
    }
    return link;
  };

  const formatLink20 = (link) => {
    if (link?.length > 20) {
      return link?.match(/.{1,20}/g).join('\n');
    }
    return link;
  };

  const formatLink10 = (link) => {
    if (link?.length > 10) {
      return link?.match(/.{1,10}/g).join('\n');
    }
    return link;
  };

  return (
    <Page
      size="A4"
      wrap={true}
      style={{ paddingTop: "12px" }}
      pageMode={"fullScreen"}
    >
      <View style={{ flexDirection: "row", gap: "1.5rem", marginTop: "-12px" }}>
        <View style={{ width: "190px" }}>
          <View
            style={{
              flexDirection: "column",
              minHeight: 829.7,
              height: "100%",
              backgroundColor: "#282829",
              gap: "18px",
              paddingLeft: 24,
            }}
          >
            <View
              style={{
                alignItems: "center",
                marginTop: "35px",
                flexDirection: "column",
                marginLeft: -24,
              }}
            >
              {data?.showProfile === true && (
                <>
                  {data.profilePhoto ? (
                    <Image
                    src={
                      preview
                        ? profileBase64 || data?.profilePhoto
                        : Object.keys(data?.profilePhoto || {}).includes("filename")
                          ? URL.createObjectURL(data?.profilePhoto)
                          : profileBase64 || data?.profilePhoto
                    }
                      alt=""
                      style={{
                        width: "134px",
                        marginBottom: "16px",
                        height: "134px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Image
                      src="/images/services/profile.png"
                      alt=""
                      style={{
                        width: "134px",
                        marginBottom: "16px",
                        height: "134px",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </>
              )}
              <View
                style={{
                  width:"90%",
                  display: "flex",
                  marginBottom: "6px",
                  marginRight: "8px",
                  marginLeft: "8px",
                 
                }}
              >
                <Text
                  style={{
                    width:"100%",
                      textAlign:"center",
                    color: "#fff",
                    fontFamily: `${selectedFont} 400`,
                    fontSize: "24px",
                    flexWrap: 'nowrap',
                  }}
                >
                  {formatLink10(data.firstName)}
                </Text>
                <Text
                  style={{
                      width:"100%",
                      textAlign:"center",
                    color: "#fff",
                    fontFamily: `${selectedFont} 400`,
                    fontSize: "24px",
                     flexWrap: 'nowrap',
                  }}
                >
                  {formatLink10(data.lastName)}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: "10px",
                  fontFamily: `${selectedFont} 500`,
                  color: selectedColor,
                  marginRight: "16px",
                  marginLeft: "16px",
                }}
              >
                {data.designation}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <View
                style={{
                  marginRight: "-12px",
                  marginTop: "4px",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Svg width={180} height={43} viewBox="0 0 180 43">
                  <Path
                    d="M10.942 32.118H179.514V0.887939H10.942L0.782959 16.5029L10.942 32.118Z"
                    fill={selectedColor}
                  />
                  <Path
                    d="M167.942 42.8819L179.514 32.118L167.942 32.1179V42.8819Z"
                    fill={selectedColor}
                  />
                  <Text
                    x="10%"
                    y="40%"
                    dominantBaseline="middle"
                    textAnchor="start"
                    fill="white"
                    style={{
                      fontFamily: `${selectedFont} 400`,
                      fontSize: "14px",
                    }}
                  >
                    CONTACT
                  </Text>
                </Svg>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  width: "100%",
                  alignItems: "start",
                }}
              >
                {data?.mobileNumber && (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: "8px",
                      justifyContent: "start",
                      alignItems: "center",
                      // marginLeft: "16px",
                      paddingRight: "4px",
                      paddingTop: "5px",
                    }}
                  >
                    <Svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.02365 0.0195312C3.92266 0.0195312 0.597656 3.34751 0.597656 7.45251C0.597656 11.5575 3.92266 14.8855 8.02365 14.8855C12.1247 14.8855 15.4497 11.5575 15.4497 7.45251C15.4497 3.34751 12.1257 0.0195312 8.02365 0.0195312Z"
                        fill={selectedColor}
                      />
                      <Path
                        d="M11.5938 5.38177L11.0448 5.07278C11.0448 5.07278 10.2988 4.55078 8.1558 4.55078H7.8258C6.1358 4.55078 5.0028 5.07278 5.0028 5.07278L4.4538 5.38177C3.7788 5.74977 4.1308 6.37079 4.1308 6.37079L4.4518 7.04779L6.3268 6.0528C6.3268 6.0528 6.1578 5.74677 6.1028 5.60577C6.0428 5.49177 6.0848 5.51678 6.1258 5.49078C6.1258 5.49078 6.9998 5.10278 7.8238 5.10278H8.2198C8.2198 5.10278 9.4218 5.10078 9.9258 5.55078C9.9818 5.60078 9.9788 5.5168 9.9378 5.6218C9.8508 5.8438 9.7168 6.0528 9.7168 6.0528L11.5698 7.04779L11.9128 6.37079C11.9158 6.37079 12.2688 5.74977 11.5938 5.38177ZM9.1948 6.17078L9.2108 5.93878C9.2108 5.37778 8.6748 5.38678 8.6748 5.38678H7.3558C6.8198 5.38678 6.8438 5.89578 6.8438 5.89578V6.18378C6.4168 6.34678 5.9958 6.61479 5.7818 7.05179C5.7818 7.05179 5.2448 9.02378 5.2538 8.85178V9.80078C5.2538 9.80078 5.2098 10.3528 5.7818 10.3528H10.2438C10.2438 10.3528 10.7928 10.3298 10.7928 9.80078V8.8978L10.2218 7.0578C9.9298 6.6048 9.5508 6.33378 9.1948 6.17078ZM8.2878 6.48279C8.3608 6.48279 8.4198 6.54679 8.4198 6.62479C8.4198 6.70379 8.3608 6.76678 8.2878 6.76678C8.2148 6.76678 8.1558 6.70279 8.1558 6.62479C8.1558 6.54679 8.2158 6.48279 8.2878 6.48279ZM7.7688 6.47379C7.8458 6.47379 7.9088 6.54179 7.9088 6.62479C7.9088 6.70779 7.8458 6.77579 7.7688 6.77579C7.6918 6.77579 7.6288 6.70779 7.6288 6.62479C7.6288 6.54179 7.6918 6.47379 7.7688 6.47379ZM8.0098 6.76279C8.3668 6.76279 8.6558 7.00279 8.6558 7.29779C8.6558 7.59379 8.3668 7.8508 8.0098 7.8508C7.6528 7.8508 7.3638 7.59379 7.3638 7.29779C7.3628 7.00279 7.6528 6.76279 8.0098 6.76279ZM6.9778 7.59479C6.9008 7.59479 6.8378 7.52878 6.8378 7.44778C6.8378 7.36678 6.9008 7.30078 6.9778 7.30078C7.0548 7.30078 7.1178 7.36678 7.1178 7.44778C7.1178 7.52978 7.0548 7.59479 6.9778 7.59479ZM7.2368 7.04379C7.1568 7.04379 7.0928 6.97779 7.0928 6.89679C7.0928 6.81579 7.1578 6.74979 7.2368 6.74979C7.3168 6.74979 7.3808 6.81579 7.3808 6.89679C7.3808 6.97779 7.3168 7.04379 7.2368 7.04379ZM7.4888 8.14679C7.4118 8.14679 7.3488 8.08079 7.3488 7.99979C7.3488 7.91879 7.4118 7.85278 7.4888 7.85278C7.5658 7.85278 7.6288 7.91879 7.6288 7.99979C7.6288 8.08179 7.5658 8.14679 7.4888 8.14679ZM8.0328 8.41479C7.9598 8.41479 7.9008 8.35279 7.9008 8.27679C7.9008 8.20079 7.9598 8.13879 8.0328 8.13879C8.1058 8.13879 8.1648 8.20079 8.1648 8.27679C8.1648 8.35279 8.1058 8.41479 8.0328 8.41479ZM8.5518 8.14679C8.4788 8.14679 8.4198 8.08079 8.4198 7.99979C8.4198 7.91879 8.4788 7.85278 8.5518 7.85278C8.6248 7.85278 8.6838 7.91879 8.6838 7.99979C8.6838 8.08179 8.6248 8.14679 8.5518 8.14679ZM8.8118 7.04379C8.7368 7.04379 8.6758 6.97979 8.6758 6.90179C8.6758 6.82279 8.7368 6.7598 8.8118 6.7598C8.8868 6.7598 8.9478 6.82379 8.9478 6.90179C8.9478 6.97979 8.8868 7.04379 8.8118 7.04379ZM9.0788 7.60379C9.0058 7.60379 8.9468 7.53779 8.9468 7.45679C8.9468 7.37579 9.0058 7.30978 9.0788 7.30978C9.1518 7.30978 9.2108 7.37479 9.2108 7.45679C9.2108 7.53779 9.1518 7.60379 9.0788 7.60379Z"
                        fill="white"
                      />
                    </Svg>

                    <Text
                      style={{
                        fontSize: "10px",
                        paddingTop: "2px",
                        flexDirection: "row",
                        fontFamily: `${selectedFont} 400`,
                        color: "#fff",
                        flexWrap: "wrap",
                      }}
                    >
                      {data.dial_code} {data.mobileNumber}
                    </Text>
                  </View>
                )}
                {data?.email && (
                  <View
                    style={{
                      flexDirection: "row",
                      breakAll: true,
                      gap: "8px",
                      justifyContent: "start",
                      alignItems: "center",
                      // marginLeft: "16px",
                      paddingRight: " 4px",
                    }}
                  >
                    <Svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.02365 0.267578C3.92266 0.267578 0.597656 3.59559 0.597656 7.70059C0.597656 11.8056 3.92266 15.1336 8.02365 15.1336C12.1247 15.1336 15.4497 11.8056 15.4497 7.70059C15.4497 3.59559 12.1257 0.267578 8.02365 0.267578Z"
                        fill={selectedColor}
                      />
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.466 5.34375H4.58303L8.16003 8.21875L11.466 5.34375ZM6.58603 7.60977L4.59703 5.79675V9.42276L6.58603 7.60977ZM11.466 9.42276V5.79675L9.63403 7.60977L11.466 9.42276ZM8.26003 8.96976L6.88603 7.97876L4.58203 9.87677H11.465L9.30403 7.96475L8.26003 8.96976Z"
                        fill="white"
                      />
                    </Svg>

                    <Text
                      style={{
                        fontSize: "10px",
                        width: "80%",
                        paddingTop: "2px",
                        flexDirection: "row",
                        fontFamily: `${selectedFont} 400`,
                        color: "#fff",
                        flexWrap: "wrap",
                      }}
                    >
                      {formatLink20(data.email)}
                    </Text>
                  </View>
                )}

                {/* {data?.sociaLinks > 0 && (
                    <View style={{ flexDirection:"row",breakAll:true , gap: "12px", justifyContent:"start" , alignItems: "center", marginLeft: "40px", paddingRight: " 16px" }}>
                        <View style={{ height: "24px", flexDirection:"row", alignItems: "center" }}>
                            <Image style={{ width: "18px", height: "18px" }} src="/images/services/location_blue.png" alt="" />
                        </View>
                        <View style={{ flexDirection:"row", fontSize: "11px", paddingTop: "2px", fontFamily: `${selectedFont} 400`, color: "#fff", }}>{data.sociaLinks}</View>
                    </View>
                )} */}
                {data?.location && (
                  <View
                    style={{
                      flexDirection: "row",
                      breakAll: true,
                      justifyContent: "start",
                      gap: "8px",
                      alignItems: "center",
                      // marginLeft: "16px",
                      paddingRight: " 4px",
                    }}
                  >
                    <Svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.02365 0.763672C3.92266 0.763672 0.597656 4.09166 0.597656 8.19666C0.597656 12.3017 3.92266 15.6297 8.02365 15.6297C12.1247 15.6297 15.4497 12.3017 15.4497 8.19666C15.4497 4.09166 12.1257 0.763672 8.02365 0.763672Z"
                        fill={selectedColor}
                      />
                      <Path
                        d="M8.09231 4.02734C6.41431 4.02734 4.94531 5.39035 4.94531 7.07135C4.94531 8.63035 8.05731 12.3623 8.05731 12.3623C8.05731 12.3623 11.2813 8.68235 11.2813 7.07135C11.2803 5.39035 9.77031 4.02734 8.09231 4.02734ZM8.11231 6.89334C7.58631 6.89334 7.16031 6.46633 7.16031 5.93933C7.16031 5.41233 7.58631 4.98532 8.11231 4.98532C8.63831 4.98532 9.06431 5.41233 9.06431 5.93933C9.06531 6.46633 8.63831 6.89334 8.11231 6.89334Z"
                        fill="white"
                      />
                    </Svg>

                    <Text
                      style={{
                        fontSize: "10px",
                        flexDirection: "row",
                        fontFamily: `${selectedFont} 400`,
                        color: "#fff",
                        flexWrap: "wrap",
                        width: "90%",
                      }}
                    >
                      {formatLink19(data.location)}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {data?.skills?.length > 0 && data?.showSkills === true && (
              <View  wrap={data?.skills?.length > 2 ? true : false}>
                <View                 
                  style={{
                    marginRight: "-12px",
                    marginTop: "4px",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Svg width={180} height={43} viewBox="0 0 180 43">
                    <Path
                      d="M10.942 32.118H179.514V0.887939H10.942L0.782959 16.5029L10.942 32.118Z"
                      fill={selectedColor}
                    />
                    <Path
                      d="M167.942 42.8819L179.514 32.118L167.942 32.1179V42.8819Z"
                      fill={selectedColor}
                    />
                    <Text
                      x="10%"
                      y="40%"
                      dominantBaseline="middle"
                      textAnchor="start"
                      fill="white"
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: "14px",
                      }}
                    >
                      Skills
                    </Text>
                  </Svg>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    color: "white",
                    paddingRight: "16px",
                    gap: "8px",
                    justifyContent: "space-between",
                    // marginLeft: "16px",
                  }}
                >
                  {data?.skills?.slice(0, pageLayout && 3)?.map((detail, index) => (
                    <View
                    wrap={false}
                      key={index}
                      style={{
                        marginLeft: "16px",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                        width:"100%",
                       
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "10px",
                          paddingTop: "2px",
                          flexDirection: "row",
                          fontFamily: `${selectedFont} 400`,
                          color: "#fff",
                          width: "90%",
                          flexWrap: "wrap",
                        }}
                      >
                        {formatLink20(detail.skill)}
                      </Text>
                      {/* <View
                        style={{
                          flexDirection: "row",
                          gap: "8px",
                          marginTop: "4px",
                        }}
                      >
                        {[...Array(3)].map((_, i) => (
                          <View key={i}>
                            {detail.rating[i] === 0 ? (
                              <Svg width={8} height={7} viewBox="0 0 8 7">
                                <Path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.02911 0.285156C2.23911 0.285156 0.789062 1.73615 0.789062 3.52515C0.789062 5.31415 2.24011 6.76514 4.02911 6.76514C5.81811 6.76514 7.2691 5.31415 7.2691 3.52515C7.2691 1.73615 5.81811 0.285156 4.02911 0.285156Z"
                                  fill="#D1D3D4"
                                />
                              </Svg>
                            ) : (
                              <Svg width={8} height={8} viewBox="0 0 8 8">
                                <Path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.02911 0.886719C2.23911 0.886719 0.789062 2.33771 0.789062 4.12671C0.789062 5.91571 2.24011 7.36676 4.02911 7.36676C5.81811 7.36676 7.2691 5.91571 7.2691 4.12671C7.2691 2.33771 5.81811 0.886719 4.02911 0.886719Z"
                                  fill={selectedColor}
                                />
                              </Svg>
                            )}
                          </View>
                        ))}
                      </View> */}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.socialLinks?.length > 0 && data?.showLinks === true && (
              <View style={{ flexDirection: "column", gap: " 16px" }} >
                <View
                  wrap={false}
                  style={{
                    marginRight: "-12px",
                    marginTop: "4px",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Svg width={180} height={43} viewBox="0 0 180 43">
                    <Path
                      d="M10.942 32.118H179.514V0.887939H10.942L0.782959 16.5029L10.942 32.118Z"
                      fill={selectedColor}
                    />
                    <Path
                      d="M167.942 42.8819L179.514 32.118L167.942 32.1179V42.8819Z"
                      fill={selectedColor}
                    />
                    <Text
                      x="10%"
                      y="40%"
                      dominantBaseline="middle"
                      textAnchor="start"
                      fill="white"
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: "14px",
                      }}
                    >
                      LINKS
                    </Text>
                  </Svg>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginLeft: "16px",
                  }}
                >
                  {data?.socialLinks?.slice(0, pageLayout && 2)?.map((item, index) => (
                    <View
                      wrap={false}
                      key={index}
                      style={{
                        color: "white",
                        fontSize: "10px",
                        // width: "90%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <Text style={{ fontFamily: `${selectedFont} 400` }}>
                        {formatLink19(item?.platform)}
                      </Text>
                      <Text
                        style={{
                          fontFamily: `${selectedFont} 400`,
                          // width: "90%",
                          fontSize: "10px",
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
                        {formatLink19(item?.link)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.achievements?.length > 0 &&
              data?.showAchievements === true && !pageLayout && (
                <View style={{ flexDirection: "column", gap: " 16px" }}  wrap={false}>
                  <View
                    wrap={false}
                    style={{
                      marginRight: "-12px",
                      marginTop: "4px",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Svg width={180} height={43} viewBox="0 0 180 43">
                      <Path
                        d="M10.942 32.118H179.514V0.887939H10.942L0.782959 16.5029L10.942 32.118Z"
                        fill={selectedColor}
                      />
                      <Path
                        d="M167.942 42.8819L179.514 32.118L167.942 32.1179V42.8819Z"
                        fill={selectedColor}
                      />
                      <Text
                        x="10%"
                        y="40%"
                        dominantBaseline="middle"
                        textAnchor="start"
                        fill="white"
                        style={{
                          fontFamily: `${selectedFont} 400`,
                          fontSize: "14px",
                        }}
                      >
                        Achievements
                      </Text>
                    </Svg>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      marginLeft: "16px",
                    }}
                  >
                    {data?.achievements?.map((item, index) => (
                      <View
                        wrap={false}
                        key={index}
                        style={{
                          color: "white",
                          fontSize: "10px",
                          width: "90%",
                          flexWrap: "wrap",
                        }}
                      >
                        <Text style={{ fontFamily: `${selectedFont} 400` }}>
                          {formatLink16(item?.title)}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

            {data?.languages?.length > 0 && data?.showLanguage === true && !pageLayout && (
              <View  wrap={false} >
                <View
                  style={{
                    marginRight: "-12px",
                    marginTop: "4px",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Svg width={180} height={43} viewBox="0 0 180 43">
                    <Path
                      d="M10.942 32.118H179.514V0.887939H10.942L0.782959 16.5029L10.942 32.118Z"
                      fill={selectedColor}
                    />
                    <Path
                      d="M167.942 42.8819L179.514 32.118L167.942 32.1179V42.8819Z"
                      fill={selectedColor}
                    />
                    <Text
                      x="10%"
                      y="40%"
                      dominantBaseline="middle"
                      textAnchor="start"
                      fill="white"
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: "14px",
                      }}
                    >
                      LANGUAGES
                    </Text>
                  </Svg>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    color: "white",
                    paddingRight: "16px",
                    gap: "8px",
                    justifyContent: "space-between",
                    // marginLeft: "16px",
                  }}
                >
                  {data?.languages?.map((detail, index) => (
                    <View
                      wrap={false}
                      key={index}
                      style={{
                        marginLeft: "16px",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "10px",
                          paddingTop: "2px",
                          flexDirection: "row",
                          fontFamily: `${selectedFont} 400`,
                          color: "#fff",
                          // width: "90%",
                          // flexWrap: "wrap",
                        }}
                      >
                        {formatLink19(detail.languages)}
                      </Text>
                      {/* <View
                        style={{
                          flexDirection: "row",
                          gap: "8px",
                          marginTop: "4px",
                        }}
                      >
                        {[...Array(3)].map((_, i) => (
                          <View key={i}>
                            {detail.rating[i] === 0 ? (
                              <Svg width={8} height={7} viewBox="0 0 8 7">
                                <Path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.02911 0.285156C2.23911 0.285156 0.789062 1.73615 0.789062 3.52515C0.789062 5.31415 2.24011 6.76514 4.02911 6.76514C5.81811 6.76514 7.2691 5.31415 7.2691 3.52515C7.2691 1.73615 5.81811 0.285156 4.02911 0.285156Z"
                                  fill="#D1D3D4"
                                />
                              </Svg>
                            ) : (
                              <Svg width={8} height={8} viewBox="0 0 8 8">
                                <Path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.02911 0.886719C2.23911 0.886719 0.789062 2.33771 0.789062 4.12671C0.789062 5.91571 2.24011 7.36676 4.02911 7.36676C5.81811 7.36676 7.2691 5.91571 7.2691 4.12671C7.2691 2.33771 5.81811 0.886719 4.02911 0.886719Z"
                                  fill={selectedColor}
                                />
                              </Svg>
                            )}
                          </View>
                        ))}
                      </View> */}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.hobbies?.length > 0 && data?.showHobbies === true && !pageLayout && (
              <View style={{ flexDirection: "column", gap: " 16px" }}  wrap={false}>
                <View
                  wrap={false}
                  style={{
                    marginRight: "-12px",
                    marginTop: "4px",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Svg width={180} height={43} viewBox="0 0 180 43">
                    <Path
                      d="M10.942 32.118H179.514V0.887939H10.942L0.782959 16.5029L10.942 32.118Z"
                      fill={selectedColor}
                    />
                    <Path
                      d="M167.942 42.8819L179.514 32.118L167.942 32.1179V42.8819Z"
                      fill={selectedColor}
                    />
                    <Text
                      x="10%"
                      y="40%"
                      dominantBaseline="middle"
                      textAnchor="start"
                      fill="white"
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: "14px",
                      }}
                    >
                      HOBBIES
                    </Text>
                  </Svg>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginLeft: "16px",
                  }}
                >
                  {data?.hobbies?.map((item, index) => (
                    <View
                      wrap={false}
                      key={index}
                      style={{
                        color: "white",
                        fontSize: "10px",
                        width: "90%",
                        flexWrap: "wrap",
                      }}
                    >
                      <Text style={{ fontFamily: `${selectedFont} 400` }}>
                        {formatLink16(item?.title)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.reference?.length > 0 && data?.showReference === true && !pageLayout && (
              <View style={{ flexDirection: "column", gap: " 16px" }}  wrap={false}>
                <View
                  wrap={false}
                  style={{
                    marginRight: "-12px",
                    marginTop: "4px",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Svg width={180} height={43} viewBox="0 0 180 43">
                    <Path
                      d="M10.942 32.118H179.514V0.887939H10.942L0.782959 16.5029L10.942 32.118Z"
                      fill={selectedColor}
                    />
                    <Path
                      d="M167.942 42.8819L179.514 32.118L167.942 32.1179V42.8819Z"
                      fill={selectedColor}
                    />
                    <Text
                      x="10%"
                      y="40%"
                      dominantBaseline="middle"
                      textAnchor="start"
                      fill="white"
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: "14px",
                      }}
                    >
                      REFERENCES
                    </Text>
                  </Svg>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginLeft: "16px",
                  }}
                >
                  {data?.reference?.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        color: "white",
                        fontSize: "10px",
                        width: "90%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "10px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {formatLink19(item?.referantName)}
                      </Text>
                      <Text
                        style={{
                          fontSize: "10px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {formatLink19(item?.designation)}
                      </Text>
                      <Text
                        style={{
                          fontSize: "10px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {formatLink19(item?.organization)}
                      </Text>
                      <Text
                        style={{
                          fontSize: "10px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {formatLink19(item?.email)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            width: "407px",
            padding: " 16px",
            display: "flex",
            flexDirection: "column",
            gap: "36px",
          }}
        >
          {data?.showSummary === true && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                alignItems: "flex-start",
                paddingTop: "26px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Image
                  style={{
                    width: "27px",
                    height: "27px",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                  src="/images/services/profile_img.png"
                  alt=""
                />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    width: "90%",
                  }}
                >
                  <Text
                    style={{
                      color: "#282829",
                      fontFamily: `${selectedFont} 400`,
                      fontSize: "16px",
                    }}
                  >
                    ABOUT ME
                  </Text>
                  <View
                    style={{
                      height: "1px",
                      width: "95%",
                      backgroundColor: "#282829",
                    }}
                  ></View>
                </View>
              </View>
              <View style={{}}>
                <Text
                  style={{
                    color: "#787879",
                    fontSize: "10px",
                    paddingLeft: 36,
                    fontFamily: `${selectedFont} 400`,
                  }}
                >
                  {data.summery}
                </Text>
              </View>
            </View>
          )}
          {data?.education?.length > 0 && data?.showEducation === true && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                width: "100%",
              }}
            >
              <View style={{ width: "27px" }}>
                <Image
                  style={{ width: "27px", height: "27px" }}
                  src="/images/services/education.png"
                  alt=""
                />
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  width: "90%",
                }}
              >
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <Text
                    style={{
                      color: "#282829",
                      fontFamily: `${selectedFont} 400`,
                      fontSize: "16px",
                    }}
                  >
                    EDUCATION
                  </Text>
                  <View
                    style={{
                      height: "1px",
                      marginTop: "4px",
                      width: "95%",

                      backgroundColor: "#282829",
                    }}
                  ></View>
                </View>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {data?.education?.slice(0, pageLayout && 2)?.map((detail, index) => (
                    <>
                      <View
                        key={index}
                        wrap={false}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                          justifyContent: "space-between",
                          alignItems: "start",
                          width: "95%",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                            alignItems: "start",
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 8,

                              alignItems: "start",
                              width: "75%",
                            }}
                          >
                            <Text style={{ marginTop: "-1px" }}>{">"}</Text>
                            <Text
                              style={{
                                color: "#414042",

                                flexWrap: "wrap",
                                fontSize: "11px",
                                fontFamily: `${selectedFont} 400`,
                              }}
                            >
                              {detail.instituteName}
                            </Text>
                          </View>
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "9px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${detail.duration?.end?.year === "Year"
                                ? "Pursuing"
                                : detail.duration?.end?.year
                              }`}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                          }}
                        >
                          <Text
                            style={{
                              color: "#787879",
                              fontSize: "9px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.qualification} - {detail.specialization}
                          </Text>
                        </View>
                      </View>
                    </>
                  ))}
                </View>
              </View>
            </View>
          )}
          {data?.experience?.length > 0 && data?.showExperience === true && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                width: "100%",
              }}
            >
              <View style={{ width: "27px" }}>
                <Image
                  style={{ width: "27px", height: "27px" }}
                  src="/images/services/experience.png"
                  alt=""
                />
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  width: "95%",
                }}
              >
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <Text
                    style={{
                      color: "#282829",
                      fontFamily: `${selectedFont} 400`,
                      fontSize: "16px",
                    }}
                  >
                    EXPERIENCE
                  </Text>
                  <View
                    style={{
                      height: "1px",
                      marginTop: "4px",
                      width: "95%",
                      backgroundColor: "#282829",
                    }}
                  ></View>
                </View>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {data?.experience?.slice(0, pageLayout && 3)?.map((detail, index) => (
                    <View
                      key={index}
                      wrap={false}
                      style={{ display: "flex", alignItems: "start", gap: 4 }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 8,
                          width: "98%",
                          alignItems: "start",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                            alignItems: "start",
                            width: "70%",
                          }}
                        >
                          <Text style={{ marginTop: "-1px" }}>{">"}</Text>
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "11px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.organization}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: "9px",
                            fontFamily: `${selectedFont} 400`,
                          }}
                        >
                          {detail.duration?.start?.year !== "Year" &&
                            `${detail.duration?.start?.year}-${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                              ? "Present"
                              : detail.duration?.end?.year
                            }
                         `}
                        </Text>
                      </View>

                      <Text
                        style={{
                          color: "#787879",
                          fontSize: "9px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.designation}
                      </Text>
                      <Text
                        style={{
                          color: "#787879",
                          fontSize: "9px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.description}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {data?.project?.length > 0 && data?.showProject === true && !pageLayout && (
                data?.project?.map((detail, index) => (
                  <>
            <View
              key={index}
              wrap={false}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                width: "100%",
              }}
            >
           
              <View style={{ width: "27px" }}>
              {  index === 0 &&
                <Image
                  style={{ width: "27px", height: "27px" }}
                  src="/images/services/Projects.png"
                  alt=""
                />
              }
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  width: "95%",
                }}
              >
{   index === 0 &&
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <Text
                    style={{
                      color: "#282829",
                      fontFamily: `${selectedFont} 400`,
                      fontSize: "16px",
                    }}
                  >
                    Projects
                  </Text>
                  <View
                    style={{
                      height: "1px",
                      marginTop: "4px",
                      width: "95%",
                      backgroundColor: "#282829",
                    }}
                  ></View>
                </View>
}

                <View
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
              
                    <View
                    wrap={false}
                      style={{ display: "flex", alignItems: "start", gap: 4 }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 8,
                          width: "98%",
                          alignItems: "start",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                            alignItems: "start",
                            width: "70%",
                          }}
                        >
                          <Text style={{ marginTop: "-1px" }}>{">"}</Text>
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "11px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.title}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: "9px",
                            fontFamily: `${selectedFont} 400`,
                          }}
                        >
                          {detail.duration?.start?.year !== "Year" &&
                            `${detail.duration?.start?.year}-${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                              ? "Present"
                              : detail.duration?.end?.year
                            }
                         `}
                        </Text>
                      </View>

                      <Text
                        style={{
                          color: "#787879",
                          fontSize: "9px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.organization}
                      </Text>
                      <Text
                        style={{
                          color: "#787879",
                          fontSize: "9px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.description}
                      </Text>
                    </View>
               
                </View>
              </View>
            </View>
            </>
          ))
          )}

          {data?.extraCaricularData?.length > 0 &&
            data?.showExtraCariculam === true &&  !pageLayout &&(
              data?.extraCaricularData?.map((detail, index) => (
                <>
              <View
                key={index}
                wrap={false}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 8,
                  width: "100%",
                }}
              >
                <View style={{ width: "27px" }}>
{  index === 0 &&
                  <Image
                    style={{ width: "27px", height: "27px" }}
                    src="/images/services/Activities.png"
                    alt=""
                  />
                  }
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                    width: "95%",
                  }}
                >
{    index === 0 &&
                  <View
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    <Text
                      style={{
                        color: "#282829",
                        fontFamily: `${selectedFont} 400`,
                        fontSize: "16px",
                      }}
                    >
                      Extra-Curriculum Activities
                    </Text>
                    <View
                      style={{
                        height: "1px",
                        marginTop: "4px",
                        width: "95%",
                        backgroundColor: "#282829",
                      }}
                    ></View>
                  </View>
                  }
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                 
                      <View
                      wrap={false}
                        style={{ display: "flex", alignItems: "start", gap: 4 }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                            width: "98%",
                            alignItems: "start",
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 8,
                              alignItems: "start",
                              width: "70%",
                            }}
                          >
                            <Text style={{ marginTop: "-1px" }}>{">"}</Text>
                            <Text
                              style={{
                                color: "#414042",
                                fontSize: "11px",
                                fontFamily: `${selectedFont} 400`,
                              }}
                            >
                              {detail.title}
                            </Text>
                          </View>
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "9px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                                ? "Present"
                                : detail.duration?.end?.year
                              }
                         `}
                          </Text>
                        </View>

                        <Text
                          style={{
                            color: "#787879",
                            fontSize: "9px",
                            fontFamily: `${selectedFont} 400`,
                          }}
                        >
                          {detail.organization}
                        </Text>
                        <Text
                          style={{
                            color: "#787879",
                            fontSize: "9px",
                            fontFamily: `${selectedFont} 400`,
                          }}
                        >
                          {detail.description}
                        </Text>
                      </View>
                  
                  </View>
                </View>
              </View>
              </>
            ))
            )}

          {data?.internship?.length > 0 && data?.showInternship === true && !pageLayout &&( 
              data?.internship?.map((detail, index) => (
            <View
            key={index}
            wrap= {false}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                width: "100%",
              }}
            >
              <View style={{ width: "27px" }}>
{    index === 0  &&
                <Image
                  style={{ width: "27px", height: "27px" }}
                  src="/images/services/Internship.png"
                  alt=""
                />
                }
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  width: "95%",
                }}
              >

{    index === 0 &&
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <Text
                    style={{
                      color: "#282829",
                      fontFamily: `${selectedFont} 400`,
                      fontSize: "16px",
                    }}
                  >
                    Internships
                  </Text>
                  <View
                    style={{
                      height: "1px",
                      marginTop: "4px",
                      width: "95%",
                      backgroundColor: "#282829",
                    }}
                  ></View>
                </View>
                }
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                 
                    <View
                      wrap= {false}
                      style={{ display: "flex", alignItems: "start", gap: 4 }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 8,
                          width: "98%",
                          alignItems: "start",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                            alignItems: "start",
                            width: "70%",
                          }}
                        >
                          <Text style={{ marginTop: "-1px" }}>{">"}</Text>
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "11px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.title}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: "9px",
                            fontFamily: `${selectedFont} 400`,
                          }}
                        >
                          {detail.duration?.start?.year !== "Year" &&
                            `${detail.duration?.start?.year}-${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                              ? "Present"
                              : detail.duration?.end?.year
                            }
                         `}
                        </Text>
                      </View>

                      <Text
                        style={{
                          color: "#787879",
                          fontSize: "9px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.organization}
                      </Text>
                      <Text
                        style={{
                          color: "#787879",
                          fontSize: "9px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.description}
                      </Text>
                    </View>
                 
                </View>
              </View>
            </View>

             ))
          )}

          {data?.course?.length > 0 && data?.showCourses === true && !pageLayout &&(
       data?.course?.map((detail, index) => (
            <View
            key={index}
            wrap={false}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                width: "100%",
              }}
            >
              <View style={{ width: "27px" }}>
{   index === 0 &&
                <Image
                  style={{ width: "27px", height: "27px" }}
                  src="/images/services/Courses.png"
                  alt=""
                />
                }
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  width: "95%",
                }}
              >
            {    index === 0 &&  
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <Text
                    style={{
                      color: "#282829",
                      fontFamily: `${selectedFont} 400`,
                      fontSize: "16px",
                    }}
                  >
                    Courses & Certifications
                  </Text>
                  <View
                    style={{
                      height: "1px",
                      marginTop: "4px",
                      width: "95%",
                      backgroundColor: "#282829",
                    }}
                  ></View>
                </View>
}
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
               
                    <View
                    wrap={false}
                      style={{ display: "flex", alignItems: "start", gap: 4 }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 8,
                          width: "98%",
                          alignItems: "start",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                            alignItems: "start",
                            width: "70%",
                          }}
                        >
                          <Text style={{ marginTop: "-1px" }}>{">"}</Text>
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "11px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.title}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: "9px",
                            fontFamily: `${selectedFont} 400`,
                          }}
                        >
                          {detail.duration?.start?.year !== "Year" &&
                            `${detail.duration?.start?.year}-${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                              ? "Present"
                              : detail.duration?.end?.year
                            }
                         `}
                        </Text>
                      </View>

                      <Text
                        style={{
                          color: "#787879",
                          fontSize: "9px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.organization}
                      </Text>
                      <Text
                        style={{
                          color: "#787879",
                          fontSize: "9px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.description}
                      </Text>
                    </View>
               
                </View>
              </View>
            </View>
               ))
          )}

          {data.section?.length > 0 &&
            data.showCustomSection === true && !pageLayout &&
            data.section?.map((item, index) => (
              <View
                key={index}
                wrap={false}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "flex-start",
                  paddingTop: "26px",
                }}
              >

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 8,
                    alignItems: "center",
                    width: "100%",
                  }}
                >

{   index === 0 &&
<>
                  <Image
                    style={{
                      width: "27px",
                      height: "27px",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                    src="/images/services/Custom.png"
                    alt=""
                  />
                  
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      width: "90%",
                    }}
                  >
                    <Text
                      style={{
                        color: "#282829",
                        fontFamily: `${selectedFont} 400`,
                        fontSize: "16px",
                      }}
                    >
                      {item?.header}
                    </Text>
                    <View
                      style={{
                        height: "1px",
                        width: "95%",
                        backgroundColor: "#282829",
                      }}
                    ></View>
                  </View>
                  </>
}
                </View>
                <View
                 wrap={false}
                  style={{
                    flexDirection: "column",
                    gap: 8,
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  {item?.subSection?.map((detail, index) => (
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "start",
                        gap: 4,
                        marginLeft: "36px",
                      }}
                    >
                      {detail.title.length > 0 && (
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                            alignItems: "start",

                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 8,
                              alignItems: "start",
                            }}
                          >
                            <Text style={{ marginTop: "-1px" }}>{">"}</Text>
                            <Text
                              style={{
                                color: "#414042",
                                fontSize: "11px",
                                fontFamily: `${selectedFont} 400`,
                                width: "70%",
                              }}
                            >
                              {detail.title}
                            </Text>
                          </View>
                          {detail.duration?.start?.year && (
                            <Text
                              style={{
                                color: "#414042",
                                fontSize: "9px",
                                fontFamily: `${selectedFont} 400`,
                              }}
                            >
                              {detail?.duration?.start?.year}
                              {detail?.duration?.start?.year && "-"}
                              {detail?.duration?.end?.year === "Year" ||
                                detail?.duration?.end?.year === undefined
                                ? "Present"
                                : detail?.duration?.end?.year}
                            </Text>
                          )}
                        </View>
                      )}
                      {detail.description?.length > 5 && (
                        <Text
                          style={{
                            color: "#787879",
                            fontSize: "9px",
                            fontFamily: `${selectedFont} 400`,
                          }}
                        >
                          {detail.description}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            ))}
        </View>
      </View>
    </Page>
  );
}

export default Template4;

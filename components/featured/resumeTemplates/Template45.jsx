import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect, Font, Defs, ClipPath, data } from '@react-pdf/renderer';
import React from 'react'

function Template45({ data,selectedColor,selectedFont  }) {
    return (
        <Page size="A4" style={{ padding: 24,  }}>
            <View style={{ display: "flex", gap: 28, flexDirection: "column" ,minHeight:793.8 }}>
                <View style={{ width: "100%", flexDirection: "row", gap: "16px" }}>
                    <View style={{ display: "flex", width: "338px", flexDirection: "column", gap: "60px" }}>
                        <View style={{ flexDirection: "column", gap: "8px" }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <Text style={{  fontFamily: `${selectedFont} 400`, fontSize: 12, color: "#282829" }}>ABOUT ME</Text>
                                <View style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
                                    <View style={{ height: 2, width: 16, backgroundColor:selectedColor }}></View>
                                    <View style={{ height: 1, width: "100%", backgroundColor: "#939598" }}></View>
                                </View>
                            </View>
                            <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 10, width: "100%", color: "#6D6E71" }}>
                                {data.summery ? <>{data.summery}</> : <>About</>}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "230px", marginTop: -24, marginRight: -15 }}>
                        {data.profilePhoto ? (
                            <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{ width: "230px", marginBottom: "16px", height: "226px", }} />
                        ) : (
                            <Image src="/images/services/profile1.png" alt="" style={{ width: "230px", height: "226px", }} />
                        )}
                    </View>
                </View>
                <View style={{ width: "100%", flexDirection: "row", minHeight: 60, gap: "10px", position: "absolute", top: 141 }}>
                    <View style={{ flexDirection: "column", gap: "10", width: "292" }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 10, color:selectedColor }}>Address :</Text>
                            <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 10, color: "#282829" }}>{data.location ? <>{data.location}</> : <>Your Address</>}</Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
                            <View style={{ flexDirection: "column", gap: 8, width: "100%" }}>
                                <View style={{ flexDirection: "row", gap: 6, width: "100%", alignItems: "center" }}>
                                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M8 1C4.13994 1 1 4.14062 1 8C1 11.8594 4.13994 15 8 15C11.8601 15 15 11.8604 15 8C15 4.14062 11.8591 1 8 1ZM8 14.4394C4.44871 14.4394 1.5602 11.5502 1.5602 8C1.5602 4.4488 4.44871 1.5606 8 1.5606C11.5513 1.5606 14.4398 4.44982 14.4398 8C14.4398 11.5512 11.5503 14.4394 8 14.4394ZM8.00201 3.75843C5.65862 3.75843 3.75977 5.65619 3.75977 7.99595C3.75977 10.3367 5.65963 12.2334 8.00201 12.2334C10.3454 12.2334 12.2453 10.3357 12.2453 7.99595C12.2453 5.65619 10.3454 3.75843 8.00201 3.75843ZM5.40216 5.39971C5.69986 5.10268 6.0398 4.86242 6.41595 4.68197C6.14239 5.0449 5.91509 5.50008 5.75014 6.01912H4.9023C5.04511 5.79609 5.21207 5.58827 5.40216 5.39971ZM4.60761 6.58378H5.6023C5.52687 6.94062 5.47859 7.31977 5.46351 7.71412H4.33707C4.36624 7.32383 4.45675 6.94467 4.60761 6.58378ZM4.33606 8.27878H5.4625C5.47859 8.67212 5.52586 9.05228 5.60129 9.40912H4.60661C4.45675 9.04721 4.36624 8.66907 4.33606 8.27878ZM5.40216 10.5932C5.21207 10.4036 5.04511 10.1968 4.9023 9.97379H5.75014C5.91509 10.4928 6.14239 10.948 6.41595 11.3109C6.0408 11.1305 5.69986 10.8902 5.40216 10.5932ZM7.7194 11.6272C7.59066 11.5897 7.46293 11.5269 7.33721 11.4387C7.10187 11.2734 6.87759 11.019 6.6875 10.7017C6.55575 10.4827 6.4421 10.2394 6.34756 9.97379H7.7204L7.7194 11.6272ZM7.7194 9.40912H6.18161C6.09713 9.04721 6.04583 8.66907 6.02874 8.27878H7.7194V9.40912ZM7.7194 7.71412H6.02874C6.04583 7.32383 6.09713 6.94569 6.18161 6.58378H7.7194V7.71412ZM7.7194 6.01912H6.34655C6.44109 5.75352 6.55575 5.51021 6.68649 5.29022C6.87658 4.97393 7.10086 4.71847 7.33621 4.55323C7.46192 4.46503 7.58966 4.40217 7.71839 4.36466L7.7194 6.01912ZM8.28563 4.36466C8.41437 4.40217 8.5421 4.46503 8.66782 4.55323C8.90316 4.71847 9.12744 4.97291 9.31753 5.29022C9.44928 5.50919 9.56293 5.7525 9.65747 6.0181H8.28463L8.28563 4.36466ZM8.28563 6.58378H9.82442C9.90891 6.94569 9.9602 7.32383 9.9773 7.71412H8.28664V6.58378H8.28563ZM8.28563 8.27878H9.97629C9.95919 8.66907 9.9079 9.04721 9.82342 9.40912H8.28463L8.28563 8.27878ZM8.66782 11.4397C8.5421 11.5279 8.41437 11.5907 8.28563 11.6282V9.97379H9.65848C9.56394 10.2394 9.44928 10.4827 9.31853 10.7017C9.12744 11.019 8.90216 11.2734 8.66782 11.4397ZM10.6029 10.5932C10.3052 10.8902 9.96523 11.1305 9.58908 11.3109C9.86264 10.948 10.0899 10.4928 10.2549 9.97379H11.1027C10.9599 10.1968 10.792 10.4036 10.6029 10.5932ZM11.3974 9.40912H10.4027C10.4782 9.05228 10.5264 8.67313 10.5415 8.27878H11.668C11.6398 8.66907 11.5483 9.04721 11.3974 9.40912ZM11.669 7.71412H10.5425C10.5274 7.32078 10.4792 6.94062 10.4037 6.58378H11.3984C11.5483 6.94467 11.6398 7.32383 11.669 7.71412ZM10.2539 6.01912C10.0889 5.50008 9.86164 5.0449 9.58807 4.68197C9.96422 4.86242 10.3042 5.10268 10.6019 5.39971C10.792 5.58928 10.9589 5.79609 11.1017 6.01912H10.2539Z" fill={selectedColor} />
                                    </Svg>
                                    <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 10, color: "#282829", width: "100%" }}>{data.sociaLinks ? <>{data.sociaLinks}</> : <>Your Websites</>}</Text>
                                </View>
                                <View style={{ flexDirection: "row", gap: 6, width: "100%", alignItems: "center" }}>
                                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M11.684 5.13484C11.5372 5.05365 11.3713 5.00493 11.1922 5.00493H4.99584C4.81681 5.00493 4.65087 5.05467 4.50403 5.13484L8.09453 8.27707L11.684 5.13484ZM4.12385 5.48803C4.02328 5.64738 3.96294 5.83413 3.96294 6.03711V10.1689C3.96294 10.3506 4.01322 10.518 4.09569 10.6662L6.7046 7.74627L4.12385 5.48803ZM8.2635 8.81499C8.21522 8.85761 8.15388 8.87893 8.09354 8.87893C8.03319 8.87893 7.97183 8.85761 7.92356 8.81499L7.09282 8.08728L4.45073 11.0438C4.60964 11.1432 4.79469 11.2031 4.99584 11.2031H11.1922C11.3924 11.2031 11.5784 11.1432 11.7363 11.0438L9.09425 8.08728L8.2635 8.81499ZM9.48348 7.74627L12.0924 10.6662C12.1738 10.518 12.2251 10.3506 12.2251 10.1689V6.03711C12.2251 5.83514 12.1648 5.64738 12.0642 5.48803L9.48348 7.74627ZM8 1C4.13995 1 1 4.14021 1 8C1 11.8598 4.13995 15 8 15C11.8601 15 15 11.8598 15 8C15 4.14021 11.8601 1 8 1ZM8 14.4398C4.44871 14.4398 1.56021 11.5513 1.56021 8C1.56021 4.44875 4.44871 1.56025 8 1.56025C11.5513 1.56025 14.4398 4.44875 14.4398 8C14.4398 11.5513 11.5513 14.4398 8 14.4398Z" fill={selectedColor} />
                                    </Svg>
                                    <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 10, color: "#282829", width: "100%" }}>{data.email ? <>{data.email}</> : <>Your Email</>}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", gap: 6, width: "100%", }}>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.7866 10.0447L10.1493 9.07458H10.1412C10.0849 9.04011 10.0085 9.02288 9.91193 9.02288C9.77615 9.02288 9.65747 9.06851 9.55589 9.15873L9.07213 9.65243C9.06106 9.66358 9.04296 9.67371 9.01681 9.68182C8.99167 9.68993 8.97256 9.695 8.96149 9.695L8.85589 9.67372C8.78549 9.65952 8.68391 9.61796 8.55014 9.55004C8.41738 9.48212 8.25144 9.37567 8.05431 9.23071C7.85618 9.08574 7.62989 8.88298 7.37543 8.62245C7.11494 8.36698 6.9148 8.14193 6.77299 7.94628C6.63118 7.75062 6.52658 7.58437 6.45919 7.44852C6.37974 7.29545 6.32945 7.15859 6.30632 7.03998C6.30632 7.02275 6.31034 7.00145 6.3194 6.97611C6.32744 6.95077 6.3375 6.93251 6.34957 6.92034L6.76494 6.50369C6.83836 6.42969 6.88664 6.33947 6.90876 6.231C6.9319 6.12354 6.91681 6.02418 6.86652 5.93295L5.95833 4.20551C5.91911 4.14265 5.87083 4.09095 5.81451 4.04838C5.75819 4.0058 5.69282 3.9845 5.6194 3.9845C5.51782 3.9845 5.4273 4.02405 5.34784 4.10312L4.2194 5.23549C4.16307 5.28618 4.1148 5.35308 4.07558 5.43519C4.03635 5.51731 4.0102 5.59841 3.99914 5.67748C3.99914 5.68863 3.99612 5.7454 3.99109 5.84779C3.98506 5.95018 3.99713 6.09008 4.02529 6.26951C4.05345 6.44794 4.10776 6.66083 4.18621 6.90819C4.26566 7.15554 4.38434 7.43027 4.54224 7.7344C4.70115 8.03752 4.91034 8.368 5.16983 8.72585C5.43032 9.08371 5.75819 9.45779 6.15445 9.8491C6.6523 10.354 7.12198 10.7513 7.5625 11.0403C8.00402 11.3292 8.39828 11.5461 8.74626 11.6911C9.09425 11.8361 9.38793 11.9263 9.6283 11.9638C9.86868 12.0003 10.0427 12.0195 10.1503 12.0195C10.1955 12.0195 10.2328 12.0185 10.2609 12.0155C10.2891 12.0125 10.3062 12.0114 10.3122 12.0114C10.3917 12.0003 10.4721 11.9749 10.5546 11.9344C10.6361 11.8949 10.7034 11.8462 10.7537 11.7894L11.8822 10.6662C11.9787 10.5699 12.018 10.4563 12.0009 10.3256C11.9767 10.212 11.9053 10.1177 11.7866 10.0447ZM8 1C4.13994 1 1 4.13961 1 8C1 11.8594 4.13994 15 8 15C11.8601 15 15 11.8604 15 8C15 4.14062 11.8591 1 8 1ZM8 14.4394C4.44871 14.4394 1.5602 11.5502 1.5602 8C1.5602 4.4488 4.44871 1.56062 8 1.56062C11.5513 1.56062 14.4398 4.44982 14.4398 8C14.4398 11.5512 11.5503 14.4394 8 14.4394Z" fill={selectedColor} />
                                </Svg>
                                <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 10, color: "#282829", width: "100%" }}>{data.mobileNumber ? (<>{data.mobileNumber}</>) : (<>Your Phone</>)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: 303, backgroundColor:selectedColor, marginRight: -24 }}>
                        <View style={{ paddingVertical: 5, paddingRight: 24, textAlign: "right" }}>
                            <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 26, color: "#FFFFFF" }}>{data.firstName ? <>{data.firstName}</> : <>First Name</>}{" "}{data.lastName ? <>{data.lastName}</> : <>Last Name</>}</Text>
                            <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 12, color: "#FFFFFF" }}>{data.designation ? <>{data.designation}</> : <>Designation</>}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ gap: "24", flexDirection: "row", width: "100%", }}>
                    <View style={{ gap: "36", flexDirection: "column", width: 171 }}>
                        <View style={{ gap: "8px", flexDirection: "column", width: "100%", }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 12, color: "#282829" }}>PERSONAL</Text>
                                <View style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
                                    <View style={{ height: 2, width: 16, backgroundColor:selectedColor }}></View>
                                    <View style={{ height: 1, width: "100%", backgroundColor: "#939598" }}></View>
                                </View>
                            </View>
                            <View style={{ gap: "6px", flexDirection: "column", width: "100%", }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ fontFamily: `${selectedFont} 500`, fontSize: 10, color: "#282829" }}>Birthday             :</Text>
                                    <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 10, color: "#6D6E71" }}>12th January 1991</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ fontFamily: `${selectedFont} 500`, fontSize: 10, color: "#282829" }}>Relationship      :</Text>
                                    <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 10, color: "#6D6E71" }}>Single</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ fontFamily: `${selectedFont} 500`, fontSize: 10, color: "#282829" }}>Nationality        :</Text>
                                    <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 10, color: "#6D6E71" }}>South African</Text>
                                </View>
                                <View style={{ flexDirection: "row", }}>
                                    <Text style={{ fontFamily: `${selectedFont} 500`, fontSize: 10, color: "#282829" }}>Languages         :</Text>
                                    {data.languages?.map((detail, index) => {
                                        <View>
                                            <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 10, color: "#6D6E71" }}> English </Text>
                                        </View>
                                    })}
                                </View>
                            </View>
                        </View>
                        <View style={{ gap: "8px", flexDirection: "column", width: "100%", }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 12, color: "#282829" }}>SKILLS</Text>
                                <View style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
                                    <View style={{ height: 2, width: 16, backgroundColor:selectedColor }}></View>
                                    <View style={{ height: 1, width: "100%", backgroundColor: "#939598" }}></View>
                                </View>
                            </View>
                            <View style={{ gap: "4px", flexDirection: "column", width: "100%", }}>
                                {data.skills?.map((detail, index) => {
                                    const calculateWidthPercentage = (rating) => {
                                        let ratingPercentage = 0;
                                        if (rating && rating.length > 0) {
                                            const zerosCount = rating.filter(
                                                (val) => val === 0
                                            ).length;

                                            if (zerosCount === 0) ratingPercentage = 100;
                                            else if (zerosCount === 1) ratingPercentage = 80;
                                            else if (zerosCount === 2) ratingPercentage = 60;
                                            else if (zerosCount === 3) ratingPercentage = 40;
                                            else if (zerosCount === 4) ratingPercentage = 20;
                                        }
                                        return ratingPercentage;
                                    };

                                    const ratingPercentage = calculateWidthPercentage(
                                        detail.rating
                                    );

                                    return (
                                        <View style={{ paddingRight: 4, flexDirection: "column", width: "100%", }} key={index}>
                                            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                                <Text style={{ fontFamily: `${selectedFont} 400`,color: "#282829", fontSize: 12, width: 80, fontWeight: "light" }}>
                                                    {detail.skill}
                                                </Text>
                                                <View style={{ width: "52.21%", height: 3.78, alignSelf: "flex-end", marginBottom: 1, backgroundColor: "#909395" }}>
                                                    <View
                                                        style={{ height: "100%", backgroundColor:selectedColor, width: `${ratingPercentage}%` }}
                                                    ></View>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                        <View style={{ gap: "8px", flexDirection: "column", width: "100%", }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 12, color: "#282829" }}>SOFTWARE</Text>
                                <View style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
                                    <View style={{ height: 2, width: 16, backgroundColor:selectedColor }}></View>
                                    <View style={{ height: 1, width: "100%", backgroundColor: "#939598" }}></View>
                                </View>
                            </View>
                            <View style={{ gap: "4px", flexDirection: "column", width: "100%", }}>
                                {data.skills?.map((detail, index) => {
                                    const calculateWidthPercentage = (rating) => {
                                        let ratingPercentage = 0;
                                        if (rating && rating.length > 0) {
                                            const zerosCount = rating.filter(
                                                (val) => val === 0
                                            ).length;

                                            if (zerosCount === 0) ratingPercentage = 100;
                                            else if (zerosCount === 1) ratingPercentage = 80;
                                            else if (zerosCount === 2) ratingPercentage = 60;
                                            else if (zerosCount === 3) ratingPercentage = 40;
                                            else if (zerosCount === 4) ratingPercentage = 20;
                                        }
                                        return ratingPercentage;
                                    };

                                    const ratingPercentage = calculateWidthPercentage(
                                        detail.rating
                                    );

                                    return (
                                        <View style={{ paddingRight: 4, flexDirection: "column", width: "100%", }} key={index}>
                                            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                                <Text style={{fontFamily: `${selectedFont} 400`, color: "#282829", fontSize: 12, width: 80, fontWeight: "light" }}>
                                                    {detail.skill}
                                                </Text>
                                                <View style={{ width: "52.21%", height: 3.78, alignSelf: "flex-end", marginBottom: 1, backgroundColor: "#909395" }}>
                                                    <View
                                                        style={{ height: "100%", backgroundColor:selectedColor, width: `${ratingPercentage}%` }}
                                                    ></View>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                        <View style={{ gap: "8px", flexDirection: "column", width: "100%", }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 12, color: "#282829" }}>INTERESTS</Text>
                                <View style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
                                    <View style={{ height: 2, width: 16, backgroundColor:selectedColor }}></View>
                                    <View style={{ height: 1, width: "100%", backgroundColor: "#939598" }}></View>
                                </View>
                            </View>
                            <View style={{ gap: "4px", flexDirection: "column", width: "100%", }}>
                                {data.hobbies?.map((detail, index) => (
                                    <Text key={index} style={{ fontFamily: `${selectedFont} 400`,color: "#282829", fontSize: 12 }}>
                                        {detail.title}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </View>
                    <View style={{ gap: "40", flexDirection: "column", width: 346 }}>
                        <View style={{ gap: "8px", flexDirection: "column", width: "100%", }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <Text style={{fontFamily: `${selectedFont} 400`,fontSize: 12, color: "#282829" }}>EXPERIENCE</Text>
                                <View style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
                                    <View style={{ height: 2, width: 16, backgroundColor:selectedColor }}></View>
                                    <View style={{ height: 1, width: "100%", backgroundColor: "#939598" }}></View>
                                </View>
                            </View>
                            <View style={{ gap: "20px", flexDirection: "column", width: "100%", }}>
                                {
                                    data.experience?.map((detail, index) => (
                                        <View style={{ flexDirection: "row", gap: "12px", width: "100%" }}>
                                            <View style={{ gap: 6, flexDirection: "column", width: 132 }}>
                                                <Text style={{ fontFamily: `${selectedFont} 500`, fontSize: 12, color: "#282829" }}>{detail.designation}</Text>
                                                <Text style={{ fontFamily: `${selectedFont} 400`,fontSize: 10, color: "#6D6E71" }}>{detail.duration?.start?.year}-{" "} <br />
                                                    {detail.currentlyWorking
                                                        ? "Present"
                                                        : detail.duration?.end?.year}
                                                </Text>
                                            </View>
                                            <View style={{ gap: 6, flexDirection: "column", width: "100%" }}>
                                                <Text style={{ fontFamily: `${selectedFont} 500`, fontSize: 12, color: "#282829" }}>{detail.organization}</Text>
                                                <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 12, color: "#6D6E71" }}>{detail.description}</Text>
                                            </View>

                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        <View style={{ gap: "8px", flexDirection: "column", width: "100%", }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <Text style={{fontFamily: `${selectedFont} 400`, fontSize: 12, color: "#282829" }}>EDUCATION</Text>
                                <View style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
                                    <View style={{ height: 2, width: 16, backgroundColor:selectedColor }}></View>
                                    <View style={{ height: 1, width: "100%", backgroundColor: "#939598" }}></View>
                                </View>
                            </View>
                            <View style={{ gap: "20px", flexDirection: "column", width: "100%", }}>
                                {
                                    data.education?.map((detail, index) => (
                                        <View style={{ flexDirection: "row", gap: "12px", width: "100%" }}>
                                            <View style={{ gap: 6, flexDirection: "column", width: 132 }}>
                                                <Text style={{ fontFamily: `${selectedFont} 500`, fontSize: 12, color: "#282829" }}>{detail.instituteName}</Text>
                                                <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 10, color: "#6D6E71" }}>{detail.duration?.start?.year}-{" "} <br />
                                                    {detail.currentlyWorking
                                                        ? "Present"
                                                        : detail.duration?.end?.year}
                                                </Text>
                                            </View>
                                            <View style={{ gap: 6, flexDirection: "column", width: "100%" }}>
                                                <Text style={{ fontFamily: `${selectedFont} 500`, fontSize: 12, color: "#282829" }}>{detail.qualification}</Text>
                                                <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 12, color: "#6D6E71" }}>{detail.specialization}</Text>
                                            </View>

                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ position: "absolute", bottom: 0,margin:-24 }}>
                    <Svg width="595" height="24" viewBox="0 0 595 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M119 0H0V24H119V0Z" fill={selectedColor} />
                        <Path d="M238 0H119V24H238V0Z" fill="#C4132A" />
                        <Path d="M357 0H238V24H357V0Z" fill="#9E071C" />
                        <Path d="M476 0H357V24H476V0Z" fill="#790008" />
                        <Path d="M595 0H476V24H595V0Z" fill="#5E0000" />
                    </Svg>
                </View>
            </View>
        </Page>
    )
}

export default Template45
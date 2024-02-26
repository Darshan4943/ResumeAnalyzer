import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template46({ data,selectedColor,selectedFont  }) {

    return (
        <Page size="A4">
            <View style={{ flexDirection: 'row', gap: "1.5rem" }}>

                <View style={{ width: "207px" }}>
                    <View style={{ flexDirection: "column", minHeight: "841.7px", height: "100%", backgroundColor: "#414042", gap: "18px", paddingHorizontal: 24 }}>
                        <View style={{ alignItems: "center", marginTop: "35px", flexDirection: "column", width: "134px", marginBottom: "16px", height: "134px", borderRadius: "50%" ,border:"4px",borderColor:"#00AEEF",padding:2 }}>

                            {data.profilePhoto ? (
                                <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{ }} />
                            ) : (
                                <Image src="/images/services/profile.png" alt="" style={{ }} />
                            )}


                        </View>
                        <View style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", width: "100%" }}>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4, width: "100%" }}>


                                <Text style={{ color: "#FFFFFF", fontWeight: 500, fontSize: "16px" }}>About me</Text>

                            </View>
                            <View style={{ height: "1px", width: "100%", backgroundColor: "#A7A9AC" }}></View>
                            <View style={{}}>
                                <Text style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 400 }}>{data.summery}</Text>
                            </View>

                        </View>

                        <View style={{ display: "flex", flexDirection: "column", gap: "8" }}>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4, width: "100%" }}>


                                <Text style={{ color: "#FFFFFF", fontWeight: 500, fontSize: "16px" }}>CONTACT</Text>

                            </View>
                            <View style={{ height: "1px", width: "100%", backgroundColor: "#A7A9AC" }}></View>

                            {data?.mobileNumber && (
                                <View style={{ flexDirection: "column", gap: "2px", justifyContent: "start", paddingRight: " 4px", paddingTop: "5px" }}>
                                    <Text style={{ fontSize: "12px", fontWeight: 400, color: "#FFFFFF", }}>Mobile :</Text>
                                    <Text style={{ fontSize: "12px", fontWeight: 400, color: "#FFFFFF", }}>{data.mobileNumber}</Text>
                                </View>
                            )}
                            {data?.email && (
                                <View style={{ flexDirection: "column", breakAll: true, gap: "2px", justifyContent: "start", paddingRight: " 4px" }}>
                                    <Text style={{ fontSize: "12px", fontWeight: 400, color: "#FFFFFF", }}>Email :</Text>
                                    <Text style={{ fontSize: "12px", width: '100%', fontWeight: 400, color: "#FFFFFF", }}>{data.email}</Text>
                                </View>
                            )}

                            {data?.location && (
                                <View style={{ flexDirection: "column", breakAll: true, justifyContent: "start", gap: "2px", paddingRight: " 4px" }}>
                                    <Text style={{ fontSize: "12px", fontWeight: 400, color: "#FFFFFF", }}>Address :</Text>
                                    <Text style={{ fontSize: "12px", flexDirection: "row", fontWeight: 400, color: "#FFFFFF", }}>{data.location}</Text>
                                </View>
                            )}
                        </View>

                        {data?.skills?.length > 0 && (
                            <>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4, width: "100%" }}>


                                    <Text style={{ color: "#FFFFFF", fontWeight: 500, fontSize: "16px" }}>SKILLS</Text>

                                </View>
                                <View style={{ height: "1px", width: "100%", backgroundColor: "#A7A9AC" }}></View>

                                <View
                                    style={{


                                    }}
                                >

                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "12px",
                                        }}
                                    >
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
                                                <View
                                                    key={index}
                                                    style={{
                                                        paddingRight: "12px",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            gap: "16px",
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: "#FFFFFF",
                                                                fontSize: "12px",
                                                                fontWeight: "300",
                                                                width: "80px",
                                                            }}
                                                        >
                                                            {detail.skill}
                                                        </Text>
                                                        <View
                                                            style={{
                                                                width: "59.21%",
                                                                height: "3.78px",
                                                                display: "flex",
                                                                marginBottom: "1px",
                                                                backgroundColor: "#E6E7E8",
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    width: `${ratingPercentage}%`,
                                                                    height: "100%",
                                                                    backgroundColor: "#00AEEF",
                                                                }}
                                                            ></View>
                                                        </View>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                    </View>

                                </View>

                            </>
                        )}




                    </View>
                </View>
                <View style={{ width: "388px", padding: " 16px", display: "flex", flexDirection: "column", gap: "36px" }}>
                    <View style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start", }}>
                        <View style={{ flexDirection: "row", marginTop: 24, gap: 4 }}>
                            <Text style={{ color: "#282829", fontWeight: 400, fontSize: "40", }}>{data.firstName}</Text>
                            <Text style={{ color: "#00AEEF", fontWeight: 400, fontSize: "40", }}>{data.lastName}</Text>
                        </View>
                        <Text style={{ fontSize: "20px", fontWeight: 500, color: "#282829" }}>{data.designation}</Text>

                        <View style={{ width: 36, height: 2, backgroundColor: "#00AEEF" }}></View>

                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 8, width: "100%", paddingTop: 12 }}>

                        <View style={{ display: "flex", flexDirection: "column", gap: 24, width: "90%" }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", width: "100%" }}>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4, width: "100%" }}>
                                   
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M11.991 23C18.0661 23 22.9965 18.0751 23.0033 12C23.0101 5.92487 18.0908 1 12.0156 1C5.9405 1 1.01011 5.92487 1.00331 12C0.996512 18.0751 5.91588 23 11.991 23Z" fill="#00AEEF" />
                                        <Path d="M12.7866 13.0684V12.7343C12.7866 12.3272 12.452 12 12.0393 12C11.6265 12 11.293 12.3272 11.293 12.7343V13.0684C11.293 13.4735 11.6265 13.8027 12.0393 13.8027C12.452 13.8027 12.7866 13.4735 12.7866 13.0684Z" fill="white" />
                                        <Path d="M13.3004 13.659C13.1341 14.1714 12.6352 14.5484 12.0402 14.5484C11.4451 14.5484 10.9463 14.1714 10.78 13.659H5.63408C5.30951 13.659 5.00299 13.587 4.72852 13.4629V16.6949C4.72852 17.3248 5.27346 17.842 5.94162 17.842H18.1407C18.8089 17.842 19.3538 17.3248 19.3538 16.6949V13.4648C19.0784 13.5879 18.7718 13.659 18.4473 13.659H13.3004Z" fill="white" />
                                        <Path d="M18.3951 7.85428H15.4821C15.3078 6.81516 14.3531 6.01758 13.2061 6.01758H10.8721C9.72411 6.01758 8.77045 6.81611 8.59415 7.85428H5.6831C4.98889 7.85428 4.41992 8.37146 4.41992 9.00232V11.6489C4.41992 12.2836 4.96386 12.797 5.63302 12.797H10.7228C10.7389 12.4664 10.8901 12.1699 11.1265 11.9558C11.1325 11.9482 11.1416 11.9444 11.1486 11.9378C11.2017 11.8933 11.2568 11.8497 11.3159 11.8118C11.3369 11.7995 11.3619 11.79 11.384 11.7768C11.4331 11.7503 11.4822 11.7218 11.5332 11.7029C11.5743 11.6858 11.6204 11.6764 11.6635 11.665C11.7025 11.6536 11.7376 11.6394 11.7757 11.6328C11.8598 11.6158 11.949 11.6072 12.0381 11.6072C12.1283 11.6072 12.2154 11.6158 12.3006 11.6328C12.3396 11.6394 12.3747 11.6536 12.4128 11.665C12.4558 11.6764 12.4999 11.6858 12.542 11.7029C12.5951 11.7237 12.6442 11.7503 12.6932 11.7768C12.7153 11.7891 12.7393 11.7986 12.7614 11.8118C12.8205 11.8497 12.8756 11.8933 12.9266 11.9378C12.9337 11.9444 12.9427 11.9492 12.9507 11.9558C13.1881 12.1708 13.3374 12.4664 13.3544 12.797H18.4442C19.1134 12.797 19.6573 12.2835 19.6573 11.6498V9.00138C19.6583 8.37147 19.0903 7.85428 18.3951 7.85428ZM9.76417 7.85428C9.91944 7.41381 10.3552 7.09081 10.8731 7.09081H13.2071C13.725 7.09081 14.1608 7.41287 14.3161 7.85428H9.76417Z" fill="white" />
                                    </Svg>



                                    <Text style={{ color: "#414042", fontWeight: 500, fontSize: "16px" }}>EDUCATION</Text>

                                </View>
                                <View style={{ height: "1px", width: "95%", backgroundColor: "#00AEEF" }}></View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", gap: 16, paddingLeft: 8 }} >
                                {data?.education?.map((detail, index) => (
                                    <>
                                        <View key={index} style={{ display: "flex", flexDirection: "row", gap: 16, alignItems: "start" }}>
                                            <View style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "space-between", width: "30%" }}>


                                                <Text style={{ color: "#414042", fontSize: "11px", fontWeight: 400, }}>{detail.instituteName}</Text>


                                                <Text style={{ color: "#414042", fontSize: "9px", fontWeight: 400, }}>{" "}{detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "column", gap: 4, width: "70%" }}>

                                                <Text style={{ color: "#787879", fontSize: "9px", fontWeight: 400 }}>{detail.qualification} - {detail.specialization}</Text>
                                            </View>

                                        </View>
                                    </>
                                ))}
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 8, width: "100%" }}>


                        <View style={{ display: "flex", flexDirection: "column", gap: 16, width: "90%" }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", width: "100%" }}>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4, width: "100%" }}>
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M11.991 23C18.0661 23 22.9965 18.0751 23.0033 12C23.0101 5.92487 18.0908 1 12.0156 1C5.9405 1 1.01011 5.92487 1.00331 12C0.996512 18.0751 5.91588 23 11.991 23Z" fill="#00AEEF" />
                                        <Path d="M12.7866 13.0684V12.7343C12.7866 12.3272 12.452 12 12.0393 12C11.6265 12 11.293 12.3272 11.293 12.7343V13.0684C11.293 13.4735 11.6265 13.8027 12.0393 13.8027C12.452 13.8027 12.7866 13.4735 12.7866 13.0684Z" fill="white" />
                                        <Path d="M13.3004 13.659C13.1341 14.1714 12.6352 14.5484 12.0402 14.5484C11.4451 14.5484 10.9463 14.1714 10.78 13.659H5.63408C5.30951 13.659 5.00299 13.587 4.72852 13.4629V16.6949C4.72852 17.3248 5.27346 17.842 5.94162 17.842H18.1407C18.8089 17.842 19.3538 17.3248 19.3538 16.6949V13.4648C19.0784 13.5879 18.7718 13.659 18.4473 13.659H13.3004Z" fill="white" />
                                        <Path d="M18.3951 7.85428H15.4821C15.3078 6.81516 14.3531 6.01758 13.2061 6.01758H10.8721C9.72411 6.01758 8.77045 6.81611 8.59415 7.85428H5.6831C4.98889 7.85428 4.41992 8.37146 4.41992 9.00232V11.6489C4.41992 12.2836 4.96386 12.797 5.63302 12.797H10.7228C10.7389 12.4664 10.8901 12.1699 11.1265 11.9558C11.1325 11.9482 11.1416 11.9444 11.1486 11.9378C11.2017 11.8933 11.2568 11.8497 11.3159 11.8118C11.3369 11.7995 11.3619 11.79 11.384 11.7768C11.4331 11.7503 11.4822 11.7218 11.5332 11.7029C11.5743 11.6858 11.6204 11.6764 11.6635 11.665C11.7025 11.6536 11.7376 11.6394 11.7757 11.6328C11.8598 11.6158 11.949 11.6072 12.0381 11.6072C12.1283 11.6072 12.2154 11.6158 12.3006 11.6328C12.3396 11.6394 12.3747 11.6536 12.4128 11.665C12.4558 11.6764 12.4999 11.6858 12.542 11.7029C12.5951 11.7237 12.6442 11.7503 12.6932 11.7768C12.7153 11.7891 12.7393 11.7986 12.7614 11.8118C12.8205 11.8497 12.8756 11.8933 12.9266 11.9378C12.9337 11.9444 12.9427 11.9492 12.9507 11.9558C13.1881 12.1708 13.3374 12.4664 13.3544 12.797H18.4442C19.1134 12.797 19.6573 12.2835 19.6573 11.6498V9.00138C19.6583 8.37147 19.0903 7.85428 18.3951 7.85428ZM9.76417 7.85428C9.91944 7.41381 10.3552 7.09081 10.8731 7.09081H13.2071C13.725 7.09081 14.1608 7.41287 14.3161 7.85428H9.76417Z" fill="white" />
                                    </Svg>

                                    <Text style={{ color: "#282829", fontWeight: 500, fontSize: "16px" }}>EXPERIENCE</Text>

                                </View>
                                <View style={{ height: "1px", width: "95%", backgroundColor: "#00AEEF" }}></View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", gap: 16, paddingLeft: 8 }} >
                                {data?.experience?.map((detail, index) => (
                                    <>
                                        <View key={index} style={{ display: "flex", flexDirection: "row", gap: 16, }}>
                                            <View style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "space-between", width: "30%" }}>


                                                <Text style={{ color: "#414042", fontSize: "11px", fontWeight: 400, }}>{detail.designation}</Text>


                                                <Text style={{ color: "#414042", fontSize: "9px", fontWeight: 400, }}>{detail.duration?.start?.year}-{" "}{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "column", gap: 4, width: "70%" }}>

                                                <Text style={{ color: "#787879", fontSize: "9px", fontWeight: 400 }}>{detail.organization} </Text>
                                                <Text style={{ color: "#787879", fontSize: "9px", fontWeight: 400 }}>{detail.description} </Text>
                                            </View>

                                        </View>
                                    </>
                                ))}
                            </View>

                        </View>
                    </View>


                </View>
            </View>
        </Page>

    )
}

export default Template46



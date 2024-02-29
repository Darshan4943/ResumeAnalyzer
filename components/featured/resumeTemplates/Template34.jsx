import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
import React from "react";

const Template34 = ({ data,selectedColor,selectedFont  }) => {
    return (
        <Page size="A4" style={{ padding: 42 }}>
            <View style={{ gap: 32, marginTop: -42, minHeight: 756,  }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "column", paddingTop: 52, gap: 4 }}>
                        <Text style={{ fontSize: 36,  fontFamily: `${selectedFont} 400`, color: '#6C83B7' }}>{data.firstName ? <>{data.firstName}</> : <>First Name</>}</Text>
                        <Text style={{ fontSize: 36, fontFamily: `${selectedFont} 400`, color: '#6C83B7' }}>{data.lastName ? <>{data.lastName}</> : <>Last Name</>}</Text>
                        <Text style={{ fontSize: 13,  fontFamily: `${selectedFont} 500`, color: '#606060' }}>{data.designation ? <>{data.designation}</> : <>Designation</>}</Text>
                    </View>
                    <View style={{ flexDirection: "column", backgroundColor: selectedColor, gap: 4, paddingBottom: 12, paddingTop: 52, paddingLeft: 41, paddingRight: 16, height: 136, width: 161 }}>
                        <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 300`, color: '#F6F6F6' }}>{data.sociaLinks ? <>{data.sociaLinks}</> : <>Your Websites</>}</Text>
                        <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 300`, color: '#F6F6F6' }}>{data.email ? <>{data.email}</> : <>Your Email</>}</Text>
                        <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 300`, color: '#F6F6F6' }}>{data.mobileNumber ? (<>{data.mobileNumber}</>) : (<>Your Phone</>)}</Text>
                        <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 300`, color: '#F6F6F6' }}>{data.location ? <>{data.location}</> : <>Your Address</>}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "column" }}>
                    <View style={{ width: 492, backgroundColor: selectedColor, height: 1 }}></View>
                    <Text style={{ color: "#000000",  fontFamily: `${selectedFont} 300`, fontSize: "9px", paddingTop: 15, paddingLeft: 16, paddingRight: 16 }}>{data.summery ? <>{data.summery}</> : <>About</>}</Text>
                </View>

                <View style={{ flexDirection: "column", gap: 16 }}>
                    <View style={{ backgroundColor: selectedColor, flexDirection: "row", gap: 4 }}>
                        <Text style={{ color: "#F6F6F6", width: 229, paddingLeft: 12, paddingTop: 4, paddingBottom: 4, fontSize: 12,  fontFamily: `${selectedFont} 700`, }}>Education </Text>
                        <Text style={{ color: "#F6F6F6", width: 229, paddingLeft: 12, paddingTop: 4, paddingBottom: 4, fontSize: 12,  fontFamily: `${selectedFont} 700`, }}>Experience </Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 20 }}>
                        <View style={{ flexDirection: "column", gap: 16 }}>
                            {data?.education?.map((detail, index) => (
                                <View style={{ flexDirection: "column", gap: 6, width: 217, paddingLeft: 12 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 500`, color: "#4C4C4C" }}>{detail.qualification ? (<>{detail.qualification}</>) : (<>Qualification</>)}</Text>
                                        <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 700`, color: selectedColor }}>{detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 300`, color: "#4C4C4C" }}>{detail.instituteName ? (<>{detail.instituteName}</>) : (<>institute Name</>)}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                        <View style={{ flexDirection: "column", gap: 16 }}>
                            {data?.experience?.map((detail, index) => (
                                <View style={{ flexDirection: "column", gap: 6, width: 217, paddingLeft: 12 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 500`, color: "#4C4C4C" }}>{detail.designation ? (<>{detail.designation}</>) : (<>Designation</>)}</Text>
                                        <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 700`, color: selectedColor }}>{detail.duration?.start?.year}-{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>
                                    </View>
                                    <View style={{ flexDirection: "column", gap: 2, }}>
                                        <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 300`, color: "#4C4C4C" }}>{detail.organization ? (<>{detail.organization}</>) : (<>organization</>)}</Text>
                                        <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 300`, color: "#4C4C4C" }}>{detail.description ? (<>{detail.description}</>) : (<>Description</>)}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                <View style={{ backgroundColor: selectedColor, flexDirection: "row", gap: 4 }}>
                    <Text style={{ color: "#F6F6F6", width: 229, paddingLeft: 12, paddingTop: 4, paddingBottom: 4, fontSize: 12,  fontFamily: `${selectedFont} 700`, }}>skills </Text>
                    <Text style={{ color: "#F6F6F6", width: 229, paddingLeft: 12, paddingTop: 4, paddingBottom: 4, fontSize: 12,  fontFamily: `${selectedFont} 700`, }}>Language </Text>
                </View>

                <View style={{ flexDirection: "row", gap: 14 }}>
                    <View style={{ flexDirection: "column", gap: 10, paddingLeft: 12, width: 223 }}>
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
                                                color: "#4C4C4C",
                                                fontSize: "10px",
                                                fontFamily: `${selectedFont} 400`,
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
                                                backgroundColor: "#FFF",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: `${ratingPercentage}%`,
                                                    height: "100%",
                                                    backgroundColor: selectedColor,
                                                }}
                                            ></View>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                    <View style={{ flexDirection: "column", gap: 10, paddingLeft: 12, width: 223 }}>
                        {data.languages?.map((detail, index) => {
                            const calculateWidthPercentage = (rating) => {
                                let ratingPercentage = 0;
                                if (rating && rating.length > 0) {
                                    const zerosCount = rating.filter(
                                        (val) => val === 0
                                    ).length;

                                    if (zerosCount === 0) ratingPercentage = 100;
                                    else if (zerosCount === 1) ratingPercentage = 66;
                                    else if (zerosCount === 2) ratingPercentage = 33;
                                }
                                return ratingPercentage;
                            };
                            const ratingPercentage = calculateWidthPercentage(
                                detail.rating
                            );
                            return (
                                <View style={{ width: "100%", flexDirection: "column" }} key={index}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                        <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 400`, color: "#4C4C4C" }}>{detail.languages}
                                        </Text>
                                        <View style={{ width: "59.21%", height: 3.78, alignSelf: "flex-end", marginBottom: 1, backgroundColor: "#fff" }}>
                                            <View
                                                style={{ height: "100%", backgroundColor: selectedColor, width: `${ratingPercentage}%` }}
                                            ></View>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
                <View style={{ height: 1, width: 491, backgroundColor: selectedColor }}></View>
            </View>
        </Page>
    );
};

export default Template34;
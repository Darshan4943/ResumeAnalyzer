import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect, Font, Defs, ClipPath } from '@react-pdf/renderer';
function Template14({ data }) {
    return (
        <Page size="A4" style={{ padding: "24px" }}>
            <View style={{ minHeight: 792, display: "flex", flexDirection: "column", gap: 16 }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", }}>
                    <View style={{ width: 400.06, display: "flex", flexDirection: "column", gap: 10 }}>
                        <Text style={{ fontSize: 32, fontWeight: "700", color: "#242424" }}>John Doe</Text>
                        <Text style={{ width: "100%", fontSize: 12, fontWeight: "400", color: "#4D4D4D" }}>
                            Leading teams and organizations to the realization of successful outcomes at the intersection of customer needs and business goals.
                        </Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 12, fontWeight: "400", color: "#4D4D4D" }}>johndoe.com</Text>
                        <Text style={{ fontSize: 12, fontWeight: "400", color: "#4D4D4D" }}>hello@johndoe.com</Text>
                        <Text style={{ fontSize: 12, fontWeight: "400", color: "#4D4D4D" }}>(310) 555 - 9572</Text>
                    </View>
                </View>
                <View style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}></View>
                <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <Text style={{ fontSize: 12, fontWeight: "500", color: "#D4D4D4", }}>SKILLS</Text>
                    <View style={{ display: "flex", flexWrap: "wrap" }}>
                        {data?.skills?.map((detail, index) => (
                            <View key={index} style={{ flex: "25%", display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: "400", color: "#D4D4D4", }}>
                                {detail}
                            </View>
                        ))}
                    </View>
                </View>
                <View style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}></View>
                <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <Text style={{ fontSize: 12, fontWeight: "500", color: "#4D4D4D" }}>EXPERIENCE</Text>
                    <View style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                        {data?.experience?.map((detail, index) => (
                            <View key={index} style={{ gap: 6, display: "flex", flexDirection: "column" }}>
                                <View style={{ display: "flex", gap: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "600", color: "#242424" }}>apple</Text>
                                    <Text style={{ fontSize: 18, fontWeight: "400", color: "#989898" }}>Staff Product Designer</Text>
                                </View>
                                <View style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "400", color: "#4D4D4D" }}>January 2018 — Present</Text>
                                    <Text style={{ fontSize: 12, fontWeight: "400", color: "#989898" }}>Palo Alto, CA</Text>
                                </View>
                                <Text style={{ fontSize: 12, fontWeight: "400", color: "#4D4D4D" }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor, sodales volutpat augue nunc quisque lorem. Tincidunt viverra fermentum, nunc tortor sollicitudin tortor. Lorem nascetur ultrices lacus, nunc turpis lacinia placerat.
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}></View>
                <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <Text style={{ fontSize: 12, fontWeight: "500", color: "#4D4D4D" }}>EDUCATION</Text>
                    <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {data?.education?.map((detail, index) => (
                            <View key={index} style={{ gap: 6, display: "flex", flexDirection: "column" }}>
                                <Text style={{ fontSize: 18, fontWeight: "600", color: "#242424" }}>B.S. Human Computer Interaction</Text>
                                <View style={{ display: "flex", gap: 14.64 }}>
                                    <Text style={{ fontSize: 12 }}>January 2006 — 2010</Text>
                                    <View style={{ width: 1, backgroundColor: "#DEDEDE" }}></View>
                                    <Text>Rhode Island School of Design (RISD)</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}></View>
                <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <Text style={{ fontSize: 12, fontWeight: "500", color: "#4D4D4D" }}>CERTIFICATION</Text>
                    <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {data?.course?.map((detail, index) => (
                            <View key={index} style={{ gap: 6, display: "flex", flexDirection: "column" }}>
                                <Text style={{ fontSize: 18, fontWeight: "600", color: "#242424" }}>UX Google Certificate</Text>
                                <View style={{ display: "flex", gap: 14.64 }}>
                                    <Text style={{ fontSize: 12 }}>January 2006 — 2010</Text>
                                    <View style={{ width: 1, backgroundColor: "#DEDEDE" }}></View>
                                    <Text>Google</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}></View>
                <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
                    <View style={{ display: "flex", flexDirection: "column", width: "50%", gap: 12 }}>
                        <Text style={{ fontSize: 12, fontWeight: "500", color: "#4D4D4D" }}> HOBBIES</Text>
                        <View style={{ display: "flex", gap: 4 }}>
                            {data?.hobbies?.map((detail, index) => (
                                <Text key={index} style={{ fontSize: 12, fontWeight: "400", color: "#4D4D4D" }}>
                                    {detail.hobbies}
                                </Text>
                            ))}
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "column", width: "50%", gap: 12 }}>
                        <Text style={{ fontSize: 12, fontWeight: "500", color: "#4D4D4D" }}>LANGUAGES</Text>
                        <View style={{ display: "flex", gap: 4 }}>
                            {data?.languages?.map((detail, index) => (
                                <Text key={index} style={{ fontSize: 12, fontWeight: "400", color: "#4D4D4D" }}>
                                    {detail.languages}
                                </Text>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    )
}

export default Template14
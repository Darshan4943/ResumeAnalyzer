import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template13({ data,selectedColor,selectedFont  }) {
    return (
        <Page size="A4" style={{ padding: 24, }}>
            <View
                style={{



                }}
            >

                <View style={{ flexDirection: "column", gap: 24 }}>
                    <View style={{ flexDirection: "row", gap: 24, backgroundColor: "#F9F9F9", margin: -24, padding: 24 }}>
                        <View style={{ flexDirection: "column", width: 314 }}>
                            <Text
                                style={{
                                    fontSize: 34,
                                   fontFamily: `${selectedFont} 700`,
                                    color: "#333333",
                                    marginBottom: 4,
                                }}
                            >
                                {data.firstName} {data.lastName}
                            </Text>
                            <View style={{ flexDirection: "column", gap: 14 }}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                       fontFamily: `${selectedFont} 500`,
                                        color: "#0E6CC2",
                                    }}
                                >{data.designation}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                       fontFamily: `${selectedFont} 400`,
                                        color: "#333333",
                                    }}
                                >
                                    {data.summery}
                                </Text>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: "column",
                                justifyContent: "space-between",


                                paddingTop: 24,
                                backgroundColor: "#F9F9F9",
                                gap: 16
                            }}
                        >
                            <View style={{
                                flexDirection: "column",
                                gap: 8
                            }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                       fontFamily: `${selectedFont} 500`,
                                        color: "#949494",
                                    }}
                                >
                                    Email
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                       fontFamily: `${selectedFont} 600`,
                                        color: "#333333",
                                    }}
                                >
                                    {data.email}
                                </Text>

                            </View>
                            <View style={{
                                flexDirection: "column",
                                gap: 8
                            }}>

                                <Text
                                    style={{
                                        fontSize: 14,
                                       fontFamily: `${selectedFont} 500`,
                                        color: "#949494",
                                    }}
                                >
                                    Location
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                       fontFamily: `${selectedFont} 600`,
                                        color: "#333333",
                                    }}
                                >
                                    {data.location}
                                </Text>

                            </View>
                            <View style={{
                                flexDirection: "column",
                                gap: 8
                            }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                       fontFamily: `${selectedFont} 500`,
                                        color: "#949494",
                                    }}
                                >
                                    Phone
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                       fontFamily: `${selectedFont} 600`,
                                        color: "#333333",
                                    }}
                                >
                                    {data.mobileNumber}
                                </Text>
                            </View>
                        </View>

                    </View>


                    <View style={{ flexDirection: "row", gap: 24, paddingTop: 24 }}>

                        <View style={{ flexDirection: "column", gap: 16, width: 261 }} >
                            <Text
                                style={{
                                    fontSize: 20,
                                   fontFamily: `${selectedFont} 500`,
                                    color: "#0E6CC2",

                                }}
                            >
                                Work experience
                            </Text>
                            {data.experience.map((detail, index) => (
                                <View style={{ flexDirection: "column", gap: 16 }}  >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                           fontFamily: `${selectedFont} 700`,
                                            color: "#333333",
                                        }}
                                    >
                                        {detail.designation}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                           fontFamily: `${selectedFont} 400`,
                                            color: "#797979",
                                        }}
                                    >
                                        {detail.organization}  {detail.duration?.start?.year} -
                                        {detail.duration?.end?.year == undefined || "Year" ? "Present" : detail.duration?.end?.year}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                           fontFamily: `${selectedFont} 400`,
                                            color: "#333333",
                                        }}
                                    >
                                        {detail.description}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <View style={{ flexDirection: "column", gap: 24, width: 261 }}>

                            <View style={{ flexDirection: "column", gap: 16 }} >
                                <Text
                                    style={{
                                        fontSize: 20,
                                       fontFamily: `${selectedFont} 500`,
                                        color: "#0E6CC2",
                                    }}
                                >
                                    Education & Learning
                                </Text>
                                {data.education.map((detail, index) => (
                                    <View style={{ flexDirection: "column", gap: 8 }}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                               fontFamily: `${selectedFont} 700`,
                                                color: "#333333"
                                            }}
                                        >
                                            {detail.qualification} {detail.specialization}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                               fontFamily: `${selectedFont} 400`,
                                                color: "#797979"
                                            }}
                                        >
                                            {detail.instituteName} {detail.duration?.start?.year}-
                                            {detail.duration?.end?.year}
                                        </Text>
                                    </View>
                                ))}


                            </View>

                            {/* Skills */}
                            {data.skills.length > 0 &&
                                <View style={{ flexDirection: "column", gap: 16 }}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                           fontFamily: `${selectedFont} 500`,
                                            color: "#0E6CC2",
                                        }}
                                    >
                                        SKILLS
                                    </Text>
                                    <View style={{ flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
                                        {data.skills.map((detail, index) => (

                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                   fontFamily: `${selectedFont} 400`,
                                                    color: "#333333",
                                                    lineHeight: 1.2
                                                }}
                                            >
                                                {detail.skill},

                                            </Text>
                                        ))}
                                    </View>

                                </View>
                            }
                            {/* Languages */}
                            {data.languages.length > 0 &&
                                <View style={{ flexDirection: "column", gap: 16 }}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                           fontFamily: `${selectedFont} 500`,
                                            color: "#0E6CC2",
                                        }}
                                    >
                                        Languages
                                    </Text>
                                    <View style={{ flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
                                        {data.languages.map((detail, index) => (

                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                   fontFamily: `${selectedFont} 400`,
                                                    color: "#333333",
                                                    lineHeight: 1.2
                                                }}
                                            >
                                                {detail.languages},

                                            </Text>
                                        ))}
                                    </View>

                                </View>
                            }

                            {data.hobbies.length > 0 &&
                                <View style={{ flexDirection: "column", gap: 16 }}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                           fontFamily: `${selectedFont} 500`,
                                            color: "#0E6CC2",
                                        }}
                                    >
                                        Interests
                                    </Text>
                                    <View style={{ flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
                                        {data.hobbies.map((detail, index) => (

                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                   fontFamily: `${selectedFont} 400`,
                                                    color: "#333333",
                                                    lineHeight: 1.2
                                                }}
                                            >
                                                {detail.title},

                                            </Text>
                                        ))}
                                    </View>

                                </View>
                            }
                        </View>
                    </View>


                </View>
            </View>
        </Page>
    )
}

export default Template13
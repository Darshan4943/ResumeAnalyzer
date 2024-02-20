import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect, Font, Defs, ClipPath, data } from '@react-pdf/renderer';
import React from 'react'

const Template48 = ({ data }) => {

    return (
        <Page size="A4" style={{ padding: 24 }}>
            <View style={{ minHeight: 793.8 }}>

                {/* <View style={{ margin: -24, height: 150, backgroundColor: "#F1F2F2", paddingLeft: 24,paddingRight:72, paddingVertical: 18, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                   
                    <View style={{ display: "flex", flexDirection: "column", paddingVertical: 10 }}>
                     
                        <Text style={{ fontWeight: 600, fontSize: 32, color: "#F7941D",paddingTop:8 }}>{data.firstName}</Text>
                        <Text style={{ fontWeight: 400, fontSize: 32, color: "#414042" }}>{data.lastName}</Text>
                        <Text style={{ fontWeight: 400, fontSize: 14, color: "#58595B" }}>{data.designation}</Text>
                    </View>
                    <View style={{ width: 114, height: 114 }}><Image src="/images/services/Ellipse_24.png"></Image></View>
                </View> */}

                <Svg style={{ margin: -24, }} width="595" height="132" viewBox="0 0 595 132" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M595 0H0V132H595V0Z" fill="#F1F2F2" />
                    <Path d="M295 132H0V0H366L295 132Z" fill="#E6E7E8" />
                    <Path d="M60 0H28V18H60V0Z" fill="#F7941D" />
                </Svg>
                <View style={{ display: "flex", position: "absolute", flexDirection: "column", }}>

                    <Text style={{ fontWeight: 600, fontSize: 32, color: "#F7941D", }}>{data.firstName}</Text>
                    <Text style={{ fontWeight: 400, fontSize: 32, color: "#414042" }}>{data.lastName}</Text>
                    <Text style={{ fontWeight: 400, fontSize: 14, color: "#58595B" }}>{data.designation}</Text>
                </View>
                <View style={{ width: 106, height: 106, position: "absolute", right: 48, top: -12 }}>
                    {data.profilePhoto ? (
                        <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{}} />
                    ) : (
                        <Image src="/images/services/profile.png" alt="" style={{}} />
                    )}

                </View>


                <View style={{ paddingTop: 16, marginTop: 24, gap: 24, display: "flex", flexDirection: "row" }}>

                    <View style={{ width: 176, display: "flex", flexDirection: "column", gap: 24 }}>
                        <View style={{ display: "flex", flexDirection: "column", gap: 12, }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 6, justifyContent: "start", alignItems: "center" }}>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M13.995 11.4698C14.0205 11.6654 13.961 11.8345 13.8175 11.9781L12.1282 13.6561C12.0517 13.7411 11.9526 13.8129 11.8298 13.8725C11.7071 13.932 11.5862 13.9698 11.4682 13.9868C11.4597 13.9868 11.4342 13.9887 11.3917 13.9934C11.3492 13.9981 11.2945 14 11.2265 14C11.0659 14 10.8053 13.9726 10.4456 13.9169C10.0849 13.8621 9.64486 13.726 9.12458 13.5096C8.6043 13.2933 8.0132 12.9692 7.35223 12.5374C6.69126 12.1057 5.98873 11.5114 5.24278 10.7584C4.64979 10.1735 4.15878 9.6142 3.76881 9.08038C3.37978 8.54657 3.06629 8.05337 2.82834 7.59987C2.59133 7.14636 2.41382 6.73537 2.29484 6.3669C2.17681 5.99842 2.0956 5.68097 2.05311 5.41358C2.01062 5.1462 1.99363 4.9374 2.00212 4.78434C2.01062 4.63223 2.0144 4.5472 2.0144 4.53019C2.0314 4.41115 2.06917 4.29115 2.12865 4.16738C2.18814 4.04456 2.2599 3.94536 2.34489 3.86883L4.03414 2.17761C4.15218 2.05951 4.28815 2 4.44111 2C4.55159 2 4.64885 2.03117 4.73289 2.09447C4.81787 2.15777 4.88963 2.2362 4.94912 2.32974L6.30883 4.91C6.38532 5.0451 6.40609 5.19345 6.3721 5.35501C6.33811 5.51563 6.26634 5.65167 6.15587 5.76127L5.53361 6.38391C5.51661 6.40092 5.5015 6.42831 5.48923 6.46705C5.47601 6.50484 5.47034 6.53696 5.47034 6.56247C5.50434 6.7401 5.57988 6.94324 5.69885 7.17188C5.80083 7.37501 5.95758 7.62349 6.16909 7.91638C6.3806 8.20833 6.68181 8.54563 7.07084 8.92638C7.45137 9.31659 7.7913 9.61893 8.08685 9.83529C8.38335 10.0507 8.63074 10.2104 8.82997 10.3124C9.02921 10.4135 9.18123 10.4759 9.28699 10.4967L9.44562 10.5288C9.46262 10.5288 9.49 10.5222 9.52872 10.5099C9.56649 10.4976 9.59387 10.4825 9.61181 10.4655L10.336 9.72853C10.489 9.59342 10.6665 9.52539 10.8695 9.52539C11.0131 9.52539 11.1283 9.5509 11.2123 9.60192H11.2255L13.6777 11.0513C13.8553 11.1599 13.961 11.2997 13.995 11.4698Z" fill="#414042" />
                                </Svg>

                                <Text style={{ fontSize: 10, fontWeight: 500, color: "#414042" }}>{data.mobileNumber}</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", gap: 6, justifyContent: "start", alignItems: "center" }}>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M14 11.0004C14 11.2634 13.9261 11.5074 13.8077 11.722L10.0188 7.48225L13.7664 4.20252C13.9118 4.43378 14 4.70557 14 4.99961V11.0004ZM7.9996 8.25232L13.2141 3.68914C13.0003 3.57153 12.7588 3.5 12.4989 3.5H3.4995C3.23886 3.5 2.99808 3.57153 2.78511 3.68914L7.9996 8.25232ZM9.45381 7.97655L8.24674 9.03351C8.17601 9.0947 8.08781 9.12569 7.9996 9.12569C7.9114 9.12569 7.82319 9.09471 7.75247 9.03272L6.54539 7.97577L2.70883 12.2695C2.93848 12.4134 3.20866 12.5 3.5003 12.5H12.5005C12.7921 12.5 13.0615 12.4134 13.2912 12.2695L9.45381 7.97655ZM2.23363 4.20331C2.08821 4.43457 2 4.70636 2 5.0004V11.0004C2 11.2634 2.07311 11.5074 2.1923 11.722L5.9804 7.48225L2.23363 4.20331Z" fill="#414042" />
                                </Svg>

                                <Text style={{ fontSize: 10, fontWeight: 500, color: "#414042" }}>{data.email}</Text>
                            </View >

                            <View style={{ display: "flex", flexDirection: "row", gap: 6, justifyContent: "start", alignItems: "center" }}>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.00008 1.14258C5.4786 1.14258 3.42773 3.17754 3.42773 5.67857C3.42773 6.68606 4.07596 8.32859 5.40994 10.7006C6.35297 12.3777 7.28136 13.7767 7.31981 13.8348L7.99916 14.8569L8.67851 13.8348C8.71788 13.7767 9.64535 12.3777 10.5884 10.7006C11.9224 8.3295 12.5706 6.68698 12.5706 5.67948C12.5724 3.17755 10.5215 1.14258 8.00008 1.14258ZM8.00008 8.00062C6.69082 8.00062 5.63059 6.94771 5.63059 5.6486C5.63059 4.34948 6.69173 3.29657 8.00008 3.29657C9.30842 3.29657 10.3705 4.34948 10.3705 5.6486C10.3705 6.9468 9.30934 8.00062 8.00008 8.00062Z" fill="#414042" />
                                </Svg>

                                <Text style={{ fontSize: 10, fontWeight: 500, color: "#414042" }}>{data.location}</Text>
                            </View>
                        </View>


                        <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                <Text style={{ fontSize: 14, fontWeight: 400, color: "#383839" }}>SKILSS</Text>
                                <Svg width="176" height="2" viewBox="0 0 176 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M36 0H0V2H36V0Z" fill="#58595B" />
                                    <Path d="M176 0.5H36V1.5H176V0.5Z" fill="#A7A9AC" />
                                </Svg>
                            </View>

                            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {data?.skills?.map((detail, index) => (
                                    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                                        <Svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M5.99023 3.49944L-0.00976562 0V7L5.99023 3.49944Z" fill="#F7941D" />
                                        </Svg>


                                        <Text style={{ fontSize: 10, fontWeight: 400, color: "#58595B" }}>{detail.skill}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                <Text style={{ fontSize: 14, fontWeight: 400, color: "#383839" }}>LANGUAGES</Text>
                                <Svg width="176" height="2" viewBox="0 0 176 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M36 0H0V2H36V0Z" fill="#58595B" />
                                    <Path d="M176 0.5H36V1.5H176V0.5Z" fill="#A7A9AC" />
                                </Svg>
                            </View>

                            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {data?.languages?.map((detail, index) => (
                                    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                                        <Svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M5.99023 3.49944L-0.00976562 0V7L5.99023 3.49944Z" fill="#F7941D" />
                                        </Svg>
                                        <Text style={{ fontSize: 10, fontWeight: 400, color: "#58595B" }}>{detail.languages}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                <Text style={{ fontSize: 14, fontWeight: 400, color: "#383839" }}>HOBBIES</Text>
                                <Svg width="176" height="2" viewBox="0 0 176 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M36 0H0V2H36V0Z" fill="#58595B" />
                                    <Path d="M176 0.5H36V1.5H176V0.5Z" fill="#A7A9AC" />
                                </Svg>
                            </View>

                            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {data?.hobbies?.map((detail, index) => (
                                    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                                        <Svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M5.99023 3.49944L-0.00976562 0V7L5.99023 3.49944Z" fill="#F7941D" />
                                        </Svg>

                                        <Text style={{ fontSize: 10, fontWeight: 400, color: "#58595B" }}>{detail.title}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>



                    </View>




                    <View style={{ width: 346, display: "flex", flexDirection: "column", gap: 14 }}>
                        <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                                <Text style={{ fontSize: 14, fontWeight: 400, color: "#383839" }}>About Me</Text>
                                <Svg width="176" height="2" viewBox="0 0 176 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M36 0H0V2H36V0Z" fill="#58595B" />
                                    <Path d="M176 0.5H36V1.5H176V0.5Z" fill="#A7A9AC" />
                                </Svg>
                            </View>

                            <View>
                                <Text style={{ fontSize: 10, fontWeight: 400, color: "#58595B" }}>{data.summery}</Text>
                            </View>
                        </View>


                        <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <View style={{ display: "flex", flexDirection: "col", gap: 4 }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center" }}>
                                    <Image style={{ width: "21px", height: "21px" }} src="/images/services/experience.png" alt="" />
                                    <Text style={{ fontSize: 14, fontWeight: 400, color: "#383839" }}>Experience</Text>
                                </View>
                                <Svg width="176" height="2" viewBox="0 0 176 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M36 0H0V2H36V0Z" fill="#58595B" />
                                    <Path d="M176 0.5H36V1.5H176V0.5Z" fill="#A7A9AC" />
                                </Svg>
                            </View>
                            <View style={{ flexDirection: "column", gap: 6 }}>
                                {data?.experience?.map((detail, index) => (
                                    <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
                                        <Svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M5.99023 3.49944L-0.00976562 0V7L5.99023 3.49944Z" fill="#F7941D" />
                                        </Svg>
                                        <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                            <View><Text style={{ fontWeight: 400, fontSize: 12, color: "#414142" }}>{detail.designation}</Text></View>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
                                                <Text style={{ fontWeight: 400, fontSize: 10, color: "#414142", width: 156 }}>{detail.organization} | {detail.location}</Text>
                                                <Text style={{ fontWeight: 400, fontSize: 10, color: "#414142" }}>{detail.duration?.start?.year} -
                                                    {detail.duration?.end?.year == undefined || "Year" ? "Present" : detail.duration?.end?.year}</Text>
                                            </View>
                                            <View><Text style={{ fontWeight: 400, fontSize: 10, color: "#58595B", paddingBottom: 16 }}>{detail.description}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>

                        </View>

                        <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <View style={{ display: "flex", flexDirection: "col", gap: 4 }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                    <Svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M10.4971 20.125C15.8108 20.125 20.1201 15.8158 20.1221 10.5C20.1241 5.18428 15.818 0.875 10.5042 0.875C5.19046 0.875 0.881212 5.18428 0.879237 10.5C0.877262 15.8158 5.18331 20.125 10.4971 20.125Z" fill="#383839" />
                                        <Path d="M11.3965 13.2323C11.1469 13.3859 10.8267 13.4705 10.4954 13.4705C10.164 13.4705 9.84388 13.3859 9.5943 13.2323L5.51485 10.7241C5.51485 10.7241 5.14648 10.498 5.14648 11.0105V13.5153C5.14648 14.8346 7.54166 16.2566 10.4954 16.2566C13.4491 16.2566 15.8443 14.8346 15.8443 13.5153V10.869C15.8443 10.4574 15.5827 10.6585 15.5827 10.6585L11.3965 13.2323Z" fill="white" />
                                        <Path d="M17.2796 8.72627C17.5929 8.53386 17.5929 8.21808 17.2796 8.02567L11.0649 4.90993C10.7516 4.71752 10.2386 4.71752 9.92537 4.90993L3.71152 8.02567C3.39824 8.21808 3.39824 8.53386 3.71152 8.72627L9.92537 12.5469C10.2386 12.7393 10.7516 12.7393 11.0649 12.5469" fill="white" />
                                        <Path d="M17.0239 14.3908V10.1707C17.0239 10.1707 17.0265 9.97051 16.9086 10.0369C16.8139 10.0896 16.5816 10.2199 16.4989 10.2915C16.4043 10.3735 16.4258 10.559 16.4258 10.559V14.3908C16.4258 14.4452 16.3793 14.4711 16.3569 14.484C16.1418 14.6109 15.998 14.8447 15.998 15.1122C15.998 15.5151 16.3234 15.8413 16.7253 15.8413C17.1272 15.8413 17.4525 15.5151 17.4525 15.1122C17.4525 14.843 17.3071 14.6091 17.0911 14.4823C17.0687 14.4702 17.0239 14.4452 17.0239 14.3908Z" fill="white" />
                                    </Svg>

                                    <Text style={{ fontSize: 14, fontWeight: 400, color: "#383839" }}>Education </Text>
                                </View>
                                <Svg width="176" height="2" viewBox="0 0 176 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M36 0H0V2H36V0Z" fill="#58595B" />
                                    <Path d="M176 0.5H36V1.5H176V0.5Z" fill="#A7A9AC" />
                                </Svg>
                            </View>
                            {data?.education?.map((detail, index) => (
                                <View>
                                    <View style={{ flexDirection: "row", gap: 16, }}>
                                        <Svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M5.99023 3.49944L-0.00976562 0V7L5.99023 3.49944Z" fill="#F7941D" />
                                        </Svg>
                                        <Text style={{ fontWeight: 400, fontSize: 12, color: "#414142" }}>{detail.specialization} - {detail.qualification}</Text>
                                    </View>


                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingLeft: 20 }}>
                                        <Text style={{ fontWeight: 400, fontSize: 12, color: "#414142" }}>{detail.instituteName}</Text>
                                        <Text style={{ fontWeight: 400, fontSize: 10, color: "#414142", paddingBottom: 16 }}> {detail.duration?.start?.year}-
                                            {detail.duration?.end?.year}</Text>
                                    </View>


                                </View>

                            ))}



                        </View>




                    </View>
                </View>

            </View>

        </Page >

    )
}

export default Template48
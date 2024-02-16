import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template32({ data }) {

    return (
        <Page size="A4">
            <View style={{ flexDirection: 'row', gap: "1.5rem" }}>

                <View style={{ width: "207px" }}>
                    <View style={{ flexDirection: "column", minHeight: "841.7px", height: "100%", backgroundColor: "#F2F2F2", gap: "18px", }}>
                        <View style={{ alignItems: "center", marginTop: "35px", flexDirection: "column", }}>

                            {data.profilePhoto ? (
                                <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{ width: "134px", marginBottom: "16px", height: "134px", borderRadius: "50%" }} />
                            ) : (
                                <Image src="/images/services/profile.png" alt="" style={{ width: "134px", height: "134px", borderRadius: "50%" }} />
                            )}
                            <View style={{ flexDirection: "row", marginTop: 24, gap: 4 }}>
                                <Text style={{ color: "#414042", fontWeight: 400, fontSize: "24px", }}>{data.firstName}</Text>
                                <Text style={{ color: "#0072BC", fontWeight: 400, fontSize: "24px", }}>{data.lastName}</Text>
                            </View>
                            <Text style={{ fontSize: "12px", fontWeight: 500, color: "#414042" }}>{data.designation}</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "column", gap: "8" }}>

                            {data?.mobileNumber && (
                                <View style={{ flexDirection: "row", gap: "12px", justifyContent: "start", alignItems: "center", marginLeft: "24px", paddingRight: " 4px", paddingTop: "5px" }}>

                                    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M15.0273 12.1398C15.0551 12.3563 14.9899 12.5451 14.829 12.7047L12.951 14.5688C12.8664 14.6632 12.7555 14.7437 12.6195 14.809C12.4836 14.8742 12.3491 14.9172 12.2173 14.9367C12.2076 14.9367 12.1799 14.9395 12.1327 14.9436C12.0855 14.9478 12.0245 14.9505 11.9496 14.9505C11.7707 14.9505 11.4808 14.92 11.0814 14.8589C10.6805 14.7979 10.1923 14.6479 9.61395 14.4064C9.03558 14.1663 8.37954 13.8068 7.64444 13.3266C6.91073 12.8463 6.12986 12.187 5.30184 11.3486C4.64302 10.699 4.09794 10.0772 3.66381 9.4831C3.23108 8.89042 2.88295 8.34076 2.61942 7.8383C2.3559 7.33445 2.15756 6.87779 2.02718 6.46832C1.89542 6.05886 1.80665 5.7063 1.7595 5.40926C1.71234 5.11222 1.69292 4.87904 1.70263 4.7097C1.71234 4.54036 1.7165 4.44597 1.7165 4.42793C1.73592 4.29606 1.77753 4.16141 1.8441 4.02539C1.91068 3.88936 1.98973 3.77834 2.08405 3.69367L3.96202 1.81428C4.09378 1.68242 4.24357 1.61719 4.41417 1.61719C4.53622 1.61719 4.64441 1.65187 4.73872 1.72266C4.83304 1.79345 4.91348 1.88089 4.97867 1.98499L6.48909 4.85266C6.5737 5.00257 6.59727 5.16777 6.55983 5.34682C6.52238 5.52588 6.44193 5.67577 6.31988 5.7993L5.62778 6.49192C5.60836 6.51135 5.59172 6.5419 5.57785 6.58354C5.56398 6.62657 5.55704 6.66126 5.55704 6.69041C5.59449 6.88751 5.67909 7.11377 5.81086 7.36777C5.92459 7.59402 6.09796 7.86886 6.33375 8.19505C6.56953 8.51985 6.90241 8.8946 7.33515 9.31795C7.75817 9.75101 8.13543 10.0883 8.46415 10.3284C8.79286 10.5686 9.06887 10.7448 9.2894 10.8586C9.51132 10.9711 9.68053 11.0405 9.79703 11.0627L9.97318 11.0988C9.9926 11.0988 10.0217 11.0918 10.0647 11.078C10.1077 11.0641 10.1368 11.0474 10.1563 11.0294L10.9607 10.2105C11.1299 10.0592 11.3283 9.98417 11.5529 9.98417C11.7124 9.98417 11.84 10.0119 11.9344 10.0688H11.9482L14.6723 11.679C14.872 11.7956 14.9885 11.951 15.0273 12.1398Z" fill="#0054A6" />
                                    </Svg>
                                    <Text style={{ fontSize: "10px", paddingTop: "2px", flexDirection: "row", fontWeight: 400, color: "#414042", }}>{data.mobileNumber}</Text>
                                </View>
                            )}
                            {data?.email && (
                                <View style={{ flexDirection: "row", breakAll: true, gap: "12px", justifyContent: "start", alignItems: "center", marginLeft: "24px", paddingRight: " 4px" }}>
                                    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M15.0335 11.2831C15.0335 11.5758 14.9517 11.8465 14.8195 12.0847L10.6094 7.37372L14.7744 3.72982C14.936 3.98688 15.0335 4.28904 15.0335 4.61535V11.2831ZM8.36739 8.22883L14.1617 3.15904C13.9246 3.02894 13.656 2.94922 13.3675 2.94922H3.36725C3.0777 2.94922 2.81017 3.02894 2.57307 3.15904L8.36739 8.22883ZM9.98199 7.92247L8.64121 9.09652C8.56252 9.16472 8.46496 9.19937 8.36634 9.19937C8.26877 9.19937 8.1712 9.16472 8.09252 9.09652L6.75068 7.92247L2.48704 12.6932C2.74303 12.8538 3.04203 12.9492 3.36621 12.9492H13.3665C13.6906 12.9492 13.9896 12.8527 14.2456 12.6932L9.98199 7.92247ZM1.95933 3.72982C1.79776 3.98688 1.7002 4.28904 1.7002 4.61535V11.282C1.7002 11.5748 1.78203 11.8455 1.91422 12.0836L6.12331 7.37164L1.95933 3.72982Z" fill="#0054A6" />
                                    </Svg>
                                    <Text style={{ fontSize: "10px", width: '80%', paddingTop: "2px", flexDirection: "row", fontWeight: 400, color: "#414042", }}>{data.email}</Text>
                                </View>
                            )}

                            {/* {data?.sociaLinks > 0 && (
                    <View style={{ flexDirection:"row",breakAll:true , gap: "12px", justifyContent:"start" , alignItems: "center", marginLeft: "24px", paddingRight: " 16px" }}>
                        <View style={{ height: "24px", flexDirection:"row", alignItems: "center" }}>
                            <Image style={{ width: "18px", height: "18px" }} src="/images/services/social_white.png" alt="" />
                        </View>
                        <View style={{ flexDirection:"row", fontSize: "11px", paddingTop: "2px", fontWeight: 400, color: "#fff", }}>{data.sociaLinks}</View>
                    </View>
                )} */}
                            {data?.location && (
                                <View style={{ flexDirection: "row", breakAll: true, justifyContent: "start", gap: "12px", alignItems: "center", marginLeft: "24px", paddingRight: " 4px" }}>
                                    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M8.36795 1.61719C5.97804 1.61719 4.03418 3.59575 4.03418 6.02747C4.03418 7.00705 4.64858 8.60405 5.91295 10.9095C6.80678 12.54 7.68673 13.9003 7.72317 13.9568L8.36795 14.9505L9.01185 13.9568C9.04917 13.9003 9.92824 12.54 10.8221 10.9095C12.0864 8.60405 12.7008 7.00705 12.7008 6.02747C12.7008 3.59575 10.757 1.61719 8.36795 1.61719ZM8.36795 8.28518C7.127 8.28518 6.12209 7.26144 6.12209 5.99833C6.12209 4.73522 7.12787 3.71146 8.36795 3.71146C9.60802 3.71146 10.6138 4.73522 10.6138 5.99833C10.6138 7.26144 9.60802 8.28518 8.36795 8.28518Z" fill="#0054A6" />
                                    </Svg>
                                    <Text style={{ fontSize: "10px", flexDirection: "row", fontWeight: 400, color: "#414042", }}>{data.location}</Text>
                                </View>
                            )}
                        </View>

                        {data?.skills?.length > 0 && (
                            <>
                                <View style={{ paddingHorizontal: "24px" }}>

                                    <Text style={{ color: "#0072BC" }}>SKILLS</Text>

                                </View>

                                <View
                                    style={{
                                        paddingHorizontal: "24px"

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
                                                                color: "#414042",
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
                                                                backgroundColor: "#BCBEC0",
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    width: `${ratingPercentage}%`,
                                                                    height: "100%",
                                                                    backgroundColor: "#0072BC",
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

                        {/* {data?.languages?.length > 0 && (
                            <>
                                <View style={{ padding: "8px 24px", backgroundColor: "#009C9E", marginTop: "4px", alignItems: "center", justifyContent: "space-between", flexDirection: "row", width: "190px" }}>

                                    <Text style={{ color: "white" }}>LANGUAGES</Text>

                                </View>
                                <View style={{ flexDirection: "column", color: "white", paddingRight: "16px", gap: "8px", justifyContent: "space-between", marginLeft: "24px" }}>
                                    {data?.languages?.map((detail, index) => (
                                        <View key={index} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                                            <Text style={{ fontSize: "12px", paddingTop: "2px", flexDirection: "row", fontWeight: 400, color: "#fff", }}>{detail.languages}</Text>
                                            <View style={{ flexDirection: "row", gap: "16", marginTop: "4px" }}>
                                                {[...Array(3)].map((_, i) => (
                                                    <View key={i}>
                                                        {
                                                            detail.rating[i] === 0 ? (
                                                                <Svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <Path d="M4 8.42383C6.20914 8.42383 8 6.63292 8 4.42379C8 2.21467 6.20914 0.423828 4 0.423828C1.79086 0.423828 0 2.21467 0 4.42379C0 6.63292 1.79086 8.42383 4 8.42383Z" fill="white" />
                                                                </Svg>
                                                            ) : (
                                                                <Svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M4 0.423828C1.79135 0.423828 0 2.21518 0 4.42383C0 6.63248 1.79135 8.42383 4 8.42383C6.20864 8.42383 8 6.63248 8 4.42383C8 2.21518 6.20987 0.423828 4 0.423828Z" fill="#009C9E" />
                                                                </Svg>

                                                            )
                                                        }
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </>
                        )} */}
                        {data?.hobbies?.length > 0 && (
                            <View style={{ flexDirection: "column", gap: "16px", }}>

                                <View style={{ paddingHorizontal: "24px" }}>

                                    <Text style={{ color: "#0072BC" }}>HOBBIES</Text>

                                </View>
                                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "16px", marginLeft: "24px" }}>
                                    {data?.hobbies?.map((item, index) => (
                                        <View key={index} style={{ color: "#414042", fontSize: "12px", width: "calc(40% - 8px)" }}>
                                            <Text>
                                                {item?.title}
                                            </Text>
                                        </View>
                                    ))}
                                </View>

                            </View>
                        )}

                    </View>
                </View>
                <View style={{ width: "388px", padding: " 16px", display: "flex", flexDirection: "column", gap: "36px" }}>
                    <View style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start", paddingTop: "26px" }}>
                        <View style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", width: "100%" }}>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4, width: "100%" }}>
                                <Image style={{ width: "27px", height: "27px", display: "flex" }} src="/images/services/sky_about.png" alt="" />

                                <Text style={{ color: "#282829", fontWeight: 500, fontSize: "16px" }}>About me</Text>

                            </View>
                            <View style={{ height: "1px", width: "95%", backgroundColor: "#BCBEC0" }}></View>
                        </View>
                        <View style={{}}>
                            <Text style={{ color: "#414042", fontSize: "14px", paddingLeft: 8, fontWeight: 400 }}>{data.summery}</Text>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 8, width: "100%" }}>

                        <View style={{ display: "flex", flexDirection: "column", gap: 24, width: "90%" }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", width: "100%" }}>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4, width: "100%" }}>
                                    <Image style={{ width: "27px", height: "27px", display: "flex" }} src="/images/services/sky_education.png" alt="" />

                                    <Text style={{ color: "#282829", fontWeight: 500, fontSize: "16px" }}>EDUCATION</Text>

                                </View>
                                <View style={{ height: "1px", width: "95%", backgroundColor: "#BCBEC0" }}></View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", gap: 16 ,paddingLeft: 8}} >
                                {data?.education?.map((detail, index) => (
                                    <>
                                        <View key={index} style={{ display: "flex",flexDirection: "row", gap:16, alignItems: "start" }}>
                                            <View style={{ display: "flex", flexDirection: "column", gap: 8,justifyContent: "space-between",width:"30%" }}>


                                                <Text style={{ color: "#414042", fontSize: "11px", fontWeight: 400, }}>{detail.instituteName}</Text>


                                                <Text style={{ color: "#414042", fontSize: "9px", fontWeight: 400, }}>{" "}{detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "column", gap: 4 ,width:"70%"}}>

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
                                    <Image style={{ width: "27px", height: "27px", display: "flex" }} src="/images/services/sky_experience.png" alt="" />

                                    <Text style={{ color: "#282829", fontWeight: 500, fontSize: "16px" }}>EXPERIENCE</Text>

                                </View>
                                <View style={{ height: "1px", width: "95%", backgroundColor: "#BCBEC0" }}></View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", gap: 16 ,paddingLeft: 8}} >
                                {data?.experience?.map((detail, index) => (
                                    <>
                                        <View key={index} style={{ display: "flex",flexDirection: "row", gap:16, }}>
                                            <View style={{ display: "flex", flexDirection: "column", gap: 8,justifyContent: "space-between",width:"30%" }}>


                                                <Text style={{ color: "#414042", fontSize: "11px", fontWeight: 400, }}>{detail.designation}</Text>


                                                <Text style={{ color: "#414042", fontSize: "9px", fontWeight: 400, }}>{detail.duration?.start?.year}-{" "}{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "column", gap: 4 ,width:"70%"}}>

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

export default Template32



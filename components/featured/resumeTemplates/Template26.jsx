import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect, Font, Defs, ClipPath } from '@react-pdf/renderer';
function Template26({ data }) {
    return (
        <Page size="A4" style={{ padding: "24px" }}>
            <View style={{ minHeight: 792, display: "flex", flexDirection: "column", gap: 24 }}>
                <View style={{ display: "flex", width: "100%", flexDirection: "row", gap: 24, alignItems: "center" }}>
                    <View style={{ width: "184px", }}>
                        {data.profilePhoto ? (
                            <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{ width: "184px", marginBottom: "16px", height: "150px", }} />
                        ) : (
                            <Image src="/images/services/template_profile.png" alt="" style={{ width: "184px", height: "150px", }} />
                        )}
                    </View>
                    <View style={{ display: "flex", width: "339px", flexDirection: "column", gap: 8 }}>
                        <Text style={{ fontFamily:'Montserrat 700', fontSize: 40, color: "#231F20" }}>{data.firstName ? <>{data.firstName}</> : <>First Name</>}{" "}{data.lastName ? <>{data.lastName}</> : <>Last Name</>}</Text>
                        <Text style={{ fontFamily:'Montserrat 500', fontSize: 18, color: "#8E8E8E" }}>{data.designation ? <>{data.designation}</> : <>Designation</>}</Text>
                    </View>
                </View>
                <View style={{ display: "flex", width: "100%", flexDirection: "row", gap: 24, }}>
                    <View style={{ width: "184px", flexDirection: "column", gap: 20 }}>
                        <View style={{ flexDirection: "column", gap: 10, width: "100%" }}>
                            <View style={{ flexDirection: "row", display: "flex", alignItems: "center", gap: 16, width: "100%" }}>
                                <View style={{ height: 3, backgroundColor: "#A7A9AC", width: "40px" }}></View>
                                <Text style={{ color: "#231F20", fontSize: "16px", fontFamily:'Montserrat 600'}}>CONTACT</Text>
                                <View style={{ height: 3, backgroundColor: "#A7A9AC", width: "40px" }}></View>
                            </View>
                            <View style={{ flexDirection: "column", display: "flex", gap: 8, width: "100%" }}>
                                <View style={{ flexDirection: "row", display: "flex", gap: 16, paddingLeft: 20, alignItems: "center" }}>
                                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M9.95283 0.119141C4.73223 0.119141 0.5 4.3725 0.5 9.61915C0.5 14.8658 4.73223 19.1191 9.95283 19.1191C15.1734 19.1191 19.4056 14.8658 19.4056 9.61915C19.399 4.37384 15.1708 0.124503 9.95283 0.119141ZM9.95283 18.4851C5.08036 18.4851 1.1309 14.5159 1.1309 9.61915C1.1309 4.72237 5.08036 0.753178 9.95283 0.753178C14.8253 0.753178 18.7747 4.72237 18.7747 9.61915C18.7694 14.5133 14.8226 18.4784 9.95283 18.4851Z" fill="black" />
                                        <Path d="M14.0945 10.7781L11.4201 10.3036C11.2841 10.2795 11.1494 10.3465 11.0867 10.4685L10.4384 11.7178C9.29135 11.2071 8.37368 10.2848 7.86682 9.13199L9.10862 8.48052C9.22999 8.41618 9.29669 8.28079 9.27268 8.1454L8.8005 5.45773C8.78583 5.37328 8.73782 5.29821 8.66712 5.24996C7.99087 4.79151 7.11855 4.74593 6.39828 5.13065C5.67802 5.51537 5.22852 6.26873 5.22852 7.08776C5.23252 11.1079 8.47505 14.3666 12.4752 14.3706C13.2915 14.3706 14.0398 13.9175 14.4226 13.1937C14.8054 12.4698 14.7587 11.5931 14.3025 10.9135C14.2532 10.8411 14.1785 10.7929 14.0945 10.7781ZM12.4739 13.7352C8.82185 13.7312 5.86075 10.7567 5.85675 7.08508C5.85675 6.52208 6.15286 6.00197 6.63704 5.71778C7.11989 5.4336 7.71744 5.42825 8.20429 5.70439L8.6111 8.02342L7.31862 8.7017C7.17724 8.77542 7.11321 8.94432 7.16923 9.09446C7.74545 10.6253 8.94723 11.8344 10.4718 12.4148C10.6212 12.4711 10.7892 12.4068 10.8626 12.2647L11.5375 10.9658L13.845 11.376C14.1185 11.8666 14.1131 12.4658 13.8304 12.951C13.5503 13.4376 13.0327 13.7352 12.4739 13.7352Z" fill="black" />
                                    </Svg>
                                    <Text style={{ fontFamily:'Montserrat 500', fontSize: 12, color: "#7A7A7A" }}>{data.mobileNumber ? (<>{data.mobileNumber}</>) : (<>Your Phone</>)}</Text>
                                </View>
                                <View style={{ height: 1, width: "100%", backgroundColor: "#D1D3D4" }}></View>
                                <View style={{ flexDirection: "row", display: "flex", gap: 16, paddingLeft: 20, alignItems: "center" }}>
                                    <Svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M9.50077 0.119141C4.25909 0.119141 0.00976562 4.37248 0.00976562 9.61913C0.00976562 14.8658 4.25909 19.1191 9.50077 19.1191C14.7424 19.1191 18.9918 14.8658 18.9918 9.61913C18.9851 4.37516 14.7398 0.125843 9.50077 0.119141ZM9.50077 18.4864C4.60862 18.4864 0.641874 14.5173 0.641874 9.61913C0.641874 4.72101 4.60728 0.751849 9.50077 0.751849C14.3942 0.751849 18.3597 4.72235 18.3597 9.61913C18.353 14.5146 14.3902 18.4811 9.50077 18.4864Z" fill="black" />
                                        <Path d="M13.9308 5.82031H5.07191C4.89782 5.82031 4.75586 5.96239 4.75586 6.13666V13.1032C4.75586 13.2774 4.89782 13.4195 5.07191 13.4195H13.9308C14.1049 13.4195 14.2469 13.2774 14.2469 13.1032V6.13666C14.2469 5.96239 14.1062 5.82031 13.9308 5.82031ZM13.0764 6.45435L9.50203 9.52139L5.92767 6.45435H13.0764ZM5.38931 12.7881V6.827L9.29579 10.1796C9.41364 10.2814 9.58908 10.2814 9.70693 10.1796L13.6148 6.827V12.7881H5.38931Z" fill="black" />
                                    </Svg>
                                    <Text style={{ fontFamily:'Montserrat 500', fontSize: 12, color: "#7A7A7A" }}>{data.email ? <>{data.email}</> : <>Your Email</>}</Text>
                                </View>
                                <View style={{ height: 1, width: "100%", backgroundColor: "#D1D3D4" }}></View>
                                <View style={{ flexDirection: "row", display: "flex", gap: 16, paddingLeft: 20, alignItems: "center" }}>
                                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M10.0008 0.119141C4.75909 0.119141 0.509766 4.37251 0.509766 9.61916C0.509766 14.8658 4.75909 19.1191 10.0008 19.1191C15.2425 19.1191 19.4918 14.8658 19.4918 9.61916C19.4851 4.37519 15.2398 0.125843 10.0008 0.119141ZM10.0008 18.4865C5.10863 18.4865 1.14187 14.5173 1.14187 9.61916C1.14187 4.72237 5.10729 0.751829 10.0008 0.751829C14.8943 0.751829 18.8597 4.72103 18.8597 9.61916C18.853 14.5146 14.8902 18.4811 10.0008 18.4865Z" fill="black" />
                                        <Path d="M9.9998 4.55078C7.90393 4.55346 6.2058 6.25319 6.20312 8.35104C6.20312 10.9851 9.63017 14.4462 9.77615 14.5923C9.89935 14.7157 10.1002 14.7157 10.2234 14.5923C10.3694 14.4462 13.7965 10.9851 13.7965 8.35104C13.7938 6.25319 12.0957 4.55346 9.9998 4.55078ZM9.9998 13.91C9.24448 13.1017 6.83657 10.3631 6.83657 8.35104C6.83657 6.60171 8.25347 5.18482 9.9998 5.18482C11.7475 5.18482 13.163 6.60305 13.163 8.35104C13.163 10.3618 10.7551 13.1017 9.9998 13.91Z" fill="black" />
                                        <Path d="M10.0019 6.45312C9.30282 6.45312 8.73633 7.02012 8.73633 7.71985C8.73633 8.41958 9.30282 8.98662 10.0019 8.98662C10.701 8.98662 11.2674 8.41958 11.2674 7.71985C11.2674 7.02012 10.701 6.45312 10.0019 6.45312ZM10.0019 8.35258C9.65236 8.35258 9.36978 8.06838 9.36978 7.71985C9.36978 7.37133 9.65369 7.08716 10.0019 7.08716C10.3501 7.08716 10.634 7.37133 10.634 7.71985C10.634 8.06838 10.3514 8.35258 10.0019 8.35258Z" fill="black" />
                                    </Svg>
                                    <Text style={{ fontFamily:'Montserrat 500', fontSize: 12, color: "#7A7A7A" }}>{data.location ? <>{data.location}</> : <>Your Address</>}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "column", width: "100%" }} >
                            <View style={{ borderTop: "4px solid #414042", borderLeft: "8px solid #414042", borderRight: "8px solid #414042", position: "relative", padding: "16px", gap: "16px" }}>
                                <Text style={{ paddingHorizontal: "16px", paddingVertical: "10px", position: "absolute", top: -22, left: "16px", backgroundColor: "#FFF" }}>EDUCATION</Text>
                                {data?.education?.map((detail, index) => (
                                    <View style={{ width: "100%", display: "flex", flexDirection: "column", gap: "6px", alignItems: "center" }}>
                                        <Text style={{ fontFamily:'Montserrat 700', fontSize: 12, color: "#383838" }}>{detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>
                                        <Text style={{ fontSize: 12, fontFamily:'Montserrat 500', color: '#7A7A7A' }}>{detail.qualification}</Text>
                                        <Text style={{ fontSize: 12, fontFamily:'Montserrat 400', color: '#383838' }}>{detail.specialization}</Text>
                                        <Text style={{ fontSize: 12, fontFamily:'Montserrat 600', color: '#383838' }}>{detail.instituteName}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={{ width: "100%", flexDirection: "row", display: "flex", alignItems: "center", gap: 16, width: "100%", backgroundColor: "#414042", paddingVertical: "6px" }}>
                                <View style={{ height: 3, backgroundColor: "#FFFFFF", width: "30%" }}></View>
                                <Text style={{ color: "#FFFFFF", fontSize: "16px", fontFamily:'Montserrat 600' }}>SKILLS</Text>
                                <View style={{ height: 3, backgroundColor: "#FFFFFF", width: "30%" }}></View>
                            </View>
                            <View style={{ width: "100%", backgroundColor: "#414042", padding: "16px", gap: "14px" }}>
                                {data.skills?.map((detail, index) => {
                                    const calculateWidthPercentage = (rating) => {
                                        let zerosCount = 0;
                                        if (rating && rating.length > 0) {
                                            zerosCount = rating.filter((val) => val === 0).length;
                                        }
                                        return zerosCount;
                                    };

                                    const zerosCount = calculateWidthPercentage(detail.rating);

                                    return (
                                        <View
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontFamily:'Montserrat 600',
                                                    color: "#FFFFFF",
                                                    width: '50%'
                                                }}
                                            >
                                                {detail.skill}
                                            </Text>

                                            <View style={{ width: 55 }}>
                                                {zerosCount === 0 && (
                                                    <Svg
                                                        width="55"
                                                        height="12"
                                                        viewBox="0 0 88 12"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <Path
                                                            d="M86.27 7H1.73003C1.32643 7 1 6.54926 1 6.00767C1 5.45192 1.32643 5 1.73003 5H86.27C86.6736 5 87 5.45074 87 6.00767C87 6.54926 86.6725 7 86.27 7Z"
                                                            fill="#AAAAAA"
                                                        />
                                                        <Path
                                                            d="M1 5C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7V5ZM76.6667 6C76.6667 8.94552 79.0545 11.3333 82 11.3333C84.9455 11.3333 87.3333 8.94552 87.3333 6C87.3333 3.05448 84.9455 0.666667 82 0.666667C79.0545 0.666667 76.6667 3.05448 76.6667 6ZM1 7H82V5H1V7Z"
                                                            fill="#FFFFFF"
                                                        />
                                                    </Svg>
                                                )}

                                                {zerosCount === 1 && (
                                                    <Svg
                                                        width="55"
                                                        height="11"
                                                        viewBox="0 0 87 11"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <Path
                                                            d="M86.27 6.5H1.73003C1.32643 6.5 1 6.04926 1 5.50767C1 4.95192 1.32643 4.5 1.73003 4.5H86.27C86.6736 4.5 87 4.95074 87 5.50767C87 6.04926 86.6725 6.5 86.27 6.5Z"
                                                            fill="#AAAAAA"
                                                        />
                                                        <Path
                                                            d="M1 4.5C0.447715 4.5 0 4.94772 0 5.5C0 6.05228 0.447715 6.5 1 6.5V4.5ZM41.6667 5.5C41.6667 8.44552 44.0545 10.8333 47 10.8333C49.9455 10.8333 52.3333 8.44552 52.3333 5.5C52.3333 2.55448 49.9455 0.166667 47 0.166667C44.0545 0.166667 41.6667 2.55448 41.6667 5.5ZM1 6.5H47V4.5H1V6.5Z"
                                                            fill="#FFFFFF"
                                                        />
                                                    </Svg>
                                                )}

                                                {zerosCount === 2 && (
                                                    <Svg
                                                        width="55"
                                                        height="11"
                                                        viewBox="0 0 87 11"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <Path
                                                            d="M86.27 6.5H1.73003C1.32643 6.5 1 6.04926 1 5.50767C1 4.95192 1.32643 4.5 1.73003 4.5H86.27C86.6736 4.5 87 4.95074 87 5.50767C87 6.04926 86.6725 6.5 86.27 6.5Z"
                                                            fill="#AAAAAA"
                                                        />
                                                        <Path
                                                            d="M1 4.5C0.447715 4.5 0 4.94772 0 5.5C0 6.05228 0.447715 6.5 1 6.5V4.5ZM0.666667 5.5C0.666667 8.44552 3.05448 10.8333 6 10.8333C8.94552 10.8333 11.3333 8.44552 11.3333 5.5C11.3333 2.55448 8.94552 0.166667 6 0.166667C3.05448 0.166667 0.666667 2.55448 0.666667 5.5ZM1 6.5H6V4.5H1V6.5Z"
                                                            fill="#FFFFFF"
                                                        />
                                                    </Svg>
                                                )}
                                            </View>
                                        </View>
                                    );
                                })}


                            </View>
                        </View>
                        <View style={{ flexDirection: "column", gap: 4, width: "100%" }}>
                            <View style={{ width: "100%", flexDirection: "row", display: "flex", alignItems: "center", gap: 16, width: "100%", paddingVertical: "6px" }}>
                                <View style={{ height: 3, backgroundColor: "#A7A9AC", width: "23%" }}></View>
                                <Text style={{ color: "#231F20", fontSize: "16px", fontFamily:'Montserrat 600' }}>HOBBIES</Text>
                                <View style={{ height: 3, backgroundColor: "#A7A9AC", width: "23%" }}></View>
                            </View>
                            <View style={{ flexDirection: "column", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {data?.hobbies?.map((item, index) => (
                                    <>
                                        <Text style={{ paddingVertical: "6px", color: "#383838", fontFamily:'Montserrat 600', fontSize: "12px", display: "flex", justifyContent: "center", }}>{item?.title}</Text>
                                        <View style={{ height: 1, width: "100%", backgroundColor: "#7A7A7A" }}></View>
                                    </>
                                ))}
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex", width: "339px", flexDirection: "column", gap: 24, }}>
                        <View style={{ display: "flex", width: "100%", flexDirection: "row", gap: 16, }}>
                            <Svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M8.99194 7.62325C10.0781 6.94249 10.7582 5.78756 10.7582 4.42715C10.7582 2.31937 9.05962 0.619141 6.95383 0.619141C4.84805 0.619141 3.14943 2.31937 3.14943 4.42715C3.14943 5.78756 3.89723 6.94249 4.91572 7.62325C2.47044 7.8276 0.5 9.93425 0.5 12.4507V16.3942V16.4631L0.771825 16.5308C3.35358 17.3459 5.59472 17.6191 7.361 17.6191C10.9624 17.6191 13.0682 16.5985 13.1358 16.5308L13.4077 16.3942H13.4753V12.4507C13.4753 9.93425 11.506 7.8276 8.99194 7.62325Z" fill="#414042" />
                            </Svg>
                            <View style={{ display: "flex", width: "100%", flexDirection: "column", gap: 12 }}>
                                <Text style={{ fontSize: "14px", fontFamily:'Montserrat 700', color: "#414042", }}>ABOUT ME</Text>
                                <View style={{ height: 1, width: "100%", backgroundColor: "#D1D3D4" }}></View>
                                <Text style={{ fontSize: "12px", fontFamily:'Montserrat 400', color: "#6D6E71", }}>
                                    {data.summery ? <>{data.summery}</> : <>About</>}
                                </Text>
                            </View>
                        </View>
                        <View style={{ display: "flex", width: "100%", flexDirection: "row", gap: 16, }}>
                            <Svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M17.3074 4.80907H13.467V2.8885L11.7533 1.18945H8.24825L6.53321 2.8885V4.80907H2.69412C1.79846 4.80907 1.05273 5.54786 1.05273 6.43388V16.4068C1.05273 17.2928 1.79846 18.0316 2.69412 18.0316H17.3074C18.2031 18.0316 18.9475 17.2928 18.9475 16.4068V6.43388C18.9475 5.54786 18.2031 4.80907 17.3074 4.80907ZM12.0137 4.80907H7.98652V2.63052H12.0137V4.80907Z" fill="#414042" />
                            </Svg>

                            <View style={{ display: "flex", width: "100%", flexDirection: "column", gap: 12 }}>
                                <Text style={{ fontSize: "14px", fontFamily:'Montserrat 700', color: "#414042", }}>EXPERIENCE</Text>
                                <View style={{ height: 1, width: "100%", backgroundColor: "#D1D3D4" }}></View>
                                <View style={{ display: "flex", width: "100%", flexDirection: "row", gap: 15 }}>

                                    <View style={{ width: "100%", }}>
                                        {data?.experience?.map((detail, index) => (
                                            <View style={{ display: "flex", width: "100%", flexDirection: "row", gap: 15 }}>

                                                <Svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M8.99939 15.3894C5.55288 15.3894 2.75 12.5852 2.75 9.14002C2.75 5.6935 5.55425 2.89062 8.99939 2.89062C12.4445 2.89062 15.2488 5.69488 15.2488 9.14002C15.2488 12.5852 12.4445 15.3894 8.99939 15.3894Z" fill="#231F20" />
                                                    <Path d="M9 5.63794C10.9323 5.63794 12.4988 7.20442 12.4988 9.13672C12.4988 11.069 10.9323 12.6355 9 12.6355C7.0677 12.6355 5.50122 11.069 5.50122 9.13672C5.50122 7.20442 7.0677 5.63794 9 5.63794ZM9 0.136719C4.0379 0.136719 0 4.17462 0 9.13672C0 14.0988 4.0379 18.1367 9 18.1367C13.9621 18.1367 18 14.0988 18 9.13672C18 4.17462 13.9635 0.136719 9 0.136719Z" fill="white" />
                                                </Svg>
                                                <View style={{ height: "100%", width: 1, backgroundColor: "#D1D3D4", marginLeft: "-24", marginTop: "12" }}></View>
                                                <View style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px", paddingBottom: `${index !== data.experience.length - 1 ? "20px" : "none"}` }}>
                                                    <Text style={{ fontFamily:'Montserrat 600', fontSize: 14, color: "#6D6E71" }}>{detail.designation ? (<>{detail.designation}</>) : (<>Designation</>)}/{detail.organization ? (<>{detail.organization}</>) : (<>organization</>)}</Text>
                                                    <Text style={{ fontFamily:'Montserrat 600', fontSize: 12, color: "#939598" }}> {detail.duration?.start?.year}-{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>
                                                    <Text style={{ fontFamily:'Montserrat 400', fontSize: 12, color: "#6D6E71" }}>{detail.description ? (<>{detail.description}</>) : (<>Description</>)}</Text>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={{ position:"absolute", bottom:0, backgroundColor: "#414042", width: "100%", paddingVertical: "8px", flexDirection: "row", alignItems:"center", justifyContent:"center" }}>
                    <Text style={{ textAlign: "center", fontFamily:'Montserrat 400', fontSize: 12, color: "#A7A9AC", }}>For more information you can check my online portfolio at</Text>
                    {" "}
                    <Text style={{ fontFamily:'Montserrat 500', fontSize: 12, color: "#FFFFFF", }}>{data.socialLinks}</Text>
                </View>
            </View>
        </Page>
    )
}

export default Template26
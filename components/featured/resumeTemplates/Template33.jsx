import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template33({ data }) {

    return (
        <Page size="A4">
            <View style={{ flexDirection: 'row' }}>

                <View style={{ width: "230px" }}>
                    <View style={{ flexDirection: "column", minHeight: "841.7px", height: "100%", backgroundColor: "#414042", gap: "18px", }}>
                        <View style={{ alignItems: "center", marginTop: "35px", flexDirection: "column", }}>

                            {data.profilePhoto ? (
                                <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{ width: "134px", marginBottom: "16px", height: "134px", borderRadius: "50%" }} />
                            ) : (
                                <View style={{   }}>

                                    <Image src="/images/services/template_profile.png" alt="" style={{  width: "190px", height: "190px" }} />
                                </View>
                            )}

                        </View>
                        <View style={{ display: "flex", flexDirection: "column", gap: "8" }}>
                            <View style={{ padding: "8px 24px", backgroundColor: "#4E4C51", marginTop: "4px", alignItems: "center", justifyContent: "center", flexDirection: "row", width: "230px" }}>

                                <Text style={{ color: "white", fontFamily:'Kanit 500', }}>CONTACT</Text>

                            </View>
                            {data?.mobileNumber && (
                                <View style={{ flexDirection: "row", gap: "12px", justifyContent: "start", alignItems: "center", marginLeft: "24px", paddingRight: " 4px", paddingTop: "5px" }}>
                                    <View style={{ height: "24px", display: "flex", alignItems: "center" }}>
                                        <Image style={{ width: "18px", height: "18px" }} src="/images/services/telephone_white.png" alt="" />
                                    </View>
                                    <Text style={{ fontSize: "10px", paddingTop: "2px", flexDirection: "row", fontFamily:'Kanit 300', color: "#fff", }}>{data.mobileNumber}</Text>
                                </View>
                            )}
                            {data?.email && (
                                <View style={{ flexDirection: "row", breakAll: true, gap: "12px", justifyContent: "start", alignItems: "center", marginLeft: "24px", paddingRight: " 4px" }}>
                                    <View style={{ height: "24px", display: "flex", alignItems: "center" }}>
                                        <Image style={{ width: "18px", height: "18px" }} src="/images/services/message_white.png" alt="" />
                                    </View>
                                    <Text style={{ fontSize: "10px", width: '80%', paddingTop: "2px", flexDirection: "row",fontFamily:'Kanit 300', color: "#fff", }}>{data.email}</Text>
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
                                    <View style={{ height: "24px", flexDirection: "row", alignItems: "center" }}>
                                        <Image style={{ width: "18px", height: "18px" }} src="/images/services/location_white.png" alt="" />
                                    </View>
                                    <Text style={{ fontSize: "10px", flexDirection: "row", fontFamily:'Kanit 300', color: "#fff", }}>{data.location}</Text>
                                </View>
                            )}
                        </View>

                        {data?.skills?.length > 0 && (
                            <>
                                <View style={{ padding: "8px 24px", backgroundColor: "#4E4C51", marginTop: "4px", alignItems: "center", justifyContent: "center", flexDirection: "row", width: "230px" }}>

                                    <Text style={{fontFamily:'Kanit 500', color: "white" }}>SKILLS</Text>

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
                                                                color: "#fff",
                                                                fontSize: "12px",
                                                                fontFamily:'Kanit 300',
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
                                                                backgroundColor: "#8A888E",
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    width: `${ratingPercentage}%`,
                                                                    height: "100%",
                                                                    backgroundColor: "#E5E5E5",
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



                        {data?.languages?.length > 0 && (
                            <>
                                <View style={{ padding: "8px 24px", backgroundColor: "#4E4C51", marginTop: "4px", alignItems: "center", justifyContent: "center", flexDirection: "row", width: "230px" }}>

                                    <Text style={{ fontFamily:'Kanit 500',color: "white" }}>LANGUAGES</Text>

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
                                        {data.languages?.map((detail, index) => {
                                            const calculateWidthPercentage = (rating) => {
                                                let ratingPercentage = 0;
                                                if (rating && rating.length > 0) {
                                                    const zerosCount = rating.filter(
                                                        (val) => val === 0
                                                    ).length;

                                                    if (zerosCount === 0) ratingPercentage = 100;
                                                    else if (zerosCount === 1) ratingPercentage = 50;
                                                    else if (zerosCount === 2) ratingPercentage = 20;
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
                                                                color: "#fff",
                                                                fontSize: "12px",
                                                                fontFamily:'Kanit 300',
                                                                width: "80px",
                                                            }}
                                                        >
                                                            {detail.languages}
                                                        </Text>
                                                        <View
                                                            style={{
                                                                width: "59.21%",
                                                                height: "3.78px",
                                                                display: "flex",
                                                                marginBottom: "1px",
                                                                backgroundColor: "#8A888E",
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    width: `${ratingPercentage}%`,
                                                                    height: "100%",
                                                                    backgroundColor: "#E5E5E5",
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
                <View style={{ width: "365px", display: "flex", flexDirection: "column", gap: "36px" }}>
                    <View style={{ display: "flex", backgroundColor: "#4E4C51", padding: 42, marginTop: 36 }}>
                        <Text style={{ color: "#fff", fontFamily:'Kanit 600', fontSize: "26px", }}>{data.firstName} {data.lastName}</Text>

                        <Text style={{ fontSize: "18px", fontFamily:'Kanit 300', color: "#EDEDED" }}>{data.designation}</Text>
                    </View>
                    <View style={{ paddingHorizontal: 36, flexDirection: "column", gap: 36, }}>
                        <View style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", width: "100%" }}>
                                <Svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M10.0013 10.8337C12.3237 10.8337 14.2121 8.96478 14.2121 6.66732C14.2121 4.36987 12.3227 2.5 10.0013 2.5C9.24795 2.5 8.50744 2.7006 7.86184 3.07927C7.58995 3.23876 7.49999 3.58611 7.66213 3.8552C7.8223 4.12428 8.17327 4.21332 8.44614 4.05383C8.91576 3.7779 9.45459 3.63308 10.0023 3.63308C11.6929 3.63308 13.0691 4.99413 13.0691 6.66732C13.0691 8.34051 11.6929 9.70156 10.0023 9.70156C8.3631 9.70156 7.0185 8.43347 6.94039 6.81507C6.92556 6.50196 6.64875 6.26419 6.34127 6.27691C6.02589 6.29158 5.78269 6.55676 5.79752 6.86889C5.90429 9.09199 7.75111 10.8337 10.0013 10.8337Z" fill="#4E4C51" />
                                    <Path d="M6.42004 5.82046C6.49125 5.84981 6.56542 5.86351 6.63861 5.86351C6.86314 5.86351 7.0768 5.73143 7.1678 5.51326C7.26572 5.27944 7.3943 5.05637 7.55058 4.84897C7.7395 4.59851 7.6881 4.24337 7.43488 4.05651C7.18166 3.86769 6.82258 3.92149 6.63366 4.17096C6.42001 4.45273 6.24296 4.75896 6.10942 5.08083C5.98974 5.36944 6.12824 5.70012 6.42004 5.82046Z" fill="#4E4C51" />
                                    <Path d="M9.9995 11.2988C6.35528 11.2988 3.5 14.2127 3.5 17.9329C3.5 18.246 3.75607 18.4994 4.07245 18.4994C4.38882 18.4994 4.6449 18.246 4.6449 17.9329C4.6449 14.8477 6.99692 12.4309 9.9995 12.4309C13.0031 12.4309 15.3551 14.8477 15.3551 17.9329C15.3551 18.246 15.6112 18.4994 15.9276 18.4994C16.2439 18.4994 16.5 18.246 16.5 17.9329C16.5 14.2127 13.6447 11.2988 9.9995 11.2988Z" fill="#4E4C51" />
                                </Svg>


                                <Text style={{ color: "#282829", fontFamily:'Kanit 500', fontSize: "18px" }}>About me</Text>
                                <View style={{ height: "2px", width: "165px", backgroundColor: "#4E4C51" }}></View>
                                <Svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M4.39879 10.2511L0.248933 6.10124C-0.0829776 5.76932 -0.0829776 5.23068 0.248933 4.89876L4.39879 0.748933C4.7307 0.417022 5.26935 0.417022 5.60126 0.748933L9.75107 4.89876C10.083 5.23068 10.083 5.76932 9.75107 6.10124L5.60126 10.2511C5.26935 10.583 4.7307 10.583 4.39879 10.2511Z" fill="#4E4C51" />
                                </Svg>

                            </View>
                            <View style={{}}>
                                <Text style={{ color: "#636166", fontSize: "12px", fontFamily:'Kanit 300', }}>{data.summery}</Text>
                            </View>
                        </View>




                        <View style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", width: "100%" }}>
                                <Svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M18 12.1762C18 11.4684 17.5696 10.8648 16.9711 10.6401V7.95153C16.9711 7.64604 16.8006 7.36786 16.5361 7.24368L14.0655 6.08007C13.8069 5.95837 13.5023 6.08132 13.3871 6.35453C13.2718 6.62773 13.3883 6.94936 13.6469 7.07106L15.5154 7.95028L13.5141 8.89284C13.5105 8.89408 13.507 8.89532 13.5035 8.8978L9.48674 10.7891L5.46878 8.8978C5.46643 8.89656 5.46292 8.89533 5.46056 8.89409L3.45806 7.95153L9.48556 5.11394L11.5127 6.06889C11.7726 6.19059 12.076 6.06768 12.1912 5.79447C12.3076 5.52127 12.19 5.19964 11.9313 5.07794L9.78423 4.06706C9.59374 3.97765 9.3762 3.97765 9.18571 4.06706L2.43506 7.24493C2.17049 7.36911 2 7.64726 2 7.95275C2 8.25824 2.17049 8.53642 2.43506 8.6606L4.74682 9.74845V14.2265C4.74682 14.6648 5.01019 15.0598 5.40175 15.2075C6.46238 15.6087 7.41484 15.9899 9.40205 15.9998C11.3023 16.0098 12.5698 15.5826 13.567 15.2075C13.9585 15.0598 14.2219 14.6648 14.2219 14.2265V9.74845L15.941 8.93877V10.6389C15.3425 10.8636 14.9122 11.4672 14.9122 12.175C14.9122 13.0728 15.6036 13.8043 16.4549 13.8043C17.3086 13.8055 18 13.0753 18 12.1762ZM13.1907 14.1979C12.1948 14.5717 11.2564 14.9232 9.41031 14.9145C7.65592 14.9045 6.75871 14.5655 5.80861 14.2066L5.77804 14.1954V10.2327L9.18804 11.8385C9.37853 11.9279 9.59607 11.9279 9.78656 11.8385L13.1966 10.2327V14.1954L13.1907 14.1979ZM16.4572 12.7202C16.1739 12.7202 15.9434 12.4767 15.9434 12.1775C15.9434 11.8782 16.1739 11.6348 16.4572 11.6348C16.7406 11.6348 16.9711 11.8782 16.9711 12.1775C16.9711 12.4755 16.7406 12.7202 16.4572 12.7202Z" fill="#4E4C51" />
                                </Svg>

                                <Text style={{ color: "#282829", fontFamily:'Kanit 500', fontSize: "18px" }}>EDUCATION</Text>
                                <View style={{ height: "2px", width: "140px", backgroundColor: "#4E4C51" }}></View>
                                <Svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M4.39879 10.2511L0.248933 6.10124C-0.0829776 5.76932 -0.0829776 5.23068 0.248933 4.89876L4.39879 0.748933C4.7307 0.417022 5.26935 0.417022 5.60126 0.748933L9.75107 4.89876C10.083 5.23068 10.083 5.76932 9.75107 6.10124L5.60126 10.2511C5.26935 10.583 4.7307 10.583 4.39879 10.2511Z" fill="#4E4C51" />
                                </Svg>

                            </View>
                            <View style={{ display: "flex", flexDirection: "column", gap: 16 }} >
                                {data?.education?.map((detail, index) => (

                                    <View key={index} style={{ flexDirection: "row", alignItems: "start", gap: 8 }}>

                                        <Svg style={{ marginTop: -2 }} width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M6.22764 10.8874L4.11264 8.77237C3.96245 8.62218 3.96245 8.37785 4.11264 8.22766L6.22764 6.11264C6.37783 5.96245 6.62217 5.96245 6.77236 6.11264L8.88736 8.22766C9.03755 8.37785 9.03755 8.62218 8.88736 8.77237L6.77236 10.8874C6.62217 11.0375 6.37783 11.0375 6.22764 10.8874Z" fill="#4E4C51" />
                                        </Svg>

                                        <View style={{ display: "flex", flexDirection: "column", gap: 8, }}>


                                            <Text style={{ color: "#414042", fontSize: "12px",  fontFamily:'Kanit 500', }}>{detail.instituteName}</Text>


                                            <Text style={{ color: "#414042", fontSize: "12px",  fontFamily:'Kanit 500', }}>{detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>



                                            <Text style={{ color: "#787879", fontSize: "12px",  fontFamily:'Kanit 500',}}>{detail.qualification} - {detail.specialization}</Text>

                                        </View>

                                    </View>

                                ))}
                            </View>
                        </View>

                        <View style={{ display: "flex", flexDirection: "row", gap: 8, width: "100%" }}>

                            <View style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", width: "100%" }}>
                                    <Svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M4.67147 5.16992C4.44325 5.16992 4.25781 5.34251 4.25781 5.55493V12.5011C4.25781 12.7135 4.44325 12.8861 4.67147 12.8861H15.3256C15.5538 12.8861 15.7392 12.7135 15.7392 12.5011V5.55493C15.7392 5.34251 15.5538 5.16992 15.3256 5.16992H4.67147ZM15.1106 12.302H4.88645V5.756H15.1106V12.302Z" fill="#4E4C51" />
                                        <Path d="M15.809 4H4.19001C3.53286 4 3 4.49598 3 5.10762V12.9518C3 13.5634 3.53286 14.0594 4.19001 14.0594H7.99437V15.2438H6.88893C6.5792 15.2438 6.32858 15.4771 6.32858 15.7653V17H13.6755L13.6857 15.7653C13.6857 15.478 13.434 15.2438 13.1243 15.2438H12.0188V14.0594H15.809C16.4661 14.0594 16.999 13.5634 16.999 12.9518V9.71245C16.999 9.54744 16.8533 9.41472 16.675 9.41946C16.5028 9.42421 16.3703 9.56451 16.3703 9.72477V12.9518C16.3703 13.2401 16.1197 13.4743 15.809 13.4743H4.19001C3.88028 13.4743 3.6286 13.2401 3.6286 12.9518V5.10762C3.6286 4.81934 3.88028 4.58602 4.19001 4.58602H15.809C16.1187 4.58602 16.3703 4.81934 16.3703 5.10762V6.27116C16.3703 6.43237 16.5109 6.56414 16.6852 6.56414C16.8594 6.56414 17 6.43331 17 6.27116V5.10762C16.999 4.49598 16.4661 4 15.809 4ZM13.056 15.8289V16.4149H6.95718V15.8289H13.056ZM8.62301 14.0594H11.3902V15.2438H8.62403V14.0594H8.62301Z" fill="#4E4C51" />
                                        <Path d="M16.6861 7.07227C16.5128 7.07227 16.3711 7.20307 16.3711 7.36521V8.33519C16.3711 8.49542 16.5036 8.63577 16.6759 8.64051C16.8543 8.64525 17 8.51249 17 8.34751V7.36521C17.001 7.20307 16.8604 7.07227 16.6861 7.07227Z" fill="#4E4C51" />
                                    </Svg>



                                    <Text style={{ color: "#282829",  fontFamily:'Kanit 500', fontSize: "18px" }}>EXPERIENCE</Text>
                                    <View style={{ height: "2px", width: "127px", backgroundColor: "#4E4C51" }}></View>
                                    <Svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M4.39879 10.2511L0.248933 6.10124C-0.0829776 5.76932 -0.0829776 5.23068 0.248933 4.89876L4.39879 0.748933C4.7307 0.417022 5.26935 0.417022 5.60126 0.748933L9.75107 4.89876C10.083 5.23068 10.083 5.76932 9.75107 6.10124L5.60126 10.2511C5.26935 10.583 4.7307 10.583 4.39879 10.2511Z" fill="#4E4C51" />
                                    </Svg>

                                </View>
                                <View style={{ display: "flex", flexDirection: "column", gap: 2 }} >
                                    {data?.experience?.map((detail, index) => (

                                        <View key={index} style={{ flexDirection: "row", alignItems: "start", gap: 8 }}>

                                            <Svg style={{ marginTop: -2 }} width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M6.22764 10.8874L4.11264 8.77237C3.96245 8.62218 3.96245 8.37785 4.11264 8.22766L6.22764 6.11264C6.37783 5.96245 6.62217 5.96245 6.77236 6.11264L8.88736 8.22766C9.03755 8.37785 9.03755 8.62218 8.88736 8.77237L6.77236 10.8874C6.62217 11.0375 6.37783 11.0375 6.22764 10.8874Z" fill="#4E4C51" />
                                            </Svg>

                                            <View style={{ display: "flex", flexDirection: "column", gap: 8, }}>


                                                <Text style={{ color: "#414042", fontSize: "12px", fontFamily:'Kanit 500', }}>{detail.organization}</Text>


                                                <Text style={{ color: "#414042", fontSize: "12px",  fontFamily:'Kanit 500',}}>{detail.duration?.start?.year}-{" "}{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>



                                                <Text style={{ color: "#787879", fontSize: "12px",  fontFamily:'Kanit 300',}}>{detail.description}</Text>

                                            </View>

                                        </View>

                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        </Page>

    )
}

export default Template33



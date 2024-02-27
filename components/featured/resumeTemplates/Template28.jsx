import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template28({ data, selectedColor, selectedFont }) {

    return (
        <Page size="A4" style={{ paddingVertical: 24 }}>
            <View style={{ flexDirection: 'row', gap: "1.5rem" }}>

                <View style={{ width: "191px", marginVertical: -24 }}>
                    <View style={{ flexDirection: "column", minHeight: "841.7px", height: "100%", backgroundColor: selectedColor, gap: "18px", }}>
                        <View style={{ alignItems: "center", marginTop: "35px", flexDirection: "column", }}>

                            {data.profilePhoto ? (
                                <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{ width: "134px", marginBottom: "16px", height: "134px", borderRadius: "50%" }} />
                            ) : (
                                <Image src="/images/services/profile.png" alt="" style={{ width: "134px", marginBottom: "16px", height: "134px", borderRadius: "50%" }} />
                            )}
                            <View style={{ display: "flex" }}>
                                <Text style={{ color: "#fff", fontFamily: `${selectedFont} 400`, fontSize: "24px", }}>{data.firstName}</Text>
                                <Text style={{ color: "#fff", fontFamily: `${selectedFont} 400`, fontSize: "24px", }}>{data.lastName}</Text>
                            </View>
                            <Text style={{ fontSize: "8px", fontFamily: `${selectedFont} 400`, color: "white" }}>{data.designation}</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "column", gap: "8" }}>
                            <View style={{ padding: "8px 24px", backgroundColor: "#009C9E", marginTop: "4px", alignItems: "center", justifyContent: "space-between", flexDirection: "row", width: "190px" }}>

                                <Text style={{ color: "white", fontFamily: `${selectedFont} 400` }}>CONTACT</Text>

                            </View>
                            {data?.mobileNumber && (
                                <View style={{ flexDirection: "row", gap: "12px", justifyContent: "start", alignItems: "center", marginLeft: "24px", paddingRight: " 4px", paddingTop: "5px" }}>
                                    <View style={{ height: "24px", display: "flex", alignItems: "center" }}>
                                        <Image style={{ width: "18px", height: "18px" }} src="/images/services/telephone_white.png" alt="" />
                                    </View>
                                    <Text style={{ fontSize: "10px", paddingTop: "2px", flexDirection: "row", fontFamily: `${selectedFont} 400`, color: "#fff", }}>{data.mobileNumber}</Text>
                                </View>
                            )}
                            {data?.email && (
                                <View style={{ flexDirection: "row", breakAll: true, gap: "12px", justifyContent: "start", alignItems: "center", marginLeft: "24px", paddingRight: " 4px" }}>
                                    <View style={{ height: "24px", display: "flex", alignItems: "center" }}>
                                        <Image style={{ width: "18px", height: "18px" }} src="/images/services/message_white.png" alt="" />
                                    </View>
                                    <Text style={{ fontSize: "10px", width: '80%', paddingTop: "2px", flexDirection: "row", fontFamily: `${selectedFont} 400`, color: "#fff", }}>{data.email}</Text>
                                </View>
                            )}
                            {data?.location && (
                                <View style={{ flexDirection: "row", breakAll: true, justifyContent: "start", gap: "12px", alignItems: "center", marginLeft: "24px", paddingRight: " 4px" }}>
                                    <View style={{ height: "24px", flexDirection: "row", alignItems: "center" }}>
                                        <Image style={{ width: "18px", height: "18px" }} src="/images/services/location_white.png" alt="" />
                                    </View>
                                    <Text style={{ fontSize: "10px", flexDirection: "row", fontFamily: `${selectedFont} 400`, color: "#fff", }}>{data.location}</Text>
                                </View>
                            )}
                        </View>

                        {data?.languages?.length > 0 && (
                            <>
                                <View style={{ padding: "8px 24px", backgroundColor: "#009C9E", marginTop: "4px", alignItems: "center", justifyContent: "space-between", flexDirection: "row", width: "190px" }}>

                                    <Text style={{ color: "white", fontFamily: `${selectedFont} 400` }}>LANGUAGES</Text>

                                </View>
                                <View style={{ flexDirection: "column", color: "white", paddingRight: "16px", gap: "8px", justifyContent: "space-between", marginLeft: "24px" }}>
                                    {data?.languages?.map((detail, index) => (
                                        <View key={index} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                                            <Text style={{ fontSize: "12px", paddingTop: "2px", flexDirection: "row", fontFamily: `${selectedFont} 400`, color: "#fff", }}>{detail.languages}</Text>
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
                                                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M4 0.423828C1.79135 0.423828 0 2.21518 0 4.42383C0 6.63248 1.79135 8.42383 4 8.42383C6.20864 8.42383 8 6.63248 8 4.42383C8 2.21518 6.20987 0.423828 4 0.423828Z" fill={selectedColor} />
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
                        )}
                        {data?.hobbies?.length > 0 && (
                            <View style={{ flexDirection: "column", gap: "16px", }}>

                                <View style={{ padding: "8px 24px", backgroundColor: "#009C9E", marginTop: "4px", alignItems: "center", justifyContent: "space-between", flexDirection: "row", width: "190px" }}>

                                    <Text style={{ color: "white", fontFamily: `${selectedFont} 400` }}>HOBBIES</Text>

                                </View>
                                <View style={{ display: "grid", gridTemplateColumns: "2 1fr", gap: "16px", marginLeft: "24px" }}>
                                    {data?.hobbies?.map((item, index) => (
                                        <View key={index} style={{ color: "white", fontSize: "12px", fontFamily: `${selectedFont} 400` }}>
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
                <View style={{ width: "407px", padding: " 16px", display: "flex", flexDirection: "column", gap: "36px" }}>
                    <View style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start", paddingTop: "26px" }}>
                        <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", width: "100%" }}>
                            <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M15.9944 30C23.7229 30 29.991 23.732 29.9946 16C29.9981 8.26801 23.7359 2 16.0074 2C8.27886 2 2.01077 8.26801 2.00718 16C2.00359 23.732 8.26587 30 15.9944 30Z" fill={selectedColor} />
                                <Path d="M18.1427 19.4048C17.7135 19.337 17.7047 18.1531 17.7047 18.1531C17.7047 18.1531 18.9648 16.9014 19.2388 15.219C19.9771 15.219 20.4338 13.43 19.6943 12.801C19.7256 12.1381 20.644 7.59961 15.9929 7.59961C11.3417 7.59961 12.2614 12.1381 12.2915 12.801C11.5532 13.43 12.0087 15.219 12.7469 15.219C13.021 16.9014 14.2811 18.1531 14.2811 18.1531C14.2811 18.1531 14.2711 19.3357 13.8419 19.4048C12.4604 19.6257 7.30371 21.9069 7.30371 24.4103H24.6783C24.6808 21.9069 19.5241 19.6257 18.1427 19.4048Z" fill="white" />
                            </Svg>

                            <View style={{ display: "flex", flexDirection: "column", gap: 4, width: "90%" }}>
                                <Text style={{ color: "#282829", fontFamily: `${selectedFont} 400`, fontSize: "16px" }}>About me</Text>
                                <View style={{ height: "1px", width: "95%", backgroundColor: "#282829" }}></View>
                            </View>
                        </View>
                        <View style={{}}>
                            <Text style={{ color: "#787879", fontSize: "16px", paddingLeft: 8, fontFamily: `${selectedFont} 400` }}>{data.summery}</Text>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 8, width: "100%" }}>
                        <View style={{}}>
                            <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M15.9932 30C23.7216 30 29.9896 23.732 29.9932 16C29.9968 8.26802 23.7346 2 16.0062 2C8.2778 2 2.00979 8.26802 2.0062 16C2.00262 23.732 8.26481 30 15.9932 30Z" fill={selectedColor} />
                                <Path d="M17.3008 19.9571C16.938 20.1806 16.4725 20.3036 15.9907 20.3036C15.509 20.3036 15.0435 20.1806 14.6806 19.9571L8.74942 16.3075C8.74942 16.3075 8.21387 15.9785 8.21387 16.7243V20.3689C8.21387 22.2885 11.6962 24.3575 15.9907 24.3575C20.2852 24.3575 23.7676 22.2885 23.7676 20.3689V16.5184C23.7676 15.9195 23.3872 16.2121 23.3872 16.2121L17.3008 19.9571Z" fill="white" />
                                <Path d="M25.8546 13.4035C26.31 13.1236 26.31 12.6641 25.8546 12.3841L16.8189 7.8506C16.3634 7.57063 15.6176 7.57063 15.1621 7.8506L6.12774 12.3841C5.67226 12.6641 5.67226 13.1236 6.12774 13.4035L15.1621 18.9627C15.6176 19.2427 16.3634 19.2427 16.8189 18.9627" fill="white" />
                                <Path d="M25.4808 21.6418V15.5014C25.4808 15.5014 25.4846 15.2101 25.3131 15.3068C25.1755 15.3834 24.8376 15.5729 24.7175 15.6771C24.5799 15.7964 24.6112 16.0663 24.6112 16.0663V21.6418C24.6112 21.7209 24.5436 21.7586 24.5111 21.7774C24.1982 21.962 23.9893 22.3022 23.9893 22.6914C23.9893 23.2777 24.4623 23.7523 25.0466 23.7523C25.631 23.7523 26.104 23.2777 26.104 22.6914C26.104 22.2997 25.8925 21.9595 25.5784 21.7749C25.5459 21.7573 25.4808 21.7209 25.4808 21.6418Z" fill="white" />
                            </Svg>

                        </View>

                        <View style={{ display: "flex", flexDirection: "column", gap: 24, width: "90%" }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <Text style={{ color: "#282829", fontFamily: `${selectedFont} 400`, fontSize: "16px" }}>EDUCATION</Text>
                                <View style={{ height: "1px", marginTop: "4px", width: "95%", backgroundColor: "#282829" }}></View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", gap: 16 }} >
                                {data?.education?.map((detail, index) => (
                                    <>
                                        <View key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
                                                <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center" }} >
                                                    <Text style={{ marginTop: "-1px" }}>{">"}</Text>
                                                    <Text style={{ color: "#414042", fontSize: "11px", fontFamily: `${selectedFont} 400`, }}>{detail.instituteName}</Text>

                                                </View>
                                                <Text style={{ color: "#414042", fontSize: "9px", fontFamily: `${selectedFont} 400`, }}>{" "}{detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>

                                                <Text style={{ color: "#787879", fontSize: "9px", fontFamily: `${selectedFont} 400` }}>{detail.qualification} - {detail.specialization}</Text>
                                            </View>

                                        </View>
                                    </>
                                ))}
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 8, width: "100%" }}>
                        <View style={{}}>
                            <Svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M15.9803 30.0234C23.7017 30.0234 29.9697 23.7554 29.9803 16.0234C29.9909 8.29145 23.7402 2.02344 16.0188 2.02344C8.29747 2.02344 2.02946 8.29145 2.01883 16.0234C2.00819 23.7554 8.25895 30.0234 15.9803 30.0234Z" fill={selectedColor} />
                                <Path d="M16.9366 17.7995V17.3741C16.9366 16.8572 16.5188 16.4395 16.0033 16.4395C15.4879 16.4395 15.0713 16.856 15.0713 17.3741V17.7995C15.0713 18.3151 15.4879 18.7342 16.0033 18.7342C16.52 18.7342 16.9366 18.3151 16.9366 17.7995Z" fill="white" />
                                <Path d="M17.5765 18.3163C17.3688 18.9951 16.7457 19.4932 16.0026 19.4932C15.2595 19.4932 14.6364 18.9938 14.4288 18.3163H8.00206C7.59672 18.3163 7.21389 18.221 6.87109 18.0566V22.3374C6.87109 23.1717 7.55167 23.8568 8.38613 23.8568H23.6216C24.4548 23.8568 25.1366 23.1717 25.1366 22.3374V18.0591C24.7926 18.2222 24.4098 18.3176 24.0044 18.3176H17.5765V18.3163Z" fill="white" />
                                <Path d="M23.9397 10.6319H20.3028C20.0851 9.25561 18.8929 8.19922 17.4604 8.19922H14.5454C13.1117 8.19922 11.9207 9.25686 11.7005 10.6319H8.0649C7.19791 10.6319 6.4873 11.317 6.4873 12.1525V15.658C6.4873 16.4986 7.16665 17.1786 8.00236 17.1786H14.359C14.379 16.7407 14.5679 16.348 14.8632 16.0645C14.8707 16.0545 14.882 16.0494 14.8907 16.0406C14.957 15.9817 15.0258 15.924 15.0996 15.8738C15.1259 15.8575 15.1572 15.8449 15.1847 15.8273C15.246 15.7922 15.3073 15.7546 15.3711 15.7295C15.4224 15.7069 15.48 15.6944 15.5337 15.6793C15.5825 15.6643 15.6263 15.6454 15.6739 15.6367C15.779 15.6141 15.8903 15.6028 16.0017 15.6028C16.1143 15.6028 16.2231 15.6141 16.3294 15.6367C16.3782 15.6454 16.422 15.6643 16.4695 15.6793C16.5233 15.6944 16.5784 15.7069 16.6309 15.7295C16.6972 15.7571 16.7585 15.7922 16.8198 15.8273C16.8474 15.8436 16.8774 15.8562 16.9049 15.8738C16.9787 15.924 17.0475 15.9817 17.1113 16.0406C17.1214 16.0494 17.1314 16.0557 17.1414 16.0645C17.4366 16.3493 17.6243 16.7407 17.6455 17.1786H24.0022C24.8379 17.1786 25.5173 16.4986 25.5173 15.6592V12.1513C25.5173 11.3157 24.8079 10.6319 23.9397 10.6319ZM13.1605 10.6319C13.3544 10.0473 13.8986 9.62071 14.5454 9.62071H17.4604C18.1072 9.62071 18.6514 10.0473 18.8453 10.6319H13.1605Z" fill="white" />
                            </Svg>

                        </View>

                        <View style={{ display: "flex", flexDirection: "column", gap: 16, width: "90%" }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <Text style={{ color: "#282829", fontFamily: `${selectedFont} 400`, fontSize: "16px" }}>EXPERIENCE</Text>
                                <View style={{ height: "1px", marginTop: "4px", width: "95%", backgroundColor: "#282829" }}></View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", gap: 2 }} >
                                {data?.experience?.map((detail, index) => (

                                    <View key={index} style={{ display: "flex", alignItems: "start", gap: 4 }}>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center" }} >
                                                <Text style={{ marginTop: "-1px" }}>{">"}</Text>
                                                <Text style={{ color: "#414042", fontSize: "11px", fontFamily: `${selectedFont} 400`, }}>{detail.organization}</Text>

                                            </View>
                                            <Text style={{ color: "#414042", fontSize: "9px", fontFamily: `${selectedFont} 400`, }}>{" "}{detail.duration?.start?.year}-{" "}{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>
                                        </View>


                                        <Text style={{ color: "#787879", fontSize: "9px", fontFamily: `${selectedFont} 400` }}>{detail.designation} </Text>
                                        <Text style={{ color: "#787879", fontSize: "9px", fontFamily: `${selectedFont} 400` }}>{detail.description} </Text>


                                    </View>

                                ))}
                            </View>
                        </View>
                    </View>

                    {data?.skills?.length > 0 && (


                        <View style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start", paddingTop: "26px" }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", width: "100%" }}>
                                <Svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M15.9934 30.0234C23.7221 30.0234 29.9901 23.7554 29.9934 16.0234C29.9968 8.29145 23.7343 2.02344 16.0056 2.02344C8.277 2.02344 2.00899 8.29145 2.00563 16.0234C2.00226 23.7554 8.26481 30.0234 15.9934 30.0234Z" fill={selectedColor} />
                                    <Path d="M26.7433 13.6592C26.0851 13.1043 25.0778 13.1708 24.5072 13.8538L24.1631 14.2618L26.597 16.3107L26.9248 15.9052C27.4892 15.231 27.4178 14.2267 26.7433 13.6592Z" fill="white" />
                                    <Path d="M18.8689 22.2959C18.8226 22.4918 18.8901 22.6976 19.044 22.8257C19.1929 22.9513 19.4044 22.9889 19.5946 22.9073L21.538 22.0611C21.7632 21.9632 21.9647 21.8125 22.1211 21.6242L22.3025 21.4082L19.8687 19.3594L19.6872 19.574C19.5296 19.7623 19.4169 19.9883 19.3594 20.2281L18.8689 22.2959Z" fill="white" />
                                    <Path d="M20.5537 18.5513L22.9876 20.6003L25.9145 17.1251L23.4806 15.0762L20.5537 18.5513Z" fill="white" />
                                    <Path d="M22.5042 9.30104L20.492 7.38397C20.3018 7.20318 20.0678 7.09639 19.8213 7.02734V10.1334H22.9647C22.9008 9.81825 22.7407 9.52577 22.5042 9.30104Z" fill="white" />
                                    <Path d="M21.9616 23.0373L20.0158 23.8835C19.4677 24.1208 18.8333 24.0367 18.3628 23.6424C17.8985 23.252 17.6983 22.6418 17.8385 22.0505L18.3302 19.984C18.4253 19.586 18.6143 19.2106 18.8758 18.8955L22.999 14.0005V11.197H19.2925C18.9997 11.197 18.7632 10.9597 18.7632 10.6659V6.94727H10.8197C9.94374 6.94727 9.23047 7.66291 9.23047 8.54173V23.488C9.23047 24.3669 9.94249 25.0812 10.8197 25.0812H21.4098C22.2857 25.0812 22.999 24.3669 22.999 23.488V22.2326L22.9302 22.3142C22.6711 22.623 22.3358 22.8741 21.9616 23.0373ZM11.8796 10.1336H17.1753C17.4681 10.1336 17.7046 10.3709 17.7046 10.6647C17.7046 10.9585 17.4681 11.1957 17.1753 11.1957H11.8796C11.5867 11.1957 11.3502 10.9585 11.3502 10.6647C11.3502 10.3709 11.5867 10.1336 11.8796 10.1336ZM11.8796 13.3564H20.3524C20.6452 13.3564 20.8817 13.5937 20.8817 13.8875C20.8817 14.1813 20.6452 14.4185 20.3524 14.4185H11.8796C11.5867 14.4185 11.3502 14.1813 11.3502 13.8875C11.3502 13.5937 11.5867 13.3564 11.8796 13.3564ZM11.8796 16.544H18.2339C18.5267 16.544 18.7632 16.7814 18.7632 17.0751C18.7632 17.3689 18.5267 17.6062 18.2339 17.6062H11.8796C11.5867 17.6062 11.3502 17.3689 11.3502 17.0751C11.3502 16.7814 11.5867 16.544 11.8796 16.544ZM16.1166 20.795H11.8808C11.588 20.795 11.3515 20.5578 11.3515 20.264C11.3515 19.9702 11.588 19.733 11.8808 19.733H16.1166C16.4094 19.733 16.6459 19.9702 16.6459 20.264C16.6459 20.5578 16.4094 20.795 16.1166 20.795Z" fill="white" />
                                </Svg>

                                <View style={{ display: "flex", flexDirection: "column", gap: 4, width: "90%" }}>
                                    <Text style={{ color: "#282829", fontFamily: `${selectedFont} 400`, fontSize: "16px" }}>SKILLS</Text>
                                    <View style={{ height: "1px", width: "95%", backgroundColor: "#282829" }}></View>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", gap: 8, justifyContent: "space-between", width: "100%" }}>
                                {data?.skills?.map((detail, index) => (
                                    <View key={index} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "8", width: "100%" }}>
                                        <Text style={{ fontSize: 14, fontFamily: `${selectedFont} 400` }}>
                                            {detail.skill}
                                        </Text>
                                        <View style={{ display: "flex", gap: 24, flexDirection: "row", marginTop: "4px" }}>
                                            {[...Array(5)].map((_, i) => (
                                                <View key={i}>
                                                    {
                                                        detail.rating[i] === 0 ? (
                                                            <Svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <Path d="M4 8.52344C6.20914 8.52344 8 6.73252 8 4.5234C8 2.31428 6.20914 0.523438 4 0.523438C1.79086 0.523438 0 2.31428 0 4.5234C0 6.73252 1.79086 8.52344 4 8.52344Z" fill="#D1D3D4" />
                                                            </Svg>

                                                        ) : (
                                                            <Svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <Path fill-rule="evenodd" clip-rule="evenodd" d="M4 0.423828C1.79135 0.423828 0 2.21518 0 4.42383C0 6.63248 1.79135 8.42383 4 8.42383C6.20864 8.42383 8 6.63248 8 4.42383C8 2.21518 6.20987 0.423828 4 0.423828Z" fill={selectedColor} />
                                                            </Svg>
                                                        )
                                                    }
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>

                    )}
                </View>
            </View>
        </Page>

    )
}

export default Template28



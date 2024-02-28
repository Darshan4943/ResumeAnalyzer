import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template32({ data,selectedColor,selectedFont  }) {

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
                                <Text style={{ color: "#414042",fontFamily: `${selectedFont} 400`, fontSize: "24px", }}>{data.firstName}</Text>
                                <Text style={{ color: selectedColor, fontFamily: `${selectedFont} 400`, fontSize: "24px", }}>{data.lastName}</Text>
                            </View>
                            <Text style={{ fontSize: "12px", fontFamily: `${selectedFont} 400`, color: "#414042" }}>{data.designation}</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "column", gap: "8" }}>

                            {data?.mobileNumber && (
                                <View style={{ flexDirection: "row", gap: "12px", justifyContent: "start", alignItems: "center", marginLeft: "24px", paddingRight: " 4px", paddingTop: "5px" }}>

                                    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M15.0273 12.1398C15.0551 12.3563 14.9899 12.5451 14.829 12.7047L12.951 14.5688C12.8664 14.6632 12.7555 14.7437 12.6195 14.809C12.4836 14.8742 12.3491 14.9172 12.2173 14.9367C12.2076 14.9367 12.1799 14.9395 12.1327 14.9436C12.0855 14.9478 12.0245 14.9505 11.9496 14.9505C11.7707 14.9505 11.4808 14.92 11.0814 14.8589C10.6805 14.7979 10.1923 14.6479 9.61395 14.4064C9.03558 14.1663 8.37954 13.8068 7.64444 13.3266C6.91073 12.8463 6.12986 12.187 5.30184 11.3486C4.64302 10.699 4.09794 10.0772 3.66381 9.4831C3.23108 8.89042 2.88295 8.34076 2.61942 7.8383C2.3559 7.33445 2.15756 6.87779 2.02718 6.46832C1.89542 6.05886 1.80665 5.7063 1.7595 5.40926C1.71234 5.11222 1.69292 4.87904 1.70263 4.7097C1.71234 4.54036 1.7165 4.44597 1.7165 4.42793C1.73592 4.29606 1.77753 4.16141 1.8441 4.02539C1.91068 3.88936 1.98973 3.77834 2.08405 3.69367L3.96202 1.81428C4.09378 1.68242 4.24357 1.61719 4.41417 1.61719C4.53622 1.61719 4.64441 1.65187 4.73872 1.72266C4.83304 1.79345 4.91348 1.88089 4.97867 1.98499L6.48909 4.85266C6.5737 5.00257 6.59727 5.16777 6.55983 5.34682C6.52238 5.52588 6.44193 5.67577 6.31988 5.7993L5.62778 6.49192C5.60836 6.51135 5.59172 6.5419 5.57785 6.58354C5.56398 6.62657 5.55704 6.66126 5.55704 6.69041C5.59449 6.88751 5.67909 7.11377 5.81086 7.36777C5.92459 7.59402 6.09796 7.86886 6.33375 8.19505C6.56953 8.51985 6.90241 8.8946 7.33515 9.31795C7.75817 9.75101 8.13543 10.0883 8.46415 10.3284C8.79286 10.5686 9.06887 10.7448 9.2894 10.8586C9.51132 10.9711 9.68053 11.0405 9.79703 11.0627L9.97318 11.0988C9.9926 11.0988 10.0217 11.0918 10.0647 11.078C10.1077 11.0641 10.1368 11.0474 10.1563 11.0294L10.9607 10.2105C11.1299 10.0592 11.3283 9.98417 11.5529 9.98417C11.7124 9.98417 11.84 10.0119 11.9344 10.0688H11.9482L14.6723 11.679C14.872 11.7956 14.9885 11.951 15.0273 12.1398Z" fill={selectedColor} />
                                    </Svg>
                                    <Text style={{ fontSize: "10px", paddingTop: "2px", flexDirection: "row", fontFamily: `${selectedFont} 400`, color: "#414042", }}>{data.mobileNumber}</Text>
                                </View>
                            )}
                            {data?.email && (
                                <View style={{ flexDirection: "row", breakAll: true, gap: "12px", justifyContent: "start", alignItems: "center", marginLeft: "24px", paddingRight: " 4px" }}>
                                    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M15.0335 11.2831C15.0335 11.5758 14.9517 11.8465 14.8195 12.0847L10.6094 7.37372L14.7744 3.72982C14.936 3.98688 15.0335 4.28904 15.0335 4.61535V11.2831ZM8.36739 8.22883L14.1617 3.15904C13.9246 3.02894 13.656 2.94922 13.3675 2.94922H3.36725C3.0777 2.94922 2.81017 3.02894 2.57307 3.15904L8.36739 8.22883ZM9.98199 7.92247L8.64121 9.09652C8.56252 9.16472 8.46496 9.19937 8.36634 9.19937C8.26877 9.19937 8.1712 9.16472 8.09252 9.09652L6.75068 7.92247L2.48704 12.6932C2.74303 12.8538 3.04203 12.9492 3.36621 12.9492H13.3665C13.6906 12.9492 13.9896 12.8527 14.2456 12.6932L9.98199 7.92247ZM1.95933 3.72982C1.79776 3.98688 1.7002 4.28904 1.7002 4.61535V11.282C1.7002 11.5748 1.78203 11.8455 1.91422 12.0836L6.12331 7.37164L1.95933 3.72982Z" fill={selectedColor} />
                                    </Svg>
                                    <Text style={{ fontSize: "10px", width: '80%', paddingTop: "2px", flexDirection: "row", fontFamily: `${selectedFont} 400`, color: "#414042", }}>{data.email}</Text>
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
                                        <Path d="M8.36795 1.61719C5.97804 1.61719 4.03418 3.59575 4.03418 6.02747C4.03418 7.00705 4.64858 8.60405 5.91295 10.9095C6.80678 12.54 7.68673 13.9003 7.72317 13.9568L8.36795 14.9505L9.01185 13.9568C9.04917 13.9003 9.92824 12.54 10.8221 10.9095C12.0864 8.60405 12.7008 7.00705 12.7008 6.02747C12.7008 3.59575 10.757 1.61719 8.36795 1.61719ZM8.36795 8.28518C7.127 8.28518 6.12209 7.26144 6.12209 5.99833C6.12209 4.73522 7.12787 3.71146 8.36795 3.71146C9.60802 3.71146 10.6138 4.73522 10.6138 5.99833C10.6138 7.26144 9.60802 8.28518 8.36795 8.28518Z" fill={selectedColor} />
                                    </Svg>
                                    <Text style={{ fontSize: "10px", flexDirection: "row", fontFamily: `${selectedFont} 400`, color: "#414042", }}>{data.location}</Text>
                                </View>
                            )}
                        </View>

                        {data?.skills?.length > 0 && (
                            <>
                                <View style={{ paddingHorizontal: "24px" }}>

                                    <Text style={{ color: selectedColor,fontFamily: `${selectedFont} 400` }}>SKILLS</Text>

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
                                                                backgroundColor: "#BCBEC0",
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

                                    <Text style={{fontFamily: `${selectedFont} 400`, color: selectedColor }}>HOBBIES</Text>

                                </View>
                                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "16px", marginLeft: "24px" }}>
                                    {data?.hobbies?.map((item, index) => (
                                        <View key={index} style={{ color: "#414042", fontSize: "12px", width: "calc(40% - 8px)" }}>
                                            <Text style={{fontFamily: `${selectedFont} 400`,}}>
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
                            <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M15.9944 30C23.7229 30 29.991 23.732 29.9946 16C29.9981 8.26801 23.7359 2 16.0074 2C8.27886 2 2.01077 8.26801 2.00718 16C2.00359 23.732 8.26587 30 15.9944 30Z" fill={selectedColor} />
                                <Path d="M18.1427 19.4048C17.7135 19.337 17.7047 18.1531 17.7047 18.1531C17.7047 18.1531 18.9648 16.9014 19.2388 15.219C19.9771 15.219 20.4338 13.43 19.6943 12.801C19.7256 12.1381 20.644 7.59961 15.9929 7.59961C11.3417 7.59961 12.2614 12.1381 12.2915 12.801C11.5532 13.43 12.0087 15.219 12.7469 15.219C13.021 16.9014 14.2811 18.1531 14.2811 18.1531C14.2811 18.1531 14.2711 19.3357 13.8419 19.4048C12.4604 19.6257 7.30371 21.9069 7.30371 24.4103H24.6783C24.6808 21.9069 19.5241 19.6257 18.1427 19.4048Z" fill="white" />
                            </Svg>

                                <Text style={{ color: "#282829",fontFamily: `${selectedFont} 400`, fontSize: "16px" }}>About me</Text>

                            </View>
                            <View style={{ height: "1px", width: "95%", backgroundColor: "#BCBEC0" }}></View>
                        </View>
                        <View style={{}}>
                            <Text style={{ color: "#414042", fontSize: "14px", paddingLeft: 8,fontFamily: `${selectedFont} 400`, }}>{data.summery}</Text>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 8, width: "100%" }}>

                        <View style={{ display: "flex", flexDirection: "column", gap: 24, width: "90%" }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", width: "100%" }}>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4, width: "100%" }}>
                                <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M15.9932 30C23.7216 30 29.9896 23.732 29.9932 16C29.9968 8.26802 23.7346 2 16.0062 2C8.2778 2 2.00979 8.26802 2.0062 16C2.00262 23.732 8.26481 30 15.9932 30Z" fill={selectedColor} />
                                <Path d="M17.3008 19.9571C16.938 20.1806 16.4725 20.3036 15.9907 20.3036C15.509 20.3036 15.0435 20.1806 14.6806 19.9571L8.74942 16.3075C8.74942 16.3075 8.21387 15.9785 8.21387 16.7243V20.3689C8.21387 22.2885 11.6962 24.3575 15.9907 24.3575C20.2852 24.3575 23.7676 22.2885 23.7676 20.3689V16.5184C23.7676 15.9195 23.3872 16.2121 23.3872 16.2121L17.3008 19.9571Z" fill="white" />
                                <Path d="M25.8546 13.4035C26.31 13.1236 26.31 12.6641 25.8546 12.3841L16.8189 7.8506C16.3634 7.57063 15.6176 7.57063 15.1621 7.8506L6.12774 12.3841C5.67226 12.6641 5.67226 13.1236 6.12774 13.4035L15.1621 18.9627C15.6176 19.2427 16.3634 19.2427 16.8189 18.9627" fill="white" />
                                <Path d="M25.4808 21.6418V15.5014C25.4808 15.5014 25.4846 15.2101 25.3131 15.3068C25.1755 15.3834 24.8376 15.5729 24.7175 15.6771C24.5799 15.7964 24.6112 16.0663 24.6112 16.0663V21.6418C24.6112 21.7209 24.5436 21.7586 24.5111 21.7774C24.1982 21.962 23.9893 22.3022 23.9893 22.6914C23.9893 23.2777 24.4623 23.7523 25.0466 23.7523C25.631 23.7523 26.104 23.2777 26.104 22.6914C26.104 22.2997 25.8925 21.9595 25.5784 21.7749C25.5459 21.7573 25.4808 21.7209 25.4808 21.6418Z" fill="white" />
                            </Svg>

                                    <Text style={{ color: "#282829",fontFamily: `${selectedFont} 400`, fontSize: "16px" }}>EDUCATION</Text>

                                </View>
                                <View style={{ height: "1px", width: "95%", backgroundColor: "#BCBEC0" }}></View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", gap: 16 ,paddingLeft: 8}} >
                                {data?.education?.map((detail, index) => (
                                    <>
                                        <View key={index} style={{ display: "flex",flexDirection: "row", gap:16, alignItems: "start" }}>
                                            <View style={{ display: "flex", flexDirection: "column", gap: 8,justifyContent: "space-between",width:"30%" }}>


                                                <Text style={{ color: "#414042", fontSize: "11px", fontFamily: `${selectedFont} 700`, }}>{detail.instituteName}</Text>


                                                <Text style={{ color: "#414042", fontSize: "9px", fontFamily: `${selectedFont} 400`, }}>{" "}{detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "column", gap: 4 ,width:"70%"}}>

                                                <Text style={{ color: "#787879", fontSize: "9px", fontFamily: `${selectedFont} 700`, }}>{detail.qualification} - {detail.specialization}</Text>
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
                                <Svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M15.9803 30.0234C23.7017 30.0234 29.9697 23.7554 29.9803 16.0234C29.9909 8.29145 23.7402 2.02344 16.0188 2.02344C8.29747 2.02344 2.02946 8.29145 2.01883 16.0234C2.00819 23.7554 8.25895 30.0234 15.9803 30.0234Z" fill={selectedColor} />
                                <Path d="M16.9366 17.7995V17.3741C16.9366 16.8572 16.5188 16.4395 16.0033 16.4395C15.4879 16.4395 15.0713 16.856 15.0713 17.3741V17.7995C15.0713 18.3151 15.4879 18.7342 16.0033 18.7342C16.52 18.7342 16.9366 18.3151 16.9366 17.7995Z" fill="white" />
                                <Path d="M17.5765 18.3163C17.3688 18.9951 16.7457 19.4932 16.0026 19.4932C15.2595 19.4932 14.6364 18.9938 14.4288 18.3163H8.00206C7.59672 18.3163 7.21389 18.221 6.87109 18.0566V22.3374C6.87109 23.1717 7.55167 23.8568 8.38613 23.8568H23.6216C24.4548 23.8568 25.1366 23.1717 25.1366 22.3374V18.0591C24.7926 18.2222 24.4098 18.3176 24.0044 18.3176H17.5765V18.3163Z" fill="white" />
                                <Path d="M23.9397 10.6319H20.3028C20.0851 9.25561 18.8929 8.19922 17.4604 8.19922H14.5454C13.1117 8.19922 11.9207 9.25686 11.7005 10.6319H8.0649C7.19791 10.6319 6.4873 11.317 6.4873 12.1525V15.658C6.4873 16.4986 7.16665 17.1786 8.00236 17.1786H14.359C14.379 16.7407 14.5679 16.348 14.8632 16.0645C14.8707 16.0545 14.882 16.0494 14.8907 16.0406C14.957 15.9817 15.0258 15.924 15.0996 15.8738C15.1259 15.8575 15.1572 15.8449 15.1847 15.8273C15.246 15.7922 15.3073 15.7546 15.3711 15.7295C15.4224 15.7069 15.48 15.6944 15.5337 15.6793C15.5825 15.6643 15.6263 15.6454 15.6739 15.6367C15.779 15.6141 15.8903 15.6028 16.0017 15.6028C16.1143 15.6028 16.2231 15.6141 16.3294 15.6367C16.3782 15.6454 16.422 15.6643 16.4695 15.6793C16.5233 15.6944 16.5784 15.7069 16.6309 15.7295C16.6972 15.7571 16.7585 15.7922 16.8198 15.8273C16.8474 15.8436 16.8774 15.8562 16.9049 15.8738C16.9787 15.924 17.0475 15.9817 17.1113 16.0406C17.1214 16.0494 17.1314 16.0557 17.1414 16.0645C17.4366 16.3493 17.6243 16.7407 17.6455 17.1786H24.0022C24.8379 17.1786 25.5173 16.4986 25.5173 15.6592V12.1513C25.5173 11.3157 24.8079 10.6319 23.9397 10.6319ZM13.1605 10.6319C13.3544 10.0473 13.8986 9.62071 14.5454 9.62071H17.4604C18.1072 9.62071 18.6514 10.0473 18.8453 10.6319H13.1605Z" fill="white" />
                            </Svg>


                                    <Text style={{ color: "#282829", fontFamily: `${selectedFont} 400`, fontSize: "16px" }}>EXPERIENCE</Text>

                                </View>
                                <View style={{ height: "1px", width: "95%", backgroundColor: "#BCBEC0" }}></View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", gap: 16 ,paddingLeft: 8}} >
                                {data?.experience?.map((detail, index) => (
                                    <>
                                        <View key={index} style={{ display: "flex",flexDirection: "row", gap:16, }}>
                                            <View style={{ display: "flex", flexDirection: "column", gap: 8,justifyContent: "space-between",width:"30%" }}>


                                                <Text style={{ color: "#414042", fontSize: "11px", fontFamily: `${selectedFont} 700`, }}>{detail.designation}</Text>


                                                <Text style={{ color: "#414042", fontSize: "9px",  fontFamily: `${selectedFont} 400`, }}>{detail.duration?.start?.year}-{" "}{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "column", gap: 4 ,width:"70%"}}>

                                                <Text style={{ color: "#787879", fontSize: "9px",  fontFamily: `${selectedFont} 700`, }}>{detail.organization} </Text>
                                                <Text style={{ color: "#787879", fontSize: "9px",  fontFamily: `${selectedFont} 400`, }}>{detail.description} </Text>
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



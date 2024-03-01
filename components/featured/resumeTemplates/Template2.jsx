import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template2({ data, selectedColor, selectedFont }) {
    return (
        <Page size="A4" style={{ backgroundColor: "#2C2A31", }}  >
            <View style={{ display: 'flex', flexDirection: 'row', breakAll: true, }}>
                <View style={{ paddingTop: '260px', width: '369px', paddingLeft: '16px', flexDirection: "column", justifyContent: "space-between", backgroundColor: "#FFFFFF", }}>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        <View style={{ flexDirection: 'column', width: '100%' }}>
                            <View style={{ flexDirection: 'column', gap: '8', width: '100%' }}>
                                <Text style={{ color: '#3C3A40', fontSize: '20px', fontFamily: `${selectedFont} 600`, paddingTop: '13px', }}>ABOUT ME</Text>
                                <View style={{ backgroundColor: selectedColor, height: '3px', width: '85%' }} />
                                <Text style={{ color: '#272128', fontSize: '12px', fontFamily: `${selectedFont} 500`, maxWidth: '80%' }}>{data.summery}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', gap: '12', width: '100%', marginTop: '4px' }}>
                                <Text style={{ color: '#3C3A40', fontSize: '20px', fontFamily: `${selectedFont} 600`, paddingTop: '13px', }}>EDUCATION</Text>
                                <View style={{ backgroundColor: selectedColor, height: '3px', width: '85%' }} />
                                {data?.education?.map((detail, index) => (
                                    <View key={index} style={{ flexDirection: 'column', gap: '2', }}>
                                        <Text style={{ color: '#272128', fontSize: '12', fontFamily: `${selectedFont} 600`, maxWidth: '80%' }}>{detail.qualification}</Text>
                                        <Text style={{ color: '#272128', fontSize: '12', fontFamily: `${selectedFont} 500`, maxWidth: '80%' }}>{detail.specialization}</Text>
                                        <Text style={{ color: '#272128', fontSize: '12', fontFamily: `${selectedFont} 300`, maxWidth: '80%' }}>{detail.instituteName}</Text>
                                        <Text style={{ color: '#272128', fontSize: '12', fontFamily: `${selectedFont} 500`, maxWidth: '80%' }}>
                                            {detail.duration?.end?.year &&
                                                <Text style={{ color: '#59595E', fontSize: '10', maxWidth: '80%' }}>
                                                    {detail.duration?.start?.year}-
                                                    {detail.duration?.end?.year}
                                                </Text>
                                            }
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'column', gap: '12', width: '100%', marginTop: '8px' }}>
                                <Text style={{ color: '#3C3A40', fontSize: '20px', fontFamily: `${selectedFont} 600`, paddingTop: '13px', lineHeight: 'normal' }}>EXPERIENCE</Text>
                                <View style={{ backgroundColor: selectedColor, height: '3px', width: '85%' }} />
                                {data?.experience?.map((detail, index) => (
                                    <View key={index} style={{ flexDirection: 'column', gap: '2', flexWrap: "wrap" }}>
                                        <Text style={{ color: '#272128', fontSize: '12', fontFamily: `${selectedFont} 600`, maxWidth: '80%' }}>{detail.organization}</Text>
                                        <Text style={{ color: '#272128', fontSize: '12', fontFamily: `${selectedFont} 500`, maxWidth: '80%' }}>{detail.designation}</Text>
                                        <Text style={{ color: '#272128', fontSize: '12', fontFamily: `${selectedFont} 300`, maxWidth: '80%' }}>{detail.description}</Text>
                                        <Text style={{ color: '#272128', fontSize: '10', fontFamily: `${selectedFont} 300`, maxWidth: '80%' }}>
                                            {detail.duration?.start?.year}-{" "}
                                            {detail.currentlyWorking
                                                ? "Present"
                                                : detail.duration?.end?.year}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            {data?.languages?.length > 0 && (
                                <View style={{ display: 'flex', flexDirection: 'column', gap: '12', width: '100%', marginTop: '8px' }}>
                                    <Text style={{ color: '#3C3A40', fontSize: '20px', fontFamily: `${selectedFont} 400`, }}>Languages</Text>
                                    <View style={{ backgroundColor: selectedColor, height: '3px', width: '85%' }} />
                                    <View style={{ flexDirection: "col", gap: 8 }}>
                                        {data?.languages?.map((detail, index) => (
                                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', width: '85%' }}>
                                                <Text>{detail.languages}</Text>
                                                <View style={{ flexDirection: 'row', gap: '8px', marginTop: '4px' }}>
                                                    {[...Array(3)].map((_, i) => (
                                                        <View key={i}>
                                                            {detail.rating[i] === 0 ? (
                                                                <Svg width={8} height={7} viewBox="0 0 8 7">
                                                                    <Path d="M4.02911 0.285156C2.23911 0.285156 0.789062 1.73615 0.789062 3.52515C0.789062 5.31415 2.24011 6.76514 4.02911 6.76514C5.81811 6.76514 7.2691 5.31415 7.2691 3.52515C7.2691 1.73615 5.81811 0.285156 4.02911 0.285156Z" fill="#D1D3D4" />
                                                                </Svg>
                                                            ) : (
                                                                <Svg width={8} height={8} viewBox="0 0 8 8">
                                                                    <Path d="M4.02911 0.886719C2.23911 0.886719 0.789062 2.33771 0.789062 4.12671C0.789062 5.91571 2.24011 7.36676 4.02911 7.36676C5.81811 7.36676 7.2691 5.91571 7.2691 4.12671C7.2691 2.33771 5.81811 0.886719 4.02911 0.886719Z" fill={selectedColor} />
                                                                </Svg>
                                                            )}
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
                    <View style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: '366.5px', marginTop: '8px', height: '42px', backgroundColor: selectedColor }}></View>
                </View>
                <View style={{ backgroundColor: '#2C2A31', width: '230px', paddingLeft: '16px', paddingBottom: '4px', minHeight: 841.8 }}>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: '12', alignItems: 'flex-start', marginTop: '200px' }}>
                        <View style={{ display: 'flex', flexDirection: 'column', gap: '12', maxWidth: '200px' }}>
                            <Text style={{ color: '#fff', fontSize: '18px', fontFamily: `${selectedFont} 600`, }}>Contact Me</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center', }}>
                                <View style={{}}>
                                    <Svg width={14} height={18} viewBox="0 0 13 17" fill="none">
                                        <Path d="M6.90887 0.289062C3.60787 0.289062 0.921875 2.97441 0.921875 6.27684C0.921875 10.3744 6.27887 16.3892 6.50787 16.6432C6.72187 16.8822 7.09588 16.8812 7.30988 16.6432C7.53788 16.3892 12.8949 10.3744 12.8949 6.27684C12.8959 2.97541 10.2099 0.289062 6.90887 0.289062ZM6.90887 9.28923C5.24787 9.28923 3.89688 7.93806 3.89688 6.27684C3.89688 4.61563 5.24787 3.26446 6.90887 3.26446C8.56987 3.26446 9.92087 4.61563 9.92087 6.27684C9.92087 7.93806 8.56987 9.28923 6.90887 9.28923Z" fill={selectedColor} />
                                    </Svg>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', }}>
                                    <Text style={{ color: '#fff', fontSize: '10px', fontFamily: `${selectedFont} 600`, }}>Address</Text>
                                    <Text style={{ color: '#fff', fontSize: '10px', fontFamily: `${selectedFont} 300`, flexWrap: "wrap", }}>{data.location}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', paddingTop: '10px', gap: 12, alignItems: 'center', width: "80%" }}>
                                <Svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M17.2752 11.222C17.2752 11.594 17.1695 11.9407 17.0025 12.243L11.6375 6.2395L16.9455 1.59527C17.1526 1.92293 17.2773 2.30765 17.2773 2.72409L17.2752 11.222ZM8.77734 7.33025L16.1633 0.868105C15.861 0.701107 15.5186 0.599609 15.1508 0.599609H2.40393C2.03611 0.599609 1.69366 0.701107 1.39137 0.868105L8.77734 7.33025ZM10.8363 6.93919L9.12614 8.43585C9.02678 8.52252 8.90206 8.56693 8.77734 8.56693C8.65262 8.56693 8.5279 8.52252 8.42855 8.43585L6.7184 6.93919L1.28356 13.0188C1.6091 13.2238 1.99172 13.3464 2.40393 13.3464H15.1508C15.563 13.3464 15.9456 13.2238 16.2711 13.0188L10.8363 6.93919ZM0.609226 1.5974C0.402063 1.92506 0.277344 2.30978 0.277344 2.72622V11.2241C0.277344 11.5961 0.380924 11.9428 0.550037 12.2451L5.91512 6.2395L0.609226 1.5974Z" fill={selectedColor} />
                                </Svg>

                                <View style={{ display: 'flex', flexDirection: 'column', }}>
                                    <Text style={{ color: '#fff', fontSize: '10px', fontFamily: `${selectedFont} 600`, }}>Email</Text>
                                    <Text style={{ color: '#fff', fontSize: '10px', fontFamily: `${selectedFont} 300`, flexDirection: 'row', flexWrap: "wrap", width: "80%" }}>{data.email}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', paddingTop: '10px', gap: 12, alignItems: 'center' }}>
                                <Svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M15.1362 12.4667L11.9973 10.4694H11.9812C11.8732 10.3994 11.7262 10.3645 11.5422 10.3645C11.2822 10.3645 11.0543 10.4575 10.8593 10.6445L9.93226 11.6596C9.91026 11.6826 9.87524 11.7036 9.82624 11.7206C9.77724 11.7386 9.74125 11.7476 9.72025 11.7476L9.51725 11.7036C9.38125 11.6736 9.18625 11.5896 8.93125 11.4496C8.67625 11.3096 8.35926 11.0905 7.98026 10.7925C7.60026 10.4944 7.16624 10.0774 6.67924 9.54034C6.18024 9.01527 5.79524 8.55121 5.52424 8.14816C5.25324 7.74611 5.05225 7.40405 4.92225 7.12401C4.77025 6.80897 4.67225 6.52893 4.62925 6.2839C4.62925 6.2489 4.63724 6.20488 4.65424 6.15287C4.67024 6.09987 4.68925 6.06188 4.71125 6.03888L5.50825 5.18076C5.64925 5.02874 5.74126 4.84171 5.78526 4.61968C5.82926 4.39865 5.80126 4.19362 5.70426 4.0066L3.96424 0.45114C3.88824 0.323123 3.79624 0.215104 3.68824 0.127092C3.57924 0.0400809 3.45425 -0.00390625 3.31425 -0.00390625C3.11925 -0.00390625 2.94625 0.0780996 2.79325 0.241121L0.630257 2.57044C0.521257 2.67545 0.429249 2.81245 0.353249 2.98248C0.277249 3.1515 0.229253 3.31751 0.207253 3.48153C0.207253 3.50454 0.202254 3.62156 0.190254 3.83159C0.179254 4.04161 0.201257 4.33066 0.255257 4.6987C0.310257 5.06675 0.412247 5.5048 0.564247 6.01186C0.716247 6.51993 0.943261 7.08601 1.24726 7.71109C1.55126 8.33617 1.95224 9.01627 2.45124 9.75137C2.95024 10.4875 3.57926 11.2575 4.33826 12.0636C5.29226 13.1028 6.19225 13.9199 7.03825 14.515C7.88425 15.1101 8.64026 15.5571 9.30726 15.8542C9.97426 16.1522 10.5382 16.3392 10.9992 16.4152C11.4602 16.4912 11.7932 16.5292 11.9992 16.5292C12.0862 16.5292 12.1562 16.5263 12.2102 16.5203C12.2642 16.5143 12.2973 16.5113 12.3083 16.5113C12.4603 16.4872 12.6142 16.4352 12.7712 16.3532C12.9282 16.2722 13.0563 16.1722 13.1533 16.0552L15.3163 13.7439C15.5003 13.5449 15.5763 13.3118 15.5443 13.0428C15.4993 12.8108 15.3642 12.6187 15.1362 12.4667Z" fill={selectedColor} />
                                </Svg>

                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Text style={{ color: '#fff', fontSize: '10px', fontFamily: `${selectedFont} 600`, }}>Phone</Text>
                                    <Text style={{ color: '#fff', fontSize: '10px', fontFamily: `${selectedFont} 300`, flexWrap: "wrap" }}>{data.mobileNumber}</Text>
                                </View>
                            </View>
                        </View>
                        {data?.skills?.length > 0 && (
                            <>
                                <View style={{ height: '1px', backgroundColor: '#fff', width: '100%' }}></View>
                                <View style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <Text style={{ color: '#fff', fontSize: '18px', fontFamily: `${selectedFont} 600`, }}>Skills</Text>
                                    {data.skills?.map((detail, index) => {
                                        const calculateWidthPercentage = (rating) => {
                                            let ratingPercentage = 0;
                                            if (rating && rating.length > 0) {
                                                const zerosCount = rating.filter(val => val === 0).length;

                                                if (zerosCount === 0) ratingPercentage = 90;
                                                else if (zerosCount === 1) ratingPercentage = 70;
                                                else if (zerosCount === 2) ratingPercentage = 50;
                                                else if (zerosCount === 3) ratingPercentage = 30;
                                                else if (zerosCount === 4) ratingPercentage = 10;
                                            }
                                            return ratingPercentage;
                                        };

                                        const ratingPercentage = calculateWidthPercentage(detail.rating);

                                        return (
                                            <View key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                                                <View>
                                                    <Svg width={31} height={32} viewBox="0 0 31 32" fill="none">
                                                        <Path d="M0.529297 31.1166C0.529297 21.0683 0.529297 11.021 0.529297 0.972656C10.5763 0.972656 20.6223 0.972656 30.6693 0.972656C30.6693 11.014 30.6693 21.0553 30.6693 31.1166C20.5953 31.1166 10.5623 31.1166 0.529297 31.1166ZM2.3063 29.3304C11.1833 29.3304 20.0353 29.3304 28.8803 29.3304C28.8803 20.4552 28.8803 11.6011 28.8803 2.75292C20.0113 2.75292 11.1653 2.75292 2.3063 2.75292C2.3063 11.6161 2.3063 20.4622 2.3063 29.3304Z" fill={selectedColor} />
                                                    </Svg>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', gap: '0', marginLeft: '-1.5px' }}>
                                                    <Text style={{ color: '#fff', fontSize: '10px', fontFamily: `${selectedFont} 300`, marginLeft: '5px', lineHeight: "1px" }}>

                                                        {detail.skill}
                                                    </Text>
                                                    <View style={{ position: 'relative' }}>
                                                        <Svg width={162} height={13} viewBox="0 0 162 13" fill="none">
                                                            <Path d="M1.66992 6.17383H160.218" stroke={selectedColor} strokeWidth={3} strokeMiterlimit={10} strokeLinecap="round" />
                                                        </Svg>
                                                        <View style={{ position: 'absolute', top: '-10%', left: `${ratingPercentage}%` }}>
                                                            <Svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <Path d="M6.66418 12.4647C9.86578 12.4647 12.4612 9.86891 12.4612 6.66689C12.4612 3.46488 9.86578 0.869141 6.66418 0.869141C3.46259 0.869141 0.867188 3.46488 0.867188 6.66689C0.867188 9.86891 3.46259 12.4647 6.66418 12.4647Z" fill="white" />
                                                            </Svg>

                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            </>
                        )}
                    </View>
                </View>
                <View style={{ position: 'absolute', left: 24, top: 24, }}>

                    <View style={{ top: '95%', left: '65%', }}>
                        <Svg width={341} height={48} viewBox="0 0 311 48" fill="none" style={{ filter: 'brightness(10%)' }}>
                            <Path d="M311 48H20.1135L0 0H311V48Z" fill={selectedColor} />
                            <Text x="10%" y="85%" dominantBaseline="middle" textAnchor="start" fill="white" fontSize={10} fontFamily={`${selectedFont} 600`}>{data.designation}</Text>
                        </Svg>
                    </View>
                    <View style={{ top: '35%', left: '55%', elevation: 5 }}>
                        <View style={{ width: 401, color: "#FFF", height: 33, backgroundColor: selectedColor, flexDirection: "row", alignItems: "center", paddingLeft: 40 }} >

                            <Text style={{ fontSize: 22, fontFamily: `${selectedFont} 600` }} >{data.firstName}  {data.lastName} </Text>
                        </View>

                    </View>
                    <View style={{ display: "flex", width: '200px', position: 'absolute', left: 24, height: '200px', borderRadius: '50%', border: "2px", padding: 8, backgroundColor: "#fff" }}>
                        {data.profilePhoto ? (
                            <Image src={URL.createObjectURL(data.profilePhoto)} />
                        ) : (

                            <Image src="/images/services/profile.png" />
                        )}

                    </View>
                </View>
            </View>
        </Page>

    )
}

export default Template2
import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template2({ data }) {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', width: '800px', breakAll: true, }}>
            <View style={{ paddingTop: '16px', width: '369px', minHeight: '841px', paddingLeft: '16px' }}>
                <View style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <View style={{ position: 'relative', marginLeft: '10px', zIndex: 100 }}>

                        <View style={{ position: 'absolute', top: '37%', left: '75%', }}>
                            <Svg width={341} height={48} viewBox="0 0 311 48" fill="none">
                                <Path d="M311 48H20.1135L0 0H311V48Z" fill="#B3691B" />
                                <Text x="10%" y="85%" dominantBaseline="middle" textAnchor="start" fill="white" fontSize={10} fontWeight={600}>{data.designation} </Text>
                            </Svg>
                        </View>
                        <View style={{ position: 'absolute', top: '35%', left: '55%', elevation: 5 }}>
                            <View style={{ width: 401, color: "#FFF", height: 33, backgroundColor: "#F7902B", flexDirection: "row", alignItems: "center", paddingLeft: 40 }} >

                                <Text style={{ fontSize: 22, }} >{data.firstName}  {data.lastName} </Text>
                            </View>

                        </View>
                        {data.profilePhoto ? (
                            <Image src={URL.createObjectURL(data.profilePhoto)} style={{ width: '200px', position: 'relative', height: '200px', borderRadius: '100px', elevation: 5 }} />
                        ) : (
                            <Image src="/images/services/profile.png" style={{ width: '200px', position: 'relative', elevation: 15, height: '200px', borderRadius: '50%' }} />
                        )}


                    </View>
                    <View style={{ flexDirection: 'column', width: '100%' }}>
                        <View style={{ flexDirection: 'column', gap: '8', width: '100%' }}>
                            <Text style={{ color: '#676669', fontSize: '20px', fontWeight: 600, paddingTop: '13px', }}>ABOUT ME</Text>
                            <View style={{ backgroundColor: '#F7902B', height: '3px', width: '85%' }} />
                            <Text style={{ color: '#272128', fontSize: '12px', fontWeight: 500, maxWidth: '80%' }}>{data.summery}</Text>
                        </View>
                        <View style={{ flexDirection: 'column', gap: '12', width: '100%', marginTop: '4px' }}>
                            <Text style={{ color: '#3C3A40', fontSize: '20px', fontWeight: 600, paddingTop: '13px', }}>EDUCATION</Text>
                            <View style={{ backgroundColor: '#F7902B', height: '3px', width: '85%' }} />
                            {data?.education?.map((detail, index) => (
                                <View key={index}>
                                    <Text style={{ color: '#272128', fontSize: '12', fontWeight: 500, maxWidth: '80%' }}>{detail.qualification}</Text>
                                    <Text style={{ color: '#272128', fontSize: '12', fontWeight: 500, maxWidth: '80%' }}>{detail.specialization}</Text>
                                    <Text style={{ color: '#272128', fontSize: '12', fontWeight: 300, maxWidth: '80%' }}>{detail.instituteName}</Text>
                                    <Text style={{ color: '#272128', fontSize: '12', fontWeight: 300, maxWidth: '80%' }}>
                                        {detail.duration?.end?.year &&
                                            <Text style={{ color: '#272128', fontSize: '10', fontWeight: 300, maxWidth: '80%' }}>
                                                {detail.duration?.start?.year}-
                                                {detail.duration?.end?.year}
                                            </Text>
                                        }
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'column', gap: '12', width: '100%', marginTop: '8px' }}>
                            <Text style={{ color: '#3C3A40', fontSize: '20px', fontWeight: 600, paddingTop: '13px', lineHeight: 'normal' }}>EXPERIENCE</Text>
                            <View style={{ backgroundColor: '#F7902B', height: '3px', width: '85%' }} />
                            {data?.experience?.map((detail, index) => (
                                <View key={index}>
                                    <Text style={{ color: '#272128', fontSize: '12', fontWeight: 500, maxWidth: '80%' }}>{detail.organization}</Text>
                                    <Text style={{ color: '#272128', fontSize: '12', fontWeight: 500, maxWidth: '80%' }}>{detail.designation}</Text>
                                    <Text style={{ color: '#272128', fontSize: '12', fontWeight: 300, maxWidth: '80%' }}>{detail.description}</Text>
                                    <Text style={{ color: '#272128', fontSize: '10', fontWeight: 300, maxWidth: '80%' }}>
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
                                <Text style={{ color: '#3C3A40', fontSize: '20px', fontWeight: 600, }}>Languages</Text>
                                <View style={{ backgroundColor: '#F7902B', height: '3px', width: '85%' }} />
                                <View style={{ flexDirection: "col", gap: 8 }}>
                                    {data?.languages?.map((detail, index) => (
                                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
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
                                                                <Path d="M4.02911 0.886719C2.23911 0.886719 0.789062 2.33771 0.789062 4.12671C0.789062 5.91571 2.24011 7.36676 4.02911 7.36676C5.81811 7.36676 7.2691 5.91571 7.2691 4.12671C7.2691 2.33771 5.81811 0.886719 4.02911 0.886719Z" fill="#F7902B" />
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
                        <View style={{ width: '369px', marginLeft: '-16px', marginTop: '8px', height: '42px', backgroundColor: '#F7902B' }}></View>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: '#2C2A31', width: '226', paddingLeft: '16px', paddingBottom: '4px' }}>
                <View style={{ display: 'flex', flexDirection: 'column', gap: '12', alignItems: 'flex-start', marginTop: '200px' }}>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: '12' }}>
                        <Text style={{ color: '#fff', fontSize: '18px', fontWeight: 600, }}>Contact Me</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '4', alignItems: 'center' }}>
                            <View style={{}}>
                                <Svg width={14} height={18} viewBox="0 0 13 17" fill="none">
                                    <Path d="M6.90887 0.289062C3.60787 0.289062 0.921875 2.97441 0.921875 6.27684C0.921875 10.3744 6.27887 16.3892 6.50787 16.6432C6.72187 16.8822 7.09588 16.8812 7.30988 16.6432C7.53788 16.3892 12.8949 10.3744 12.8949 6.27684C12.8959 2.97541 10.2099 0.289062 6.90887 0.289062ZM6.90887 9.28923C5.24787 9.28923 3.89688 7.93806 3.89688 6.27684C3.89688 4.61563 5.24787 3.26446 6.90887 3.26446C8.56987 3.26446 9.92087 4.61563 9.92087 6.27684C9.92087 7.93806 8.56987 9.28923 6.90887 9.28923Z" fill="#F7902B" />
                                </Svg>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column' }}>
                                <Text style={{ color: '#fff', fontSize: '10px', fontWeight: 600, }}>Address</Text>
                                <Text style={{ color: '#fff', fontSize: '10px', fontWeight: 300, }}>{data.location}</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', paddingTop: '10px', gap: '4', alignItems: 'center' }}>
                            <View style={{}}>
                                <Image src="/images/services/email_yellow.png" style={{ width: '16px', height: '17px' }} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column' }}>
                                <Text style={{ color: '#fff', fontSize: '10px', fontWeight: 600, }}>Email</Text>
                                <Text style={{ color: '#fff', fontSize: '10px', fontWeight: 300, }}>{data.email}</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', paddingTop: '10px', gap: '4', alignItems: 'center' }}>
                            <View style={{}}>
                                <Image src="/images/services/phone_yellow.png" style={{ width: '16px', height: '17px' }} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column' }}>
                                <Text style={{ color: '#fff', fontSize: '10px', fontWeight: 600, }}>Phone</Text>
                                <Text style={{ color: '#fff', fontSize: '10px', fontWeight: 300, }}>{data.mobileNumber}</Text>
                            </View>
                        </View>
                    </View>
                    {data?.skills?.length > 0 && (
                        <>
                            <View style={{ height: '1px', backgroundColor: '#fff', width: '100%' }}></View>
                            <View style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <Text style={{ color: '#fff', fontSize: '18px', fontWeight: 600, }}>Skills</Text>
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
                                                    <Path d="M0.529297 31.1166C0.529297 21.0683 0.529297 11.021 0.529297 0.972656C10.5763 0.972656 20.6223 0.972656 30.6693 0.972656C30.6693 11.014 30.6693 21.0553 30.6693 31.1166C20.5953 31.1166 10.5623 31.1166 0.529297 31.1166ZM2.3063 29.3304C11.1833 29.3304 20.0353 29.3304 28.8803 29.3304C28.8803 20.4552 28.8803 11.6011 28.8803 2.75292C20.0113 2.75292 11.1653 2.75292 2.3063 2.75292C2.3063 11.6161 2.3063 20.4622 2.3063 29.3304Z" fill="#F7902B" />
                                                </Svg>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'column', gap: '2', marginLeft: '-1.5px' }}>
                                                <Text style={{ color: '#fff', fontSize: '11px', fontWeight: 300, marginLeft: '5px', }}>
                                                    {detail.skill}
                                                </Text>
                                                <View style={{ position: 'relative' }}>
                                                    <Svg width={162} height={13} viewBox="0 0 162 13" fill="none">
                                                        <Path d="M1.66992 6.17383H160.218" stroke="#F7902B" strokeWidth={3} strokeMiterlimit={10} strokeLinecap="round" />
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
        </View>

    )
}

export default Template2
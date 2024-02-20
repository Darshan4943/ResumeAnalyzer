import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template23({ data }) {
    return (
        <Page size="A4" style={{ padding: 24 }}>
            <View style={{ flexDirection: "column", gap: 24,minHeight:792, }}>
                <View style={{ flexDirection: "row", gap: 24, }}>
                    <View style={{ width: "135", height: "135", }}>
                        {data.profilePhoto ? (
                            <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{}} />
                        ) : (
                            <Image src="/images/services/profile.png" alt="" style={{}} />
                        )}
                    </View>
                    <View style={{ flexDirection: "column", gap: 4, }}>
                        <View style={{ flexDirection: 'column', width: 360, }}>

                            <Text style={{ fontSize: 48, fontWeight: '700', color: "#494949" }}>{data.firstName} </Text>

                            <Text style={{ fontSize: 48, fontWeight: '700', color: "#494949" }}>{data.lastName}</Text>


                        </View>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: "#494949" }}>{data.designation}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", gap: 16 }}>
                    <View style={{ flexDirection: "column", gap: 24, width: 326, }}>

                        <View style={{ display: "flex", flexDirection: "column", gap: "8", padding: 16, border: 1 }}>
                            <Text style={{ color: "#030203", fontSize: "16px", fontWeight: 400, }}>CONTACT</Text>

                            {data?.mobileNumber && (
                                <View style={{ flexDirection: "row", gap: "12px", justifyContent: "start", alignItems: "center", padding: " 4px", }}>

                                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M13.7305 11.4931L11.8772 9.63512C11.5082 9.26663 10.8975 9.27796 10.5158 9.66062L9.58132 10.596C9.52194 10.5648 9.46115 10.5294 9.39754 10.494C8.80803 10.1666 8.0008 9.71874 7.15117 8.86555C6.30012 8.01094 5.85198 7.20025 5.524 6.60926C5.48866 6.5469 5.45615 6.48737 5.42363 6.42927L6.0499 5.80143L6.35808 5.49246C6.73978 5.1098 6.75251 4.49613 6.38212 4.12764L4.52876 2.26961C4.1612 1.90112 3.55048 1.91105 3.16595 2.29513L2.6443 2.82093L2.65843 2.8351C2.48313 3.05903 2.33752 3.31697 2.22867 3.59617C2.12829 3.86262 2.06468 4.11488 2.03782 4.36715C1.79325 6.40092 2.72064 8.26037 5.2342 10.7817C8.71189 14.2667 11.5153 14.0045 11.6354 13.9904C11.8984 13.9592 12.1514 13.8968 12.4073 13.7962C12.683 13.6885 12.9403 13.5425 13.1636 13.3668L13.1749 13.3781L13.7051 12.858C14.0882 12.4753 14.0995 11.863 13.7305 11.4931Z" fill="#221F1F" />
                                    </Svg>


                                    <Text style={{ fontSize: "12px", flexDirection: "row", fontWeight: 400, color: "#58595B", }}>{data.mobileNumber}</Text>
                                </View>
                            )}
                            {data?.email && (
                                <View style={{ flexDirection: "row", breakAll: true, gap: "12px", justifyContent: "start", alignItems: "center", padding: " 4px", }}>
                                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M8.00216 9.80322L6.51532 8.43582L2.27112 12.2536C2.42543 12.4085 2.63165 12.5 2.86095 12.5H13.1362C13.3655 12.5 13.5717 12.4071 13.726 12.2536L9.48179 8.43582L8.00216 9.80322ZM13.7274 3.74642C13.5775 3.59152 13.3669 3.5 13.1376 3.5H2.8624C2.63598 3.5 2.42543 3.59293 2.27257 3.74642L8.00361 8.90198L13.7274 3.74642ZM2 4.2914V11.7691L6.14325 8.07113L2 4.2914ZM9.85675 8.06971L14 11.7677V4.28577L9.85675 8.06971Z" fill="#221F1F" />
                                    </Svg>

                                    <Text style={{ fontSize: "12px", flexDirection: "row", fontWeight: 400, color: "#58595B", }}>{data.email}</Text>
                                </View>
                            )}


                            {data?.location && (
                                <View style={{ flexDirection: "row", breakAll: true, justifyContent: "start", gap: "12px", alignItems: "center", padding: " 4px", }}>
                                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M8.25055 2C5.90431 2 4 3.89132 4 6.2184C4 7.0097 4.22097 7.77202 4.63403 8.43849L8.0096 13.8349C8.14396 14.0567 8.48041 14.0567 8.61476 13.8249L11.9037 8.38054C12.2979 7.73412 12.5 6.98183 12.5 6.2184C12.5011 3.89132 10.5968 2 8.25055 2ZM8.25055 8.33149C7.058 8.33149 6.11529 7.37636 6.11529 6.21728C6.11529 5.05931 7.07688 4.10306 8.25055 4.10306C9.42423 4.10306 10.3758 5.05819 10.3758 6.21728C10.3758 7.36633 9.45199 8.33149 8.25055 8.33149Z" fill="#221F1F" />
                                    </Svg>


                                    <Text style={{ fontSize: "12px", flexDirection: "row", fontWeight: 400, color: "#58595B", }}>{data.location}</Text>
                                </View>
                            )}
                        </View>
                        <View style={{ flexDirection: "column", gap: 24, width: 326 }}>

                            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <View>
                                    <Text style={{ fontSize: 14, fontWeight: 400, color: "#000000" }}>WORK EXPERIENCE</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "column", gap: 16 }} >
                                    {data?.experience?.map((detail, index) => (
                                        <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>


                                            <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                                <Text style={{ fontSize: 14, fontWeight: 400, color: "#000000" }}>{detail.designation ? (<>{detail.designation}</>) : (<>Designation</>)}</Text>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                    <Text style={{ fontSize: 12, fontWeight: 400, color: "#000000" }}>{detail.organization ? (<>{detail.organization}</>) : (<>organization</>)} </Text>
                                                    <Text style={{ fontSize: 12, fontWeight: 400, color: "#000000" }}>{detail.duration?.start?.year}-{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>
                                                </View>
                                                <View style={{ flexDirection: "column", gap: 8 }}>
                                                    <Text style={{ fontSize: 10, fontWeight: 400, color: "#000000", }}>{detail.description ? (<>{detail.description}</>) : (<>Description</>)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View style={{ flexDirection: "column", gap: 8, width:"70%" }}>
                                <View>
                                    <Text style={{ fontSize: 14, fontWeight: 400, color: "#000000" }}>EDUCATION</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "column", gap: 10, }}>
                                    {data?.education?.map((detail, index) => (
                                        <>
                                            <View style={{ }}>
                                                <Text style={{ fontSize: 12, fontWeight: 400, color: "#000000" }}>{detail.specialization} {detail.qualification}</Text>
                                                <Text style={{ fontSize: 10, fontWeight: 400, color: "#000000" }}>{detail.instituteName}</Text>
                                                <Text style={{ fontSize: 10, fontWeight: 400, color: "#000000" }}>{detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>
                                            </View>
                                            {index !== data.education.length - 1 &&
                                                <View style={{ width: "100%", height: 1, backgroundColor: "#000000" }}>  </View>
                                            }
                                        </>
                                    ))}
                                </View>
                                <View>
                                </View>
                            </View>

                        </View>


                       

                    </View >
                    <View style={{height:"100%",width:1,backgroundColor:"#000000"}}></View>

                    <View style={{ flexDirection: "column", gap: 24, width: 195 }}>
                        <View style={{ flexDirection: "column", gap: 8, }} >
                            <Text style={{ fontSize: 16, fontWeight: '700', color: "#494949" }}>ABOUT ME</Text>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: "#494949" }}>{data.summery}</Text>
                        </View>
                        <View>
                            {data?.skills?.length > 0 && (
                                <>
                                    <View style={{ objectFit: 'contain' }}>
                                        <Text style={{ fontSize: 16, fontWeight: '700', }}>SKILLS</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', gap: 14, paddingTop: 12 }}>
                                        {data.skills?.map((detail, index) => {
                                            const calculateWidthPercentage = (rating) => {
                                                let ratingPercentage = 0;
                                                if (rating && rating.length > 0) {
                                                    const zerosCount = rating.filter(val => val === 0).length;

                                                    if (zerosCount === 0) ratingPercentage = 100;
                                                    else if (zerosCount === 1) ratingPercentage = 80;
                                                    else if (zerosCount === 2) ratingPercentage = 60;
                                                    else if (zerosCount === 3) ratingPercentage = 40;
                                                    else if (zerosCount === 4) ratingPercentage = 20;
                                                }
                                                return ratingPercentage;
                                            };

                                            const ratingPercentage = calculateWidthPercentage(detail.rating);

                                            return (
                                                <View style={{ flexDirection: 'column' }} key={index}>
                                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={{ color: '#000000', fontSize: 12, fontWeight: '500', width: "45%" }}>{detail.skill}</Text>
                                                        <View style={{ width: '30%', height: 3.78, alignSelf: 'flex-end', marginBottom: 1, backgroundColor: '#D1D3D4', width: "40%" }}>
                                                            <View style={{ height: '100%', backgroundColor: '#000000', width: `${ratingPercentage}%` }}></View>
                                                        </View>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </>
                            )}
                        </View>
                        <View>
                            {data?.languages?.length > 0 && (
                                <>
                                    <View style={{ objectFit: 'contain' }}>
                                        <Text style={{ fontSize: 16, fontWeight: '700', }}>LANGUAGES</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', gap: 14, paddingTop: 12 }}>
                                        {data.languages?.map((detail, index) => {
                                            const calculateWidthPercentage = (rating) => {
                                                let ratingPercentage = 0;
                                                if (rating && rating.length > 0) {
                                                    const zerosCount = rating.filter(val => val === 0).length;

                                                    if (zerosCount === 0) ratingPercentage = 100;
                                                    else if (zerosCount === 1) ratingPercentage = 80;
                                                    else if (zerosCount === 2) ratingPercentage = 60;
                                                    else if (zerosCount === 3) ratingPercentage = 40;
                                                    else if (zerosCount === 4) ratingPercentage = 20;
                                                }
                                                return ratingPercentage;
                                            };

                                            const ratingPercentage = calculateWidthPercentage(detail.rating);

                                            return (
                                                <View style={{ flexDirection: 'column' }} key={index}>
                                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={{ color: '#000000', fontSize: 12, fontWeight: '500', width: "45%" }}>{detail.languages}</Text>
                                                        <View style={{ width: '30%', height: 3.78, alignSelf: 'flex-end', marginBottom: 1, backgroundColor: '#D1D3D4', width: "40%" }}>
                                                            <View style={{ height: '100%', backgroundColor: '#000000', width: `${ratingPercentage}%` }}></View>
                                                        </View>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </>
                            )}
                        </View>

                        <View>
                            {data?.hobbies?.length > 0 && (
                                <View style={{ flexDirection: 'column', gap: 16, }}>
                                    <View style={{ objectFit: 'contain' }}>
                                        <Text style={{ fontSize: 18, fontWeight: '700', }}>HOBBIES</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', gap: 16, }}>
                                        {data?.hobbies?.map((item, index) => (
                                            <View style={{ flexDirection: 'row', gap: 8, alignItems: "center" }}>
                                                <Svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M3 6.75C4.65685 6.75 6 5.40685 6 3.75C6 2.09315 4.65685 0.75 3 0.75C1.34315 0.75 0 2.09315 0 3.75C0 5.40685 1.34315 6.75 3 6.75Z" fill="black" />
                                                </Svg>

                                                <Text key={index} style={{ color: '#000000', fontSize: 14, fontWeight: '500', }}>{item?.title}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    )
}

export default Template23
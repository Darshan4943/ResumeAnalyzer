import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template21({ data }) {
    return (
        <Page size="A4" style={{ padding: 24 }}>
            <View style={{ flexDirection: "column", gap: 24 }}>
                <View style={{ flexDirection: "row", gap: 24 }}>


                    <View style={{ flexDirection: 'column', gap: 8, paddingBottom: 16, borderBottom: 2, borderColor: "#C7C6C5", width: 360, height: 90 }}>

                        <Text style={{ fontSize: 26, fontWeight: '700', color: "#494949" }}>{data.firstName} {data.lastName}</Text>

                        <Text style={{ fontSize: 16, fontWeight: '700', color: "#494949" }}>{data.designation}</Text>
                    </View>

                    <View style={{ width: "170", height: "170", }}>
                        {data.profilePhoto ? (
                            <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{}} />
                        ) : (
                            <Image src="/images/services/profile.png" alt="" style={{}} />
                        )}
                    </View>




                </View>

                <View style={{ flexDirection: "row", gap: 24 }}>
                    <View style={{ display: "flex", flexDirection: "column", gap: "8", marginTop: -48 }}>
                        <Text style={{ color: "#030203", fontSize: "16px", fontWeight: 400, }}>CONTACT</Text>

                        {data?.mobileNumber && (
                            <View style={{ flexDirection: "row", gap: "12px", justifyContent: "start", alignItems: "center", paddingRight: " 4px", paddingTop: "5px" }}>

                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M13.7305 11.4931L11.8772 9.63512C11.5082 9.26663 10.8975 9.27796 10.5158 9.66062L9.58132 10.596C9.52194 10.5648 9.46115 10.5294 9.39754 10.494C8.80803 10.1666 8.0008 9.71874 7.15117 8.86555C6.30012 8.01094 5.85198 7.20025 5.524 6.60926C5.48866 6.5469 5.45615 6.48737 5.42363 6.42927L6.0499 5.80143L6.35808 5.49246C6.73978 5.1098 6.75251 4.49613 6.38212 4.12764L4.52876 2.26961C4.1612 1.90112 3.55048 1.91105 3.16595 2.29513L2.6443 2.82093L2.65843 2.8351C2.48313 3.05903 2.33752 3.31697 2.22867 3.59617C2.12829 3.86262 2.06468 4.11488 2.03782 4.36715C1.79325 6.40092 2.72064 8.26037 5.2342 10.7817C8.71189 14.2667 11.5153 14.0045 11.6354 13.9904C11.8984 13.9592 12.1514 13.8968 12.4073 13.7962C12.683 13.6885 12.9403 13.5425 13.1636 13.3668L13.1749 13.3781L13.7051 12.858C14.0882 12.4753 14.0995 11.863 13.7305 11.4931Z" fill="#221F1F" />
                                </Svg>


                                <Text style={{ fontSize: "10px", paddingTop: "2px", flexDirection: "row", fontWeight: 400, color: "#58595B", }}>{data.mobileNumber}</Text>
                            </View>
                        )}
                        {data?.email && (
                            <View style={{ flexDirection: "row", breakAll: true, gap: "12px", justifyContent: "start", alignItems: "center", paddingRight: " 4px" }}>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.00216 9.80322L6.51532 8.43582L2.27112 12.2536C2.42543 12.4085 2.63165 12.5 2.86095 12.5H13.1362C13.3655 12.5 13.5717 12.4071 13.726 12.2536L9.48179 8.43582L8.00216 9.80322ZM13.7274 3.74642C13.5775 3.59152 13.3669 3.5 13.1376 3.5H2.8624C2.63598 3.5 2.42543 3.59293 2.27257 3.74642L8.00361 8.90198L13.7274 3.74642ZM2 4.2914V11.7691L6.14325 8.07113L2 4.2914ZM9.85675 8.06971L14 11.7677V4.28577L9.85675 8.06971Z" fill="#221F1F" />
                                </Svg>

                                <Text style={{ fontSize: "10px", paddingTop: "2px", flexDirection: "row", fontWeight: 400, color: "#58595B", }}>{data.email}</Text>
                            </View>
                        )}


                        {data?.location && (
                            <View style={{ flexDirection: "row", breakAll: true, justifyContent: "start", gap: "12px", alignItems: "center", paddingRight: " 4px" }}>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.25055 2C5.90431 2 4 3.89132 4 6.2184C4 7.0097 4.22097 7.77202 4.63403 8.43849L8.0096 13.8349C8.14396 14.0567 8.48041 14.0567 8.61476 13.8249L11.9037 8.38054C12.2979 7.73412 12.5 6.98183 12.5 6.2184C12.5011 3.89132 10.5968 2 8.25055 2ZM8.25055 8.33149C7.058 8.33149 6.11529 7.37636 6.11529 6.21728C6.11529 5.05931 7.07688 4.10306 8.25055 4.10306C9.42423 4.10306 10.3758 5.05819 10.3758 6.21728C10.3758 7.36633 9.45199 8.33149 8.25055 8.33149Z" fill="#221F1F" />
                                </Svg>


                                <Text style={{ fontSize: "10px", flexDirection: "row", fontWeight: 400, color: "#58595B", }}>{data.location}</Text>
                            </View>
                        )}
                    </View>
                    <View style={{ flexDirection: "column", gap: 16, width: "344", marginTop: -24 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: "#494949" }}>ABOUT ME</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: "#6D6E71" }}>{data.summery}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", gap: 24 }}>
                    <View style={{ flexDirection: "column", gap: 24, width: 271 }}>

                        <View style={{ flexDirection: "column", gap: 16 }}>
                            <View style={{ flexDirection: "column", gap: 8 }}>

                                <Text style={{ color: '#494949', fontSize: '20px', fontWeight: 600, paddingTop: '13px', }}>AWARDS</Text>
                                <View style={{ backgroundColor: '#535353', height: '1px', }} />
                            </View>
                            {data?.course?.map((detail, index) => (
                                <View style={{ flexDirection: 'row', gap: '8', }}>
                                    <Svg width="36" height="41" viewBox="0 0 36 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M26.3 10.5725L29.4205 4.5H7.41992L9.5849 10.5725H26.3Z" fill="#494949" />
                                        <Path d="M29.4195 4.5L18.6863 21.2184L7.41894 4.5L4 10.6536L15.3877 28.9443L22.2937 28.8371L32.9039 10.5463L29.4195 4.5Z" fill="#CDCDCD" />
                                        <Path d="M18.9943 36.8349C24.1602 36.8349 28.3479 32.6496 28.3479 27.4868C28.3479 22.324 24.1602 18.1387 18.9943 18.1387C13.8284 18.1387 9.64062 22.324 9.64062 27.4868C9.64062 32.6496 13.8284 36.8349 18.9943 36.8349Z" fill="#494949" />
                                    </Svg>

                                    <View key={index} style={{ flexDirection: 'column', gap: '2', }}>
                                        <Text style={{ color: '#494949', fontSize: '14', fontWeight: 500, maxWidth: '80%' }}>{detail.courseName} -{detail.issuedBy}</Text>
                                        <Text style={{ color: '#494949', fontSize: '12', fontWeight: 500, maxWidth: '80%' }}>{detail.description}</Text>

                                        <Text style={{ color: '#494949', fontSize: '12', fontWeight: 300, maxWidth: '80%' }}>
                                            {detail.duration?.end?.year &&
                                                <Text style={{ color: '#272128', fontSize: '12', fontWeight: 300, maxWidth: '80%' }}>
                                                    {detail.duration?.end?.month}-
                                                    {detail.duration?.end?.year}
                                                </Text>
                                            }
                                        </Text>
                                    </View>
                                </View>
                            ))}


                        </View>
                        <View style={{ flexDirection: "column", gap: 16 }}>

                            {data?.skills?.length > 0 && (
                                <View style={{ flexDirection: 'column', gap: 12 }}>
                                    <View style={{ flexDirection: "column", gap: 8 }}>

                                        <Text style={{ color: '#494949', fontSize: '20px', fontWeight: 600, paddingTop: '13px', }}>SKILLS</Text>
                                        <View style={{ backgroundColor: '#535353', height: '1px', }} />
                                    </View>
                                    {data?.skills?.map((detail, index) => (
                                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                                            <Text style={{ fontSize: 12 }}>{detail.skill}</Text>
                                            <View style={{ flexDirection: 'row', gap: 4, marginTop: 4 }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <View key={i}>
                                                        {detail.rating[i] === 0 ? (
                                                            <Svg xmlns="http://www.w3.org/2000/svg" width="8" height="7" viewBox="0 0 8 7" fill="none">
                                                                <Path fillRule="evenodd" clipRule="evenodd" d="M4.02911 0.285156C2.23911 0.285156 0.789062 1.73615 0.789062 3.52515C0.789062 5.31415 2.24011 6.76514 4.02911 6.76514C5.81811 6.76514 7.2691 5.31415 7.2691 3.52515C7.2691 1.73615 5.81811 0.285156 4.02911 0.285156Z" fill="#B5B5B5" />
                                                            </Svg>
                                                        ) : (
                                                            <Svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                                <Path fillRule="evenodd" clipRule="evenodd" d="M4.02911 0.886719C2.23911 0.886719 0.789062 2.33771 0.789062 4.12671C0.789062 5.91571 2.24011 7.36676 4.02911 7.36676C5.81811 7.36676 7.2691 5.91571 7.2691 4.12671C7.2691 2.33771 5.81811 0.886719 4.02911 0.886719Z" fill="#494949" />
                                                            </Svg>
                                                        )}
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}


                        </View>

                        <View style={{ flexDirection: "column", gap: 16 }}>

                            {data?.hobbies?.length > 0 && (
                                <View style={{ flexDirection: 'column', gap: 12 }}>
                                    <View style={{ flexDirection: "column", gap: 8 }}>

                                        <Text style={{ color: '#494949', fontSize: '20px', fontWeight: 600, paddingTop: '13px', }}>INTERESTS</Text>
                                        <View style={{ backgroundColor: '#535353', height: '1px', }} />
                                    </View>
                                    {data?.hobbies?.map((detail, index) => (
                                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                                            <Svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M3 6.5C4.65685 6.5 6 5.15685 6 3.5C6 1.84315 4.65685 0.5 3 0.5C1.34315 0.5 0 1.84315 0 3.5C0 5.15685 1.34315 6.5 3 6.5Z" fill="#5E5F5E" />
                                            </Svg>

                                            <Text style={{ fontSize: 12, color: "#5E5F5E" }}>{detail.title}</Text>

                                        </View>
                                    ))}
                                </View>
                            )}


                        </View>
                        <View style={{ flexDirection: "column", gap: 16 }}>

                            {data?.languages?.length > 0 && (
                                <View style={{ flexDirection: 'column', gap: 12 }}>
                                    <View style={{ flexDirection: "column", gap: 8 }}>

                                        <Text style={{ color: '#494949', fontSize: '20px', fontWeight: 600, paddingTop: '13px', }}>SKILLS</Text>
                                        <View style={{ backgroundColor: '#535353', height: '1px', }} />
                                    </View>
                                    {data?.languages?.map((detail, index) => (
                                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                                            <Text style={{ fontSize: 12 }}>{detail.languages}</Text>
                                            <View style={{ flexDirection: 'row', gap: 4, marginTop: 4 }}>
                                                {[...Array(3)].map((_, i) => (
                                                    <View key={i}>
                                                        {detail.rating[i] === 0 ? (
                                                            <Svg xmlns="http://www.w3.org/2000/svg" width="8" height="7" viewBox="0 0 8 7" fill="none">
                                                                <Path fillRule="evenodd" clipRule="evenodd" d="M4.02911 0.285156C2.23911 0.285156 0.789062 1.73615 0.789062 3.52515C0.789062 5.31415 2.24011 6.76514 4.02911 6.76514C5.81811 6.76514 7.2691 5.31415 7.2691 3.52515C7.2691 1.73615 5.81811 0.285156 4.02911 0.285156Z" fill="#B5B5B5" />
                                                            </Svg>
                                                        ) : (
                                                            <Svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                                <Path fillRule="evenodd" clipRule="evenodd" d="M4.02911 0.886719C2.23911 0.886719 0.789062 2.33771 0.789062 4.12671C0.789062 5.91571 2.24011 7.36676 4.02911 7.36676C5.81811 7.36676 7.2691 5.91571 7.2691 4.12671C7.2691 2.33771 5.81811 0.886719 4.02911 0.886719Z" fill="#494949" />
                                                            </Svg>
                                                        )}
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}


                        </View>


                    </View>
                    <View style={{ display: "flex", flexDirection: "column", gap: 24, width: 271 }}>

                        <View style={{ display: "flex", flexDirection: "column",gap:16 }}>

                            <View style={{ flexDirection: "column", gap: 8 }}>

                                <Text style={{ color: '#494949', fontSize: '20px', fontWeight: 600, paddingTop: '13px', }}>EXPERIENCE</Text>
                                <View style={{ backgroundColor: '#535353', height: '1px', }} />
                            </View>


                            <View style={{ flexDirection: "column", }} >
                                {data?.experience?.map((detail, index) => (



                                    <View key={index} style={{ flexDirection: "row", gap: 16, alignItems: "start", justifyContent: "start", width: "100%" }}>
                                        <View style={{ flexDirection: "column", gap: 4, width: "15%",paddingBottom:24 }}>

                                            <Text style={{ color: "#494949", fontSize: "12px", fontWeight: 400, }}>{detail.duration?.start?.year}</Text>
                                            <Text style={{ color: "#494949", fontSize: "12px", fontWeight: 400, }}>{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>

                                        </View>

                                      <>
                                            <Svg style={{}} width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M5.34763 10.9395C8.10906 10.9395 10.3477 8.70086 10.3477 5.93943C10.3477 3.178 8.10906 0.939453 5.34763 0.939453C2.5862 0.939453 0.347656 3.178 0.347656 5.93943C0.347656 8.70086 2.5862 10.9395 5.34763 10.9395Z" fill="#494949" />
                                            </Svg>

                                            <View style={{ width: "1px", backgroundColor: "#221F1F", height:"100%", marginLeft:-21,marginTop:10}}>
                                            </View>
                                            </>

                                        <View style={{ flexDirection: "column", gap: 4, width: "85%", }}>
                                            <Text style={{ color: "#494949", fontSize: "12px", fontWeight: 400 }}>{detail.designation} </Text>
                                            <Text style={{ color: "#494949", fontSize: "12px", fontWeight: 400 }}>{detail.organization} </Text>

                                            <Text style={{ color: "#494949", fontSize: "12px", fontWeight: 400, }}>{detail.description}</Text>

                                        </View>
                                    </View>

                                ))}
                            </View>
                        </View>
                        <View style={{ display: "flex", flexDirection: "column",gap:16 }}>

                            <View style={{ flexDirection: "column", gap: 8 }}>

                                <Text style={{ color: '#494949', fontSize: '20px', fontWeight: 600, paddingTop: '13px', }}>EDUCATION</Text>
                                <View style={{ backgroundColor: '#535353', height: '1px', }} />
                            </View>


                            <View style={{ flexDirection: "column", }} >
                                {data?.education?.map((detail, index) => (



                                    <View key={index} style={{ flexDirection: "row", gap: 16, alignItems: "start", justifyContent: "start", width: "100%" }}>
                                        <View style={{ flexDirection: "column", gap: 4, width: "15%",paddingBottom:24 }}>

                                            <Text style={{ color: "#494949", fontSize: "12px", fontWeight: 400, }}>{detail.duration?.start?.year}</Text>
                                            <Text style={{ color: "#494949", fontSize: "12px", fontWeight: 400, }}>{detail.duration?.end?.year}</Text>

                                        </View>

                                      <>
                                            <Svg style={{}} width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M5.34763 10.9395C8.10906 10.9395 10.3477 8.70086 10.3477 5.93943C10.3477 3.178 8.10906 0.939453 5.34763 0.939453C2.5862 0.939453 0.347656 3.178 0.347656 5.93943C0.347656 8.70086 2.5862 10.9395 5.34763 10.9395Z" fill="#494949" />
                                            </Svg>

                                            <View style={{ width: "1px", backgroundColor: "#221F1F", height:"100%", marginLeft:-21,marginTop:10}}>
                                            </View>
                                            </>

                                        <View style={{ flexDirection: "column", gap: 4, width: "85%", }}>
                                            <Text style={{ color: "#494949", fontSize: "12px", fontWeight: 400 }}>{detail.qualification} </Text>
                                            <Text style={{ color: "#494949", fontSize: "12px", fontWeight: 400 }}>{detail.instituteName} </Text>

                                 

                                        </View>
                                    </View>

                                ))}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    )
}

export default Template21
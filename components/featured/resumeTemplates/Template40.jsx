import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template40({ data }) {
    console.log(4, data)
    return (
        <Page size="A4" style={{ padding: 36 }}>
            <View style={{ height: "122px", width: "120%", backgroundColor: "#47484C", margin: -36, flexDirection: "row", gap: 24, paddingLeft: 42 }}>


                <View style={{  marginTop: "56px", width: "130px", height: "130px", borderRadius: "50%", border: 6, borderColor: "white"  }}>
                    {data.profilePhoto ? (
                        <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{}} />
                    ) : (
                        <Image src="/images/services/profile.png" alt="" style={{  }} />
                    )}
                </View>
                <View style={{ flexDirection: "column", marginTop: 24, gap: 4, marginTop: "56px" }}>
                    <Text style={{ color: "#FFFFFF", fontFamily:'Inter 400', fontSize: "28px", }}>{data.firstName} {data.lastName}</Text>
                    <Text style={{ fontSize: "14px",fontFamily:'Lato 400', color: "#FFFFFF" }}>{data.designation}</Text>

                </View>

            </View>
            <View style={{ flexDirection: "column", gap: 24, marginTop: 36 }}>
                <View style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start", marginLeft: 172, marginTop: 24 }}>

                    <Text style={{ color: "#47484C", fontFamily:'Inter 400', fontSize: "16px" }}>About me</Text>

                    <Text style={{ color: "#47484C", fontSize: "14px",fontFamily:'Inter 400', }}>{data.summery}</Text>

                </View>
                <View style={{ flexDirection: "column", gap: 12, }}>
                    <View style={{ height: "4px", backgroundColor: "#47484C", width: "100%" }}></View>

                    <View style={{ flexDirection: "row", gap: 24, width: "100%", alignItems: "center" }}>
                        <View style={{ flexDirection: "row", gap: 12, width: "25%", alignItems: "center" }}>
                            <Svg width="23" height="12" viewBox="0 0 23 12" fill="none" xmlns="http://www.w3.org/2000/svg">

                                <Path d="M22.5 0V12H23.5V0H22.5ZM0.5 12V0H-0.5V12H0.5Z" fill="#47484C" mask="url(#path-1-inside-1_1963_86570)" />
                                <Path d="M14.3786 6.7909C14.1877 6.59188 13.9568 6.48486 13.7119 6.48486C13.469 6.48486 13.2371 6.58988 13.0372 6.7889L12.4135 7.40999C12.3625 7.38298 12.3105 7.35698 12.2616 7.33197C12.1906 7.29597 12.1236 7.26197 12.0666 7.22696C11.4829 6.85592 10.9522 6.37286 10.4434 5.74678C10.1965 5.43573 10.0316 5.17269 9.91066 4.90665C10.0726 4.75863 10.2225 4.60462 10.3684 4.4566C10.4234 4.40159 10.4794 4.34459 10.5344 4.28958C10.9482 3.87453 10.9482 3.33846 10.5344 2.92341L9.99563 2.38533C9.93465 2.32432 9.87168 2.26131 9.81271 2.1973C9.69476 2.07528 9.56983 1.94928 9.44189 1.83026C9.25098 1.64124 9.02208 1.54122 8.7812 1.54122C8.54031 1.54122 8.30842 1.64124 8.11051 1.83026L8.10652 1.83426L7.43583 2.51135C7.18295 2.76439 7.04001 3.07142 7.00803 3.42846C6.96105 4.00454 7.12997 4.54161 7.26091 4.89266C7.58076 5.75477 8.05754 6.55387 8.7692 7.40999C9.6328 8.44212 10.6723 9.25723 11.8587 9.83131C12.3125 10.0463 12.9172 10.3014 13.5939 10.3444C13.6359 10.3464 13.6789 10.3484 13.7179 10.3484C14.1737 10.3484 14.5555 10.1844 14.8553 9.85931C14.8573 9.85531 14.8613 9.8533 14.8633 9.8493C14.9663 9.72429 15.0842 9.61228 15.2082 9.49226C15.2931 9.41125 15.3801 9.32623 15.464 9.23722C15.659 9.0342 15.7619 8.79717 15.7619 8.55514C15.7619 8.31011 15.658 8.07508 15.4581 7.87805L14.3786 6.7909ZM15.0842 8.86819C15.0822 8.86819 15.0822 8.87019 15.0842 8.86819C15.0073 8.9512 14.9283 9.0262 14.8433 9.10921C14.7154 9.23123 14.5855 9.35924 14.4625 9.50426C14.2636 9.71728 14.0287 9.8173 13.7209 9.8173C13.6909 9.8173 13.6599 9.8173 13.6299 9.8153C13.0442 9.7783 12.5004 9.54927 12.0916 9.35424C10.9752 8.81317 9.99562 8.04606 9.18101 7.07294C8.50832 6.26183 8.05854 5.51274 7.76168 4.70764C7.57776 4.21657 7.51079 3.83352 7.54078 3.47248C7.56077 3.24145 7.64973 3.05042 7.81265 2.8864L8.48533 2.21331C8.58229 2.1223 8.68424 2.07329 8.78519 2.07329C8.90913 2.07329 9.01009 2.1483 9.07306 2.21131L9.07906 2.21731C9.199 2.33032 9.31395 2.44633 9.43389 2.57035C9.49486 2.63336 9.55783 2.69737 9.6208 2.76238L10.1595 3.30046C10.3684 3.50948 10.3684 3.70351 10.1595 3.91254C10.1026 3.96954 10.0476 4.02654 9.98963 4.08155C9.82371 4.25157 9.66578 4.4096 9.49486 4.56362C9.49086 4.56762 9.48686 4.56962 9.48486 4.57362C9.31494 4.74264 9.34693 4.90867 9.38191 5.02068L9.38791 5.03867C9.52784 5.37772 9.72475 5.69777 10.0246 6.07882L10.0266 6.08082C10.5714 6.75091 11.1441 7.27397 11.7778 7.67502C11.8587 7.72603 11.9417 7.76804 12.0207 7.80704C12.0916 7.84205 12.1586 7.87605 12.2156 7.91205C12.2236 7.91605 12.2316 7.92105 12.2396 7.92505C12.3065 7.95906 12.3695 7.97506 12.4345 7.97506C12.5984 7.97506 12.7013 7.87205 12.7343 7.83904L13.409 7.16395C13.476 7.09694 13.5829 7.01594 13.7069 7.01594C13.8288 7.01594 13.9298 7.09295 13.9907 7.15995L15.0812 8.2511C15.2851 8.45213 15.2851 8.65916 15.0842 8.86819ZM12.0437 3.22344C12.5604 3.31045 13.0292 3.55548 13.404 3.93053C13.7788 4.30458 14.0207 4.77465 14.1097 5.29171C14.1317 5.42173 14.2436 5.51274 14.3716 5.51274C14.3876 5.51274 14.4016 5.51074 14.4165 5.50874C14.5625 5.48473 14.6594 5.34672 14.6354 5.2007C14.5285 4.57562 14.2326 4.00454 13.7818 3.55348C13.3301 3.10142 12.7603 2.80539 12.1356 2.69837C11.9897 2.67537 11.8538 2.77138 11.8278 2.9154C11.8028 3.06042 11.8977 3.20043 12.0437 3.22344ZM16.3266 5.12369C16.1507 4.09356 15.666 3.15644 14.9203 2.41034C14.1747 1.66524 13.2381 1.18017 12.2086 1.00415C12.0646 0.978148 11.9287 1.07716 11.9027 1.22118C11.8787 1.36719 11.9757 1.50321 12.1216 1.52921C13.0402 1.68523 13.8788 2.1213 14.5445 2.78539C15.2112 3.45248 15.645 4.29157 15.8009 5.21069C15.8229 5.34071 15.9348 5.43173 16.0628 5.43173C16.0788 5.43173 16.0928 5.42973 16.1077 5.42773C16.2537 5.40573 16.3526 5.26771 16.3266 5.12369Z" fill="#47484C" />
                            </Svg>
                            <Text style={{ color: "#47484C", fontSize: "14px",fontFamily:'Inter 400',}}>{data.mobileNumber}</Text>

                        </View>
                        <View style={{ flexDirection: "row", gap: 12, width: "35%", alignItems: "center" }}>
                            <Svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">

                                <Path d="M23.166 0V12H24.166V0H23.166ZM1.16602 12V0H0.166016V12H1.16602Z" fill="#47484C" mask="url(#path-1-inside-1_1963_86597)" />
                                <Path d="M16.3232 2H8.01096C7.26907 2 6.66602 2.57662 6.66602 3.28501V8.71393C6.66602 9.42337 7.26907 10 8.01096 10H16.3211C17.063 10 17.666 9.42337 17.666 8.71393V3.28712C17.6681 2.57872 17.0651 2 16.3232 2ZM17.0534 8.71393C17.0534 9.09975 16.7259 9.41283 16.3232 9.41283H8.01096C7.60822 9.41283 7.28074 9.09975 7.28074 8.71393V3.28712C7.28074 2.90235 7.60822 2.58928 8.01096 2.58928H16.3211C16.7238 2.58928 17.0513 2.90235 17.0513 3.28712V8.71393H17.0534ZM13.6037 5.932L16.2935 3.62656C16.4186 3.51798 16.4303 3.33351 16.3169 3.21123C16.2024 3.09211 16.0095 3.08156 15.8813 3.19014L12.1719 6.37159L11.448 5.75386C11.4459 5.75175 11.4437 5.74963 11.4437 5.74752C11.4278 5.73276 11.4119 5.71907 11.3929 5.70642L8.44866 3.18803C8.32042 3.0784 8.12752 3.09 8.01306 3.21123C7.89966 3.33351 7.91133 3.51798 8.03851 3.62656L10.7602 5.95203L8.05016 8.37659C7.92722 8.48833 7.9198 8.67281 8.03638 8.79299C8.09785 8.85307 8.17946 8.88575 8.26107 8.88575C8.33632 8.88575 8.41156 8.86044 8.47091 8.80774L11.2222 6.3484L11.9694 6.98511C12.0288 7.03466 12.1008 7.05889 12.174 7.05889C12.2471 7.05889 12.3224 7.03255 12.3785 6.983L13.1458 6.32626L15.8813 8.80986C15.9406 8.86468 16.018 8.88996 16.0932 8.88996C16.1748 8.88996 16.2554 8.86045 16.3169 8.79931C16.4324 8.68124 16.4281 8.49466 16.3052 8.38397L13.6037 5.932Z" fill="#47484C" />
                            </Svg>

                            <Text style={{ color: "#47484C", fontSize: "14px",  fontFamily:'Inter 400',}}>{data.email}</Text>

                        </View>
                        <View style={{ flexDirection: "row", gap: 12, width: "30%", alignItems: "center" }}>
                            <Svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">

                                <Path d="M22.834 0V12H23.834V0H22.834ZM0.833984 12V0H-0.166016V12H0.833984Z" fill="#47484C" mask="url(#path-1-inside-1_1963_86578)" />
                                <Path d="M15.0138 8.67897C14.4815 9.22461 13.8024 9.62359 13.0639 9.82974C13.4393 9.29744 13.7419 8.69128 13.9727 8.02564H15.5585C15.4016 8.26769 15.22 8.48512 15.0138 8.67897ZM10.9805 9.92717C10.5559 9.38152 10.204 8.74051 9.95069 8.02564H11.6709V10C11.4278 9.98769 11.2103 9.96409 10.9805 9.92717ZM7.33398 5.6759H9.1988C9.21111 6.37846 9.32088 7.05641 9.49013 7.69846H7.90327C7.56375 7.09231 7.36989 6.40205 7.33398 5.6759ZM12.0094 2.97436V1C12.192 1.01231 12.3858 1.02461 12.5674 1.06154C13.0034 1.60615 13.3542 2.24821 13.6085 2.97436H12.0094ZM13.7173 3.30256C13.9111 3.93127 14.0209 4.62153 14.0455 5.3364H12.0094V3.30256H13.7173ZM11.6709 2.97436H9.95069C10.204 2.25949 10.5559 1.61744 10.9805 1.08514C11.2103 1.03693 11.4278 1.01231 11.6709 1V2.97436ZM11.6709 3.30256V5.3364H9.52705C9.53834 4.62153 9.64707 3.93127 9.84094 3.30256H11.6709ZM9.1988 5.3364H7.33398C7.36989 4.59794 7.56375 3.90666 7.91456 3.30256H9.50243C9.32088 3.94358 9.21111 4.62153 9.1988 5.3364ZM9.52705 5.6759H11.6709V7.69846H9.84094C9.64707 7.06872 9.53834 6.37846 9.52705 5.6759ZM12.0094 8.02564H13.6085C13.3665 8.75179 13.0034 9.39384 12.5674 9.93948C12.3858 9.97538 12.192 9.98769 12.0094 10V8.02564ZM12.0094 7.69846V5.6759H14.0455C14.0209 6.37846 13.9111 7.06872 13.7296 7.69846H12.0094ZM14.3717 5.6759H16.334C16.3104 6.41436 16.1042 7.10461 15.7524 7.72205V7.69846H14.0691C14.2507 7.05641 14.3594 6.37846 14.3717 5.6759ZM14.3717 5.3364C14.3594 4.62153 14.2507 3.94358 14.0691 3.30256H15.7647C16.1042 3.90666 16.3104 4.59794 16.334 5.3364H14.3717ZM15.5585 2.97436H13.9604C13.7419 2.30872 13.4393 1.70257 13.0639 1.16924C13.8147 1.37539 14.4815 1.77539 15.0138 2.32103C15.22 2.51385 15.4016 2.73231 15.5585 2.97436ZM8.65414 2.32103C9.1506 1.81129 9.78041 1.42359 10.4831 1.20616C10.1199 1.72718 9.81734 2.32103 9.59885 2.97436H8.10945C8.2787 2.73231 8.44899 2.51385 8.65414 2.32103ZM8.10945 8.02564H9.59885C9.81734 8.67897 10.1199 9.27282 10.4831 9.79384C9.78041 9.57538 9.1506 9.18768 8.65414 8.67897C8.44899 8.48512 8.26639 8.26769 8.10945 8.02564Z" stroke="#47484C" stroke-width="0.3837" stroke-miterlimit="10" />
                            </Svg>


                            <Text style={{ color: "#47484C", fontSize: "14px",fontFamily:'Inter 400',}}>{data.location}</Text>

                        </View>
                    </View>
                    <View style={{ height: "1px", backgroundColor: "#47484C", width: "100%" }}></View>

                </View>
                <View style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>



                    <Text style={{ color: "#47484C", fontFamily:'Inter 400', fontSize: "16px", marginLeft: 172, }}>EXPERIENCE</Text>


                    <View style={{ flexDirection: "column", gap: 24 }} >
                        {data?.experience?.map((detail, index) => (



                            <View key={index} style={{ flexDirection: "row", gap: 16, alignItems: "start", justifyContent: "start", width: "100%" }}>
                                <View style={{ flexDirection: "column", gap: 4, justifyContent: "space-between", width: "26.5%" }}>



                                    <Text style={{ color: "#47484C", fontSize: "12px", fontFamily:'Lato 400', }}>{detail.organization}</Text>

                                    <Text style={{ color: "#47484C", fontSize: "12px",fontFamily:'Lato 400',}}>{detail.duration?.start?.year}-{" "}{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>




                                </View>
                                <View style={{ flexDirection: "column", }}>
                                    <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M7.00001 14C10.866 14 14 10.866 14 7C14 3.134 10.866 0 7.00001 0C3.13402 0 0 3.134 0 7C0 10.866 3.13402 14 7.00001 14Z" fill="#F6F7F7" />
                                        <Path d="M6.99997 11.5898C9.53485 11.5898 11.5898 9.53486 11.5898 6.99998C11.5898 4.46509 9.53485 2.41016 6.99997 2.41016C4.46509 2.41016 2.41016 4.46509 2.41016 6.99998C2.41016 9.53486 4.46509 11.5898 6.99997 11.5898Z" fill="#221F1F" />
                                        <Path d="M7.00047 10.415C8.88734 10.415 10.4169 8.88541 10.4169 6.99853C10.4169 5.11166 8.88734 3.58203 7.00047 3.58203C5.1136 3.58203 3.58398 5.11166 3.58398 6.99853C3.58398 8.88541 5.1136 10.415 7.00047 10.415Z" fill="#F6F7F7" />
                                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M6.99907 5.52344C6.1844 5.52344 5.52344 6.1844 5.52344 6.99907C5.52344 7.81476 6.18337 8.4747 6.99907 8.4747C7.81476 8.4747 8.47469 7.81374 8.47469 6.99907C8.47469 6.18337 7.81476 5.52344 6.99907 5.52344Z" fill="#221F1F" />
                                    </Svg>
                                    <View style={{ width: "1px", backgroundColor: "#221F1F", }}>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "column", gap: 4, width: "73.5%" }}>
                                    <Text style={{ color: "#47484C", fontSize: "12px", fontFamily:'Lato 400',}}>{detail.designation} </Text>

                                    <Text style={{ color: "#47484C", fontSize: "12px",fontFamily:'Lato 400',}}>{detail.description}</Text>

                                </View>
                            </View>

                        ))}
                    </View>
                </View>
                <View style={{ height: "1px", backgroundColor: "#47484C", width: "100%" }}></View>
                <View style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>



                    <Text style={{ color: "#47484C", fontFamily:'Inter 400',fontSize: "16px", marginLeft: 172, }}>EDUCATION</Text>


                    <View style={{ flexDirection: "column", gap: 24 }} >
                        {data?.education?.map((detail, index) => (



                            <View key={index} style={{ flexDirection: "row", gap: 16, alignItems: "start", justifyContent: "start", width: "100%" }}>
                                <View style={{ flexDirection: "column", gap: 4, justifyContent: "space-between", width: "26.5%" }}>



                                    <Text style={{ color: "#47484C", fontSize: "12px", fontFamily:'Lato 400', }}>{detail.instituteName}</Text>

                                    <Text style={{ color: "#47484C", fontSize: "12px", fontFamily:'Lato 400', }}>{detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>




                                </View>
                                <View style={{ flexDirection: "column", }}>
                                    <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M7.00001 14C10.866 14 14 10.866 14 7C14 3.134 10.866 0 7.00001 0C3.13402 0 0 3.134 0 7C0 10.866 3.13402 14 7.00001 14Z" fill="#F6F7F7" />
                                        <Path d="M6.99997 11.5898C9.53485 11.5898 11.5898 9.53486 11.5898 6.99998C11.5898 4.46509 9.53485 2.41016 6.99997 2.41016C4.46509 2.41016 2.41016 4.46509 2.41016 6.99998C2.41016 9.53486 4.46509 11.5898 6.99997 11.5898Z" fill="#221F1F" />
                                        <Path d="M7.00047 10.415C8.88734 10.415 10.4169 8.88541 10.4169 6.99853C10.4169 5.11166 8.88734 3.58203 7.00047 3.58203C5.1136 3.58203 3.58398 5.11166 3.58398 6.99853C3.58398 8.88541 5.1136 10.415 7.00047 10.415Z" fill="#F6F7F7" />
                                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M6.99907 5.52344C6.1844 5.52344 5.52344 6.1844 5.52344 6.99907C5.52344 7.81476 6.18337 8.4747 6.99907 8.4747C7.81476 8.4747 8.47469 7.81374 8.47469 6.99907C8.47469 6.18337 7.81476 5.52344 6.99907 5.52344Z" fill="#221F1F" />
                                    </Svg>
                                    <View style={{ width: "1px", backgroundColor: "#221F1F" }}>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "column", gap: 4, width: "73.5%" }}>
                                    <Text style={{ color: "#47484C", fontSize: "12px", fontFamily:'Lato 400',}}>{detail.qualification} </Text>
                                    <Text style={{ color: "#47484C", fontSize: "12px", fontFamily:'Lato 400',}}>{detail.specialization} </Text>



                                </View>
                            </View>

                        ))}
                    </View>
                </View>
                <View style={{ height: "1px", backgroundColor: "#47484C", width: "100%" }}></View>

                <View style={{ flexDirection: "row", gap: 24, }}>

                    <View style={{ flexDirection: "column", gap: 4, justifyContent: "space-between", width: "26.5%" }}>
                        {data?.hobbies?.length > 0 && (
                            <View style={{ flexDirection: "column", gap: "16px", }}>

                                <View style={{}}>

                                    <Text style={{ color: "#47484C",fontFamily:'Inter 400', }}>HOBBIES</Text>

                                </View>
                                <View style={{ display: "flex", flexDirection: "column", gap: "16px", }}>
                                    {data?.hobbies?.map((item, index) => (
                                        <View key={index} style={{ color: "#47484C", fontSize: "12px", }}>
                                            <Text style={{fontFamily:'Lato 400',}}>
                                                {item?.title}
                                            </Text>
                                        </View>
                                    ))}
                                </View>

                            </View>
                        )}

                    </View>
                    <View style={{ height: "100%", backgroundColor: "#47484C", width: "1px" }}></View>

                    {data?.skills?.length > 0 && (


                        <View style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start", width: "76.5%" }}>
                            <View style={{}}>

                                <Text style={{ color: "#47484C" ,fontFamily:'Inter 400',}}>SKILLS</Text>

                            </View>
                            <View style={{ flexDirection: "row", gap: 8, justifyContent: "space-between", flexWrap: "wrap", width: "100%" }}>
                                {data?.skills?.map((detail, index) => (
                                    <View key={index} style={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: "12", width: "45%" }}>
                                        <Text style={{ fontSize: 12, color: "#47484C", width: "45%",fontFamily:'Lato 400', }}>
                                            {detail.skill}
                                        </Text>
                                        <View style={{ display: "flex", gap: 4, flexDirection: "row", marginTop: "4px", width: "45%" }}>
                                            {[...Array(5)].map((_, i) => (
                                                <View key={i}>
                                                    {
                                                        detail.rating[i] === 0 ? (
                                                            <Svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <Path d="M4 8.52344C6.20914 8.52344 8 6.73252 8 4.5234C8 2.31428 6.20914 0.523438 4 0.523438C1.79086 0.523438 0 2.31428 0 4.5234C0 6.73252 1.79086 8.52344 4 8.52344Z" fill="#D1D3D4" />
                                                            </Svg>
                                                        ) : (
                                                            <Svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <Path fill-rule="evenodd" clip-rule="evenodd" d="M4 0.423828C1.79135 0.423828 0 2.21518 0 4.42383C0 6.63248 1.79135 8.42383 4 8.42383C6.20864 8.42383 8 6.63248 8 4.42383C8 2.21518 6.20987 0.423828 4 0.423828Z" fill="#47484C" />
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

export default Template40
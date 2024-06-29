// import React from "react";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   Image,
//   StyleSheet,
//   Svg,
//   Path,
//   Rect,
// } from "@react-pdf/renderer";

// function Template19({ data, selectedColor, selectedFont, preview,pageLayout }) {

//   const formatLink = (link) => {
//     if (link?.length > 43) {
//       return link?.match(/.{1,43}/g).join('\n');
//     }
//     return link;
//   };

//   const formatEmail = (email) => {
//     if (email?.length > 20) {
//       return email?.match(/.{1,20}/g).join('\n');
//     }
//     return email;
//   };

//   const formatLocation = (location) => {
//     if (location?.length > 20) {
//       return location?.match(/.{1,20}/g).join('\n');
//     }
//     return location;
//   };


//   return (
//     <Page size="A4" style={{ padding: 24 }}>
//       <View
//         style={{
//           width: 532,
//           display: "flex",
//           flexDirection: "column",
//           gap: 16,
//         }}
//       >
//         <View style={{ display: "flex", flexDirection: "row", gap: 32 }}>
//           <View
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: 12,
//               alignItems: "flex-start",
//               width: 172,
//             }}
//           >
//             {data?.showProfile === true && (
//               <>
//                 {data.profilePhoto ? (
//                   <Image
//                     src={
//                       preview
//                         ? data.profilePhoto
//                         : Object.keys(data?.profilePhoto).includes("filename")
//                           ? URL.createObjectURL(data.profilePhoto)
//                           : data.profilePhoto
//                     }
//                     alt=""
//                     style={{
//                       width: 161,
//                       height: 161,
//                       borderRadius: "50%",
//                       objectFit: "contain",
//                     }}
//                   />
//                 ) : (
//                   <Image
//                     src="/images/profile/john_doe.png"
//                     style={{
//                       width: 161,
//                       height: 161,
//                       borderRadius: "50%",
//                       objectFit: "contain",
//                     }}
//                   />
//                 )}
//               </>
//             )}
//             {data?.mobileNumber && (
//               <View
//                 style={{
//                   marginTop: data?.showProfile ? "" : 34,
//                   display: "flex",
//                   flexDirection: "row",
//                   gap: 10,
//                   alignItems: "center",
//                 }}
//               >
//                 <Image
//                   src="/images/services/call.png"
//                   style={{
//                     width: 24,
//                     height: 24,
//                     borderRadius: "50%",
//                     objectFit: "contain",
//                   }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     fontFamily: `${selectedFont} 400`,
//                     color: "#000000",

//                     marginRight: "6px",
//                   }}
//                 >
//                   {data.dial_code}   {data.mobileNumber}
//                 </Text>
//               </View>
//             )}

//             {data?.email?.length > 0 && (
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   gap: 10,
//                   alignItems: "center",
//                 }}
//               >
//                 <Image
//                   src="/images/services/mail.png"
//                   style={{
//                     width: 24,
//                     height: 24,
//                     borderRadius: "50%",
//                     objectFit: "contain",
//                   }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     fontFamily: `${selectedFont} 400`,
//                     color: "#000000",

//                     marginRight: "6px",
//                   }}
//                 >
//                   {formatEmail(data.email)}
//                 </Text>
//               </View>
//             )}

//             {data?.location?.length > 0 && (
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   gap: 10,
//                   alignItems: "center",
//                 }}
//               >
//                 <Image
//                   src="/images/services/location.png"
//                   style={{
//                     width: 24,
//                     height: 24,
//                     borderRadius: "50%",
//                     objectFit: "contain",
//                   }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     fontFamily: `${selectedFont} 400`,
//                     color: "#000000",

//                     flexWrap: "wrap",
//                   }}
//                 >
//                   {/* {data.location} */}
//                   {formatLocation(data.location)}
//                 </Text>
//               </View>
//             )}
//           </View>

//           <View
//             style={{
//               width: 326,
//               display: "flex",
//               flexDirection: "column",
//               gap: 50,
//               marginTop: 30
//             }}
//           >
//             <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
//               <Text
//                 style={{
//                   fontSize: 25,
//                   fontFamily: `${selectedFont} 400`,
//                   color: "#000000",

//                   flexWrap: "wrap",
//                 }}
//               >
//                 {data.firstName} {data.lastName}
//               </Text>
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 4,
//                   // alignItems: "center",
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     fontFamily: `${selectedFont} 400`,
//                     color: "#000000",

//                     flexWrap: "wrap",
//                   }}
//                 >
//                   {data.designation}
//                 </Text>
//               </View>
//             </View>
//             {data?.summery?.length > 0 && data?.showSummary === true && (
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 8,
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: 16,
//                     fontFamily: `${selectedFont} 400`,
//                     color: "#000000",
//                   }}
//                 >
//                   ABOUT ME
//                 </Text>
//                 <Svg
//                   width="326"
//                   height="1"
//                   viewBox="0 0 436 1"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <Path d="M436 0H0V1H436V0Z" fill="black" />
//                 </Svg>
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     color: "#000000",
//                     fontFamily: `${selectedFont} 400`,
//                   }}
//                 >
//                   {data.summery}
//                 </Text>
//               </View>
//             )}
//           </View>

//         </View>



//         {data?.skills?.length > 0 && data?.showSkills === true && (
//           <View
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: 18,
//               width: 546,
//             }}
//           >
//             <View
//               style={{
//                 width: 532,
//                 paddingVertical: 8,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderBottom: 1,
//                 borderBottomColor: "#000000",
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontFamily: `${selectedFont} 400`,
//                   color: "#000000",
//                 }}
//               >
//                 PROFESSIONAL SKILLS
//               </Text>
//             </View>
//             <View
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 flexWrap: "wrap",
//                 gap: 16,
//               }}
//             >
//               {data?.skills?.map((detail, index) => (
//                 <View
//                   key={index}
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     // width: "20%",
//                     gap: 8,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       fontSize: 12,
//                       color: "#808285",
//                       fontFamily: `${selectedFont} 400`,
//                     }}
//                   >
//                     {detail.skill}
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         )}

//         <View
//           style={{ display: "flex", flexDirection: "row", gap: 28, width: 546 }}
//         >
//           <View
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: 16,
//               width: 250,
//             }}
//           >
//             {data?.education?.length > 0 && data?.showEducation === true && (
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 16,
//                   alignItems: "flex-start",
//                   width: 250,
//                 }}
//               >
//                 <View
//                   style={{
//                     borderBottom: 1,
//                     borderBottomColor: "#000000",
//                     width: 250,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       paddingBottom: 5,
//                       fontFamily: `${selectedFont} 400`,
//                       fontSize: 16,
//                     }}
//                   >
//                     EDUCATION
//                   </Text>
//                 </View>

//                 <View
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 16,
//                     width: "100%",
//                   }}
//                 >
//                   {data?.education?.slice(0, pageLayout && 2)?.map((detail, index) => (
//                     <>
//                       <View
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           gap: 5,
//                           width: "100%",
//                         }}
//                         wrap={false}
//                       >
//                         <View
//                           style={{
//                             flexDirection: "row",
//                             justifyContent: "space-between",
//                             gap: 10,
//                             alignItems:'start'
//                           }}
//                         >
//                           <Text
//                             style={{
//                               fontSize: 12,
//                               color: "#000000",
//                               fontFamily: `${selectedFont} 400`,
//                               width: "70%",
//                             }}
//                           >
//                             {detail.specialization}
//                           </Text>
//                           <Text
//                             style={{
//                               fontSize: 10,
//                               color: "#000000",
//                               fontFamily: `${selectedFont} 400`,
//                               width: "30%",
//                             }}
//                           >
//                             {detail.duration?.start?.year !== "Year" &&
//                               `${detail.duration?.start?.year}-${detail.duration?.end?.year === "Year"
//                                 ? "Pursuing"
//                                 : detail.duration?.end?.year
//                               }`}
//                           </Text>
//                         </View>
//                         <Text
//                           style={{
//                             fontSize: 10,
//                             color: "#808285",
//                             fontFamily: `${selectedFont} 400`,
//                           }}
//                         >
//                           {detail.qualification}
//                         </Text>
//                         <Text
//                           style={{
//                             fontSize: 10,
//                             color: "#000000",
//                             fontFamily: `${selectedFont} 400`,
//                           }}
//                         >
//                           {detail.instituteName}
//                         </Text>
//                       </View>
//                     </>
//                   ))}
//                 </View>
//               </View>
//             )}

//             {data?.achievements?.length > 0 && data?.showAchievements === true &&
//               (<View
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 16,
//                   alignItems: "flex-start",
//                   width: 250,
//                 }}
//                 wrap={false}
//               >
//                 <View
//                   style={{
//                     borderBottom: 1,
//                     borderBottomColor: "#000000",
//                     width: 250,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       paddingBottom: 5,
//                       fontFamily: `${selectedFont} 400`,
//                       fontSize: 16
//                     }}
//                   >
//                     ACHIEVEMENTS & AWARDS
//                   </Text>
//                 </View>
//                 <View
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 10,
//                     width: "100%",

//                   }}
//                 >
//                   {data.achievements?.slice(0, pageLayout && 2)?.map((detail, index) => (
//                     <View
//                       key={index}
//                       style={{
//                         display: "flex",
//                         // flexDirection: "row",
//                         gap: 8,
//                         alignItems: "start",
//                         flexDirection: 'column'
//                       }}
//                     >

//                       <Text
//                         style={{
//                           fontSize: 12,
//                           fontFamily: `${selectedFont} 400`,
//                           color: "#000000",
//                         }}
//                       >
//                         {detail.title}
//                       </Text>
//                     </View>
//                   ))}
//                 </View>
//               </View>)}

//             {data?.socialLinks?.length > 0 && data?.showLinks === true && !pageLayout &&(
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 16,
//                   alignItems: "flex-start",
//                   width: 250,
//                 }}
//               >
//                 <View
//                   style={{
//                     borderBottom: 1,
//                     borderBottomColor: "#000000",
//                     width: 250,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       paddingBottom: 5,
//                       fontFamily: `${selectedFont} 400`,
//                       fontSize: 16,
//                     }}
//                   >
//                     WEBSITE & SOCIAL LINK
//                   </Text>
//                 </View>
//                 <View
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 10,
//                     width: "100%",
//                   }}
//                 >
//                   {data.socialLinks?.map((detail, index) => (
//                     <View
//                       key={index}
//                       style={{
//                         display: "flex",
//                         // flexDirection: "row",
//                         gap: 8,
//                         alignItems: "start",
//                         flexDirection: "column",
//                       }}
//                     >
//                       <Text
//                         style={{
//                           fontSize: 12,
//                           fontFamily: `${selectedFont} 600`,
//                           color: "#000000",
//                         }}
//                       >
//                         {detail?.platform}
//                       </Text>
//                       <Text
//                         style={{
//                           fontSize: 10,
//                           fontFamily: `${selectedFont} 400`,
//                           color: "#000000",
//                         }}
//                       >
//                         {/* {detail.link} */}
//                         {formatLink(detail?.link)}
//                       </Text>
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             )}

//             {data?.reference?.length > 0 && data?.showReference === true && !pageLayout &&(
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 16,
//                   alignItems: "flex-start",
//                   width: 250,
//                 }}
//               >
//                 <View
//                   style={{
//                     borderBottom: 1,
//                     borderBottomColor: "#000000",
//                     width: 250,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       paddingBottom: 5,
//                       fontFamily: `${selectedFont} 400`,
//                       fontSize: 16,
//                     }}
//                   >
//                     REFERENCES
//                   </Text>
//                 </View>
//                 <View
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 10,
//                     width: "100%",
//                   }}
//                 >
//                   {data.reference?.map((detail, index) => (
//                     <View
//                       key={index}
//                       style={{
//                         display: "flex",
//                         // flexDirection: "row",
//                         gap: 8,
//                         alignItems: "start",
//                         flexDirection: "column",
//                       }}
//                     >
//                       <Text
//                         style={{
//                           fontSize: 12,
//                           fontFamily: `${selectedFont} 600`,
//                           color: "#000000",
//                         }}
//                       >
//                         {detail.referantName}
//                       </Text>
//                       <Text
//                         style={{
//                           fontSize: 10,
//                           fontFamily: `${selectedFont} 400`,
//                           color: "#000000",
//                         }}
//                       >
//                         {detail.designation}
//                       </Text>
//                       <Text
//                         style={{
//                           fontSize: 10,
//                           fontFamily: `${selectedFont} 400`,
//                           color: "#000000",
//                         }}
//                       >
//                         {detail.organization}
//                       </Text>
//                       <Text
//                         style={{
//                           fontSize: 10,
//                           fontFamily: `${selectedFont} 400`,
//                           color: "#000000",
//                         }}
//                       >
//                         {detail.email}
//                       </Text>
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             )}

//             {data?.languages?.length > 0 && data?.showLanguage === true && !pageLayout &&(
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 16,
//                   alignItems: "flex-start",
//                   width: 250,
//                 }}
//               >
//                 <View
//                   style={{
//                     borderBottom: 1,
//                     borderBottomColor: "#000000",
//                     width: 250,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       paddingBottom: 5,
//                       fontFamily: `${selectedFont} 400`,
//                       fontSize: 16,
//                     }}
//                   >
//                     LANGUAGES
//                   </Text>
//                 </View>
//                 <View
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 10,
//                     width: "100%",
//                   }}
//                 >
//                   {data.languages?.map((detail, index) => (
//                     <View
//                       key={index}
//                       style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         gap: 5,
//                         alignItems: "center",
//                       }}
//                     >
//                       <Svg
//                         width="6"
//                         height="7"
//                         viewBox="0 0 6 7"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <Path
//                           d="M3 6.5C4.65685 6.5 6 5.15685 6 3.5C6 1.84315 4.65685 0.5 3 0.5C1.34315 0.5 0 1.84315 0 3.5C0 5.15685 1.34315 6.5 3 6.5Z"
//                           fill="#5E5F5E"
//                         />
//                       </Svg>
//                       <Text
//                         style={{
//                           fontSize: 10,
//                           fontFamily: `${selectedFont} 400`,
//                           color: "#000000",
//                         }}
//                       >
//                         {detail.languages}
//                       </Text>
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             )}

//             {data?.hobbies?.length > 0 && data?.showHobbies === true && !pageLayout && (
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 16,
//                   alignItems: "flex-start",
//                   width: 250,
//                 }}
//               >
//                 <View
//                   style={{
//                     borderBottom: 1,
//                     borderBottomColor: "#000000",
//                     width: 250,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       paddingBottom: 5,
//                       fontFamily: `${selectedFont} 400`,
//                       fontSize: 16,
//                     }}
//                   >
//                     HOBBIES
//                   </Text>
//                 </View>
//                 <View
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 10,
//                     width: "100%",
//                   }}
//                 >
//                   {data.hobbies?.map((detail, index) => (
//                     <View
//                       key={index}
//                       style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         gap: 5,
//                         alignItems: "center",
//                       }}
//                     >
//                       <Svg
//                         width="6"
//                         height="7"
//                         viewBox="0 0 6 7"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <Path
//                           d="M3 6.5C4.65685 6.5 6 5.15685 6 3.5C6 1.84315 4.65685 0.5 3 0.5C1.34315 0.5 0 1.84315 0 3.5C0 5.15685 1.34315 6.5 3 6.5Z"
//                           fill="#5E5F5E"
//                         />
//                       </Svg>
//                       <Text
//                         style={{
//                           fontSize: 10,
//                           fontFamily: `${selectedFont} 400`,
//                           color: "#000000",
//                         }}
//                       >
//                         {detail.title}
//                       </Text>
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             )}
//           </View>

//           <View
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               width: 268,
//               marginRight: 24,
//               gap: 16,
//             }}
//           >
//             {data?.experience?.length > 0 && data?.showExperience === true && (
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 16,
//                   alignItems: "flex-start",
//                   width: 268,
//                 }}
//               >
//                 <View
//                   style={{
//                     borderBottom: 1,
//                     borderBottomColor: "#000000",
//                     width: "100%",
//                   }}
//                 >
//                   <Text
//                     style={{
//                       paddingBottom: 5,
//                       fontFamily: `${selectedFont} 400`,
//                       fontSize: 16,
//                     }}
//                   >
//                     PROFESSIONAL EXPERIENCE
//                   </Text>
//                 </View>

//                 <View
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 16,
//                     width: "100%",
//                     //
//                   }}
//                 >
//                   {data?.experience?.slice(0, pageLayout && 1)?.map((detail, index) => (
//                     <>
//                       <View
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           gap: 4,
//                           width: "100%",
//                         }}
//                       >
//                         <View
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: 2,
//                             width: "100%",
//                           }}
//                         >
//                           <View
//                             style={{
//                               flexDirection: "row",
//                               justifyContent: "space-between",
//                               // gap: 10,
//                               width: "100%"
//                             }}
//                           >
//                             <Text
//                               style={{
//                                 fontSize: 12,
//                                 color: "#000000",
//                                 fontFamily: `${selectedFont} 400`,
//                                 width: "70%",
//                                 //
//                                 //
//                               }}
//                             >
//                               {detail.designation}
//                             </Text>
//                             <Text
//                               style={{
//                                 fontSize: 10,
//                                 color: "#000000",
//                                 fontFamily: `${selectedFont} 400`,
//                                 width: "30%",
//                                 //
//                                 //
//                               }}
//                             >
//                               {detail.duration?.start?.year !== "Year" &&
//                                 `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
//                                   ? "Present"
//                                   : detail.duration?.end?.year
//                                 }
//                          `}
//                             </Text>
//                           </View>
//                           <Text
//                             style={{
//                               fontSize: 10,
//                               color: "#808285",
//                               fontFamily: `${selectedFont} 400`,
//                               //
//                               //
//                             }}
//                           >
//                             {detail.organization}
//                           </Text>
//                         </View>
//                         <Text
//                           style={{
//                             fontSize: 10,
//                             color: "#000000",
//                             fontFamily: `${selectedFont} 400`,
//                             //
//                             //
//                           }}
//                         >
//                           {detail.description}
//                         </Text>
//                       </View>
//                     </>
//                   ))}
//                 </View>
//               </View>
//             )}

//             {data?.project?.length > 0 && data?.showProject === true && (
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 16,
//                   alignItems: "flex-start",
//                   width: 268,
//                 }}
//               >
//                 <View
//                   style={{
//                     borderBottom: 1,
//                     borderBottomColor: "#000000",
//                     width: "100%",
//                   }}
//                 >
//                   <Text
//                     style={{
//                       paddingBottom: 5,
//                       fontFamily: `${selectedFont} 400`,
//                       fontSize: 16,
//                     }}
//                   >
//                     PROJECTS
//                   </Text>
//                 </View>

//                 <View
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 16,
//                     width: "100%",
//                     //
//                   }}
//                 >
//                   {data?.project?.slice(0, pageLayout && 1)?.map((detail, index) => (
//                     <>
//                       <View
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           gap: 4,
//                           width: "100%",
//                         }}
//                       >
//                         <View
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: 2,
//                             width: "100%",
//                           }}
//                         >
//                           <View
//                             style={{
//                               flexDirection: "row",
//                               justifyContent: "space-between",
//                               gap: 10,
//                             }}
//                           >
//                             <Text
//                               style={{
//                                 fontSize: 12,
//                                 color: "#000000",
//                                 fontFamily: `${selectedFont} 400`,
//                                 width: "70%",
//                                 //
//                                 //
//                               }}
//                             >
//                               {detail.title}
//                             </Text>
//                             <Text
//                               style={{
//                                 fontSize: 10,
//                                 color: "#000000",
//                                 fontFamily: `${selectedFont} 400`,
//                                 width: "30%",
//                               }}
//                             >
//                               {detail.duration?.start?.year !== "Year" &&
//                                 `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
//                                   ? "Present"
//                                   : detail.duration?.end?.year
//                                 }
//                          `}
//                             </Text>
//                           </View>
//                           <Text
//                             style={{
//                               fontSize: 10,
//                               color: "#808285",
//                               fontFamily: `${selectedFont} 400`,
//                               //
//                               //
//                             }}
//                           >
//                             {detail.organization}
//                           </Text>
//                         </View>
//                         <Text
//                           style={{
//                             fontSize: 10,
//                             color: "#000000",
//                             fontFamily: `${selectedFont} 400`,
//                             //
//                             //
//                           }}
//                         >
//                           {detail.description}
//                         </Text>
//                       </View>
//                     </>
//                   ))}
//                 </View>
//               </View>
//             )}

//             {data?.course?.length > 0 && data?.showCourses === true && !pageLayout && (
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 16,
//                   alignItems: "flex-start",
//                   width: 268,
//                 }}
//                 wrap={false}
//               >
//                 <View
//                   style={{
//                     borderBottom: 1,
//                     borderBottomColor: "#000000",
//                     width: "100%",
//                   }}
//                 >
//                   <Text
//                     style={{
//                       paddingBottom: 5,
//                       fontFamily: `${selectedFont} 400`,
//                       fontSize: 16,
//                     }}
//                   >
//                     COURSES & CERTIFICATIONS
//                   </Text>
//                 </View>

//                 <View
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 16,
//                     width: "100%",
//                     //
//                   }}
//                 >
//                   {data?.course?.map((detail, index) => (
//                     <>
//                       <View
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           gap: 4,
//                           width: "100%",
//                         }}
//                       >
//                         <View
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: 2,
//                             width: "100%",
//                           }}
//                         >
//                           <View
//                             style={{
//                               flexDirection: "row",
//                               justifyContent: "space-between",
//                               gap: 10,
//                               width: "100%"
//                             }}
//                           >
//                             <Text
//                               style={{
//                                 fontSize: 12,
//                                 color: "#000000",
//                                 fontFamily: `${selectedFont} 400`,
//                                 width: "70%",

//                               }}
//                             >
//                               {detail.title}
//                             </Text>
//                             <Text
//                               style={{
//                                 fontSize: 10,
//                                 color: "#000000",
//                                 fontFamily: `${selectedFont} 400`,
//                                 width: "30%",
//                                 //
//                                 //
//                               }}
//                             >
//                               {detail.duration?.start?.year !== "Year" &&
//                                 `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
//                                   ? "Present"
//                                   : detail.duration?.end?.year
//                                 }
//                          `}
//                             </Text>
//                           </View>
//                           <Text
//                             style={{
//                               fontSize: 10,
//                               color: "#808285",
//                               fontFamily: `${selectedFont} 400`,
//                               //
//                               //
//                             }}
//                           >
//                             {detail.organization}
//                           </Text>
//                         </View>
//                         <Text
//                           style={{
//                             fontSize: 10,
//                             color: "#000000",
//                             fontFamily: `${selectedFont} 400`,
//                             //
//                             //
//                           }}
//                         >
//                           {detail.description}
//                         </Text>
//                       </View>
//                     </>
//                   ))}
//                 </View>
//               </View>
//             )}

//             {data?.extraCaricularData?.length > 0 && data?.showExtraCariculam === true && !pageLayout && (
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 16,
//                   alignItems: "flex-start",
//                   width: 268,
//                 }}
//               >
//                 <View
//                   style={{
//                     borderBottom: 1,
//                     borderBottomColor: "#000000",
//                     width: "100%",
//                   }}
//                 >
//                   <Text
//                     style={{
//                       paddingBottom: 5,
//                       fontFamily: `${selectedFont} 400`,
//                       fontSize: 16,
//                     }}
//                   >
//                     EXTRA-ACTIVITIES
//                   </Text>
//                 </View>

//                 <View
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 16,
//                     width: "100%",
//                     //
//                   }}
//                 >
//                   {data?.extraCaricularData?.map((detail, index) => (
//                     <>
//                       <View
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           gap: 4,
//                           width: "100%",
//                         }}
//                       >
//                         <View
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: 2,
//                             width: "100%",
//                           }}
//                         >
//                           <View
//                             style={{
//                               flexDirection: "row",
//                               justifyContent: "space-between",
//                               gap: 10,
//                             }}
//                           >
//                             <Text
//                               style={{
//                                 fontSize: 12,
//                                 color: "#000000",
//                                 fontFamily: `${selectedFont} 400`,
//                                 width: "70%",
//                                 //
//                                 //
//                               }}
//                             >
//                               {detail.title}
//                             </Text>
//                             <Text
//                               style={{
//                                 fontSize: 10,
//                                 color: "#000000",
//                                 fontFamily: `${selectedFont} 400`,
//                                 width: "30%",
//                                 //
//                                 //
//                               }}
//                             >
//                               {detail.duration?.start?.year !== "Year" &&
//                                 `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
//                                   ? "Present"
//                                   : detail.duration?.end?.year
//                                 }
//                          `}
//                             </Text>
//                           </View>
//                           <Text
//                             style={{
//                               fontSize: 10,
//                               color: "#808285",
//                               fontFamily: `${selectedFont} 400`,
//                               //
//                               //
//                             }}
//                           >
//                             {detail.organization}
//                           </Text>
//                         </View>
//                         <Text
//                           style={{
//                             fontSize: 10,
//                             color: "#000000",
//                             fontFamily: `${selectedFont} 400`,
//                             //
//                             //
//                           }}
//                         >
//                           {detail.description}
//                         </Text>
//                       </View>
//                     </>
//                   ))}
//                 </View>
//               </View>
//             )}

//             {data?.internship?.length > 0 && data?.showInternship === true && !pageLayout &&(
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 16,
//                   alignItems: "flex-start",
//                   width: 268,
//                 }}
//                 wrap={data?.internship?.length > 1 ? true : false}
//               >
//                 <View
//                   style={{
//                     borderBottom: 1,
//                     borderBottomColor: "#000000",
//                     width: "100%",
//                   }}
//                 >
//                   <Text
//                     style={{
//                       paddingBottom: 5,
//                       fontFamily: `${selectedFont} 400`,
//                       fontSize: 16,
//                     }}
//                   >
//                     INTERNSHIP
//                   </Text>
//                 </View>

//                 <View
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 16,
//                     width: "100%",
//                     //
//                   }}
//                 >
//                   {data?.internship?.map((detail, index) => (
//                     <>
//                       <View
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           gap: 4,
//                           width: "100%",
//                         }}
//                         wrap={false}
//                       >
//                         <View
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: 2,
//                             width: "100%",
//                           }}
//                         >
//                           <View
//                             style={{
//                               flexDirection: "row",
//                               justifyContent: "space-between",
//                               gap: 10,
//                             }}
//                           >
//                             <Text
//                               style={{
//                                 fontSize: 12,
//                                 color: "#000000",
//                                 fontFamily: `${selectedFont} 400`,
//                                 width: "70%",
//                                 //
//                                 //
//                               }}
//                             >
//                               {detail.title}
//                             </Text>
//                             <Text
//                               style={{
//                                 fontSize: 10,
//                                 color: "#000000",
//                                 fontFamily: `${selectedFont} 400`,
//                                 width: "30%",
//                                 //
//                                 //
//                               }}
//                             >
//                               {detail.duration?.start?.year !== "Year" &&
//                                 `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
//                                   ? "Present"
//                                   : detail.duration?.end?.year
//                                 }
//                          `}
//                             </Text>
//                           </View>
//                           <Text
//                             style={{
//                               fontSize: 10,
//                               color: "#808285",
//                               fontFamily: `${selectedFont} 400`,
//                               //
//                               //
//                             }}
//                           >
//                             {detail.organization}
//                           </Text>
//                         </View>
//                         <Text
//                           style={{
//                             fontSize: 10,
//                             color: "#000000",
//                             fontFamily: `${selectedFont} 400`,
//                             //
//                             //
//                           }}
//                         >
//                           {detail.description}
//                         </Text>
//                       </View>
//                     </>
//                   ))}
//                 </View>
//               </View>
//             )}

//             {data?.section?.length > 0 && data?.showCustomSection === true && !pageLayout &&(
//               <>
//                 {data.section.map((item, index) => (
//                   <View
//                     key={index}
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: 16,
//                       alignItems: "flex-start",
//                       width: 268,
//                     }}
//                   >
//                     <View
//                       style={{
//                         borderBottom: 1,
//                         borderBottomColor: "#000000",
//                         width: "100%",
//                       }}
//                     >
//                       <Text
//                         style={{
//                           paddingBottom: 5,
//                           fontFamily: `${selectedFont} 400`,
//                           fontSize: 16,
//                         }}
//                       >
//                         {item.header}
//                       </Text>
//                     </View>

//                     <View
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: 16,
//                         width: "100%",
//                         //
//                       }}
//                     >
//                       {item?.subSection?.map((detail, index) => (
//                         <>
//                           <View
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                               gap: 4,
//                               width: "100%",
//                             }}
//                           >
//                             <View
//                               style={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 gap: 2,
//                                 width: "100%",
//                               }}
//                             >
//                               <View
//                                 style={{
//                                   flexDirection: "row",
//                                   justifyContent: "space-between",
//                                   gap: 10,
//                                 }}
//                               >
//                                 <Text
//                                   style={{
//                                     fontSize: 12,
//                                     color: "#000000",
//                                     fontFamily: `${selectedFont} 400`,
//                                     width: "70%",
//                                     //
//                                     //
//                                   }}
//                                 >
//                                   {detail.title}
//                                 </Text>
//                                 <Text
//                                   style={{
//                                     fontSize: 10,
//                                     color: "#000000",
//                                     fontFamily: `${selectedFont} 400`,
//                                     width: "30%",
//                                     //
//                                     //
//                                   }}
//                                 >
//                                   {detail?.duration?.start?.year}
//                                   {detail?.duration?.start?.year && "-"}
//                                   {detail?.duration?.end?.year === "Year" ||
//                                     detail?.duration?.end?.year === undefined
//                                     ? "Present"
//                                     : detail?.duration?.end?.year}
//                                 </Text>
//                               </View>
//                               <Text
//                                 style={{
//                                   fontSize: 10,
//                                   color: "#808285",
//                                   fontFamily: `${selectedFont} 400`,
//                                   //
//                                   //
//                                 }}
//                               >
//                                 {detail.organization}
//                               </Text>
//                             </View>
//                             <Text
//                               style={{
//                                 fontSize: 10,
//                                 color: "#000000",
//                                 fontFamily: `${selectedFont} 400`,
//                                 //
//                                 //
//                               }}
//                             >
//                               {detail.description}
//                             </Text>
//                           </View>
//                         </>
//                       ))}
//                     </View>
//                   </View>
//                 ))}
//               </>
//             )}
//           </View>
//         </View>
//       </View>
//     </Page>
//   );
// }

// export default Template19;


import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Svg,
  Path,
  Rect,
} from "@react-pdf/renderer";

function Template19({ data, selectedColor, selectedFont, preview,pageLayout }) {

  const formatLink = (link) => {
    if (link?.length > 43) {
      return link?.match(/.{1,43}/g).join('\n');
    }
    return link;
  };

  const formatEmail = (email) => {
    if (email?.length > 20) {
      return email?.match(/.{1,20}/g).join('\n');
    }
    return email;
  };

  const formatLocation = (location) => {
    if (location?.length > 20) {
      return location?.match(/.{1,20}/g).join('\n');
    }
    return location;
  };


  return (
    <Page size="A4" style={{ padding: 24 }}>
      <View
        style={{
          width: 532,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", gap: 32 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "flex-start",
              width: 172,
            }}
          >
            {data?.showProfile === true && (
              <>
                {data.profilePhoto ? (
                  <Image
                    src={
                      preview
                        ? data.profilePhoto
                        : Object.keys(data?.profilePhoto).includes("filename")
                          ? URL.createObjectURL(data.profilePhoto)
                          : data.profilePhoto
                    }
                    alt=""
                    style={{
                      width: 161,
                      height: 161,
                      borderRadius: "50%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Image
                    src="/images/profile/john_doe.png"
                    style={{
                      width: 161,
                      height: 161,
                      borderRadius: "50%",
                      objectFit: "contain",
                    }}
                  />
                )}
              </>
            )}
            {data?.mobileNumber && (
              <View
                style={{
                  marginTop: data?.showProfile ? "" : 34,
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Image
                  src="/images/services/call.png"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: `${selectedFont} 400`,
                    color: "#000000",

                    marginRight: "6px",
                  }}
                >
                  {data.dial_code}   {data.mobileNumber}
                </Text>
              </View>
            )}

            {data?.email?.length > 0 && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Image
                  src="/images/services/mail.png"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: `${selectedFont} 400`,
                    color: "#000000",

                    marginRight: "6px",
                  }}
                >
                  {formatEmail(data.email)}
                </Text>
              </View>
            )}

            {data?.location?.length > 0 && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Image
                  src="/images/services/location.png"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: `${selectedFont} 400`,
                    color: "#000000",

                    flexWrap: "wrap",
                  }}
                >
                  {/* {data.location} */}
                  {formatLocation(data.location)}
                </Text>
              </View>
            )}
          </View>

          <View
            style={{
              width: 326,
              display: "flex",
              flexDirection: "column",
              gap: 50,
              marginTop: 30
            }}
          >
            <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: `${selectedFont} 400`,
                  color: "#000000",

                  flexWrap: "wrap",
                }}
              >
                {data.firstName} {data.lastName}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  // alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: `${selectedFont} 400`,
                    color: "#000000",

                    flexWrap: "wrap",
                  }}
                >
                  {data.designation}
                </Text>
              </View>
            </View>
            {data?.summery?.length > 0 && data?.showSummary === true && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: `${selectedFont} 400`,
                    color: "#000000",
                  }}
                >
                  ABOUT ME
                </Text>
                <Svg
                  width="326"
                  height="1"
                  viewBox="0 0 436 1"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path d="M436 0H0V1H436V0Z" fill="black" />
                </Svg>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#000000",
                    fontFamily: `${selectedFont} 400`,
                  }}
                >
                  {data.summery}
                </Text>
              </View>
            )}
          </View>

        </View>



        {data?.skills?.length > 0 && data?.showSkills === true && (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              width: 546,
            }}
          >
            <View
              style={{
                width: 532,
                paddingVertical: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: 1,
                borderBottomColor: "#000000",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: `${selectedFont} 400`,
                  color: "#000000",
                }}
              >
                PROFESSIONAL SKILLS
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              {data?.skills?.map((detail, index) => (
                <View
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    // width: "20%",
                    gap: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#808285",
                      fontFamily: `${selectedFont} 400`,
                    }}
                  >
                    {detail.skill}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View
          style={{ display: "flex", flexDirection: "row", gap: 28, width: 546 }}
        >
          <Vieyw
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              width: 250,
            }}
          >
            {data?.education?.length > 0 && data?.showEducation === true && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "flex-start",
                  width: 250,
                }}
              >
                <View
                  style={{
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    width: 250,
                  }}
                >
                  <Text
                    style={{
                      paddingBottom: 5,
                      fontFamily: `${selectedFont} 400`,
                      fontSize: 16,
                    }}
                  >
                    EDUCATION
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    width: "100%",
                  }}
                >
                  {data?.education?.slice(0, pageLayout && 2)?.map((detail, index) => (
                    <>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 5,
                          width: "100%",
                        }}
                        wrap={false}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: 10,
                            alignItems:'start'
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#000000",
                              fontFamily: `${selectedFont} 400`,
                              width: "70%",
                            }}
                          >
                            {detail.specialization}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              color: "#000000",
                              fontFamily: `${selectedFont} 400`,
                              width: "30%",
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${detail.duration?.end?.year === "Year"
                                ? "Pursuing"
                                : detail.duration?.end?.year
                              }`}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "#808285",
                            fontFamily: `${selectedFont} 400`,
                          }}
                        >
                          {detail.qualification}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "#000000",
                            fontFamily: `${selectedFont} 400`,
                          }}
                        >
                          {detail.instituteName}
                        </Text>
                      </View>
                    </>
                  ))}
                </View>
              </View>
            )}

            {data?.achievements?.length > 0 && data?.showAchievements === true &&
              (<View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "flex-start",
                  width: 250,
                }}
                wrap={false}
              >
                <View
                  style={{
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    width: 250,
                  }}
                >
                  <Text
                    style={{
                      paddingBottom: 5,
                      fontFamily: `${selectedFont} 400`,
                      fontSize: 16
                    }}
                  >
                    ACHIEVEMENTS & AWARDS
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    width: "100%",

                  }}
                >
                  {data.achievements?.slice(0, pageLayout && 2)?.map((detail, index) => (
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        // flexDirection: "row",
                        gap: 8,
                        alignItems: "start",
                        flexDirection: 'column'
                      }}
                    >

                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: "#000000",
                        }}
                      >
                        {detail.title}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>)}

            {data?.socialLinks?.length > 0 && data?.showLinks === true && !pageLayout &&(
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "flex-start",
                  width: 250,
                }}
              >
                <View
                  style={{
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    width: 250,
                  }}
                >
                  <Text
                    style={{
                      paddingBottom: 5,
                      fontFamily: `${selectedFont} 400`,
                      fontSize: 16,
                    }}
                  >
                    WEBSITE & SOCIAL LINK
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    width: "100%",
                  }}
                >
                  {data.socialLinks?.map((detail, index) => (
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        // flexDirection: "row",
                        gap: 8,
                        alignItems: "start",
                        flexDirection: "column",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 600`,
                          color: "#000000",
                        }}
                      >
                        {detail?.platform}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#000000",
                        }}
                      >
                        {/* {detail.link} */}
                        {formatLink(detail?.link)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.reference?.length > 0 && data?.showReference === true && !pageLayout &&(
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "flex-start",
                  width: 250,
                }}
              >
                <View
                  style={{
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    width: 250,
                  }}
                >
                  <Text
                    style={{
                      paddingBottom: 5,
                      fontFamily: `${selectedFont} 400`,
                      fontSize: 16,
                    }}
                  >
                    REFERENCES
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    width: "100%",
                  }}
                >
                  {data.reference?.map((detail, index) => (
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        // flexDirection: "row",
                        gap: 8,
                        alignItems: "start",
                        flexDirection: "column",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 600`,
                          color: "#000000",
                        }}
                      >
                        {detail.referantName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#000000",
                        }}
                      >
                        {detail.designation}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#000000",
                        }}
                      >
                        {detail.organization}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#000000",
                        }}
                      >
                        {detail.email}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.languages?.length > 0 && data?.showLanguage === true && !pageLayout &&(
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "flex-start",
                  width: 250,
                }}
              >
                <View
                  style={{
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    width: 250,
                  }}
                >
                  <Text
                    style={{
                      paddingBottom: 5,
                      fontFamily: `${selectedFont} 400`,
                      fontSize: 16,
                    }}
                  >
                    LANGUAGES
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    width: "100%",
                  }}
                >
                  {data.languages?.map((detail, index) => (
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                      }}
                    >
                      <Svg
                        width="6"
                        height="7"
                        viewBox="0 0 6 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <Path
                          d="M3 6.5C4.65685 6.5 6 5.15685 6 3.5C6 1.84315 4.65685 0.5 3 0.5C1.34315 0.5 0 1.84315 0 3.5C0 5.15685 1.34315 6.5 3 6.5Z"
                          fill="#5E5F5E"
                        />
                      </Svg>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#000000",
                        }}
                      >
                        {detail.languages}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.hobbies?.length > 0 && data?.showHobbies === true && !pageLayout && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "flex-start",
                  width: 250,
                }}
              >
                <View
                  style={{
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    width: 250,
                  }}
                >
                  <Text
                    style={{
                      paddingBottom: 5,
                      fontFamily: `${selectedFont} 400`,
                      fontSize: 16,
                    }}
                  >
                    HOBBIES
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    width: "100%",
                  }}
                >
                  {data.hobbies?.map((detail, index) => (
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                      }}
                    >
                      <Svg
                        width="6"
                        height="7"
                        viewBox="0 0 6 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <Path
                          d="M3 6.5C4.65685 6.5 6 5.15685 6 3.5C6 1.84315 4.65685 0.5 3 0.5C1.34315 0.5 0 1.84315 0 3.5C0 5.15685 1.34315 6.5 3 6.5Z"
                          fill="#5E5F5E"
                        />
                      </Svg>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#000000",
                        }}
                      >
                        {detail.title}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </Vieyw>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: 268,
              marginRight: 24,
              gap: 16,
            }}
          >
            {data?.experience?.length > 0 && data?.showExperience === true && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "flex-start",
                  width: 268,
                }}
              >
                <View
                  style={{
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      paddingBottom: 5,
                      fontFamily: `${selectedFont} 400`,
                      fontSize: 16,
                    }}
                  >
                    PROFESSIONAL EXPERIENCE
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    width: "100%",
                    //
                  }}
                >
                  {data?.experience?.slice(0, pageLayout && 1)?.map((detail, index) => (
                    <>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                          width: "100%",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: "100%",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              // gap: 10,
                              width: "100%"
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                color: "#000000",
                                fontFamily: `${selectedFont} 400`,
                                width: "70%",
                                //
                                //
                              }}
                            >
                              {detail.designation}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                color: "#000000",
                                fontFamily: `${selectedFont} 400`,
                                width: "30%",
                                //
                                //
                              }}
                            >
                              {detail.duration?.start?.year !== "Year" &&
                                `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                                  ? "Present"
                                  : detail.duration?.end?.year
                                }
                         `}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 10,
                              color: "#808285",
                              fontFamily: `${selectedFont} 400`,
                              //
                              //
                            }}
                          >
                            {detail.organization}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "#000000",
                            fontFamily: `${selectedFont} 400`,
                            //
                            //
                          }}
                        >
                          {detail.description}
                        </Text>
                      </View>
                    </>
                  ))}
                </View>
              </View>
            )}

            {data?.project?.length > 0 && data?.showProject === true && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "flex-start",
                  width: 268,
                }}
              >
                <View
                  style={{
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      paddingBottom: 5,
                      fontFamily: `${selectedFont} 400`,
                      fontSize: 16,
                    }}
                  >
                    PROJECTS
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    width: "100%",
                    //
                  }}
                >
                  {data?.project?.slice(0, pageLayout && 1)?.map((detail, index) => (
                    <>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                          width: "100%",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: "100%",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              gap: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                color: "#000000",
                                fontFamily: `${selectedFont} 400`,
                                width: "70%",
                                //
                                //
                              }}
                            >
                              {detail.title}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                color: "#000000",
                                fontFamily: `${selectedFont} 400`,
                                width: "30%",
                              }}
                            >
                              {detail.duration?.start?.year !== "Year" &&
                                `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                                  ? "Present"
                                  : detail.duration?.end?.year
                                }
                         `}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 10,
                              color: "#808285",
                              fontFamily: `${selectedFont} 400`,
                              //
                              //
                            }}
                          >
                            {detail.organization}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "#000000",
                            fontFamily: `${selectedFont} 400`,
                            //
                            //
                          }}
                        >
                          {detail.description}
                        </Text>
                      </View>
                    </>
                  ))}
                </View>
              </View>
            )}

            {data?.course?.length > 0 && data?.showCourses === true && !pageLayout && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "flex-start",
                  width: 268,
                }}
                wrap={false}
              >
                <View
                  style={{
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      paddingBottom: 5,
                      fontFamily: `${selectedFont} 400`,
                      fontSize: 16,
                    }}
                  >
                    COURSES & CERTIFICATIONS
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    width: "100%",
                    //
                  }}
                >
                  {data?.course?.map((detail, index) => (
                    <>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                          width: "100%",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: "100%",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              gap: 10,
                              width: "100%"
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                color: "#000000",
                                fontFamily: `${selectedFont} 400`,
                                width: "70%",

                              }}
                            >
                              {detail.title}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                color: "#000000",
                                fontFamily: `${selectedFont} 400`,
                                width: "30%",
                                //
                                //
                              }}
                            >
                              {detail.duration?.start?.year !== "Year" &&
                                `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                                  ? "Present"
                                  : detail.duration?.end?.year
                                }
                         `}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 10,
                              color: "#808285",
                              fontFamily: `${selectedFont} 400`,
                              //
                              //
                            }}
                          >
                            {detail.organization}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "#000000",
                            fontFamily: `${selectedFont} 400`,
                            //
                            //
                          }}
                        >
                          {detail.description}
                        </Text>
                      </View>
                    </>
                  ))}
                </View>
              </View>
            )}

            {data?.extraCaricularData?.length > 0 && data?.showExtraCariculam === true && !pageLayout && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "flex-start",
                  width: 268,
                }}
              >
                <View
                  style={{
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      paddingBottom: 5,
                      fontFamily: `${selectedFont} 400`,
                      fontSize: 16,
                    }}
                  >
                    EXTRA-ACTIVITIES
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    width: "100%",
                    //
                  }}
                >
                  {data?.extraCaricularData?.map((detail, index) => (
                    <>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                          width: "100%",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: "100%",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              gap: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                color: "#000000",
                                fontFamily: `${selectedFont} 400`,
                                width: "70%",
                                //
                                //
                              }}
                            >
                              {detail.title}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                color: "#000000",
                                fontFamily: `${selectedFont} 400`,
                                width: "30%",
                                //
                                //
                              }}
                            >
                              {detail.duration?.start?.year !== "Year" &&
                                `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                                  ? "Present"
                                  : detail.duration?.end?.year
                                }
                         `}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 10,
                              color: "#808285",
                              fontFamily: `${selectedFont} 400`,
                              //
                              //
                            }}
                          >
                            {detail.organization}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "#000000",
                            fontFamily: `${selectedFont} 400`,
                            //
                            //
                          }}
                        >
                          {detail.description}
                        </Text>
                      </View>
                    </>
                  ))}
                </View>
              </View>
            )}

            {data?.internship?.length > 0 && data?.showInternship === true && !pageLayout &&(
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "flex-start",
                  width: 268,
                }}
                wrap={data?.internship?.length > 1 ? true : false}
              >
                <View
                  style={{
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      paddingBottom: 5,
                      fontFamily: `${selectedFont} 400`,
                      fontSize: 16,
                    }}
                  >
                    INTERNSHIP
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    width: "100%",
                    //
                  }}
                >
                  {data?.internship?.map((detail, index) => (
                    <>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                          width: "100%",
                        }}
                        wrap={false}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: "100%",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              gap: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                color: "#000000",
                                fontFamily: `${selectedFont} 400`,
                                width: "70%",
                                //
                                //
                              }}
                            >
                              {detail.title}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                color: "#000000",
                                fontFamily: `${selectedFont} 400`,
                                width: "30%",
                                //
                                //
                              }}
                            >
                              {detail.duration?.start?.year !== "Year" &&
                                `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                                  ? "Present"
                                  : detail.duration?.end?.year
                                }
                         `}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 10,
                              color: "#808285",
                              fontFamily: `${selectedFont} 400`,
                              //
                              //
                            }}
                          >
                            {detail.organization}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "#000000",
                            fontFamily: `${selectedFont} 400`,
                            //
                            //
                          }}
                        >
                          {detail.description}
                        </Text>
                      </View>
                    </>
                  ))}
                </View>
              </View>
            )}

            {data?.section?.length > 0 && data?.showCustomSection === true && !pageLayout &&(
              <>
                {data.section.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      alignItems: "flex-start",
                      width: 268,
                    }}
                  >
                    <View
                      style={{
                        borderBottom: 1,
                        borderBottomColor: "#000000",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          paddingBottom: 5,
                          fontFamily: `${selectedFont} 400`,
                          fontSize: 16,
                        }}
                      >
                        {item.header}
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        width: "100%",
                        //
                      }}
                    >
                      {item?.subSection?.map((detail, index) => (
                        <>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 4,
                              width: "100%",
                            }}
                          >
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                width: "100%",
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  gap: 10,
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: "#000000",
                                    fontFamily: `${selectedFont} 400`,
                                    width: "70%",
                                    //
                                    //
                                  }}
                                >
                                  {detail.title}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: "#000000",
                                    fontFamily: `${selectedFont} 400`,
                                    width: "30%",
                                    //
                                    //
                                  }}
                                >
                                  {detail?.duration?.start?.year}
                                  {detail?.duration?.start?.year && "-"}
                                  {detail?.duration?.end?.year === "Year" ||
                                    detail?.duration?.end?.year === undefined
                                    ? "Present"
                                    : detail?.duration?.end?.year}
                                </Text>
                              </View>
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: "#808285",
                                  fontFamily: `${selectedFont} 400`,
                                  //
                                  //
                                }}
                              >
                                {detail.organization}
                              </Text>
                            </View>
                            <Text
                              style={{
                                fontSize: 10,
                                color: "#000000",
                                fontFamily: `${selectedFont} 400`,
                                //
                                //
                              }}
                            >
                              {detail.description}
                            </Text>
                          </View>
                        </>
                      ))}
                    </View>
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </View>
    </Page>
  );
}

export default Template19;

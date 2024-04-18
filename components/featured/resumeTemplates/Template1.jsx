// import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   Svg,
//   Path,
//   Rect,
//   Font,
// } from "@react-pdf/renderer";

// function Template1({ data, selectedColor, selectedFont, preview }) {
//   return (
//     <Page size="A4" style={{ padding: 24 }} pageMode={"fullScreen"} wrap={true}>
//       <View style={{ flexDirection: "column", minHeight: "792px" }}>
//         <View
//           style={{
//             flexDirection: "row",
//             paddingBottom: "24px",
//             justifyContent: "space-between",
//           }}
//         >
//           <View style={{ flexDirection: "col", gap: 4 }}>
//             <View>
//               <Text
//                 style={{
//                   color: "#414042",
//                   fontSize: 43,
//                   fontFamily: `${selectedFont} 400`,
//                 }}
//               >
//                 {data.firstName}
//               </Text>
//               <Text
//                 style={{
//                   color: "#414042",
//                   fontSize: 43,
//                   fontFamily: `${selectedFont} 400`,
//                 }}
//               >
//                 {data.lastName}
//               </Text>
//             </View>
//             <Text
//               style={{ color: "#414042", fontFamily: `${selectedFont} 400` }}
//             >
//               {data.designation}
//             </Text>
//           </View>
//           <View
//             style={{
//               width: "112px",
//               height: "112px",
//             }}
//           >
//             {data.profilePhoto ? (
//               <Image
//                 src={
//                   preview
//                     ? data.profilePhoto
//                     : Object.keys(data?.profilePhoto).includes("filename")
//                       ? URL.createObjectURL(data.profilePhoto)
//                       : data.profilePhoto
//                 }
//                 style={{
//                   objectFit: "cover",
//                   borderRadius: "50%",
//                   width: "112px",
//                   height: "112px",
//                 }}
//               />
//             ) : (
//               <Image src="/images/services/profile.png" />
//             )}
//           </View>
//         </View>

//         <View
//           style={{ height: "1px", width: "100%", backgroundColor: "#333" }}
//         />

//         <View style={{ flexDirection: "row", height: "100%" }}>
//           <View style={{ flexDirection: "column", width: "35%", gap: "32px" }}>
//             <View
//               style={{
//                 flexDirection: "column",
//                 alignItems: "flex-start",
//                 justifyContent: "flex-start",
//                 paddingTop: "24px",
//                 gap: 12,
//               }}
//             >
//               <Text
//                 style={{
//                   color: "#414042",
//                   fontSize: "16px",
//                   fontFamily: `${selectedFont} 400`,
//                 }}
//               >
//                 CONTACT
//               </Text>
//               <Svg width={141} height={4} viewBox="0 0 141 4">
//                 <Path
//                   d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
//                   fill="#A7A9AC"
//                 />
//                 <Path
//                   d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
//                   fill={selectedColor}
//                 />
//               </Svg>
//               <View
//                 style={{
//                   flexDirection: "column",
//                   gap: "16px",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <View
//                   style={{
//                     height: 24,
//                     flexDirection: "row",
//                     alignItems: "center",
//                     gap: 12,
//                   }}
//                 >
//                   <Svg width="22" height="22" viewBox="0 0 22 22">
//                     <Path d="M22 0H0V22H22V0Z" fill={selectedColor} />
//                     <Path
//                       d="M17.0236 14.5541C17.0487 14.7527 16.9895 14.9272 16.8441 15.0747L15.1461 16.7937C15.0689 16.879 14.9696 16.9542 14.8472 17.0154C14.7228 17.0756 14.6015 17.1157 14.4811 17.1338C14.4721 17.1338 14.447 17.1358 14.4039 17.1398C14.3618 17.1438 14.3056 17.1468 14.2384 17.1468C14.0769 17.1468 13.8162 17.1187 13.4551 17.0625C13.093 17.0064 12.6497 16.867 12.1262 16.6453C11.6036 16.4237 11.0099 16.0917 10.3459 15.6494C9.68194 15.2071 8.97485 14.5993 8.22664 13.827C7.63188 13.2292 7.13642 12.6565 6.74526 12.1089C6.35511 11.5623 6.03917 11.0558 5.80147 10.5914C5.56377 10.1281 5.38424 9.7058 5.26488 9.32969C5.14553 8.95157 5.0663 8.62662 5.02317 8.35181C4.98004 8.079 4.96199 7.86336 4.97102 7.7069C4.98004 7.55144 4.98305 7.46418 4.98305 7.44613C5.00111 7.32477 5.03922 7.2014 5.09839 7.07603C5.15857 6.95066 5.23079 6.84835 5.31604 6.77012L7.01305 5.03901C7.1324 4.91765 7.2688 4.85547 7.42326 4.85547C7.53359 4.85547 7.63087 4.88756 7.71613 4.95276C7.80038 5.01695 7.87259 5.09818 7.93277 5.19447L9.2988 7.83729C9.37402 7.9767 9.39509 8.12714 9.36199 8.29364C9.32789 8.45812 9.25567 8.59752 9.14435 8.70885L8.5205 9.34674C8.50245 9.36479 8.48841 9.39187 8.47637 9.43098C8.46333 9.4701 8.45631 9.5032 8.45631 9.52928C8.49041 9.71182 8.56764 9.91944 8.687 10.1541C8.7883 10.3617 8.94576 10.6155 9.15839 10.9154C9.37202 11.2153 9.67391 11.5603 10.0651 11.9504C10.4482 12.3496 10.7892 12.6595 11.0871 12.8822C11.385 13.1038 11.6337 13.2663 11.8343 13.3696C12.0329 13.4739 12.1863 13.5361 12.2926 13.5582L12.4531 13.5903C12.4702 13.5903 12.4983 13.5843 12.5364 13.5712C12.5745 13.5582 12.6016 13.5431 12.6186 13.5241L13.3458 12.7699C13.5002 12.6294 13.6777 12.5612 13.8844 12.5612C14.0278 12.5612 14.1431 12.5883 14.2284 12.6405H14.2404L16.7057 14.1249C16.8832 14.2372 16.9885 14.3806 17.0236 14.5541Z"
//                       fill="white"
//                     />
//                   </Svg>
//                   <Text
//                     style={{
//                       color: "#414042",
//                       fontSize: "10px",
//                       fontFamily: `${selectedFont} 400`,
//                     }}
//                   >
//                     {data.mobileNumber}
//                   </Text>
//                 </View>
//                 <View
//                   style={{
//                     height: 24,
//                     flexDirection: "row",
//                     alignItems: "center",
//                     gap: "8px",
//                     width: "100%",
//                   }}
//                 >
//                   <Svg
//                     width="22"
//                     height="22"
//                     viewBox="0 0 22 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <Rect width="22" height="22" fill={selectedColor} />
//                     <Path
//                       d="M17.3652 14.1791C17.3652 14.4579 17.287 14.7167 17.1606 14.9443L13.1427 10.449L17.1165 6.97178C17.2709 7.2175 17.3642 7.50533 17.3642 7.81625L17.3652 14.1791ZM11.0024 11.2655L16.5318 6.42717C16.3051 6.3028 16.0493 6.22656 15.7735 6.22656H6.23032C5.95451 6.22656 5.69875 6.3028 5.47309 6.42717L11.0024 11.2655ZM12.544 10.9726L11.2642 12.0939C11.189 12.1591 11.0957 12.1912 11.0024 12.1912C10.9091 12.1912 10.8159 12.1581 10.7406 12.0929L9.46087 10.9726L5.39285 15.525C5.63657 15.6785 5.92241 15.7698 6.23133 15.7698H15.7745C16.0834 15.7698 16.3693 15.6785 16.613 15.525L12.544 10.9726ZM4.88836 6.97279C4.7339 7.21851 4.64062 7.50634 4.64062 7.81726V14.1791C4.64062 14.4579 4.71886 14.7167 4.84523 14.9443L8.8621 10.4481L4.88836 6.97279Z"
//                       fill="white"
//                     />
//                   </Svg>

//                   <Text
//                     style={{
//                       color: "#414042",
//                       fontSize: "10px",
//                       fontFamily: `${selectedFont} 400`,
//                       flexWrap: "wrap",
//                     }}
//                   >
//                     {data.email}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//             <View style={{ flexDirection: "column" }}>
//               <View style={{ flexDirection: "column", gap: 12 }}>
//                 <Text
//                   style={{
//                     color: "#414042",
//                     fontSize: "16px",
//                     fontFamily: `${selectedFont} 400`,
//                   }}
//                 >
//                   EDUCATION
//                 </Text>
//                 <Svg width={141} height={4} viewBox="0 0 141 4">
//                   <Path
//                     d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
//                     fill="#A7A9AC"
//                   />
//                   <Path
//                     d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
//                     fill={selectedColor}
//                   />
//                 </Svg>
//                 <View style={{ flexDirection: "column", gap: 20 }}>
//                   {data?.education?.map((detail, index) => (
//                     <View
//                       wrap={false}
//                       key={index}
//                       style={{ flexDirection: "column", gap: "12px" }}
//                     >
//                       <View>
//                         <Text
//                           style={{
//                             color: "#414042",
//                             fontSize: 12,
//                             fontFamily: `${selectedFont} 700`,
//                             lineHeight: 1.2,
//                           }}
//                         >
//                           {detail.qualification}
//                         </Text>
//                         <Text
//                           style={{
//                             color: "#414042",
//                             fontSize: 12,
//                             fontFamily: `${selectedFont} 700`,
//                             lineHeight: 1.2,
//                           }}
//                         >
//                           {detail.instituteName}
//                         </Text>
//                       </View>
//                       <View style={{ flexDirection: "column", gap: 2 }}>
//                         <View
//                           style={{
//                             width: 16,
//                             height: 1,
//                             backgroundColor: "#414042",
//                           }}
//                         />

//                         <View style={{}}>
//                           <Text
//                             style={{
//                               color: "#414042",
//                               fontSize: 8.962,
//                               fontFamily: `${selectedFont} 400`,
//                               lineHeight: 1,
//                             }}
//                           >
//                             {detail.duration?.start?.year !== "Year" &&
//                               `${detail.duration?.start?.year}-${detail.duration?.end?.year}`}
//                           </Text>
//                         </View>
//                       </View>
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             </View>
//             {data?.skills?.length > 0 && (
//               <View style={{ flexDirection: "column" }}>
//                 <View style={{ flexDirection: "column", gap: 12 }}>
//                   <Text
//                     style={{
//                       color: "#414042",
//                       fontSize: "16px",
//                       fontFamily: `${selectedFont} 400`,
//                     }}
//                   >
//                     SKILLS
//                   </Text>
//                   <Svg width={141} height={4} viewBox="0 0 141 4">
//                     <Path
//                       d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
//                       fill="#A7A9AC"
//                     />
//                     <Path
//                       d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
//                       fill={selectedColor}
//                     />
//                   </Svg>
//                   <View style={{ flexDirection: "column", gap: 8 }}>
//                     {data.skills.map((detail, index) => (
//                       <View key={index} wrap={false}>
//                         <View>
//                           <Text
//                             style={{
//                               color: "#414042",
//                               fontSize: "12px",
//                               fontFamily: `${selectedFont} 400`,
//                             }}
//                           >
//                             {detail.skill}
//                           </Text>
//                         </View>
//                       </View>
//                     ))}
//                   </View>
//                 </View>
//               </View>
//             )}
//             {data?.hobbies?.length > 0 && (
//               <View style={{ flexDirection: "column" }}>
//                 <View style={{ flexDirection: "column", gap: 12 }} >
//                   <Text
//                     style={{
//                       color: "#414042",
//                       fontFamily: `${selectedFont} 400`,
//                       fontSize: "16px",
//                     }}
                  
//                   >
//                     HOBBIES
//                   </Text>
//                   <Svg width={141} height={4} viewBox="0 0 141 4">
//                     <Path
//                       d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
//                       fill="#A7A9AC"
//                     />
//                     <Path
//                       d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
//                       fill={selectedColor}
//                     />
//                   </Svg>
//                   <View
//                     style={{ flexDirection: "col", gap: "8px" }}
//                     wrap={false}
//                   >
//                     {data.hobbies.map((detail, index) => (
//                       <View key={index}>
//                         <View>
//                           <Text
//                             style={{
//                               color: "#414042",
//                               fontFamily: `${selectedFont} 400`,
//                               fontSize: "12px",
//                             }}
//                           >
//                             {detail.title}
//                           </Text>
//                         </View>
//                       </View>
//                     ))}
//                   </View>
//                 </View>
//               </View>
//             )}
//           </View>

//           <View
//             style={{
//               width: "1px",
//               height: "100%",

//               backgroundColor: "#333",
//             }}
//           />
//           <View
//             style={{
//               width: "65%",
//               flexDirection: "column",
//               alignItems: "flex-start",
//               justifyContent: "flex-start",
//               paddingTop: "24px",
//               gap: "36px",
//               paddingLeft: 24,
//             }}
//           >
//             <View
//               style={{
//                 flexDirection: "column",
//                 width: "100%",
//                 color: "#414042",
//                 gap: 12,
//               }}
//             >
//               <Text
//                 style={{
//                   color: "#414042",
//                   fontSize: "16px",
//                   fontFamily: `${selectedFont} 400`,
//                 }}
//               >
//                 ABOUT ME
//               </Text>
//               <Text
//                 wrap={true}
//                 style={{
//                   color: "#6D6E71",
//                   fontSize: "10px",
//                   lineHeight: 1.6,
//                   fontFamily: `${selectedFont} 400`,
//                 }}
//               >
//                 {data.summery}
//               </Text>
//             </View>
//             <View style={{ flexDirection: "column", gap: 12, width: "100%" }}>
//               <View style={{ flexDirection: "column", gap: 12 }}>
//                 <Text
//                   style={{
//                     color: "#414042",
//                     fontSize: "16px",
//                     fontFamily: `${selectedFont} 400`,
//                   }}
//                 >
//                   EXPERIENCE
//                 </Text>
//                 <Svg width={141} height={4} viewBox="0 0 141 4">
//                   <Path
//                     d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
//                     fill="#A7A9AC"
//                   />
//                   <Path
//                     d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
//                     fill={selectedColor}
//                   />
//                 </Svg>
//               </View>
//               {data?.experience?.map((detail, index) => (
//                 <View
//                   key={index}
//                   style={{ flexDirection: "column", gap: 4 }}
//                   wrap={false}
//                 >
//                   <View>
//                     <Text
//                       style={{
//                         color: "#414042",
//                         fontSize: 12,
//                         fontFamily: `${selectedFont} 700`,
//                         lineHeight: 1.2,
//                       }}
//                     >
//                       {detail.designation}
//                     </Text>
//                   </View>
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                       width: "100%",
//                     }}
//                   >
//                     <Text
//                       style={{
//                         color: "#414042",
//                         fontSize: 10,
//                         fontFamily: `${selectedFont} 400`,
//                         lineHeight: 1.2,
//                         width: '100%'
//                       }}
//                     >
//                       {detail.organization}
//                     </Text>
//                     <View style={{}}>
//                       <Text
//                         style={{
//                           color: "#414142",
//                           fontSize: 10,
//                           fontFamily: `${selectedFont} 400`,
//                           lineHeight: 1,
//                         }}
//                       >
//                         {detail.duration?.start?.year !== "Year" &&
//                           `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
//                             ? "Present"
//                             : detail.duration?.end?.year
//                           }
//                          `}
//                       </Text>
//                     </View>
//                   </View>

//                   <View style={{ width: "100%" }}>
//                     <Text
//                       style={{
//                         color: "#6D6E71",
//                         fontSize: "10px",
//                         lineHeight: 1.6,
//                         fontFamily: `${selectedFont} 400`,
//                       }}
//                     >
//                       {detail.description}
//                     </Text>
//                   </View>
//                 </View>
//               ))}
//             </View>

//             {data?.section?.map((item, index) => (
//               <View
//                 style={{ flexDirection: "column", gap: 12, width: "100%" }}
//                 key={index}
//               wrap={false}
//               >
//                 <View style={{ flexDirection: "column", gap: 12 }}>
//                   <Text
//                     style={{
//                       color: "#414042",
//                       fontSize: "16px",
//                       fontFamily: `${selectedFont} 400`,

//                     }}
//                   >
//                     {item?.header.toUpperCase()}
//                   </Text>
//                   <Svg width={141} height={4} viewBox="0 0 141 4">
//                     <Path
//                       d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
//                       fill="#A7A9AC"
//                     />
//                     <Path
//                       d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
//                       fill={selectedColor}
//                     />
//                   </Svg>
//                 </View>
//                 {item.subSection.map((detail, index) => (
//                   <View
//                     key={index}
//                     style={{ flexDirection: "column", gap: 4, width: "100%" }}
//                     wrap={false}
//                   >
//                     <View
//                       style={{
//                         width: "100%",
//                         flexDirection: "row",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <Text
//                         style={{
//                           color: "#414042",
//                           fontSize: 12,
//                           fontFamily: `${selectedFont} 700`,
//                           lineHeight: 1.2,
//                         }}
//                       >
//                         {detail.title}
//                       </Text>
//                       {detail.duration?.start?.year &&
//                         detail.duration?.end?.year && (
//                           <View
//                             style={{
//                               flexDirection: "row",
//                               justifyContent: "space-between",
//                             }}
//                           >
//                             {" "}
//                             <View style={{}}>
//                               <Text
//                                 style={{
//                                   color: "#414142",
//                                   fontSize: 10,
//                                   fontFamily: `${selectedFont} 400`,
//                                   lineHeight: 1,
//                                 }}
//                               >
//                                 {detail.duration?.end?.year &&
//                                   `${detail.duration?.start?.year}- ${" "}${detail.duration?.end?.year}`}
//                               </Text>
//                             </View>
//                           </View>
//                         )}
//                     </View>

//                     <View style={{ width: "100%", flexWrap:"wrap", paddingRight:"4px"}}>
//                       <Text
//                         style={{
//                           color: "#A7A9AC",
//                           fontSize: 12,
//                           fontFamily: `${selectedFont} 400`,
//                         }}
//                       >
//                         {detail.description}
//                       </Text>
//                     </View>
//                   </View>
//                 ))}
//               </View>
//             ))}
//           </View>
//         </View>
//       </View>
//     </Page>
//   );
// }

// export default Template1;

import React, { useEffect, useRef, useState } from "react";

function Template1({ data }) {
  const topContainer = useRef(null);
  const summaryContainer = useRef(null);
  const educationContainer = useRef(null);
  const contactContainer = useRef(null);
  const skillContainer = useRef(null);
  const experienceContainer = useRef(null);
  const [firstPageData, setFirstPageData] = useState([]);
  const [secondPageData, setSecondPageData] = useState([]);
  const dataSeter = () => {
    const dataForFirstPage = { education: [], skills: [], experience: [] };
    const dataForSecondPage = { education: [], skills: [], experience: [] };
    const pageHeight = 842 - 48;
    let remainingHeightLeft = pageHeight;
    let remainingHeightRight = pageHeight;
    if (topContainer.current) {
      const height = topContainer.current.clientHeight;
      remainingHeightLeft = pageHeight - height;
      remainingHeightRight = pageHeight - height;
    }
    if (summaryContainer.current) {
      const height = summaryContainer.current.clientHeight;
      remainingHeightRight = pageHeight - height;
    }
    if (contactContainer.current) {
      const height = contactContainer.current.clientHeight;
      remainingHeightLeft = remainingHeightLeft - height;
    }

    const educationDivHeight = remainingHeightLeft - 77;
    let educationDivHeightremaining = educationDivHeight;
    if (educationContainer.current) {
      [...data?.education]?.forEach((detail, index) => {
        const parentDiv = document.createElement("div");
        parentDiv.innerHTML = `
      <div>
        <p className="text-[#414042] font-lato text-[10px] font-[700] leading-normal break-all">${
          detail.qualification
        }</p>
        <p className="text-[#414042] font-lato text-[10px] font-[700] leading-normal break-all">${
          detail.instituteName
        }</p>
      </div>
      <div className="pt-[11.49px]">
        <div className="w-[16px] h-[1px] bg-[#414042]"></div>
      </div>
      <div className="pt-[1.81px]">
        <p className="text-[#414042] font-lato text-[8.962px] font-normal leading-normal">
          ${
            detail.duration?.end?.year
              ? `${detail.duration?.start?.year}-${detail.duration?.end?.year}`
              : ""
          }
        </p>
      </div>
    `;
        educationContainer.current.appendChild(parentDiv);
        const height = parentDiv.clientHeight;
        educationDivHeightremaining -= height;
        if (educationDivHeightremaining < height) {
          educationContainer.current.removeChild(parentDiv);
          dataForSecondPage.education.push(detail);
        } else {
          dataForFirstPage.education.push(detail);
        }
      });
      const educationContainerHeight =
        educationContainer.current.clientHeight + 77;
      remainingHeightLeft = remainingHeightLeft - educationContainerHeight;
    }
    const experienceDivHeight = remainingHeightRight - 77;
    let experienceDivHeightremaining = experienceDivHeight;
    if (experienceContainer.current) {
      [
        ...data?.experience,
        ...data?.experience,
        ...data?.experience,
        ...data?.experience,
      ]?.forEach((detail, index) => {
        const parentDiv = document.createElement("div");
        parentDiv.innerHTML = `
        <div className="flex flex-col">
        <p className="text-[#414042] font-lato text-[12px] font-bold">  ${
          detail.organization
        }</p>

        <div className="flex justify-between">
          <p className="text-[#414042] font-lato text-[11px] font-bold">   ${
            detail.designation
          } </p>
          <p className="text-[#414042] font-lato text-[11px] font-normal leading-normal">
            ${detail.duration?.start?.year} -
            ${
              detail.duration?.end?.year === "Year" ||
              detail.duration?.end === undefined
                ? "Present"
                : detail.duration?.end?.year
            } </p>
        </div>
        <p className="text-[#414042]  font-inter text-[11px] font-normal leading-normal">${
          detail.description
        }</p>
      </div>

    `;
        experienceContainer.current.appendChild(parentDiv);
        const height = parentDiv.clientHeight;
        experienceDivHeightremaining -= height;
        if (experienceDivHeightremaining < height) {
          experienceContainer.current.removeChild(parentDiv);
          dataForSecondPage.experience.push(detail);
        } else {
          dataForFirstPage.experience.push(detail);
        }
      });
      const educationContainerHeight =
        educationContainer.current.clientHeight + 77;
      remainingHeightRight = remainingHeightRight - educationContainerHeight;
    }
    const skillDivHeight = remainingHeightLeft - 77;
    let skillDivHeightremaining = skillDivHeight;
    if (skillContainer.current) {
      const container = skillContainer.current;
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
      [...data?.skills]?.forEach((detail, index) => {
        const parentDiv = document.createElement("div");
        parentDiv.className =
          "text-[#414042] text-[10px] font-normal font-lato pt-[8px]";
        parentDiv.innerHTML = detail.skill;
        skillContainer.current.appendChild(parentDiv);
        const height = parentDiv.clientHeight;
        skillDivHeightremaining -= height;

        if (height > skillDivHeightremaining) {
          skillContainer.current.removeChild(parentDiv);
          dataForSecondPage.skills.push(detail);
        } else {
          dataForFirstPage.skills.push(detail);
        }
      });
      const skillContainerHeight = skillContainer.current.clientHeight + 77;
      remainingHeightLeft = remainingHeightLeft - skillContainerHeight;
    }
    setFirstPageData(dataForFirstPage);
    setSecondPageData(dataForSecondPage);
  };
  useEffect(() => {
    setTimeout(() => {
      try {
        dataSeter();
      } catch (err) {
        console.log(err);
      }
    }, 200);
  }, [data]);
  return (
    <>
      <div className=" h-[842px] pt-[10px] pr-[26px] pl-[21px] w-[800px]  flex-col bg-[#fff] absolute left-[1000px] ">
        <div
          className="flex justify-between pb-[23px] border-b-[1px] border-[#414042] "
          ref={topContainer}
        >
          <div className="flex gap-2 flex-col">
            <p className="text-[#414042] font-inter text-[43px] font-normal leading-9">
              {" "}
              {data.firstName} <br /> {data.lastName}
            </p>
            <p className="text-[#414042] font-inter text-base font-normal ">
              {" "}
              {data.designation}
            </p>
          </div>
          <div className="w-[130px] h-[130px] flex-shrink-0 bg-lightgray bg-center bg-cover rounded-full overflow-hidden ">
            {data.profilePhoto ? (
              <img src={URL.createObjectURL(data.profilePhoto)} alt="" />
            ) : (
              <img src="/images/services/profile.png" alt="" />
            )}
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-col pl-[21px] w-[295px]  ">
            <div
              className="flex flex-col items-start justify-start pt-6 gap-2"
              ref={contactContainer}
            >
              <p className="text-[#414042] font-inter font-[400px] text-[22px] ">
                CONTACT
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="141"
                height="4"
                viewBox="0 0 141 4"
                fill="none"
              >
                <path
                  d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
                  fill="#A7A9AC"
                />
                <path
                  d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
                  fill="#414042"
                />
              </svg>
              <div className="flex gap-3 flex-col items-start ">
                <div className="h-[24px] flex  items-center gap-2">
                  <div className="w-[24px] h-[24px] bg-[#414042] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                    >
                      <path
                        d="M12.8366 10.411C12.8616 10.609 12.8026 10.783 12.6576 10.93L10.9646 12.644C10.8876 12.729 10.7886 12.804 10.6666 12.865C10.5426 12.925 10.4216 12.965 10.3016 12.983C10.2926 12.983 10.2676 12.985 10.2246 12.989C10.1826 12.993 10.1266 12.996 10.0596 12.996C9.89864 12.996 9.63864 12.968 9.27864 12.912C8.91764 12.856 8.47564 12.717 7.95364 12.496C7.43264 12.275 6.84064 11.944 6.17864 11.503C5.51664 11.062 4.81164 10.456 4.06564 9.68597C3.47264 9.08997 2.97864 8.51898 2.58864 7.97298C2.19964 7.42798 1.88464 6.92298 1.64764 6.45998C1.41064 5.99798 1.23164 5.57697 1.11264 5.20197C0.993641 4.82497 0.914642 4.50097 0.871642 4.22697C0.828642 3.95497 0.810642 3.73997 0.819642 3.58397C0.828642 3.42897 0.831643 3.34197 0.831643 3.32397C0.849643 3.20297 0.887643 3.07997 0.946643 2.95497C1.00664 2.82997 1.07864 2.72796 1.16364 2.64996L2.85564 0.923965C2.97464 0.802965 3.11064 0.740967 3.26464 0.740967C3.37464 0.740967 3.47164 0.772967 3.55664 0.837967C3.64064 0.901967 3.71264 0.982964 3.77264 1.07896L5.13464 3.71397C5.20964 3.85297 5.23064 4.00298 5.19764 4.16898C5.16364 4.33298 5.09164 4.47196 4.98064 4.58296L4.35864 5.21896C4.34064 5.23696 4.32664 5.26396 4.31464 5.30296C4.30164 5.34196 4.29464 5.37497 4.29464 5.40097C4.32864 5.58297 4.40564 5.78997 4.52464 6.02397C4.62564 6.23097 4.78264 6.48397 4.99464 6.78297C5.20764 7.08197 5.50864 7.42597 5.89864 7.81497C6.28064 8.21297 6.62064 8.52197 6.91764 8.74397C7.21464 8.96497 7.46264 9.12697 7.66264 9.22997C7.86064 9.33397 8.01364 9.39597 8.11964 9.41797L8.27964 9.44997C8.29664 9.44997 8.32464 9.44397 8.36264 9.43097C8.40064 9.41797 8.42764 9.40297 8.44464 9.38397L9.16964 8.63197C9.32364 8.49197 9.50064 8.42397 9.70664 8.42397C9.84964 8.42397 9.96464 8.45098 10.0496 8.50298H10.0616L12.5196 9.98297C12.6966 10.095 12.8016 10.238 12.8366 10.411Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <p className=" text-[9px] pt-[2px] flex text-[#414042] font-lato text-xs font-normal leading-normal ">
                    {data.mobileNumber}
                  </p>
                </div>
                <div className="h-[24px] flex items-center gap-2">
                  <div className="w-[24px] h-[24px] bg-[#414042] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="11"
                      viewBox="0 0 14 11"
                      fill="none"
                    >
                      <path
                        d="M13.1738 8.78595C13.1738 9.06395 13.0958 9.32195 12.9698 9.54895L8.96382 5.06693L12.9258 1.59995C13.0798 1.84495 13.1728 2.13193 13.1728 2.44193L13.1738 8.78595ZM6.82982 5.88095L12.3428 1.05695C12.1168 0.932946 11.8618 0.856934 11.5868 0.856934H2.07182C1.79682 0.856934 1.54182 0.932946 1.31682 1.05695L6.82982 5.88095ZM8.36682 5.58893L7.09082 6.70694C7.01582 6.77194 6.92282 6.80392 6.82982 6.80392C6.73682 6.80392 6.64382 6.77093 6.56882 6.70593L5.29282 5.58893L1.23682 10.1279C1.47982 10.2809 1.76482 10.3719 2.07282 10.3719H11.5878C11.8958 10.3719 12.1808 10.2809 12.4238 10.1279L8.36682 5.58893ZM0.733816 1.60095C0.579816 1.84595 0.486816 2.13293 0.486816 2.44293V8.78595C0.486816 9.06395 0.564817 9.32195 0.690817 9.54895L4.69582 5.06595L0.733816 1.60095Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <p className=" text-[9px] pt-[2px] flex text-[#414042] font-lato text-xs font-normal leading-normal break-all ">
                    {data.email}
                  </p>
                </div>
                {data.socialLinks > 0 && (
                  <div className="h-[24px] flex items-center gap-2">
                    <div className="w-[24px] h-[24px] bg-[#414042] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M15.4386 7.85687C15.1906 4.04687 12.1466 1.00288 8.33664 0.749878V0.734863H7.32464V0.749878C3.51364 1.00288 0.470638 4.04687 0.217638 7.85687H0.202637V8.86887H0.217638C0.470638 12.6799 3.51464 15.7229 7.32464 15.9709V15.9909H8.33664V15.9709C12.1466 15.7229 15.1906 12.6789 15.4386 8.86887H15.4586V7.85687H15.4386ZM4.97964 2.39886C4.48764 3.04886 4.07564 3.86888 3.78164 4.80188H2.25764C2.91864 3.76888 3.86164 2.92986 4.97964 2.39886ZM1.72564 5.81989H3.51264C3.37364 6.46089 3.29064 7.14587 3.25964 7.85687H1.23764C1.29364 7.13587 1.46264 6.45589 1.72564 5.81989ZM1.23864 8.86887H3.26064C3.29164 9.57987 3.37464 10.2649 3.51364 10.9059H1.72664C1.46264 10.2699 1.29364 9.58987 1.23864 8.86887ZM2.25764 11.9239H3.77664C4.07564 12.8569 4.48264 13.6769 4.97964 14.3269C3.86164 13.7959 2.91864 12.9569 2.25764 11.9239ZM7.32364 14.9079C6.27464 14.6309 5.37564 13.5079 4.83064 11.9239H7.32364V14.9079ZM7.32364 10.9059H4.54164C4.39764 10.2699 4.30764 9.58987 4.27864 8.86887H7.32364V10.9059ZM7.32364 7.85687H4.27864C4.30764 7.13587 4.39864 6.45589 4.54164 5.81989H7.32364V7.85687ZM7.32364 4.80188H4.83064C5.37564 3.21788 6.27464 2.09487 7.32364 1.81787V4.80188ZM13.4026 4.80188H11.8836C11.5846 3.86888 11.1776 3.04886 10.6806 2.39886C11.7976 2.92986 12.7416 3.76888 13.4026 4.80188ZM8.33564 1.81787C9.38464 2.09487 10.2836 3.21788 10.8286 4.80188H8.33564V1.81787ZM8.33564 5.81989H11.1176C11.2616 6.45589 11.3466 7.13587 11.3806 7.85687H8.33564V5.81989ZM8.33564 8.86887H11.3806C11.3516 9.58987 11.2616 10.2699 11.1176 10.9059H8.33564V8.86887ZM8.33564 14.9079V11.9239H10.8286C10.2836 13.5079 9.38464 14.6309 8.33564 14.9079ZM10.6806 14.3269C11.1726 13.6719 11.5846 12.8569 11.8836 11.9239H13.4026C12.7416 12.9569 11.7976 13.7959 10.6806 14.3269ZM13.9336 10.9059H12.1456C12.2846 10.2649 12.3686 9.57987 12.3986 8.86887H14.4196C14.3666 9.58987 14.1976 10.2699 13.9336 10.9059ZM12.3996 7.85687C12.3686 7.14587 12.2846 6.46089 12.1466 5.81989H13.9346C14.1976 6.45589 14.3666 7.13587 14.4216 7.85687H12.3996Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <p className=" text-[9px] pt-[2px] flex text-[#414042] font-lato text-xs font-normal leading-normal ">
                      {data.link}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start pt-[24px] gap-[16px]">
              <div>
                {" "}
                <p className="text-[#414042] font-inter font-[400px] text-[22px] ">
                  Education
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="141"
                  height="4"
                  viewBox="0 0 141 4"
                  fill="none"
                >
                  <path
                    d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
                    fill="#A7A9AC"
                  />
                  <path
                    d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
                    fill="#414042"
                  />
                </svg>
              </div>
              <div
                className="flex flex-col gap-[16px]"
                ref={educationContainer}
              ></div>
            </div>
            <div className="flex flex-col items-start justify-start pt-6 gap-2">
              <p className="text-[#414042] font-inter font-[400px] text-[22px] ">
                Skills
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="141"
                height="4"
                viewBox="0 0 141 4"
                fill="none"
              >
                <path
                  d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
                  fill="#A7A9AC"
                />
                <path
                  d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
                  fill="#414042"
                />
              </svg>

              <div className="flex flex-col " ref={skillContainer}></div>
            </div>
          </div>
          <div className="w-[1px] bg-[#414042]"></div>
          <div className="pl-[28px] pt-[20.78px] flex flex-col gap-8 w-[505px] ">
            <div className="flex flex-col gap-[5.64px] " ref={summaryContainer}>
              <p className="text-[#414042] text-[22px] font-normal">About Me</p>

              <p className="text-[#646464]  text-[10px] font-normal text-justify ">
                {data.summery}
              </p>
            </div>
            <div className="flex flex-col gap-[5.64px] ">
              <p className="text-[#414042] text-[22px] font-normal">
                Experience
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="292"
                height="2"
                viewBox="0 0 292 2"
                fill="none"
              >
                <path
                  d="M291.902 0.540039H0.458984V1.54004H291.902V0.540039Z"
                  fill="#A7A9AC"
                />
              </svg>

              <div className="flex flex-col gap-2" ref={experienceContainer}>
                {/* {data.experience.map((detail, index) => (
                  <div className="flex flex-col">
                    <p className="text-[#414042] font-lato text-[12px] font-bold">  {detail.organization}</p>

                    <div className="flex justify-between">
                      <p className="text-[#414042] font-lato text-[11px] font-bold">   {detail.designation} </p>
                      <p className="text-[#414042] font-lato text-[11px] font-normal leading-normal">
                        {detail.duration?.start?.year} -
                        {detail.duration?.end?.year === "Year" || detail.duration?.end === undefined ? "Present" : detail.duration?.end?.year} </p>
                    </div>
                    <p className="text-[#414042]  font-inter text-[11px] font-normal leading-normal">{detail.description}</p>
                  </div>


                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[24px]">
        <div className=" h-[842px] p-[24px] w-[800px] flex flex-col bg-[#fff]">
          <div className="flex justify-between pb-[23px] border-b-[1px] border-[#414042] ">
            <div className="flex gap-2 flex-col">
              <p className="text-[#414042] font-inter text-[43px] font-normal leading-9">
                {" "}
                {data.firstName} <br /> {data.lastName}
              </p>
              <p className="text-[#414042] font-inter text-base font-normal ">
                {" "}
                {data.designation}
              </p>
            </div>
            <div className="w-[130px] h-[130px] flex-shrink-0 bg-lightgray bg-center bg-cover rounded-full overflow-hidden ">
              {data.profilePhoto ? (
                <img src={URL.createObjectURL(data.profilePhoto)} alt="" />
              ) : (
                <img src="/images/services/profile.png" alt="" />
              )}
            </div>
          </div>

          <div className="flex h-full">
            <div className="flex flex-col w-[297px]  ">
              <div className="flex flex-col items-start justify-start pt-6 gap-2">
                <p className="text-[#414042] font-inter font-[400px] text-[22px] ">
                  CONTACT
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="141"
                  height="4"
                  viewBox="0 0 141 4"
                  fill="none"
                >
                  <path
                    d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
                    fill="#A7A9AC"
                  />
                  <path
                    d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
                    fill="#414042"
                  />
                </svg>
                <div className="flex gap-3 flex-col items-start ">
                  <div className="h-[24px] flex  items-center gap-2">
                    <div className="w-[24px] h-[24px] bg-[#414042] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          d="M12.8366 10.411C12.8616 10.609 12.8026 10.783 12.6576 10.93L10.9646 12.644C10.8876 12.729 10.7886 12.804 10.6666 12.865C10.5426 12.925 10.4216 12.965 10.3016 12.983C10.2926 12.983 10.2676 12.985 10.2246 12.989C10.1826 12.993 10.1266 12.996 10.0596 12.996C9.89864 12.996 9.63864 12.968 9.27864 12.912C8.91764 12.856 8.47564 12.717 7.95364 12.496C7.43264 12.275 6.84064 11.944 6.17864 11.503C5.51664 11.062 4.81164 10.456 4.06564 9.68597C3.47264 9.08997 2.97864 8.51898 2.58864 7.97298C2.19964 7.42798 1.88464 6.92298 1.64764 6.45998C1.41064 5.99798 1.23164 5.57697 1.11264 5.20197C0.993641 4.82497 0.914642 4.50097 0.871642 4.22697C0.828642 3.95497 0.810642 3.73997 0.819642 3.58397C0.828642 3.42897 0.831643 3.34197 0.831643 3.32397C0.849643 3.20297 0.887643 3.07997 0.946643 2.95497C1.00664 2.82997 1.07864 2.72796 1.16364 2.64996L2.85564 0.923965C2.97464 0.802965 3.11064 0.740967 3.26464 0.740967C3.37464 0.740967 3.47164 0.772967 3.55664 0.837967C3.64064 0.901967 3.71264 0.982964 3.77264 1.07896L5.13464 3.71397C5.20964 3.85297 5.23064 4.00298 5.19764 4.16898C5.16364 4.33298 5.09164 4.47196 4.98064 4.58296L4.35864 5.21896C4.34064 5.23696 4.32664 5.26396 4.31464 5.30296C4.30164 5.34196 4.29464 5.37497 4.29464 5.40097C4.32864 5.58297 4.40564 5.78997 4.52464 6.02397C4.62564 6.23097 4.78264 6.48397 4.99464 6.78297C5.20764 7.08197 5.50864 7.42597 5.89864 7.81497C6.28064 8.21297 6.62064 8.52197 6.91764 8.74397C7.21464 8.96497 7.46264 9.12697 7.66264 9.22997C7.86064 9.33397 8.01364 9.39597 8.11964 9.41797L8.27964 9.44997C8.29664 9.44997 8.32464 9.44397 8.36264 9.43097C8.40064 9.41797 8.42764 9.40297 8.44464 9.38397L9.16964 8.63197C9.32364 8.49197 9.50064 8.42397 9.70664 8.42397C9.84964 8.42397 9.96464 8.45098 10.0496 8.50298H10.0616L12.5196 9.98297C12.6966 10.095 12.8016 10.238 12.8366 10.411Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <p className=" text-[9px] pt-[2px] flex text-[#414042] font-lato text-xs font-normal leading-normal ">
                      {data.mobileNumber}
                    </p>
                  </div>
                  <div className="h-[24px] flex items-center gap-2">
                    <div className="w-[24px] h-[24px] bg-[#414042] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="11"
                        viewBox="0 0 14 11"
                        fill="none"
                      >
                        <path
                          d="M13.1738 8.78595C13.1738 9.06395 13.0958 9.32195 12.9698 9.54895L8.96382 5.06693L12.9258 1.59995C13.0798 1.84495 13.1728 2.13193 13.1728 2.44193L13.1738 8.78595ZM6.82982 5.88095L12.3428 1.05695C12.1168 0.932946 11.8618 0.856934 11.5868 0.856934H2.07182C1.79682 0.856934 1.54182 0.932946 1.31682 1.05695L6.82982 5.88095ZM8.36682 5.58893L7.09082 6.70694C7.01582 6.77194 6.92282 6.80392 6.82982 6.80392C6.73682 6.80392 6.64382 6.77093 6.56882 6.70593L5.29282 5.58893L1.23682 10.1279C1.47982 10.2809 1.76482 10.3719 2.07282 10.3719H11.5878C11.8958 10.3719 12.1808 10.2809 12.4238 10.1279L8.36682 5.58893ZM0.733816 1.60095C0.579816 1.84595 0.486816 2.13293 0.486816 2.44293V8.78595C0.486816 9.06395 0.564817 9.32195 0.690817 9.54895L4.69582 5.06595L0.733816 1.60095Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <p className=" text-[9px] pt-[2px] flex text-[#414042] font-lato text-xs font-normal leading-normal break-all ">
                      {data.email}
                    </p>
                  </div>
                  {data.socialLinks > 0 && (
                    <div className="h-[24px] flex items-center gap-2">
                      <div className="w-[24px] h-[24px] bg-[#414042] flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M15.4386 7.85687C15.1906 4.04687 12.1466 1.00288 8.33664 0.749878V0.734863H7.32464V0.749878C3.51364 1.00288 0.470638 4.04687 0.217638 7.85687H0.202637V8.86887H0.217638C0.470638 12.6799 3.51464 15.7229 7.32464 15.9709V15.9909H8.33664V15.9709C12.1466 15.7229 15.1906 12.6789 15.4386 8.86887H15.4586V7.85687H15.4386ZM4.97964 2.39886C4.48764 3.04886 4.07564 3.86888 3.78164 4.80188H2.25764C2.91864 3.76888 3.86164 2.92986 4.97964 2.39886ZM1.72564 5.81989H3.51264C3.37364 6.46089 3.29064 7.14587 3.25964 7.85687H1.23764C1.29364 7.13587 1.46264 6.45589 1.72564 5.81989ZM1.23864 8.86887H3.26064C3.29164 9.57987 3.37464 10.2649 3.51364 10.9059H1.72664C1.46264 10.2699 1.29364 9.58987 1.23864 8.86887ZM2.25764 11.9239H3.77664C4.07564 12.8569 4.48264 13.6769 4.97964 14.3269C3.86164 13.7959 2.91864 12.9569 2.25764 11.9239ZM7.32364 14.9079C6.27464 14.6309 5.37564 13.5079 4.83064 11.9239H7.32364V14.9079ZM7.32364 10.9059H4.54164C4.39764 10.2699 4.30764 9.58987 4.27864 8.86887H7.32364V10.9059ZM7.32364 7.85687H4.27864C4.30764 7.13587 4.39864 6.45589 4.54164 5.81989H7.32364V7.85687ZM7.32364 4.80188H4.83064C5.37564 3.21788 6.27464 2.09487 7.32364 1.81787V4.80188ZM13.4026 4.80188H11.8836C11.5846 3.86888 11.1776 3.04886 10.6806 2.39886C11.7976 2.92986 12.7416 3.76888 13.4026 4.80188ZM8.33564 1.81787C9.38464 2.09487 10.2836 3.21788 10.8286 4.80188H8.33564V1.81787ZM8.33564 5.81989H11.1176C11.2616 6.45589 11.3466 7.13587 11.3806 7.85687H8.33564V5.81989ZM8.33564 8.86887H11.3806C11.3516 9.58987 11.2616 10.2699 11.1176 10.9059H8.33564V8.86887ZM8.33564 14.9079V11.9239H10.8286C10.2836 13.5079 9.38464 14.6309 8.33564 14.9079ZM10.6806 14.3269C11.1726 13.6719 11.5846 12.8569 11.8836 11.9239H13.4026C12.7416 12.9569 11.7976 13.7959 10.6806 14.3269ZM13.9336 10.9059H12.1456C12.2846 10.2649 12.3686 9.57987 12.3986 8.86887H14.4196C14.3666 9.58987 14.1976 10.2699 13.9336 10.9059ZM12.3996 7.85687C12.3686 7.14587 12.2846 6.46089 12.1466 5.81989H13.9346C14.1976 6.45589 14.3666 7.13587 14.4216 7.85687H12.3996Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <p className=" text-[9px] pt-[2px] flex text-[#414042] font-lato text-xs font-normal leading-normal ">
                        {data.link}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {firstPageData?.education?.length > 0 && (
                <div className="flex flex-col items-start justify-start pt-[24px] gap-[16px]">
                  <div>
                    {" "}
                    <p className="text-[#414042] font-inter font-[400px] text-[22px] ">
                      Education
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="141"
                      height="4"
                      viewBox="0 0 141 4"
                      fill="none"
                    >
                      <path
                        d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
                        fill="#A7A9AC"
                      />
                      <path
                        d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
                        fill="#414042"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[16px]">
                    {firstPageData?.education?.map((detail, index) => (
                      <div key={index}>
                        <div className="">
                          <p className="text-[#414042]  font-lato text-[10px] font-[700] leading-normal break-all">
                            {detail.qualification}
                          </p>
                          <p className="text-[#414042]  font-lato text-[10px] font-[700] leading-normal  break-all">
                            {detail.instituteName}
                          </p>
                        </div>
                        <div className="pt-[11.49px]">
                          <div className="w-[16px] h-[1px]  bg-[#414042]"></div>
                        </div>
                        <div className="pt-[1.81px]">
                          <p className="text-[#414042]  font-lato text-[8.962px] font-normal leading-normal">
                            {detail.duration?.end?.year && (
                              <>
                                {detail.duration?.start?.year}-
                                {detail.duration?.end?.year}
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {firstPageData?.skills?.length > 0 && (
                <div className="flex flex-col items-start justify-start pt-6 gap-2">
                  <p className="text-[#414042] font-inter font-[400px] text-[22px] ">
                    Skills
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="141"
                    height="4"
                    viewBox="0 0 141 4"
                    fill="none"
                  >
                    <path
                      d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
                      fill="#A7A9AC"
                    />
                    <path
                      d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
                      fill="#414042"
                    />
                  </svg>

                  <div className="flex flex-col  gap-[8px] ">
                    {firstPageData.skills.map((detail, index) => (
                      <p  key={index} className="text-[#414042] text-[10px] font-normal font-lato">
                        {detail.skill}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="w-[1px] bg-[#414042] h-full"></div>
            <div className="pl-[28px] pt-[20.78px] flex flex-col gap-8 w-[505px] ">
              <div className="flex flex-col gap-[5.64px] ">
                <p className="text-[#414042] text-[22px] font-normal">
                  About Me
                </p>

                <p className="text-[#646464]  text-[10px] font-normal text-justify ">
                  {data.summery}
                </p>
              </div>
              <div className="flex flex-col gap-[5.64px] ">
                <p className="text-[#414042] text-[22px] font-normal">
                  Experience
                </p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="292"
                  height="2"
                  viewBox="0 0 292 2"
                  fill="none"
                >
                  <path
                    d="M291.902 0.540039H0.458984V1.54004H291.902V0.540039Z"
                    fill="#A7A9AC"
                  />
                </svg>
                <div className="flex flex-col gap-6 mt-4">
                  {firstPageData?.experience?.map((detail, index) => (
                    <div  key={index} className="flex flex-col gap-1">
                      <p className="text-[#414042] font-lato text-[12px] font-bold">
                        {" "}
                        {detail.organization}
                      </p>

                      <div className="flex justify-between">
                        <p className="text-[#414042] font-lato text-[11px] font-bold">
                          {" "}
                          {detail.designation}{" "}
                        </p>
                        <p className="text-[#414042] font-lato text-[11px] font-normal leading-normal">
                          {detail.duration?.start?.year} -
                          {detail.duration?.end?.year === "Year" ||
                          detail.duration?.end === undefined
                            ? "Present"
                            : detail.duration?.end?.year}{" "}
                        </p>
                      </div>
                      <p className="text-[#414042]  font-inter text-[11px] font-normal leading-normal">
                        {detail.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" h-[842px] p-[24px] w-[800px] flex flex-col bg-[#fff] overflow-hidden">
          <div className="flex h-full">
            <div className="flex flex-col w-[276px]   ">
              {secondPageData?.education?.length > 0 && (
                <div className="flex flex-col items-start justify-start  gap-[16px]">
                  <div>
                    {" "}
                    <p className="text-[#414042] font-inter font-[400px] text-[22px] ">
                      Education
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="141"
                      height="4"
                      viewBox="0 0 141 4"
                      fill="none"
                    >
                      <path
                        d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
                        fill="#A7A9AC"
                      />
                      <path
                        d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
                        fill="#414042"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[16px]">
                    {secondPageData?.education?.map((detail, index) => (
                      <div  key={index}>
                        <div className="">
                          <p className="text-[#414042]  font-lato text-[10px] font-[700] leading-normal break-all">
                            {detail.qualification}
                          </p>
                          <p className="text-[#414042]  font-lato text-[10px] font-[700] leading-normal  break-all">
                            {detail.instituteName}
                          </p>
                        </div>
                        <div className="pt-[11.49px]">
                          <div className="w-[16px] h-[1px]  bg-[#414042]"></div>
                        </div>
                        <div className="pt-[1.81px]">
                          <p className="text-[#414042]  font-lato text-[8.962px] font-normal leading-normal">
                            {detail.duration?.end?.year && (
                              <>
                                {detail.duration?.start?.year}-
                                {detail.duration?.end?.year}
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {secondPageData?.skills?.length > 0 && (
                <div
                  className={`flex flex-col items-start justify-start ${
                    secondPageData?.education?.length > 0 && "pt-6"
                  } gap-2`}
                >
                  <p className="text-[#414042] font-inter font-[400px] text-[22px] ">
                    Skills
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="141"
                    height="4"
                    viewBox="0 0 141 4"
                    fill="none"
                  >
                    <path
                      d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
                      fill="#A7A9AC"
                    />
                    <path
                      d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
                      fill="#414042"
                    />
                  </svg>

                  <div className="flex flex-col  gap-[8px] ">
                    {secondPageData.skills.map((detail, index) => (
                      <p  key={index} className="text-[#414042] text-[10px] font-normal font-lato">
                        {detail.skill}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="w-[1px] bg-[#414042] h-full"></div>

            <div className="pl-[28px]  flex flex-col gap-8 w-[470px] ">
              {secondPageData?.experience?.length > 0 && (
              <div className="flex flex-col gap-[5.64px] ">
              <p className="text-[#414042] text-[22px] font-normal">
                Experience
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="292"
                height="2"
                viewBox="0 0 292 2"
                fill="none"
              >
                <path
                  d="M291.902 0.540039H0.458984V1.54004H291.902V0.540039Z"
                  fill="#A7A9AC"
                />
              </svg>
              <div className="flex flex-col gap-6 mt-4">
                {firstPageData?.experience?.map((detail, index) => (
                  <div  key={index} className="flex flex-col gap-1">
                    <p className="text-[#414042] font-lato text-[12px] font-bold">
                      {" "}
                      {detail.organization}
                    </p>

                    <div className="flex justify-between">
                      <p className="text-[#414042] font-lato text-[11px] font-bold">
                        {" "}
                        {detail.designation}{" "}
                      </p>
                      <p className="text-[#414042] font-lato text-[11px] font-normal leading-normal">
                        {detail.duration?.start?.year} -
                        {detail.duration?.end?.year === "Year" ||
                        detail.duration?.end === undefined
                          ? "Present"
                          : detail.duration?.end?.year}{" "}
                      </p>
                    </div>
                    <p className="text-[#414042]  font-inter text-[11px] font-normal leading-normal">
                      {detail.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Template1;

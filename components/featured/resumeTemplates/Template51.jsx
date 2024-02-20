import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Svg,
  Path,
  Rect,
  Font,
  Defs,
  ClipPath,
  data,
} from "@react-pdf/renderer";
import React from "react";

const Template51 = () => {
  return (
    <Page size="A4" style={{ padding: 32 }}>
      <View
        style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16, }}
      >
        <View
          style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", }}
        >
          <View
            style={{ display: "flex", flexDirection: "row", gap: 71, width: "100%", }}
          >
            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Text
                  style={{ fontSize: 29, fontWeight: 400, color: "#595A5C" }}
                >
                  Naledi
                </Text>
                <Text
                  style={{ fontSize: 29, fontWeight: 400, color: "#595A5C" }}
                >
                  Khumalo
                </Text>
              </View>
              <View>
                <Text
                  style={{ fontSize: 14, fontWeight: 400, color: "#595A5C" }}
                >
                  Marketing Analyst
                </Text>
              </View>
            </View>
            <View
              style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6, }}>
              <Text
                style={{ fontSize: 14, fontWeight: 400, color: "#414042", width: "100%", }} >
                PROFILE
              </Text>
              <Text style={{ fontSize: 10, fontWeight: 400, color: "#414042" }}>
                MyNameIsLauraAndersonloremempusidfringillamolestieornarediaminolestirosnollicitudinest,.molestium
                lorem olestie pretium apaza all the molestium lorem olestie
                pretium apaza all therosen. ringilla lorem ipsum .
              </Text>
            </View>
          </View>
        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={{ width: 228, height: 2, backgroundColor: "#595A5C" }}
          ></View>
          <View
            style={{ width: 290, height: 2, backgroundColor: "#F1D61B" }}
          ></View>
        </View>

        <View style={{ display: "flex", flexDirection: "row", gap: 44 }}>
          <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <View>
              <Text style={{ fontSize: 14, fontWeight: 500, color: "#595A5C" }}>
                CONTACT
              </Text>
            </View>

            <View style={{ flexDirection: "column", gap: 16 }}>
              <View style={{ display: "flex", flexDirection: "row", gap: 14 }}>
                <Svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M10.9461 14.9988C9.71471 14.9286 8.54523 14.4044 7.43768 13.7409C4.56609 12.0197 2.41292 9.67206 1.31569 6.46488C0.546701 4.22047 1.20937 3.44242 3.0116 2.01838C3.53389 1.60561 4.13153 1.74388 4.61048 2.18554C5.16786 2.69943 5.7108 3.2319 6.23413 3.78088C6.98041 4.5641 6.97112 5.1946 6.23929 5.9964C5.33818 6.98291 5.33095 6.98807 6.14949 8.03133C6.81939 8.88679 7.60489 9.61943 8.50394 10.2386C8.93849 10.5368 9.23989 10.5224 9.63523 10.1375C10.9606 8.84654 11.3342 8.87337 12.6544 10.2128C12.7979 10.3583 12.9424 10.5028 13.0828 10.6514C13.6526 11.254 14.4597 11.7637 14.0768 12.7895C13.6722 13.8647 12.0547 15.0163 10.9461 14.9988ZM10.9038 14.1949C11.7089 14.1877 12.9971 13.293 13.2603 12.612C13.5648 11.8226 12.768 11.5956 12.4315 11.1343C12.3633 11.0414 12.2684 10.9682 12.1858 10.8846C11.0937 9.76804 11.0617 9.74223 10.0068 10.8815C9.48866 11.4418 9.03242 11.4944 8.40381 11.1116C7.23846 10.4006 6.25581 9.49871 5.4383 8.41623C4.33385 6.95401 4.33901 6.88488 5.58281 5.53204C5.91311 5.17293 6.13091 4.81898 5.72216 4.39487C5.21534 3.86859 4.68892 3.36192 4.17385 2.8439C3.8322 2.50027 3.5215 2.57973 3.17572 2.86041C1.7616 4.00687 1.52833 4.80969 2.17964 6.54021C3.02502 8.79081 4.48145 10.5956 6.36006 12.0578C7.75559 13.1403 9.26364 14.0205 10.9038 14.1949Z"
                    fill="#929497"
                  />
                  <Path
                    d="M9.1243 1.02668C11.6449 1.28362 14.5981 4.22767 14.9738 6.94263C15.012 7.22228 15.0553 7.49677 14.7054 7.56487C14.3607 7.63195 14.2492 7.34715 14.1945 7.0902C13.9725 6.04694 13.5483 5.10067 12.8825 4.26688C11.8638 2.99144 10.5539 2.18035 8.95915 1.82434C8.67117 1.76036 8.35325 1.66131 8.44615 1.26505C8.51221 0.979211 8.76716 0.971985 9.1243 1.02668Z"
                    fill="#929497"
                  />
                  <Path
                    d="M8.90635 3.57273C10.3896 3.69449 12.2507 5.53233 12.4344 7.04821C12.4674 7.32063 12.5036 7.60956 12.1578 7.67663C11.8853 7.72926 11.748 7.52805 11.6799 7.27523C11.2577 5.70259 10.2575 4.71505 8.67617 4.31673C8.41915 4.25172 8.254 4.10932 8.32522 3.81935C8.37786 3.61194 8.55643 3.54383 8.90635 3.57273Z"
                    fill="#929497"
                  />
                </Svg>

                <Text
                  style={{ fontSize: 12, fontWeight: 400, color: "#929497" }}
                >
                  +27 01234 56789
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 14 }}>
                <Svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M7.99956 13.4924C6.37022 13.4934 4.73985 13.5114 3.11051 13.4881C1.59329 13.4659 1.008 12.8374 1.00491 11.2837C0.99977 9.06451 0.996684 6.84634 1.00594 4.62711C1.01211 3.18472 1.62312 2.51916 3.02102 2.51174C6.33833 2.49373 9.65668 2.4969 12.974 2.5181C14.3883 2.52658 14.9901 3.17624 14.9942 4.62393C15.0014 6.87283 15.0024 9.12174 14.9942 11.3706C14.9891 12.8077 14.3729 13.4669 12.976 13.4871C11.3169 13.5093 9.65873 13.4913 7.99956 13.4924ZM7.90801 12.6795C9.59599 12.6795 11.284 12.689 12.9719 12.6753C13.874 12.6678 14.2073 12.3594 14.2176 11.4427C14.2413 9.13446 14.233 6.82514 14.2227 4.51689C14.2186 3.71992 13.8216 3.31614 13.0213 3.31826C9.67519 3.32779 6.32805 3.3278 2.98193 3.31932C2.18578 3.3172 1.77844 3.71251 1.77535 4.51372C1.7661 6.82197 1.77227 9.13021 1.77947 11.4395C1.78256 12.2799 2.17035 12.6965 3.02102 12.6837C4.6483 12.6604 6.27867 12.6774 7.90801 12.6795Z"
                    fill="#929497"
                  />
                  <Path
                    d="M7.99899 9.2797C7.91773 9.2797 7.83647 9.25002 7.77063 9.19173L2.67585 4.65577C2.52979 4.52542 2.51333 4.29756 2.63985 4.14707C2.76637 3.99658 2.98753 3.97962 3.13359 4.10998L7.99796 8.44033L12.7903 4.11103C12.9354 3.97961 13.1565 3.99446 13.2841 4.14495C13.4116 4.29439 13.3972 4.52224 13.2511 4.65365L8.2294 9.18961C8.16357 9.25002 8.08128 9.2797 7.99899 9.2797Z"
                    fill="#929497"
                  />
                  <Path
                    d="M3.02717 11.9219C2.93254 11.9219 2.83791 11.8827 2.76899 11.8043C2.63938 11.6569 2.64864 11.4291 2.79162 11.2945L6.65513 7.66042C6.79811 7.52689 7.01926 7.53643 7.1499 7.68374C7.27951 7.83106 7.27025 8.05892 7.12727 8.19351L3.26376 11.8276C3.19587 11.8912 3.11152 11.9219 3.02717 11.9219Z"
                    fill="#929497"
                  />
                  <Path
                    d="M12.9991 11.9215C12.9148 11.9215 12.8304 11.8908 12.7636 11.8272L8.89904 8.19314C8.75606 8.05854 8.7468 7.83068 8.87641 7.68337C9.00602 7.53712 9.2282 7.52652 9.37015 7.66005L13.2347 11.2941C13.3777 11.4287 13.3869 11.6566 13.2573 11.8039C13.1884 11.8823 13.0938 11.9215 12.9991 11.9215Z"
                    fill="#929497"
                  />
                </Svg>

                <Text
                  style={{ fontSize: 12, fontWeight: 400, color: "#929497" }}
                >
                  nkhumalo@email.com
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 14 }}>
                <Svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M8 1C7.98734 1 7.97467 1.00106 7.96201 1.00106C7.95568 1.00106 7.94829 1 7.94196 1C7.91874 1 7.89658 1.0021 7.87442 1.00316C4.07206 1.0707 1 4.18287 1 8C1 11.8182 4.07206 14.9293 7.87442 14.9968C7.89658 14.9979 7.9198 15 7.94196 15C7.94934 15 7.95568 14.999 7.96201 14.999C7.97467 14.999 7.98734 15 8 15C11.8604 15 15 11.8593 15 7.99894C15 4.1396 11.8593 1 8 1ZM5.03136 8C5.03136 7.34147 5.08201 6.70405 5.17383 6.10251H7.64224V9.90277H5.17489C5.08202 9.30018 5.03136 8.65958 5.03136 8ZM10.5771 5.3849H8.35881V1.78622C9.33183 2.10281 10.1655 3.50641 10.5771 5.3849ZM7.64119 1.75246V5.38383H5.30574C5.73421 3.43042 6.61752 1.99202 7.64119 1.75246ZM7.64119 10.6204V14.2476C6.61857 14.0091 5.73527 12.5717 5.3068 10.6204H7.64119ZM8.35881 14.2138V10.6204H10.5761C10.1634 12.4968 9.33077 13.8972 8.35881 14.2138ZM8.35881 9.90277V6.10251H10.7101C10.8019 6.70405 10.8515 7.34253 10.8515 8C10.8515 8.65958 10.8008 9.29912 10.709 9.90277H8.35881ZM11.4393 6.10251H13.989C14.179 6.70194 14.2824 7.33936 14.2824 8C14.2824 8.66275 14.1779 9.30229 13.9869 9.90277H11.4383C11.5237 9.30018 11.5702 8.66275 11.5702 8C11.5702 7.33936 11.5237 6.70405 11.4393 6.10251ZM13.7093 5.3849H11.3158C11.0246 3.95387 10.5011 2.76661 9.82783 1.98989C11.5533 2.51544 12.9653 3.76602 13.7093 5.3849ZM6.01176 2.04161C5.35957 2.81833 4.8509 3.98446 4.56701 5.38383H2.28961C3.01146 3.81561 4.35911 2.5946 6.01176 2.04161ZM2.01101 6.10251H4.4446C4.36017 6.70405 4.31373 7.33936 4.31373 8C4.31373 8.66275 4.36017 9.29912 4.44565 9.90277H2.01312C1.8221 9.30229 1.71762 8.66275 1.71762 8C1.71762 7.33831 1.82105 6.70088 2.01101 6.10251ZM2.29172 10.6204H4.56807C4.85301 12.0187 5.36062 13.1827 6.01176 13.9584C4.36123 13.4065 3.01357 12.1865 2.29172 10.6204ZM9.82783 14.0112C10.5001 13.2355 11.0246 12.0504 11.3158 10.6204H13.7083C12.9622 12.2372 11.5512 13.4856 9.82783 14.0112Z"
                    fill="#929497"
                  />
                </Svg>

                <Text
                  style={{ fontSize: 12, fontWeight: 400, color: "#929497" }}
                >
                  naledikhumalo.com
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 14 }}>
                <Svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M13.4997 6.6289C13.4967 8.42043 12.6673 9.89024 11.7149 11.2929C10.83 12.5962 9.73126 13.705 8.54774 14.7311C8.17947 15.0497 7.88182 15.1097 7.50043 14.7777C5.58542 13.1123 3.92769 11.2422 2.93285 8.83521C2.06212 6.72716 2.52926 4.2881 4.11636 2.66827C5.69035 1.06189 8.07151 0.557117 10.0521 1.41047C12.1074 2.29486 13.5219 4.43603 13.4997 6.6289ZM12.6805 6.03721C12.6088 4.59426 11.725 3.0696 9.90883 2.25245C8.07151 1.42598 6.31389 1.69285 4.82466 3.0996C3.36973 4.47325 2.92175 6.2017 3.54428 8.1308C4.30303 10.483 5.87499 12.2507 7.64976 13.8561C7.98878 14.1622 8.19864 13.9812 8.44987 13.7557C9.39628 12.9044 10.2892 11.9962 11.0005 10.9298C11.8723 9.62339 12.7339 8.30145 12.6805 6.03721Z"
                    fill="#929497"
                  />
                  <Path
                    d="M11.4681 6.67041C11.4843 8.66261 9.95569 10.2525 8.01041 10.2669C6.11355 10.2804 4.55874 8.72262 4.53352 6.78317C4.50829 4.77442 6.01266 3.16699 7.94382 3.13906C9.877 3.1101 11.452 4.68959 11.4681 6.67041ZM7.97308 9.44978C9.49258 9.45702 10.7084 8.24164 10.7134 6.7087C10.7185 5.21403 9.53294 3.98106 8.0659 3.95727C6.54236 3.93141 5.3084 5.12816 5.28217 6.65696C5.25493 8.18784 6.46468 9.44254 7.97308 9.44978Z"
                    fill="#929497"
                  />
                </Svg>

                <Text
                  style={{ fontSize: 12, fontWeight: 400, color: "#929497" }}
                >
                  Street 1234, City, SA
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              display: "flex", flexDirection: "column", gap: 16, width: "100%",
            }}
          >
            <View>

              <Text style={{ fontSize: 14, fontWeight: 400, color: "#595A5C" }}>
                EDUCATION
              </Text>
            </View>

            <View
              style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", }}
            >
              <View
                style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%", }}
              >
                <View
                  style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", }}
                >
                  <Text
                    style={{ fontSize: 12, fontWeight: 400, color: "#595A5C" }}
                  >
                    University of Arts London
                  </Text>
                  <Text
                    style={{ fontSize: 12, fontWeight: 400, color: "#595A5C" }}
                  >
                    2012 - 2014
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 10, fontWeight: 400, color: "#929497" }}
                >
                  Bachelor of Graphic Design
                </Text>
                <Text
                  style={{ fontSize: 10, fontWeight: 400, color: "#929497" }}
                >
                  .molestium lorem olestie pretium apaza all the molestium lorem
                  olestie pretium apaza all therosen. ringilla lorem ipsum .
                </Text>
              </View>

              <View
                style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%", }}
              >
                <View
                  style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", }}
                >
                  <Text
                    style={{ fontSize: 12, fontWeight: 400, color: "#595A5C" }}
                  >
                    University of Arts London
                  </Text>
                  <Text
                    style={{ fontSize: 12, fontWeight: 400, color: "#595A5C" }}
                  >
                    2012 - 2014
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 10, fontWeight: 400, color: "#929497" }}
                >
                  Bachelor of Graphic Design
                </Text>
                <Text
                  style={{ fontSize: 10, fontWeight: 400, color: "#929497" }}
                >
                  .molestium lorem olestie pretium apaza all the molestium lorem
                  olestie pretium apaza all therosen. ringilla lorem ipsum .
                </Text>
              </View>




            </View>
          </View>





        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={{ width: 228, height: 2, backgroundColor: "#595A5C" }}
          ></View>
          <View
            style={{ width: 290, height: 2, backgroundColor: "#F1D61B" }}
          ></View>
        </View>


        <View style={{display:"flex",flexDirection:"row",gap:36}}>

        <View style={{display:"flex",flexDirection:"column",gap:16}}>
       
        <View style={{display:"flex",flexDirection:"column",width:186}}> 
        <Text style={{ fontSize: 12, fontWeight: 400, color: "#414042" }}>SKILLS</Text>
        </View>
        <View style={{display:"flex",flexDirection:"column",gap:10}}>
        <Text style={{ fontSize: 12, fontWeight: 400, color: "#929497" }}>Photosop</Text>
        <Text style={{ fontSize: 12, fontWeight: 400, color: "#929497"}}>Illustrator</Text>
        <Text style={{fontSize: 12, fontWeight: 400, color: "#929497" }}>In Design</Text>
        <Text style={{ fontSize: 12, fontWeight: 400, color: "#929497" }}>Adobe Premiere</Text>
        <Text style={{ fontSize: 12, fontWeight: 400, color: "#929497" }}>HTML</Text>
        <Text style={{ fontSize: 12, fontWeight: 400, color: "#929497" }}>Hard Work</Text>
        <Text style={{ fontSize: 12, fontWeight: 400, color: "#929497" }}>Ms Excel</Text>
        </View>



       
        </View>

        <View
            style={{
              display: "flex", flexDirection: "column", gap: 16, width: "100%",
            }}
          >
            <View>

              <Text style={{ fontSize: 14, fontWeight: 400, color: "#595A5C" }}>
              WORK EXPERIENCE
              </Text>
            </View>

            <View
              style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", }}
            >
              <View
                style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%", }}
              >
                <View
                  style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", }}
                >
                  <Text
                    style={{ fontSize: 12, fontWeight: 400, color: "#595A5C" }}
                  >
                    AB Design Development
                  </Text>
                  <Text
                    style={{ fontSize: 12, fontWeight: 400, color: "#595A5C" }}
                  >
                    2016 - 2018
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 10, fontWeight: 400, color: "#929497" }}
                >
                Company Name                </Text>
                <Text
                  style={{ fontSize: 10, fontWeight: 400, color: "#929497" }}
                >
                  .molestium lorem olestie pretium apaza all the molestium lorem
                  olestie pretium apaza all therosen. ringilla lorem ipsum .
                </Text>
              </View>

              <View
                style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%", }}
              >
                <View
                  style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", }}
                >
                  <Text
                    style={{ fontSize: 12, fontWeight: 400, color: "#595A5C" }}
                  >
                    AB Design Development
                  </Text>
                  <Text
                    style={{ fontSize: 12, fontWeight: 400, color: "#595A5C" }}
                  >
                    2016 - 2018
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 10, fontWeight: 400, color: "#929497" }}
                >
                  Company Name
                </Text>
                <Text
                  style={{ fontSize: 10, fontWeight: 400, color: "#929497" }}
                >
                  .molestium lorem olestie pretium apaza all the molestium lorem
                  olestie pretium apaza all therosen. ringilla lorem ipsum .
                </Text>
              </View>

              <View
                style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%", }}
              >
                <View
                  style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", }}
                >
                  <Text
                    style={{ fontSize: 12, fontWeight: 400, color: "#595A5C" }}
                  >
                    AB Design Development
                  </Text>
                  <Text
                    style={{ fontSize: 12, fontWeight: 400, color: "#595A5C" }}
                  >
                    2016 - 2018
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 10, fontWeight: 400, color: "#929497" }}
                >
                  Company Name
                </Text>
                <Text
                  style={{ fontSize: 10, fontWeight: 400, color: "#929497" }}
                >
                  .molestium lorem olestie pretium apaza all the molestium lorem
                  olestie pretium apaza all therosen. ringilla lorem ipsum .
                </Text>
              </View>




            </View>
          </View>

        

        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={{ width: 228, height: 2, backgroundColor: "#595A5C" }}
          ></View>
          <View
            style={{ width: 290, height: 2, backgroundColor: "#F1D61B" }}
          ></View>
        </View>

      <View style={{display:"flex",flexDirection:"row",gap:57}}>

        <View style={{display:"flex",flexDirection:"column",gap:12}}>
        <Text style={{ fontSize: 14, fontWeight: 400, color: "#595A5C" }}>SOCIAL</Text>
         <View style={{display:"flex",flexDirection:"row",gap:14}}>
         <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M6.36128 15.0078H8.97889V7.94875H10.8053L11 5.58492H8.97889C8.97889 5.58492 8.97889 4.70226 8.97889 4.23906C8.97889 3.6822 9.08287 3.46131 9.58295 3.46131C9.98566 3.46131 11 3.46131 11 3.46131V1.00781C11 1.00781 9.50638 1.00781 9.18781 1.00781C7.24043 1.00781 6.36222 1.93221 6.36222 3.70053C6.36222 5.24081 6.36222 5.58492 6.36222 5.58492H5V7.97827H6.36222L6.36128 15.0078Z" fill="#929497"/>
</Svg>
<Text style={{ fontSize: 12, fontWeight: 400, color: "#929497" }}>naledikhumalo.com</Text>s
         </View>
         <View style={{display:"flex",flexDirection:"row",gap:14}}>
         <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M1 12.647C2.27157 13.5071 3.78106 14.0078 5.40257 14.0078C10.7349 14.0078 13.7481 9.25655 13.5667 4.99504C14.128 4.56865 14.6154 4.03499 15 3.42707C14.4849 3.66829 13.9305 3.83157 13.3508 3.90467C13.9432 3.53066 14.3994 2.93617 14.6131 2.22836C14.0576 2.57556 13.4432 2.82775 12.7895 2.9642C12.2651 2.37577 11.5191 2.00781 10.6921 2.00781C8.83848 2.00781 7.47566 3.8328 7.8949 5.72843C5.50767 5.60173 3.3907 4.39561 1.97476 2.56334C1.22175 3.92536 1.58439 5.70648 2.86405 6.608C2.39284 6.59216 1.94935 6.45575 1.56245 6.22915C1.53126 7.6326 2.48524 8.94585 3.86653 9.23824C3.4623 9.35398 3.01881 9.38077 2.56954 9.2894C2.9345 10.493 3.99588 11.369 5.25244 11.3933C4.04554 12.3911 2.52335 12.8371 1 12.647Z" fill="#929497"/>
</Svg>
<Text style={{ fontSize: 12, fontWeight: 400, color: "#929497" }}>naledikhumalo.com</Text>   
          </View>  
        </View>
        <View style={{display:"flex",flexDirection:"column",gap:16}}>
        <View>
        <Text style={{ fontSize: 14, fontWeight: 400, color: "#595A5C" }}>INTERESTS</Text>
        </View>
        <View style={{display:"flex",flexDirection:"column",gap:8}}>
        <Text style={{ fontSize: 12, fontWeight: 400, color: "#929497" }}>Hiking</Text>
        <Text style={{ fontSize: 12, fontWeight: 400, color: "#929497" }}>Sketching</Text>
        <Text style={{ fontSize: 12, fontWeight: 400, color: "#929497" }}>Reading</Text>
        </View>
        </View>
      </View>
        



      </View>
    </Page>
  );
};

export default Template51;

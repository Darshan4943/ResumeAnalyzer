import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template10({data}) {
  return (
    <Page size="A4" style={{padding:24}}>
    <View style={{ flexDirection: "row", gap: 42 }}>

      <View style={{ width: "123px", marginTop: "86px" }}>
        <View style={{ flexDirection: "column", gap: 24 }}>
          <View style={{ flexDirection: "column", gap: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>CONTACT</Text>

            <View style={{ flexDirection: "col", gap: 8 }} >
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Svg width="15" height="22" viewBox="0 0 15 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M7.65934 0.664062C3.98697 0.664062 1 3.65102 1 7.32206C1 8.80088 1.94409 11.2118 3.88696 14.6935C5.26043 17.1551 6.61256 19.2086 6.66857 19.2939L7.658 20.7941L8.64744 19.2939C8.70477 19.2086 10.0556 17.1551 11.429 14.6935C13.3719 11.2131 14.316 8.80222 14.316 7.3234C14.3173 3.65103 11.3304 0.664062 7.65934 0.664062ZM7.65934 10.7304C5.75248 10.7304 4.20832 9.18491 4.20832 7.27805C4.20832 5.37119 5.75381 3.82572 7.65934 3.82572C9.56486 3.82572 11.1104 5.37119 11.1104 7.27805C11.1104 9.18491 9.56486 10.7304 7.65934 10.7304Z" stroke="#B2B2B2" stroke-width="0.666734" stroke-miterlimit="10" />
                </Svg>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>ContactInformation</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 8 }}>
                <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M20.0046 17.2915C20.0379 17.5513 19.9596 17.7778 19.7664 17.9693L17.5114 20.206C17.4098 20.3193 17.2766 20.4159 17.1134 20.4942C16.9501 20.5725 16.7886 20.6241 16.6304 20.6474C16.6187 20.6474 16.5854 20.6507 16.5288 20.6557C16.4722 20.6607 16.3989 20.6641 16.3089 20.6641C16.0941 20.6641 15.746 20.6274 15.2664 20.5541C14.7851 20.4808 14.1988 20.301 13.5027 20.0112C12.8082 19.7231 12.0204 19.2917 11.1394 18.7155C10.2584 18.1392 9.3207 17.3481 8.32477 16.3422C7.53368 15.5628 6.87915 14.8166 6.35787 14.1038C5.83825 13.3927 5.42022 12.7332 5.10378 12.1286C4.78735 11.5241 4.54919 10.9761 4.39264 10.4848C4.23442 9.99352 4.12783 9.5705 4.07121 9.21409C4.01458 8.85768 3.99126 8.57787 4.00292 8.37468C4.01458 8.1715 4.01958 8.05827 4.01958 8.03662C4.04289 7.8784 4.09286 7.71683 4.1728 7.55362C4.25274 7.39041 4.34767 7.25717 4.46092 7.15558L6.71594 4.90055C6.87416 4.74234 7.05403 4.66406 7.25888 4.66406C7.40544 4.66406 7.53534 4.70571 7.64859 4.79064C7.76184 4.87558 7.85844 4.9805 7.93672 5.10541L9.75039 8.54624C9.85198 8.72611 9.8803 8.92428 9.83533 9.13912C9.79036 9.35397 9.69377 9.53384 9.54721 9.68207L8.71615 10.5131C8.69283 10.5365 8.67285 10.5731 8.65786 10.623C8.6412 10.6747 8.63288 10.7163 8.63288 10.7513C8.67784 10.9878 8.77943 11.2593 8.93765 11.564C9.07255 11.8355 9.2824 12.1652 9.56553 12.5566C9.84865 12.9463 10.2484 13.396 10.768 13.904C11.2759 14.4236 11.7289 14.8283 12.1237 15.1164C12.5184 15.4046 12.8498 15.6161 13.1146 15.7526C13.3811 15.8875 13.5843 15.9708 13.7242 15.9975L13.9357 16.0391C13.959 16.0391 13.994 16.0308 14.0456 16.0141C14.0972 15.9975 14.1322 15.9775 14.1555 15.9558L15.1215 14.9732C15.3247 14.7933 15.5628 14.7017 15.8326 14.7017C16.0241 14.7017 16.1774 14.735 16.2906 14.8033H16.3073L19.5782 16.7353C19.818 16.8785 19.9579 17.065 20.0046 17.2915Z" stroke="#B2B2B2" strokeWidth="0.666734" strokeMiterlimit="10" />
                </Svg>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>+1 123 456 789</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 8 }}>
                <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M18.088 18.6641H5.24486C4.00514 18.6641 3 17.6589 3 16.4192V7.90892C3 6.6692 4.00514 5.66406 5.24486 5.66406H18.088C19.3277 5.66406 20.3329 6.6692 20.3329 7.90892V16.4192C20.3329 17.6589 19.3277 18.6641 18.088 18.6641Z" stroke="#B2B2B2" strokeWidth="0.666734" strokeMiterlimit="10" />
                  <Path d="M19.7818 6.11719L11.6643 13.295L3.69141 6.29312" stroke="#B2B2B2" strokeWidth="0.666734" strokeMiterlimit="10" />
                  <Path d="M9.53716 12.1426L3.45312 18.7517" stroke="#B2B2B2" strokeWidth="0.666734" strokeMiterlimit="10" />
                  <Path d="M19.8809 18.7517L13.7969 12.1426" stroke="#B2B2B2" strokeWidth="0.666734" strokeMiterlimit="10" />
                </Svg>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>you@email.com</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 8 }}>
                <Svg width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M10 0.664062C5.05282 0.664062 1 4.71689 1 9.66407C1 14.6127 5.05137 18.6641 10 18.6641C14.9472 18.6641 19 14.6113 19 9.66407C19 4.71544 14.9486 0.664062 10 0.664062ZM16.21 6.06492H13.5991C13.3318 4.89603 12.8796 3.90199 12.3378 2.82557C13.9604 3.45408 15.4023 4.53482 16.21 6.06492ZM10 2.46579C10.721 3.54221 11.3495 4.71543 11.7107 6.06492H8.29074C8.65195 4.80356 9.27902 3.54221 10 2.46579ZM3.07048 11.4658C2.88987 10.9254 2.80318 10.2926 2.80318 9.66407C2.80318 9.03556 2.89132 8.4027 3.07048 7.86233H6.12924C6.0411 8.49517 6.0411 9.03556 6.0411 9.66407C6.0411 10.2926 6.12924 10.833 6.12924 11.4658H3.07048ZM3.79146 13.2632H6.40232C6.66961 14.4321 7.12185 15.4247 7.66367 16.5026C6.0411 15.8741 4.59913 14.7919 3.79146 13.2632ZM6.40232 6.06492H3.79146C4.6916 4.53482 6.0411 3.45408 7.66367 2.82557C7.12185 3.90199 6.66961 4.89603 6.40232 6.06492ZM10 16.8623C9.27902 15.7859 8.65051 14.6127 8.2893 13.2632H11.7093C11.3495 14.5231 10.721 15.7845 10 16.8623ZM12.0705 11.4658H7.93097C7.8385 10.833 7.75036 10.2926 7.75036 9.66407C7.75036 9.03556 7.8385 8.49517 7.93097 7.86233H12.163C12.2511 8.49517 12.3378 9.03556 12.3378 9.66407C12.3392 10.2926 12.163 10.833 12.0705 11.4658ZM12.3392 16.5011C12.8796 15.5114 13.3318 14.4306 13.6006 13.2618H16.2114C15.4023 14.7919 13.9604 15.8741 12.3392 16.5011ZM13.9604 11.4658C14.0528 10.833 14.0528 10.2926 14.0528 9.66407C14.0528 9.03556 13.9604 8.49517 13.9604 7.86233H17.0177C17.1983 8.4027 17.2893 9.03556 17.2893 9.66407C17.2893 10.2926 17.1968 10.9254 17.0177 11.4658H13.9604Z" fill="#B2B2B2" stroke="white" strokeWidth="0.5" strokeMiterlimit="10" />
                </Svg>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>yourwebsite.com</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "column", gap: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>SKILLS</Text>

            <View style={{ flexDirection: "row", gap: 16 }}>
              <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
              </Svg>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Skill 1</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 16 }}>
              <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
              </Svg>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Skill 1</Text>
            </View>


            <View style={{ flexDirection: "row", gap: 16 }}>
              <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
              </Svg>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Skill 2</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 16 }}>
              <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
              </Svg>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Skill 3</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 16 }}>
              <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
              </Svg>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Skill 4</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 16 }}>
              <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
              </Svg>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Skill 5</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 16 }}>
              <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
              </Svg>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Skill 6</Text>
            </View>

          </View>
          <View style={{ flexDirection: "column", gap: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>TOOLS</Text>

            <View style={{ flexDirection: "row", gap: 16 }}>
              <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
              </Svg>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Tool 1</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 16 }}>
              <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
              </Svg>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Tool 2</Text>
            </View>


            <View style={{ flexDirection: "row", gap: 16 }}>
              <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
              </Svg>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Tool 3</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 16 }}>
              <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
              </Svg>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Tool 4</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 16 }}>
              <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
              </Svg>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Tool 5</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 16 }}>
              <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
              </Svg>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Tool 6</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 16 }}>
              <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
              </Svg>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Tool 7</Text>
            </View>

          </View>


          <View style={{ flexDirection: "column", gap: 16 }}>
            <View>
              <Text style={{ fontSize: 14, fontWeight: '400' }}>LANGUAGE</Text>
            </View>

            <View style={{ flexDirection: "column", gap: 8 }}>
              <View>
                <Text style={{ fontSize: 10, fontWeight: '400' }}>LANGUAGE 1</Text>
              </View>

              <View>
                <Text style={{ fontSize: 10, fontWeight: '400' }}>LANGUAGE 2</Text>
              </View>

              <View>
                <Text style={{ fontSize: 10, fontWeight: '400' }}>LANGUAGE 3</Text>
              </View>
            </View>


          </View>
        </View>

      </View>




      <View style={{ width: "379px", gap: 24 }}>

        <View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "column", gap: 12 }}>
              <Text style={{ fontSize: 38, fontWeight: '400', color: '#414042' }}>John Doe</Text>
              <Text style={{ fontSize: 19, fontWeight: '400', color: '#414042' }}>Current Designation</Text>
            </View>

            <View style={{ width: "124px", height: "124px" }}>
              <Image src={"/images/services/profile.png"} />
            </View>

          </View>

          <View style={{ flexDirection: "column", gap: 6 }}>
            <Text style={{ fontSize: 10, fontWeight: '500', color: '#414042' }}>Short intro about you/ Summary</Text>
            <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Loremipsumdolorsitamet,consectetueradipiscingelit,seddiamnonummynibh euismodtinciduntutlaoreetdoloremagnaaliquameratvolutpat.Utwisienimad minimveniam,quisnostrudexercitationullamcorpersuscipitlobortisnislutaliquipex eacommodoconsequat.Duisautemveleumiriuredolorinhendreritinvulputatevelit essemolestieconsequat,velillumdoloreeufeugiatnullafacilisisatveroeroset </Text>

          </View>
        </View>

        <View>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>EXPERIENCE</Text>
        </View>


        <View style={{ flexDirection: "column", gap: 8 }}>
          <View style={{ flexDirection: "column", gap: 3 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>COMPANY 1 - DESIGNATION </Text>
              <Text style={{ fontSize: 14, fontWeight: '400', color: '#F2BE5C' }}>YEAR</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#F2BE5C' }}>LOCATION</Text>
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 10, fontWeight: '400', color: '#F2BE5C' }}>Loremipsumdolorsitamet,consectetueradipiscingelit,seddiamnonummynibh euismodtinciduntutlaoreetdoloremagnaaliquameratvolutpat.Utwisienimad minimveniam,quisnostrudexercitationullamcorpersuscipitlobortisnislutaliquipex eacommodoconsequat.Duisautemveleumiriuredolorinhendreritinvulputatevelit</Text>
          </View>

        </View>

        <View style={{ flexDirection: "column", gap: 8 }}>
          <View style={{ flexDirection: "column", gap: 3 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>COMPANY 1 - DESIGNATION </Text>
              <Text style={{ fontSize: 14, fontWeight: '400', color: '#F2BE5C' }}>YEAR</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#F2BE5C' }}>LOCATION</Text>
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 10, fontWeight: '400', color: '#F2BE5C' }}>Loremipsumdolorsitamet,consectetueradipiscingelit,seddiamnonummynibh euismodtinciduntutlaoreetdoloremagnaaliquameratvolutpat.Utwisienimad minimveniam,quisnostrudexercitationullamcorpersuscipitlobortisnislutaliquipex eacommodoconsequat.Duisautemveleumiriuredolorinhendreritinvulputatevelit</Text>
          </View>

        </View>

        <View style={{ flexDirection: "column", gap: 8 }}>
          <View style={{ flexDirection: "column", gap: 3 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>COMPANY 1 - DESIGNATION </Text>
              <Text style={{ fontSize: 14, fontWeight: '400', color: '#F2BE5C' }}>YEAR</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#F2BE5C' }}>LOCATION</Text>
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 10, fontWeight: '400', color: '#F2BE5C' }}>Loremipsumdolorsitamet,consectetueradipiscingelit,seddiamnonummynibh euismodtinciduntutlaoreetdoloremagnaaliquameratvolutpat.Utwisienimad minimveniam,quisnostrudexercitationullamcorpersuscipitlobortisnislutaliquipex eacommodoconsequat.Duisautemveleumiriuredolorinhendreritinvulputatevelit</Text>
          </View>
        </View>

        <View style={{ flexDirection: "column", gap: 10 }} >
          <View>
            <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>EDUCATION</Text>
          </View>


          <View style={{ flexDirection: 'column', gap: 5 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#414042' }}>DEGREE 1 - SPECIALIZATION</Text>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#F2BE5C' }}>YEAR</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#F2BE5C' }}>INSTITUTION NAME</Text>
            </View>
          </View>




          <View style={{ flexDirection: 'column', gap: 5 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#414042' }}>DEGREE 1 - SPECIALIZATION</Text>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#F2BE5C' }}>YEAR</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#F2BE5C' }}>INSTITUTION NAME</Text>
            </View>
          </View>
        </View>



        <View style={{ flexDirection: "column", gap: 10 }} >
          <View>
            <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>COURSE & CERTIFICATE</Text>
          </View>


          <View style={{ flexDirection: 'column', gap: 5 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#414042' }}>COURSE NAME</Text>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#F2BE5C' }}>YEAR</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#F2BE5C' }}>INSTITUTION NAME</Text>
            </View>
          </View>




          <View style={{ flexDirection: 'column', gap: 5 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#414042' }}>COURSE NAME</Text>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#F2BE5C' }}>YEAR</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#F2BE5C' }}>INSTITUTION NAME</Text>
            </View>
          </View>
        </View>
      </View>



    </View>
    </Page>
  )
}

export default Template10
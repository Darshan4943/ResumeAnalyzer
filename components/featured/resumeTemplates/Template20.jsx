import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';


function Template20({ data ,selectedColor,selectedFont,preview }) {

  return (
    <Page size='A4' style={{ padding: 24 }}>
      <View style={{ backgroundColor: '#FFF', gap: 24, display: 'flex', flexDirection: 'column', }}>

        <View style={{ display: 'flex', flexDirection: 'row', gap: 52, alignItems: 'center' }}>

          <View style={{ width: 142, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={{ fontSize: 28, fontFamily: `${selectedFont} 700`, color: '#303030' }}>{data.firstName}</Text>
              <Text style={{ fontSize: 28, fontFamily: `${selectedFont} 700`, color: '#303030' }}>{data.lastName}</Text>
            </View>
            <Text style={{ fontSize: 10,fontFamily: `${selectedFont} 500`, color: '#9B9B9B' }}>{data.designation}</Text>
          </View>

          <View style={{ width: 152, height: 152, borderRadius: '50%', border: 4, borderColor: '#414042', overflow: 'hidden' }}>
            {data.profilePhoto ? (
              <Image src={
                preview
                  ? data.profilePhoto
                  : Object.keys(data?.profilePhoto).includes("filename")
                  ? URL.createObjectURL(data.profilePhoto)
                  : data.profilePhoto
              } alt="" style={{ borderRadius: "50%", objectFit: 'contain' }} />
            ) : (
              <Image src="/images/services/profile.png" alt="" style={{ borderRadius: "50%", objectFit: 'contain' }} />
            )}
          </View>

          <View style={{ width: 124, }}>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Text style={{ fontSize: 12,fontFamily: `${selectedFont} 500`, color: '#282627' }}>CONTACT</Text>

              {data?.mobileNumber && (
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  <Svg width="20" height="21" viewBox="0 0 20 21" fill="#FFF" xmlns="http://www.w3.org/2000/svg">
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M9.99931 19.3228C5.12562 19.3228 1.17578 15.373 1.17578 10.4993C1.17578 5.62562 5.12562 1.67578 9.99931 1.67578C14.873 1.67578 18.8228 5.62562 18.8228 10.4993C18.8243 15.373 14.873 19.3228 9.99931 19.3228Z" stroke="#5E5F5E" stroke-width="0.5" stroke-miterlimit="10" />
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M6.42326 15.5744V14.4023H13.8103V15.5744C13.8103 15.7166 13.6399 15.8735 13.4854 15.8735H6.74643C6.59538 15.8735 6.42326 15.715 6.42326 15.5744ZM6.42326 6.38346H13.8103V14.1501H6.42326V6.38346ZM6.42326 5.18873C6.42326 5.04808 6.59363 4.88964 6.74818 4.88964H13.4871C13.6417 4.88964 13.812 5.04808 13.812 5.18873V6.107H6.42502L6.42326 5.18873ZM6 5.21135V15.5517C6 15.9414 6.39165 16.2647 6.72359 16.2647H13.5135C13.6908 16.2647 13.9297 16.1305 14.0193 16.0416C14.1229 15.9381 14.2353 15.7441 14.2353 15.5534V5.21298C14.2353 4.82497 13.8436 4.5 13.5117 4.5H6.72184C6.5427 4.5 6.30559 4.63419 6.21602 4.7231C6.10889 4.83142 6 5.01088 6 5.21135Z" fill="#5E5F5E" />
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M9.74388 15.2322V15.1174C9.74388 14.8975 10.118 14.7067 10.3726 14.9056C10.5869 15.0705 10.5377 15.5312 10.118 15.5312C9.92654 15.5312 9.74388 15.3987 9.74388 15.2322ZM9.44531 15.1626C9.44531 15.5216 9.7474 15.7802 10.1004 15.7996C10.4288 15.8174 10.7942 15.5377 10.7942 15.1853C10.7942 14.8312 10.5131 14.5645 10.0706 14.5645C9.74564 14.5661 9.44531 14.8652 9.44531 15.1626Z" fill="#5E5F5E" />
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M9.19556 5.69636H11.0432C11.1872 5.69636 11.2908 5.41992 10.9431 5.41992H9.29567C8.94792 5.41992 9.04979 5.69636 9.19556 5.69636Z" fill="#5E5F5E" />
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M8.56836 5.55848C8.56836 5.71207 8.8441 5.77836 8.8441 5.53423C8.8441 5.3952 8.56836 5.39196 8.56836 5.55848Z" fill="#5E5F5E" />
                  </Svg>
                  <Text style={{ fontSize: 10,fontFamily: `${selectedFont} 600`, color: '#282627' }}>{data.mobileNumber}</Text>
                </View>
              )}


              {data?.email?.length > 0 && (
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  <Svg width="20" height="21" viewBox="0 0 20 21" fill="#FFF" xmlns="http://www.w3.org/2000/svg">
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M9.99931 19.3228C5.12562 19.3228 1.17578 15.373 1.17578 10.4993C1.17578 5.62562 5.12562 1.67578 9.99931 1.67578C14.873 1.67578 18.8228 5.62562 18.8228 10.4993C18.8243 15.373 14.873 19.3228 9.99931 19.3228Z" stroke="#5E5F5E" stroke-width="0.5" stroke-miterlimit="10" />
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M5.40802 7.54194C5.55318 7.57979 8.18067 9.78291 8.4775 10.051C8.58352 10.1456 8.65528 10.1898 8.76782 10.2907C8.90971 10.4185 9.79043 11.1802 9.91439 11.1802C10.2145 11.1802 10.3189 11.0729 10.6679 10.7512L14.274 7.758C14.3898 7.66969 14.4419 7.57979 14.5871 7.54194V13.899H5.40639L5.40802 7.54194ZM6.07019 7.10196H13.9282C13.8336 7.23916 13.8173 7.21235 13.6917 7.31328L10.5081 9.95165C10.3547 10.0778 10.1476 10.2844 10.0008 10.379C9.673 10.1046 9.36312 9.84601 9.02062 9.56687C8.8461 9.42494 8.7091 9.29719 8.52806 9.16157L6.07019 7.10196ZM4.70508 6.7424V14.2585C4.70508 14.5046 4.90242 14.6181 5.16012 14.6181H14.8383C15.096 14.6181 15.2933 14.5046 15.2933 14.2585V6.7424C15.2933 6.49638 15.096 6.38281 14.8383 6.38281H5.16012C4.90242 6.38281 4.70508 6.4948 4.70508 6.7424Z" fill="#5E5F5E" />
                  </Svg>
                  <Text style={{ fontSize: 10, fontFamily: `${selectedFont} 600`, color: '#282627' }}>{data.email}</Text>
                </View>
              )}

              {data?.location?.length > 0 && (
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  <Svg width="20" height="21" viewBox="0 0 20 21" fill="#FFF" xmlns="http://www.w3.org/2000/svg">
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M9.99931 19.3228C5.12562 19.3228 1.17578 15.373 1.17578 10.4993C1.17578 5.62562 5.12562 1.67578 9.99931 1.67578C14.873 1.67578 18.8228 5.62562 18.8228 10.4993C18.8243 15.373 14.873 19.3228 9.99931 19.3228Z" stroke="#5E5F5E" stroke-width="0.5" stroke-miterlimit="10" />
                    <Path d="M10.0051 10.3381C10.2322 10.3381 10.425 10.2571 10.5834 10.0951C10.7418 9.93316 10.821 9.73846 10.821 9.51103C10.821 9.28359 10.7401 9.09058 10.5783 8.93199C10.4166 8.7734 10.2221 8.6941 9.99494 8.6941C9.76779 8.6941 9.57501 8.77508 9.41662 8.93704C9.25823 9.09901 9.17903 9.29371 9.17903 9.52115C9.17903 9.74858 9.25992 9.9416 9.42168 10.1002C9.58344 10.2588 9.7779 10.3381 10.0051 10.3381ZM10 14.8802C11.0612 13.9785 11.9158 13.0437 12.5639 12.0758C13.2119 11.1079 13.536 10.2655 13.536 9.54847C13.536 8.52472 13.2049 7.66961 12.5427 6.98314C11.8805 6.29667 11.0329 5.95343 10 5.95343C8.9671 5.95343 8.11954 6.29667 7.45733 6.98314C6.79513 7.66961 6.46403 8.52472 6.46403 9.54847C6.46403 10.2655 6.78806 11.1079 7.43613 12.0758C8.08422 13.0437 8.93884 13.9785 10 14.8802ZM10 15.5C8.67583 14.3501 7.67812 13.2775 7.00687 12.2822C6.33562 11.2869 6 10.3757 6 9.54847C6 8.47483 6.36327 7.53168 7.0898 6.719C7.81632 5.90633 8.78397 5.5 9.99275 5.5C11.2015 5.5 12.1716 5.90633 12.903 6.719C13.6343 7.53168 14 8.47483 14 9.54847C14 10.3757 13.6669 11.2848 13.0006 12.2757C12.3343 13.2667 11.3341 14.3415 10 15.5Z" fill="#5E5F5E" />
                  </Svg>
                  <Text style={{ fontSize: 10,fontFamily: `${selectedFont} 600`, color: '#282627' }}>{data.location}</Text>
                </View>
              )}

            </View>
          </View>

        </View>

        <View style={{ borderTopColor: '#C7C6C5', borderTop: 1, borderBottomColor: '#C7C6C5', padding: '10px 28px', borderBottom: 1, }}>
          <Text style={{ padding: 10, fontSize: 10,fontFamily: `${selectedFont} 400`, color: '#6D6E71', textAlign: 'center', lineHeight: 1 }}>{data.summery}  </Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row' }}>

          {/* left */}
          <View style={{ width: 140, paddingRight: 10, gap: 18 }}>

            <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Text style={{ fontSize: 12,fontFamily: `${selectedFont} 500`, color: '#282627' }}>EDUCATION</Text>
              {data?.education?.map((detail, index) => (

              <View key={index} style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                <Svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M3 6.5C4.65685 6.5 6 5.15685 6 3.5C6 1.84315 4.65685 0.5 3 0.5C1.34315 0.5 0 1.84315 0 3.5C0 5.15685 1.34315 6.5 3 6.5Z" fill="#5E5F5E" />
                </Svg>
                  <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Text style={{ fontSize: 10,fontFamily: `${selectedFont} 700`, color: '#6D6E71', marginBottom: 2 }}>{detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>
                    <Text style={{ fontSize: 10,fontFamily: `${selectedFont} 600`, color: '#282627' }}>{detail.qualification} </Text>
                    <Text style={{ fontSize: 10,fontFamily: `${selectedFont} 400`, color: '#6D6E71' }}> {detail.specialization}</Text>
                    <Text style={{ fontSize: 10,fontFamily: `${selectedFont} 400`, color: '#6D6E71' }}>{detail.instituteName}</Text>
                  </View>
              </View>
                ))}

            </View>

            {/* <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Text style={{ fontSize: 12,fontFamily: `${selectedFont} 500`, color: '#282627' }}>HOBBBE</Text>

              <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <Svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M3 6.5C4.65685 6.5 6 5.15685 6 3.5C6 1.84315 4.65685 0.5 3 0.5C1.34315 0.5 0 1.84315 0 3.5C0 5.15685 1.34315 6.5 3 6.5Z" fill="#5E5F5E" />
                </Svg>
                <Text style={{ fontSize: 10, fontWeight: 400, color: '#6D6E71' }}>CYCLING</Text>
                
              </View>
            </View> */}
            <View style={{ flexDirection: 'column', maxWidth: 150, paddingTop: 10 }}>
              <Text style={{ fontFamily: `${selectedFont} 500`, fontSize: 12, color: '#282627' }}>HOBBIES</Text>
              {data.hobbies?.map((detail, index) => (
                <View key={index} style={{ flexDirection: "column", }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Text style={{ color: "#282829", }}>&#8226;</Text>
                    <Text style={{ color: "#5E5F5E", fontSize: 10,fontFamily: `${selectedFont} 400` }}>{detail.title}</Text>
                  </View>
                </View>
              ))}
            </View>

            {data?.languages?.length > 0 && (
              <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Text style={{ color: '#292627', fontSize: 12, fontFamily: `${selectedFont} 500`}}>LANGUAGE</Text>
                {data.languages?.map((detail, index) => {
                  const calculateWidthPercentage = (rating) => {
                    let zerosCount = 0;
                    if (rating && rating.length > 0) {
                      zerosCount = rating.filter(val => val === 0).length;
                    }
                    return zerosCount;
                  };

                  const zerosCount = calculateWidthPercentage(detail.rating);

                  return (
                    <View key={index} style={{ width: 130, display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                      <Text style={{ width: 55, fontSize: 10,fontFamily: `${selectedFont} 400`, color: '#6D6E71' }}>{detail.languages}</Text>

                      <View style={{ width: 55 }}>

                        {zerosCount === 0 &&
                          <Svg width="55" height="12" viewBox="0 0 88 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M86.27 7H1.73003C1.32643 7 1 6.54926 1 6.00767C1 5.45192 1.32643 5 1.73003 5H86.27C86.6736 5 87 5.45074 87 6.00767C87 6.54926 86.6725 7 86.27 7Z" fill="#C7C6C5" />
                            <Path d="M1 5C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7V5ZM76.6667 6C76.6667 8.94552 79.0545 11.3333 82 11.3333C84.9455 11.3333 87.3333 8.94552 87.3333 6C87.3333 3.05448 84.9455 0.666667 82 0.666667C79.0545 0.666667 76.6667 3.05448 76.6667 6ZM1 7H82V5H1V7Z" fill="#3F3F3F" />
                          </Svg>

                        }

                        {zerosCount === 1 &&
                          <Svg width="55" height="11" viewBox="0 0 87 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M86.27 6.5H1.73003C1.32643 6.5 1 6.04926 1 5.50767C1 4.95192 1.32643 4.5 1.73003 4.5H86.27C86.6736 4.5 87 4.95074 87 5.50767C87 6.04926 86.6725 6.5 86.27 6.5Z" fill="#C7C6C5" />
                            <Path d="M1 4.5C0.447715 4.5 0 4.94772 0 5.5C0 6.05228 0.447715 6.5 1 6.5V4.5ZM41.6667 5.5C41.6667 8.44552 44.0545 10.8333 47 10.8333C49.9455 10.8333 52.3333 8.44552 52.3333 5.5C52.3333 2.55448 49.9455 0.166667 47 0.166667C44.0545 0.166667 41.6667 2.55448 41.6667 5.5ZM1 6.5H47V4.5H1V6.5Z" fill="#3F3F3F" />
                          </Svg>

                        }

                        {zerosCount === 2 &&
                          <Svg width="55" height="11" viewBox="0 0 87 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M86.27 6.5H1.73003C1.32643 6.5 1 6.04926 1 5.50767C1 4.95192 1.32643 4.5 1.73003 4.5H86.27C86.6736 4.5 87 4.95074 87 5.50767C87 6.04926 86.6725 6.5 86.27 6.5Z" fill="#C7C6C5" />
                            <Path d="M1 4.5C0.447715 4.5 0 4.94772 0 5.5C0 6.05228 0.447715 6.5 1 6.5V4.5ZM0.666667 5.5C0.666667 8.44552 3.05448 10.8333 6 10.8333C8.94552 10.8333 11.3333 8.44552 11.3333 5.5C11.3333 2.55448 8.94552 0.166667 6 0.166667C3.05448 0.166667 0.666667 2.55448 0.666667 5.5ZM1 6.5H6V4.5H1V6.5Z" fill="#3F3F3F" />
                          </Svg>
                        }
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            
          </View>


          {/* middle */}
          <View style={{ width: 236, paddingHorizontal: 10, borderLeft: 1, borderLeftColor: '#C7C6C5', borderRight: 1, borderRightColor: '#C7C6C5' }}>

            <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Text style={{ fontSize: 12, fontFamily: `${selectedFont} 500`, color: '#282627' }}>EXPERIENCE</Text>
              {data.experience?.map((detail, index) => (
                <View key={index} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <Text style={{ fontFamily: `${selectedFont} 700`, fontSize: 10, color: '#2C363D' }}>{detail.designation} </Text>
                  <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 10, color: '#939598' }}>{detail.duration?.start?.year}-{" "}{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>
                  <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 10, color: '#6D6E71' }}>{detail.description} </Text>
                </View>
              ))}
            </View>
          </View>
          {/* right */}
          <View style={{ width: 142, paddingLeft: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {data?.skills?.length > 0 && (
                <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Text style={{ color: '#292627', fontSize: 12,fontFamily: `${selectedFont} 500`}}>SOFTWARE</Text>
                  {data.skills?.map((detail, index) => {
                    const calculateWidthPercentage = (rating) => {
                      let zerosCount = 0;
                      if (rating && rating.length > 0) {
                        zerosCount = rating.filter(val => val === 0).length;
                      }
                      return zerosCount;
                    };

                    const zerosCount = calculateWidthPercentage(detail.rating);

                    return (
                      <View key={index} style={{ width: 130, display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                        <Text style={{ width: 55, fontSize: 10,fontFamily: `${selectedFont} 400`, color: '#6D6E71' }}>{detail.skill}</Text>

                        <View style={{ width: 55 }}>

                          {zerosCount === 0 &&
                            <Svg width="55" height="12" viewBox="0 0 88 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <Path d="M86.27 7H1.73003C1.32643 7 1 6.54926 1 6.00767C1 5.45192 1.32643 5 1.73003 5H86.27C86.6736 5 87 5.45074 87 6.00767C87 6.54926 86.6725 7 86.27 7Z" fill="#C7C6C5" />
                              <Path d="M1 5C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7V5ZM76.6667 6C76.6667 8.94552 79.0545 11.3333 82 11.3333C84.9455 11.3333 87.3333 8.94552 87.3333 6C87.3333 3.05448 84.9455 0.666667 82 0.666667C79.0545 0.666667 76.6667 3.05448 76.6667 6ZM1 7H82V5H1V7Z" fill="#3F3F3F" />
                            </Svg>

                          }

                          {zerosCount === 1 &&
                            <Svg width="55" height="11" viewBox="0 0 87 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <Path d="M86.27 6.5H1.73003C1.32643 6.5 1 6.04926 1 5.50767C1 4.95192 1.32643 4.5 1.73003 4.5H86.27C86.6736 4.5 87 4.95074 87 5.50767C87 6.04926 86.6725 6.5 86.27 6.5Z" fill="#C7C6C5" />
                              <Path d="M1 4.5C0.447715 4.5 0 4.94772 0 5.5C0 6.05228 0.447715 6.5 1 6.5V4.5ZM41.6667 5.5C41.6667 8.44552 44.0545 10.8333 47 10.8333C49.9455 10.8333 52.3333 8.44552 52.3333 5.5C52.3333 2.55448 49.9455 0.166667 47 0.166667C44.0545 0.166667 41.6667 2.55448 41.6667 5.5ZM1 6.5H47V4.5H1V6.5Z" fill="#3F3F3F" />
                            </Svg>

                          }

                          {zerosCount === 2 &&
                            <Svg width="55" height="11" viewBox="0 0 87 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <Path d="M86.27 6.5H1.73003C1.32643 6.5 1 6.04926 1 5.50767C1 4.95192 1.32643 4.5 1.73003 4.5H86.27C86.6736 4.5 87 4.95074 87 5.50767C87 6.04926 86.6725 6.5 86.27 6.5Z" fill="#C7C6C5" />
                              <Path d="M1 4.5C0.447715 4.5 0 4.94772 0 5.5C0 6.05228 0.447715 6.5 1 6.5V4.5ZM0.666667 5.5C0.666667 8.44552 3.05448 10.8333 6 10.8333C8.94552 10.8333 11.3333 8.44552 11.3333 5.5C11.3333 2.55448 8.94552 0.166667 6 0.166667C3.05448 0.166667 0.666667 2.55448 0.666667 5.5ZM1 6.5H6V4.5H1V6.5Z" fill="#3F3F3F" />
                            </Svg>
                          }
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}


              <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Text style={{ fontSize: 12,fontFamily: `${selectedFont} 500`, color: '#282627' }}>AWARDS</Text>

              <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'flex-start' }}>
                <Svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M3 6.5C4.65685 6.5 6 5.15685 6 3.5C6 1.84315 4.65685 0.5 3 0.5C1.34315 0.5 0 1.84315 0 3.5C0 5.15685 1.34315 6.5 3 6.5Z" fill="#5E5F5E" />
                </Svg>
                <View style={{ display: 'flex', flexDirection: 'column', gap: 5, maxWidth: '90%', }}>
                  <Text style={{ fontSize: 10,fontFamily: `${selectedFont} 700`, color: '#282627' }}>WEB DEVELOPER OF THE YEAR</Text>
                  <Text style={{ fontSize: 10,fontFamily: `${selectedFont} 400`, color: '#8F9193' }}>Abc Creative Studio / 2017</Text>

                </View>
              </View>
            </View>

            </View>

          </View>

        </View>

      </View>
    </Page>
  )
}

export default Template20
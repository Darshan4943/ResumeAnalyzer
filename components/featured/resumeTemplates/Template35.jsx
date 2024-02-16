import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template35({ data }) {
    return (
        <Page size="A4" style={{ padding: 24 }}>

            <View style={{flexDirection:"row",gap:36}}>

           <View style={{paddingHorizontal:36,paddingVertical:41,width:294,gap:16}} >


            <View style={{flexDirection:"column",backgroundColor:"#B3977F",paddingVertical:12,paddingLeft:22}}>
           <Text style={{ fontWeight: 400, fontSize: 36, color: "#414042" }}>JOHN </Text>
           <Text style={{ fontWeight: 400, fontSize:36 , color: "#414042" }}>DOE</Text>
           <Text style={{ fontWeight: 400, fontSize:12 , color: "#414042" }}>WEB DESIGN & DEVELOPER</Text>
           </View>

           <View style={{flexDirection:"column",gap:12}}>
           <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>PROFILE</Text>
           <View style={{width:230,height:1,backgroundColor:"#B3977F"}}></View>
           <Text style={{ fontWeight: 400, fontSize: 9, color: "#B3977F" }}>Pellentesqueaceretfaucibusdolorporttitorvariusanisi,dignissimmauris bibenduminsenectuslacinianislluctusPhasellusidduiarcu.Nullamfinibus nislquisquamegestasblandit.Praesenteuleojusto.Nullamportanisinon tempuslacinia.Quisquemolestienullaidvolutpatcongue.Vestibulumegestas dolormagna,ettristiqueeratultriciesid.Inhachabitasseplateadictumst.</Text>
           </View>
            
           <View style={{flexDirection:"column",gap:12}}>
           <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>PROFILE</Text>
           <View style={{width:230,height:1,backgroundColor:"#B3977F"}}></View>

            <View style={{flexDirection:"column",gap:8}}>

            <View style={{flexDirection:"column",gap:16}}>

            <View style={{flexDirection:"column" ,gap:8}}>
           
            <View>
            <Text style={{ fontWeight: 700, fontSize: 10, color: "#58595B" }}>2011-2012</Text>
            <Text style={{ fontWeight: 700, fontSize: 10, color: "#58595B" }}>POSITION TITLE HERE</Text>
            <Text style={{ fontWeight: 400, fontSize: 10, color: "#58595B" }}>Company Name / Location</Text> 
            </View>

            <View>
            <Text style={{ fontWeight: 700, fontSize: 10, color: "#58595B" }}>Pellentesqueaceretfaucibusdolorporttitorvariusanisi,dignissimmaurbibenduminsenectuslacinianislluctusPhasellusidduiarcu.Nullamfinibus nislquisquamegestasblandit.</Text>
            </View>

            </View>

            <View style={{flexDirection:"column",gap:8}}>
           
           <View>
           <Text style={{ fontWeight: 700, fontSize: 10, color: "#58595B" }}>2011-2012</Text>
           <Text style={{ fontWeight: 700, fontSize: 10, color: "#58595B" }}>POSITION TITLE HERE</Text>
           <Text style={{ fontWeight: 400, fontSize: 10, color: "#58595B" }}>Company Name / Location</Text> 
           </View>

           <View>
           <Text style={{ fontWeight: 700, fontSize: 10, color: "#58595B" }}>Pellentesqueaceretfaucibusdolorporttitorvariusanisi,dignissimmaurbibenduminsenectuslacinianislluctusPhasellusidduiarcu.Nullamfinibus nislquisquamegestasblandit.</Text>
           </View>

           </View>

           <View style={{flexDirection:"column",gap:8}}>
           
           <View>
           <Text style={{ fontWeight: 700, fontSize: 10, color: "#58595B" }}>2011-2012</Text>
           <Text style={{ fontWeight: 700, fontSize: 10, color: "#58595B" }}>POSITION TITLE HERE</Text>
           <Text style={{ fontWeight: 400, fontSize: 10, color: "#58595B" }}>Company Name / Location</Text> 
           </View>

           <View>
           <Text style={{ fontWeight: 700, fontSize: 10, color: "#58595B" }}>Pellentesqueaceretfaucibusdolorporttitorvariusanisi,dignissimmaurbibenduminsenectuslacinianislluctusPhasellusidduiarcu.Nullamfinibus nislquisquamegestasblandit.</Text>
           </View>

           </View>
            
           </View>





            
            </View>

           </View>

           <View style={{width:170,gap:4}}>
                <Text style={{ fontSize: 12, fontWeight: "400" }}>EXPERTISE</Text>
                <View style={{ flexDirection: "column", width: 170, gap: 6 }}>
                  {data.skills?.map((detail, index) => {
                    const calculateWidthPercentage = (rating) => {
                      let ratingPercentage = 0;
                      if (rating && rating.length > 0) {
                        const zerosCount = rating.filter(
                          (val) => val === 0
                        ).length;

                        if (zerosCount === 0) ratingPercentage = 100;
                        else if (zerosCount === 1) ratingPercentage = 80;
                        else if (zerosCount === 2) ratingPercentage = 60;
                        else if (zerosCount === 3) ratingPercentage = 40;
                        else if (zerosCount === 4) ratingPercentage = 20;
                      }
                      return ratingPercentage;
                    };

                    const ratingPercentage = calculateWidthPercentage(
                      detail.rating
                    );

                    return (
                      <View style={{ paddingRight: 4, flexDirection: "column" }} key={index}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                          <Text style={{ color: "#414142", fontSize: 10, width: 80, fontWeight: "light" }}>
                            {detail.skill}
                          </Text>
                          <View style={{ width: "59.21%", height: 3.78, alignSelf: "flex-end", marginBottom: 1, backgroundColor: "#A9AAAA" }}>
                            <View
                              style={{ height: "100%", backgroundColor: "#D1D3D4", width: `${ratingPercentage}%` }}
                            ></View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
    </View>

           </View>'

           <View style={{width:193,flexDirection:"column",gap:16,paddingVertical:41}}>

            <View style={{flexDirection:"column",gap:8}}>
            <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>CONTACT</Text>
           <View style={{width:193,height:1,backgroundColor:"#B3977F"}}></View>
            </View>

            <View style={{flexDirection:"column",gap:8}}>
            <View style={{flexDirection:"row",gap:8}}>
            <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M0 0V12H12V0H0ZM9.47543 8.97354L9.1538 9.29116L9.14739 9.2847C9.01155 9.39187 8.85391 9.48096 8.68732 9.5481C8.53097 9.60879 8.37719 9.64752 8.217 9.66688C8.14395 9.67463 6.437 9.83603 4.31867 7.70175C2.78599 6.15753 2.22214 5.02002 2.37079 3.77534C2.38873 3.62041 2.4259 3.46546 2.48742 3.30277C2.55405 3.13234 2.64246 2.97353 2.75011 2.83667L2.74115 2.82763L3.05895 2.50485C3.29218 2.26986 3.66382 2.2634 3.88808 2.48935L5.01711 3.62685C5.24137 3.85281 5.23493 4.22854 5.0017 4.46224L4.8146 4.65204L4.43271 5.03551C4.45321 5.07037 4.47244 5.10781 4.49423 5.14655C4.69414 5.50807 4.96712 6.00387 5.48484 6.52679C6.00257 7.04842 6.49337 7.32344 6.85219 7.52357C6.89064 7.54552 6.9291 7.56617 6.96498 7.58683L7.53397 7.01356C7.7672 6.77857 8.13885 6.77211 8.36311 6.99806L9.49209 8.13558C9.71507 8.36282 9.70738 8.73855 9.47543 8.97354Z" fill="#B3977F"/>
</Svg>
            <Text style={{ fontWeight: 400, fontSize: 10, color: "#58595B" }}>123 456 7890</Text>
\            </View>
            <View style={{width:193,height:1,backgroundColor:"#B3977F"}}></View>


            
            <View style={{flexDirection:"row",gap:8}}>
            <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M0 0V12H12V0H0ZM3.06278 3.53002H8.93722C9.06922 3.53002 9.18712 3.58037 9.27555 3.6643L6.00002 6.49322L2.72449 3.66559C2.8142 3.58166 2.93207 3.53002 3.06278 3.53002ZM2.56943 3.96385L4.93764 6.03874L2.56943 8.06714V3.96385ZM8.93722 8.46869H3.06278C2.93078 8.46869 2.81291 8.41705 2.72449 8.33441L5.15164 6.23887L6.00002 6.98774L6.84836 6.23887L9.27426 8.33441C9.18712 8.41705 9.06793 8.46869 8.93722 8.46869ZM9.43061 8.06714L7.06236 6.03874L9.43061 3.96256V8.06714Z" fill="#B3977F"/>
</Svg>

            <Text style={{ fontWeight: 400, fontSize: 10, color: "#58595B" }}>info@companyname.com</Text>
            </View>
            <View style={{width:193,height:1,backgroundColor:"#B3977F"}}></View>

            <View style={{flexDirection:"row",gap:8}}>
            <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M0 0V12H12V0H0ZM9.64591 6V6.24532H9.63691C9.51773 8.07876 8.06325 9.54422 6.24351 9.66429V9.67334H6.00002H5.75653V9.66429C3.93679 9.54422 2.48226 8.07876 2.3618 6.24532H2.35413V6V5.75468H2.3618C2.48098 3.92124 3.93679 2.45577 5.75653 2.33441V2.32666H6.00002H6.24351V2.33441C8.06325 2.45448 9.51773 3.92124 9.63691 5.75468H9.64591V6Z" fill="#B3977F"/>
</Svg>


            <Text style={{ fontWeight: 400, fontSize: 10, color: "#58595B" }}>www.companyname.com</Text>
            </View>
            <View style={{width:193,height:1,backgroundColor:"#B3977F"}}></View>

            <View style={{flexDirection:"row",gap:8}}>
            <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M6.0284 5.79743C6.59204 5.79743 7.04894 5.33736 7.04894 4.76982C7.04894 4.20228 6.59204 3.74219 6.0284 3.74219C5.46476 3.74219 5.00781 4.20228 5.00781 4.76982C5.00781 5.33736 5.46476 5.79743 6.0284 5.79743Z" fill="#B3977F"/>
<Path d="M0 0V12H12V0H0ZM8.23624 6.76694L6.00127 10.0194L3.76251 6.76178C2.92697 5.63976 3.04869 3.78824 4.0252 2.80438C4.55318 2.27243 5.25415 1.97935 6.00127 1.97935C6.74711 1.97935 7.4494 2.27243 7.97738 2.80438C8.95389 3.78954 9.07435 5.64105 8.23624 6.76694Z" fill="#B3977F"/>
</Svg>

            <Text style={{ fontWeight: 400, fontSize: 10, color: "#58595B" }}>123, Street Name, Country, 12345</Text>
            </View>
            <View style={{width:193,height:1,backgroundColor:"#B3977F"}}></View>

            </View>

            <View style={{width:193,height:164}}>
                <Image src='/images/services/black.png'></Image>
            </View>
             
             <View style={{flexDirection:"column",gap:16}}>
            <View style={{flexDirection:"column",gap:8}}>
            <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>EDUCATION</Text>
           <View style={{width:230,height:1,backgroundColor:"#B3977F"}}></View>
            </View>
            <View style={{flexDirection:"column",gap:4}}>
           <Text style={{ fontWeight: 700, fontSize: 10, color: "#58595B" }}>2011-2012</Text>
           <Text style={{ fontWeight: 700, fontSize: 10, color: "#58595B" }}>YOUR MAJOR DEGREE</Text>
           <Text style={{ fontWeight: 400, fontSize: 10, color: "#58595B" }}>University Name Here - Location</Text> 
           </View>

           <View>
           <Text style={{ fontWeight: 700, fontSize: 10, color: "#58595B" }}>Pellentesqueaceretfaucibusdolorporttitorllamfinibus nislquisquamegestasblandit.</Text>
           </View>

           <View style={{flexDirection:"column",gap:4}}>
           <Text style={{ fontWeight: 700, fontSize: 10, color: "#58595B" }}>2011-2012</Text>
           <Text style={{ fontWeight: 700, fontSize: 10, color: "#58595B" }}>YOUR MAJOR DEGREE</Text>
           <Text style={{ fontWeight: 400, fontSize: 10, color: "#58595B" }}>Company Name / Location</Text> 
           </View>

           <View>
           <Text style={{ fontWeight: 700, fontSize: 10, color: "#58595B" }}>Pellentesqueaceretfaucibusdolorporttitorllamfinibus nislquisquamegestasblandit.</Text>
           </View>
           </View>

           <View style={{flexDirection:"column",gap:8}}>
            <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>INTERESTS</Text>
           <View style={{width:193,height:1,backgroundColor:"#B3977F"}}></View>
            </View>

            <View style={{flexDirection:"column",gap:12,width:193}}>
            <View style={{flexDirection:"row",gap:8}}>
            <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" ,width:92}}>Hiking</Text>
            <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" ,width:92}}>Singing</Text>
            </View>

            <View style={{flexDirection:"row",gap:8}}>
            <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" ,width:92}}>Dancing</Text>
            <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" ,width:92}}>Gaming</Text>
            </View>

            
           
            </View>

            <View style={{ flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
                <Text style={{ fontSize: 12, fontWeight: "700",color:"#B3977F" }}>LANGAUGES</Text>
                <View style={{ flexDirection: "column", width: 240, gap: 6 }}>
                  {data?.languages?.length > 0 && (
                    <>
                      {data.languages?.map((detail, index) => {
                        const calculateWidthPercentage = (rating) => {
                          let ratingPercentage = 0;
                          if (rating && rating.length > 0) {
                            const zerosCount = rating.filter(
                              (val) => val === 0
                            ).length;

                            if (zerosCount === 0) ratingPercentage = 100;
                            else if (zerosCount === 1) ratingPercentage = 66;
                            else if (zerosCount === 2) ratingPercentage = 33;
                          }
                          return ratingPercentage;
                        };
                        const ratingPercentage = calculateWidthPercentage(
                          detail.rating
                        );
                        return (
                          <View style={{ width: "100%", flexDirection: "column" }} key={index}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                              <Text style={{ color: "#414142",  fontSize: 11.136, width: 80, fontWeight: "light" }}>
                                {detail.languages}
                              </Text>
                              <View style={{ width: "59.21%", height: 3.78, alignSelf: "flex-end", marginBottom: 1, backgroundColor: "#C1C1C1" }}>
                                <View
                                  style={{ height: "100%", backgroundColor: "#282829", width: `${ratingPercentage}%` }}
                                ></View>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </>
                  )}
                </View>
              </View>



           

           </View>

           </View>
           
           
        </Page>
    )
}

export default Template35
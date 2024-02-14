import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect,Font,Defs, ClipPath } from '@react-pdf/renderer';

function Template15({ data }) {
  return (

   <Page>
   <View style={{width:595,height:840,paddingHorizontal:20,paddingVertical:10,gap:15,flexDirection:'column',alignContent:'center',justifyContent:'start'}} >
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:550,gap:25}}>
    <View style={{width:173,flexDirection:'column',gap:20}}>
        <View style={{width:140,gap:12}}>
            <View style={{maxWidth:140}}>
                <Text style={{fontSize:28,fontWeight:700}}>{data.firstName}</Text ><Text style={{fontSize:28,fontWeight:700}}>{data.lastName}</Text>
            </View>
            <Text style={{fontSize:12,fontWeight:400 ,maxWidth:140}}>{data.designation}</Text>
        </View>
        <View style={{flexDirection:'column',gap:14 , width:130 , gap:4}}>
            <View style={{maxWidth:120 , gap:6,flexDirection: "row", alignItems: "center",}}>
            <Image
                src={("/images/services/phone.png")}
                  style={{ width: 16, height: 16, }}
                />
<Text style={{ fontSize: 10, fontWeight: "400", color: "#282627" }}>{data.mobileNumber}</Text>
            </View>
            <View style={{maxWidth:130 , gap:6,flexDirection: "row", alignItems: "center",}}>
            <Image
                src={("/images/services/emaill.png")}
                  style={{ width: 16, height: 16, }}
                />
<Text style={{ fontSize: 10, fontWeight: "400", color: "#282627" }}>{data.email}</Text>
            </View>
            <View style={{maxWidth:120 , gap:6,flexDirection: "row", alignItems: "center",}}>
            <Image
                src={("/images/services/locat.png")}
                  style={{ width: 16, height: 16, }}
                />
<Text style={{ fontSize: 10, fontWeight: "400", color: "#282627" }}>{data.location}</Text>
            </View>

        </View>

        </View>
       <View style={{height:170,width:145}}>
             {data.profilePhoto ? (
                <Image
                  src={{ uri: URL.createObjectURL(data.profilePhoto) }}
                  style={{ width: 140, height: 170,}}
                />
              ) : (
                <Image
                src={("/images/services/bgman.png")}
                  style={{ width: 140, height: 170, }}
                />
              )}
           </View>
        <View style={{height:170,width:173,flexDirection:'column',gap:4,alignItems:'start' , justifyContent:'flex-start'}}>
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#282627" }}>About</Text>
            <Text style={{ fontSize: 10, fontWeight: "400", color: "#6D6E71",maxWidth:170 }}>{data.summery}</Text>

        </View>
    </View>
   
   <View style={{backgroundColor:'#8F9193',height:'1px',width:'550'}}></View>
   <View style={{gap:13,flexDirection:'row',width:550}}>
     <View style={{width:170,gap:4}}>
     <Text style={{ fontSize: 12, fontWeight: "400" }}>LANGUAGE</Text>
     <View style={{ flexDirection: "column", width: 170, gap: 6 }}>
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
                              <Text style={{ color: "#414142",  fontSize: 12, width: 60, fontWeight: "light" }}>
                                {detail.languages}
                              </Text>
                              <View style={{ width: "59.21%", height: 3.78, alignSelf: "center", backgroundColor: "#A9AAAA" }}>
                                <View
                                  style={{ height: "100%", backgroundColor: "#6D6E71", width: `${ratingPercentage}%` }}
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
    <View style={{width:170,gap:4}}>
                <Text style={{ fontSize: 12, fontWeight: "400" }}>SKILLS</Text>
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
                          <Text style={{ color: "#414142", fontSize: 12, width: 80, fontWeight: "light" }}>
                            {detail.skill}
                          </Text>
                          <View style={{ width: "59.21%", height: 3.78, alignSelf: "flex-end", marginBottom: 1, backgroundColor: "#A9AAAA" }}>
                            <View
                              style={{ height: "100%", backgroundColor: "#6D6E71", width: `${ratingPercentage}%` }}
                            ></View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
    </View>
    <View style={{width:170,gap:4}}>
                <Text style={{ fontSize: 12, fontWeight: "400" }}>SOFTWARE</Text>
                {/* <View style={{ flexDirection: "column", width: 170, gap: 6 }}>
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
                          <Text style={{ color: "#414142", fontSize: 12, width: 80, fontWeight: "light" }}>
                            {detail.skill}
                          </Text>
                          <View style={{ width: "59.21%", height: 3.78, alignSelf: "flex-end", marginBottom: 1, backgroundColor: "#A9AAAA" }}>
                            <View
                              style={{ height: "100%", backgroundColor: "#6D6E71", width: `${ratingPercentage}%` }}
                            ></View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View> */}
    </View>

   </View>
   <View style={{backgroundColor:'#8F9193',height:'1px',width:'550'}}></View>
    
    <View style={{width:550,flexDirection:'row', gap:20}}>
    <View style={{width:150,flexDirection:'column' ,gap:12}}>
        <View style={{gap:10,flexDirection:'column'}}>
            <Text style={{fontSize:12,fontWeight:400}}>
            EDUCATION
            </Text>
            {
                data?.education?.map((detail,index) => (
                    <>
         <View style={{flexDirection:'column',gap:4 ,maxWidth:150}}>
              <View style={{flexDirection:'row' , gap:6,alignItems:'center'}}>
              <Svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M3 6.65625C4.65685 6.65625 6 5.3131 6 3.65625C6 1.9994 4.65685 0.65625 3 0.65625C1.34315 0.65625 0 1.9994 0 3.65625C0 5.3131 1.34315 6.65625 3 6.65625Z" fill="#5E5F5E"/>
</Svg>

                 <Text style={{fontSize:12,fontWeight:400}}> {detail.duration?.start?.year}-
                              {detail.duration?.end?.year}</Text>
              </View>
              <View style={{gap:8,flexDirection:'column',justifyContent:'start',alignItems:'start'}}>
               <Text style={{fontSize:12,fontWeight:400,color:'#282627',maxWidth:150}}> {detail.qualification}</Text>
               <Text style={{fontSize:12,fontWeight:400,color:'#6D6E71',maxWidth:150}}> {detail.instituteName}</Text>
               <Text style={{fontSize:12,fontWeight:400,color:'#6D6E71',maxWidth:150}}>{detail.specialization}</Text>
              </View>
            </View> 
                    
        </>
                ))
            }
        </View>

        {/* HOBBBE  */}

        <View style={{flexDirection:'column' ,maxWidth:150,paddingTop:10}}>
            <Text style={{fontWeight:400,fontSize:12,color:'#282627'}}>HOBBIES</Text>
            {data.hobbies?.map((detail, index) => (
        <View key={index} style={{ flexDirection: "column", }}>
          <View style={{ flexDirection: "row", alignItems: "center",gap:4  }}>
            <Text style={{  color: "#282829", }}>&#8226;</Text>
            <Text style={{ color: "#5E5F5E" ,fontSize:10}}>{detail.title}</Text>
          </View>
        </View>
      ))}
        </View>

            {/* AWORD  */}
        <View style={{flexDirection:'column' ,maxWidth:150,paddingTop:10}}>
            <Text style={{fontWeight:400,fontSize:12,color:'#282627'}}>AWARDS</Text>
            {/* {data.hobbies?.map((detail, index) => (
        <View key={index} style={{ flexDirection: "column", }}>
          <View style={{ flexDirection: "row", alignItems: "center",gap:4  }}>
            <Text style={{  color: "#282829", }}>&#8226;</Text>
            <Text style={{ color: "#5E5F5E" ,fontSize:10}}>{detail.title}</Text>
          </View>
        </View>
      ))} */}
        </View>
         
    </View>
    <View style={{flexDirection:'column',width:400 , gap:12}}>
    <Text style={{ fontSize: 12, fontWeight: "400" }}> EXPERIENCE</Text>
    <View style={{width:40}}>
        <View>
            
        </View>
        <View style={{width:360,flexDirection:'column', gap:10}}>

        {
            data.experience?.map((detail,index) => (
                <>
        <View style={{width:340,flexDirection:'row', gap:10}}>
            <View style={{width:40}} >
           
                      <Text style={{ fontSize: 14, fontWeight: "normal",color:'#282627' }}>
                          {" "}
                          {detail.duration?.start?.year}-{" "} <br/>
                          {detail.currentlyWorking
                            ? "Present"
                            : detail.duration?.end?.year}
                        </Text>
                      
            </View>
            <View style={{gap:8,flexDirection:'column'}}>
            <View style={{gap:4,flexDirection:'row'}}>
    <Text style={{ fontSize: 14, fontWeight: "400" , color:'#2C363D' }}>     {detail.organization} -    {detail.designation}</Text>
            
            </View>
             <Text style={{ fontSize: 10, fontWeight: "400" ,color:'#6D6E71'}}> {detail.description}</Text>
            </View>
        </View>
       
                </>
            ))
        }
        </View>
       
        {/* <View style={{width:360,flexDirection:'column'}}>
        <View style={{width:340,flexDirection:'row', gap:10}}>
            <View style={{width:40,flexDirection:'column', gap:2}} >
            <Text style={{ fontSize: 16, fontWeight: "400",color:'#282627' }}>
                        2020
                      </Text> 
                <Text style={{ fontSize: 16, fontWeight: "400",color:'#8F9193' }}>
                        2024
                       
                      </Text>
            </View>
            <View style={{gap:8,flexDirection:'column'}}>
            <View style={{gap:4,flexDirection:'row'}}>
    <Text style={{ fontSize: 14, fontWeight: "400" , color:'#2C363D' }}> EDUCATION</Text>
    <Text style={{ fontSize: 14, fontWeight: "400" , color:'#2C363D'}}> EDUCATION</Text>
            
            </View>
             <Text style={{ fontSize: 10, fontWeight: "400" ,color:'#6D6E71'}}>HIIIIIIIIIIII</Text>
            </View>
        </View>
        </View> */}

    </View>
         
 
    </View>
    </View>

   </View>

   </Page>
  );
}

export default Template15;


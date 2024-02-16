
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';

import React from 'react'


function Template7({data}) {
  return (
    <>
   {console.log(10,data)}
    <Page size='A4'>
    <View style={{width:'595px', minHeight:792 ,backgroundColor:'#F5F7FB',gap:35, padding:24}}>
     <View style={{marginTop:32, marginLeft:48,width:332,display:'flex',flexDirection:'row',gap:38,alignItems:'flex-start',justifyContent:"center"}}>
     <View style={{width:106,height:106,borderRadius:106,border:6,borderColor:'#0077F9'}}>
   <Image src="/images/profile/john_doe.png" />
     </View>
     <View style={{display:'flex',justifyContent:'space-between' , flexDirection:'column',height:'100%'}}>
       <Text style={{fontSize:32 , fontWeight:300}}>{data.firstName}</Text>
       <Text style={{fontSize:32 , fontWeight:700}}>{data.lastName}</Text>
       <Text style={{fontSize:14 ,color:'#828186' , fontWeight:400}}>{data.designation}</Text>
     </View>
     </View>

     <View style={{width:547,display:'flex',flexDirection:'column', gap:24}}>

        <View style={{width:'547px',display:'flex',flexDirection:'row'}}>
            <View style={{width:236,padding:'12px 18px', wordBreak: "break-word", backgroundColor:'#FFFFFF'}}>
             <Text style={{fontSize:10, fontWeight:400, color:'#36434E'}}>{data.location}</Text>
            </View>

            <View style={{width:312 ,padding:'12px 18px', wordBreak: "break-word", backgroundColor:'#0077F9',display:'flex'}}>
            <Text style={{fontSize:10, fontWeight:400, color:'#FFFFFF'}}>www.websiteexample.com  |  (000) 123-45678</Text>
           </View>

        </View>

        <View style={{display:'flex',width:547, flexDirection:'row',gap:24}}>

         <View style={{width:390, backgroundColor:'#FFFFFF',minHeight:560,padding:24,gap:20}}>
         
          <View style={{display:'flex', alignItems:'flex-start' , wordBreak: "break-word",gap:16}}>
            <Text style={{fontSize:14,fontWeight:700,color:'#222933'}}>ABOUT ME</Text>
            <Text style={{fontSize:'10px',fontWeight:400,color:'#828186'}}>{data.summery} </Text>
          </View>

         
          <View style={{display:'flex', alignItems:'flex-start' , wordBreak: "break-word",gap:16}}>
            <Text style={{fontSize:14,fontWeight:700,color:'#222933'}}>EXPERIENCE</Text>
            <View style={{display:'flex' , gap:6,flexDirection:'column'}}>
            {data.experience?.map((detail, index) => (
                <>
            <Text style={{fontSize:'10px',fontWeight:400,color:'#828186'}}>{" "}{detail.duration?.start?.year}-{" "}{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>
            <Text style={{fontSize:'12px',fontWeight:600,color:'#222933'}}>{detail.designation} </Text>
            <Text style={{fontSize:'10px',fontWeight:500,color:'#828186'}}>{detail.location}  </Text>
            <Text style={{fontSize:'10px',fontWeight:400,color:'#828186'}}>{detail.description} </Text>
            </>
            ))}
            </View>
          </View>

          {data?.hobbies?.length > 0 && (
          <View style={{display:'flex', alignItems:'flex-start' , wordBreak: "break-word",gap:16}}>
            <Text style={{fontSize:14,fontWeight:700,color:'#222933'}}>HOBBIES</Text>
            <View style={{display:'flex' , gap:10,flexDirection:'column'}}>
            {data?.hobbies?.map((item, index) => (
                <View style={{ display: 'flex',flexDirection:'row', gap: 10,width:158, justifyContent: "space-between", width: "100%" }}>
                <Text style={{width:48,fontSize:'10px',fontWeight:400,color:'#828186'}}>{item?.title}</Text>
           
            </View>
            ))}
          </View>
       </View>
          )}

{/* here course remaining */}
{data?.course?.length > 0 && (

<View style={{display:'flex', alignItems:'flex-start' , wordBreak: "break-word",gap:16}}>
            <Text style={{fontSize:14,fontWeight:700,color:'#222933'}}>COURSES</Text>
            <View style={{display:'flex' , gap:6,flexDirection:'column'}}>
            {data?.course?.map((detail, index) => (
                <>
            <Text style={{fontSize:'10px',fontWeight:400,color:'#828186'}}>{detail?.duration?.start} - {detail?.duration?.end} </Text>
            <Text style={{fontSize:'12px',fontWeight:600,color:'#222933'}}>{detail?.courseName} </Text>
            <Text style={{fontSize:'10px',fontWeight:500,color:'#828186'}}>{detail?.issuedBy} </Text>
            </>
            ))}
            </View>
          </View>
           )}


         </View>

         <View style={{width:158 , display:'flex',gap:38,flexDirection:'column', wordBreak: "break-word"}}>

         <View style={{display:'flex', alignItems:'flex-start' , wordBreak: "break-word",gap:16}}>
            <Text style={{fontSize:14,fontWeight:700,color:'#222933'}}>EDUCATION</Text>
            <View style={{display:'flex' , gap:6,flexDirection:'column'}}>
            {data?.education?.map((detail, index) => (
                <>
            <Text style={{fontSize:'10px',fontWeight:400,color:'#828186'}}>{" "}{detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>
            <Text style={{fontSize:'12px',fontWeight:600,color:'#222933'}}>{detail.instituteName} </Text>
            <Text style={{fontSize:'10px',fontWeight:500,color:'#828186'}}>{detail.qualification} - {detail.specialization} </Text>
            </>
                    ))}
            </View>
          </View>

          <View style={{height:1,backgroundColor:'#36434E',width:158}}></View>

          {data?.skills?.length > 0 && (
          <View style={{display:'flex', alignItems:'flex-start' , wordBreak: "break-word",gap:16}}>
            <Text style={{fontSize:14,fontWeight:700,color:'#222933'}}>SKILLS</Text>
            <View style={{display:'flex' , gap:10,flexDirection:'column'}}>
            {data?.skills?.map((detail, index) => (
                <View style={{ display: 'flex',flexDirection:'row', gap: 10,width:158, justifyContent: "space-between", width: "100%" }}>
                <Text style={{width:48,fontSize:'10px',fontWeight:400,color:'#828186'}}>{detail.skill}</Text>
                
                <View style={{width:90,justifyContent:'space-between',display:'flex',flexDirection:'row'}}>
                {[...Array(5)].map((_, i) => (
                                            <View key={i}>
                                                {
                                                    detail.rating[i] === 0 ? (
                                                        <Svg xmlns="http://www.w3.org/2000/svg" width="8" height="7" viewBox="0 0 8 7" fill="none">
                                                            <Path fillRule="evenodd" clipRule="evenodd" d="M4.02911 0.285156C2.23911 0.285156 0.789062 1.73615 0.789062 3.52515C0.789062 5.31415 2.24011 6.76514 4.02911 6.76514C5.81811 6.76514 7.2691 5.31415 7.2691 3.52515C7.2691 1.73615 5.81811 0.285156 4.02911 0.285156Z" fill="#D1D3D4" />
                                                        </Svg>
                                                    ) : (
                                                        <Svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                            <Path fillRule="evenodd" clipRule="evenodd" d="M4.02911 0.886719C2.23911 0.886719 0.789062 2.33771 0.789062 4.12671C0.789062 5.91571 2.24011 7.36676 4.02911 7.36676C5.81811 7.36676 7.2691 5.91571 7.2691 4.12671C7.2691 2.33771 5.81811 0.886719 4.02911 0.886719Z" fill="#00AEEF" />
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

{data?.languages?.length > 0 && (
          <View style={{display:'flex', alignItems:'flex-start' , wordBreak: "break-word",gap:16}}>
            <Text style={{fontSize:14,fontWeight:700,color:'#222933'}}>LANGUAGES</Text>
            <View style={{display:'flex' , gap:10,flexDirection:'column'}}>
            {data?.languages?.map((detail, index) => (
                <View style={{ display: 'flex',flexDirection:'row', gap: 10,width:158, justifyContent: "space-between", width: "100%" }}>
                <Text style={{width:48,fontSize:'10px',fontWeight:400,color:'#828186'}}>{detail.languages}</Text>
                {[...Array(3)].map((_, i) => (
                                            <View key={i}>
                                                {
                                                    detail.rating[i] === 0 ? (
                                                        <Svg width={8} height={7} viewBox="0 0 8 7">
                                                        <Path fillRule="evenodd" clipRule="evenodd" d="M4.02911 0.285156C2.23911 0.285156 0.789062 1.73615 0.789062 3.52515C0.789062 5.31415 2.24011 6.76514 4.02911 6.76514C5.81811 6.76514 7.2691 5.31415 7.2691 3.52515C7.2691 1.73615 5.81811 0.285156 4.02911 0.285156Z" fill="#D1D3D4" />
                                                      </Svg>
                                                    ) : (
                                                        <Svg width={8} height={8} viewBox="0 0 8 8">
          <Path fillRule="evenodd" clipRule="evenodd" d="M4.02911 0.886719C2.23911 0.886719 0.789062 2.33771 0.789062 4.12671C0.789062 5.91571 2.24011 7.36676 4.02911 7.36676C5.81811 7.36676 7.2691 5.91571 7.2691 4.12671C7.2691 2.33771 5.81811 0.886719 4.02911 0.886719Z" fill="#00AEEF" />
        </Svg>
                                                    )
                                                }
                                            </View>
                                        ))}
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
    </>
  )
}

export default Template7
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect, Font, Defs, ClipPath, data } from '@react-pdf/renderer';
import React from 'react'

const Template55 = () => {
  return (
    <Page size="A4" >

         <View style={{width:595,display:"flex",flexDirection:"row"}}>

          <View style={{width:215,paddingHorizontal:21,paddingVertical:24,backgroundColor:"#1D2839",justifyContent:"space-between",alignItems:"center",maxHeight:848,gap:34}}>
         
         <View>
          <Image style={{ width: 133, height: 133 }} src="/images/services/Vector.png"></Image>
          </View>
         
          <View style={{display:"flex",flexDirection:"column",gap:16,justifyContent:"center",alignItems:"center"}}>
          <View><Text style={{ fontSize: 16, color: "#FC9206",fontFamily:"Montserrat 700" }}>CONTACT</Text></View>
          <View style={{display:"flex",flexDirection:"column",gap:16}}>
            <Text style={{  fontSize: 12, color: "#FFFFFF",fontFamily:"Montserrat 400" }}>+000 123 456 789</Text>
            <Text style={{  fontSize: 12, color: "#FFFFFF" , fontFamily:"Montserrat 400"}}>mfranci@mail.com</Text>
            <Text style={{ fontSize: 12, color: "#FFFFFF", fontFamily:"Montserrat 400"}}>marcusfranci.com</Text>
            <Text style={{  fontSize: 12, color: "#FFFFFF", fontFamily:"Montserrat 400" }}>Street name, 370. CA</Text>            
            </View>
          </View>

          <View style={{backgroundColor:"#FFFFFF",width:68,height:2}}></View>

          <View style={{display:"flex",flexDirection:"column",gap:16,justifyContent:"center",alignItems:"center"}}>
          <View><Text style={{  fontSize: 16, color: "#FC9206",fontFamily:"Montserrat 700" }}>SKILLS</Text></View>
          <View style={{display:"flex",flexDirection:"column",gap:16}}>
            <Text style={{  fontSize: 12, color: "#FFFFFF",fontFamily:"Montserrat 400" }}>Skill 1</Text>
            <Text style={{  fontSize: 12, color: "#FFFFFF" ,fontFamily:"Montserrat 400"}}>Skill 2</Text>
            <Text style={{  fontSize: 12, color: "#FFFFFF" ,fontFamily:"Montserrat 400"}}>Skill 3</Text>
            <Text style={{  fontSize: 12, color: "#FFFFFF",fontFamily:"Montserrat 400" }}>Skill 4</Text>            
            </View>
          </View>

          <View style={{backgroundColor:"#FFFFFF",width:68,height:2}}></View>
         
          <View style={{display:"flex",flexDirection:"column",gap:16,justifyContent:"center",alignItems:"center"}}>
          <View><Text style={{ fontSize: 16, fontStyle:"Montserrat 700" ,color:"#FC9206"}}>LANGUAGES</Text></View>
          <View style={{display:"flex",flexDirection:"column",gap:16}}>
            <Text style={{  fontSize: 12, color: "#FFFFFF" ,fontStyle:"Montserrat 400" }}>English</Text>
            <Text style={{  fontSize: 12, color: "#FFFFFF",fontStyle:"Montserrat 400"  }}>Hindi</Text>
            <Text style={{  fontSize: 12, color: "#FFFFFF" ,fontStyle:"Montserrat 400" }}>Marathi</Text>
          </View>
          </View>
         
          </View>





          <View style={{width:380,display:"flex",flexDirection:"column",}}>
            
            <View style={{display:"flex",flexDirection:"column",paddingTop:78}}>
            <View style={{display:"flex",flexDirection:"column",backgroundColor:"#FC9206",paddingVertical:10,paddingHorizontal:24}}>
            <Text style={{ fontSize: 22, color: "#FFFFFF",fontFamily:"Montserrat 700" }}>MARCUS FRANCI</Text>
            <Text style={{fontSize: 16, color: "#020202",fontFamily:"Montserrat 400" }}>GRAPHIC DESIGNER</Text>
            </View>
            <View style={{width:380,height:5,backgroundColor:"#FC9206"}}></View>
            </View>

            <View style={{width:314,paddingTop:24,paddingLeft:42,paddingLeft:24,gap:24}}>

              <View style={{display:"flex",flexDirection:"column",gap:8}}>
                <View style={{display:"flex",flexDirection:"row",gap:8}}>
              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M10.0004 10.3686C12.5221 10.3686 14.5732 8.30693 14.5732 5.7722C14.5732 3.23748 12.5221 1.17578 10.0004 1.17578C9.18217 1.17578 8.37846 1.39712 7.67649 1.81508C7.3814 1.99148 7.28415 2.37348 7.45964 2.67122C7.6329 2.96783 8.01408 3.06559 8.31141 2.89032C8.82112 2.58584 9.40571 2.42628 10.0015 2.42628C11.838 2.42628 13.3325 3.92735 13.3325 5.77333C13.3325 7.6182 11.838 9.12039 10.0015 9.12039C8.22086 9.12039 6.76102 7.72157 6.67607 5.93625C6.6593 5.59132 6.35863 5.32841 6.02553 5.34189C5.68349 5.35874 5.41856 5.65087 5.43532 5.9958C5.54934 8.44738 7.55578 10.3686 10.0004 10.3686Z" fill="#FC9206"/>
<Path d="M6.10998 4.83613C6.18715 4.86871 6.26766 4.88333 6.34818 4.88333C6.59197 4.88333 6.82345 4.73841 6.92298 4.49688C7.02922 4.2385 7.16902 3.99247 7.33901 3.76441C7.54478 3.48806 7.48774 3.09711 7.21376 2.89041C6.93865 2.68258 6.54836 2.741 6.34371 3.01623C6.11222 3.32741 5.91987 3.66555 5.77448 4.02055C5.64252 4.33847 5.79238 4.70357 6.10998 4.83613Z" fill="#FC9206"/>
<Path d="M10.0002 10.8789C6.04215 10.8789 2.94141 14.0934 2.94141 18.1966C2.94141 18.5415 3.21974 18.8213 3.5629 18.8213C3.90606 18.8213 4.18439 18.5415 4.18439 18.1966C4.18439 14.7933 6.73965 12.1283 10.0002 12.1283C13.2619 12.1283 15.8161 14.7933 15.8161 18.1966C15.8161 18.5415 16.0944 18.8213 16.4376 18.8213C16.7807 18.8213 17.0591 18.5415 17.0591 18.1966C17.0591 14.0945 13.9583 10.8789 10.0002 10.8789Z" fill="#FC9206"/>
</Svg>

              <Text style={{fontSize: 16, color: "#1D2839",fontFamily:"Montserrat 700" }}>PROFILE</Text>
              </View>
              <View><Text style={{fontSize: 12, color: "#626787",fontFamily:"Montserrat 700" }}>MyNameIsLauraAndersonloremempusidfringillamolestieornarediaminolestirosnollicitudinestMyNiu ringilla lorem ipsum.</Text></View>
              </View>

              <View style={{width:46,height:3,backgroundColor:"#FF9906"}}></View>

              <View>
              
              <View style={{display:"flex",flexDirection:"column",gap:14}}>
                <View style={{display:"flex",flexDirection:"row",gap:8}}>
                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M2.14964 1.625C1.85647 1.625 1.61719 1.86374 1.61719 2.15863V11.7754C1.61719 12.0692 1.85647 12.309 2.14964 12.309H15.8488C16.1419 12.309 16.3812 12.0692 16.3812 11.7754V2.15863C16.3812 1.86482 16.1419 1.625 15.8488 1.625H2.14964ZM15.5718 11.4988H2.42664V2.43622H15.5718V11.4988Z" fill="#FC9206"/>
<Path d="M16.4691 0.00195312H1.5305C0.685493 0.00195312 0 0.688958 0 1.53581V12.3959C0 13.2427 0.685493 13.9297 1.5305 13.9297H6.42165V15.5694H5.00001C4.60121 15.5694 4.27895 15.8924 4.27895 16.2921V18.002H13.7261L13.739 16.2921C13.739 15.8935 13.4156 15.5694 13.0179 15.5694H11.5963V13.9297H16.4691C17.3141 13.9297 17.9996 13.2427 17.9996 12.3959V7.91206C17.9996 7.68414 17.8121 7.50051 17.5825 7.50699C17.3615 7.51347 17.1902 7.70685 17.1902 7.92936V12.3969C17.1902 12.7955 16.8668 13.1196 16.4691 13.1196H1.5305C1.13279 13.1196 0.809435 12.7955 0.809435 12.3969V1.53581C0.809435 1.13723 1.13279 0.813171 1.5305 0.813171H16.4691C16.8679 0.813171 17.1902 1.13615 17.1902 1.53581V3.14635C17.1902 3.36994 17.3712 3.55141 17.5943 3.55141C17.8175 3.55141 17.9985 3.36994 17.9985 3.14635V1.53581C17.9996 0.688958 17.3141 0.00195312 16.4691 0.00195312ZM12.9296 16.3796V17.1908H5.08732V16.3796H12.9296ZM7.23002 13.9286H10.7868V15.5683H7.23002V13.9286Z" fill="#FC9206"/>
<Path d="M17.5938 4.25391C17.3706 4.25391 17.1895 4.43535 17.1895 4.65892V6.00246C17.1895 6.22495 17.3598 6.4183 17.582 6.42478C17.8116 6.43126 17.9993 6.24766 17.9993 6.01977V4.66001C17.9993 4.43536 17.8181 4.25391 17.5938 4.25391Z" fill="#FC9206"/>
</Svg>


              <Text style={{fontSize: 16, color: "#1D2839",fontFamily:"Montserrat 700" }}>WORK EXPERIENCE</Text>
              </View>
            
               <View style={{display:"flex",flexDirection:"column",gap:24}}>
               <View style={{display:"flex",flexDirection:"column",gap:"2"}}>
              <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>    
<Text style={{ fontSize: 12, color: "#1D2839" ,fontFamily:"Montserrat 700"}}>JOB ROLE</Text>
<Text style={{  fontSize: 12,color: "#626787",fontFamily:"Montserrat 400"}}>2010-2014</Text>
              </View>
              <Text style={{  fontSize: 12,color: "#626787",fontFamily:"Montserrat 700"}}>COMPANY NAME</Text>
              <Text style={{  fontSize: 10,color: "#626787",fontFamily:"Montserrat 400"}}>MyNameIsLauraAndersonloremempusidfringillamolestieornarediaminolestirosnollicitudinestMyNiu ringilla lorem ipsum.</Text>
              </View>

              <View style={{display:"flex",flexDirection:"column",gap:"2"}}>
              <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>    
<Text style={{ fontSize: 12, color: "#1D2839" ,fontFamily:"Montserrat 700"}}>JOB ROLE</Text>
<Text style={{  fontSize: 12,color: "#626787",fontFamily:"Montserrat 400"}}>2010-2014</Text>
              </View>
              <Text style={{  fontSize: 12,color: "#626787",fontFamily:"Montserrat 700"}}>COMPANY NAME</Text>
              <Text style={{  fontSize: 10,color: "#626787",fontFamily:"Montserrat 400"}}>MyNameIsLauraAndersonloremempusidfringillamolestieornarediaminolestirosnollicitudinestMyNiu ringilla lorem ipsum.</Text>
              </View>
              </View>


              </View>

              </View>

              <View style={{display:"flex",height:3,width:46,backgroundColor:"#FF9906"}}></View>


             <View style={{display:"flex",flexDirection:"column",gap:14}}>
              <View>
            <View style={{display:"flex",flexDirection:"row",gap:8}}>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M19 12.357C19 11.5907 18.5165 10.9366 17.8425 10.6939V7.78291C17.8425 7.45189 17.6501 7.15095 17.3531 7.01553L14.5733 5.75567C14.2812 5.62326 13.9398 5.75667 13.8095 6.05358C13.6792 6.3505 13.8105 6.69755 14.1026 6.82996L16.2044 7.78291L13.9526 8.80407C13.9486 8.80607 13.9457 8.80708 13.9417 8.80909L9.42224 10.8574L4.90177 8.80909C4.89881 8.80809 4.89584 8.80605 4.89189 8.80505L2.63907 7.78389L9.42125 4.71045L11.7027 5.74458C11.9948 5.87699 12.3362 5.74358 12.4665 5.44667C12.5967 5.14975 12.4655 4.80269 12.1734 4.67029L9.75774 3.57493C9.54361 3.47763 9.2989 3.47763 9.08476 3.57493L1.48945 7.01755C1.19243 7.15197 1 7.45391 1 7.78493C1 8.11596 1.19243 8.41684 1.48945 8.55225L4.09062 9.73088V14.5809C4.09062 15.0553 4.38666 15.4827 4.82677 15.6432C6.02078 16.0775 7.09145 16.4897 9.32752 16.5018C11.4649 16.5128 12.8918 16.0504 14.0138 15.6432C14.4549 15.4837 14.7509 15.0563 14.7509 14.5799V9.73088L16.685 8.85421V10.6959C16.011 10.9386 15.5275 11.5927 15.5275 12.359C15.5275 13.332 16.3061 14.1235 17.2633 14.1235C18.2214 14.1204 19 13.329 19 12.357ZM13.5875 14.5458C12.4675 14.951 11.4106 15.3322 9.33343 15.3222C7.35887 15.3121 6.35037 14.945 5.28168 14.5558L5.24714 14.5438V10.2525L9.08377 11.9909C9.2979 12.0882 9.54263 12.0882 9.75677 11.9909L13.5934 10.2525V14.5438L13.5875 14.5458ZM17.2633 12.9448C16.9445 12.9448 16.685 12.681 16.685 12.357C16.685 12.033 16.9445 11.7692 17.2633 11.7692C17.582 11.7692 17.8415 12.033 17.8415 12.357C17.8425 12.681 17.583 12.9448 17.2633 12.9448Z" fill="#FC9206"/>
</Svg>
<Text style={{ fontSize: 16, color: "#1D2839",fontFamily:"Montserrat 700"}}>EDUCATION</Text>
            </View>
            </View>
            
            <View style={{display:"flex",flexDirection:"column",gap:24}}>
            <View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={{  fontSize: 12, color: "#1D2839",fontStyle:"Montserrat 700" }}>DEGREE NAME IN SPECIALIZATION</Text>
            <Text style={{  fontSize: 12, color: "#626787",fontStyle:"Montserrat 400" }}>2010-2014</Text>
            </View>
            <View>
            <Text style={{  fontSize: 12, color: "#626787",fontStyle:"Montserrat 700" }}>INSTITUTE NAME</Text>
            </View>
            </View>
           
            <View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={{  fontSize: 12, color: "#1D2839",fontStyle:"Montserrat 700" }}>DEGREE NAME IN SPECIALIZATION</Text>
            <Text style={{  fontSize: 12, color: "#626787",fontStyle:"Montserrat 400" }}>2010-2014</Text>
            </View>
            <View>
            <Text style={{  fontSize: 12, color: "#626787",fontStyle:"Montserrat 700" }}>INSTITUTE NAME</Text>
            </View>
            </View>
            </View>




            </View>

            <View style={{width:46,height:3,backgroundColor:"#FF9906"}}></View>
 
            <View style={{display:"flex",flexDirection:"column",gap:14}}>
              <View>
            <View style={{display:"flex",flexDirection:"row",gap:8}}>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M19 12.357C19 11.5907 18.5165 10.9366 17.8425 10.6939V7.78291C17.8425 7.45189 17.6501 7.15095 17.3531 7.01553L14.5733 5.75567C14.2812 5.62326 13.9398 5.75667 13.8095 6.05358C13.6792 6.3505 13.8105 6.69755 14.1026 6.82996L16.2044 7.78291L13.9526 8.80407C13.9486 8.80607 13.9457 8.80708 13.9417 8.80909L9.42224 10.8574L4.90177 8.80909C4.89881 8.80809 4.89584 8.80605 4.89189 8.80505L2.63907 7.78389L9.42125 4.71045L11.7027 5.74458C11.9948 5.87699 12.3362 5.74358 12.4665 5.44667C12.5967 5.14975 12.4655 4.80269 12.1734 4.67029L9.75774 3.57493C9.54361 3.47763 9.2989 3.47763 9.08476 3.57493L1.48945 7.01755C1.19243 7.15197 1 7.45391 1 7.78493C1 8.11596 1.19243 8.41684 1.48945 8.55225L4.09062 9.73088V14.5809C4.09062 15.0553 4.38666 15.4827 4.82677 15.6432C6.02078 16.0775 7.09145 16.4897 9.32752 16.5018C11.4649 16.5128 12.8918 16.0504 14.0138 15.6432C14.4549 15.4837 14.7509 15.0563 14.7509 14.5799V9.73088L16.685 8.85421V10.6959C16.011 10.9386 15.5275 11.5927 15.5275 12.359C15.5275 13.332 16.3061 14.1235 17.2633 14.1235C18.2214 14.1204 19 13.329 19 12.357ZM13.5875 14.5458C12.4675 14.951 11.4106 15.3322 9.33343 15.3222C7.35887 15.3121 6.35037 14.945 5.28168 14.5558L5.24714 14.5438V10.2525L9.08377 11.9909C9.2979 12.0882 9.54263 12.0882 9.75677 11.9909L13.5934 10.2525V14.5438L13.5875 14.5458ZM17.2633 12.9448C16.9445 12.9448 16.685 12.681 16.685 12.357C16.685 12.033 16.9445 11.7692 17.2633 11.7692C17.582 11.7692 17.8415 12.033 17.8415 12.357C17.8425 12.681 17.583 12.9448 17.2633 12.9448Z" fill="#FC9206"/>
</Svg>
<Text style={{ fontSize: 16, color: "#1D2839",fontFamily:"Montserrat 700"}}>CERTIFICATION</Text>
            </View>
            </View>
            
            <View style={{display:"flex",flexDirection:"column",gap:24}}>
            <View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={{  fontSize: 12, color: "#1D2839",fontStyle:"Montserrat 700" }}>CERTIFICATION NAME</Text>
            <Text style={{  fontSize: 12, color: "#626787",fontStyle:"Montserrat 400" }}>2010-2014 (DURATION)</Text>
            </View>
            <View>
            <Text style={{  fontSize: 12, color: "#626787",fontStyle:"Montserrat 700" }}>PROVIDER NAME</Text>
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

export default Template55
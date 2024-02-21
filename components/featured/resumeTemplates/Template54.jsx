import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect, Font, Defs, ClipPath, data } from '@react-pdf/renderer';
import React from 'react'

const Template54 = () => {
  return (
    <Page size="A4" >

    <View style={{width:595 ,display:"flex",flexDirection:"row"}}>

    <View style={{width:207,padding:24,backgroundColor:"#252829",display:"flex",flexDirection:"column",gap:40,minHeight:841}}>

        <View style={{display:"flex",flexDirection:"column",gap:12}}>
        <View style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}><Image style={{ width: 113, height: 113 }} src="/images/services/Marry.png"></Image></View>
        <View style={{display:"flex",flexDirection:"column",gap:4,justifyContent:"center",alignItems:"center"}}>
        <Text style={{ fontWeight: 400, fontSize: 18, color: "#FFFFFF" }}>MARLEY</Text>
        <Text style={{fontWeight: 400, fontSize: 18, color: "#FFFFFF" }}>PHILLIPS</Text>
        <Text style={{ fontWeight: 300, fontSize: 12, color: "#FFFFFF" }}>www.emilyjones.com</Text>
        </View>
        </View>

        <View style={{display:"flex",flexDirection:"column",gap:16,justifyContent:"center",alignItems:"center"}}>
            <View><Text style={{ fontWeight: 400, fontSize: 18, color: "#FFFFFF",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>Contact</Text></View>
            <View style={{display:"flex",flexDirection:"column",gap:22}}>
                <View style={{display:"flex",flexDirection:"row",gap:6}}>
                <Svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M6.09874 9.4259C4.1505 7.42929 3.66645 5.35396 3.66645 5.35396C3.89606 5.28861 4.32816 5.1516 4.50657 5.06263C5.52737 4.55404 5.46263 3.40852 4.9447 2.26142C4.39892 1.05212 3.34426 0.550599 3.34426 0.550599C1.24922 0.129391 0.960148 1.39459 0.846476 2.15197C0.577727 3.94782 1.4585 8.19611 4.4471 11.2635C4.4456 11.2642 4.44334 11.2658 4.44183 11.2674C4.46818 11.2942 4.49679 11.317 4.52389 11.3438C4.5683 11.3887 4.60896 11.4359 4.65412 11.48C4.65563 11.4768 4.65789 11.4737 4.66015 11.4705C7.76468 14.4198 11.9871 15.1567 13.6862 14.7733C14.4021 14.6119 15.5938 14.2379 15.0728 12.0744C15.0728 12.0744 14.5338 11.0013 13.3482 10.5006C12.2235 10.025 11.1259 10.0227 10.6991 11.1178C10.6246 11.3091 10.5184 11.7681 10.4695 12.0114C10.4695 12.0114 8.46102 11.6248 6.44427 9.70381L6.09874 9.4259Z" fill="#83C3C9"/>
</Svg>
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#FFFFFF" }}>+555 456 123 546</Text>
                </View>
                <View style={{display:"flex",flexDirection:"row",gap:6}}>
                <Svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M12.6685 11.4664H3.33303C1.94017 11.4664 0.800781 10.3006 0.800781 8.87534V3.65747C0.800781 2.23226 1.94017 1.06641 3.33303 1.06641H12.6685C14.0614 1.06641 15.2008 2.23226 15.2008 3.65747V8.87534C15.2002 10.3006 14.0608 11.4664 12.6685 11.4664Z" stroke="#83C3C9" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M0.800781 3.6582L8.00078 8.62547L15.2002 3.6582" stroke="#83C3C9" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M10.168 7.13086L15.1063 9.38114" stroke="#83C3C9" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M0.800781 8.87591L5.67854 7.02344" stroke="#83C3C9" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>



                   <Text style={{ fontWeight: 400, fontSize: 12, color: "#FFFFFF" }}>Email@mail.com</Text>
                   </View>
                    <View style={{display:"flex",flexDirection:"row",gap:6}}> 
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M7.99993 14.8663C11.9763 14.8663 15.2004 11.6446 15.2012 7.67045C15.2019 3.6963 11.979 0.474609 8.00264 0.474609C4.02624 0.474609 0.802129 3.6963 0.801382 7.67045C0.800635 11.6446 4.02354 14.8663 7.99993 14.8663Z" stroke="#83C3C9" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M7.99849 14.8666C10.5142 14.8666 12.5536 11.6431 12.5536 7.6667C12.5536 3.6903 10.5142 0.466797 7.99849 0.466797C5.48276 0.466797 3.44336 3.6903 3.44336 7.6667C3.44336 11.6431 5.48276 14.8666 7.99849 14.8666Z" stroke="#83C3C9" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M7.998 14.8666C8.97634 14.8666 9.76944 11.6431 9.76944 7.6667C9.76944 3.6903 8.97634 0.466797 7.998 0.466797C7.01966 0.466797 6.22656 3.6903 6.22656 7.6667C6.22656 11.6431 7.01966 14.8666 7.998 14.8666Z" stroke="#83C3C9" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M15.194 7.66602C15.194 8.64482 11.9722 9.4385 7.99836 9.4385C4.0245 9.4385 0.802734 8.64482 0.802734 7.66602" stroke="#83C3C9" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>

                <Text style={{ fontWeight: 400, fontSize: 12, color: "#FFFFFF" }}>www.marleyphillips.com</Text>
                </View>
                </View>

        </View>

        <View style={{display:"flex",flexDirection:"column",gap:16,justifyContent:"center",alignItems:"center"}}>
        <View>
        <Text style={{ fontWeight: 400, fontSize: 18, color: "#FFFFFF" }}>Languages</Text>
        </View>
        <View style={{display:"flex",flexDirection:"column",gap:24}}>
        <Text style={{ fontWeight: 400, fontSize: 13, color: "#FFFFFF" }}>English</Text>
        <Text style={{ fontWeight: 400, fontSize: 13, color: "#FFFFFF" }}>Spanish</Text>
        <Text style={{ fontWeight: 400, fontSize: 13, color: "#FFFFFF" }}>Italian</Text> 
        </View>
        </View>

        <View style={{display:"flex",flexDirection:"column",gap:16,justifyContent:"center",alignItems:"center"}}>
        <View>
        <Text style={{ fontWeight: 400, fontSize: 18, color: "#FFFFFF" }}>Skills</Text>
        </View>
        <View style={{display:"flex",flexDirection:"column",gap:24}}>
        <View style={{display:"flex",flexDirection:'row',justifyContent:"space-between"}}>
        <Text style={{ fontWeight: 400, fontSize: 10, color: "#FFFFFF" }}>Photography</Text>
        <Text style={{ fontWeight: 400, fontSize: 10, color: "#FFFFFF" }}>Graphic design</Text>
        </View>
        <View style={{display:"flex",flexDirection:'row',justifyContent:"space-between"}}>
        <Text style={{ fontWeight: 400, fontSize: 10, color: "#FFFFFF" }}>Web design</Text>
        <Text style={{ fontWeight: 400, fontSize: 10, color: "#FFFFFF" }}>Motion Graphic</Text>
        </View>
        <View style={{display:"flex",flexDirection:'row',justifyContent:"space-between"}}>
        <Text style={{ fontWeight: 400, fontSize: 10, color: "#FFFFFF" }}>Sculpting</Text>
        <Text style={{ fontWeight: 400, fontSize: 10, color: "#FFFFFF" }}>Illustration</Text> 
        </View>
        </View>
        </View>


         
    </View>

    <View style={{width:388}}>

     <View style={{display:"flex",flexDirection:"column",gap:8,backgroundColor:"#252829",paddingHorizontal:24,paddingTop:24,paddingBottom:33}}>   
    <Text style={{ fontSize: 18, fontWeight: 400, color: "#FFFFFF" }}>About Me</Text>
    <Text style={{ fontSize: 10, fontWeight: 400, color: "#FFFFFF" }}>MyNameIsLauraAndersonloremempusidfringillamolestieornarediaminolestirosnollicitudinestMyNium lorem olestie pretium apaza all the rosen. ringilla lorem ipsum.</Text>
    </View>

      
    <View style={{display:"flex",flexDirection:"column",gap:6,paddingTop:24,paddingLeft:24,paddingRight:24,gap:24}}>
       
    <View style={{display:"flex",flexDirection:"column",gap:16}}>
     <View style={{display:"flex",flexDirection:"row",gap:6}}>  
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M9.9993 18.3125C14.5893 18.3125 18.311 14.5913 18.3119 10.001C18.3127 5.41064 14.5925 1.68945 10.0024 1.68945C5.41237 1.68945 1.69071 5.41064 1.68985 10.001C1.68899 14.5913 5.40926 18.3125 9.9993 18.3125Z" fill="#83C3C9"/>
</Svg>
    <Text style={{ fontSize: 18, fontWeight: 400, color: "#252829" }}>Work Experience</Text>
    </View>

      <View style={{display:"flex",flexDirection:"column",gap:24}}>
    <View style={{display:"flex",flexDirection:"column",gap:4}}>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>Art Director - Company Name</Text>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>2020-2021</Text>
    <View style={{backgroundColor:"#555C5E",width:282,height:1}}></View>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>Lorem ipsum dolor sit amet, consectetuer aaman remaperi, eaque ipsa quae ab inventoreveritasi quasi.</Text>
    </View>

    <View style={{display:"flex",flexDirection:"column",gap:4}}>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>Art Director - Company Name</Text>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>2020-2021</Text>
    <View style={{backgroundColor:"#555C5E",width:282,height:1}}></View>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>Lorem ipsum dolor sit amet, consectetuer aaman remaperi, eaque ipsa quae ab inventoreveritasi quasi.</Text>
    </View>

    <View style={{display:"flex",flexDirection:"column",gap:4}}>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>Art Director - Company Name</Text>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>2020-2021</Text>
    <View style={{backgroundColor:"#555C5E",width:282,height:1}}></View>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>Lorem ipsum dolor sit amet, consectetuer aaman remaperi, eaque ipsa quae ab inventoreveritasi quasi.</Text>
    </View>
    </View>
    </View>
    

    <View style={{display:"flex",flexDirection:"column",gap:16}}>
     <View style={{display:"flex",flexDirection:"row",gap:6}}>  
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M9.9993 18.3125C14.5893 18.3125 18.311 14.5913 18.3119 10.001C18.3127 5.41064 14.5925 1.68945 10.0024 1.68945C5.41237 1.68945 1.69071 5.41064 1.68985 10.001C1.68899 14.5913 5.40926 18.3125 9.9993 18.3125Z" fill="#83C3C9"/>
</Svg>
    <Text style={{ fontSize: 18, fontWeight: 400, color: "#252829" }}>Education</Text>
    </View>

      <View style={{display:"flex",flexDirection:"column",gap:24}}>
    <View style={{display:"flex",flexDirection:"column",gap:4}}>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>Education Level in Specialization</Text>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>Name of Institute / University</Text>
    <View style={{backgroundColor:"#555C5E",width:282,height:1}}></View>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>2020-2021</Text>
    </View>

    <View style={{display:"flex",flexDirection:"column",gap:4}}>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>Education Level in Specialization</Text>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>Name of Institute / University</Text>
    <View style={{backgroundColor:"#555C5E",width:282,height:1}}></View>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>2020-2021</Text>
    </View>

    <View style={{display:"flex",flexDirection:"column",gap:4}}>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>Education Level in Specialization</Text>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>Name of Institute / University</Text>
    <View style={{backgroundColor:"#555C5E",width:282,height:1}}></View>
    <Text style={{ fontWeight: 600, fontSize: 12, color: "#252829", }}>2020-2021</Text>
    </View>
    </View>
    </View>
    
    </View>
    </View>




    </View>

    </Page>
  )
}

export default Template54
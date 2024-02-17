import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect,Font,Defs, ClipPath,data } from '@react-pdf/renderer';

import React from 'react'

const Template47 = () => {
  return (
    <Page size="A4">
        <View style={{width:595}}>
           
           <View style={{display:"flex",flexDirection:"row",width:242,gap:28,paddingVertical:20,paddingHorizontal:36,backgroundColor:"#F1F2F2"}}>
           <View style={{width:87}}><Image src="/images/services/Ellipse_24.png"></Image></View>
           <View>
        <Text style={{ fontWeight: 600, fontSize: 32, color: "#27AAE1" }}>John</Text>
           <Text style={{ fontWeight: 400, fontSize: 32, color: "#414042" }}>Doe</Text>
           <Text style={{ fontWeight: 400, fontSize: 14, color: "#58595B" }}>Your Designation</Text>
           </View>
           </View>
        </View> 
</Page>
  )
}

export default Template47
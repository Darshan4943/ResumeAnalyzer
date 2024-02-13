
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';

import React from 'react'

function Template7({data}) {
  return (
    <>
    <Page size='A4'>
    <View style={{width:'595px', minHeight:792 ,backgroundColor:'#F5F7FB', padding:24}}>
     <View style={{marginTop:32, marginLeft:71,width:332,display:'flex',flexDirection:'row',gap:38,alignItems:'flex-start',justifyContent:"center"}}>
     <View style={{width:106,height:106,borderRadius:106,border:6,borderColor:'#0077F9'}}>
   <Image src="/images/profile/john_doe.png" />
     </View>
     <View style={{display:'flex',justifyContent:'space-between' , flexDirection:'column',height:'100%'}}>
       <Text style={{fontSize:32 , fontWeight:300}}>John</Text>
       <Text style={{fontSize:32 , fontWeight:700}}>Doe</Text>
       <Text style={{fontSize:14 ,color:'#828186' , fontWeight:400}}>PROFESSIONAL TITLE</Text>
     </View>
     </View>
    </View>
    </Page>
    </>
  )
}

export default Template7
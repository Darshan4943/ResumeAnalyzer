import React from 'react'
import {
    Document,
    Page,
    Text,
    View,
    Image,
    StyleSheet,
    Svg,
    Path,
    Rect,
} from "@react-pdf/renderer";

function Template61({data}) {
  return (
    <Page size="A4" style={{border:16 , borderColor:"#EDC06F" }}>
      <View style={{display:'flex',flexDirection:'column',padding:18, gap:32}}>
        <View>
          <Text style={{textAlign:'center',fontSize:48,fontWeight:400,color:'#726E6A'}}>Naledi Khumalo</Text>
        </View>

        <View style={{marginTop:10,backgroundColor:'#EDC06F'}}>
            <View style={{display:"flex",flexDirection:'row',gap:20,flexWrap:'wrap',padding:'10px 36px'}}>
              <View style={{display:'flex',flexDirection:'row',gap:8,width:112,alignItems:'center'}}>
              <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M9.5073 11.907C8.42474 11.3479 6.00312 8.51212 6.00312 8.51212C4.80912 7.13402 5.4813 6.53785 5.4813 6.53785L1.53315 2.58398C0.712383 3.81702 1.08385 5.90276 1.08385 5.90276C2.49897 11.233 8.61403 15.2611 8.61403 15.2611C13.7562 18.3924 15.2863 16.3402 15.2863 16.3402L11.4832 12.5774C10.9613 13.1754 9.5073 11.907 9.5073 11.907Z" fill="white"/>
<Path d="M5.89143 3.25724L3.95625 1.28475C3.95625 1.28475 3.43089 0.80001 2.94975 1.09544L1.86719 2.25064L5.81891 6.20275L6.97046 5.0847C6.97046 5.0847 7.60726 4.71142 5.89143 3.25724Z" fill="white"/>
<Path d="M15.8033 13.2114L13.8646 11.2336C13.8646 11.2336 13.341 10.7506 12.8599 11.0478L11.7773 12.203L15.729 16.1551L16.8841 15.0371C16.8841 15.0371 17.5191 14.6621 15.8033 13.2114Z" fill="white"/>
</Svg>

<Text style={{fontSize:12,fontWeight:400,color:"#fff"}}>999-888-999</Text>
              </View>
              <View style={{display:'flex',flexDirection:'row',gap:8,width:112,alignItems:'center'}}>
              <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M2.38607 3.50524L9.55502 10.8089L16.652 3.51054C16.6771 3.48395 16.7106 3.47332 16.739 3.45027C16.4062 3.17018 15.993 3 15.5364 3H3.46825C3.01998 3 2.60853 3.16486 2.27734 3.43431C2.31247 3.4609 2.35094 3.47155 2.38607 3.50524Z" fill="white"/>
<Path d="M17.1689 13.5487C17.2391 13.5824 17.3027 13.6303 17.3546 13.6923C17.4499 13.4512 17.5001 13.1906 17.5001 12.9176V5.08038C17.5001 4.95451 17.485 4.83398 17.4649 4.71875L13.1094 9.19843C14.8657 11.1538 16.7591 13.1977 17.1689 13.5487Z" fill="white"/>
<Path d="M12.1133 10.2226L10.0426 12.3552C9.90712 12.4935 9.73315 12.5573 9.55752 12.5573C9.38524 12.5573 9.21129 12.4935 9.07915 12.3552L6.94654 10.1836L2.58594 14.7679C2.85022 14.9115 3.14796 15.0001 3.46743 15.0001H15.5356C15.8517 15.0001 16.1444 14.9115 16.412 14.7679C15.84 14.3442 14.7461 13.1529 12.1133 10.2226Z" fill="white"/>
<Path d="M1.53846 4.68359C1.5117 4.81478 1.5 4.94773 1.5 5.08423V12.9215C1.5 13.1945 1.55521 13.4533 1.64219 13.6908L5.94255 9.17036L1.53846 4.68359Z" fill="white"/>
</Svg>


<Text style={{fontSize:12,fontWeight:400,color:"#fff"}}>email@email.com</Text>
              </View>
              <View style={{display:'flex',flexDirection:'row',gap:8,width:112,alignItems:'center'}}>
              <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M13.001 4.72103L9.00205 1L5.00102 4.72103L1 8.44004V17H6.35029V16.7752V11.6091C6.35029 10.1681 7.53881 8.99597 9.00205 8.99597C10.4633 8.99597 11.6517 10.1681 11.6517 11.6091V16.7752V17H17V8.44004L13.001 4.72103Z" fill="white"/>
</Svg>


<Text style={{fontSize:12,fontWeight:400,color:"#fff"}}>fake address,TX, SA</Text>
              </View>
            </View>
        </View>

        <View style={{display:'flex',flexDirection:'row',gap:8}}>
          <View style={{width:150}}>
            <View style={{display:'flex',flexDirection:'column',gap:12}}>
              <Text style={{fontSize:12,fontWeight:400,color:'#EDC06F',paddingBottom:4,borderBottomColor:'#2D2D2D',borderBottom:1}}>PERSONAL</Text>

            </View>

          </View>

          <View style={{width:1,backgroundColor:'#EDC06F'}}></View>

        <View style={{width:345}}>
        
        </View>

        </View>

      </View>
        </Page>
  )
}

export default Template61
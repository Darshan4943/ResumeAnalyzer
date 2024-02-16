import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect,Font,Defs, ClipPath,data } from '@react-pdf/renderer';

import React from 'react'

const Template41 = () => {
    return (  
    <Page size="A4">
        <View style={{width:595,display:"flex",flexDirection:"row",gap:20}}>


           <View style={{width:"218",height:"824",display:"flex",flexDirection:"column",backgroundColor:"#EDEDEE",paddingTop:32,paddingLeft:31,gap:26,backgroundColor:"#EDEDEE"}}>
            
            <View style={{flexDirection:"column",gap:14}} >

            <View style={{width:162}}>
            <Image src='/images/services/template_profile.png'></Image>
            </View>

            <View style={{flexDirection:"column",gap:8}}>
             <View style={{flexDirection:"column"}}>
            <Text style={{fontSize:26,fontWeight:400,color:"#000000"}}>JOHN</Text>
            <Text style={{fontSize:26,fontWeight:400,color:"#000000"}}>DOE</Text>
            </View>
            <View style={{width:162,height:1,backgroundColor:"#000000"}}></View>
            <Text style={{fontSize:11,fontWeight:400,color:"#000000"}}>PROFESSION HERE</Text>
            </View>



            </View>


             
           <View style={{width:"325",flexDirection:"column",gap:8}}>
            <View>
           <Text style={{fontSize:14,fontWeight:400,color:"#000000"}}>CONTACT</Text>
           </View>
           <View style={{flexDirection:"column",gap:6}}>    
           <View style={{flexDirection:"row",gap:4,backgroundColor:"#FFFFFF"}}>
            <Svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M3.91999 5.12878C4.11239 5.90848 5.14962 6.87299 5.91814 7.05883C6.26317 7.13254 6.64796 6.94772 6.76297 6.61342C6.91668 6.13065 7.57019 5.98218 7.95391 6.35386L9.02983 7.39207C9.29855 7.65267 9.29855 8.09806 9.02983 8.39499L8.30001 9.09995C7.53149 9.84227 5.49572 9.02518 3.6889 7.28099C1.88315 5.5368 1.077 3.57043 1.80683 2.82811L2.53665 2.12318C2.80537 1.86259 3.26648 1.86259 3.57389 2.12318L4.64981 3.16139C5.03461 3.53307 4.88091 4.16431 4.3811 4.31277C4.035 4.42386 3.80498 4.79448 3.91999 5.12878Z" fill="black"/>
</Svg>
<Text style={{fontSize:9,fontWeight:400,color:"#000000",backgroundColor:"#FFFFFF"}}>+09-1223-6698752</Text></View>
           <View style={{flexDirection:"row",gap:4,backgroundColor:"#FFFFFF"}}>
           <Svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M6.53111 4.26736C6.5132 3.73844 6.43596 3.22915 6.30722 2.76722C6.50312 2.64365 6.69007 2.50159 6.86358 2.34223C7.31246 2.885 7.57777 3.55367 7.62702 4.26736H6.53111ZM6.14827 6.7329C6.28148 6.82182 6.40909 6.92229 6.52999 7.032C6.27588 7.26297 5.99267 7.44892 5.68819 7.5875C5.87849 7.32997 6.02961 7.03546 6.14827 6.7329ZM2.61985 6.7329C2.73851 7.03546 2.88963 7.32997 3.07993 7.5875C2.77545 7.44892 2.49224 7.26297 2.23813 7.032C2.35903 6.92229 2.48664 6.82182 2.61985 6.7329ZM2.61985 2.29144C2.48664 2.20252 2.35903 2.10205 2.23813 1.99234C2.49224 1.76137 2.77545 1.57542 3.07993 1.43684C2.88963 1.69437 2.73851 1.98888 2.61985 2.29144ZM5.68819 1.43684C5.99267 1.57542 6.27588 1.76137 6.52999 1.99234C6.40909 2.10205 6.28148 2.20252 6.14827 2.29144C6.02961 1.98888 5.87849 1.69437 5.68819 1.43684ZM4.62137 2.81804V1.19201C5.15534 1.35138 5.52699 1.99348 5.72848 2.52817C5.38258 2.68984 5.00869 2.78801 4.62137 2.81804ZM4.62137 4.26736V3.30883C5.06019 3.27996 5.48221 3.17372 5.87625 2.99703C5.97812 3.38968 6.03968 3.81928 6.05647 4.26736H4.62137ZM4.62137 5.71551V4.75698H6.05647C6.03968 5.20506 5.97812 5.63466 5.87625 6.0273C5.48221 5.85062 5.06019 5.74438 4.62137 5.71551ZM4.62137 6.2063C5.00869 6.23633 5.38258 6.3345 5.72848 6.49617C5.52699 7.03086 5.15534 7.67293 4.62137 7.83229V6.2063ZM4.14674 6.2063V7.83229C3.61278 7.67293 3.24113 7.03086 3.03964 6.49617C3.38554 6.3345 3.75942 6.23633 4.14674 6.2063ZM4.14674 4.75698V5.71551C3.70793 5.74438 3.28591 5.85062 2.89187 6.0273C2.79001 5.63466 2.72844 5.20506 2.71165 4.75698H4.14674ZM4.14674 3.30883V4.26736H2.71165C2.72844 3.81928 2.79001 3.38968 2.89187 2.99703C3.28591 3.17372 3.70793 3.27996 4.14674 3.30883ZM4.14674 2.81804C3.75942 2.78801 3.38554 2.68984 3.03964 2.52817C3.24113 1.99348 3.61278 1.35138 4.14674 1.19201V2.81804ZM1.90454 2.34223C2.07805 2.50159 2.26499 2.64365 2.46089 2.76722C2.33216 3.22915 2.25492 3.73844 2.23701 4.26736H1.1411C1.19035 3.55367 1.45566 2.885 1.90454 2.34223ZM1.1411 4.75698H2.23701C2.25492 5.2859 2.33216 5.79519 2.46089 6.25712C2.26499 6.38069 2.07805 6.52271 1.90454 6.68208C1.45566 6.13931 1.19035 5.47067 1.1411 4.75698ZM6.86358 6.68208C6.69007 6.52271 6.50312 6.38069 6.30722 6.25712C6.43596 5.79519 6.5132 5.2859 6.53111 4.75698H7.62702C7.57777 5.47067 7.31246 6.13931 6.86358 6.68208ZM7.01918 1.79371C5.56281 0.290118 3.20531 0.290118 1.74894 1.79371C0.292578 3.29614 0.291459 5.72819 1.74894 7.23063C3.20531 8.73422 5.56281 8.73422 7.01918 7.23063C8.47554 5.72819 8.47666 3.29614 7.01918 1.79371Z" fill="black"/>
</Svg>
     <Text style={{fontSize:9,fontWeight:400,color:"#000000",backgroundColor:"#FFFFFF"}}>www.companyname.com</Text></View>
           <View style={{flexDirection:"row",gap:4,backgroundColor:"#FFFFFF"}}>
           <Svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M4.24786 3.99357C4.32135 4.05804 4.39944 4.09025 4.48096 4.09025C4.56249 4.09025 4.64057 4.05801 4.71291 3.99466C5.25835 3.5189 7.11052 1.99604 8.16693 1.13013C8.23238 1.07677 8.24272 0.982302 8.18875 0.916719C8.06589 0.764433 7.88216 0.677734 7.68581 0.677734H1.27612C1.07862 0.677734 0.896041 0.764433 0.772027 0.916719C0.719206 0.982302 0.729541 1.07677 0.794993 1.13013C1.85141 1.99604 3.70358 3.51893 4.24786 3.99357Z" fill="black"/>
<Path d="M8.23602 1.60039C8.17975 1.57483 8.112 1.58374 8.06492 1.62265C6.89483 2.58416 5.39977 3.81579 4.93013 4.22485C4.66602 4.45606 4.29972 4.45606 4.03562 4.22485C3.53382 3.788 1.85619 2.40742 0.900822 1.62265C0.852594 1.58374 0.785992 1.57483 0.729726 1.60039C0.672312 1.62596 0.636719 1.68044 0.636719 1.74158V5.6421C0.636719 5.98447 0.923787 6.26346 1.27746 6.26346H7.68829C8.04196 6.26346 8.32903 5.98447 8.32903 5.6421V1.74158C8.32903 1.68044 8.29228 1.62596 8.23602 1.60039Z" fill="black"/>
</Svg>

            <Text style={{fontSize:9,fontWeight:400,color:"#000000",backgroundColor:"#FFFFFF"}}>companyname@email.com</Text></View>
           <View style={{flexDirection:"row",gap:4,backgroundColor:"#FFFFFF"}}>
           <Svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M5.91043 4.91893C5.68734 5.13342 5.39295 5.24114 5.09856 5.24114C4.80416 5.24114 4.51079 5.13342 4.28669 4.91893C3.83848 4.48799 3.83848 3.78673 4.28669 3.35677C4.50366 3.14816 4.79194 3.03256 5.09856 3.03256C5.40517 3.03256 5.69345 3.14816 5.91043 3.35677C6.35863 3.78673 6.35863 4.48799 5.91043 4.91893ZM5.09856 1.57227C3.61437 1.57227 2.40625 2.73385 2.40625 4.16085C2.40625 5.95415 5.10161 9.01871 5.10161 9.01871C5.10161 9.01871 7.79086 5.866 7.79086 4.16085C7.79086 2.73385 6.58274 1.57227 5.09856 1.57227Z" fill="black"/>
</Svg>

            <Text style={{fontSize:9,fontWeight:400,color:"#000000",backgroundColor:"#FFFFFF"}}>Fake address Stranger City, USA</Text></View>
           </View>
           </View>

          
          <View style={{flexDirection:"column",gap:8}}>
            <View><Text style={{fontSize:14,fontWeight:400,color:"#000000"}}>SKILLS</Text></View>
            <View style={{flexDirection:"column",gap:8}}>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>Adobe Illustrator</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>Adobe Photosop</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>Adobe In Design</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>Adobe Premiere</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>Wordpress</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>HTML</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>MS Office</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>Ms Excel</Text>
                </View>
          </View>


          <View style={{flexDirection:"column",gap:8}}>
            <View><Text style={{fontSize:14,fontWeight:400,color:"#000000"}}>INTERESTS</Text></View>
            <View style={{flexDirection:"column",gap:8}}>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>Hiking   </Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>Sketching</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>Singing</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>Gaming</Text>
                </View>
          </View>

           </View>




        

           <View style={{width:325,display:"flex",flexDirection:"column",gap:28,paddingTop:32,paddingLeft:32}}>

            <View style={{display:"flex",flexDirection:"column",gap:8}}>
            <Text style={{fontSize:14,fontWeight:400,color:"#000000"}}>ABOUT ME</Text>
            <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod incididunt ut labore et dolore magna aliqua. Nisi quis eleifend quam adipiscing. Viverra tellus in hac as habitasse platea  porttitor leo. Viverra ipsum nunc aliquet bibendum enim </Text>
            </View>

            <View style={{display:"flex",flexDirection:"column",gap:8}}>
                <View><Text style={{fontSize:14,fontWeight:400,color:"#000000"}}>WORK EXPERIENCE</Text></View>

                <View style={{display:"flex",flexDirection:"column",gap:4}}>
                <Text style={{fontSize:14,fontWeight:400,color:"#000000"}}>Senior Graphic Designer</Text>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>  
                <Text style={{fontSize:12,fontWeight:400,color:"#000000"}}>Company Name Here</Text>
                <Text style={{fontSize:12,fontWeight:400,color:"#000000"}}>2020-2023</Text>
                </View>
                <View style={{flexDirection:"column",gap:8}}>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>Sedut perspiciatis undemartana omnis bisiste natus error sit samandan tiumyu dolor emque laudatium, totamaman remaperi, eaque ipsa quae ab inventoreveritasi quasi.</Text>
                <View style={{flexDirection:"column",gap:2}}>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000" }}>standard dummy text is ever since the loe when an unknown</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>galley type and scrambled it to make pecimen book. dummy text</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>since the loe whent specimen book. survived not only.</Text>
 
                </View>
                </View>

                </View>

                <View style={{display:"flex",flexDirection:"column",gap:4}}>
                <Text style={{fontSize:14,fontWeight:400,color:"#000000"}}>Senior Graphic Designer</Text>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>  
                <Text style={{fontSize:12,fontWeight:400,color:"#000000"}}>Company Name Here</Text>
                <Text style={{fontSize:12,fontWeight:400,color:"#000000"}}>2020-2023</Text>
                </View>
                <View style={{flexDirection:"column",gap:8}}>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>Sedut perspiciatis undemartana omnis bisiste natus error sit samandan tiumyu dolor emque laudatium, totamaman remaperi, eaque ipsa quae ab inventoreveritasi quasi.</Text>
                <View style={{flexDirection:"column",gap:2}}>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000" }}>standard dummy text is ever since the loe when an unknown</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>galley type and scrambled it to make pecimen book. dummy text</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>since the loe whent specimen book. survived not only.</Text>
 
                </View>
                </View>

                </View>

                <View style={{display:"flex",flexDirection:"column",gap:4}}>
                <Text style={{fontSize:14,fontWeight:400,color:"#000000"}}>Senior Graphic Designer</Text>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>  
                <Text style={{fontSize:12,fontWeight:400,color:"#000000"}}>Company Name Here</Text>
                <Text style={{fontSize:12,fontWeight:400,color:"#000000"}}>2020-2023</Text>
                </View>
                <View style={{flexDirection:"column",gap:8}}>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>Sedut perspiciatis undemartana omnis bisiste natus error sit samandan tiumyu dolor emque laudatium, totamaman remaperi, eaque ipsa quae ab inventoreveritasi quasi.</Text>
                <View style={{flexDirection:"column",gap:2}}>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000" }}>standard dummy text is ever since the loe when an unknown</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>galley type and scrambled it to make pecimen book. dummy text</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>since the loe whent specimen book. survived not only.</Text>
 
                </View>
                </View>

                </View>
            
            </View>

            <View style={{flexDirection:"column",gap:8}}>
            <View><Text style={{fontSize:14,fontWeight:400,color:"#000000"}}>EDUCATION</Text></View>
            <View style={{display:"flex",flexDirection:"row",gap:40}}>
                <View>
                <Text style={{fontSize:12,fontWeight:400,color:"#000000"}}>Your Degree Name</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>College / University Name</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>2010-2014</Text>
                </View>
                <View style={{height:45,backgroundColor:"#000000",width:1}}></View>
                <View>
                <Text style={{fontSize:12,fontWeight:400,color:"#000000"}}>Your Degree Name</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>College / University Name</Text>
                <Text style={{fontSize:10,fontWeight:400,color:"#000000"}}>2010-2014</Text>
                </View>
            </View>
            <View>

            </View>
            </View>

           </View>
           
           
           
           
           
           
           
           
           
          





        </View>
    </Page>
  )
}

export default Template41
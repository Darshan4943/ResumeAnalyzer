import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect, Font, Defs, ClipPath, data } from '@react-pdf/renderer';
import React from 'react'

const Template43 = () => {
  return (
    <Page size="A4">

      <View style={{ width: 595, display: "flex", flexDirection: "row", gap: 56, minHeight: 841 }}>

        <View style={{ width: 248, backgroundColor: "#F9D3D0" }}>
          <View style={{ paddingHorizontal: 34, paddingVertical: 42 }}>


            <View style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <View style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "center", alignItems: "center" }}>
                <Image style={{ width: 109, height: 109 }} src="/images/services/Ellipse_24.png"></Image>
                <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <Text style={{ fontSize: 26, fontWeight: 400, color: "#3F2930" }}>JOHN DOE</Text>
                  <Text style={{ fontSize: 14, fontWeight: 300, color: "#3F2930" }}>YOUR JOB POSITION</Text>
                </View>

              </View>

              <View style={{ flexDirection: "column", gap: 6 }}>
                <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
                  <Svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M4.5 17.4355H14.5V2.43555H4.5V17.4355ZM9.49949 16.3602C9.04434 16.3602 8.67511 15.9964 8.67511 15.548C8.67511 15.0995 9.04434 14.7357 9.49949 14.7357C9.95464 14.7357 10.3239 15.0995 10.3239 15.548C10.3239 15.9964 9.95464 16.3602 9.49949 16.3602ZM5.98512 13.6543V3.75977H13.0139V13.6543H5.98512Z" stroke="#3F2930" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                  </Svg>
                  <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>Your Number</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
                  <Svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M9.84132 2.44713C9.72849 2.4394 9.61472 2.43555 9.5 2.43555C9.38529 2.43555 9.27151 2.4394 9.15868 2.44713C5.81599 2.67899 3.94953 6.5596 5.62511 9.53987L7.00638 11.9975L9.5 16.4355L11.9936 11.9975L13.3749 9.53987C15.0505 6.5596 13.184 2.67899 9.84132 2.44713ZM9.5 9.42781C8.20242 9.42781 7.15024 8.3468 7.15024 7.01365C7.15024 5.6805 8.20242 4.59949 9.5 4.59949C10.7976 4.59949 11.8498 5.6805 11.8498 7.01365C11.8498 8.3468 10.7976 9.42781 9.5 9.42781Z" stroke="#3F2930" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                  </Svg>

                  <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>Your Address</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
                  <Svg width="15" height="11" viewBox="0 0 15 11" fill="#F9D3D0" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M14.5 0.435547V10.4355H0.501953V0.435547" stroke="#3F2930" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                  </Svg>
                  <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>Your Mail</Text>
                </View>
              </View>

              <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>SKILLS</Text>
                  <View style={{ width: 180, height: 1, backgroundColor: "#3F2930" }}></View>
                </View>

                <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Text style={{ fontWeight: 400, fontSize: 12, color: "#3F2930" }}>OPTION 1</Text>
                  <Text style={{ fontWeight: 400, fontSize: 10, color: "#3F2930" }}>Lorem ipsum dolor amet consecter.</Text>
                </View>

                <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Text style={{ fontWeight: 400, fontSize: 12, color: "#3F2930" }}>OPTION 2</Text>
                  <Text style={{ fontWeight: 400, fontSize: 10, color: "#3F2930" }}>Lorem ipsum dolor amet consecter.</Text>
                </View>

                <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Text style={{ fontWeight: 400, fontSize: 12, color: "#3F2930" }}>OPTION 3</Text>
                  <Text style={{ fontWeight: 400, fontSize: 10, color: "#3F2930" }}>Lorem ipsum dolor amet consecter.</Text>
                </View>

                <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Text style={{ fontWeight: 400, fontSize: 12, color: "#3F2930" }}>OPTION 4</Text>
                  <Text style={{ fontWeight: 400, fontSize: 10, color: "#3F2930" }}>Lorem ipsum dolor amet consecter.</Text>
                </View>

              </View>

              <View style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <View style={{ flexDirection: "column", gap: 4 }}>
                  <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>HOBBIES</Text>
                  <View style={{ width: 180, height: 1, backgroundColor: "#3F2930" }}></View>
                </View>

                <View>
                  <Text style={{ fontWeight: 400, fontSize: 10, color: "#B3977F" }}>Lorem ipsum dolor amet consecter.</Text>
                  <Text style={{ fontWeight: 400, fontSize: 10, color: "#B3977F" }}>Lorem ipsum dolor amet consecter.</Text>
                  <Text style={{ fontWeight: 400, fontSize: 10, color: "#B3977F" }}>Lorem ipsum dolor amet consecter.</Text>
                </View>
              </View>

              <View style={{ flexDirection: "column", gap: 12 }}>
                <View style={{ flexDirection: "column", gap: 12 }}>
                  <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>CONNECT  </Text>
                  <View style={{ width: 180, height: 1, backgroundColor: "#3F2930" }}></View>
                </View>
                <View style={{ flexDirection: "row", gap: 7 }}>
                  <View style={{ flexDirection: "row", gap: 2 }}>
                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="#F9D3D0" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M10 18C5.58168 18 2 14.4183 2 9.99997C2 5.58165 5.58168 2 10 2C14.4183 2 18 5.58165 18 9.99997C18 14.4173 14.4183 18 10 18Z" stroke="#3F2930" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      <Path d="M11.6692 8.3461V9.60535H10.3024V14.6576H8.75001V9.60535H7.88672V8.3461H8.75001V8.02728C8.75001 6.49867 9.87125 5.77148 11.0058 5.77148C11.4027 5.77148 11.7606 5.8933 12.1118 6.06463L11.635 7.12304C11.4798 7.0488 11.3247 7.00883 11.1448 7.00883C10.6641 7.00883 10.3024 7.27532 10.3024 7.8921V8.3461H11.6692Z" fill="#3F2930" />
                    </Svg>
                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="#F9D3D0" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M9 17C4.58168 17 1 13.4183 1 8.99997C1 4.58165 4.58168 1 9 1C13.4183 1 17 4.58165 17 8.99997C17 13.4173 13.4183 17 9 17Z" stroke="#3F2930" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      <Path d="M12.7563 7.30137C12.8172 7.90196 12.7468 8.55111 12.5773 9.11553C11.6864 12.0738 8.07431 14.5133 4.17188 12.2517C4.17188 12.2517 5.68621 12.3736 7.10727 11.4351C5.6567 11.3085 5.24362 10.0492 5.24362 10.0492C5.59769 10.1178 6.08883 10.0492 6.08883 10.0492C4.48597 9.54761 4.51548 8.04375 4.51548 8.04375C4.88954 8.24078 5.4197 8.27985 5.4197 8.27985C3.9739 7.06057 4.82006 5.65469 4.82006 5.65469C5.85183 7.11953 7.79639 7.66878 8.86051 7.69734C8.84529 6.74267 9.05849 5.65564 10.4044 5.35963C11.261 5.17117 11.854 5.41008 12.2328 5.87266C12.5535 5.82126 13.1903 5.68992 13.5406 5.41865C13.5406 5.41865 13.3226 6.14587 12.7725 6.49043C12.7725 6.49043 13.6481 6.30383 13.8252 6.23435C13.8252 6.23435 13.2836 6.89304 12.7563 7.30137Z" fill="#3F2930" />
                    </Svg>
                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="#F9D3D0" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M9 17C4.58168 17 1 13.4183 1 8.99997C1 4.58165 4.58168 1 9 1C13.4183 1 17 4.58165 17 8.99997C17 13.4173 13.4183 17 9 17Z" stroke="#3F2930" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      <Path d="M12.7563 7.30137C12.8172 7.90196 12.7468 8.55111 12.5773 9.11553C11.6864 12.0738 8.07431 14.5133 4.17188 12.2517C4.17188 12.2517 5.68621 12.3736 7.10727 11.4351C5.6567 11.3085 5.24362 10.0492 5.24362 10.0492C5.59769 10.1178 6.08883 10.0492 6.08883 10.0492C4.48597 9.54761 4.51548 8.04375 4.51548 8.04375C4.88954 8.24078 5.4197 8.27985 5.4197 8.27985C3.9739 7.06057 4.82006 5.65469 4.82006 5.65469C5.85183 7.11953 7.79639 7.66878 8.86051 7.69734C8.84529 6.74267 9.05849 5.65564 10.4044 5.35963C11.261 5.17117 11.854 5.41008 12.2328 5.87266C12.5535 5.82126 13.1903 5.68992 13.5406 5.41865C13.5406 5.41865 13.3226 6.14587 12.7725 6.49043C12.7725 6.49043 13.6481 6.30383 13.8252 6.23435C13.8252 6.23435 13.2836 6.89304 12.7563 7.30137Z" fill="#3F2930" />
                    </Svg>
                  </View>
                  <View>
                    <Text style={{ fontWeight: 400, fontSize: 10, color: "#3F2930" }}>Lorem ipsum dolor ame.</Text>
                  </View>

                </View>
              </View>


            </View>


          </View>
        </View>

        <View style={{ width: 264, paddingTop: 63, flexDirection: "column", gap: 17 }}>

          <View style={{ display: "flex", flexDirection: "column", gap: 17 }}>
            <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>ABOUT ME</Text>
              <View style={{ width: 264, height: 1, backgroundColor: "#3F2930" }}></View>
            </View>
            <View>
              <Text style={{ fontWeight: 400, fontSize: 10, color: "#B3977F" }}>MyNameIsLauraAndersonloremempusidfringillamolestieornarediaminolestirosnollicitudinest,.molestium lorem olestie pretium apaza all the rosen. ringilla lorem ipsum</Text>
            </View>
          </View>


          <View style={{ flexDirection: "column", gap: 20 }}>

            <View style={{ flexDirection: "column", gap: 4 }}>
              <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>EDUCATION</Text>
              <View style={{ width: 264, height: 1, backgroundColor: "#3F2930" }}></View>
            </View>

            <View style={{ flexDirection: "column", gap: 24 }}>
              <View style={{ flexDirection: "column", gap: 2 }} >
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>2000-2005 YOUR TEXT GOES HERE</Text>
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>lorem olestie pretium apaza all the rosen. ringilla lorem ipsum .</Text>
              </View>

              <View style={{ flexDirection: "column", gap: 2 }} >
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>2000-2005 YOUR TEXT GOES HERE</Text>
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>lorem olestie pretium apaza all the rosen. ringilla lorem ipsum .</Text>
              </View>

              <View style={{ flexDirection: "column", gap: 2 }} >
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>2000-2005 YOUR TEXT GOES HERE</Text>
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>lorem olestie pretium apaza all the rosen. ringilla lorem ipsum .</Text>
              </View>

              <View style={{ flexDirection: "column", gap: 2 }} >
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>2000-2005 YOUR TEXT GOES HERE</Text>
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>lorem olestie pretium apaza all the rosen. ringilla lorem ipsum .</Text>
              </View>

            </View>


          </View>

          <View style={{ flexDirection: "column", gap: 20 }}>

            <View style={{ flexDirection: "column", gap: 4 }}>
              <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>WORK EXPERIENCE</Text>
              <View style={{ width: 264, height: 1, backgroundColor: "#3F2930" }}></View>
            </View>

            <View style={{ flexDirection: "column", gap: 8 }}>
              <View style={{ flexDirection: "column", gap: 2 }} >
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>2000-2005 YOUR TEXT GOES HERE</Text>
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>lorem olestie pretium apaza all the rosen. ringilla lorem ipsum .</Text>
              </View>

              <View style={{ flexDirection: "column", gap: 2 }} >
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>2000-2005 YOUR TEXT GOES HERE</Text>
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>lorem olestie pretium apaza all the rosen. ringilla lorem ipsum .</Text>
              </View>


              <View style={{ flexDirection: "column", gap: 2 }} >
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>2000-2005 YOUR TEXT GOES HERE</Text>
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>lorem olestie pretium apaza all the rosen. ringilla lorem ipsum .</Text>
              </View>



            </View>

            <View style={{ flexDirection: "column", gap: 20 }}>
              <View style={{ flexDirection: "column", gap: 4 }}>
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>LANGUAGES</Text>
                <View style={{ width: 264, height: 1, backgroundColor: "#3F2930" }}></View>
              </View>

              <View style={{ flexDirection: "column", gap: 20 }}>
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>Language 1</Text>
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>Language 2</Text>
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#B3977F" }}>Language 3</Text>
              </View>

            </View>

          </View>



        </View>

      </View>

    </Page>

  )
}

export default Template43
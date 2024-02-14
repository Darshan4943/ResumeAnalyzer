import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template3() {
    return (
      <Page size="A4"  >
        <View style={{ flexDirection: 'column' }}>
           <View style={{ width: "112px", height: "112px" }}>
           <Text style={{ color: '#414042', fontSize: 43, fontWeight: '400' }}>
            Rohit Kalambate
          </Text>
        </View>
        </View>
        </Page>
    )
}

export default Template3
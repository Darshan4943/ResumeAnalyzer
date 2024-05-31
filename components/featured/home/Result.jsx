import React from 'react';
import { Page, Text, View, Document, Image, Font } from '@react-pdf/renderer';
import { camelCase } from "../../../utils/middleware";
import { Assessmentlogo } from "../../../utils/svg";
import Fonts from '../../../public/fonts/fonts';

<Fonts />; // Ensure your Fonts component is properly imported and used



const Result = ({ questions, answers, selectedSkill, checkAnswer }) => {
  const data = questions.map((questionItem, index) => ({
    ...questionItem,
    yourAns: answers[index]?.Answer,
  }));

  
  return (
    <Document>

      <Page size="A4" style={{ padding: 16,backgroundImage: "/images/watermark.png",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width:"500px",height:"500px" }}>
       
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>

          <Image style={{ height: 30 }} src="/images/logo_skilotech.png" />
          <View style={{ flexDirection: 'row', alignItems: 'start',width:"60%" }}>
            <Image style={{ height: 25, width: 25 }} src="/images/light.png" />
            <Text style={{ fontSize: 16, fontFamily: 'Montserrat 600', marginLeft: 11,flexWrap:"wrap" ,flexDirection: 'row', alignItems: 'center',width:"100%",marginTop: 5 }}>
              {camelCase(selectedSkill)} Assessment
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontFamily: 'Montserrat 600', marginTop: 5 }}>
            Score: {checkAnswer()} / {questions.length}
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "column", gap: 12, }}>
          {data.map((questionItem, index) => (
            <View wrap={false} key={index} style={{ display: "flex", flexDirection: "column", gap: 6, }}>
              <View style={{ display: "flex", flexDirection: "row", gap: 6, }}>
                <View style={{ fontSize: 11, fontFamily: 'Montserrat 600', display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 8, }}>
                  <Text style={{ fontSize: 11, fontFamily: 'Montserrat 600', minWidth: 100 }}>
                    Question {index + 1}
                  </Text>
                  <Text>
                    :
                  </Text>
                </View>
                <Text style={{ fontSize: 11, fontFamily: 'Montserrat 400', flexWrap: 'wrap', width: 450 }}>
                  {questionItem.question}
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 8, }}>
                <View style={{ fontSize: 11, fontFamily: 'Montserrat 600', display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 8, }}>
                  <Text style={{ fontSize: 11, fontFamily: 'Montserrat 600', minWidth: 100, }}>
                    Your Answer
                  </Text>
                  <Text>
                    :
                  </Text>
                </View>
                <Text style={{ fontSize: 11, fontFamily: 'Montserrat 400', color: questionItem.answer === questionItem.yourAns ? '#0C8A0A' : 'red', width: 450 ,flexWrap: 'wrap'}}>
                  {questionItem.yourAns}
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 8, }}>
                <View style={{ fontSize: 11, fontFamily: 'Montserrat 600', display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 8, }}>
                  <Text style={{ fontSize: 11, fontFamily: 'Montserrat 600', minWidth: 100, }}>
                    Correct Answer
                  </Text>
                  <Text>
                    :
                  </Text>
                </View>
                <Text style={{ fontSize: 11, fontFamily: 'Montserrat 400', width: 450,flexWrap: 'wrap' }}>
                  {questionItem.answer}
                </Text>
              </View>


            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default Result;

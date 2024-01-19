import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    margin: 20,
    padding: 20,
    fontSize: 12,
    fontFamily: 'Arial',
  },
  leftColumn: {
    width: '40%',
    paddingRight: 20,
  },
  rightColumn: {
    width: '60%',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 14,
    color: '#316059',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  divider: {
    backgroundColor: '#F9F9F9',
    height: 1,
    width: '70%',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 'auto',
    marginBottom: 20,
  },
});

const Resume5PDF = ({ data }) => {
  return (
    <Document>
      <Page size="A4">
        <View style={styles.container}>
          <View style={styles.leftColumn}>
            <Image
              style={styles.image}
              src={data?.profilePhoto ? URL.createObjectURL(data.profilePhoto) : '/images/services/black.png'}
            />
            <Text style={styles.heading}>CONTACT</Text>
            <Text style={styles.text}>Mobile Number: {data?.mobileNumber}</Text>
            <Text style={styles.text}>Email: {data?.email}</Text>
            {data?.socialLinks?.map((detail, index) => (
              <Text key={index} style={styles.text}>Social Link: {detail?.link}</Text>
            ))}
            <Text style={styles.text}>Location: {data?.location}</Text>
            <Text style={styles.heading}>SKILLS</Text>
            {data?.skills.map((detail, index) => (
              <View key={index}>
                <Text style={styles.subHeading}>{detail?.skill}</Text>
                <View style={{ backgroundColor: '#C1C1C1', height: 5, marginBottom: 5 }}>
                  <View style={{ backgroundColor: '#316059', height: 5, width: '80%' }} />
                </View>
              </View>
            ))}
            <Text style={styles.heading}>LANGUAGES</Text>
            {data?.languages.map((detail, index) => (
              <View key={index}>
                <Text style={styles.subHeading}>{detail?.language}</Text>
                <View style={{ backgroundColor: '#C1C1C1', height: 5, borderRadius: 5, marginBottom: 5 }}>
                  <View style={{ backgroundColor: '#316059', height: 5, width: '80%', borderRadius: 5 }} />
                </View>
              </View>
            ))}
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.heading}>{data?.firstName} {data?.lastName}</Text>
            <Text style={styles.subHeading}>{data?.designation}</Text>
            {data?.showSummary && (
              <View>
                <Text style={styles.heading}>ABOUT ME</Text>
                <Text style={styles.text}>{data?.summary}</Text>
                <View style={styles.divider} />
              </View>
            )}
            {data?.showEducation && (
              <View>
                <Text style={styles.heading}>EDUCATION</Text>
                {data?.education.map((detail, index) => (
                  <View key={index}>
                    <Text style={styles.text}>{detail?.qualification} | {detail?.specialization}</Text>
                    <Text style={styles.text}>{detail?.instituteName}</Text>
                    <Text style={styles.text}>
                      {detail?.duration?.start?.year}-{detail?.duration?.end?.year}
                    </Text>
                  </View>
                ))}
                <View style={styles.divider} />
              </View>
            )}
            {data?.showExperience && (
              <View>
                <Text style={styles.heading}>EXPERIENCE</Text>
                {data.experience.map((detail, index) => (
                  <View key={index}>
                    <Text style={styles.text}>{detail?.designation} | {detail?.duration?.start?.year}-{detail?.currentlyWorking ? 'Present' : detail?.duration?.end?.year}</Text>
                    <Text style={styles.subHeading}>{detail?.company}</Text>
                    <Text style={styles.text}>{detail?.location}</Text>
                    <Text style={styles.text}>{detail?.responsibilities}</Text>
                    <View style={styles.divider} />
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Resume5PDF;

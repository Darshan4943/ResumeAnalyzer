import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Svg,
  Path,
  Rect,
  Font,
  Defs,
  ClipPath,
} from "@react-pdf/renderer";
function Template14({ data, selectedColor, selectedFont }) {
  return (
    <Page size="A4" style={{ padding: "24px" }}>
      <View
        style={{
          minHeight: 792,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: 400.06,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontFamily: `${selectedFont} 700`,
                color: selectedColor,
              }}
            >
              John Doe
            </Text>
            <Text
              style={{
                width: "100%",
                fontSize: 12,
                fontFamily: `${selectedFont} 400`,
                color: "#4D4D4D",
              }}
            >
              Leading teams and organizations to the realization of successful
              outcomes at the intersection of customer needs and business goals.
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: `${selectedFont} 400`,
                color: "#4D4D4D",
              }}
            >
              johndoe.com
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: `${selectedFont} 400`,
                color: "#4D4D4D",
              }}
            >
              hello@johndoe.com
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: `${selectedFont} 400`,
                color: "#4D4D4D",
              }}
            >
              (310) 555 - 9572
            </Text>
          </View>
        </View>
        <View
          style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
        ></View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: `${selectedFont} 500`,
              color: "#4D4D4D",
            }}
          >
            SKILLS
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
              gap: "8px",
            }}
          >
            {data?.skills?.map((detail, index) => (
              <Text
                key={index}
                style={{
                  width: "22%",
                  fontSize: 12,
                  fontFamily: `${selectedFont} 400`,
                  color: "#4D4D4D",
                }}
              >
                {detail.skill}
              </Text>
            ))}
          </View>
        </View>
        <View
          style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
        ></View>
        <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: `${selectedFont} 500`,
              color: "#4D4D4D",
            }}
          >
            EXPERIENCE
          </Text>
          <View style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {data?.experience?.map((detail, index) => (
              <View
                key={index}
                style={{ gap: 6, display: "flex", flexDirection: "column" }}
              >
                <View style={{ display: "flex", gap: 10 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: `${selectedFont} 600`,
                      color: selectedColor,
                    }}
                  >
                    {" "}
                    {detail.organization}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: `${selectedFont} 400`,
                      color: "#989898",
                    }}
                  >
                    {" "}
                    {detail.designation}
                  </Text>
                </View>
                <View
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: `${selectedFont} 400`,
                      color: "#4D4D4D",
                    }}
                  >
                    {" "}
                    {detail.duration?.start?.year}-{" "}
                    {detail.currentlyWorking
                      ? "Present"
                      : detail.duration?.end?.year}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: `${selectedFont} 400`,
                      color: "#989898",
                    }}
                  >
                    {" "}
                    {detail.location}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: `${selectedFont} 400`,
                    color: "#4D4D4D",
                  }}
                >
                  {detail.description}{" "}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View
          style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
        ></View>
        <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: `${selectedFont} 500`,
              color: "#4D4D4D",
            }}
          >
            EDUCATION
          </Text>
          <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data?.education?.map((detail, index) => (
              <View
                key={index}
                style={{ gap: 6, display: "flex", flexDirection: "column" }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: `${selectedFont} 600`,
                    color: selectedColor,
                  }}
                >
                  {detail.qualification} , {detail.specialization}
                </Text>
                <View
                  style={{ display: "flex", flexDirection: "row", gap: 14.64 }}
                >
                  <Text
                    style={{ fontSize: 12, fontFamily: `${selectedFont} 400` }}
                  >
                    {detail.duration?.start?.year} -{" "}
                    {detail.duration?.end?.year}
                  </Text>
                  <View
                    style={{ width: 1, height: 20, backgroundColor: "#DEDEDE" }}
                  ></View>
                  <Text
                    style={{ fontFamily: `${selectedFont} 400`, fontSize: 12 }}
                  >
                    {" "}
                    {detail.instituteName}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View
          style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
        ></View>
        <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: `${selectedFont} 500`,
              color: "#4D4D4D",
            }}
          >
            CERTIFICATION
          </Text>
          <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data?.course?.map((detail, index) => (
              <View
                key={index}
                style={{ gap: 6, display: "flex", flexDirection: "column" }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: `${selectedFont} 600`,
                    color: selectedColor,
                  }}
                >
                  {detail.courseName}
                </Text>
                <View style={{ display: "flex", gap: 8 }}>
                  <Text
                    style={{ fontSize: 12, fontFamily: `${selectedFont} 400` }}
                  >
                    {detail.duration?.start?.year} -{" "}
                    {detail.duration?.end?.year}
                  </Text>
                  <Text style={{ fontSize: 12, fontFamily: `${selectedFont} 400` }}>{detail.issuedBy}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View
          style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
        ></View>
        <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              gap: 12,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: `${selectedFont} 500`,
                color: "#4D4D4D",
              }}
            >
              {" "}
              HOBBIES
            </Text>
            <View style={{ display: "flex", gap: 4 }}>
              {data?.hobbies?.map((detail, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 12,
                    fontFamily: `${selectedFont} 500`,
                    color: "#4D4D4D",
                  }}
                >
                  {detail.title}
                </Text>
              ))}
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              gap: 12,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: `${selectedFont} 400`,
                color: "#4D4D4D",
              }}
            >
              LANGUAGES
            </Text>
            <View style={{ display: "flex", gap: 4 }}>
              {data?.languages?.map((detail, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 12,
                    fontFamily: `${selectedFont} 400`,
                    color: "#4D4D4D",
                  }}
                >
                  {detail.languages}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Page>
  );
}

export default Template14;

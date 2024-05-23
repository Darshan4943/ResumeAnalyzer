import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect, Font, Defs, ClipPath, data } from '@react-pdf/renderer';

import React from 'react'

const Template47 = ({ data, selectedColor, selectedFont, preview }) => {

    return (
        <Page size="A4" style={{ paddingTop: "12px" }} pageMode={"fullScreen"} wrap={true}>
            <View style={{ marginTop: '-12px' }} >

                <View style={{ display: "flex", flexDirection: "row", paddingVertical: 20, paddingHorizontal: 36, backgroundColor: "#F1F2F2" }}>

                    <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                        <View style={{ display: "flex", flexDirection: "row", gap: 28 }}>
                            <View
                                style={{
                                    minHeight: "87px",
                                    minWidth: "87px",
                                    maxHeight: "87px",
                                    maxWidth: "87px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: 3,
                                    borderColor: selectedColor,

                                    borderRadius: "50%",
                                    overflow: "hidden",
                                }}
                            >
                                {data.profilePhoto ? (
                                    <Image
                                        src={
                                            preview
                                                ? data.profilePhoto
                                                : Object.keys(data?.profilePhoto).includes("filename")
                                                    ? URL.createObjectURL(data.profilePhoto)
                                                    : data.profilePhoto
                                        }
                                        alt=""
                                        style={{
                                            objectFit: "cover",
                                            height: "100%",
                                            width: "100%",
                                            borderRadius: "50%",
                                        }}
                                    />
                                ) : (
                                    <Image
                                        src="/images/services/profile.png"
                                        alt=""
                                        style={{
                                            objectFit: "cover",
                                            height: "100%",
                                            width: "100%",
                                            borderRadius: "50%",
                                        }}
                                    />
                                )}
                            </View>
                            <View style={{ width: 242 }}>
                                <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 32, color: selectedColor }}>{data.firstName}</Text>
                                <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 32, color: "#414042" }}>{data.lastName} </Text>
                                <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 14, color: "#58595B" }}>{data.designation}</Text>
                            </View>
                        </View>
                        <View style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "end" }}>
                            {/* <View style={{ display: "flex", flexDirection: "row", gap: 8, borderBottom: "1 dashed #808285", justifyContent: "flex-end" }}>
                                <Text style={{
                                    fontSize: 10, fontWeight: 400, color: "#808285", flexWrap: "wrap",
                                    width: "80%",
                                }}>{data.location}</Text>
                                <Svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M4.0008 0.5C1.79451 0.5 0 2.28059 0 4.46899C0 5.35055 0.567193 6.78776 1.73443 8.86328C2.55958 10.3307 3.37192 11.5548 3.40557 11.6057L4 12.5L4.59443 11.6057C4.62888 11.5548 5.44042 10.3307 6.26557 8.86328C7.4328 6.78856 8 5.35135 8 4.46979C8.0016 2.2806 6.20709 0.5 4.0008 0.5ZM4.0008 6.50079C2.8552 6.50079 1.9275 5.57949 1.9275 4.44277C1.9275 3.30604 2.856 2.38474 4.0008 2.38474C5.1456 2.38474 6.0749 3.30604 6.0749 4.44277C6.0749 5.5787 5.1464 6.50079 4.0008 6.50079Z" fill="#808285" />
                                </Svg>

                            </View> */}
                            <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "flex-end" }}>
                                <Text style={{ fontSize: 10, fontFamily: `${selectedFont} 400`, color: "#808285" }}>{data.mobileNumber}</Text>
                                <Svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M12.2456 10.5361C12.2679 10.7072 12.2159 10.8552 12.0903 10.9808L10.6122 12.4491C10.5453 12.5235 10.4585 12.5863 10.3511 12.6384C10.2437 12.6905 10.138 12.7236 10.0347 12.7384C10.0272 12.7384 10.0049 12.7401 9.96775 12.7442C9.93057 12.7484 9.88265 12.75 9.82316 12.75C9.68271 12.75 9.45467 12.726 9.13988 12.6773C8.82427 12.6293 8.43925 12.5103 7.98401 12.3209C7.52876 12.1316 7.01155 11.8481 6.4332 11.4703C5.85485 11.0925 5.24014 10.5725 4.58743 9.91357C4.06857 9.40184 3.63894 8.91242 3.29771 8.44533C2.95731 7.97824 2.683 7.5467 2.4748 7.14988C2.26742 6.75306 2.11209 6.39345 2.00799 6.07104C1.90471 5.74862 1.83365 5.47084 1.79647 5.23689C1.75929 5.00293 1.74442 4.82023 1.75186 4.6863C1.75929 4.5532 1.7626 4.4788 1.7626 4.46392C1.77747 4.35975 1.81052 4.25476 1.86257 4.14646C1.91462 4.03899 1.97742 3.95219 2.05177 3.88522L3.52988 2.40541C3.63315 2.30207 3.75213 2.25 3.88598 2.25C3.98264 2.25 4.06774 2.27727 4.14128 2.33266C4.21564 2.38805 4.27843 2.45668 4.33048 2.53852L5.52023 4.79625C5.58715 4.91447 5.60533 5.04427 5.57559 5.18563C5.54584 5.32617 5.48305 5.44521 5.38638 5.54111L4.84191 6.08592C4.82703 6.1008 4.81381 6.12477 4.80307 6.15867C4.79151 6.19174 4.78655 6.21984 4.78655 6.24217C4.81629 6.39759 4.88239 6.57533 4.98649 6.77539C5.07573 6.95314 5.21288 7.17056 5.39795 7.42684C5.58302 7.68229 5.84659 7.97742 6.18699 8.31059C6.51995 8.65202 6.81739 8.91657 7.076 9.10588C7.33543 9.29437 7.5519 9.43408 7.72623 9.52336C7.90056 9.61182 8.03358 9.66639 8.12612 9.68458L8.26492 9.71268C8.27979 9.71268 8.30375 9.70689 8.33763 9.69614C8.37067 9.6854 8.39464 9.67217 8.41033 9.65729L9.04404 9.01246C9.17789 8.89424 9.33322 8.83472 9.51085 8.83472C9.63644 8.83472 9.73724 8.85704 9.81077 8.90168H9.82234L11.968 10.1698C12.1233 10.2649 12.2159 10.3873 12.2456 10.5361Z" fill="#808285" />
                                </Svg>

                            </View>
                            <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "flex-end", alignItems: "center" }}>
                                <Text style={{ fontSize: 10, fontFamily: `${selectedFont} 400`, color: "#808285" ,display:"flex",flexWrap:"wrap",flexShrink: 1}}>{data.email}</Text>
                                <Svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.25 7.12535C11.25 7.35552 11.1853 7.569 11.0817 7.75675L7.76646 4.04697L11.0456 1.1772C11.1728 1.37956 11.25 1.61737 11.25 1.87466V7.12535ZM5.99965 4.72078L10.5623 0.728001C10.3753 0.625087 10.1639 0.5625 9.93654 0.5625H2.06206C1.834 0.5625 1.62332 0.625087 1.43697 0.728001L5.99965 4.72078ZM7.27208 4.47949L6.2159 5.40432C6.15401 5.45786 6.07683 5.48498 5.99965 5.48498C5.92247 5.48498 5.84529 5.45787 5.78341 5.40363L4.72722 4.4788L1.37022 8.23585C1.57117 8.36171 1.80758 8.4375 2.06276 8.4375H9.93793C10.1931 8.4375 10.4288 8.36171 10.6298 8.23585L7.27208 4.47949ZM0.954423 1.17789C0.82718 1.38024 0.75 1.61806 0.75 1.87535V7.12535C0.75 7.35552 0.813969 7.569 0.918267 7.75675L4.23285 4.04697L0.954423 1.17789Z" fill="#808285" />
                                </Svg>

                            </View>


                        </View>
                    </View>




                </View>

                <View style={{ paddingTop: 20, paddingHorizontal: 36, gap: 20 }}>

                    {data?.experience?.length > 0 && (
                        <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                            <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center", alignItems: "center" }}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.991 23C18.0661 23 22.9965 18.0751 23.0033 12C23.0101 5.92487 18.0908 1 12.0156 1C5.9405 1 1.01011 5.92487 1.00331 12C0.996512 18.0751 5.91588 23 11.991 23Z" fill="#383839" />
                                    <Path d="M12.7866 13.0684V12.7343C12.7866 12.3272 12.452 12 12.0393 12C11.6265 12 11.293 12.3272 11.293 12.7343V13.0684C11.293 13.4735 11.6265 13.8027 12.0393 13.8027C12.452 13.8027 12.7866 13.4735 12.7866 13.0684Z" fill="white" />
                                    <Path d="M13.3004 13.659C13.1341 14.1714 12.6352 14.5484 12.0402 14.5484C11.4451 14.5484 10.9463 14.1714 10.78 13.659H5.63408C5.30951 13.659 5.00299 13.587 4.72852 13.4629V16.6949C4.72852 17.3248 5.27346 17.842 5.94162 17.842H18.1407C18.8089 17.842 19.3538 17.3248 19.3538 16.6949V13.4648C19.0784 13.5879 18.7718 13.659 18.4473 13.659H13.3004Z" fill="white" />
                                    <Path d="M18.3951 7.85428H15.4821C15.3078 6.81516 14.3531 6.01758 13.2061 6.01758H10.8721C9.72411 6.01758 8.77045 6.81611 8.59415 7.85428H5.6831C4.98889 7.85428 4.41992 8.37146 4.41992 9.00232V11.6489C4.41992 12.2836 4.96386 12.797 5.63302 12.797H10.7228C10.7389 12.4664 10.8901 12.1699 11.1265 11.9558C11.1325 11.9482 11.1416 11.9444 11.1486 11.9378C11.2017 11.8933 11.2568 11.8497 11.3159 11.8118C11.3369 11.7995 11.3619 11.79 11.384 11.7768C11.4331 11.7503 11.4822 11.7218 11.5332 11.7029C11.5743 11.6858 11.6204 11.6764 11.6635 11.665C11.7025 11.6536 11.7376 11.6394 11.7757 11.6328C11.8598 11.6158 11.949 11.6072 12.0381 11.6072C12.1283 11.6072 12.2154 11.6158 12.3006 11.6328C12.3396 11.6394 12.3747 11.6536 12.4128 11.665C12.4558 11.6764 12.4999 11.6858 12.542 11.7029C12.5951 11.7237 12.6442 11.7503 12.6932 11.7768C12.7153 11.7891 12.7393 11.7986 12.7614 11.8118C12.8205 11.8497 12.8756 11.8933 12.9266 11.9378C12.9337 11.9444 12.9427 11.9492 12.9507 11.9558C13.1881 12.1708 13.3374 12.4664 13.3544 12.797H18.4442C19.1134 12.797 19.6573 12.2835 19.6573 11.6498V9.00138C19.6583 8.37147 19.0903 7.85428 18.3951 7.85428ZM9.76417 7.85428C9.91944 7.41381 10.3552 7.09081 10.8731 7.09081H13.2071C13.725 7.09081 14.1608 7.41287 14.3161 7.85428H9.76417Z" fill="white" />
                                </Svg>

                                <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 14, color: selectedColor }}>EXPERIENCE</Text>
                                <View style={{ backgroundColor: "#6D6E71", width: 393, height: 1 }}></View>

                            </View>


                            <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {data?.experience?.map((detail, index) => (
                                    <View
                                        wrap={false}
                                        key={index}
                                        style={{ display: "flex", flexDirection: "column", }}>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}>{detail.duration?.start?.year !== "Year" &&
                                                `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                                                    ? "Present"
                                                    : detail.duration?.end?.year
                                                }
                                        `} </Text>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 379 }}>{detail.designation}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}>{detail.organization}</Text>
                                            <Text style={{ fontSize: 10, color: "#939598", fontFamily: `${selectedFont} 400`, width: 379 }}>{detail.description} </Text>
                                        </View>
                                    </View>

                                ))}
                            </View>
                        </View>
                    )}
                    {data?.education?.length > 0 && (
                        <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center", alignItems: "center" }}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.991 23C18.0661 23 22.9965 18.0751 23.0033 12C23.0101 5.92487 18.0908 1 12.0156 1C5.9405 1 1.01011 5.92487 1.00331 12C0.996512 18.0751 5.91588 23 11.991 23Z" fill="#383839" />
                                    <Path d="M12.7866 13.0684V12.7343C12.7866 12.3272 12.452 12 12.0393 12C11.6265 12 11.293 12.3272 11.293 12.7343V13.0684C11.293 13.4735 11.6265 13.8027 12.0393 13.8027C12.452 13.8027 12.7866 13.4735 12.7866 13.0684Z" fill="white" />
                                    <Path d="M13.0259 14.5777C12.7414 14.7515 12.3765 14.8472 11.9988 14.8472C11.6212 14.8472 11.2563 14.7515 10.9718 14.5777L6.32218 11.7391C6.32218 11.7391 5.90234 11.4833 5.90234 12.0633V14.898C5.90234 16.391 8.6313 18.0001 11.9988 18.0001C15.3654 18.0001 18.0953 16.391 18.0953 14.898V11.9032C18.0953 11.4374 17.7971 11.6649 17.7971 11.6649L13.0259 14.5777Z" fill="white" />
                                    <Path d="M19.7322 9.48215C20.0893 9.2644 20.0893 8.90701 19.7322 8.68926L12.6489 5.16331C12.2918 4.94556 11.7072 4.94556 11.3501 5.16331L4.26779 8.68926C3.91074 8.90701 3.91074 9.2644 4.26779 9.48215L11.3501 13.8058C11.7072 14.0236 12.2918 14.0236 12.6489 13.8058" fill="white" />
                                    <Path d="M19.4393 15.8891V11.1139C19.4393 11.1139 19.4423 10.8874 19.3078 10.9626C19.1999 11.0221 18.9349 11.1695 18.8407 11.2506C18.7327 11.3433 18.7573 11.5532 18.7573 11.5532V15.8891C18.7573 15.9506 18.7043 15.9799 18.6788 15.9945C18.4334 16.138 18.2695 16.4026 18.2695 16.7053C18.2695 17.1612 18.6405 17.5303 19.0988 17.5303C19.5571 17.5303 19.9281 17.1612 19.9281 16.7053C19.9281 16.4006 19.7622 16.1361 19.5159 15.9925C19.4904 15.9789 19.4393 15.9515 19.4393 15.8891Z" fill="white" />
                                </Svg>

                                <View style={{ display: "flex", flexDirection: "row", gap: 16, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 14, color: selectedColor }}>EDUCATION</Text>
                                    <View style={{ backgroundColor: "#6D6E71", width: 393, height: 1 }}></View>
                                </View>
                            </View>

                            <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {data?.education?.map((detail, index) => (
                                    <View
                                        wrap={false}
                                        key={index} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#383839", fontFamily: `${selectedFont} 500`, width: 132 }}>{detail.instituteName}</Text>
                                            <Text style={{ fontSize: 12, color: "#383839", fontFamily: `${selectedFont} 500`, width: 379 }}>{detail.specialization} - {detail.qualification}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#383839", fontFamily: `${selectedFont} 500`, width: 132 }}> {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${detail.duration?.end?.year ==="Year" ? "Pursuing" : detail.duration?.end?.year}`} </Text>
                                        </View>
                                    </View>

                                ))}
                            </View>

                        </View>
                    )}

                    {data?.section?.map((item, index) => (
                        <View
                        wrap={false}
                            key={index}
                            style={{ display: "flex", flexDirection: "column", gap: 12 }}
                        >
                            <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center", alignItems: "center" }}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.991 23C18.0661 23 22.9965 18.0751 23.0033 12C23.0101 5.92487 18.0908 1 12.0156 1C5.9405 1 1.01011 5.92487 1.00331 12C0.996512 18.0751 5.91588 23 11.991 23Z" fill="#383839" />
                                    <Path d="M12.7866 13.0684V12.7343C12.7866 12.3272 12.452 12 12.0393 12C11.6265 12 11.293 12.3272 11.293 12.7343V13.0684C11.293 13.4735 11.6265 13.8027 12.0393 13.8027C12.452 13.8027 12.7866 13.4735 12.7866 13.0684Z" fill="white" />
                                    <Path d="M13.0259 14.5777C12.7414 14.7515 12.3765 14.8472 11.9988 14.8472C11.6212 14.8472 11.2563 14.7515 10.9718 14.5777L6.32218 11.7391C6.32218 11.7391 5.90234 11.4833 5.90234 12.0633V14.898C5.90234 16.391 8.6313 18.0001 11.9988 18.0001C15.3654 18.0001 18.0953 16.391 18.0953 14.898V11.9032C18.0953 11.4374 17.7971 11.6649 17.7971 11.6649L13.0259 14.5777Z" fill="white" />
                                    <Path d="M19.7322 9.48215C20.0893 9.2644 20.0893 8.90701 19.7322 8.68926L12.6489 5.16331C12.2918 4.94556 11.7072 4.94556 11.3501 5.16331L4.26779 8.68926C3.91074 8.90701 3.91074 9.2644 4.26779 9.48215L11.3501 13.8058C11.7072 14.0236 12.2918 14.0236 12.6489 13.8058" fill="white" />
                                    <Path d="M19.4393 15.8891V11.1139C19.4393 11.1139 19.4423 10.8874 19.3078 10.9626C19.1999 11.0221 18.9349 11.1695 18.8407 11.2506C18.7327 11.3433 18.7573 11.5532 18.7573 11.5532V15.8891C18.7573 15.9506 18.7043 15.9799 18.6788 15.9945C18.4334 16.138 18.2695 16.4026 18.2695 16.7053C18.2695 17.1612 18.6405 17.5303 19.0988 17.5303C19.5571 17.5303 19.9281 17.1612 19.9281 16.7053C19.9281 16.4006 19.7622 16.1361 19.5159 15.9925C19.4904 15.9789 19.4393 15.9515 19.4393 15.8891Z" fill="white" />
                                </Svg>

                                <View style={{ display: "flex", flexDirection: "row", gap: 16, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 14, color: selectedColor }}> {item.header}</Text>
                                    <View style={{ backgroundColor: "#6D6E71", width: 393, height: 1 }}></View>
                                </View>
                            </View>

                            {item?.subSection?.map((detail, index) => (
                                <View key={index} wrap={false} style={{
                                    flexDirection: "column",

                                    alignItems: "center",
                                    gap: "16px"
                                }}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            width:"100%"
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                gap: 16,
                                                alignItems: "center",

                                            }}
                                        >
                                            <Svg
                                                width="6"
                                                height="7"
                                                viewBox="0 0 6 7"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <Path
                                                    d="M5.99023 3.49944L-0.00976562 0V7L5.99023 3.49944Z"
                                                    fill={selectedColor}
                                                />
                                            </Svg>
                                            <Text
                                                style={{
                                                    fontFamily: `${selectedFont} 400`,
                                                    fontSize: 12,
                                                    // color: "#414142",
                                                }}
                                            >
                                                {detail.title}
                                            </Text>
                                        </View>
                                        {detail.duration?.start?.year &&
                                            detail.duration?.end?.year && (
                                                <View
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        paddingLeft: 20,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontFamily: `${selectedFont} 400`,
                                                            fontSize: 10,
                                                            color: "#414142",
                                                        }}
                                                    >
                                                        {" "}
                                                        {detail.duration?.start?.year !== "Year" &&
                                                            `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                                                                ? "Present"
                                                                : detail.duration?.end?.year
                                                            }
                         `}
                                                    </Text>
                                                </View>
                                            )}
                                    </View>
                                    <Text
                                        style={{
                                            fontFamily: `${selectedFont} 400`,
                                            fontSize: 10,
                                            color: "#939598",


                                        }}
                                    >
                                        {detail.description}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ))}
                    <View style={{ style: "flex", flexDirection: "column", gap: 48, }}>

                        {data?.skills?.length > 0 && (
                            <View wrap={false} style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center" }}>
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M11.991 23C18.0661 23 22.9965 18.0751 23.0033 12C23.0101 5.92487 18.0908 1 12.0156 1C5.9405 1 1.01011 5.92487 1.00331 12C0.996512 18.0751 5.91588 23 11.991 23Z" fill="#383839" />
                                        <Path d="M12.7866 13.0684V12.7343C12.7866 12.3272 12.452 12 12.0393 12C11.6265 12 11.293 12.3272 11.293 12.7343V13.0684C11.293 13.4735 11.6265 13.8027 12.0393 13.8027C12.452 13.8027 12.7866 13.4735 12.7866 13.0684Z" fill="white" />
                                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M13.2793 18.1521C13.2083 18.0973 13.1233 18.0269 13.1233 18.0269C13.1233 18.0269 13.1233 17.7638 13.1373 17.6943L13.3363 13.3187L19.2438 14.8603C19.3998 14.9024 19.5128 14.8055 19.4988 14.652L19.3428 13.3059C19.3138 13.1387 19.1858 12.9587 19.0308 12.8882L13.3503 10.3742L13.2653 5.99856C13.2513 5.19347 12.9532 4.35998 12.5982 4.13792C12.4562 4.05477 12.2862 4.01272 12.1152 4C11.9442 4.01272 11.7741 4.05477 11.6321 4.13792C11.2781 4.34629 10.9511 5.17978 10.9221 5.98584L10.738 10.3468L5.00154 12.7493C4.85952 12.8051 4.71751 12.9861 4.68951 13.1524L4.50449 14.4857C4.47549 14.6393 4.5905 14.7361 4.74651 14.7077L10.696 13.2903L10.781 17.6659C10.7951 17.7491 10.7951 17.9985 10.7951 17.9985C10.7951 17.9985 10.71 18.069 10.639 18.1247L9.70095 18.8192L9.53094 20H14.3444L14.2034 18.8603L13.2793 18.1521Z" fill="white" />
                                    </Svg>


                                    <View style={{ display: "flex", flexDirection: "row", gap: 16, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 14, color: selectedColor }}>SKILLS</Text>
                                        <View style={{ backgroundColor: "#6D6E71", width: 450, height: 1 }}></View>
                                    </View>
                                </View>

                                <View
                                    style={{ display: "flex", flexDirection: "row", gap: 24, flexWrap: "wrap", }}
                                >
                                    {data?.skills?.map((detail, index) => (
                                        <View
                                            key={index}

                                            style={{
                                                flexDirection: "row",
                                                gap: 8,
                                                alignItems: "center",

                                            }}
                                        >
                                            <Svg
                                                width="6"
                                                height="7"
                                                viewBox="0 0 6 7"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <Path
                                                    d="M5.99023 3.49944L-0.00976562 0V7L5.99023 3.49944Z"
                                                    fill={selectedColor}
                                                />
                                            </Svg>

                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontFamily: `${selectedFont} 500`,
                                                    color: "#414042",
                                                }}
                                            >
                                                {detail.skill}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                        {data?.hobbies?.length > 0 && (
                            <View wrap={false} style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center" }}>
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M11.991 23C18.0661 23 22.9965 18.0751 23.0033 12C23.0101 5.92487 18.0908 1 12.0156 1C5.9405 1 1.01011 5.92487 1.00331 12C0.996512 18.0751 5.91588 23 11.991 23Z" fill="#383839" />
                                        <Path d="M12.7866 13.0684V12.7343C12.7866 12.3272 12.452 12 12.0393 12C11.6265 12 11.293 12.3272 11.293 12.7343V13.0684C11.293 13.4735 11.6265 13.8027 12.0393 13.8027C12.452 13.8027 12.7866 13.4735 12.7866 13.0684Z" fill="white" />
                                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M13.2793 18.1521C13.2083 18.0973 13.1233 18.0269 13.1233 18.0269C13.1233 18.0269 13.1233 17.7638 13.1373 17.6943L13.3363 13.3187L19.2438 14.8603C19.3998 14.9024 19.5128 14.8055 19.4988 14.652L19.3428 13.3059C19.3138 13.1387 19.1858 12.9587 19.0308 12.8882L13.3503 10.3742L13.2653 5.99856C13.2513 5.19347 12.9532 4.35998 12.5982 4.13792C12.4562 4.05477 12.2862 4.01272 12.1152 4C11.9442 4.01272 11.7741 4.05477 11.6321 4.13792C11.2781 4.34629 10.9511 5.17978 10.9221 5.98584L10.738 10.3468L5.00154 12.7493C4.85952 12.8051 4.71751 12.9861 4.68951 13.1524L4.50449 14.4857C4.47549 14.6393 4.5905 14.7361 4.74651 14.7077L10.696 13.2903L10.781 17.6659C10.7951 17.7491 10.7951 17.9985 10.7951 17.9985C10.7951 17.9985 10.71 18.069 10.639 18.1247L9.70095 18.8192L9.53094 20H14.3444L14.2034 18.8603L13.2793 18.1521Z" fill="white" />
                                    </Svg>


                                    <View style={{ display: "flex", flexDirection: "row", gap: 16, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 14, color: selectedColor }}>INTERESTS</Text>
                                        <View style={{ backgroundColor: "#6D6E71", width: 450, height: 1 }}></View>
                                    </View>
                                </View>


                                <View
                                    style={{ display: "flex", flexDirection: "row", gap: 24, flexWrap: "wrap", }}
                                >
                                    {data?.hobbies?.map((detail, index) => (
                                        <View
                                            key={index}
                                            wrap={false}
                                            style={{
                                                flexDirection: "row",
                                                gap: 8,
                                                alignItems: "center",
                                            }}
                                        >
                                            <Svg
                                                width="6"
                                                height="7"
                                                viewBox="0 0 6 7"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <Path
                                                    d="M5.99023 3.49944L-0.00976562 0V7L5.99023 3.49944Z"
                                                    fill={selectedColor}
                                                />
                                            </Svg>

                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontFamily: `${selectedFont} 500`,
                                                    color: "#414042",
                                                }}
                                            >
                                                {detail.title}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>



                </View>









            </View>
        </Page>
    )
}

export default Template47
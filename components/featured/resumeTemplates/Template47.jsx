import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect, Font, Defs, ClipPath, data } from '@react-pdf/renderer';

import React from 'react'

const Template47 = ({ data, selectedColor, selectedFont, preview }) => {

    const formatLink = (link) => {
        if (link?.length > 60) {
            return link?.match(/.{1,60}/g).join('\n');
        }
        return link;
    };

    const formatLink2 = (link) => {
        if (link?.length > 27) {
            return link?.match(/.{1,27}/g).join('\n');
        }
        return link;
    };

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
                                <Text style={{ fontSize: 10, fontFamily: `${selectedFont} 400`, color: "#808285", display: "flex", flexWrap: "wrap", flexShrink: 1 }}>{formatLink2(data.email)} </Text>
                                <Svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.25 7.12535C11.25 7.35552 11.1853 7.569 11.0817 7.75675L7.76646 4.04697L11.0456 1.1772C11.1728 1.37956 11.25 1.61737 11.25 1.87466V7.12535ZM5.99965 4.72078L10.5623 0.728001C10.3753 0.625087 10.1639 0.5625 9.93654 0.5625H2.06206C1.834 0.5625 1.62332 0.625087 1.43697 0.728001L5.99965 4.72078ZM7.27208 4.47949L6.2159 5.40432C6.15401 5.45786 6.07683 5.48498 5.99965 5.48498C5.92247 5.48498 5.84529 5.45787 5.78341 5.40363L4.72722 4.4788L1.37022 8.23585C1.57117 8.36171 1.80758 8.4375 2.06276 8.4375H9.93793C10.1931 8.4375 10.4288 8.36171 10.6298 8.23585L7.27208 4.47949ZM0.954423 1.17789C0.82718 1.38024 0.75 1.61806 0.75 1.87535V7.12535C0.75 7.35552 0.813969 7.569 0.918267 7.75675L4.23285 4.04697L0.954423 1.17789Z" fill="#808285" />
                                </Svg>

                            </View>


                        </View>
                    </View>




                </View>

                <View style={{ paddingTop: 20, paddingHorizontal: 36, gap: 20 }}>

                    {data?.experience?.length > 0 && data?.showExperience === true && (
                        <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center", alignItems: "center" }}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.991 23C18.0661 23 22.9965 18.0751 23.0033 12C23.0101 5.92487 18.0908 1 12.0156 1C5.9405 1 1.01011 5.92487 1.00331 12C0.996512 18.0751 5.91588 23 11.991 23Z" fill={selectedColor} />
                                    <Path d="M12.7858 13.0684V12.7343C12.7858 12.3272 12.4512 12 12.0385 12C11.6258 12 11.2922 12.3272 11.2922 12.7343V13.0684C11.2922 13.4735 11.6258 13.8027 12.0385 13.8027C12.4512 13.8027 12.7858 13.4735 12.7858 13.0684Z" fill="white" />
                                    <Path d="M13.3011 13.6582C13.1348 14.1707 12.6359 14.5477 12.0409 14.5477C11.4459 14.5477 10.947 14.1707 10.7807 13.6582H5.63481C5.31025 13.6582 5.00372 13.5862 4.72925 13.4622V16.6941C4.72925 17.324 5.27419 17.8412 5.94235 17.8412H18.1415C18.8096 17.8412 19.3546 17.324 19.3546 16.6941V13.4641C19.0791 13.5872 18.7726 13.6582 18.448 13.6582H13.3011Z" fill="white" />
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
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}> {detail.designation}

                                            </Text>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 379 }}>{detail.organization}

                                            </Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}>{detail.duration?.start?.year !== "Year" &&
                                                `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                                                    ? "Present"
                                                    : detail.duration?.end?.year
                                                }
                                               `}</Text>
                                            <Text style={{ fontSize: 10, color: "#939598", fontFamily: `${selectedFont} 400`, width: 379 }}>{detail.description} </Text>
                                        </View>
                                    </View>

                                ))}
                            </View>
                        </View>
                    )}

                    {data?.education?.length > 0 && data?.showEducation === true && (
                        <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center", alignItems: "center" }}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.9958 23C18.0687 23 22.9935 18.0751 22.9958 12C22.9981 5.92489 18.0768 1 12.004 1C5.93109 1 1.00623 5.92489 1.00397 12C1.00171 18.0751 5.92291 23 11.9958 23Z" fill={selectedColor} />
                                    <Path d="M13.024 15.1207C12.7387 15.2962 12.3728 15.3929 11.9941 15.3929C11.6155 15.3929 11.2496 15.2962 10.9643 15.1207L6.30209 12.2541C6.30209 12.2541 5.8811 11.9958 5.8811 12.5815V15.4441C5.8811 16.9519 8.61844 18.577 11.9941 18.577C15.3698 18.577 18.1072 16.9519 18.1072 15.4441V12.4198C18.1072 11.9494 17.8082 12.1791 17.8082 12.1791L13.024 15.1207Z" fill="white" />
                                    <Path d="M19.7478 9.97177C20.1058 9.75187 20.1058 9.39097 19.7478 9.17107L12.6453 5.61024C12.2872 5.39034 11.701 5.39034 11.343 5.61024L4.24142 9.17107C3.88339 9.39097 3.88339 9.75187 4.24142 9.97177L11.343 14.3382C11.701 14.5581 12.2872 14.5581 12.6453 14.3382" fill="white" />
                                    <Path d="M19.4559 16.4444V11.6214C19.4559 11.6214 19.4588 11.3926 19.3241 11.4686C19.2159 11.5287 18.9503 11.6776 18.8559 11.7595C18.7477 11.8532 18.7723 12.0652 18.7723 12.0652V16.4444C18.7723 16.5065 18.7192 16.5361 18.6936 16.5509C18.4477 16.6959 18.2834 16.9631 18.2834 17.2688C18.2834 17.7293 18.6552 18.1021 19.1146 18.1021C19.5739 18.1021 19.9457 17.7293 19.9457 17.2688C19.9457 16.9611 19.7795 16.6939 19.5326 16.549C19.507 16.5352 19.4559 16.5065 19.4559 16.4444Z" fill="white" />
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
                                                `${detail.duration?.start?.year}-${detail.duration?.end?.year === "Year" ? "Pursuing" : detail.duration?.end?.year}`} </Text>
                                        </View>
                                    </View>

                                ))}
                            </View>

                        </View>
                    )}

                    {data?.internship?.length > 0 && data?.showInternship === true && (
                        <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center", alignItems: "center" }}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.9958 23C18.0687 23 22.9935 18.0751 22.9958 12C22.9981 5.92489 18.0768 1 12.004 1C5.93109 1 1.00623 5.92489 1.00397 12C1.00171 18.0751 5.92291 23 11.9958 23Z" fill={selectedColor} />
                                    <Path d="M6.99932 17.4C6.72932 17.4 6.49512 17.3008 6.29672 17.1025C6.09842 16.9041 5.99927 16.6699 5.99927 16.3999V9.40005C5.99927 9.13005 6.09842 8.89585 6.29672 8.69745C6.49512 8.49915 6.72932 8.4 6.99932 8.4H9.59927V7.00005C9.59927 6.73005 9.69842 6.49585 9.89672 6.29745C10.0951 6.09915 10.3293 6 10.5993 6H13.3992C13.6692 6 13.9034 6.09915 14.1018 6.29745C14.3001 6.49585 14.3993 6.73005 14.3993 7.00005V8.4H16.9992C17.2692 8.4 17.5034 8.49915 17.7018 8.69745C17.9001 8.89585 17.9993 9.13005 17.9993 9.40005V16.3999C17.9993 16.6699 17.9001 16.9041 17.7018 17.1025C17.5034 17.3008 17.2692 17.4 16.9992 17.4H6.99932ZM10.5993 8.4H13.3992V7.00005H10.5993V8.4Z" fill="white" />
                                </Svg>
                                <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 14, color: selectedColor }}>INTERNSHIP</Text>
                                <View style={{ backgroundColor: "#6D6E71", width: 393, height: 1 }}></View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {data?.internship?.map((detail, index) => (
                                    <View
                                        // wrap={false}
                                        key={index}
                                        style={{ display: "flex", flexDirection: "column", }}>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}>{detail.title} </Text>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 379 }}>{detail.organization}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}>
                                                {detail.duration?.start?.year !== "Year" &&
                                                    `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                                                        ? "Present"
                                                        : detail.duration?.end?.year
                                                    }
                                        `}
                                            </Text>
                                            <Text style={{ fontSize: 10, color: "#939598", fontFamily: `${selectedFont} 400`, width: 379 }}>{detail.description} </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {data?.course?.length > 0 && data?.showCourses === true && (
                        <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center", alignItems: "center" }}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.9958 23C18.0687 23 22.9935 18.0751 22.9958 12C22.9981 5.92489 18.0768 1 12.004 1C5.93109 1 1.00623 5.92489 1.00397 12C1.00171 18.0751 5.92291 23 11.9958 23Z" fill={selectedColor} />
                                    <Path d="M15.8617 11.0998C14.4972 11.0998 13.3868 12.2101 13.3868 13.5747C13.3868 14.9393 14.4972 16.0496 15.8617 16.0496C17.2263 16.0496 18.3366 14.9393 18.3366 13.5747C18.3366 12.2101 17.2263 11.0998 15.8617 11.0998ZM16.911 13.1776C16.1916 14.2569 16.3956 13.9509 16.0111 14.5276C15.8729 14.7347 15.5933 14.7897 15.387 14.6522L14.712 14.2022C14.5053 14.0644 14.4496 13.7851 14.5874 13.5781C14.7252 13.3714 15.0045 13.3157 15.2115 13.4535L15.5119 13.6538C16.2295 12.5774 16.1909 12.6072 16.3117 12.5384C16.7216 12.3013 17.1744 12.782 16.911 13.1776ZM13.8368 16.2729V18.7495C13.8368 19.0943 14.2102 19.3116 14.5101 19.1402L15.8617 18.3679L17.2134 19.1402C17.512 19.3113 17.8867 19.0953 17.8867 18.7495V16.2729C16.6878 17.1749 15.0374 17.1762 13.8368 16.2729ZM16.7617 10.3219V5.77736C16.7617 5.2385 16.3232 4.80005 15.7844 4.80005H7.83937C7.30051 4.80005 6.86206 5.2385 6.86206 5.77736V16.1973C6.86206 16.7361 7.30051 17.1746 7.83937 17.1746H12.9368C12.9368 15.2382 12.9338 15.358 12.9439 15.2689C11.4375 12.6864 13.8362 9.50946 16.7617 10.3219ZM9.56196 7.04997H13.3868C13.6354 7.04997 13.8368 7.25133 13.8368 7.49995C13.8368 7.74856 13.6354 7.94993 13.3868 7.94993H9.56196C9.31334 7.94993 9.11198 7.74856 9.11198 7.49995C9.11198 7.25133 9.31334 7.04997 9.56196 7.04997ZM11.8119 11.5498H9.56196C9.31334 11.5498 9.11198 11.3484 9.11198 11.0998C9.11198 10.8512 9.31334 10.6498 9.56196 10.6498H11.8119C12.0605 10.6498 12.2619 10.8512 12.2619 11.0998C12.2619 11.3484 12.0605 11.5498 11.8119 11.5498ZM9.56196 9.74986C9.31334 9.74986 9.11198 9.5485 9.11198 9.29988C9.11198 9.05127 9.31334 8.8499 9.56196 8.8499H13.3868C13.6354 8.8499 13.8368 9.05127 13.8368 9.29988C13.8368 9.5485 13.6354 9.74986 13.3868 9.74986H9.56196Z" fill="white" />
                                </Svg>
                                <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 14, color: selectedColor }}>COURSE</Text>
                                <View style={{ backgroundColor: "#6D6E71", width: 393, height: 1 }}></View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {data?.course?.map((detail, index) => (
                                    <View
                                        // wrap={false}
                                        key={index}
                                        style={{ display: "flex", flexDirection: "column", }}>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}>
                                                {detail.title}
                                            </Text>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 379 }}>{detail.organization}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}> {detail.duration?.start?.year !== "Year" &&
                                                `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                                                    ? "Present"
                                                    : detail.duration?.end?.year
                                                }
                                                `} </Text>
                                            <Text style={{ fontSize: 10, color: "#939598", fontFamily: `${selectedFont} 400`, width: 379 }}>{detail.description} </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {data?.project?.length > 0 && data?.showProject === true && (
                        <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                            <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center", alignItems: "center" }}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.9958 23C18.0687 23 22.9935 18.0751 22.9958 12C22.9981 5.92489 18.0768 1 12.004 1C5.93109 1 1.00623 5.92489 1.00397 12C1.00171 18.0751 5.92291 23 11.9958 23Z" fill={selectedColor} />
                                    <Path d="M7.36265 17.4153C7.12931 17.5087 6.91056 17.4853 6.7064 17.3453C6.50223 17.2053 6.40015 17.0128 6.40015 16.7678V13.6528C6.40015 13.4195 6.45556 13.1978 6.5664 12.9878C6.67723 12.7778 6.83181 12.6087 7.03015 12.4803L7.80015 11.9728C7.88181 12.9178 8.00723 13.7345 8.1764 14.4228C8.34556 15.1112 8.62265 15.8928 9.00765 16.7678L7.36265 17.4153ZM10.4601 16.4003C10.2968 16.4003 10.1568 16.3478 10.0401 16.2428C9.92348 16.1378 9.83598 16.0095 9.77765 15.8578C9.46265 15.0528 9.22931 14.3091 9.07765 13.6266C8.92598 12.9441 8.85015 12.1595 8.85015 11.2728C8.85015 9.96617 9.08348 8.72075 9.55015 7.53658C10.0168 6.35242 10.6526 5.39283 11.4576 4.65783C11.5276 4.58783 11.6122 4.53825 11.7114 4.50908C11.8106 4.47992 11.9068 4.46533 12.0001 4.46533C12.0935 4.46533 12.1897 4.47992 12.2889 4.50908C12.3881 4.53825 12.4726 4.58783 12.5426 4.65783C13.3476 5.39283 13.9835 6.35242 14.4501 7.53658C14.9168 8.72075 15.1501 9.96617 15.1501 11.2728C15.1501 12.1712 15.0743 12.9587 14.9226 13.6353C14.771 14.312 14.5376 15.0528 14.2226 15.8578C14.1643 16.0095 14.0768 16.1378 13.9601 16.2428C13.8435 16.3478 13.7035 16.4003 13.5401 16.4003H10.4601ZM12.0001 11.5003C12.3851 11.5003 12.7147 11.3632 12.9889 11.0891C13.2631 10.8149 13.4001 10.4853 13.4001 10.1003C13.4001 9.71533 13.2631 9.38575 12.9889 9.11158C12.7147 8.83742 12.3851 8.70033 12.0001 8.70033C11.6151 8.70033 11.2856 8.83742 11.0114 9.11158C10.7372 9.38575 10.6001 9.71533 10.6001 10.1003C10.6001 10.4853 10.7372 10.8149 11.0114 11.0891C11.2856 11.3632 11.6151 11.5003 12.0001 11.5003ZM16.6376 17.4153L14.9926 16.7678C15.3776 15.8928 15.6547 15.1112 15.8239 14.4228C15.9931 13.7345 16.1185 12.9178 16.2001 11.9728L16.9701 12.4803C17.1685 12.6087 17.3231 12.7778 17.4339 12.9878C17.5447 13.1978 17.6001 13.4195 17.6001 13.6528V16.7678C17.6001 17.0128 17.4981 17.2053 17.2939 17.3453C17.0897 17.4853 16.871 17.5087 16.6376 17.4153Z" fill="white" />
                                </Svg>


                                <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 14, color: selectedColor }}>PROJECT</Text>
                                <View style={{ backgroundColor: "#6D6E71", width: 393, height: 1 }}></View>

                            </View>


                            <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {data?.project?.map((detail, index) => (
                                    <View
                                        // wrap={false}
                                        key={index}
                                        style={{ display: "flex", flexDirection: "column", }}>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}>{detail.title}</Text>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 379 }}>{detail.organization}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}>{detail.duration?.start?.year !== "Year" &&
                                                `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                                                    ? "Present"
                                                    : detail.duration?.end?.year
                                                }
                                        `} </Text>
                                            <Text style={{ fontSize: 10, color: "#939598", fontFamily: `${selectedFont} 400`, width: 379 }}>{detail.description} </Text>
                                        </View>
                                    </View>

                                ))}
                            </View>
                        </View>
                    )}

                    {data?.skills?.length > 0 && data?.showSkills === true && (
                        <View wrap={false} style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center" }}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.9958 23C18.0687 23 22.9935 18.0751 22.9958 12C22.9981 5.92489 18.0768 1 12.004 1C5.93109 1 1.00623 5.92489 1.00397 12C1.00171 18.0751 5.92291 23 11.9958 23Z" fill={selectedColor} />
                                    <Path d="M6.87842 15.114L9.44863 12.5438L10.4968 13.5919L7.92655 16.1621L6.87842 15.114Z" fill="white" />
                                    <Path d="M8.44507 16.6846L11.0153 14.1144L12.0634 15.1625L9.49322 17.7327L8.44507 16.6846Z" fill="white" />
                                    <Path d="M6.01099 18.5999L8.90457 18.1865L6.42432 15.7063L6.01099 18.5999Z" fill="white" />
                                    <Path d="M12.5557 9.43701L14.4713 7.52136L15.5194 8.56949L13.6038 10.4851L12.5557 9.43701Z" fill="white" />
                                    <Path d="M14.1248 11.0071L16.0404 9.09141L17.0886 10.1395L15.1729 12.0552L14.1248 11.0071Z" fill="white" />
                                    <Path d="M18.0675 9.16012C18.4173 8.8104 18.6099 8.34541 18.6099 7.8508C18.6099 7.3562 18.4173 6.89121 18.0675 6.54149C17.3456 5.8195 16.1709 5.8195 15.4489 6.54149L14.9922 6.99821L17.6108 9.61685L18.0675 9.16012Z" fill="white" />
                                    <Path d="M11.2066 9.13145C11.375 8.27783 11.1096 7.38938 10.4882 6.768C9.99294 6.27274 9.33445 6 8.634 6C8.34049 6 8.05144 6.04848 7.77491 6.14412L7.21741 6.33692L8.81145 7.93096L7.94212 8.80029L6.34806 7.20625L6.15525 7.76376C5.99676 8.22203 5.96824 8.71499 6.07276 9.18934C6.18026 9.67712 6.4245 10.1224 6.77914 10.477C7.27443 10.9723 7.93296 11.2451 8.63349 11.2451C8.80473 11.2451 8.97521 11.2284 9.14258 11.1954L13.4148 15.4676C13.2464 16.3212 13.5118 17.2097 14.1332 17.8311C14.6285 18.3263 15.287 18.5991 15.9874 18.5991C16.2809 18.5991 16.57 18.5506 16.8465 18.4549L17.404 18.2621L15.8099 16.6681L16.6792 15.7988L18.2733 17.3928L18.4661 16.8353C18.6246 16.377 18.6531 15.8841 18.5486 15.4097C18.4411 14.9219 18.1969 14.4766 17.8422 14.122C17.347 13.6268 16.6884 13.354 15.9879 13.354C15.8166 13.354 15.6462 13.3707 15.4788 13.4036L11.2066 9.13145Z" fill="white" />
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

                    {data?.achievements?.length > 0 && data?.showAchievements === true && (
                        <View wrap={false} style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center" }}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.9958 23C18.0687 23 22.9935 18.0751 22.9958 12C22.9981 5.92489 18.0768 1 12.004 1C5.93109 1 1.00623 5.92489 1.00397 12C1.00171 18.0751 5.92291 23 11.9958 23Z" fill={selectedColor} />

                                    <Path d="M8.79256 11.2418V8.62015H7.23256V9.31353C7.23256 9.77568 7.37881 10.1828 7.67131 10.5349C7.96381 10.887 8.33756 11.1226 8.79256 11.2418ZM15.2058 11.2418C15.6608 11.1226 16.0345 10.887 16.327 10.5349C16.6195 10.1828 16.7658 9.77568 16.7658 9.31353V8.62015H15.2058V11.2418ZM11.4576 16.7668V14.4918C10.8905 14.3726 10.3859 14.1298 9.94354 13.7633C9.50122 13.3968 9.18976 12.9391 9.00917 12.3901C8.20393 12.2999 7.52592 11.965 6.97516 11.3854C6.4245 10.8058 6.14917 10.1152 6.14917 9.31353V8.62015C6.14917 8.32223 6.25523 8.06721 6.46734 7.8551C6.67957 7.64287 6.93464 7.53676 7.23256 7.53676H8.79256V7.23353C8.79256 6.93562 8.89862 6.68055 9.11073 6.46832C9.32285 6.25621 9.57787 6.15015 9.87578 6.15015H14.1226C14.4205 6.15015 14.6755 6.25621 14.8876 6.46832C15.0997 6.68055 15.2058 6.93562 15.2058 7.23353V7.53676H16.7658C17.0637 7.53676 17.3188 7.64287 17.531 7.8551C17.7431 8.06721 17.8492 8.32223 17.8492 8.62015V9.31353C17.8492 10.1152 17.5738 10.8058 17.0232 11.3854C16.4724 11.965 15.7944 12.2999 14.9892 12.3901C14.8086 12.9391 14.4971 13.3968 14.0548 13.7633C13.6125 14.1298 13.1078 14.3726 12.5408 14.4918V16.7668H14.5126C14.666 16.7668 14.7946 16.8189 14.8985 16.9231C15.0023 17.0273 15.0542 17.1564 15.0542 17.3103C15.0542 17.4644 15.0023 17.5929 14.8985 17.6958C14.7946 17.7987 14.666 17.8501 14.5126 17.8501H9.48578C9.33238 17.8501 9.20374 17.798 9.09984 17.6938C8.99606 17.5897 8.94417 17.4606 8.94417 17.3066C8.94417 17.1525 8.99606 17.0241 9.09984 16.9211C9.20374 16.8182 9.33238 16.7668 9.48578 16.7668H11.4576Z" fill="white" />

                                </Svg>




                                <View style={{ display: "flex", flexDirection: "row", gap: 16, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 14, color: selectedColor }}>ACHIEVEMENTS</Text>
                                    <View style={{ backgroundColor: "#6D6E71", width: 450, height: 1 }}></View>
                                </View>
                            </View>

                            <View
                                style={{ display: "flex", flexDirection: "row", gap: 24, flexWrap: "wrap", }}
                            >
                                {data?.achievements?.map((detail, index) => (
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
                                            {detail.title}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {data?.extraCaricularData?.length > 0 && data?.showExtraCariculam === true && (
                        <View wrap={false} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                            <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center", alignItems: "center" }}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.9958 23C18.0687 23 22.9935 18.0751 22.9958 12C22.9981 5.92489 18.0768 1 12.004 1C5.93109 1 1.00623 5.92489 1.00397 12C1.00171 18.0751 5.92291 23 11.9958 23Z" fill={selectedColor} />
                                    <Path d="M18.8978 8.42644L10.3162 5.60347V5.4046C10.3162 5.07071 10.0456 4.80005 9.71168 4.80005C9.37778 4.80005 9.10713 5.07071 9.10713 5.4046V16.9187C8.07737 17.068 7.19726 17.581 6.66589 18.1684C6.59737 18.2442 6.5799 18.3532 6.62134 18.4466C6.66278 18.54 6.75537 18.6 6.85751 18.6H12.5658C12.668 18.6 12.7605 18.5399 12.802 18.4465C12.8434 18.3532 12.826 18.2442 12.7575 18.1684C12.2261 17.5812 11.3459 17.0683 10.3162 16.9188V12.0271L18.8977 9.20407C19.0656 9.14885 19.1791 8.99203 19.1791 8.81526C19.1792 8.63849 19.0657 8.4817 18.8978 8.42644Z" fill="white" />
                                </Svg>
                                <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 14, color: selectedColor }}>ACTIVITIES</Text>
                                <View style={{ backgroundColor: "#6D6E71", width: 393, height: 1 }}></View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {data?.extraCaricularData?.map((detail, index) => (
                                    <View
                                        // wrap={false}
                                        key={index}
                                        style={{ display: "flex", flexDirection: "column", }}>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}>
                                                {detail.title}
                                            </Text>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 379 }}>{detail.organization}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}>{detail.duration?.start?.year !== "Year" &&
                                                `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                                                    ? "Present"
                                                    : detail.duration?.end?.year
                                                }
                                        `}</Text>
                                            <Text style={{ fontSize: 10, color: "#939598", fontFamily: `${selectedFont} 400`, width: 379 }}>{detail.description} </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {data?.socialLinks?.length > 0 && data?.showLinks === true && (
                        <View wrap={false} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                            <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center", alignItems: "center" }}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.9958 23C18.0687 23 22.9935 18.0751 22.9958 12C22.9981 5.92489 18.0768 1 12.004 1C5.93109 1 1.00623 5.92489 1.00397 12C1.00171 18.0751 5.92291 23 11.9958 23Z" fill={selectedColor} />
                                    <Path d="M15.1815 10.5146L17.0907 12.4238C17.4006 12.7295 17.6468 13.0934 17.8154 13.4947C17.984 13.8959 18.0715 14.3266 18.073 14.7618C18.0744 15.197 17.9898 15.6282 17.8239 16.0306C17.658 16.433 17.4142 16.7986 17.1064 17.1063C16.7987 17.4141 16.4331 17.6579 16.0307 17.8238C15.6284 17.9896 15.1971 18.0743 14.7619 18.0728C14.3267 18.0714 13.8961 17.9838 13.4948 17.8153C13.0936 17.6467 12.7296 17.4004 12.4239 17.0906L11.7879 16.4546C11.702 16.3716 11.6333 16.2724 11.5861 16.1626C11.5389 16.0528 11.514 15.9347 11.5129 15.8152C11.5118 15.6957 11.5345 15.5772 11.5797 15.4666C11.6249 15.3559 11.6917 15.2554 11.7762 15.1709C11.8607 15.0863 11.9611 15.0195 12.0717 14.9741C12.1823 14.9288 12.3008 14.906 12.4203 14.907C12.5398 14.908 12.6579 14.9327 12.7677 14.9799C12.8775 15.027 12.9769 15.0955 13.0599 15.1814L13.6971 15.818C13.9789 16.0972 14.3598 16.2535 14.7565 16.2526C15.1532 16.2516 15.5334 16.0936 15.8138 15.8131C16.0943 15.5325 16.2522 15.1523 16.253 14.7556C16.2538 14.359 16.0975 13.9781 15.8181 13.6964L13.9089 11.7872C13.7026 11.5808 13.4405 11.439 13.1548 11.3793C12.869 11.3197 12.5721 11.3446 12.3003 11.4512C12.2031 11.4896 12.1131 11.5292 12.0279 11.5688L11.7495 11.699C11.3775 11.867 11.0913 11.939 10.7271 11.5754C10.2039 11.0522 10.3395 10.5692 10.9773 10.1294C11.6128 9.69246 12.3811 9.49175 13.1491 9.56211C13.917 9.63247 14.6361 9.96946 15.1815 10.5146ZM11.5755 6.90862L12.2115 7.54462C12.3756 7.71428 12.4664 7.94158 12.4645 8.17756C12.4625 8.41354 12.368 8.63931 12.2012 8.80626C12.0344 8.97321 11.8087 9.06797 11.5727 9.07013C11.3368 9.07229 11.1094 8.98168 10.9395 8.81782L10.3029 8.18182C10.1646 8.03851 9.99913 7.92419 9.81615 7.84553C9.63317 7.76686 9.43635 7.72543 9.23718 7.72364C9.03801 7.72185 8.84048 7.75975 8.65612 7.83512C8.47175 7.91049 8.30424 8.02182 8.16336 8.16262C8.02248 8.30342 7.91106 8.47087 7.83558 8.65519C7.76011 8.83951 7.7221 9.03702 7.72378 9.23619C7.72545 9.43536 7.76677 9.6322 7.84534 9.81523C7.9239 9.99826 8.03812 10.1638 8.18135 10.3022L10.0905 12.2114C10.2969 12.4179 10.559 12.5596 10.8447 12.6193C11.1305 12.679 11.4274 12.654 11.6991 12.5474C11.7963 12.509 11.8863 12.4694 11.9715 12.4298L12.2499 12.2996C12.6219 12.1316 12.9087 12.0596 13.2723 12.4232C13.7955 12.9464 13.6599 13.4294 13.0221 13.8692C12.3867 14.3062 11.6184 14.5069 10.8504 14.4365C10.0825 14.3662 9.36339 14.0292 8.81795 13.484L6.90875 11.5748C6.59894 11.2691 6.35267 10.9052 6.1841 10.5039C6.01552 10.1027 5.92799 9.67206 5.92653 9.23684C5.92507 8.80162 6.00972 8.37041 6.1756 7.96803C6.34148 7.56566 6.58531 7.20008 6.89306 6.89233C7.20081 6.58458 7.5664 6.34075 7.96877 6.17487C8.37114 6.00899 8.80235 5.92434 9.23757 5.9258C9.67279 5.92726 10.1034 6.01479 10.5047 6.18336C10.9059 6.35193 11.2699 6.59881 11.5755 6.90862Z" fill="white" />
                                </Svg>


                                <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 14, color: selectedColor }}>SOCIAL LINKS</Text>
                                <View style={{ backgroundColor: "#6D6E71", width: 393, height: 1 }}></View>

                            </View>


                            <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {data?.socialLinks?.map((detail, index) => (
                                    <View
                                        // wrap={false}
                                        key={index}
                                        style={{ display: "flex", flexDirection: "column", }}>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}>
                                            </Text>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 379 }}>{detail.platform}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}></Text>
                                            <Text style={{ fontSize: 10, color: "#939598", fontFamily: `${selectedFont} 400`, width: 379 }}>  {formatLink(detail.link)} </Text>
                                        </View>
                                    </View>

                                ))}
                            </View>
                        </View>
                    )}

                    {data?.reference?.length > 0 && data?.showReference === true && (
                        <View wrap={false} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                            <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center", alignItems: "center" }}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.9958 23C18.0687 23 22.9935 18.0751 22.9958 12C22.9981 5.92489 18.0768 1 12.004 1C5.93109 1 1.00623 5.92489 1.00397 12C1.00171 18.0751 5.92291 23 11.9958 23Z" fill={selectedColor} />
                                    <Path d="M9.74912 9.60015V8.55015H13.9491V9.60015H9.74912ZM8.17412 16.9501C8.03488 16.9501 7.90135 16.8948 7.80289 16.7964C7.70443 16.6979 7.64912 16.5644 7.64912 16.4251V6.97515C7.64912 6.83591 7.70443 6.70237 7.80289 6.60392C7.90135 6.50546 8.03488 6.45015 8.17412 6.45015H16.0491V11.4376C16.439 11.6017 16.795 11.8367 17.0991 12.1306V5.40015H8.17412C7.75641 5.40015 7.3558 5.56608 7.06043 5.86145C6.76506 6.15682 6.59912 6.55743 6.59912 6.97515V16.4251C6.59912 16.8429 6.76506 17.2435 7.06043 17.5388C7.3558 17.8342 7.75641 18.0001 8.17412 18.0001H14.7366C14.2775 18.0001 13.8231 17.907 13.4009 17.7266C12.9787 17.5461 12.5975 17.282 12.2801 16.9501H8.17412ZM17.3842 17.9776L15.9893 16.5826C15.615 16.8215 15.1806 16.949 14.7366 16.9501C14.2694 16.9501 13.8126 16.8116 13.4241 16.552C13.0356 16.2924 12.7328 15.9234 12.554 15.4917C12.3751 15.06 12.3284 14.585 12.4195 14.1267C12.5107 13.6685 12.7357 13.2475 13.0661 12.9171C13.3965 12.5867 13.8174 12.3617 14.2757 12.2705C14.734 12.1794 15.209 12.2262 15.6407 12.405C16.0724 12.5838 16.4414 12.8866 16.701 13.2751C16.9606 13.6636 17.0991 14.1204 17.0991 14.5876C17.0979 15.0316 16.9705 15.4661 16.7316 15.8403L18.1265 17.2352L17.3842 17.9776ZM14.7366 15.9001C14.9962 15.9001 15.25 15.8232 15.4658 15.679C15.6816 15.5347 15.8499 15.3297 15.9492 15.0899C16.0486 14.8501 16.0745 14.5862 16.0239 14.3316C15.9733 14.077 15.8483 13.8431 15.6647 13.6596C15.4811 13.476 15.2473 13.351 14.9927 13.3004C14.7381 13.2497 14.4742 13.2757 14.2343 13.3751C13.9945 13.4744 13.7895 13.6426 13.6453 13.8585C13.5011 14.0743 13.4241 14.3281 13.4241 14.5876C13.4241 14.9357 13.5624 15.2696 13.8085 15.5157C14.0547 15.7619 14.3885 15.9001 14.7366 15.9001Z" fill="white" />
                                </Svg>
                                <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 14, color: selectedColor }}>REFERENCE</Text>
                                <View style={{ backgroundColor: "#6D6E71", width: 393, height: 1 }}></View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {data?.reference?.map((detail, index) => (
                                    <View
                                        // wrap={false}
                                        key={index}
                                        style={{ display: "flex", flexDirection: "column", }}>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}>{detail.referantName}</Text>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 379 }}>{detail.organization}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}>{detail.designation}</Text>
                                            <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 379 }}>{detail.email}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}


                    {data?.section?.length > 0 && data?.showCustomSection === true && (
                        <>
                            {data.section.map((item, index) => (
                                <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center", alignItems: "center" }}>
                                        <Svg width="10%" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M12.9999 24.9166C19.5813 24.9166 24.9166 19.5813 24.9166 12.9999C24.9166 6.41852 19.5813 1.08325 12.9999 1.08325C6.41853 1.08325 1.08325 6.41852 1.08326 12.9999C1.08326 19.5813 6.41854 24.9166 12.9999 24.9166Z" fill={selectedColor} />
                                            <Path d="M8.59338 18.8501C8.42008 18.8501 8.27553 18.7918 8.15975 18.675C8.04397 18.5581 7.98608 18.4134 7.98608 18.2408V13.5608H7.10858C6.93601 13.5608 6.79128 13.5022 6.6744 13.385C6.55765 13.2677 6.49927 13.1225 6.49927 12.9493C6.49927 12.776 6.55765 12.6315 6.6744 12.5157C6.79128 12.3999 6.93601 12.342 7.10858 12.342H10.0824C10.2551 12.342 10.3998 12.4006 10.5166 12.5179C10.6333 12.635 10.6917 12.7802 10.6917 12.9535C10.6917 13.1268 10.6333 13.2714 10.5166 13.3872C10.3998 13.5029 10.2551 13.5608 10.0824 13.5608H9.20489V18.2408C9.20489 18.4134 9.14627 18.5581 9.02903 18.675C8.91191 18.7918 8.76669 18.8501 8.59338 18.8501ZM8.59338 11.1232C8.42008 11.1232 8.27553 11.0648 8.15975 10.9481C8.04397 10.8313 7.98608 10.6866 7.98608 10.5139V7.75946C7.98608 7.58689 8.0447 7.44216 8.16195 7.32528C8.27919 7.20852 8.42441 7.15015 8.59759 7.15015C8.7709 7.15015 8.91544 7.20852 9.03122 7.32528C9.147 7.44216 9.20489 7.58689 9.20489 7.75946V10.5139C9.20489 10.6866 9.14627 10.8313 9.02903 10.9481C8.91191 11.0648 8.76669 11.1232 8.59338 11.1232ZM11.5937 10.6236C11.421 10.6236 11.2763 10.565 11.1595 10.4477C11.0426 10.3306 10.9842 10.1854 10.9842 10.0121C10.9842 9.83877 11.0426 9.69423 11.1595 9.57844C11.2763 9.46266 11.421 9.40477 11.5937 9.40477H12.4712V7.75946C12.4712 7.58689 12.5298 7.44216 12.6469 7.32528C12.7641 7.20852 12.9094 7.15015 13.0827 7.15015C13.2559 7.15015 13.4004 7.20852 13.5162 7.32528C13.6319 7.44216 13.6898 7.58689 13.6898 7.75946V9.40477H14.5673C14.74 9.40477 14.8848 9.46339 15.0015 9.58064C15.1184 9.69788 15.1768 9.8431 15.1768 10.0163C15.1768 10.1896 15.1184 10.3341 15.0015 10.4499C14.8848 10.5657 14.74 10.6236 14.5673 10.6236H11.5937ZM13.0783 18.8501C12.9051 18.8501 12.7607 18.7918 12.6449 18.675C12.5291 18.5581 12.4712 18.4134 12.4712 18.2408V12.4517C12.4712 12.279 12.5298 12.1343 12.6469 12.0175C12.7641 11.9008 12.9094 11.8424 13.0827 11.8424C13.2559 11.8424 13.4004 11.9008 13.5162 12.0175C13.6319 12.1343 13.6898 12.279 13.6898 12.4517V18.2408C13.6898 18.4134 13.6313 18.5581 13.5141 18.675C13.3969 18.7918 13.2516 18.8501 13.0783 18.8501ZM17.5634 18.8501C17.3901 18.8501 17.2456 18.7918 17.1298 18.675C17.014 18.5581 16.9561 18.4134 16.9561 18.2408V16.571H16.0786C15.9059 16.571 15.7612 16.5125 15.6445 16.3953C15.5277 16.2781 15.4693 16.1328 15.4693 15.9595C15.4693 15.7863 15.5277 15.6418 15.6445 15.5261C15.7612 15.4103 15.9059 15.3524 16.0786 15.3524H19.0525C19.225 15.3524 19.3698 15.411 19.4866 15.5281C19.6034 15.6453 19.6618 15.7906 19.6618 15.9639C19.6618 16.1371 19.6034 16.2816 19.4866 16.3974C19.3698 16.5131 19.225 16.571 19.0525 16.571H18.175V18.2408C18.175 18.4134 18.1163 18.5581 17.9991 18.675C17.8818 18.7918 17.7366 18.8501 17.5634 18.8501ZM17.5634 14.1336C17.3901 14.1336 17.2456 14.0752 17.1298 13.9584C17.014 13.8416 16.9561 13.6968 16.9561 13.5243V7.75946C16.9561 7.58689 17.0148 7.44216 17.132 7.32528C17.2491 7.20852 17.3943 7.15015 17.5677 7.15015C17.741 7.15015 17.8855 7.20852 18.0013 7.32528C18.1171 7.44216 18.175 7.58689 18.175 7.75946V13.5243C18.175 13.6968 18.1163 13.8416 17.9991 13.9584C17.8818 14.0752 17.7366 14.1336 17.5634 14.1336Z" fill="white" />
                                        </Svg>

                                        <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 14, color: selectedColor, minWidth: "30%" }}>{item.header.toUpperCase()}</Text>
                                        <View style={{ backgroundColor: "#6D6E71", width: "100%", height: 1 }}></View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                        {item?.subSection?.map((detail, index) => (
                                            <View
                                                // wrap={false}
                                                key={index}
                                                style={{ display: "flex", flexDirection: "column", }}>
                                                <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                                    <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}>
                                                        {detail?.duration?.start?.year}
                                                        {detail?.duration?.start?.year && "-"}
                                                        {detail?.duration?.end?.year === "" ||
                                                            detail?.duration?.end?.year === undefined
                                                            ? "Present"
                                                            : detail?.duration?.end?.year}
                                                    </Text>
                                                    <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 379 }}>{detail.designation}</Text>
                                                </View>
                                                <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                                                    <Text style={{ fontSize: 12, color: "#414042", fontFamily: `${selectedFont} 500`, width: 132 }}></Text>
                                                    <Text style={{ fontSize: 10, color: "#939598", fontFamily: `${selectedFont} 400`, width: 379 }}>{detail.description} </Text>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </>
                    )}
                    <View style={{ style: "flex", flexDirection: "column", gap: 48, }}>



                        {data?.hobbies?.length > 0 && data?.showHobbies === true && (
                            <View wrap={false} style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center" }}>
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M11.9958 23C18.0687 23 22.9935 18.0751 22.9958 12C22.9981 5.92489 18.0768 1 12.004 1C5.93109 1 1.00623 5.92489 1.00397 12C1.00171 18.0751 5.92291 23 11.9958 23Z" fill={selectedColor} />
                                        <Path d="M15.3202 10.9319C14.6982 11.5539 13.7669 11.4767 13.1449 10.8546C12.5228 10.2325 12.4455 9.30123 13.0676 8.67918C13.7958 7.95092 14.2867 8.35429 14.8002 8.12717C14.8473 8.10634 14.8739 8.02326 14.8073 7.95665L12.4274 5.57675C12.1919 5.34128 11.8065 5.34128 11.571 5.57675L9.03332 8.11449C8.97979 8.16802 8.95339 8.12261 8.94277 8.09952C8.70451 7.58158 9.13873 7.11531 8.40522 6.3818C7.78316 5.75975 6.85188 5.83701 6.22983 6.45911C5.60778 7.08116 5.53047 8.01244 6.15252 8.63449C6.87857 9.36053 7.34653 8.94618 7.85627 9.16676C7.88384 9.17867 7.945 9.20277 7.87363 9.27414L5.57581 11.572C5.34029 11.8074 5.34029 12.1928 5.57581 12.4283L7.97948 14.832C8.04609 14.8986 8.0012 14.9316 7.97589 14.9426C7.46416 15.1653 6.99992 14.7468 6.27379 15.4729C5.65174 16.095 5.72901 17.0263 6.35106 17.6483C6.97311 18.2704 7.90439 18.3477 8.52644 17.7256C9.25443 16.9976 8.83555 16.5291 9.06017 16.0177C9.07038 15.9944 9.08681 15.9393 9.1332 15.9857L11.5711 18.4235C11.8066 18.659 12.1919 18.659 12.4274 18.4235L18.4226 12.4283C18.6582 12.1928 18.6582 11.8074 18.4226 11.5719L16.0014 9.15069C15.9348 9.08408 15.8821 9.16454 15.8631 9.20499C15.6194 9.72386 16.0572 10.1949 15.3202 10.9319Z" fill="white" />
                                    </Svg>



                                    <View style={{ display: "flex", flexDirection: "row", gap: 16, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 14, color: selectedColor }}>HOBBIES</Text>
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

                        {data?.languages?.length > 0 && data?.showLanguage === true && (
                            <View wrap={false} style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center" }}>
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M11.9958 23C18.0687 23 22.9935 18.0751 22.9958 12C22.9981 5.92489 18.0768 1 12.004 1C5.93109 1 1.00623 5.92489 1.00397 12C1.00171 18.0751 5.92291 23 11.9958 23Z" fill={selectedColor} />
                                        <Path d="M12.12 13.9539C12.376 13.9539 12.6143 13.7914 12.7004 13.536C12.8068 13.2153 12.6345 12.8688 12.3137 12.7619C11.7082 12.5609 11.1351 12.2927 10.595 11.9799C11.721 10.7334 12.0418 9.23225 12.1047 7.84348H13.342C13.6799 7.84348 13.953 7.57037 13.953 7.23249C13.953 6.89462 13.6799 6.62151 13.342 6.62151H10.2871V6.01113C10.2871 5.67326 10.0133 5.40015 9.67607 5.40015C9.33881 5.40015 9.06508 5.67326 9.06508 6.01113V6.62212H6.01016C5.67289 6.62212 5.39917 6.89523 5.39917 7.2331C5.39917 7.57098 5.67289 7.84409 6.01016 7.84409H10.8822C10.8211 9.09233 10.5308 10.3033 9.56731 11.2894C8.85368 10.7316 8.23292 10.0766 7.74108 9.33795C7.55289 9.05751 7.17469 8.98236 6.89303 9.16871C6.61259 9.35689 6.53683 9.73509 6.72379 10.0168C7.23396 10.7817 7.86633 11.4666 8.58363 12.0623C8.15105 12.3263 7.64271 12.5627 7.03844 12.7644C6.71829 12.8707 6.54538 13.2165 6.6523 13.5379C6.73723 13.7914 6.97612 13.9539 7.23213 13.9539C7.29567 13.9539 7.36104 13.9429 7.4252 13.9216C8.32029 13.6234 9.03942 13.2507 9.62963 12.8322C10.3396 13.2819 11.1107 13.6497 11.9269 13.9216C11.9911 13.9429 12.0565 13.9539 12.12 13.9539Z" fill="white" />
                                        <Path d="M18.7744 17.9579L15.7195 11.848C15.5118 11.4338 14.8342 11.4338 14.6264 11.848L11.5715 17.9579C11.4206 18.2597 11.5428 18.6275 11.8446 18.7778C12.1477 18.9281 12.5136 18.8066 12.6639 18.5053L13.4124 17.009H16.9341L17.6826 18.5041C17.7895 18.7192 18.0046 18.842 18.2294 18.842C18.3205 18.842 18.4152 18.8218 18.5019 18.7785C18.8025 18.6257 18.9259 18.2597 18.7744 17.9579ZM14.0228 15.7871L15.1727 13.4873L16.3225 15.7871H14.0228Z" fill="white" />
                                    </Svg>


                                    <View style={{ display: "flex", flexDirection: "row", gap: 16, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontFamily: `${selectedFont} 600`, fontSize: 14, color: selectedColor }}>LANGUAGES</Text>
                                        <View style={{ backgroundColor: "#6D6E71", width: 450, height: 1 }}></View>
                                    </View>
                                </View>


                                <View
                                    style={{ display: "flex", flexDirection: "row", gap: 24, flexWrap: "wrap", }}
                                >
                                    {data?.languages?.map((detail, index) => (
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
                                                {detail.languages}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </Page >
    )
}

export default Template47
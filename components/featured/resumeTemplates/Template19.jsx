import React from "react";
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

function Template19({ data }) {
    return (
        <Page size="A4" style={{ padding: 24 }}>
            <View
                style={{
                    width: 532,
                    display: "flex",
                    flexDirection: "column",
                    gap: 26,
                }}
            >
                <View style={{ display: "flex", flexDirection: "row", gap: 32 }}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                            alignItems: "flex-start",
                            width: 172,
                        }}
                    >
                        <Image
                            src="/images/profile/john_doe.png"
                            style={{
                                width: 161,
                                height: 161,
                                borderRadius: "50%",
                                objectFit: "contain",
                            }}
                        />

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 10,
                                alignItems: "center",
                            }}
                        >
                            <Image
                                src="/images/services/call.png"
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    objectFit: "contain",
                                }}
                            />
                            <Text style={{ fontSize: 12, fontWeight: 400, color: "#000000" }}>
                                +012-3456-7890
                            </Text>
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 10,
                                alignItems: "center",
                            }}
                        >
                            <Image
                                src="/images/services/mail.png"
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    objectFit: "contain",
                                }}
                            />
                            <Text style={{ fontSize: 12, fontWeight: 400, color: "#000000" }}>
                                yourmail@mail.com
                            </Text>
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 10,
                                alignItems: "center",
                            }}
                        >
                            <Image
                                src="/images/services/location.png"
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    objectFit: "contain",
                                }}
                            />
                            <Text style={{ fontSize: 12, fontWeight: 400, color: "#000000" }}>
                                San Francisco, CA
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            width: 326,
                            display: "flex",
                            flexDirection: "column",
                            gap: 70,
                        }}
                    >
                        <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <Text style={{ fontSize: 30, fontWeight: 700, color: "#000000" }}>
                                John Doe
                            </Text>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 4,
                                    alignItems: "center",
                                }}
                            >
                                <Svg
                                    width="174"
                                    height="2"
                                    viewBox="0 0 243 2"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path d="M243 0.5H0V1.5H243V0.5Z" fill="black" />
                                </Svg>
                                <Text
                                    style={{ fontSize: 14, fontWeight: 400, color: "#000000" }}
                                >
                                    Layout Artist
                                </Text>
                            </View>
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                                alignItems: "flex-start",
                            }}
                        >
                            <Text style={{ fontSize: 14, fontWeight: 400, color: "#000000" }}>
                                About me
                            </Text>
                            <Svg
                                width="326"
                                height="1"
                                viewBox="0 0 436 1"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <Path d="M436 0H0V1H436V0Z" fill="black" />
                            </Svg>
                            <Text style={{ fontSize: 12, color: "#808285", fontWeight: 400 }}>
                                This is where you sell yourself and be quick recruiters only
                                skim through the rest of your resume. Show your achievements and
                                . Use worth to them. You can go ahead and drop your objective
                                statement they do not want to know about what you want to do.
                                Instead they want to know what you can offer them, So what can
                                you offer them?{" "}
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 18,
                        width: 546,
                    }}
                >
                    <View
                        style={{
                            width: 532,
                            paddingVertical: 8,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderBottom: 1,
                            borderBottomColor: "#000000",
                            borderTop: 1,
                            borderTopColor: "#000000",
                        }}
                    >
                        <Text style={{ fontSize: 14, fontWeight: 400, color: "#000000" }}>
                            Professional Skills
                        </Text>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 70,
                            flexWrap: "wrap",
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: 130,
                                gap: 8,
                            }}
                        >
                            <Text style={{ fontSize: 12, color: "#808285", fontWeight: 400 }}>
                                Team Management
                            </Text>
                            <Svg
                                width="130"
                                height="12"
                                viewBox="0 0 174 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <Path
                                    d="M6 12C9.31371 12 12 9.31373 12 6.00002C12 2.68631 9.31371 0 6 0C2.68629 0 0 2.68631 0 6.00002C0 9.31373 2.68629 12 6 12Z"
                                    fill="black"
                                />
                                <Path
                                    d="M24 12C27.3137 12 30 9.31373 30 6.00002C30 2.68631 27.3137 0 24 0C20.6863 0 18 2.68631 18 6.00002C18 9.31373 20.6863 12 24 12Z"
                                    fill="black"
                                />
                                <Path
                                    d="M42 12C45.3137 12 48 9.31373 48 6.00002C48 2.68631 45.3137 0 42 0C38.6863 0 36 2.68631 36 6.00002C36 9.31373 38.6863 12 42 12Z"
                                    fill="black"
                                />
                                <Path
                                    d="M60 12C63.3137 12 66 9.31373 66 6.00002C66 2.68631 63.3137 0 60 0C56.6863 0 54 2.68631 54 6.00002C54 9.31373 56.6863 12 60 12Z"
                                    fill="black"
                                />
                                <Path
                                    d="M78 12C81.3137 12 84 9.31373 84 6.00002C84 2.68631 81.3137 0 78 0C74.6863 0 72 2.68631 72 6.00002C72 9.31373 74.6863 12 78 12Z"
                                    fill="black"
                                />
                                <Path
                                    d="M96 12C99.3137 12 102 9.31373 102 6.00002C102 2.68631 99.3137 0 96 0C92.6863 0 90 2.68631 90 6.00002C90 9.31373 92.6863 12 96 12Z"
                                    fill="black"
                                />
                                <Path
                                    d="M114 12C117.314 12 120 9.31373 120 6.00002C120 2.68631 117.314 0 114 0C110.686 0 108 2.68631 108 6.00002C108 9.31373 110.686 12 114 12Z"
                                    fill="black"
                                />
                                <Path
                                    d="M132 12C135.314 12 138 9.31373 138 6.00002C138 2.68631 135.314 0 132 0C128.686 0 126 2.68631 126 6.00002C126 9.31373 128.686 12 132 12Z"
                                    fill="#D1D3D4"
                                />
                                <Path
                                    d="M150 12C153.314 12 156 9.31373 156 6.00002C156 2.68631 153.314 0 150 0C146.686 0 144 2.68631 144 6.00002C144 9.31373 146.686 12 150 12Z"
                                    fill="#D1D3D4"
                                />
                                <Path
                                    d="M168 12C171.314 12 174 9.31373 174 6.00002C174 2.68631 171.314 0 168 0C164.686 0 162 2.68631 162 6.00002C162 9.31373 164.686 12 168 12Z"
                                    fill="#D1D3D4"
                                />
                            </Svg>
                        </View>
                    </View>
                </View>

                <View
                    style={{ display: "flex", flexDirection: "row", gap: 28, width: 546 }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                            width: 268,
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                                alignItems: "flex-start",
                                width: 268,
                            }}
                        >
                            <View
                                style={{
                                    borderBottom: 1,
                                    borderBottomColor: "#000000",
                                    width: 268,
                                }}
                            >
                                <Text style={{ paddingBottom: 5 }}>Social Media</Text>
                            </View>

                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 10,
                                    width: "100%",
                                    flexWrap: "wrap",
                                }}
                            >
                                <View
                                    style={{
                                        width: "40%",
                                        gap: 10,
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 34 34"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <Path
                                            d="M16.9992 11.0859C13.7327 11.0859 11.0859 13.734 11.0859 16.9992C11.0859 20.2643 13.734 22.9124 16.9992 22.9124C20.2656 22.9124 22.9124 20.2643 22.9124 16.9992C22.9124 13.734 20.2656 11.0859 16.9992 11.0859ZM16.9992 20.8387C14.8788 20.8387 13.161 19.1196 13.161 17.0006C13.161 14.8816 14.8802 13.1624 16.9992 13.1624C19.1182 13.1624 20.8373 14.8816 20.8373 17.0006C20.8373 19.1196 19.1195 20.8387 16.9992 20.8387Z"
                                            fill="black"
                                        />
                                        <Path
                                            d="M23.1476 9.46875C22.384 9.46875 21.7656 10.0871 21.7656 10.8508C21.7656 11.6144 22.384 12.2328 23.1476 12.2328C23.9113 12.2328 24.5297 11.6144 24.5297 10.8508C24.5297 10.0884 23.9113 9.46875 23.1476 9.46875Z"
                                            fill="black"
                                        />
                                        <Path
                                            d="M17 0C7.61108 0 0 7.61107 0 17C0 26.3889 7.61108 34 17 34C26.3889 34 34 26.3889 34 17C34 7.61107 26.3889 0 17 0ZM26.3743 21.6538C26.3223 22.776 26.1357 23.3863 25.9771 23.7915C25.5893 24.7964 24.7963 25.5893 23.7915 25.9772C23.3863 26.1344 22.7759 26.3223 21.6525 26.3743C20.4384 26.4302 20.0746 26.4409 16.9987 26.4409C13.9241 26.4409 13.5603 26.4289 12.3449 26.3743C11.2227 26.3236 10.6123 26.1357 10.2059 25.9772C9.7061 25.7932 9.25298 25.4987 8.88116 25.1162C8.49867 24.7444 8.20414 24.2926 8.02023 23.7915C7.86297 23.3863 7.67506 22.776 7.62441 21.6538C7.56844 20.4397 7.55644 20.0746 7.55644 17C7.55644 13.9254 7.56844 13.5603 7.62441 12.3462C7.67506 11.2227 7.86297 10.6137 8.02023 10.2072C8.20547 9.70744 8.5 9.2543 8.88249 8.88247C9.25431 8.49998 9.7061 8.20546 10.2072 8.02155C10.6123 7.86429 11.2227 7.67641 12.3449 7.62443C13.559 7.56846 13.9228 7.55773 16.9987 7.55773C20.0732 7.55773 20.4384 7.56976 21.6525 7.62574C22.7759 7.67638 23.385 7.86429 23.7901 8.02155C24.2899 8.20679 24.743 8.49998 25.1148 8.88247C25.4973 9.2543 25.7919 9.70611 25.9758 10.2072C26.133 10.6124 26.3209 11.2227 26.3729 12.3462C26.4289 13.5603 26.4396 13.9241 26.4396 17C26.4409 20.0759 26.4302 20.4397 26.3743 21.6538Z"
                                            fill="black"
                                        />
                                    </Svg>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: 100,
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 400,
                                                color: "#000000",
                                            }}
                                        >
                                            Instagram:
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 400,
                                                color: "#000000",
                                            }}
                                        >
                                            @marina_vos
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        width: "40%",
                                        gap: 10,
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 34 34"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <Path
                                            d="M16.9992 11.0859C13.7327 11.0859 11.0859 13.734 11.0859 16.9992C11.0859 20.2643 13.734 22.9124 16.9992 22.9124C20.2656 22.9124 22.9124 20.2643 22.9124 16.9992C22.9124 13.734 20.2656 11.0859 16.9992 11.0859ZM16.9992 20.8387C14.8788 20.8387 13.161 19.1196 13.161 17.0006C13.161 14.8816 14.8802 13.1624 16.9992 13.1624C19.1182 13.1624 20.8373 14.8816 20.8373 17.0006C20.8373 19.1196 19.1195 20.8387 16.9992 20.8387Z"
                                            fill="black"
                                        />
                                        <Path
                                            d="M23.1476 9.46875C22.384 9.46875 21.7656 10.0871 21.7656 10.8508C21.7656 11.6144 22.384 12.2328 23.1476 12.2328C23.9113 12.2328 24.5297 11.6144 24.5297 10.8508C24.5297 10.0884 23.9113 9.46875 23.1476 9.46875Z"
                                            fill="black"
                                        />
                                        <Path
                                            d="M17 0C7.61108 0 0 7.61107 0 17C0 26.3889 7.61108 34 17 34C26.3889 34 34 26.3889 34 17C34 7.61107 26.3889 0 17 0ZM26.3743 21.6538C26.3223 22.776 26.1357 23.3863 25.9771 23.7915C25.5893 24.7964 24.7963 25.5893 23.7915 25.9772C23.3863 26.1344 22.7759 26.3223 21.6525 26.3743C20.4384 26.4302 20.0746 26.4409 16.9987 26.4409C13.9241 26.4409 13.5603 26.4289 12.3449 26.3743C11.2227 26.3236 10.6123 26.1357 10.2059 25.9772C9.7061 25.7932 9.25298 25.4987 8.88116 25.1162C8.49867 24.7444 8.20414 24.2926 8.02023 23.7915C7.86297 23.3863 7.67506 22.776 7.62441 21.6538C7.56844 20.4397 7.55644 20.0746 7.55644 17C7.55644 13.9254 7.56844 13.5603 7.62441 12.3462C7.67506 11.2227 7.86297 10.6137 8.02023 10.2072C8.20547 9.70744 8.5 9.2543 8.88249 8.88247C9.25431 8.49998 9.7061 8.20546 10.2072 8.02155C10.6123 7.86429 11.2227 7.67641 12.3449 7.62443C13.559 7.56846 13.9228 7.55773 16.9987 7.55773C20.0732 7.55773 20.4384 7.56976 21.6525 7.62574C22.7759 7.67638 23.385 7.86429 23.7901 8.02155C24.2899 8.20679 24.743 8.49998 25.1148 8.88247C25.4973 9.2543 25.7919 9.70611 25.9758 10.2072C26.133 10.6124 26.3209 11.2227 26.3729 12.3462C26.4289 13.5603 26.4396 13.9241 26.4396 17C26.4409 20.0759 26.4302 20.4397 26.3743 21.6538Z"
                                            fill="black"
                                        />
                                    </Svg>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: 100,
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 400,
                                                color: "#000000",
                                            }}
                                        >
                                            Instagram:
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 400,
                                                color: "#000000",
                                            }}
                                        >
                                            @marina_vos
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        width: "40%",
                                        gap: 10,
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 34 35"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <Path
                                            d="M17 0.078125C7.61108 0.078125 0 7.68926 0 17.0782C0 26.4671 7.61108 34.0781 17 34.0781C26.3889 34.0781 34 26.4671 34 17.0782C34 7.68926 26.3889 0.078125 17 0.078125ZM19.8653 11.2249H25.3214V12.7882H19.8653V11.2249ZM16.5749 21.4108C16.335 21.8012 16.0338 22.1318 15.674 22.3983C15.2688 22.7049 14.789 22.914 14.236 23.0286C13.6829 23.1419 13.0832 23.1979 12.4368 23.1979H6.69951V10.6385H12.8526C14.4052 10.6611 15.5047 11.1076 16.1524 11.9779C16.5415 12.5123 16.7361 13.1494 16.7361 13.8957C16.7361 14.662 16.5415 15.2803 16.1471 15.7455C15.9258 16.004 15.602 16.2439 15.1755 16.4584C15.8246 16.693 16.3137 17.0622 16.6468 17.5673C16.976 18.0724 17.1426 18.6867 17.1426 19.4077C17.1426 20.1527 16.9534 20.8204 16.5749 21.4108ZM21.4259 21.1962C21.8017 21.4294 22.2522 21.5467 22.7839 21.5467C23.3423 21.5467 23.7981 21.4055 24.1486 21.1216C24.3419 20.967 24.5098 20.7551 24.6564 20.4832H27.1699C27.1032 21.0336 26.7981 21.5934 26.2583 22.1624C25.4147 23.0633 24.2339 23.5165 22.716 23.5165C21.4619 23.5165 20.3571 23.1366 19.4002 22.3743C18.4393 21.6134 17.9622 20.3726 17.9622 18.6574C17.9622 17.0475 18.3953 15.8134 19.2589 14.9538C20.1252 14.0969 21.246 13.6664 22.6254 13.6664C23.4463 13.6651 24.1846 13.8103 24.8403 14.1022C25.4987 14.3914 26.0397 14.8498 26.4649 15.4762C26.854 16.028 27.1032 16.669 27.2165 17.3967C27.2832 17.8218 27.3098 18.4388 27.2992 19.2411H20.4397C20.481 20.1687 20.8049 20.823 21.4259 21.1962Z"
                                            fill="black"
                                        />
                                    </Svg>

                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: 100,
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 400,
                                                color: "#000000",
                                            }}
                                        >
                                            Behance:
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 400,
                                                color: "#000000",
                                            }}
                                        >
                                            @marina_vos
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        width: "40%",
                                        gap: 10,
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 35 35"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <Path
                                            d="M17.5 0.0527344C8.11242 0.0527344 0.5 7.6652 0.5 17.0528C0.5 26.4403 8.11242 34.0527 17.5 34.0527C26.8876 34.0527 34.5 26.4403 34.5 17.0528C34.5 7.6652 26.8876 0.0527344 17.5 0.0527344ZM12.5597 25.7513H8.41892V13.2958H12.5597V25.7513ZM10.49 11.594H10.4633C9.07463 11.594 8.17504 10.6371 8.17504 9.4417C8.17504 8.21961 9.10129 7.28939 10.518 7.28939C11.9346 7.28939 12.8062 8.21961 12.8329 9.4417C12.8315 10.6385 11.9333 11.594 10.49 11.594ZM27.4886 25.7513H23.3492V19.0878C23.3492 17.4126 22.7495 16.2704 21.2516 16.2704C20.1081 16.2704 19.4271 17.0408 19.1272 17.7844C19.0179 18.051 18.9913 18.4228 18.9913 18.7946V25.75H14.8519C14.8519 25.75 14.9066 14.462 14.8519 13.2945H18.9913V15.0577C19.5417 14.2088 20.5252 13.0013 22.7229 13.0013C25.4469 13.0013 27.4886 14.7818 27.4886 18.608V25.7513Z"
                                            fill="black"
                                        />
                                    </Svg>

                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: 100,
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 400,
                                                color: "#000000",
                                            }}
                                        >
                                            Linkedin:
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 400,
                                                color: "#000000",
                                            }}
                                        >
                                            @marina_vos
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                                alignItems: "flex-start",
                                width: 268,
                            }}
                        >
                            <View
                                style={{
                                    borderBottom: 1,
                                    borderBottomColor: "#000000",
                                    width: 268,
                                }}
                            >
                                <Text style={{ paddingBottom: 5 }}>EDUCATION</Text>
                            </View>

                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 10,
                                    width: "100%",
                                    flexWrap: "wrap",
                                }}>
                             <View style={{display:'flex',flexDirection:'column',gap:5,width:'45%'}}>
                                    <Text style={{fontSize:12,color:'#000000',fontWeight:400}}>MASTER DEGREE</Text>
                                    <Text style={{fontSize:10,color:'#808285',fontWeight:400}}>Communication</Text>
                                    <Text style={{fontSize:10,color:'#000000',fontWeight:400}}>San Franciso University</Text>
                                    <Text style={{fontSize:10,color:'#000000',fontWeight:400}}>2016-2018</Text>
                             </View>
                             <View style={{display:'flex',flexDirection:'column',gap:5,width:'45%'}}>
                                    <Text style={{fontSize:12,color:'#000000',fontWeight:400}}>BACHELOR DEGREE</Text>
                                    <Text style={{fontSize:10,color:'#808285',fontWeight:400}}>Communication</Text>
                                    <Text style={{fontSize:10,color:'#000000',fontWeight:400}}>San Franciso University</Text>
                                    <Text style={{fontSize:10,color:'#000000',fontWeight:400}}>2016-2018</Text>
                             </View>
                                </View>

                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                                alignItems: "flex-start",
                                width: 268,
                            }}
                        >
                            <View
                                style={{
                                    borderBottom: 1,
                                    borderBottomColor: "#000000",
                                    width: 268,
                                }}
                            >
                                <Text style={{ paddingBottom: 5 }}>Interests</Text>
                            </View>                         
                                <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 10,
                                    width: "100%",
                                    flexWrap: "wrap",
                                }}>                
                
                <View style={{display:'flex',flexDirection:'row',gap:5,alignItems:'center'}}>
                <Svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M3 6.5C4.65685 6.5 6 5.15685 6 3.5C6 1.84315 4.65685 0.5 3 0.5C1.34315 0.5 0 1.84315 0 3.5C0 5.15685 1.34315 6.5 3 6.5Z" fill="#5E5F5E"/>
                </Svg>                   
                    <Text style={{fontSize:10,fontWeight:400,color:'#000000'}}>CYCLING</Text>
                  </View>
               </View>

                        </View>

                    </View>

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: 250,
                            gap: 16,
                        }}
                    >

<View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                                alignItems: "flex-start",
                                width: 268,
                            }}
                        >
                            <View
                                style={{
                                    borderBottom: 1,
                                    borderBottomColor: "#000000",
                                    width: 268,
                                }}
                            >
                                <Text style={{ paddingBottom: 5 }}>Professional Experience</Text>
                            </View>                         
                    
                            <View style={{display:'flex',flexDirection:'row',gap:5,alignItems:'start'}}>
                <Svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M3 6.5C4.65685 6.5 6 5.15685 6 3.5C6 1.84315 4.65685 0.5 3 0.5C1.34315 0.5 0 1.84315 0 3.5C0 5.15685 1.34315 6.5 3 6.5Z" fill="#5E5F5E"/>
                </Svg>   
                <View style={{display:'flex',flexDirection:'column',gap:5}}>                
                    <Text style={{fontSize:10,fontWeight:400,color:'#000000'}}>Head of Design Good Company</Text>
                    <Text style={{fontSize:10,fontWeight:400,color:'#000000'}}>2019-2020</Text>
                    <Text style={{fontSize:10,fontWeight:400,color:'#000000'}}>This is where you sell yourself and be quick recruiters only skim through the rest of your resume.</Text>
                    </View>
                  </View>

                        </View>
                    </View>
                </View>
            </View>
        </Page>
    );
}

export default Template19;

import React, { useState } from 'react'

function ShortlistMail({shortlist}) {

     const [tags, setTags] = useState([]);
      const [inputValue, setInputValue] = useState("");

      const handleKeyPress = (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
          setTags([...tags, inputValue.trim()]);
          setInputValue("");
        }
      };
    
      const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
      };
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
                <div className="bg-white p-8 rounded-lg shadow-lg w-[996px] h-[80vh]">
                    <div className="mb-4 flex items-center">
                        <div className="flex  flex-col">
                            <div
                                onClick={() =>
                                    setPopupVisible(false)
                                }
                                className=" flex w-full justify-end "
                            >
                                <svg
                                    width="20"
                                    height="19"
                                    viewBox="0 0 20 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.99735 11.1232L3.50485 17.6152C3.21518 17.9052 2.86402 18.0469 2.45135 18.0402C2.03835 18.0339 1.68702 17.8859 1.39735 17.5962C1.10768 17.3065 0.96285 16.952 0.96285 16.5327C0.96285 16.1134 1.10768 15.7589 1.39735 15.4692L7.87035 8.99619L1.37835 2.55369C1.08835 2.26402 0.946683 1.90952 0.95335 1.49019C0.959683 1.07119 1.10768 0.716855 1.39735 0.427188C1.68702 0.137188 2.04152 -0.0078125 2.46085 -0.0078125C2.88018 -0.0078125 3.23468 0.137188 3.52435 0.427188L9.99735 6.91919L16.4398 0.427188C16.7295 0.137188 17.0807 -0.0078125 17.4933 -0.0078125C17.9063 -0.0078125 18.2577 0.137188 18.5473 0.427188C18.8577 0.737188 19.0128 1.09669 19.0128 1.50569C19.0128 1.91469 18.8577 2.26402 18.5473 2.55369L12.0743 8.99619L18.5663 15.4887C18.8563 15.7784 19.0013 16.1295 19.0013 16.5422C19.0013 16.9552 18.8563 17.3065 18.5663 17.5962C18.2563 17.9065 17.8968 18.0617 17.4878 18.0617C17.0788 18.0617 16.7295 17.9065 16.4398 17.5962L9.99735 11.1232Z"
                                        fill="#333333"
                                    />
                                </svg>
                            </div>
                            <div className="flex flex-col gap-[10px]">
                                <div className="w-[914px] gap-[20px] flex flex-col">
                                    <div className="flex items-center gap-[20px]">
                                        <div className="text-[16px] font-[600]">
                                            To
                                        </div>
                                        {shortlist.details
                                            ?.personal?.firstName
                                            .length == 0 &&
                                            shortlist?.details
                                                ?.personal?.lastName
                                                .length == 0 ? (
                                            ""
                                        ) : (
                                            <div className="border-[1px] border-[#D6DDEB] p-[6px] rounded-[26px] flex gap-[10px] items-center">
                                                <div className="group relative">
                                                    <div className="text-[14px] font-[600]">
                                                        {shortlist.details
                                                            ?.personal
                                                            ?.firstName +
                                                            " " +
                                                            shortlist
                                                                .details
                                                                ?.personal
                                                                ?.lastName}
                                                    </div>
                                                    <div>
                                                        <div className="absolute text-[10px] opacity-0 transition-opacity duration-500 group-hover:opacity-100  word-break bottom-[-20px] text-[#fff] bg-[#333] px-[6px] py-[3px] rounded-[5px]">
                                                            {
                                                                shortlist
                                                                    .details
                                                                    ?.personal
                                                                    ?.email
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g mask="url(#mask0_6706_92965)">
                                                            <path
                                                                d="M11.9987 13.0655L8.75242 16.3115C8.60759 16.4565 8.43201 16.5273 8.22567 16.524C8.01917 16.5208 7.84351 16.4468 7.69867 16.302C7.55384 16.1572 7.48142 15.9799 7.48142 15.7703C7.48142 15.5606 7.55384 15.3833 7.69867 15.2385L10.9352 12.002L7.68917 8.78075C7.54417 8.63592 7.47334 8.45867 7.47667 8.249C7.47984 8.0395 7.55384 7.86233 7.69867 7.7175C7.84351 7.5725 8.02076 7.5 8.23042 7.5C8.44009 7.5 8.61734 7.5725 8.76218 7.7175L11.9987 10.9635L15.2199 7.7175C15.3648 7.5725 15.5403 7.5 15.7467 7.5C15.9532 7.5 16.1288 7.5725 16.2737 7.7175C16.4288 7.8725 16.5064 8.05225 16.5064 8.25675C16.5064 8.46125 16.4288 8.63592 16.2737 8.78075L13.0372 12.002L16.2832 15.2483C16.4282 15.3931 16.5007 15.5687 16.5007 15.775C16.5007 15.9815 16.4282 16.1572 16.2832 16.302C16.1282 16.4572 15.9484 16.5348 15.7439 16.5348C15.5394 16.5348 15.3648 16.4572 15.2199 16.302L11.9987 13.0655Z"
                                                                fill="#333333"
                                                            />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="border-[1px] border-[#D4D4D480] w-full"></div>
                                </div>

                                <div className="w-[914px] gap-[20px] flex flex-col">
                                    <div className="flex items-center gap-[20px]">
                                        <div className="text-[16px] font-[600]">
                                            CC
                                        </div>
                                        <div className=" p-[4px] flex rounded-[26px]  gap-[10px] items-start">
                                            <div className="flex flex-wrap gap-[10px]">
                                                {tags.map(
                                                    (tag, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center border-[1px] border-[#D6DDEB] p-[6px] rounded-[26px]"
                                                        >
                                                            <span className="text-[14px] font-[600] mr-[8px]">
                                                                {tag}
                                                            </span>
                                                            <div
                                                                onClick={() =>
                                                                    removeTag(
                                                                        index
                                                                    )
                                                                }
                                                                className="cursor-pointer"
                                                            >
                                                                <svg
                                                                    width="16"
                                                                    height="16"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M13.0655 11.9987L16.3115 8.75242C16.4565 8.60759 16.5273 8.43201 16.524 8.22567C16.5208 8.01917 16.4468 7.84351 16.302 7.69867C16.1572 7.55384 15.9799 7.48142 15.7703 7.48142C15.5606 7.48142 15.3833 7.55384 15.2385 7.69867L12.002 10.9352L8.78075 7.68917C8.63592 7.54417 8.45867 7.47334 8.249 7.47667C8.0395 7.47984 7.86233 7.55384 7.7175 7.69867C7.5725 7.84351 7.5 8.02076 7.5 8.23042C7.5 8.44009 7.5725 8.61734 7.7175 8.76218L10.9635 11.9987L7.7175 15.2199C7.5725 15.3648 7.5 15.5403 7.5 15.7467C7.5 15.9532 7.5725 16.1288 7.7175 16.2737C7.8725 16.4288 8.05225 16.5064 8.25675 16.5064C8.46125 16.5064 8.63592 16.4288 8.78075 16.2737L12.002 13.0372L15.2483 16.2832C15.3931 16.4282 15.5687 16.5007 15.775 16.5007C15.9815 16.5007 16.1572 16.4282 16.302 16.2832C16.4572 16.1282 16.5348 15.9484 16.5348 15.7439C16.5348 15.5394 16.4572 15.3648 16.302 15.2199L13.0655 11.9987Z"
                                                                        fill="#333333"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                            <div className="flex items-center gap-[10px]">
                                                <input
                                                    type="text"
                                                    value={inputValue}
                                                    onChange={(e) =>
                                                        setInputValue(
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={
                                                        handleKeyPress
                                                    }
                                                    className=" p-[4px] rounded-[26px]"
                                                    placeholder="Enter Email"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-[1px] border-[#D4D4D480] w-full"></div>
                                </div>

                                <div className="flex gap-[24px]">
                                    <div className="text-[16px] font-[600]">
                                        Subject
                                    </div>
                                    <div className="text-[14px] font-[500]">
                                        Contrary to popular
                                        belief, Lorem Ipsum is not
                                        simply random text. It has
                                        roots in a piece of
                                        classical Latin literature
                                        from 45 BC, making it over
                                        2000 years old.
                                    </div>
                                </div>

                                <div className="text-[14px] font-[500] pt-[20px]">
                                    Contrary to popular belief,
                                    Lorem Ipsum is not simply
                                    random text. It has roots in
                                    a piece of classical Latin
                                    literature from 45 BC,
                                    making it over 2000 years
                                    old.Lorem Ipsum is simply
                                    dummy text of the printing
                                    and typesetting industry.
                                    Lorem Ipsum has been the
                                    industrys standard dummy
                                    text ever since the 1500s,
                                    when an unknown printer took
                                    a galley of type and
                                    scrambled it to make a type
                                    specimen book. It has
                                    survived not only five
                                    centuries, but also the leap
                                    into electronic typesetting,
                                    remaining essentially
                                    unchanged.{" "}
                                </div>
                            </div>
                            <div className="pt-[120px]">
                                <div className="border-[1px]  border-[#DEDEDE] p-[8px] items-center rounded-[108px] flex justify-between">
                                    <div className="flex gap-[10px] ">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
                                                stroke="#A6A6A6"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clip-path="url(#clip0_6706_92989)">
                                                <path
                                                    d="M7 5H13C13.9283 5 14.8185 5.36875 15.4749 6.02513C16.1313 6.6815 16.5 7.57174 16.5 8.5C16.5 9.42826 16.1313 10.3185 15.4749 10.9749C14.8185 11.6313 13.9283 12 13 12H7V5Z"
                                                    stroke="#A6A6A6"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M13 12H14C14.9283 12 15.8185 12.3687 16.4749 13.0251C17.1313 13.6815 17.5 14.5717 17.5 15.5C17.5 16.4283 17.1313 17.3185 16.4749 17.9749C15.8185 18.6313 14.9283 19 14 19H7V12"
                                                    stroke="#A6A6A6"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_6706_92989">
                                                    <rect
                                                        width="24"
                                                        height="24"
                                                        fill="white"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clip-path="url(#clip0_6706_92990)">
                                                <path
                                                    d="M11 5H17"
                                                    stroke="#A6A6A6"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M7 19H13"
                                                    stroke="#A6A6A6"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M14 5L10 19"
                                                    stroke="#A6A6A6"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_6706_92990">
                                                    <rect
                                                        width="24"
                                                        height="24"
                                                        fill="white"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div className="bg-[#06A9EF] rounded-[30px] py-[12px] px-[36px] text-[#FFFFFF] text-[14px] flex gap-[6px] font-[600]">
                                        <div>Send </div>

                                        <div>
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g mask="url(#mask0_7727_21344)">
                                                    <path
                                                        d="M14.85 9.69123L3.3 14.5662C3.05 14.6662 2.8125 14.6444 2.5875 14.5006C2.3625 14.3569 2.25 14.1475 2.25 13.8725V4.12248C2.25 3.84748 2.3625 3.6381 2.5875 3.49435C2.8125 3.3506 3.05 3.32873 3.3 3.42873L14.85 8.30373C15.1625 8.44123 15.3188 8.67248 15.3188 8.99748C15.3188 9.32248 15.1625 9.55373 14.85 9.69123ZM3.75 12.7475L12.6375 8.99748L3.75 5.24748V7.87248L8.25 8.99748L3.75 10.1225V12.7475Z"
                                                        fill="white"
                                                    />
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShortlistMail
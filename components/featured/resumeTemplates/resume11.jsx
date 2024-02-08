import React from 'react'

function Resume11({data}) {
  return (
    <div className='w-[794px] min-h-[1122px] flex'>
      <div className='w-[326px] bg-[#E6E7E8] flex flex-col pt-[58px] pl-[56px] gap-[26px] items-start'>
      
       <div className='flex flex-col '>
           <p className='text-[40px] font-[700] leading-[48px]'> {data.firstName} <br/> {data.lastName}</p>
           <p className='text-[18px] font-[700] leading-[18px]'>{data.designation}</p>
       </div>
       
       {data.profilePhoto ? (
                <img src={URL.createObjectURL(data.profilePhoto)} alt="" className="w-[270px] h-[212px] object-contain" />
              ) :(
       <img className='w-[270px] h-[212px] object-contain' src="/images/services/template_profile.png" />
              )}

<div>
{data?.skills?.length > 0 && (
            <>
              <div className="object-contain w-[228px]">

              <p className='font-[700] text-[18px] leading-[22px]'>SKILLS</p>

              </div>
              <div className="flex flex-col gap-[14px] pt-6">
                {data.skills?.map((detail, index) => {
                  const calculateWidthPercentage = (rating) => {
                    let ratingPercentage = 0;
                    if (rating && rating.length > 0) {
                      const zerosCount = rating.filter(val => val === 0).length;

                      if (zerosCount === 0) ratingPercentage = 100;
                      else if (zerosCount === 1) ratingPercentage = 80;
                      else if (zerosCount === 2) ratingPercentage = 60;
                      else if (zerosCount === 3) ratingPercentage = 40;
                      else if (zerosCount === 4) ratingPercentage = 20;
                    }
                    return ratingPercentage;
                  };

                  const ratingPercentage = calculateWidthPercentage(detail.rating);

                  return (
                    <div className="  flex flex-col" key={index}>
                      <div className="justify-between flex items-center ">
                        <p className="text-[#000000]  text-[14px] font-[500] leading-[16px]">
                          {detail.skill}
                        </p>
                        <div className="w-[59.21%] h-[3.78px] flex self-end mb-[1px] bg-[#C1C1C1]">
                          <div
                            className="h-full bg-[#1C75BC]"
                            style={{ width: `${ratingPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
            </>
          )}
          </div>

<div>
{data?.languages?.length > 0 && (
          <>
           <div className="object-contain w-[228px]">

<p className='font-[700] text-[18px] leading-[22px]'>LANGUAGES</p>

</div>
<div className="flex flex-col gap-[14px] pt-6">
            {data.languages?.map((detail, index) => {
              const calculateWidthPercentage = (rating) => {
                let ratingPercentage = 0;
                if (rating && rating.length > 0) {
                  const zerosCount = rating.filter(val => val === 0).length;

                  if (zerosCount === 0) ratingPercentage = 100;
                  else if (zerosCount === 1) ratingPercentage = 66;
                  else if (zerosCount === 2) ratingPercentage = 33;

                }
                return ratingPercentage;
              };

              const ratingPercentage = calculateWidthPercentage(detail.rating);

              return (
                <div className=" flex flex-col" key={index}>
                  <div className="justify-between flex items-center">
                    <p className="text-[#000000]  text-[14px] font-[500] leading-[16px] ">
                      {detail.languages}
                    </p>
                    <div className="w-[59.21%] h-[3.78px] flex self-end mb-[1px] bg-[#C1C1C1]">
                      <div
                        className="h-full bg-[#1C75BC]"
                        style={{ width: `${ratingPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </>
          )}
          </div>

<div>
{data?.hobbies?.length > 0 && (
           <div className='object-contain w-[228px] '>

<div className="object-contain w-[228px]">

<p className='font-[700] text-[18px] leading-[22px]'>HOBBIES</p>

</div>
                                <div className="grid grid-cols-2 gap-[14px] pt-6 break-words">
                                    {data?.hobbies?.map((item, index) => (
                                        <div key={index} className="text-[#000000]  text-[14px] font-[500] leading-[16px] ">
                                            {item?.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
</div>



      </div>




      <div className='w-[468px] items-start pt-[58px] pl-[32px] pb-[38px]'>

    <div className='w-[400px] flex flex-col items-start gap-[22px]'>
 
 
  <div>
    <div className="  ">
                <p className="text-[#000000]  text-[18px] font-[700] leading-[22px]">
                  About Me
                </p>
              </div>
              <div className=" pt-[10px] ">
                <div className="flex gap-2">
                  <p className="text-[#6D6E71]  text-[12px] font-[500] leading-[13px] ">
                    {data.summery}
                  </p>
                </div>
              </div>
              </div>

              <div className='flex flex-col gap-[16px]'>
    <div className="  ">
                <p className="text-[#000000]  text-[18px] font-[700] leading-[22px]">
                  Contact
                </p>
              </div>
              {data.mobileNumber &&
              <div className=" gap-[20px] flex flex-col ">
              <svg width="350" height="30" viewBox="0 0 350 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="348.84" height="29.2241" transform="translate(0.439453 0.521484)" fill="#E6E7E8"/>
<text x="14%" y="55%" dominant-baseline="middle" text-anchor="start" fill="#000000" font-size="12" f fontWeight={500}> {data.mobileNumber} </text>
<rect width="29.2241" height="29.2241" transform="translate(0.441406 0.613281)" fill="black"/>
<path d="M22.0929 20.38L20.6336 21.8392C20.0868 22.3633 19.3799 22.6595 18.6262 22.6595C18.2154 22.6595 17.8059 22.5688 17.4405 22.386C15.1823 21.291 13.1082 19.8091 11.3515 18.0311C9.57356 16.2518 8.09032 14.2003 6.99659 11.9422C6.49507 10.8711 6.70048 9.59329 7.54346 8.75032L9.02537 7.29112C9.11607 7.20042 9.20809 7.17773 9.29879 7.17773C9.41216 7.17773 9.52689 7.20042 9.59492 7.29112L13.0842 10.7804C13.1749 10.8484 13.1976 10.9631 13.1976 11.0765C13.1976 11.1672 13.1749 11.2819 13.0842 11.35L11.693 12.7638C12.2626 13.7895 12.9935 14.7245 13.8138 15.5688C14.6581 16.3891 15.5931 17.1201 16.6188 17.6896L18.01 16.2985C18.1701 16.1384 18.4435 16.1384 18.6022 16.2985L22.0915 19.7877C22.0915 19.7877 22.0915 19.7877 22.1142 19.7877C22.2529 19.9705 22.2529 20.2212 22.0929 20.38Z" fill="white"/>
</svg>
              </div>
}

{data.email &&
              <div className=" gap-[20px] flex flex-col ">
            <svg width="350" height="31" viewBox="0 0 350 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="348.84" height="29.2241" transform="translate(0.439453 0.751953)" fill="#E6E7E8"/>
<rect width="29.2241" height="29.2241" transform="translate(0.441406 0.791016)" fill="black"/>
<path d="M20.9785 7.54102H9.80501C8.09505 7.54102 6.72656 8.90952 6.72656 10.6195V19.4441C6.72656 21.154 8.09505 22.5225 9.80501 22.5225H20.9785C22.6885 22.5225 24.0569 21.154 24.0569 19.4441V10.6195C24.0583 8.90819 22.6898 7.54102 20.9785 7.54102ZM21.9602 12.6256C21.9602 12.6256 21.9375 12.6256 21.9148 12.6482V12.6256L16.6475 15.5907C15.8726 16.0242 14.9149 16.0242 14.1386 15.5907L8.84868 12.6256C8.48455 12.4655 8.30179 12.032 8.46052 11.6679C8.62058 11.2797 9.0541 11.121 9.41823 11.2797C9.48626 11.3024 9.53293 11.3251 9.57828 11.3478L14.8456 14.2888C15.187 14.4943 15.5978 14.4943 15.9406 14.2888L21.2079 11.3478C21.5494 11.1424 22.0055 11.257 22.2109 11.5985C22.4163 11.9413 22.3016 12.3975 21.9602 12.6256Z" fill="white"/>
<text x="14%" y="55%" dominant-baseline="middle" text-anchor="start" fill="#000000" font-size="12" f fontWeight={500}> {data.email} </text>

</svg>

              </div>
}

{data.location &&
              <div className=" gap-[20px] flex flex-col ">
           <svg width="350" height="31" viewBox="0 0 350 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="348.84" height="29.2241" transform="translate(0.439453 0.982422)" fill="#E6E7E8"/>
<rect width="29.2241" height="29.2241" transform="translate(0.441406 0.957031)" fill="black"/>
<path d="M14.6736 6.55664C11.0256 6.55664 8.06055 9.52175 8.06055 13.1698C8.06055 19.0533 13.9667 23.5682 14.2402 23.751C14.4909 23.9564 14.8564 23.9564 15.1071 23.751C15.3579 23.5682 21.2867 19.0533 21.2867 13.1698C21.2867 9.52041 18.3216 6.55664 14.6736 6.55664ZM14.6736 15.9508C13.1224 15.9508 11.8686 14.697 11.8686 13.1684C11.8686 11.6172 13.1224 10.3634 14.6736 10.3634C16.2022 10.3634 17.456 11.6172 17.456 13.1684C17.456 14.697 16.2009 15.9508 14.6736 15.9508Z" fill="white"/>
<text x="14%" y="55%" dominant-baseline="middle" text-anchor="start" fill="#000000" font-size="12" f fontWeight={500}> {data.location} </text>

</svg>


              </div>
}
              </div>

              <div className=" flex flex-col  gap-[16px] pt-[24px]  ">

              <p className="text-[#000000]  text-[18px] font-[700] leading-[22px]">
                  Experience
                </p>
                    {data.experience.map((detail, index) => (
                        <div className="flex  gap-[30px]">
                                 <div className='flex'>
                                    <div className='flex flex-col w-[124px] gap-[5px]'>
                            <p className="text-[#000000]  font-[400] leading-[12px] text-[12px] ">

                                {detail.duration?.start?.year} -
                                {detail.duration?.end?.year == undefined || "Year" ? "Present" : detail.duration?.end?.year}
                            </p>
 
                            <p className="text-[#1C75BC] leading-[13px] text-[12px] font-[700]">
                                    {detail.organization}
                                </p>

                                <p className="text-[#000000] leading-[13px] text-[12px] font-[500]">
                                    {detail.location}
                                </p>
                            </div>

                            <div className="flex flex-col w-[246px] gap-2">
                            <p className="text-[#000000] leading-[13px] text-[12px] font-[500]">
                                {detail.designation}
                            </p>  

                                <p className="text-[#000000] leading-[10px] text-[10px] font-[500]">
                                {detail.description}
                            </p>                              

                            </div>
                          
                            </div>
                        </div>
                    ))}
                </div>

                <div className=" flex flex-col  gap-[16px] pt-[24px]  ">

<p className="text-[#000000]  text-[18px] font-[700] leading-[22px]">
    Education
  </p>
  {data?.education?.map((detail, index) => (
          <div className="flex  gap-[30px]">
                   <div className='flex'>
                      <div className='flex flex-col w-[124px] gap-[5px]'>
              <p className="text-[#000000]  font-[400] leading-[12px] text-[12px] ">

              {detail.duration?.start?.year}-
                                            {detail.duration?.end?.year}
              </p>

              <p className="text-[#1C75BC] leading-[13px] text-[12px] font-[700]">
                      {detail.instituteName}
                  </p>

                  <p className="text-[#000000] leading-[13px] text-[12px] font-[500]">
                      {detail.location}
                  </p>
              </div>

              <div className="flex flex-col w-[246px] gap-2">
              <p className="text-[#000000] leading-[13px] text-[12px] font-[500]">
                  {detail.qualification}
              </p>  

              <p className="text-[#000000] leading-[13px] text-[12px] font-[500]">
                  {detail.specialization}
              </p>                      
              </div>
            
              </div>
          </div>
      ))}
  </div>

  <div className=" flex flex-col  gap-[16px] pt-[24px]  ">

<p className="text-[#000000]  text-[18px] font-[700] leading-[22px]">
    Course and certification
  </p>
  {data?.course?.map((detail, index) => (
          <div className="flex  gap-[30px]">
                   <div className='flex'>
                      <div className='flex flex-col w-[124px] gap-[5px]'>
              <p className="text-[#000000]  font-[400] leading-[12px] text-[12px] ">

              {detail.duration?.start?.year}-
                                            {detail.duration?.end?.year}
              </p>

              <p className="text-[#1C75BC] leading-[13px] text-[12px] font-[700]">
                      {detail.courseName}
                  </p>
              </div>

              <div className="flex flex-col w-[246px] gap-2">
              <p className="text-[#000000] leading-[13px] text-[12px] font-[500]">
                  {detail.issuedBy}
              </p>  

              <p className="text-[#000000] leading-[13px] text-[12px] font-[500]">
                  {detail.discription}
              </p>                      
              </div>
            
              </div>
          </div>
      ))}
  </div>

    </div>
</div>
    </div>
  )
}

export default Resume11
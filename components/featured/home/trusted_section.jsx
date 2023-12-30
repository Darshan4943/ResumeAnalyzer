import ImageContainer from "@/components/common/image";
import { React } from "react";

function TrustedBySection() {
  return (
    <div className="trust_section_parent  w-screen">
      <div className="trust_section my-[36px]">
        <p id="trust">Trusted by...</p>
        <div className="trust_img">
          {Array.from({ length: 7 }).map((item, index) => (
            <ImageContainer
              key={index}
              src={`/images/home/company_logs/scroller-img_${index + 1}.png`}
              alt=""
              className="h-[36px] w-auto"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrustedBySection;

import ImageContainer from "@/components/common/image";
import { React } from "react";
import {motion} from 'framer-motion'
function TrustedBySection() {
  return (
    <div className="trust_section_parent  w-screen">
      <div className="trust_section my-[36px]">
        <p id="trust">Trusted by...</p>
        <motion.div 
        initial={{translateX:'100%'}}
        animate={{translateX:'-100%'}}
        transition={{duration: 7, repeat: Infinity, ease: "linear"}}
        className="trust_img ">
          {Array.from({ length: 7 }).map((item, index) => (
            <ImageContainer
              key={index}
              src={`/images/home/company_logs/scroller-img_${index + 1}.png`}
              alt=""
              className="h-[40px] w-auto"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default TrustedBySection;

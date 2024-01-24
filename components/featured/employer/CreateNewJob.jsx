import React, { useEffect, useRef, useState } from "react";
import JobPostSetting from "./JobPostSetting";
import HiringPostJob from "./HiringPostJob";
import { AnimatePresence, motion } from "framer-motion";
import PersonalDetails from "./afterLogin/jobPosting/PersonalDetails";
import CreateProfileFields from "./afterLogin/jobPosting/CreateProfileFields";

function CreateNewJob() {
  const [isCreate, setIsCreate] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setIsSetting(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      {!isCreate && (
        <div className="flex flex-row  gap-[20px] ml:max-h-[80vh] pb-4 ">
          <div className="  web overflow-y-auto pb-4  ">
            <JobPostSetting />
          </div>

          <div className=" ml:w-[66%] w-full overflow-y-auto pb-4 relative ">
            <HiringPostJob
              setIsSetting={setIsSetting}
              setIsCreate={setIsCreate}
            />

            <AnimatePresence>
              {isSetting && (
                <>
                  <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-40"></div>
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                    ref={taskRef}
                    className=" fixed z-[2000]  mobile  rounded-[8px] max-h-[80vh] overflow-y-auto top-[8rem] right-0 bottom-0"
                    style={{ backdropFilter: "blur(10px)" }}
                  >
                    <JobPostSetting setIsSetting={setIsSetting} />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
      {isCreate && <CreateProfileFields />}
    </>
  );
}

export default CreateNewJob;

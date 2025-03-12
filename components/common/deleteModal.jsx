import React from "react";

const DeleteModal = ({ deleteHandler, closeDeleteModal, type }) => {
 
  return (
    <>
      <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>

      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
        <div className=" bg-white rounded-[12px] p-6 flex flex-col gap-4 justify-center items-center max-w-[330px]">
          <img
            src="/images/icons/delete_icon.png"
            className=" h-[60px] w-[60px]"
            alt=""
          />
          <div className="w-full d-flex flex-column justify-center items-center">
            <h1 className="text-[24px] text-center">Delete</h1>
            <p className="text-[16px] text-center">
               {`"Are you sure you want to delete this ${type}"`}
                
            </p>
          </div>
          <div className="w-full flex  justify-between flex-row">
            <button className="blue_border_Button h-[38px] px-6 rounded-[30px]" onClick={closeDeleteModal}>
              {" "}
              No
            </button>
            <button className="red_border_Button h-[38px] px-6  rounded-[30px]" onClick={deleteHandler}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;

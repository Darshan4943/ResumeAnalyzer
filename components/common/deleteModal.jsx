import React from "react";

const DeleteModal = ({ deleteHandler, closeDeleteModal }) => {
  return (
    <>
      <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>

      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
        <div className="delete_modal_container">
          <img
            src="/images/icons/delete_icon.png"
            className=" delete_icon"
            alt=""
          />
          <div className="w-full d-flex flex-column justify-center items-center">
            <h1 className="text-[24px] text-center">Delete</h1>
            <p className="text-[16px] text-center">
              Are you sure you want delete this selection?
            </p>
          </div>
          <div className="w-full flex justify-between flex-row">
            <button className="btn_filled_blue" onClick={closeDeleteModal}>
              {" "}
              No
            </button>
            <button className="btn_filled_red" onClick={deleteHandler}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;

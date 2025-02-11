import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CountPostingDays } from "../../utils/data";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import MiniLoader from "../../components/common/miniLoader";

function EmployerNotification() {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const notificationFilters = [
    "Today ",
    "2 days Ago",
    "Application Status ",
    "Offer",
    "Views on profile",
  ];

  const fetchNotifications = async (filter) => {
    try {
      const response = await fetch(
        `http://localhost:2000/api/getnotification/${
          userDataGlobal._id
        }?filter=${encodeURIComponent(filter)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      setNotifications(data.notifications);
      setLoading(false);

    } catch (error) {
      setLoading(false);

      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (userDataGlobal?._id) {
      fetchNotifications(notificationFilters[selectedIndex] || "");
    }
  }, [userDataGlobal._id, selectedIndex]);

  const handleNotificationClick = async () => {
    try {
      await axios.post(`http://localhost:2000/api/updateNotification`, {
        selectedIds,
      });
      fetchNotifications();
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  useEffect(() => {
    handleNotificationClick();
  }, [selectedIds]);

  const deleteNotification = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:2000/api/deletnotification/${id}`
      );

      toast.success(response.data.message);
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification");
    }
  };

  const handleSelectId = () => {
    if (notifications.length > 0) {
      const ids = notifications.map((id) => id._id);
      setSelectedIds(ids);
    }
  };

  return (
    <div className="flex flex-col w-[100%] items-center gap-4  overflow-hidden">
      <div className="flex flex-col gap-4 p-4 w-full items-start bg-white rounded-lg ">
        <p className="text-[20px] text-[#333] font-medium">My Notifications</p>

        <div className="pb-1 flex items-start gap-3 overflow-x-auto w-full scrollbar-hide">
          {notificationFilters.map((e, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`py-2 px-4 flex items-center rounded-full border border-[#DEDEDE] text-[14px] sm:text-[16px] font-semibold transition-all duration-300 ${
                selectedIndex === index
                  ? "bg-[#06A9EF] text-white border-transparent"
                  : "bg-white text-[#333] shadow-sm hover:bg-[#f1f1f1] active:scale-95"
              }`}
              style={{ whiteSpace: "nowrap" }}
            >
              {e}
              {/* ({notifications.length}) */}
            </button>
          ))}
        </div>

        <div className="w-full flex justify-end">
          <p
            className="text-[14px] sm:text-[16px] font-semibold text-[#06A9EF] cursor-pointer "
            onClick={() => handleSelectId()}
          >
            Mark all as read
          </p>
        </div>
      </div>

      {loading ? (
        <div className=" min-h-[360px] ">
          <MiniLoader />
        </div>
      ) : (
        <div className="w-full flex flex-col sm:p-4 p-3 items-start gap-3 rounded-lg bg-white shadow-md">
          {notifications.length > 0 ? (
            <>
              {notifications.map((e, i) => (
                <div
                  key={e._id}
                  className={`flex w-full px-4 py-3 gap-4 items-center justify-between rounded-lg transition-all cursor-pointer 
      ${!e.isViewed ? "bg-[#EBF9FF]" : "bg-white"}`}
                  onClick={() => {
                    setSelectedIds([e._id]);
                    router.push(
                      `/common/hiring/ApplicantDetails?applicantId=${[
                        e.applicantId,
                      ]}&id=${e.jobId}`
                    );
                  }}
                >
                  <div className="flex items-center w-full gap-4">
                    <div className="w-[50px] h-[50px]  flex-shrink-0">
                      <img
                        src={e.logo || "/images/LOGO.png"}
                        alt="Notification Logo"
                        className=" rounded-[8px] "
                      />
                    </div>

                    <div className="flex flex-col w-full">
                      <p className="text-[14px] sm:text-[16px] text-[#333] font-medium leading-[160%]">
                        {e.description}
                      </p>
                      <p className="text-[#646464] text-[12px] sm:text-[14px] font-normal">
                        {CountPostingDays(e.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* {!e.isViewed && (
                <div className="h-3 w-3 bg-[#06A9EF] rounded-full"></div>
              )} */}

                    <div className="flex items-center gap-3">
                      <svg
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteNotification(e._id);
                        }}
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14ZM10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14Z"
                          fill="#333333"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[360px] p-3 w-full gap-2 bg-gray-100 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 mb-4 text-gray-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 24c1.104 0 2-.896 2-2h-4c0 1.104.896 2 2 2zm10-6v-7c0-3.519-2.613-6.432-6-6.92V3.5c0-.828-.672-1.5-1.5-1.5S13 2.672 13 3.5v.58c-3.387.488-6 3.401-6 6.92v7l-2 2v1h20v-1l-2-2zm-2 1H4v-6.999c0-3.309 2.691-6 6-6s6 2.691 6 6V19z" />
            </svg>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700">
                No Notifications Available
              </p>
              <p className="text-sm text-gray-500">
                You're all caught up! Check back later for new updates.
              </p>
            </div>
          </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EmployerNotification;

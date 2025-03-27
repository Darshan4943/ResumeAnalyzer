import React from 'react'
import SubscriptionPlans from '../../components/featured/home/SubscriptionPlans'
import { useSelector } from 'react-redux';


const Plans = () => {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  return (
    <div className={`mt-5  ${userDataGlobal?.role === "user" ? "customMargins" :""}`}>
      <SubscriptionPlans />
    </div>
  )
}

export default Plans  
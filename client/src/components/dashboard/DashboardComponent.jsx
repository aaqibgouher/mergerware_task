import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { roles } from "../../utils/constant";
import AdminComponent from "./AdminComponent";
import BorrowerComponent from "./BorrowerComponent";
import LenderComponent from "./LenderComponent";

const DashbordComponent = () => {
  const meState = useSelector((state) => state.userReducer.me);
  const [role, setRole] = useState(null);

  useEffect(() => {
    console.log(meState, "me state");
    if (meState) {
      setRole(meState.role);
    }
  }, [meState]);

  return (
    <>
      {/* {role === roles.ADMIN && <AdminComponent />}
      {role === roles.BORROWER && <BorrowerComponent />}
      {role === roles.LENDER && <LenderComponent />} */}
      <BorrowerComponent />
    </>
  );
};

export default DashbordComponent;

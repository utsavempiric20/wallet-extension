import React, { useState } from "react";
import Style from "./ActivityTab.module.css";
import { BsSend } from "react-icons/bs";
import { PiArrowElbowLeftDownBold } from "react-icons/pi";

const ActivityTab = () => {
  const dataArray = [1, 2, 3, 4, 5];
  const [historyData, setHistoryData] = useState(dataArray);
  return (
    <div className={Style.activityTab}>
      <div className={Style.activityTab_box}>
        {historyData.map((element, i) => (
          <div key={i}>
            {/* <div className={Style.dateTxt}>5 Aug, 2024</div> */}
            <div className={Style.activity_list_box}>
              <div className={Style.send_confirm_box}>
                <div className={Style.icon_box}>
                  <BsSend className={Style.sendIcon} />
                </div>
                <div className={Style.sendTxt_box}>
                  <div className={Style.sendTxt}>Send</div>
                  <div className={Style.confirmedTxt}>Confirmed</div>
                </div>
              </div>
              <div className={Style.tokenPrice_box}>
                <div className={Style.tokenPriceTxt}>-2 SepoliaEth</div>
                <div className={Style.tokenSmall_PriceTxt}>-2 SepoliaEth</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTab;

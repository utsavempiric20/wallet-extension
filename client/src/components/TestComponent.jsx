import React from "react";
import Style from "./CreateWallet/CreatePassword.module.css";

const TestComponent = () => {
  return (
    <div>
      <div className={Style.password_box}>
        <div className="mb-3">
          <input
            type="url"
            className="form-control"
            name="password"
            id="shopeeurl"
            placeholder="Enter url"
          />
        </div>
      </div>
      <a
        target="_blank"
        href="https://shopee.com.br/Drone-De-C%C3%A2mera-De-4K-Profissional-De-Alta-Defini%C3%A7%C3%A3o-Com-Dupla-i.734448735.16356890086?uls_trackid=50d7olnc01lo&utm_campaign=-&utm_content=----&utm_medium=affiliates&utm_source=an_18344280075&utm_term=biuyrp3pckbq"
      >
        <button>click</button>
      </a>
    </div>
  );
};

export default TestComponent;

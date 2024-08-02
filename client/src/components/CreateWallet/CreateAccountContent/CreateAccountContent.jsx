import React from "react";
import Style from "./CreateAccountContent.module.css";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const CreateAccountContent = () => {
  return (
    <div className={Style.createAccountContent}>
      <div className={Style.createAccountContent_box}>
        <h2>Create Your Account</h2>
        <p>
          BLUESKY Wallet is a secure wallet and account manager for your
          accounts on the BLUESKY blockchain.
        </p>
        <p>
          Once you create an account, you’ll need it to interact with
          applications on BLUESKY, and to securely store your various tokens and
          collectibles (NFTs).
        </p>

        <div className={Style.learn_box}>
          <Link className={Style.learnTxt}>
            Learn more about BLUESKY <AiOutlineArrowRight />
          </Link>
        </div>

        <Link
          to="/set-recovery-implicit-account"
          replace
          className={Style.getStartTxt}
        >
          <button>Get Started</button>
        </Link>

        <div className={Style.accountTxt}>
          By creating a BLUESKY account, you agree to the MyBlueskyWallet
        </div>

        <div className={Style.termsTxt}>
          Terms of Service and Privacy Policy.
        </div>

        <div className={Style.alreadyAccountText}>Already have an account?</div>
        <div className={Style.importTxt_Box}>
          <Link to="/recover-account" className={Style.importTxt}>
            Import Existing Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountContent;

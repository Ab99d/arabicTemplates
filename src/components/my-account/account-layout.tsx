// @ts-nocheck
import React, { useState } from "react";
import PageHeader from "@components/ui/page-header";
import Container from "@components/ui/container";
import AccountNav from "@components/my-account/account-nav";
import Subscription from "@components/common/subscription";
import MainSwiper from "@components/ui/carousel/mainSwiper";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import {
  getUserProfile,
  getUserSpecialData,
  isCurrentUserAuthor,
  logOut,
} from "src/redux/userLoginInfo";

const AccountLayout: React.FunctionComponent<{}> = ({ children }) => {
  const router = useRouter();
  const IsUser = useSelector(
    (state: RootState) => state.loggedInSlice.userInformation
  );
  const disptach = useDispatch();
  const AccessToken = IsUser[0]?.AuthenticationResult?.AccessToken;

  React.useEffect(() => {
    if (IsUser.length === 0) {
      router.push(`/`);
    }
  }, []);

  function getUserDetails() {
    axios
      .get("https://modbzw1g3m.execute-api.eu-central-1.amazonaws.com/user", {
        headers: {
          authorization: AccessToken,
        },
      })
      .then((response) => {
        console.log(response.data[0]?.isAuthor);
        disptach(isCurrentUserAuthor(response.data[0]?.isAuthor));
        disptach(getUserProfile(response.data));
      })
      .catch((error) => {
        console.error(error.response.data.message);
        if (error.response.data.message?.includes("Access Token has expired")) {
          disptach(logOut());
          router.push(`/`);
        }
      });
  }
  getUserDetails();

  function getUserSpecialInfo() {
    axios
      .put(
        "https://modbzw1g3m.execute-api.eu-central-1.amazonaws.com/update-user",
        {},
        {
          headers: {
            authorization: AccessToken,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        disptach(getUserSpecialData(response.data));
      })
      .catch((error) => {
        console.error(error.response.data.message);
        if (error.response.data.message?.includes("Access Token has expired")) {
          disptach(logOut());
          router.push(`/`);
        }
      });
  }
  getUserSpecialInfo();

  return (
    <>
      {/* <PageHeader pageHeader="text-page-my-account" /> */}
      <MainSwiper page={"accountPage"} />
      <Container>
        <div className="py-16 lg:py-20 px-0 xl:max-w-screen-xl mx-auto flex  md:flex-row w-full">
          <div className="flex flex-col md:flex-row w-full">
            <AccountNav />
            <div className="md:w-4/6 2xl:w-8/12 mt-4 md:mt-0">{children}</div>
          </div>
        </div>
        <Subscription />
      </Container>
    </>
  );
};

export default AccountLayout;

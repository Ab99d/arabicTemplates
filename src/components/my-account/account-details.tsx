import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import {
  useUpdateUserMutation,
  UpdateUserType,
} from "@framework/customer/use-update-customer";
import { RadioBox } from "@components/ui/radiobox";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const defaultValues = {};
const AccountDetails: React.FC = () => {
  const { mutate: updateUser, isLoading } = useUpdateUserMutation();
  const { t } = useTranslation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserType>({
    defaultValues,
  });

  // // user name
  // console.log(getUserSpecialInfo[0].user.UserAttributes[8].Value);
  // // user phone number
  // console.log(getUserSpecialInfo[0].user.UserAttributes[9].Value);
  // // user gender
  // console.log(getUserSpecialInfo[0].user.UserAttributes[3].Value);
  // // user locale
  // console.log(getUserSpecialInfo[0].user.UserAttributes[6].Value);
  // // user profile

  // linkedin
  // console.log(socialMedia[0].linkedin);
  // twitter
  // console.log(socialMedia[1].twitter);
  // instagram
  // console.log(socialMedia[2].instagram);
  // snapchat
  // console.log(socialMedia[3].snapchat);
  // facebook
  // console.log(socialMedia[4].facebook);
  // portfolio
  // console.log(socialMedia[5].portfolio);

  const IsUser = useSelector(
    (state: RootState) => state.loggedInSlice.userInformation
  );
  const AccessToken = IsUser[0]?.AuthenticationResult?.AccessToken;

  const userDetails = useSelector(
    (state: RootState) => state.loggedInSlice.userDetails
  );
  const userProfile = useSelector(
    (state: RootState) => state.registerStatus.userProfile
  );
  const getUserSpecialInfo = useSelector(
    (state: RootState) => state.loggedInSlice.userSpecialData
  );

  console.log(getUserSpecialInfo);

  const userAttributesName = getUserSpecialInfo[0]?.user.UserAttributes.find(
    (obj) => obj.Name === "name"
  );
  const userAttributesPhone = getUserSpecialInfo[0]?.user.UserAttributes.find(
    (obj) => obj.Name === "phone_number"
  );
  const userAttributesGender = getUserSpecialInfo[0]?.user.UserAttributes.find(
    (obj) => obj.Name === "gender"
  );
  const userAttributesLocal = getUserSpecialInfo[0]?.user.UserAttributes.find(
    (obj) => obj.Name === "locale"
  );
  const userAttributesProfile = getUserSpecialInfo[0]?.user.UserAttributes.find(
    (obj) => obj.Name === "profile"
  );

  var socialMedia = userAttributesProfile?.Value
    ? JSON.parse(userAttributesProfile?.Value)
    : [
        { linkedin: "https://example.com" },
        { twitter: "https://example.com" },
        { instagram: "https://example.com" },
        { snapchat: "https://example.com" },
        { facebook: "https://example.com" },
        { portfolio: "https://example.com" },
      ];
  console.log(socialMedia);

  let socialMediaLinkedin = socialMedia?.find((obj) =>
    obj.hasOwnProperty("linkedin")
  );
  let socialMediaTwitter = socialMedia?.find((obj) =>
    obj.hasOwnProperty("twitter")
  );
  let socialMediaInstagram = socialMedia?.find((obj) =>
    obj.hasOwnProperty("instagram")
  );
  let socialMediaSnapchat = socialMedia?.find((obj) =>
    obj.hasOwnProperty("snapchat")
  );
  let socialMediaFacebook = socialMedia?.find((obj) =>
    obj.hasOwnProperty("facebook")
  );
  let socialMediaPortfolio = socialMedia?.find((obj) =>
    obj.hasOwnProperty("portfolio")
  );

  console.log(userAttributesName?.Value);
  console.log(userAttributesPhone?.Value);
  console.log(userAttributesGender?.Value);
  console.log(userAttributesLocal?.Value);
  console.log(socialMediaLinkedin["linkedin"]);
  console.log(socialMediaTwitter["twitter"]);
  console.log(socialMediaInstagram["instagram"]);
  console.log(socialMediaSnapchat["snapchat"]);
  console.log(socialMediaFacebook["facebook"]);
  console.log(socialMediaPortfolio["portfolio"]);

  const [allDataWeNeed, setAllDataWeNeed] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    function checkData() {
      if (userProfile) {
        setIsAuthor(true);
        if (
          userAttributesName &&
          userAttributesPhone &&
          userAttributesGender &&
          userAttributesLocal &&
          userAttributesProfile
        ) {
          setAllDataWeNeed(true);
        } else {
          setAllDataWeNeed(false);
        }
      } else {
        setIsAuthor(false);
        if (
          userAttributesName &&
          userAttributesPhone &&
          userAttributesGender &&
          userAttributesLocal &&
          userAttributesProfile
        ) {
          setAllDataWeNeed(true);
        } else {
          setAllDataWeNeed(false);
        }
      }
    }
    checkData();
  }, []);

  // update user details
  const [userUpdateLoading, setUserUpdateLoading] = useState(false);
  const [userUpdateError, setUserUpdateError] = useState("");
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserUpdateLoading(true);
    const gender = event.target.elements.gender1.checked
      ? event.target.elements.gender1.value
      : event.target.elements.gender2.checked
      ? event.target.elements.gender2.value
      : "none";
    axios
      .put(
        "https://modbzw1g3m.execute-api.eu-central-1.amazonaws.com/update-user",
        {
          name: event.target.elements.name.value,
          gender: gender,
          phone_number: event.target.elements.Phone.value,
          locale: event.target.elements.locale.value,
          profile: [
            {
              linkedin: event.target.elements.linkedin.value,
            },
            {
              twitter: event.target.elements.twitter.value,
            },
            {
              instagram: event.target.elements.instagram.value,
            },
            {
              snapchat: event.target.elements.snapchat.value,
            },
            {
              facebook: event.target.elements.facebook.value,
            },
            {
              portfolio: event.target.elements.portfolio.value,
            },
          ],
        },
        {
          headers: {
            authorization: AccessToken,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        router.push(`/my-account`);
      })
      .catch((error) => {
        console.error(error.message);
        setUserUpdateError(error.message);
      })
      .finally(() => {
        setUserUpdateLoading(false);
      });
    // console.log(event.target.elements.name.value);
    // console.log(event.target.elements.Phone.value);
    // console.log(event.target.elements.locale.value);
    // console.log(event.target.elements.linkedin.value);
    // console.log(event.target.elements.Wtwitter.value);
    // console.log(event.target.elements.instagram.value);
    // console.log(event.target.elements.snapchat.value);
    // console.log(event.target.elements.facebook.value);
    // console.log(event.target.elements.portfolio.value);
    // console.log(event.target.elements.gender1.checked);
    // console.log(event.target.elements.gender2.checked);
  };

  return (
    <>
      {userUpdateLoading ? (
        <>
          <div className="loader2" style={{ margin: "auto" }}></div>
        </>
      ) : (
        <>
          <motion.div
            layout
            initial="from"
            animate="to"
            exit="from"
            //@ts-ignore
            variants={fadeInTop(0.35)}
            className={`w-full flex flex-col`}
          >
            <p>{isAuthor ? "Author" : "Customer"}</p>
            <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
              {t("common:text-account-details")}
            </h2>
            {userUpdateError ? (
              <>
                <p
                  style={{
                    color: "red",
                    marginBottom: "1rem",
                    textDecoration: "underline",
                  }}
                >
                  {userUpdateError}
                </p>
              </>
            ) : (
              <></>
            )}
            <form
              onSubmit={onSubmit}
              className="w-full mx-auto flex flex-col justify-center "
              noValidate
            >
              <div className="flex flex-col space-y-4 sm:space-y-5">
                <div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
                  <div style={{ width: "50%" }}>
                    <label
                      htmlFor="name"
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Name *
                    </label>
                    <br />
                    <input
                      type="text"
                      defaultValue={
                        userAttributesName?.Value
                          ? userAttributesName?.Value
                          : ""
                      }
                      id="name"
                      style={{
                        padding: "1rem",
                        borderRadius: "7px",
                        border: "0.3px solid gray",
                        outline: "none",
                        marginTop: ".5rem",
                        width: "100%",
                      }}
                    />
                  </div>
                  {/* <div style={{ width: "100%" }}>
              <label
                htmlFor="username"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Username *
              </label>
              <br />
              <input
                type="text"
                defaultValue={
                  getUserSpecialInfo[0].user.UserAttributes[8].Value &&
                  getUserSpecialInfo[0].user.UserAttributes[8].Value
                }
                id="username"
                style={{
                  padding: "1rem",
                  borderRadius: "7px",
                  border: "0.3px solid gray",
                  outline: "none",
                  marginTop: ".5rem",
                  width: "100%",
                }}
              />
            </div> */}
                </div>
                <div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
                  <div style={{ width: "100%" }}>
                    <label
                      htmlFor="Phone"
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Phone Number *
                    </label>
                    <br />
                    <input
                      type="text"
                      defaultValue={
                        userAttributesPhone?.Value
                          ? userAttributesPhone?.Value
                          : ""
                      }
                      id="Phone"
                      style={{
                        padding: "1rem",
                        borderRadius: "7px",
                        border: "0.3px solid gray",
                        outline: "none",
                        marginTop: ".5rem",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div style={{ width: "100%" }}>
                    <label
                      htmlFor="locale"
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Country *
                    </label>
                    <br />
                    <input
                      type="text"
                      defaultValue={
                        userAttributesLocal?.Value
                          ? userAttributesLocal?.Value
                          : ""
                      }
                      id="locale"
                      style={{
                        padding: "1rem",
                        borderRadius: "7px",
                        border: "0.3px solid gray",
                        outline: "none",
                        marginTop: ".5rem",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-column sm:space-s-3 space-y-4 sm:space-y-0">
                  <label
                    htmlFor="SocialMedia"
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      textDecoration: "underline",
                      marginBottom: "1rem",
                    }}
                  >
                    Social Media Profiles
                  </label>
                  <div style={{ marginLeft: "0", display: "flex" }}>
                    <div style={{ width: "33.3333%", margin: ".5rem" }}>
                      <label
                        htmlFor="linkedin"
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        linkedin
                      </label>
                      <div style={{ width: "100%" }}>
                        <input
                          type="text"
                          defaultValue={
                            socialMediaLinkedin["linkedin"]
                              ? socialMediaLinkedin["linkedin"]
                              : "https://example.com"
                          }
                          id="linkedin"
                          style={{
                            padding: "1rem",
                            borderRadius: "7px",
                            border: "0.3px solid gray",
                            outline: "none",
                            marginTop: ".5rem",
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ width: "33.3333%", margin: ".5rem" }}>
                      <label
                        htmlFor="twitter"
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        twitter
                      </label>
                      <div style={{ width: "100%" }}>
                        <input
                          type="text"
                          defaultValue={
                            socialMediaTwitter["twitter"]
                              ? socialMediaTwitter["twitter"]
                              : "https://example.com"
                          }
                          id="twitter"
                          style={{
                            padding: "1rem",
                            borderRadius: "7px",
                            border: "0.3px solid gray",
                            outline: "none",
                            marginTop: ".5rem",
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ width: "33.3333%", margin: ".5rem" }}>
                      <label
                        htmlFor="instagram"
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        instagram
                      </label>
                      <div style={{ width: "100%" }}>
                        <input
                          type="text"
                          defaultValue={
                            socialMediaInstagram["instagram"]
                              ? socialMediaInstagram["instagram"]
                              : "https://example.com"
                          }
                          id="instagram"
                          style={{
                            padding: "1rem",
                            borderRadius: "7px",
                            border: "0.3px solid gray",
                            outline: "none",
                            marginTop: ".5rem",
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ marginLeft: "0", display: "flex" }}>
                    <div style={{ width: "33.3333%", margin: ".5rem" }}>
                      <label
                        htmlFor="snapchat"
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        snapchat
                      </label>
                      <div style={{ width: "100%" }}>
                        <input
                          type="text"
                          defaultValue={
                            socialMediaSnapchat["snapchat"]
                              ? socialMediaSnapchat["snapchat"]
                              : "https://example.com"
                          }
                          id="snapchat"
                          style={{
                            padding: "1rem",
                            borderRadius: "7px",
                            border: "0.3px solid gray",
                            outline: "none",
                            marginTop: ".5rem",
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ width: "33.3333%", margin: ".5rem" }}>
                      <label
                        htmlFor="facebook"
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        facebook
                      </label>
                      <div style={{ width: "100%" }}>
                        <input
                          type="text"
                          defaultValue={
                            socialMediaFacebook["facebook"]
                              ? socialMediaFacebook["facebook"]
                              : "https://example.com"
                          }
                          id="facebook"
                          style={{
                            padding: "1rem",
                            borderRadius: "7px",
                            border: "0.3px solid gray",
                            outline: "none",
                            marginTop: ".5rem",
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ width: "33.3333%", margin: ".5rem" }}>
                      <label
                        htmlFor="portfolio"
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        portfolio
                      </label>
                      <div style={{ width: "100%" }}>
                        <input
                          type="text"
                          defaultValue={
                            socialMediaPortfolio["portfolio"]
                              ? socialMediaPortfolio["portfolio"]
                              : "https://example.com"
                          }
                          id="portfolio"
                          style={{
                            padding: "1rem",
                            borderRadius: "7px",
                            border: "0.3px solid gray",
                            outline: "none",
                            marginTop: ".5rem",
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative flex flex-col">
                  <span className="mt-2 text-sm text-heading font-semibold block pb-1">
                    {t("common:text-gender")}
                  </span>
                  <div className="mt-2 flex items-center space-s-6">
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div>
                        <input
                          type="radio"
                          id="gender1"
                          name="gender"
                          value="Male"
                          style={{ accentColor: "black" }}
                        />
                        <label htmlFor="age1"> Male</label>
                      </div>
                      <br />
                      <div>
                        <input
                          type="radio"
                          id="gender2"
                          name="gender"
                          value="Female"
                          style={{ accentColor: "black" }}
                        />
                        <label htmlFor="age2"> Female</label>
                      </div>
                      <br />
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Button
                    type="submit"
                    loading={isLoading}
                    disabled={isLoading}
                    className="h-12 mt-3 w-full sm:w-32"
                  >
                    {t("common:button-save")}
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </>
  );
};

export default AccountDetails;

import React, { useEffect, useState } from "react";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import Logo from "@components/ui/logo";
import { useForm } from "react-hook-form";
import { useUI } from "@contexts/ui.context";
import { useTranslation } from "next-i18next";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getRegisterStatus } from "src/redux/registerSlice";
import { getAuthData, passwordReset } from "src/redux/userLoginInfo";

type FormValues = {
  email: string;
};

const defaultValues = {
  email: "",
};

var success = false;
var successSending = false;

const SetNewPasswordModal: React.FC = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [password, setNewPass] = useState("");
  const [newPass1, setNewPass1] = useState("");
  const [isPassMatch, setSetIsPassMatch] = useState(false);
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { setModalView } = useUI();

  useEffect(() => {
    if (password !== newPass1) {
      setSetIsPassMatch(false);
    } else {
      setSetIsPassMatch(true);
    }
  }, [password, newPass1]);

  function onSubmit() {
    setLoading(true);
    axios
      .post(
        "https://modbzw1g3m.execute-api.eu-central-1.amazonaws.com/forgot-password",
        {
          username,
          password,
          code,
        }
      )
      .then((response) => {
        console.log(response.data);
        success = true;
        successSending = false;
        setModalView("LOGIN_VIEW");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div
        id="popup-modal"
        tabIndex="-1"
        className="fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-opacity-70 bg-black"
        style={{ display: "grid", placeItems: "center", height: "92%" }}
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow light:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            ></button>
            <div className="p-6 text-center">
              {/* <svg
				  aria-hidden="true"
				  className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
				  fill="none"
				  stroke="currentColor"
				  viewBox="0 0 24 24"
				  xmlns="http://www.w3.org/2000/svg"
				>
				  <path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				  ></path>
				</svg> */}
              <h3
                style={{ marginBottom: "0" }}
                className="mb-5 text-lg font-normal text-gray-700 dark:text-gray-600"
              >
                Enter the confirmation code that sent to your email
              </h3>
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errorMessage}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem",
                }}
              >
                <input
                  className="text-gray-500 dark:text-gray-400"
                  onChange={(e) => setUserName(e.target.value)}
                  style={{
                    padding: "1rem",
                    margin: ".5rem",
                    border: "1px solid gray",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                  type="text"
                  name=""
                  id=""
                  placeholder="Email"
                />
                <input
                  className="text-gray-500 dark:text-gray-400"
                  onChange={(e) => setNewPass(e.target.value)}
                  style={{
                    padding: "1rem",
                    margin: ".5rem",
                    border: "1px solid gray",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                  type="text"
                  name=""
                  id=""
                  placeholder="New Password"
                />
                {!isPassMatch && newPass1.length > 0 ? (
                  <p style={{ color: "red" }}>Passwords not matched</p>
                ) : (
                  <></>
                )}
                <input
                  className="text-gray-500 dark:text-gray-400"
                  onChange={(e) => setNewPass1(e.target.value)}
                  style={{
                    padding: "1rem",
                    margin: ".5rem",
                    border: "1px solid gray",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                  type="text"
                  name=""
                  id=""
                  placeholder="Confirm New Password"
                />
                <input
                  className="text-gray-500 dark:text-gray-400"
                  onChange={(e) => setCode(e.target.value)}
                  style={{
                    padding: "1rem",
                    margin: ".5rem",
                    border: "1px solid gray",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter Code"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  //   disabled={loadingResend}
                  className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  onClick={onSubmit}
                  style={{
                    width: "86px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {loading ? <div className="loader1"></div> : <>Submit</>}
                </button>
                {/* <button
                  data-modal-hide="popup-modal"
                  type="button"
                  //   disabled={loadingResend}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  //   onClick={sendCode}
                  style={{
                    width: "86px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {loadingResend ? (
                    <div className="loader1"></div>
                  ) : (
                    <>Resend</>
                  )}
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ForgetPasswordForm = () => {
  const { t } = useTranslation();
  const { setModalView, openModal, closeModal } = useUI();
  const [username, setUserName] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  function handleSignIn() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }

  const onSubmit = (values: FormValues) => {
    sendCode(values.email);
  };

  //   console.log(success);
  //   React.useEffect(() => {
  //     if (success) {
  //       setModalView("LOGIN_VIEW");
  //     }
  //   }, [success]);

  // send verification code function

  const [loadingResend, setLoadingResend] = React.useState(false);
  const sendCode = async (username: string) => {
    setLoadingResend(true);
    axios
      .post(
        "https://modbzw1g3m.execute-api.eu-central-1.amazonaws.com/forgot-password-resend",
        {
          username,
        }
      )
      .then((response) => {
        console.log(response.data);
        successSending = true;
      })
      .catch((error) => {
        console.error(error.response.data);
      })
      .finally(() => {
        setLoadingResend(false);
      });
  };

  return (
    <>
      <div
        className="py-6 px-5 sm:p-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300"
        style={{ opacity: successSending && !success ? 0 : 1 }}
      >
        <div className="text-center mb-9 pt-2.5">
          <div>
            <Logo />
          </div>
          <p className="text-sm md:text-base text-body mt-3 sm:mt-4 mb-8 sm:mb-10">
            {t("common:forgot-password-helper")}
          </p>
        </div>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="flex flex-col justify-center"
          noValidate
        >
          <Input
            labelKey="forms:label-email"
            type="email"
            variant="solid"
            className="mb-4"
            {...register("email", {
              required: `${t("forms:email-required")}`,
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: t("forms:email-error"),
              },
            })}
            errorKey={errors.email?.message}
          />

          <Button type="submit" className="h-11 md:h-12 w-full mt-2">
            {loadingResend ? (
              <div className="loader"></div>
            ) : (
              t("common:text-reset-password")
            )}
          </Button>
        </form>
        <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-10 mb-6 sm:mb-7">
          <hr className="w-full border-gray-300" />
          <span className="absolute -top-2.5 px-2 bg-white">
            {t("common:text-or")}
          </span>
        </div>
        <div className="text-sm sm:text-base text-body text-center">
          {t("common:text-back-to")}{" "}
          <button
            type="button"
            className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
            onClick={handleSignIn}
          >
            {t("common:text-login")}
          </button>
        </div>
      </div>
      {successSending && !success ? <SetNewPasswordModal /> : <>.</>}
    </>
  );
};

export default ForgetPasswordForm;

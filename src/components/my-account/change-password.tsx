import React, { useState } from "react";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import {
  useChangePasswordMutation,
  ChangePasswordInputType,
} from "@framework/customer/use-change-password";
import { useTranslation } from "next-i18next";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "src/redux/userLoginInfo";
import { useRouter } from "next/router";

const defaultValues = {
  oldPassword: "",
  newPassword: "",
};

const ChangePassword: React.FC = () => {
  const { mutate: changePassword, isLoading } = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInputType>({
    defaultValues,
  });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [loadingResend, setLoadingResend] = React.useState(false);
  const IsUser = useSelector(
    (state: RootState) => state.loggedInSlice.userDetails
  );

  const username = IsUser[0]?.username;
  const sendCode = async () => {
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
      })
      .catch((error) => {
        console.error(error.response.data);
      })
      .finally(() => {
        setLoadingResend(false);
      });
  };

  const [handleError, setHandleError] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const password = event.target.elements.password.value;
    const code = event.target.elements.code.value;
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
        dispatch(logOut());
        router.push(`/`);
      })
      .catch((error) => {
        console.log(error.response.data.message.code);
        if (error.response.data.message.code == "InvalidPasswordException") {
          setHandleError("Invalid Password");
        }
        if (error.response.data.message.code == "CodeMismatchException") {
          setHandleError("Wrong Code");
        }
        if (error.response.data.message.code == "LimitExceededException") {
          setHandleError("Limit Exceeded");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  console.log(handleError);

  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("common:text-change-password")}
      </h2>
      <motion.div
        layout
        initial="from"
        animate="to"
        exit="from"
        //@ts-ignore
        variants={fadeInTop(0.35)}
        className={`w-full flex  h-full lg:w-8/12 flex-col`}
      >
        <form
          onSubmit={onSubmit}
          className="w-full mx-auto flex flex-col justify-center "
        >
          <div className="flex flex-col space-y-3">
            {/* <PasswordInput
							labelKey="forms:label-old-password"
							errorKey={errors.oldPassword?.message}
							{...register("oldPassword", {
								required: "forms:password-old-required",
							})}
							className="mb-4"
						/>
						<PasswordInput
							labelKey="forms:label-new-password"
							errorKey={errors.newPassword?.message}
							{...register("newPassword", {
								required: "forms:label-new-password",
							})}
							className="mb-4"
						/> */}

            <input
              type="text"
              placeholder="New Password"
              className="mb-4"
              id="password"
              style={{
                padding: "1rem",
                borderRadius: "7px",
                border: "0.3px solid gray",
                outline: "none",
                width: "100%",
              }}
            />
            <input
              type="text"
              placeholder="Code"
              className="mb-4"
              id="code"
              style={{
                padding: "1rem",
                borderRadius: "7px",
                border: "0.3px solid gray",
                outline: "none",
                width: "100%",
              }}
            />
            {handleError == "Wrong Code" ? (
              <p style={{ color: "red" }}>Wrong Code</p>
            ) : handleError == "Invalid Password" ? (
              <>
                <p style={{ fontSize: "12px" }}>
                  Please match the password format requested
                  <br />
                  <span style={{ color: "red" }}>
                    _The password must contain at least 10 characters.
                  </span>
                  <br />
                  <span style={{ color: "red" }}>
                    _The password must contain at least one uppercase letter.
                  </span>
                  <br />
                  <span style={{ color: "red" }}>
                    _The password must contain at least one lowercase letter.
                  </span>
                  <br />
                  <span style={{ color: "red" }}>
                    _The password must contain at least one number.
                  </span>
                  <br />
                  <span style={{ color: "red" }}>
                    _The password may contain special characters such as ! - @ -
                    # - $.
                  </span>
                </p>
              </>
            ) : handleError == "Limit Exceeded" ? (
              <p style={{ color: "red" }}>Please try again in a few hours</p>
            ) : (
              <></>
            )}
            <div className="relative">
              <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                className="h-13 mt-3"
              >
                Change Password
              </Button>
              <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                className="h-13 mt-3"
                style={{ margin: "1rem" }}
                onClick={sendCode}
              >
                Send Code
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default ChangePassword;

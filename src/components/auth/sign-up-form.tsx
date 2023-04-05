import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { useSignUpMutation, SignUpInputType } from "@framework/auth/use-signup";
import { ImGoogle2, ImFacebook2 } from "react-icons/im";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getRegisterStatus,
  getUserName,
  getUserPassword,
} from "src/redux/registerSlice";
import { getAuthData } from "src/redux/userLoginInfo";

const SignUpForm: React.FC = () => {
  const { t } = useTranslation();
  const { mutate: signUp, isLoading } = useSignUpMutation();
  const { setModalView, openModal, closeModal } = useUI();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputType>();

  function handleSignIn() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }

  const [isPostLoading, setIsPostLoading] = useState(false);
  const [iserror, setIsError] = useState("");
  const [data, setData] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const IsAuthor = useSelector(
    (state: RootState) => state.registerStatus.becomeAuthor
  );

  function onSubmit({ name, username, email, password }: SignUpInputType) {
    setIsPostLoading(true);
    axios
      .post(
        "https://modbzw1g3m.execute-api.eu-central-1.amazonaws.com/sign-up",
        {
          name,
          username,
          email,
          password,
          gender: "Male",
          birthdate: "1997/06/09",
          phone_number: "+901231231212",
          isJuror: "0",
          isAuthor: IsAuthor,
        }
      )
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
        if (response.status == 200) {
          dispatch(getRegisterStatus("Confirm Email"));
          dispatch(getUserName(username));
          dispatch(getUserPassword(password));
          dispatch(getAuthData(response.data));
        }
        if (response.status == 200 && data) {
          closeModal();
        }
      })
      .catch((error) => {
        console.error(error.response.data);
        setIsError(error.response.data.message);
      })
      .finally(() => {
        setIsPostLoading(false);
      });
  }

  return (
    <>
      <div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
        <div className="text-center mb-6 pt-2.5">
          {/* <div onClick={closeModal}>
          <Logo />
        </div> */}
          <p className="font-bold text-[20px]">Sign up to Arabic Templates</p>
          <p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
            Registration takes less than a minute.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center"
          noValidate
        >
          <div className="flex flex-col space-y-4">
            <div style={{ display: "flex", gap: "1rem" }}>
              <Input
                labelKey="forms:label-name"
                type="name"
                variant="solid"
                {...register("name", {
                  required: "forms:name-required",
                })}
                errorKey={errors.name?.message}
              />
              <Input
                labelKey="forms:Username"
                type="username"
                variant="solid"
                {...register("username", {
                  required: "forms:username-required",
                })}
                errorKey={errors.username?.message}
              />
            </div>
            <Input
              labelKey="forms:label-email"
              type="email"
              variant="solid"
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
            <PasswordInput
              labelKey="forms:label-password"
              errorKey={errors.password?.message}
              {...register("password", {
                required: `${t("forms:password-required")}`,
              })}
            />
            {iserror?.includes("User already exists") ? (
              <span style={{ color: "red", fontSize: "15px" }}>
                User Already Exists
              </span>
            ) : (
              ""
            )}
            {iserror?.includes("Password") && (
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
            )}
            <div className="relative">
              <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                className="h-11 md:h-12 w-full mt-2"
              >
                {isPostLoading ? (
                  <div className="loader"></div>
                ) : (
                  t("common:text-register")
                )}
              </Button>
            </div>
          </div>
        </form>
        <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
          <hr className="w-full border-gray-300" />
          <span className="absolute -top-2.5 px-2 bg-white">
            {t("common:text-or")}
          </span>
        </div>

        <Button
          type="submit"
          loading={isLoading}
          disabled={true}
          className="h-11 md:h-12 w-full mt-2.5 bg-facebook hover:bg-facebookHover"
        >
          <ImFacebook2 className="text-sm sm:text-base me-1.5" />
          {t("common:text-login-with-facebook")}
        </Button>
        <Button
          type="submit"
          loading={isLoading}
          disabled={true}
          className="h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover"
        >
          <ImGoogle2 className="text-sm sm:text-base me-1.5" />
          {t("common:text-login-with-google")}
        </Button>
        <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
          {t("common:text-have-account")}{" "}
          <button
            type="button"
            className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
            onClick={handleSignIn}
          >
            {t("common:text-login")}
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;

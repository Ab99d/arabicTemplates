import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useLoginMutation, LoginInputType } from "@framework/auth/use-login";
import { useUI } from "@contexts/ui.context";
import Logo from "@components/ui/logo";
import { ImGoogle2, ImFacebook2 } from "react-icons/im";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAuthData } from "src/redux/userLoginInfo";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const { setModalView, closeModal } = useUI();
  const { mutate: login, isLoading } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  const dispatch = useDispatch();

  // handle form submission
  // function onSubmit({ email, password, remember_me }: LoginInputType) {
  //   // call login mutation with input values
  //   login({
  //     email,
  //     password,
  //     remember_me,
  //   });
  //   console.log(email, password, remember_me, "data");
  // }

  // USING THIS FUNCTION TO POST REQUEST TO THE API/ENDPOINT WHEN PROVIDED
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isError, setIsError] = useState("");

  function onSubmit({ username, email, password }: LoginInputType) {
    setIsPostLoading(true);
    axios
      .post("https://modbzw1g3m.execute-api.eu-central-1.amazonaws.com/login", {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          dispatch(getAuthData(response.data));
        }
        if (response.status == 200 && response.data) {
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

  // handle social login for testing

  // handle modal view change
  function handleModalView(view: string) {
    setModalView(view);
  }

  // handle sign up view change
  function handleSignUp() {
    handleModalView("SIGN_UP_VIEW");
  }

  // handle forget password view change
  function handleForgetPassword() {
    handleModalView("FORGET_PASSWORD");
  }

  return (
    <div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8">
      <div className="text-center mb-6 pt-2.5">
        <p className="font-bold text-[20px]">Welcome Back</p>
        <p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
          Fill your email and password to sign in.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        noValidate
      >
        <div className="flex flex-col space-y-3.5">
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
          <Input
            labelKey="forms:Username"
            type="username"
            variant="solid"
            {...register("username", {
              required: `${t("forms:username-required")}`,
            })}
            errorKey={errors.username?.message}
          />
          <PasswordInput
            labelKey="forms:label-password"
            errorKey={errors.password?.message}
            {...register("password", {
              required: `${t("forms:password-required")}`,
            })}
          />
          <div className="flex items-center justify-center">
            <div className="flex items-center flex-shrink-0">
              <div style={{ color: "red" }}>
                {isError.includes("Incorrect username or password.")
                  ? "Incorrect username or password."
                  : ""}
              </div>
              {/* <label className="switch relative inline-block w-10 cursor-pointer">
                <input
                  id="remember"
                  type="checkbox"
                  className="opacity-0 w-0 h-0"
                  {...register("remember_me")}
                />
                <span className="bg-gray-500 absolute inset-0 transition-all duration-300 ease-in slider round"></span>
              </label>
              <label
                htmlFor="remember"
                className="flex-shrink-0 text-sm text-heading ps-3 cursor-pointer"
              >
                {t("forms:label-remember-me")}
              </label> */}
            </div>
            <div className="flex ms-auto">
              <button
                type="button"
                onClick={handleForgetPassword}
                className="text-start text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
              >
                {t("common:text-forgot-password")}
              </button>
            </div>
          </div>
          <div className="relative">
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="h-11 md:h-12 w-full mt-1.5"
            >
              {isPostLoading ? (
                <div className="loader"></div>
              ) : (
                t("common:text-login")
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
        loading={isLoading}
        disabled={true}
        className="h-11 md:h-12 w-full mt-2.5 bg-facebook hover:bg-facebookHover"
      >
        <ImFacebook2 className="text-sm sm:text-base me-1.5" />
        {t("common:text-login-with-facebook")}
      </Button>
      <Button
        loading={isLoading}
        disabled={true}
        className="h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover"
      >
        <ImGoogle2 className="text-sm sm:text-base me-1.5" />
        {t("common:text-login-with-google")}
      </Button>
      <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
        {t("common:text-no-account")}{" "}
        <button
          type="button"
          className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
          onClick={handleSignUp}
        >
          {t("common:text-register")}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

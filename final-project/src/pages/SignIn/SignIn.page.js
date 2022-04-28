import { useRef } from "react";
import Images from "assets";
import { PATHS } from "configs/routes.config";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { login } from "redux/actions/user.action";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Whoami } from "api/user.api";
import { Formik, Field } from "formik";
import * as Yup from "yup";

function SignIn(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const validationSchema = Yup.object({
    username: Yup.string().required("لطفا نام کاربری را وارد کنید"),
    password: Yup.string().required("لطفا رمز عبور را وارد کنید"),
  });

  return (
    <div
      className={
        "bg-[#05253A] w-screen h-screen flex items-center justify-around"
      }
    >
      <div className="rounded-lg w-96 mr-32 h-4/5 bg-[#0D3451] shadow-2xl">
        <div className={"flex items-center justify-center mt-7"}>
          <img src={Images.Logo} alt="Logo" className={"w-12"} />
          <span className={"text-white text-lg mr-3"}>| فروشگاه سان پلاس</span>
        </div>
        <p className={"text-white text-center my-3"}>سلام، خوش آمدید!</p>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={async (values) => {
            const loginResp = await dispatch(login(values));
            const whoamiResp = await Whoami();
            if (
              whoamiResp.username === values.username &&
              whoamiResp.password === values.password
            ) {
              navigate(PATHS.DASHBOARD);
              toast.success(`کاربر ${whoamiResp.name} خوش آمدید`);
            }
            // } else {
            //   toast.error("نام کاربری یا رمز عبور اشتباه است");
            // }
          }}
          validationSchema={validationSchema}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => {
            return (
              <form
                className={"flex flex-col items-center justify-center"}
                onSubmit={handleSubmit}
              >
                <div>
                  <Field
                    type="text"
                    placeholder={"نام کاربری"}
                    name={"username"}
                    id={"username"}
                    className={
                      "w-80 mt-7 bg-[#05253A] py-3 rounded-md border-none outline-none focus:outline-[#45b9ff] pr-3 text-white"
                    }
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.username && touched.username && (
                    <p className="error mt-3 text-yellow-400">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div>
                  <Field
                    type="password"
                    name={"password"}
                    id={"password"}
                    placeholder={"رمز"}
                    className={
                      "w-80 mt-7 mb-3 bg-[#05253A] text-white py-3 rounded-md border-none outline-none outline-1 focus:outline-[#45b9ff] pr-3"
                    }
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <p className="error text-yellow-400">{errors.password}</p>
                  )}
                </div>
                <span
                  className={
                    "text-white mr-1 text-[12.5px] my-4 text-right overflow-hidden"
                  }
                >
                  با ورود به سان پلاس{" "}
                  <span className={"text-[#45b9ff]"}>شرایط</span> و{" "}
                  <span className={"text-[#45b9ff]"}> قوانین حریم خصوصی</span>{" "}
                  را می پذیرم
                </span>
                <button
                  className={
                    "bg-[#45b9ff] text-white w-80 py-4 rounded-lg shadow-2xl text-center"
                  }
                  type={"submit"}
                  tabIndex="-1"
                >
                  <Link to={PATHS.DASHBOARD} tabIndex="-1">ورود</Link>
                </button>
                <div className={"mt-44"}>
                  <span className={"text-white text-xs"}>حساب ندارید؟</span>
                  <span className={"text-[#45b9ff] text-xs mr-3"}>ثبت نام</span>
                  <span className="text-[#45b9ff] mr-2">|</span>
                  <Link to={PATHS.HOME} tabIndex="-1" className="text-[#45b9ff] text-xs mr-1">
                    {" "}
                    بازگشت به سایت
                  </Link>
                </div>
              </form>
            );
          }}
        </Formik>
        {/* <form
          action="#"
          className={"flex flex-col items-center justify-center"}
          onSubmit={(e) => e.preventDefault()}
          // ref={formRef}
        >
          <input
            type="text"
            placeholder={"نام کاربری"}
            required
            name={"username"}
            id={"username"}
            className={
              "w-80 mt-7 bg-[#05253A] py-3 rounded-md border-none outline-none focus:outline-[#45b9ff] pr-3 text-white"
            }
          />
          <input
            type="password"
            required
            name={"password"}
            id={"password"}
            placeholder={"رمز"}
            className={
              "w-80 mt-7 bg-[#05253A] text-white py-3 rounded-md border-none outline-none outline-1 focus:outline-[#45b9ff] pr-3"
            }
          />
          <span
            className={
              "text-white mr-1 text-[12.5px] my-4 text-right overflow-hidden"
            }
          >
            با ورود به سان پلاس <span className={"text-[#45b9ff]"}>شرایط</span>{" "}
            و <span className={"text-[#45b9ff]"}> قوانین حریم خصوصی</span> را می
            پذیرم
          </span>
          <button
            className={
              "bg-[#45b9ff] text-white w-80 py-4 rounded-lg shadow-2xl text-center"
            }
            type={"submit"}
          >
            <Link to={PATHS.DASHBOARD}>ورود</Link>
          </button>
          <div className={"mt-44"}>
            <span className={"text-white text-xs"}>حساب ندارید؟</span>
            <span className={"text-[#45b9ff] text-xs mr-3"}>ثبت نام</span>
            <span className="text-[#45b9ff] mr-2">|</span>
            <Link to={PATHS.HOME} className="text-[#45b9ff] text-xs mr-1">
              {" "}
              بازگشت به سایت
            </Link>
          </div>
        </form> */}
      </div>
      <div>
        <img src={Images.Logo} alt="Bg" className={"text-white w-[70%]"} />
      </div>
    </div>
  );
}

export { SignIn };

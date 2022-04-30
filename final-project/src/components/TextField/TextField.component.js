import React from "react";
import { ErrorMessage, useField } from "formik";

const TextField = () => {
//   const [field, meta] = useField(props);
  return (
    // <div className="mb-2">
    //   <label htmlFor={field.name}>{label}</label>
    //   <input
    //     className={`border shadow-sm ${
    //       meta.touched && meta.error && "is-invalid"
    //     }`}
    //     {...field}
    //     {...props}
    //     autoComplete="off"
    //   />
    //   <ErrorMessage component="div" name={field.name} className="error" />
    <div>

        <input type="text" className="border w-96 bg-rose-100" />
    </div>
    // </div>
  );
};

export { TextField };

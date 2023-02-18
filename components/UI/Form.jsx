import React from "react";

const Form = ({ submit, children, className }) => {
  return (
    <form className={`${className} flex flex-col gap-4`} onSubmit={submit}>
      {children}
    </form>
  );
};

export const Input = ({
  name,
  label,
  className,
  multiple,
  type,
  error,
  options = {},
  ...rest
}) => {
  return (
    <div className="flex justify-between">
      {label && <label htmlFor={name}>{label}</label>}
      {type === "select" ? (
        <select
          {...rest}
          multiple={multiple}
          name={name}
          className={`${className ? className : ""} ${
            multiple ? "multiple " : ""
          }px-3 border-2 border-black overflow-scroll rounded-3xl `}
        >
          {options.map((opt) => (
            <option id={opt?.ID} key={opt?.ID} value={opt?.Name}>
              {opt?.Name}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          className={`${className ? className : ""} ${
            error ? "border-2	border-error" : ""
          } px-3 rounded-3xl `}
          {...rest}
        />
      )}
    </div>
  );
};

export const Button = ({ className, onClick, ...rest }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        className ? className : ""
      } bg-gradient-to-tr justify-center to-neonblue from-lightblue hover:to-spacecadet`}
      {...rest}
    />
  );
};

Form.Button = React.memo(Button);
Form.Input = React.memo(Input);

export default Form;

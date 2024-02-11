import { InputErrorMessage } from "./input-error-message";
import { useFormContext } from "react-hook-form";

// Default Select Input Example
export const SelectInput = ({ name, errors, label, options, presSelected }) => {
  const { register } = useFormContext();
  return (
    <div className="w-1/2 ml-20">
      <div>
        <label htmlFor={name} className="rounded-md flex flex-col p-4">
          {label}
        </label>
        <select
          {...register(name)}
          defaultValue={presSelected}
          className={`outline-none w-full bg-gray-100 border-gray-300 dark:bg-gray-300 dark:border-gray-300 text-lg text-gray-500 border-2 rounded-md px-4 py-2 duration-200 focus:border-gray-400 ${
            Object.prototype.hasOwnProperty.call(errors, name) &&
            "border-red-500"
          } `}
        >
          {options.map((item, index) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <InputErrorMessage name={name} errors={errors} />
    </div>
  );
};

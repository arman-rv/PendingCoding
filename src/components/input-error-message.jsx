import { ErrorMessage } from "@hookform/error-message";

export const InputErrorMessage = ({ errors, name }) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => <p className="form__error">{message}</p>}
    />
  );
};

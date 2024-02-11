import { useState } from "react";
import qs from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useModal } from "../hooks/use-modal-store";

export const CapacityItems = ({ value, label }) => {
  const { onClose } = useModal();
  const pathname = window.location.pathname;
  const [Checked, setChecked] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const course_name = searchParams.get("course_name");
  const teacher_name = searchParams.get("teacher_name");
  const courseFilterBy = searchParams.get("courseFilterBy");
  const categoryId = searchParams.get("categoryId");

  const onChange = (value) => {
    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];

    if (currentIndex === -1) newChecked.push(value);
    else newChecked.splice(currentIndex, 1);

    setChecked(newChecked);

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          status: newChecked[0],
          categoryId,
          course_name,
          teacher_name,
          courseFilterBy,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    navigate(url);
    setTimeout(() => onClose(), 100);
  };

  const isSelected = searchParams.get("status") === value;

  return (
    <label htmlFor="checkbox" className="flex gap-x-2 text-sm text-gray-500 dark:text-gray-300">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onChange(value)}
        className="accent-primary"
      />
      <span>{label}</span>
    </label>
  );
};

import React from 'react'

const TermParagraph = ({title}) => {
  return (
    <p className="text-[#505050] text-[20px] my-[30px]
    dark:text-gray-200">
        {title}
    </p>
  )
}

export {TermParagraph}
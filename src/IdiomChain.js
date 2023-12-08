import React from "react";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { MdOutlineQuestionMark } from "react-icons/md";

const IdiomChain = ({ length }) => {
  return (
    <>
      {Array(length + 1)
        .fill(<LiaLongArrowAltRightSolid />)
        .reduce((result, item) => (
          <>
            {result}
            {<MdOutlineQuestionMark />}
            {item}
          </>
        ))}
    </>
  );
};

export default IdiomChain;

import React from "react";
import IdiomCard from "./IdiomCard";

import { LiaLongArrowAltDownSolid } from "react-icons/lia";
import { Stack } from "@mui/material";

const Path = ({ path }) => {
  return (
    path.length !== 0 && (
      <Stack alignItems="center" spacing={1}>
        {path
          .map((idiom) => <IdiomCard idiom={idiom} />)
          .reduce((result, item) => (
            <>
              {result}
              {<LiaLongArrowAltDownSolid />}
              {item}
            </>
          ))}
      </Stack>
    )
  );
};

export default Path;

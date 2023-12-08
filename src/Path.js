import React from "react";
import PathCard from "./PathCard";

import { LiaLongArrowAltDownSolid } from "react-icons/lia";
import { Stack } from "@mui/material";

const Path = ({ path }) => {
  return path.length ? (
    <Stack alignItems="center" spacing={1}>
      {path
        .map((idiom) => <PathCard idiom={idiom} />)
        .reduce((result, item) => (
          <>
            {result}
            {<LiaLongArrowAltDownSolid />}
            {item}
          </>
        ))}
    </Stack>
  ) : (
    <></>
  );
};

export default Path;

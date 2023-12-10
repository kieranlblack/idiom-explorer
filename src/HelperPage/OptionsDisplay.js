import React from "react";

import { Stack } from "@mui/material";
import IdiomCard from "../IdiomCard";

const OptionsDisplay = ({ idioms }) => {
  return (
    idioms.length !== 0 && (
      <Stack alignItems="center" spacing={1}>
        {idioms.map((idiom) => (
          <IdiomCard idiom={idiom} />
        ))}
      </Stack>
    )
  );
};

export default OptionsDisplay;

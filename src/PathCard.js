import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { getIdiomInfo } from "./idioms";

const PathCard = ({ idiom }) => {
  const idiomInfo = getIdiomInfo(idiom);
  console.log(idiom);
  console.log(idiomInfo);

  return (
    <>
      <Card variant="outlined" sx={{ textAlign: "left" }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
            {idiomInfo.word}
          </Typography>
          <Typography sx={{ mb: 1.5, textAlign: "center" }} color="text.secondary">
            {idiomInfo.pinyin}
          </Typography>
          <Typography variant="body2">
            解释： {idiomInfo.explanation}
            <br />例句："{idiomInfo.example}"
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default PathCard;

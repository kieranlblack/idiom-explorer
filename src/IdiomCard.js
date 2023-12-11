import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { getIdiomInfo } from "./idioms";
import { Link, createSearchParams } from "react-router-dom";

const IdiomCard = ({ idiom }) => {
  const idiomInfo = getIdiomInfo(idiom);

  return (
    <>
      <Card variant="outlined" sx={{ textAlign: "left" }}>
        <CardContent>
          <div style={{ textAlign: "center" }}>
            <Link
              to={{
                pathname: "/search_graph",
                search: createSearchParams([["idiom", idiomInfo.word]]).toString(),
              }}
            >
              <Button>
                <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
                  {idiomInfo.word}
                </Typography>
              </Button>
            </Link>
          </div>
          <Typography sx={{ textAlign: "center" }} color="text.secondary">
            {idiomInfo.pinyin}
          </Typography>
          <Typography variant="body2">
            解释： {idiomInfo.explanation}
            <br />
            例句：{idiomInfo.example === "无" ? "无" : `"${idiomInfo.example}"`}
            <br />
            对数出现频率: {idiomInfo.frequency !== 0 ? Math.log(idiomInfo.frequency).toFixed(2) : "负无穷"}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default IdiomCard;

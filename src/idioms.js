import idiomData from "./full_idioms.json";

const idiomLookup = Object.fromEntries(idiomData.map((idiom) => [idiom["word"], idiom]));

export const getIdiomInfo = (idiom) => {
  return idiomLookup[idiom];
};

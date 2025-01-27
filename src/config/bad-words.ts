import "dotenv/config.js";

const BadWordConfig = {
  enable: process.env.BAD_WORDS_ENABLE || false,
  list: [
    "anjing",
    "babi",
    "bangsat",
    "kontol",
    "memek",
    "puki",
    "ngentot",
    "goblok",
    "tolol",
    "bego",
    "bejat",
    "bacot",
    "asu",
    "nenen",
    "ngewe",
  ]
};

export default BadWordConfig;

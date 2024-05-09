const axios = require("axios");
//노드에서 html 혹은 xml 문서를 파싱하고 조작하기 위한 것
const cheerio = require("cheerio");

const getNode = async () => {
  try {
    
    const html = await axios.get("https://www.genie.co.kr/chart/top200");
    let ulList = [];
    
    const $ = cheerio.load(html.data);
    
    const bodyList = $("tr.list");
    bodyList.map((i, element) => {
      ulList[i] = {
        rank: i + 1,
        
        title: $(element).find("td.info a.title").text().replace(/\s/g, ""),
        artist: $(element).find("td.info a.artist").text().replace(/\s/g, ""),
      };
    });
    console.log("bodyList : ", ulList);
  } catch (error) {
    console.error(error);
  }
};

getNode();
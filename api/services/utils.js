/***************************************************************************


Services     : utils

**************************************************
Functions
**************************************************
logger,

**************************************************

***************************************************************************/
const fs = require("fs");

module.exports = {
  logger: (req, res) => {
    const log = {
      url: req.baseUrl + req.originalUrl,
      response: { res },
      useragent: req.headers["user-agent"],
      ip: req.ip,
      date: new Date(),
    };

    if (!fs.existsSync("logging")) {
      fs.mkdirSync("logging");
    }
    let json;
    let previousLog;
    if (res.code === 200) {
      previousLog = fs.readFileSync("logging/auditLogger.txt", "utf8");
    } else {
      previousLog = fs.readFileSync("logging/systemLogger.txt", "utf8");
    }
    if (previousLog === "") {
      json = [];
    } else {
      json = JSON.parse(previousLog);
    }
    json.push(log);
    if (res.code === 200) {
      fs.writeFileSync("logging/auditLogger.txt", JSON.stringify(json));
    } else {
      fs.writeFileSync("logging/systemLogger.txt", JSON.stringify(json));
    }
  },
};
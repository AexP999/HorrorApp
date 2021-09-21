// filesystem module
const fs = require("fs");

// endpoint for /resume
app.get("/resume", (req, res) => {
  // create read steam for the pdf
  const rs = fs.createReadStream("./docs/resume.pdf");

  // set response header: Content-Disposition
  res.setHeader("Content-Disposition", "attachment; john-resume.pdf"); /* john-resume.pdf  ?????

  // pipe the read stream to the Response object
  rs.pipe(res);
});

А с express еще проще


// filesystem module
const fs = require("fs");
// const express = require("express")  ???????

// endpoint for /resume
app.get("/resume", (req, res) => {
  // express.js
  res.download("./docs/resume.pdf");
});



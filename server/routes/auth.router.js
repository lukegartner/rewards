const pool = require("../modules/pool");
const express = require("express");
const router = express.Router();

let pcoAccessToken = "";

router.get("/token/:id", (req, res) => {
  const id = req.params.id;
  const options = {
    method: "POST",
    url: "https://dev-h3q8th75zwvdmzlb.us.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    body: '{"client_id":"0k0GHpqhEBojSryeNb7XEmi6Qsz0kjOC","client_secret":"IDZsMtolWE5ZigfikPpQ-lQC_x1fnZD0DlFHXCvuzJv63QcU29zAHEsIFDr-xDhI","audience":"https://dev-h3q8th75zwvdmzlb.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
  };

  fetch("https://dev-h3q8th75zwvdmzlb.us.auth0.com/oauth/token", options)
    .then((response) => response.json())
    .then((tokenResponse) => {
      authApiToken = tokenResponse.access_token;
      // console.log("pcoToken", authApiToken);
      return fetch(
        `https://dev-h3q8th75zwvdmzlb.us.auth0.com/api/v2/users/${id}`,
        // prettier-ignore
        { headers: { "Authorization": `Bearer ${authApiToken}` } }
      );
    })
    .then((response) => response.json())
    .then((authUser) => {
      pcoAccessToken = authUser.identities[0].access_token;
      console.log("pcoAccessToken", pcoAccessToken);
      res.sendStatus(200);
    })
    .catch((error) => console.log(error));
});

router.get("/me", (req, res) => {
  fetch("https://api.planningcenteronline.com/people/v2/me", {
    // prettier-ignore
    headers: { "Authorization":  `Bearer ${pcoAccessToken}` },
  })
    .then((response) => response.json())
    .then((me) => {
      console.log("MEEEEE", me);
      res.send(me);
    })
    .catch((error) => console.log(error));
});

module.exports = router;

// fetch("https://api.planningcenteronline.com/people/v2/me", {
//   method: "GET",
//   headers: { Authorization: `Bearer${tokenResponse.access_token}` },
// })
//   .then((response) => response.json())
//   .then((me) => console.log("MEEEEE", me));

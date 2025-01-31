const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const {getAllUser,createNewUser} = require("../controller/user")

const app = express();
app.options('*', cors()); // Enable preflight for all routes
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

router.get("/" , getAllUser)
router.post("/register",createNewUser)



module.exports = router;
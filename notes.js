const express = require('express')
const app = express()
const port = 3000

//! GET ALL NFT REQUEST HEADER
const nfts = JSON.parse(fs.readFileSync(`${__dirname}/nft-data/data/nft-simple.json`))
console.log(nfts);
app.get('/api/v1/nfts', (req, res) => {
    res.status(200).json({
        status: "success",
        result: nfts.length,
        data: {
            nfts,
        }
    })
});

//! POST METHOD
const createNFT = (req, res) => {
  const newId = nfts[nfts.length - 1].id + 1;
  const newNFTs = Object.assign({ id: newId }, req.body);

  nfts.push(newNFTs);

  fs.writeFile(
    `${__dirname}/nft-data/data/nft-simple.json`,
    JSON.stringify(nfts),
    (err) => {
      res.status(201).json({
        status: "success",
        nft: newNFTs,
      });
    }
  );
};

//! SINGLE NFT ITEMS
app.get("/api/v1/nfts/:id/:w/:e", (req, res) => {
    console.log(req.params);
    res.status(200).json({
        status: "success",
    });
    // console.log(req.params);
})


//! PATCH METHOD
app.patch("/api/v1/nfts/:id", (req, res) => {
    if (req.params.id * 1 > nfts.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID",
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            nft: "Updating nft",
        },
    });
});



//! DELET METHOD
app.delete("/api/v1/nfts/:id", (req, res) => {
    if (req.params.id * 1 > nfts.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID",
        });
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});

const deleteNFT = (req, res) => {
  if (req.params.id * 1 > nfts.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};


//! REFACTORING METHOD
app.route("/api/v1/nfts").get(getAllNfts).post(createNFT);

app
    .route("/api/v1/nfts/:id")
    .get(getSingleNFT)
    .patch(updateNFT)
    .delete(deleteNFT);

//! PART 2 ------------------

const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

//! CUSTOM MIDDLE WARE

app.use((req, res, next) => {
  console.log("Hey i am from middleware function 👋");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


const nfts = JSON.parse(
  fs.readFileSync(`${__dirname}/nft-data/data/nft-simple.json`)
);

const getAllNfts = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    results: nfts.length,
    data: {
      nfts,
    },
  });
};


//!------USERS
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

const getSingleUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};


const nftsRouter = express.Router();
const usersRouter = express.Router();

//! ROUTER NFTs
nftsRouter.route("/").get(getAllNfts).post(createNFT);

nftsRouter.route("/:id").get(getSingleNFT).patch(updateNFT).delete(deleteNFT);


//! ROUTERS USERS
usersRouter.route("/").get(getAllUsers).post(createUser);

usersRouter
  .route("/:id")
  .get(getSingleUser)
  .patch(updateUser)
  .delete(deleteUser);

app.use("/api/v1/nfts", nftsRouter);
app.use("/api/v1/users", usersRouter);


//! ///PART 4 -----------------------

const express = require("express");
const morgan = require("morgan");

const nftsRouter = require("./routes/nftsRoute");
const usersRouter = require("./routes/usersRoute");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development ") {
  app.use(morgan("dev"));
}
app.use(morgan("dev"));
//SERVING TEMPLATE DEMO
app.use(express.static(`${__dirname}/nft-data/img`));

//CUSTOM MIDDLE WARE
app.use((req, res, next) => {
  console.log("Hey i am from middleware function 👋");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/nfts", nftsRouter);
app.use("/api/v1/users", usersRouter);

module.exports = app;



























app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const express = require ("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user");
const path = require("path");
// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node MongoDB API",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:9000",
            },
        ],
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`],
}; 
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use('/api', userRoutes);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)))

// routes
app.get("/", (req, res)=> {
    res.send("Welcome to my appi");
});

// mongodb connection
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("Connectd to MongoDB Atlas"))
.catch((error) => console.error(error));


app.listen(port, () => console.log('server listening on port', port));



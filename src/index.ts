import express from "express"

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())

app.get("/", (req, res) => {
    return res.send({
        message: "Hello world"
    })
})

app.listen(PORT, () => {
    console.log("App is listening on port " + PORT)
})

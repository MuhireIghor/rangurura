import app from "./app";
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`App launched successfully on port ${PORT}`)
});

export default app;
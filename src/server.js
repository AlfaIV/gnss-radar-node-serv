const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Test!");
});

// Пример маршрута для POST-запроса
app.post("/data", (req, res) => {
  const receivedData = req.body;
  res.json({
    message: "Data received successfully!",
    data: receivedData,
  });
});

// Пример маршрута для PUT-запроса
app.put("/data/:id", (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  res.json({
    message: `Data with ID ${id} updated successfully!`,
    data: updatedData,
  });
});

// Пример маршрута для DELETE-запроса
app.delete("/data/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    message: `Data with ID ${id} deleted successfully!`,
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен по адресу http://localhost:${port}`);
});

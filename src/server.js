const express = require("express");
const ftp = require('basic-ftp');
const { Readable } = require("stream");

const app = express();
const port = 3000;

// Middleware для настройки CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Разрешаем только этот источник
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

const FTP_user={
  host: "ftp",  
  user: "user",    
  password: "password",
  secure: false             
}


async function uploadFile(name, file) {
    console.log("Загрузка файла", name, file);
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access(FTP_user);
        const stream = new Readable();
        stream.push(JSON.stringify(file, null, 2)); // Преобразуем объект в строку JSON
        stream.push(null); // Завершаем поток

        // Загружаем поток на FTP-сервер
        await client.uploadFrom(stream, name);
        console.log("Файл успешно загружен!");
    } catch (error) {
        console.error("Ошибка при загрузке файла:", error);
    } finally {
        client.close();
    }
}

app.get("/", (req, res) => {
  res.send(`Test!'`);
});

// Пример маршрута для POST-запроса
app.post("/data", (req, res) => {
  const receivedData = req.body;
  res.json({
    message: "Data received successfully!",
    data: receivedData,
  });
});

app.post("/sendTask/", (req, res) => {
  const receivedData = req.body;
  
  console.log(receivedData);
  uploadFile(receivedData.id, receivedData) // Передаем имя файла и данные
  .then(() => {
      res.json({
          message: "Data received successfully!",
          data: receivedData,
          status: 200,
      });
  })
  .catch(error => {
      res.status(500).json({
          message: "Ошибка при загрузке файла",
          error: error.message,
      });
  });
});

// // Пример маршрута для PUT-запроса
// app.put("/data/:id", (req, res) => {
//   const { id } = req.params;
//   const updatedData = req.body;
//   res.json({
//     message: `Data with ID ${id} updated successfully!`,
//     data: updatedData,
//   });
// });

// // Пример маршрута для DELETE-запроса
// app.delete("/data/:id", (req, res) => {
//   const { id } = req.params;
//   res.json({
//     message: `Data with ID ${id} deleted successfully!`,
//   });
// });

app.listen(port, () => {
  console.log(`Сервер запущен по адресу http://localhost:${port}`);
});

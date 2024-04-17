import { Client } from "ssh2";
import { HOST, PORT_SSH, USER, PATH_SSH, PASSPHRASE } from "../config.js";
import { readFileSync } from "fs";

export const createVpn = (req, res) => {
  const username = req.body;

  const conn = new Client();
  const sshConfig = {
    host: HOST,
    port: PORT_SSH,
    username: USER,
    privateKey: readFileSync(PATH_SSH),
  };

  conn
    .on("ready", () => {
      console.log("SSH Client :: ready");
      conn.exec(
        `sudo sh /home/penlab/generate_client.sh ${username}`,
        (err, stream) => {
          if (err) {
            console.error(`Error al ejecutar el comando: ${err.message}`);
            conn.end();
            return res
              .status(500)
              .send("Error al ejecutar el comando en el servidor remoto");
          }

          let dataStream = "";
          stream
            .on("data", (data) => {
              dataStream += data.toString();
            })
            .stderr.on("data", (data) => {
              console.error("STDERR: " + data);
            })
            .on("close", () => {
              console.log("Stream :: close");
              conn.end();
              res.send("Comando ejecutado exitosamente: " + dataStream);
            });
        }
      );
    })
    .on("error", (err) => {
      console.error("SSH Connection Error: ", err);
      res.status(500).send("Error de conexión SSH");
    });

  conn.connect(sshConfig);
};

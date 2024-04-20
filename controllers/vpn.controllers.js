import { exec } from "child_process";
import { fileURLToPath } from "url";
import { COMMAND, PASSWORD } from "../config.js";
import path from "path";

export const createVpn = (req, res) => {
  const { username } = req.body;

  const command = `expect ${COMMAND} ${username} ${PASSWORD}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res
        .status(500)
        .send(`Error al ejecutar el script: ${error.message}`);
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return res.status(500).send(`Error en el script: ${stderr}`);
    }
    res.send(`Script ejecutado correctamente. ${stdout}`);
  });
};

export const download_vpn = (req, res) => {
  const { username } = req.body;
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const fileOvpn = path.join(
    __dirname,
    `../../../../etc/openvpn/client/files/${username}.ovpn`
  );
  res.download(fileOvpn, `${username}.ovpn`, (err) => {
    if (err) {
      console.log(`Error downloading file: ${err}`);
      return res.status(404).send("File not found");
    }
  });
};

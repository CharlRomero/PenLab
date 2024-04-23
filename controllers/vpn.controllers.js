import { exec } from "child_process";
import { fileURLToPath } from "url";
import { COMMAND, TOKEN } from "../config.js";
import path from "path";

export const createVpn = (req, res) => {
  const { username, password } = req.body;

  const command = `bash ${COMMAND} ${username} ${password}`;

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
    res.status(200).json({ message: "Created VPN" });
  });
};

export const download_vpn = (req, res) => {
  const { username } = req.params;
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const sanitizedUsername = path.basename(username);
  const fileOvpn = path.join(
    __dirname,
    `../../../../etc/openvpn/client/files/${sanitizedUsername}.tar`
  );
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${encodeURIComponent(`${username}.ovpn`)}"`
  );
  res.setHeader("Content-Type", "applications/octet-stream");
  res.sendFile(fileOvpn, `${username}.ovpn`, (err) => {
    if (err) {
      console.log(`Error downloading file: ${err}`);
      return res.status(404).send("File not found");
    }
  });
};

export const vmDeploy = async (req, res) => {
  const URL = `https://api.github.com/repos/CharlRomero/PenLab/actions/workflows/vm-deploy.yml/dispatches`;
  const body = {
    ref: "main",
  };

  try {
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      res.send("Works!");
    } else {
      const errorMsg = await response.text();
      res.status(500).send(`Failed deploy: ${errorMsg}`);
    }
  } catch (error) {
    res.status(500).send("Error deploy");
  }
};

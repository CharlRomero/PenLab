import { exec } from "child_process";

export const createVpn = (req, res) => {
  const { username } = req.body;

  const command = `sh /home/penlab/generate_client.sh ${username}`;

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

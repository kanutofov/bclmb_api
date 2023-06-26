import { ORIGIN_URL } from "../config/preconfigs.js";
import { listaIPs } from "../helpers/utils.js";

const verifies = (req, res, next) => {
  console.log(req.ip.split(':').pop(), ' -> Intentando acceder...');
  console.log(ORIGIN_URL);

  // Validate from blacklist
  async function userExists() {

    try {
      const bans = await listaIPs();

      if (bans && bans.includes(req.ip.split(':').pop())) {
        return true;
      }

      return false;
    } catch (error) {
        console.error('Error al verificar la existencia del usuario:', error);
        return false;
    }
  };

  userExists()
    .then(exist => {
      if (exist) {
        // Redirect to real web
        console.log(req.ip.split(':').pop(), '-> IP en lista negra.');
      } else {

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection');

        if (req.method === 'OPTIONS') {
          res.sendStatus(200);
        } else {
          console.log(req.ip.split(':').pop(), '-> Acceso autorizado.');
          next();
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export default verifies
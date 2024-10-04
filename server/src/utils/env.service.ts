import fs from 'fs';

export default function isEnvConfigurate(): void {
  const envExist = fs.existsSync('./.env');
  if (!envExist) {
    throw new Error('Le fichier .env est manquant.');
  }
  const envVar = checkEnvVars();
  if (!envVar) {
    throw new Error(
      `Une ou plusieurs variables d'environnement sont manquantes. Se référer au fichier .env.example pour plus d'informations.`,
    );
  }
}

function checkEnvVars(): boolean {
  let ind: number = 0;
  const envVars = [
    'DOMAINS_CORS',
    'MYSQL_HOST',
    'MYSQL_USER',
    'MYSQL_PASSWORD',
    'MYSQL_DATABASE',
    'MYSQL_ROOT_PASSWORD',
    'JWT_SECRET_TOKEN',
    'JWT_SECRET_MAIL',
    'MAILER_EMAIL',
    'MAILER_PASS',
    'MAILER_HOST',
    'VALIDATE_ROUTE',
  ];

  envVars.forEach((envVar) => {
    if (process.env[envVar]) ind++;
    else return false;
  });
  if (ind === envVars.length) return true;
  return false;
}

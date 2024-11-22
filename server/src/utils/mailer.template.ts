export const sendToken = (token: string): string => {
  const ROUTE = process.env.VALIDATE_ROUTE;
  return `
  <p>Bonjour et bienvenue sur Matcha,</p>
  </br>
  <p>Pour valider adresse email, veuillez cliquer sur le lien ci-dessous:</p>
  <p><a href="${ROUTE}?token=${token}">Mettre à jour</a></p>
  </br>
  <p>Si vous n'avez pas créé de compte sur Matcha, veuillez ignorer cet email.</p>
  </br>
  <p>L'équipe Matcha</p>
  `;
};

export const sendCode = (code: string): string => {
  return `
  <p>Bonjour,</p>
  </br>
  <p>Afin de modifier votre mot passe, renseigner les chiffres ci-dessous:</p>
  <p style="font-size: 25px; text-align: center;" >${code}</p>
  </br>
  <p>Si vous n'avez pas demandé le changement de vos données personnelles, veuillez ignorer cet email.</p>
  </br>
  <p>L'équipe Matcha</p>
  `;
};

export const sendContact = (
  userName: string,
  userEmail: string,
  subject: string,
  text: string,
): string => {
  return `
  </br>
  <p>Nom : ${userName}</p>
  <p>Email : ${userEmail}</p>
  </br>
  <p>Objet : ${subject}</p>
  <p>Message : </p>
  <p>${text}</p>
  </br>
  <p>Date : ${new Date()}</p>
  </br>
  `;
};

export const sendAdmin = (
  userId: number,
  text: string,
): string => {
  return `
  </br>
  <p>Identifiant : ${userId}</p>
  </br>
  <p>Message : </p>
  <p>${text}</p>
  </br>
  <p>Date : ${new Date()}</p>
  </br>
  `;
};

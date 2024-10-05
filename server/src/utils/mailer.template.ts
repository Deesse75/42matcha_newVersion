export const validateSignupEmail = (token: string) => {
  const ROUTE = process.env.VALIDATE_ROUTE;
  return `
  <p>Bonjour et bienvenue sur Matcha,</p>
  </br>
  <p>Pour valider votre compte, veuillez cliquer sur le lien ci-dessous:</p>
  <p><a href="${ROUTE}?token=${token}">Valider mon compte</a></p>
  </br>
  <p>Si vous n'avez pas créé de compte sur Matcha, veuillez ignorer cet email.</p>
  </br>
  <p>L'équipe Matcha</p>
  `;
};

export const sendPasswordCode = (code: string) => {
  const codeText = `${code[0]} ${code[1]} ${code[2]} ${code[3]} ${code[4]} ${code[5]}`;
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
  
  // export const ValidateUpdateEmail = (num: number) => {
  //   const numberToString = num.toString();
  //   const code = `${numberToString[0]}  ${numberToString[1]}  ${numberToString[2]}  ${numberToString[3]}  ${numberToString[4]}  ${numberToString[5]}`;
  //   return `
  //   <p>Bonjour,</p>
  //   </br>
  //   <p>Afin de modifier votre adresse email, renseigner les chiffres ci-dessous:</p>
  //   <p style="font-size: 25px; text-align: center;" >${code}</p>
  //   </br>
  //   <p>Si vous n'avez pas demandé le changement de vos données personnelles, veuillez ignorer cet email.</p>
  //   </br>
  //   <p>L'équipe Matcha</p>
  //   `;
  // };

export default function generateFunction(): string {
  const passLengthRandom = [12, 14, 16];
  const letters = [
    'gQJukpEwAaChZyIbVHtUjxWnBRmGqNfOvczDKFLPlTsSXdoYMrie',
    'mOThfCzUyEiBbqrANpdvVkwWuRjxQgsKFZGclIXeaDHSMonYPJLt',
    'LxUmHJTIwPnrjBzWCGQeZvAlRtOXgpyYVkFiMuDKchSEbofsadqN',
  ];
  const number = ['0123456789', '4823079615', '3149026578'];
  const special = '!?@';
  let nbNumber = 0;
  let nbSpecial = 0;
  let newLetter = '';
  let lastLetter = '/';
  let password = '';
  const passLength = passLengthRandom[Math.floor(Math.random() * 3)];
  for (let i = 0; i < passLength; i++) {
    const type = Math.floor(Math.random() * 3);
    if (type === 0) {
      if (
        password.length > passLength - 3 &&
        (nbNumber === 0 || nbSpecial === 0)
      ) {
        i--;
      } else {
        const num1 = Math.floor(Math.random() * 3);
        newLetter += letters[num1][Math.floor(Math.random() * 52)];
      }
    } else if (type === 1) {
      if (nbNumber < 3) {
        const num2 = Math.floor(Math.random() * 3);
        newLetter += number[num2][Math.floor(Math.random() * number.length)];
        nbNumber++;
      }
    } else {
      if (nbSpecial === 0) {
        newLetter += special[Math.floor(Math.random() * special.length)];
        nbSpecial++;
      }
    }
    if (newLetter === lastLetter || !newLetter) {
      i--;
      newLetter = '';
    } else {
      password += newLetter;
      lastLetter = newLetter;
      newLetter = '';
    }
  }
  return password;
}

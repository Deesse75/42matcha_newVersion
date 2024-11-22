import { FC } from 'react';

type Props = {
  type: string;
};

const InputRules: FC<Props> = ({ type }) => {
  return (
    <>
      <div className='input_rules_container'>
        {(type === 'firstname' || type === 'lastname') && (
          <>
            <div>Le nom et le prénom doivent :</div>
            <div>&#11824; &#8200; commencer par une lettre</div>
            <div>&#11824; &#8200; Contenir entre 3 et 30 caractères inclus</div>
            <div>&#11824; &#8200; Lettres alphabétique, espace</div>
            <div>&#11824; &#8200; apostrophe ou trait d'union</div>
          </>
        )}
        {type === 'username' && (
          <>
            <div>Le nom d'utilisateur doit :</div>
            <div>&#11824; &#8200; commencer par une lettre</div>
            <div>&#11824; &#8200; Contenir entre 3 et 30 caractères inclus</div>
            <div>&#11824; &#8200; Lettres alphabétique, espace</div>
            <div>&#11824; &#8200; underscore, point, arobase</div>
          </>
        )}
        {type === 'email' && (
          <>
            <div>Adresse email :</div>
            <div>
              &#11824; &#8200; Les domaines de 1er niveau acceptés sont :
            </div>
            <div>&#11824; &#8200; .fr ou .com</div>
          </>
        )}
        {type === 'password' && (
          <>
            <div>Le mot de passe doit :</div>
            <div>&#11824; &#8200; commencer par une lettre</div>
            <div>&#11824; &#8200; Contenir entre 8 et 30 caractères inclus</div>
            <div>
              &#11824; &#8200; Au moins 1 majuscule, 1 miniscule, 1 chiffre
            </div>
            <div>
              &#11824; &#8200; Au moins un des caractères spéciaux suivants
            </div>
            <div>
              &#11824; &#8200; point d'intérogation, point d'exclamation,
              arobase
            </div>
          </>
        )}
        {type === 'birthdate' && (
          <>
            <div>La date de naissance :</div>
            <div>
              &#11824; &#8200; Vous devez avoir entre 18 et 120 ans inclus
            </div>
          </>
        )}
        {type === 'tag' && (
          <>
            <div>Centre d'intêret 'tag' :</div>
            <div>&#11824; &#8200; Contenir entre 1 et 30 caractères inclus</div>
          </>
        )}
      </div>
    </>
  );
};

export default InputRules;

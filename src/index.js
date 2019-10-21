import 'dotenv/config';

const userCredentials = { firstname: 'Caba' };
const userDetails = { nationality: 'Serbian' };

const user = {
  ...userCredentials,
  ...userDetails,
};

console.log(user);

console.log(process.env.SOME_ENV_VARIABLE);

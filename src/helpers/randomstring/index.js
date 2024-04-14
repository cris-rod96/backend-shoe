import randomstring from "randomstring";

const generateCode = () => {
  return randomstring.generate({
    length: 10,
    charset: ["numeric"],
  });
};

export default { generateCode };

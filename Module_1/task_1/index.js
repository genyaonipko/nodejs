let name = "";

module.exports = {
  setName: str => (name = str),
  sayHello: () => console.log(`Hello, I'm ${name}`)
};

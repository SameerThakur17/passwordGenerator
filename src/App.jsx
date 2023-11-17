import { useEffect, useRef } from "react";
import { useCallback, useState } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charactersAllowed, setCharacterAllowed] = useState(false);
  const [capitalsAllowed, setCapitalsAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const copyref = useRef();

  const copyPassword = () => {
    copyref.current?.select();
    window.navigator.clipboard.writeText(password);
  }
  const generatePassword = useCallback(() => {
    let pass = "";
    let inventory = "abcdefghijklmnopqrstuvwxyz";

    if (capitalsAllowed) inventory += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbersAllowed) inventory += "0123456789";
    if (charactersAllowed) inventory += "!@#$%&";

    for (let i = 0; i < length; i++) {
      const randNumber = Math.floor(Math.random() * inventory.length);
      pass += inventory[randNumber];
    }
    setPassword(pass);
  }, [numbersAllowed, charactersAllowed, setPassword, capitalsAllowed, length]);

  useEffect(() => {
    generatePassword();
  }, [length, charactersAllowed, capitalsAllowed, numbersAllowed, generatePassword]);
  return (
    <div
      className="flex w-screen h-screen justify-center bg-cover items-center overflow-hidden bg-gray-700"
      style={{ backgroundImage: "url('bg.jpg')" }}
    >
      <div className=" flex backdrop-blur-md  h-screen w-[700px] text-white justify-center space-y-16 items-center flex-col shadow-lg shadow-green-500 rounded-xl font-roboto">
        <div>
          <h1 className="text-4xl font-semibold">Password Generator</h1>
        </div>
        <div className="flex flex-col space-y-6 w-full text-2xl ">
          <div className="flex space-x-4 mx-6">
            <input
              className="flex flex-grow p-3 rounded-xl font-semibold text-black"
              type="text"
              value={password}
              ref={copyref}
            />
            <button onClick={copyPassword} className="w-fit p-2 rounded-xl border-2 border-green-500 hover:shadow-lg hover:shadow-green-500">
              Copy
            </button>
          </div>
          <div className="flex space-y-4 flex-col justify-center items-center text-2xl font-semibold">
            <div>
              <input
                className="accent-green-500"
                type="range"
                min={6}
                max={100}
                onChange={(e) => setlength(e.target.value)}
                value={length}
              />
            </div>
            <div>
              <label htmlFor="">Password Length : {length}</label>
            </div>
            <div className="flex space-x-2 ">
              <input
                className="accent-green-500 w-4  "
                type="checkbox"
                onChange={() => setCapitalsAllowed((prev) => !prev)}
              />
              <label htmlFor="">Capital Letters</label>
            </div>
            <div className="flex space-x-2 ">
              <input
                className="accent-green-500 w-4  "
                type="checkbox"
                onChange={() => setNumbersAllowed((prev) => !prev)}
              />
              <label htmlFor="">Numbers</label>
            </div>

            <div className="flex space-x-2 ">
              <input
                className="accent-green-500 w-4"
                type="checkbox"
                onChange={() => setCharacterAllowed((prev) => !prev)}
              />
              <label htmlFor="">Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

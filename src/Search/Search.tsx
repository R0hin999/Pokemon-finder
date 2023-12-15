import "./search.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Pokemon {
  name: string;
  url: string;
}

interface tempPokemon {
  name: string;
  url: string;
}

export default function Search() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [tempPokemon, setTempPokemon] = useState<tempPokemon[]>([]);
  const [notFound, setnotFound] = useState(false);

  const searchHandler = (e: any) => {
    if (e.target.value === "") {
      setPokemon(tempPokemon);
    } else {
      let val = e.target.value;
      let filter = tempPokemon.filter((p) =>
        p.name.startsWith(val.toLowerCase())
      );
      setPokemon(filter);
      if (filter.length === 0) {
        setnotFound(true);
      } else {
        setnotFound(false);
      }
    }
  };

  useEffect(() => {
    const get = async () => {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/?limit=1000`)
        .then((res) => {
          setPokemon(res.data.results);
          setTempPokemon(res.data.results);
        });
    };

    get();
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="h-screen w-screen text-center flex flex-col justify-center items-center"
    >
      <div className="h-1/6 w-full ">
        <h1 className="text-6xl pt-5 typo lg:text-9xl  font-bold">
          Pokem
          <span className="w-1 ">
            <motion.img
              whileHover={{ scale: 1.2 }}
              className="inline w-1/12 md:w-24  "
              src="../../pokeball_shake.gif"
            ></motion.img>
          </span>
          n Finder
        </h1>
      </div>

      <div className="w-full h-1/6 flex flex-col justify-center items-center">
        <input
          className="h-2/6 w-96 md:w-1/4 rounded-3xl outline outline-2 mb-10 tracking-widest indent-6 text-lg "
          type="search"
          placeholder="Find your pokemon..."
          onChange={searchHandler}
        ></input>
        {/* <h1 className="text-6xl typo font-bold">Pokemons</h1> */}
      </div>
      <div className="w-3/6 gap-16 md:w-2/6 h-3/4 container m-auto grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 md:gap-28">
        {notFound ? (
          <p
            className="text-6xl w-screen  h-2/4 inline-flex 
          "
          >
            Not Found
          </p>
        ) : (
          pokemon.map((i) => (
            <Link to={`/pokemon/${i.name}`}>
              <div className="h-12 w-72 names  md:w-60 m-auto bg-slate-100 rounded-3xl">
                <h1 className="h-full w-full outline outline-2 rounded-3xl text-2xl p-1 text-center  font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                  {i.name.toUpperCase()}
                </h1>
              </div>
            </Link>
          ))
        )}
      </div>
    </motion.div>
  );
}

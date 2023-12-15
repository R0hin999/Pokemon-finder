import "./show.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface Stat {
  stat: {
    name: string;
  };
  base_stat: string;
}

export default function Show() {
  const pokemon = useParams().name;
  const [pokeImg, setPokeImg] = useState("");
  const [pokeWeight, setPokeWeight] = useState(0);
  const [pokeHeight, setPokeHeight] = useState(0);
  const [stats, setStats] = useState<Stat[]>([]);
  const [renderComp, setRenderComp] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRenderComp(true);
    }, 2050);
  }, []);

  useEffect(() => {
    const getPokemon = async () => {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((res) => {
          setPokeImg(res.data.sprites.other.dream_world.front_default);
          setPokeHeight(res.data.height);
          setPokeWeight(res.data.weight);
          setStats(res.data.stats);
        });
    };
    getPokemon();
  }, [pokemon]);

  console.log(stats);

  return (
    <>
      {renderComp ? (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 1, transition: { duration: 0.7, delay: 2 } }}
          className=" w-screen h-screen flex p-10 items-center flex-col"
        >
          <div>
            <h1 className="w-full text-6xl typo font-bold mb-10">
              {pokemon?.toUpperCase()}
            </h1>
          </div>
          <img
            className="w-2/6 h-2/6 md:h-1/3 md:w-1/5 mb-12  object-contain overflow-hidden poke"
            src={pokeImg ? pokeImg : "Not Available"}
            alt={pokemon}
          ></img>
          <div className=" w-full justify-around flex mb-16 items-center md:w-1/3">
            <h1 className=" border  border-solid border-black text-2xl p-3 md:text-3xl  bg-white rounded-xl font-semibold">
              Height: {pokeHeight}
            </h1>
            <h1 className=" border border-solid border-black text-2xl p-3 md:text-3xl font-semibold bg-white rounded-xl ">
              Weight: {pokeWeight}
            </h1>
          </div>

          {stats.map((i) => (
            <div className="w-screen  flex justify-center items text-center">
              <div className="w-3/4 md:w-6/12 text-center  flex justify-center  ">
                <div className="flex w-1/3  justify-start items-start">
                  <span className=" capitalize   bg-white text-xl border  border-solid border-black md:text-2xl font-semibold md:p-2 rounded-xl ">
                    {i.stat.name}{" "}
                  </span>
                </div>

                <div className="w-1/2 h-7 mb-12  rounded-full border  border-solid border-black bg-slate-50">
                  <div
                    className="bg-blue-600 h-7 text-xl font-medium text-white text-center p-0.5 leading-none rounded-full"
                    style={{ width: `${i.base_stat}%` }}
                  >
                    {" "}
                    {i.base_stat}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      ) : (
        <>
          <div className="flex justify-center items-center mt-96">
            <img src="../../pokeAnimation.gif"></img>
          </div>
        </>
      )}
    </>
  );
}

import style from "./Home.module.css";
import PortalInicio from "../Asserts/PortalInicio.png";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import RandomCard from "../RandomCard/RandomCard";
import { getRandomCharacters, clearRandomCharacters } from "../../redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const characters = useSelector((state) => state.randomCharacters);
  const loadingGetRandomCharacters = useSelector((state) => state.loadingGetRandomCharacters);
  const errorGetRandomCharacters = useSelector((state) => state.errorGetRandomCharacters);
    
  const dispatch = useDispatch();
      
  useEffect(() => {
    dispatch(getRandomCharacters());

    return () => dispatch(clearRandomCharacters());
  }, [dispatch]);

  return(
    <div className={style.contenedorHome} >
      <h1 className={style.tituloHome} >¡Welcome to the Multiverse of  <b className={style.rickHome} > Rick </b> and <b className={style.mortyHome}>Morty</b>!</h1>

      <img className={style.rickymorty} src={require ("../Asserts/rickymortyHome.png")} alt="" />

      <div className={style.contenedorDescription} >
        <h3>A wildly hilarious animated series that follows the outlandish adventures of a brilliant but troubled scientist and his easily influenced grandson across different dimensions and planets.
        </h3>
      </div>

      <NavLink to={'/characters'} className={style.contenedorboton}>   
        <button
          className={style.botonPage}
          onClick={{}}
        >
        Explore
        </button>
      </NavLink>

      {characters && characters.length > 0 && !loadingGetRandomCharacters &&      
        !errorGetRandomCharacters &&
        <h2 className={style.randomCharacters} >Random Characters</h2>
      }

      <div className={style.contenedoRandom}>
        {characters && characters.map((character) => (
          <RandomCard
            key={character.id}
            id={character.id}
            name={character.name}
            status={character.status}
            image={character.image}
            origin={character.origin && character.origin.name}
            location={character.location && character.location.name}
          />
        ))}
      </div>

      <div className={style.registerorsign}>Register or log in to our <b>Rick</b> and <b className={style.morty}>Morty</b> character page to see more! <h3> Join our community now!</h3></div>

      <div className={style.cartas}>
        <div className={style.contenedorOpcion}>
          <h3 className={style.opcion}>Log In</h3>
          <NavLink to="/login">
            <img className={style.portal} src={PortalInicio} alt={PortalInicio} />
          </NavLink>
        </div>
        <div className={style.contenedorOpcion}>
          <h3 className={style.opcion}>Register</h3>
            <NavLink to="/register">
              <img className={style.portal} src={PortalInicio} alt={PortalInicio} />
            </NavLink>
        </div>
      </div>
            
    </div>
  );
};

export default Home;
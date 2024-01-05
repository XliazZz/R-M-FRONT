import style from "./Card.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { postFavorite, removeFav, removeCard, getFavorite, clearFavoriteStatus } from "../../redux/Actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

function Card({ id, name, status, species, gender, origin, image, location }) {
  const token = localStorage.getItem("token");

  const favs = useSelector((state) => state.myFavorites);

  const errorDeleteFavorite = useSelector((state) => state.errorDeleteFavorite);
  const successDeleteFavorite = useSelector((state) => state.successDeleteFavorite);
  
  const errorPostFavorite = useSelector((state) => state.errorPostFavorite);
  const successPostFavorite = useSelector((state) => state.successPostFavorite);

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClose = () => {
    dispatch(removeCard(id));
  };
  
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    if (token) {
      if (isFav) {
        setIsFav(false);
        dispatch(removeFav(id));
    } else {
        setIsFav(true);
        dispatch(postFavorite({ id, name, status, species, gender, origin, image, location }));
    };
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must be logged in to add a favorite',
        confirmButtonText: 'Login',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    }
  };
  
  useEffect(() => {
    if (token) {
      dispatch(getFavorite());
    } else {
      setIsFav(false);
    }
  }, [dispatch, token]);


  useEffect(() => {
    if (token && Array.isArray(favs)) {
      favs.forEach((fav) => {
        if (fav && fav.id === id) {
          setIsFav(true);
        }
      });
    } else {
      setIsFav(false);
    }
  }, [favs, id, token]);
  
  useEffect(() => {
    if (errorPostFavorite) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorPostFavorite,
      });
      dispatch(clearFavoriteStatus());
    } else if (successPostFavorite) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your favorite has been added',
        customClass: {
          title: 'text-success',
        },
      });
      dispatch(clearFavoriteStatus());
    }

    if (errorDeleteFavorite) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      dispatch(clearFavoriteStatus());
    } else if (successDeleteFavorite) {
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Your favorite has been deleted',
        color: 'red',
      });
      dispatch(clearFavoriteStatus());
    }
  }, [errorPostFavorite, successPostFavorite, errorDeleteFavorite, successDeleteFavorite, dispatch]);

  const [isHovering, setIsHovering] = useState(false);

  function handleMouseEnter() {
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setIsHovering(false);
  }

  const calculateStatus = (status) => {
    if (status === "Alive") {
      return  'green';
    } else if (status === "Dead") {
      return  "red";
    } else if (status === "unknown") {
      return  "gray";
    }
  }

  const calculateFontSize = (name) => {
    if (!name) {
      return "20px";
    } else if (name.length < 10) {
      return "25px";
    } else if (name.length < 15) {
      return "20px";
    } else if (name.length < 20) {
      return "21px";
    } else if (name.length < 25) {
      return "17px";
    } else if (name.length < 30) {
      return "15px";
    } else if (name.length < 35) {
      return "11px";
    } 
  };
      
  return (
    <div className={style.card} >

      <button
        onClick={handleFavorite}
        className={style["heart-btn"]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span
        className={`${style["heart-icon"]} ${isHovering ? style["beat"] : ""} corazon`}
        >{isFav ? "💚" : "🤍"}</span>
      </button>

      {pathname === "/*" && ( 
        <button className={style.button} onClick={onClose}>
            X
        </button>
      )}

      <NavLink to={`/detail/${id}`}>
        <img className={style.imagen} src={image} alt="" />
      </NavLink>

      <div className={style.divNombre}>
        <h2 style={{ fontSize: calculateFontSize(name) }} className={style.name}>{name}</h2>
      </div>

      <div className={style["status-container"]} >
        <div
          className={style["status-circle"]}
          style={{ backgroundColor: calculateStatus(status) }}
          data-status={status}
        >
        </div>
      </div>

    </div>
  );
}

export default Card;
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { apiURL } from "../util/apiURL";

const ItemDetails = () => {
  const [item, setItem] = useState({});
  const API = apiURL();
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);

  //   let res = await axios.get(`${API}/items/${id}/photos`);
  const fetchPhoto = async () => {
    try {
      let res = await axios.get(`${API}/items/${id}/photos`);
      setPhotos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        let res = await axios.get(`${API}/items/${id}`);
        debugger;
        setItem(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPhoto();
    fetchItem();
  }, []);

  const {
    title,
    description,
    location,
    created_at,
    status,
    is_biodegradable,
    expiration,
  } = item;
  return (
    <div>
      <h1>Item: {title}</h1>
      {photos.map((photo) => {
        return <img src={photo.photo_url} alt={title} />;
      })}
      <p> Description: {description}</p>
      <p>Location: {location}</p>
      <p>Created At: {created_at}</p>
      <p>Status: {status}</p>
      <p>
        Is Biodegradable:{" "}
        {is_biodegradable ? <span>Yes</span> : <span>No</span>}
      </p>
      <p>Expiration: {expiration}</p>
      <Link to={`/posts/${item.id}/edit`}>
        <button>Edit</button>
      </Link>
    </div>
  );
};

export default ItemDetails;

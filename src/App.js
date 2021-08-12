import React, { useState, useEffect } from "react";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

import { getPlacesData } from "./api";
import { CssBaseline, Grid } from "@material-ui/core";

const App = () => {
  const [places, setPlaces] = useState([]);

  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("All");

  const [childClicked, setChildClicked] = useState(null);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  useEffect(() => {
    setLoading(true);
    console.log(coords, bounds);
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      console.log(data);
      setPlaces(data);
      setFilteredPlaces([]);
      setLoading(false);
    });
  }, [bounds, coords, type]);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            loading={loading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;

import React, { useState, useEffect, createRef } from "react";

import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

import useStyles from "./styles";

const List = ({ places, childClicked, loading }) => {
  const classes = useStyles();

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("All");

  const [elementReferences, setElementReferences] = useState([]);
  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, index) => elementReferences[index] || createRef());

    setElementReferences(refs);
  }, [places]);
  console.log({ childClicked });
  console.log(childClicked);

  return (
    <div className={classes.container}>
      <Typography variant="h5">
        Restaurants, Hotels and Attractions around your corner
      </Typography>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.inputLabel}>Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel className={classes.inputLabel}>Rating</InputLabel>
            <Select
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, index) => (
              <Grid ref={elementReferences[index]} item key={index} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === index}
                  refProp={elementReferences[index]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;

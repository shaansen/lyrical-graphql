import React, { Component } from "react";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";
import { Link } from "react-router";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
  render() {
    const { song, loading } = this.props.data;

    if (loading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }

    const { title, id, lyrics } = song;

    return (
      <div>
        <Link to="/">Back</Link>
        <h1>{title}</h1>
        <LyricList lyrics={lyrics} />
        <LyricCreate songId={id} />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: props => {
    return {
      variables: {
        id: props.params.id
      }
    };
  }
})(SongDetail);

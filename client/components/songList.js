import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class SongList extends Component {
  renderSongs() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul className="collection">
          {this.props.data.songs.map((song, id) => (
            <li key={id} className="collection-item">
              {song.title}
            </li>
          ))}
        </ul>
      );
    }
  }

  render() {
    return <div>{this.renderSongs()}</div>;
  }
}

const query = gql`
  {
    songs {
      title
    }
  }
`;

export default graphql(query)(SongList);

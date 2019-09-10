import React, { Component, Fragment } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSongs from "../queries/fetchSongs";
import gql from "graphql-tag";

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({
      variables: { id },
      refetchQueries: [{ query: fetchSongs }]
    });
  }

  renderSongs() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ul className="collection">
            {this.props.data.songs.map(({ title, id }) => {
              return (
                <li key={id} className="collection-item">
                  <Link to={`/songs/${id}`}>{`${id} ------ ${title}`}</Link>

                  <i
                    className="material-icons"
                    onClick={() => this.onSongDelete(id)}
                  >
                    {" "}
                    delete{" "}
                  </i>
                </li>
              );
            })}
          </ul>
          <Link to="/songs/new" className="btn-floating btn-large red right">
            <i className="material-icons">add</i>
          </Link>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderSongs()}</div>;
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(fetchSongs)(SongList));

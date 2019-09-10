import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  onSubmit(event) {
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId
        },
        refetchQueries: [
          {
            query: fetchSong,
            variables: {
              id: this.props.songId
            }
          }
        ]
      })
      .then(() => this.setState({ content: "" }));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID!) {
    addLyricToSong(songId: $songId, content: $content) {
      id
      lyrics {
        content
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);

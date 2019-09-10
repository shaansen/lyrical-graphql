import React, { Component, Fragment } from "react";

class LyricList extends Component {
  renderLyricList() {
    return this.props.lyrics.map(({ id, content }) => {
      return (
        <li className="collection-item" key={id}>
          {content}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Lyric List</h3>
        <ul className="collection">{this.renderLyricList()}</ul>
      </div>
    );
  }
}

export default LyricList;

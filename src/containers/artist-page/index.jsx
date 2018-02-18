import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Serialize,
  multiPushInUrlQuery,
  UrlQueryParamTypes,
  addUrlProps
} from 'react-url-query';

import AlbumsList from 'src/components/albums-list';
import { getAlbumsByArtist } from 'src/actions';


@withRouter
@connect(
  (state, { match }) => ({
    albums: state.artist.albums,
    name: match.params.name,
    mbid: match.params.mbid,
  }), {
    getAlbumsByArtist
  }
)
class ArtistPage extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    mbid: PropTypes.string,
    albums: PropTypes.arrayOf(PropTypes.object),
    getAlbumsByArtist: PropTypes.func.isRequired,
  }

  static defaultProps = {
    name: '',
    mbid: '',
    albums: [],
  }

  componentDidMount() {
    this.props.getAlbumsByArtist(this.props.mbid, this.props.name);
  }

  render() {
    const Wrapper = styled.div`
      width: 100%;
      padding-top: 100px;
    `;

    const ArtistWrapper = styled.div`
      width: 1000px;
      margin: auto;
    `;

    return (
      <Wrapper>
        <ArtistWrapper>
          <h1>Альбомы {this.props.name}</h1>
          <AlbumsList albums={this.props.albums} />
        </ArtistWrapper>
      </Wrapper>
    );
  }
}

export default ArtistPage;

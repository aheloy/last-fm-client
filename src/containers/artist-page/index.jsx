import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  Serialize,
  multiPushInUrlQuery,
  UrlQueryParamTypes,
  addUrlProps
} from 'react-url-query';

import AlbumsList from 'src/components/albums-list';
import { getAlbumsByArtist } from 'src/actions';
import { Icon, Alert, Spin } from 'antd';


@withRouter
@connect(
  (state, { match }) => ({
    albums: state.artist.albums,
    status: state.artist.status,
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
    status: PropTypes.oneOf([
      'request',
      'success',
      'fail',
      'initial',
    ]),
  }

  static defaultProps = {
    name: '',
    mbid: '',
    albums: [],
    status: 'initial',
  }

  componentDidMount() {
    this.props.getAlbumsByArtist(this.props.mbid, this.props.name);
  }

  render() {
    const Wrapper = styled.div`
      width: 100%;
      padding-top: 40px;
    `;

    const ArtistWrapper = styled.div`
      max-width: 1000px;
      padding: 0 16px;
      margin: auto;
    `;

    const SpinWrapper = styled.div`
      width: 100%;
      padding-top: 50px;
      text-align: center;
    `;

    const { status, name, albums } = this.props;

    const spin = status === 'request' ? (
      <SpinWrapper>
        <Spin message={'Loading...'} />
      </SpinWrapper>
    ) : null;

    const notFound = !albums.length && status === 'success' ? (
      <Alert message="У этого исполнителя нет альбомов" />
    ) : null;

    const fail = status === 'fail' ? (
      <Alert message="Ошибка запроса" type="error" />
    ) : null;

    return (
      <Wrapper>
        <ArtistWrapper>
          <h1>
            <Link to="/">
              <Icon
                onClick={this.goBack}
                type="arrow-left" />
            </Link>
            <span> Альбомы {name}</span>
          </h1>
          <AlbumsList albums={albums} />
          {spin}
          {notFound}
          {fail}
        </ArtistWrapper>
      </Wrapper>
    );
  }
}

export default ArtistPage;

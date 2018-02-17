import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Spin, Alert } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Serialize,
  multiPushInUrlQuery,
  UrlQueryParamTypes,
  addUrlProps
} from 'react-url-query';
import debounce from 'lodash/debounce';

import ArtistsList from 'src/components/artists-list';
import { searchArtists } from 'src/actions';


const Wrapper = styled.div`
  width: 100%;
  padding-top: 100px;
`;

const SearchWrapper = styled.div`
  width: 400px;
  margin: auto;
`;

@withRouter
@addUrlProps({
  mapUrlToProps: url => ({
    searchText: Serialize.decode(UrlQueryParamTypes.string, url.searchText),
  }),
  mapUrlChangeHandlersToProps: () => ({
    pushToQuery: debounce(({ searchText }) => multiPushInUrlQuery({
      searchText: searchText ? Serialize.encode(UrlQueryParamTypes.string, searchText) : null,
    }), 500)
  })
})
@connect(
  (state) => ({
    artists: state.artists.items,
    searchStatus: state.artists.searchStatus,
  }),
  {
    searchArtists
  }
)
class SearchPage extends React.Component {
  static propTypes = {
    searchArtists: PropTypes.func.isRequired,
    artists: PropTypes.arrayOf(PropTypes.object),
    searchStatus: PropTypes.oneOf([
      'request',
      'success',
      'fail',
      'initial',
    ]),
    searchText: PropTypes.string,
    pushToQuery: PropTypes.func.isRequired,
  }

  static defaultProps = {
    searchText: '',
    searchStatus: 'initial',
    artists: [],
  }

  state = {
    searchText: '',
  }

  componentDidMount() {
    if (this.props.searchText) {
      this.props.searchArtists(this.props.searchText);
      this.setState({ searchText: this.props.searchText });
    }
  }

  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
    this.props.pushToQuery({ searchText: e.target.value });
  }

  search = () => {
    this.props.searchArtists(this.state.searchText);
  }

  render() {
    const { searchStatus, artists } = this.props;

    const SpinWrapper = styled.div`
      width: 100%;
      padding-top: 50px;
      text-align: center;
    `;

    const ArtistsListWrapper = styled.div`
      padding-top: 20px;
    `;

    const spin = searchStatus === 'request' ? (
      <SpinWrapper>
        <Spin message={'Loading...'} />
      </SpinWrapper>
    ) : null;

    const artistsList = searchStatus === 'success' && artists.length ? (
      <ArtistsList artists={artists} />
    ) : null;

    const notFound = searchStatus === 'success' && !artists.length ? (
      <Alert message="Исполнители с таким именем не найдены" type="info" />
    ) : null;

    const fail = searchStatus === 'fail' ? (
      <Alert message="Ошибка запроса" type="error" />
    ) : null;

    return (
      <Wrapper>
        <SearchWrapper>
          <Input.Search
            placeholder="Поиск исполнителей"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onSearch={this.search}
          />
          <ArtistsListWrapper>
            {artistsList}
          </ArtistsListWrapper>
          {notFound}
          {fail}
          {spin}
        </SearchWrapper>
      </Wrapper>
    );
  }
}

export default SearchPage;

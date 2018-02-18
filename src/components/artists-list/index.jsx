import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List, Avatar, Badge } from 'antd';
import get from 'lodash/get';
import { Link } from 'react-router-dom';


class ArtistsList extends React.Component {
  static propTypes = {
    artists: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    artists: [],
  }

  shouldComponentUpdate(nextProps) {
    nextProps.artists.map((artist, index) => {
      if (this.props.artists[index].mbid !== artist.mbid) {
        return true;
      }
    });
    return false;
  }

  render() {
    const renderItem = (item) => {
      const src = get(item, 'image[2].#text', '');
      const badgeStyles = {
        backgroundColor: '#fff',
        color: '#999',
        boxShadow: '0 0 0 1px #d9d9d9 inset'
      };
      return (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={src} />}
            title={<Link to={`/artist/${item.mbid || null}/${item.name || null}`}>{item.name}</Link>}
          />
          <Badge
            count={item.listeners}
            overflowCount={999999}
            style={badgeStyles}
          />
        </List.Item>
      );
    };

    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.artists}
        renderItem={renderItem}
      />
    );
  }
}

export default ArtistsList;

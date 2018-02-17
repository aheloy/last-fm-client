import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Row, Col, Meta } from 'antd';
import get from 'lodash/get';


class AlbumsList extends React.Component {
  static propTypes = {
    albums: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    albums: [],
  }

  render() {
    const albums = this.props.albums.map(album => {
      const src = get(album, 'image[3].#text', '');
      const name = album.name;
      const mbid = album.mbid;

      return src && name && mbid ?(
        <Col span={8} key={album.mbid}>
          <Card
            style={{marginBottom: '16px'}}
            cover={
              <img
                alt={name}
                src={src} />
            }>
            <Card.Meta
              title={name}
            />
          </Card>
        </Col>
      ) : null;
    });

    return (
      <Row gutter={16}>
        {albums}
      </Row>
    );
  }
}

export default AlbumsList;

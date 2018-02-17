import React from 'react';
import { Input } from 'antd';


class SearchPage extends React.Component {
  render() {
    return (
      <div>
        <Input.Search
          placeholder="Поиск исполнителей"
        />
      </div>
    );
  }
}

export default SearchPage;

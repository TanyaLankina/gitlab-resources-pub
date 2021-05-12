import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProjects } from 'store/projects/operations';
import { getProjectsList } from 'store/projects/selectors';
import { Button, Row, Col, Space, Input, Empty, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ProjectsList from 'components/Projects/ProjectsList';

const { Search: SearchInput } = Input;
const { Text } = Typography;

const Search = () => {
  const dispatch = useDispatch();
  const { projects, fetching, prevPage, nextPage, isSearchResult } = useSelector(getProjectsList);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLoadNext = () => {
    dispatch(searchProjects(searchTerm, nextPage));
  };
  const handleLoadPrevious = () => {
    dispatch(searchProjects(searchTerm, prevPage));
  };

  const handleSearch = (value: string) => {
    if (value) {
      dispatch(searchProjects(value));
      setSearchTerm(value);
    }
  };

  return (
    <>
      <SearchInput
        loading={fetching}
        placeholder="Search text"
        allowClear
        onSearch={handleSearch}
        style={{ width: 300 }}
        size="large"
      />
      {!fetching && isSearchResult && projects && !!projects.length && (
        <>
          <Space direction="vertical">
            <ProjectsList title={'Search Result'} projects={projects} />
            <Row gutter={10}>
              <Col>
                <Button disabled={!prevPage} onClick={handleLoadPrevious}>
                  <LeftOutlined />
                  Prev
                </Button>
              </Col>
              <Col>
                <Button disabled={!nextPage} onClick={handleLoadNext}>
                  Next <RightOutlined />
                </Button>
              </Col>
            </Row>
          </Space>
        </>
      )}
      {!fetching && projects && !projects.length && (
        <Empty>
          We couldn't find any projects matching <Text mark>{searchTerm}</Text>
        </Empty>
      )}
    </>
  );
};
export default Search;

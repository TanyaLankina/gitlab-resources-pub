import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from 'store/projects/operations';
import { getProjectsList } from 'store/projects/selectors';
import { Empty, Button, Row, Col, Space } from 'antd';
import { LoadingOutlined, ReloadOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import ProjectsList from 'components/Projects/ProjectsList';

function refreshPage() {
  window.location.reload();
}

const PublicProjects = () => {
  const dispatch = useDispatch();
  const { projects, fetching, prevPage, nextPage } = useSelector(getProjectsList);
  const perPage = 20;

  const handleLoadNext = () => {
    dispatch(getProjects(perPage, nextPage));
  };
  const handleLoadPrevious = () => {
    dispatch(getProjects(perPage, prevPage));
  };
  useEffect(() => {
    dispatch(getProjects(perPage));
  }, []);
  return (
    <>
      {fetching && <LoadingOutlined style={{ fontSize: '50px' }} />}
      {!fetching && projects && (
        <>
          <Space direction="vertical">
            <ProjectsList title={'Public Projects'} projects={projects} />
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
      {!fetching && !projects && (
        <Empty>
          <Button type="primary" onClick={refreshPage}>
            <ReloadOutlined /> Reload
          </Button>
        </Empty>
      )}
    </>
  );
};
export default PublicProjects;

import { Typography, Row } from 'antd';
import { useSelector } from 'react-redux';
import { getAccessToken } from 'store/auth/selectors';
import { GITLAB_GET_AUTH_CODE_URL } from '../../constants';

const { Title, Link } = Typography;

const Main = () => {
  const isAuthenticated = useSelector(getAccessToken);

  return (
    <>
      <Row>
        <Title level={2}>Gitlab Projects</Title>
      </Row>
      <Row>
        <Link href="/projects">Public Projects</Link>
      </Row>
      <Row>
        <Link href="search-projects">Search for projects (authentication required)</Link>
      </Row>
      {!isAuthenticated && (
        <Row>
          <Link href={GITLAB_GET_AUTH_CODE_URL}>Login</Link>
        </Row>
      )}
      {isAuthenticated && (
        <Row>
          <Link href="/logout"> Logout </Link>
        </Row>
      )}
    </>
  );
};
export default Main;

import { Layout, Menu, Row, Col, Typography } from 'antd';
import { Link as RouteLink, useLocation } from 'react-router-dom';
import Emitter from '../../events';
import { useEffect } from 'react';
import openNotification from 'components/PopupNotification';
import { useSelector } from 'react-redux';
import { getAccessToken } from 'store/auth/selectors';
import { GITLAB_GET_AUTH_CODE_URL } from '../../constants';

const { Header, Content } = Layout;
const { Link } = Typography;

interface LayoutInterface {
  children: string | JSX.Element;
}
const AppLayout = ({ children }: LayoutInterface) => {
  const location = useLocation();
  const isAuthenticated = useSelector(getAccessToken);

  useEffect(() => {
    Emitter.on('apiError', (errorMessage) =>
      openNotification({
        type: 'error',
        title: 'Something went wrong.',
        description: errorMessage.description,
      })
    );
  }, []);
  return (
    <>
      <Layout className="layout">
        <Header>
          <Menu mode="horizontal" selectedKeys={[location.pathname]}>
            <Menu.Item key="/">
              <RouteLink to="/">Home</RouteLink>
            </Menu.Item>
            <Menu.Item key="/projects">
              <RouteLink to="/projects">Projects</RouteLink>
            </Menu.Item>
            {isAuthenticated && (
              <Menu.Item key="/search-projects">
                <RouteLink to="/search-projects">Search</RouteLink>
              </Menu.Item>
            )}
          </Menu>
          {isAuthenticated && <Link href="/logout"> Logout </Link>}
          {!isAuthenticated && <Link href={GITLAB_GET_AUTH_CODE_URL}>Login</Link>}
        </Header>
        <Content>
          <div className="site-layout-content">
            <Row>
              <Col span={2}></Col>
              <Col span={20}>
                <div>{children}</div>
              </Col>
              <Col span={2}></Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default AppLayout;

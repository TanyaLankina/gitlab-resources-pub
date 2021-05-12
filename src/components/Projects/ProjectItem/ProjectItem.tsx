import { Card, Typography, Statistic, Row, Col, Space } from 'antd';
import { Project } from 'interfaces/Projects';
import { FileTextOutlined, ForkOutlined, StarOutlined } from '@ant-design/icons';

const { Text, Link } = Typography;

function dateFormatter(dateString: string): string {
  const date = new Date(dateString);
  return (
    date.getDate() + ' ' + date.toLocaleString('en', { month: 'short' }) + ' ' + date.getFullYear()
  );
}

interface ProjectItemInterface {
  project: Project;
}
const ProjectItem = ({ project }: ProjectItemInterface) => {
  return (
    <>
      <Card className="project-card">
        <Space direction="vertical">
          <Row>
            <Link href={project.web_url} target="_blank">
              <FileTextOutlined /> {project.path_with_namespace}
            </Link>
          </Row>
          <Row>
            <Col span={12}>
              <Statistic title="Star" value={project.star_count} prefix={<StarOutlined />} />
            </Col>
            <Col span={12}>
              <Statistic title="Forks" value={project.forks_count} prefix={<ForkOutlined />} />
            </Col>
          </Row>
          <Row>
            <Text>Last Activity: {dateFormatter(project.last_activity_at)}</Text>
          </Row>
        </Space>
      </Card>
    </>
  );
};
export default ProjectItem;

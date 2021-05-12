import { Space, Row } from 'antd';
import { Typography } from 'antd';
import { Project } from 'interfaces/Projects';
import ProjectItem from '../ProjectItem';
const { Title } = Typography;

interface ProjectsListInterface {
  title: string;
  projects: Project[];
}

const ProjectsList = ({ title, projects }: ProjectsListInterface) => {
  return (
    <>
      <Row>
        <Title level={3}>{title}</Title>
      </Row>
      <Space wrap size="large">
        {projects.map((project: Project) => (
          <ProjectItem project={project} key={project.id} />
        ))}
      </Space>
    </>
  );
};
export default ProjectsList;

import { Col, Collapse, Row } from "antd";
import Title from "antd/lib/typography/Title";

export interface Content {
  id: string;
  title: string;
}

export interface Section {
  id: string;
  title: string;
  content: Content[];
}

export interface SectionProps {
  section: Section;
}

export interface ContentItemProps {
  content: Content;
}

export function ContentItem({ content }: ContentItemProps) {
  return <Row>{content.title}</Row>;
}

export function SectionItem({ section }: SectionProps) {
  return (
    <>
      <Collapse collapsible="icon">
        <Collapse.Panel
          key={section.id}
          header={
            <Row>
              <Col span={12}>
                <Title level={5}>{section.title}</Title>
              </Col>
              <Col flex="auto">
                <p>{section.content.length} lessons</p>
              </Col>
            </Row>
          }
        >
          {section.content.map((content, id) => (
            <ContentItem content={content} key={id} />
          ))}
        </Collapse.Panel>
      </Collapse>
    </>
  );
}

interface ContentProps {
  sections: Section[];
}

export function Sections({ sections }: ContentProps) {
  return (
    <>
      {sections.map((section, id) => (
        <SectionItem section={section} key={id} />
      ))}
    </>
  );
}

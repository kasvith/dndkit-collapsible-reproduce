import { HolderOutlined } from "@ant-design/icons";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Col, Collapse, Row, Space } from "antd";
import Title from "antd/lib/typography/Title";
import { useState } from "react";

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
  return (
    <Row align={"middle"} justify="start">
      <Space>
        <Col>
          <HolderOutlined />
        </Col>
        <Col flex={1}>
          <span>
            <Title level={5}>{content.title}</Title>
          </span>
        </Col>{" "}
      </Space>
    </Row>
  );
}

export function SectionItem({ section }: SectionProps) {
  return (
    <Row justify={"center"} align={"middle"}>
      <Col>
        <HolderOutlined />
      </Col>
      <Col flex={1}>
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
            <SortableContext
              items={section.content}
              strategy={verticalListSortingStrategy}
            >
              {section.content.map((content, id) => (
                <ContentItem content={content} key={id} />
              ))}
            </SortableContext>
          </Collapse.Panel>
        </Collapse>
      </Col>
    </Row>
  );
}

interface SectionsProps {
  sections: Section[];
}

export function Sections({ sections }: SectionsProps) {
  const [items, setItems] = useState(() => [...sections]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext sensors={sensors}>
      {items.map((section, id) => (
        <SectionItem section={section} key={id} />
      ))}
    </DndContext>
  );
}

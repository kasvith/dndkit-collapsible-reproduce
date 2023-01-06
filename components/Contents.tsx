import { HolderOutlined } from "@ant-design/icons";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCenter,
} from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { Col, Collapse, Row, Space } from "antd";
import Title from "antd/lib/typography/Title";
import { useState } from "react";
import { createPortal } from "react-dom";
import { CSS } from "@dnd-kit/utilities";

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
  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useSortable({
      id: content.id,
      data: { item: content, type: "lesson" },
    });

  const style = {
    opacity: isDragging ? 0.4 : 1,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
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
    </div>
  );
}

export interface ContentItemsProps {
  contents: Content[];
  sectionId: string;
}

export function ContentItems({ sectionId, contents }: ContentItemsProps) {
  const { setDroppableNodeRef } = useSortable({
    id: sectionId,
    data: { item: contents },
  });
  return (
    <div ref={setDroppableNodeRef}>
      {contents.map((content, id) => (
        <ContentItem content={content} key={id} />
      ))}
    </div>
  );
}

export interface ContentsProps {
  sectionId: string;
  contents: Content[];
}

export function Contents({ sectionId, contents }: ContentsProps) {
  const { setDroppableNodeRef } = useSortable({
    id: sectionId,
    data: { item: contents },
  });

  return (
    <div ref={setDroppableNodeRef}>
      <ContentItems contents={contents} sectionId={sectionId} />
    </div>
  );
}

export function SectionItem({ section }: SectionProps) {
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: section.id,
    data: {
      type: "section",
      item: section,
    },
  });

  const {
    setNodeRef: setDraggableRef,
    attributes,
    listeners,
    transform,
  } = useDraggable({
    id: section.id,
    data: {
      type: "section",
      item: section,
    },
  });

  const { setNodeRef: setSortableRef } = useSortable({
    id: section.id,
    data: { type: "section", item: section },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div className="section" ref={setDroppableRef}>
      <div className="children" ref={setDraggableRef} style={style}>
        <div>
          <SortableContext
            items={section.content}
            strategy={verticalListSortingStrategy}
          >
            <Row justify={"center"} align={"middle"}>
              <div ref={setSortableRef} {...attributes} {...listeners}>
                <Col>
                  <HolderOutlined />
                </Col>
              </div>

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
                          <p>{section.content.length} items</p>
                        </Col>
                      </Row>
                    }
                  >
                    <Contents
                      sectionId={section.id}
                      contents={section.content}
                    />
                  </Collapse.Panel>
                </Collapse>
              </Col>
            </Row>
          </SortableContext>
        </div>
      </div>
    </div>
  );
}
interface SectionsProps {
  sections: Section[];
}

function SectionItems({ sections }: SectionsProps) {
  const { setDroppableNodeRef } = useSortable({
    id: "items",
    data: sections,
  });

  return (
    <div style={{ padding: "10px" }} ref={setDroppableNodeRef}>
      {sections.map((section, id) => (
        <div style={{ padding: "10px" }} key={id}>
          <SectionItem section={section} />
        </div>
      ))}
    </div>
  );
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
    <div style={{ padding: "10px" }}>
      <DndContext sensors={sensors} collisionDetection={closestCenter}>
        <SectionItems sections={items} />
      </DndContext>
      {/* {createPortal(<DragOverlay></DragOverlay>, document.body)} */}
    </div>
  );
}

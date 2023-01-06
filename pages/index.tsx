import { Button } from "antd";
import dynamic from "next/dynamic";
import { Section } from "../components/Contents";
const Sections = dynamic(() =>
  import("../components/Contents").then((mod) => mod.Sections)
);

const sections: Section[] = [
  {
    id: "a574b9c0-fb60-4972-9069-465b3b1129cb",
    title: "First",
    content: [
      {
        id: "bf70695c-6754-4b19-851b-f1fb293d6879",
        title: "Item 1",
      },
      {
        id: "4be72f91-b5a0-4115-bc49-fd4ef3dc1923",
        title: "Item 2",
      },
      {
        id: "c39bbea1-398a-49ff-8470-8da531a00fef",
        title: "Item 3",
      },
    ],
  },
  {
    id: "959ed9f8-e109-48eb-9019-7fdedeef8150",
    title: "Second",
    content: [
      {
        id: "ecee536e-a9b6-47fa-978a-39f20f650ca2",
        title: "Item 4",
      },
      {
        id: "3c823598-4dfb-486a-8598-dfd4d8445209",
        title: "Item 5",
      },
      {
        id: "5b83b88f-625b-4f2a-9d71-1a5fe09350ac",
        title: "Item 6",
      },
      {
        id: "5b83b88f-625b-4f2a-9d71-1a5fe09351ac",
        title: "Item 7",
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <Sections sections={sections} />
    </>
  );
}

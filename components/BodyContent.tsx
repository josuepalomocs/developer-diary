import { BodyParagraph } from "../types";

interface BodyContentProps {
  bodyParagraphs: BodyParagraph[];
}

export default function BodyContent({ bodyParagraphs }: BodyContentProps) {
  function renderBodyParagraphs() {
    return bodyParagraphs.map(({ content }, index) => {
      return (
        <p key={index} className="mb-4">
          {content}
        </p>
      );
    });
  }

  return <section className="text-gray-500">{renderBodyParagraphs()}</section>;
}

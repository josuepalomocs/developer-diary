interface BodyContentProps {
  bodyParagraphs: string[];
}

export default function BodyContent({ bodyParagraphs }: BodyContentProps) {
  function renderBodyParagraphs() {
    return bodyParagraphs.map((bodyParagraph, index) => {
      return (
        <p key={index} className="mb-4">
          {bodyParagraph}
        </p>
      );
    });
  }

  return <section className="text-gray-500">{renderBodyParagraphs()}</section>;
}

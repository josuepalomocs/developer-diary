import { Card as CardType } from "../types";
import Card from "./Card";

interface CardListProps {
  cards: CardType[];
}

export default function CardList({ cards }: CardListProps) {
  function renderCards() {
    return cards.map(
      ({ title, description, date, tags, lengthInMinutes, href }, index) => {
        return (
          <li key={index}>
            <Card
              title={title}
              description={description}
              tags={tags}
              lengthInMinutes={lengthInMinutes}
              date={date}
              href={href}
            />
          </li>
        );
      }
    );
  }

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 justify-center max-w-full">
      {renderCards()}
    </ul>
  );
}

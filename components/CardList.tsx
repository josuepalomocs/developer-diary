import { Card as CardType } from "../types";
import Card from "./Card";

interface CardListProps {
  cards: CardType[];
}

export default function CardList({ cards }: CardListProps) {
  function renderCards() {
    return cards.map(
      ({ title, description, date, tags, lengthInMinutes }, index) => {
        return (
          <li key={index}>
            <Card
              title={title}
              description={description}
              tags={tags}
              lengthInMinutes={lengthInMinutes}
              date={date}
            />
          </li>
        );
      }
    );
  }

  return (
    <ul className="grid grid-cols-3 justify-center max-w-full">
      {renderCards()}
    </ul>
  );
}

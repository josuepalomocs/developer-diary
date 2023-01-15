export {};
// import { Card } from "../types";
// import { faker } from "@faker-js/faker";
//
// function getRandomCardTitle() {
//   return faker.lorem.sentence(4);
// }
//
// function getRandomCardDescription() {
//   return faker.lorem.sentence(12);
// }
//
// function getRandomCardTags(): Tag[] {
//   return [
//     { name: faker.commerce.product() },
//     { name: faker.commerce.product() },
//     { name: faker.commerce.product() },
//   ];
// }
//
// function getRandomCardLengthInMinutes() {
//   return faker.random.numeric(2);
// }
//
// function getRandomCardDate() {
//   return faker.date.recent(30);
// }
//
// export function getCards() {
//   let cards: Card[] = [];
//
//   for (let i = 0; i < 32; i++) {
//     cards.push({
//       title: getRandomCardTitle(),
//       description: getRandomCardDescription(),
//       tags: getRandomCardTags(),
//       lengthInMinutes: Number(getRandomCardLengthInMinutes()),
//       date: getRandomCardDate().toISOString(),
//       href: `/articles/${i + 1}`,
//     });
//   }
//
//   return cards;
// }

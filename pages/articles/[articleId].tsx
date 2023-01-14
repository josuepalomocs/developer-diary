import { useRouter } from "next/router";
import PageWrapper from "../../components/PageWrapper";
import Head from "next/head";
import { NextPageContext } from "next";
import Article from "../../components/Article";

export default function Articles() {
  const router = useRouter();

  const tags = [{ name: "JPA" }, { name: "Java" }, { name: "Spring" }];

  // function renderTags() {
  //   return tags.map((tag, index) => {
  //     return <Tag key={index} name={tag.name} />;
  //   });
  // }

  return (
    <>
      <Head>
        <title>Josue Palomo</title>
        <meta
          name="description"
          content="Welcome to my personal website where I'll be regularly posting about my web development journey."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <div className="flex flex-col h-full justify-center items-center">
          <div className="mb-24"></div>
          <main className="">
            <Article
              introductoryContent={{
                title: "My first encounter with Spring JPA",
                description:
                  "This guide walks you through the process of building an application that uses Spring Data JPA to store and retrieve data in a relational database.",
                tags: [{ name: "Spring" }, { name: "Java" }, { name: "JPA" }],
                lengthInMinutes: 10,
                date: "2022-10-05T14:48:00.000Z",
              }}
              bodyContent={[
                {
                  content:
                    "Here you have a Customer class with three attributes: id, firstName, and lastName. You also have two constructors. The default constructor exists only for the sake of JPA. You do not use it directly, so it is designated as protected. The other constructor is the one you use to create instances of Customer to be saved to the database.",
                },
                {
                  content:
                    "Here you have a Customer class with three attributes: id, firstName, and lastName. You also have two constructors. The default constructor exists only for the sake of JPA. You do not use it directly, so it is designated as protected. The other constructor is the one you use to create instances of Customer to be saved to the database.",
                },
                {
                  content:
                    "Here you have a Customer class with three attributes: id, firstName, and lastName. You also have two constructors. The default constructor exists only for the sake of JPA. You do not use it directly, so it is designated as protected. The other constructor is the one you use to create instances of Customer to be saved to the database.",
                },
                {
                  content:
                    "Here you have a Customer class with three attributes: id, firstName, and lastName. You also have two constructors. The default constructor exists only for the sake of JPA. You do not use it directly, so it is designated as protected. The other constructor is the one you use to create instances of Customer to be saved to the database.",
                },
              ]}
            />
          </main>
        </div>
      </PageWrapper>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const req = context.req;

  return {
    props: {},
  };
}

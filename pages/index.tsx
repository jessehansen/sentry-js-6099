import Head from "next/head";
import styles from "../styles/Home.module.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

const QUERY = gql`
  query SayHello($delay: Int!) {
    sayHello(delay: $delay)
  }
`;

const SayHelloButtonAndResponse = () => {
  const { data, loading, refetch } = useQuery(QUERY, {
    variables: { delay: 0 },
  });
  const response = data?.sayHello;
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <button
          type="button"
          style={{ fontSize: "24pt", marginRight: "24pt" }}
          onClick={() => refetch()}
        >
          Do It
        </button>
        <button
          type="button"
          style={{ fontSize: "24pt" }}
          onClick={() => refetch({ delay: 2500 })}
        >
          Do It With Delay
        </button>
      </div>

      {loading && <div>Loading...</div>}
      {response && (
        <div style={{ fontSize: "18pt", marginTop: "30pt" }}>{response}</div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Reproduce Sentry Stream Error</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Click Button to Call GraphQL</h1>
        <ApolloProvider client={client}>
          <SayHelloButtonAndResponse />
        </ApolloProvider>
      </main>
    </div>
  );
}

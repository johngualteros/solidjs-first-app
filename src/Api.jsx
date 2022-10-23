import {
  createMemo,
  createResource,
  createSignal,
  For,
  Match,
  Show,
  Switch,
} from "solid-js";
import styles from "./Api.module.css";

const fetchData = () => {
  return fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .then((data) => {
      return data.results;
    });
};
const Api = () => {
  // const [getResults, setResults] = createSignal([]);
  const [getData, { mutate, refetch }] = createResource(fetchData, {
    initialValue: [],
  });

  return (
    <div class={styles.main}>
      <h1>Ricky And Morty</h1>
      <Switch fallback={<h1>Loading...</h1>}>
        <Match when={getData().error}>
          <h1>Error</h1>
        </Match>
        <Match when={getData()}>
          <For each={getData()}>
            {(item) => (
              <div class={styles.card}>
                <img src={item.image} alt={item.name} />
                <h2>{item.name}</h2>
                <p>{item.species}</p>
                <p>{item.status}</p>
              </div>
            )}
          </For>
        </Match>
      </Switch>
      {
        /* <Show when={getData.loading}>
        <p>Loading...</p>
      </Show>
      <Show when={getData.error}>
        <p>Error</p>
      </Show> */
      }
    </div>
  );
};

export default Api;

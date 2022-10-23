import logo from "./logo.svg";
import styles from "./App.module.css";
import { createSignal, createMemo, createEffect, onCleanup, onMount, mergeProps } from "solid-js";

const pow = (n) => n ** n;

function App() {
  const [getCounter, setCounter] = createSignal(0);

  const incrementCounter = () => {
    setCounter(getCounter() + 1);
  };

  const getPow = createMemo(() => pow(getCounter()));
  const getText = createMemo(() => (getCounter() % 2 === 0 ? "Even" : "Odd"));

  onMount(() => {
    console.log("Mounted");
  }, []);

  const interval = setInterval(()=>{
    setCounter(getCounter() + 1);
  }, 1000);

  onCleanup(()=>{
    clearInterval(interval);
  })

  createEffect((prev) => {
    const sum = getCounter() + prev;
    console.log('Sum: ', sum);
    return sum;
  }, 0);

  return (
    <div class={styles.App}>
      <Counter counter={getCounter()} text={getText()} pow={getPow()} incrementCounter={incrementCounter} />
    </div>
  );
}
const Counter = (propsFromParamas) => {
  const props = mergeProps({ counter: 0 }, propsFromParamas);
  return(
    <>
      <p>{props.counter}</p>
      <p>{props.text}</p>
      <p>{props.pow}</p>
      <button onClick={props.incrementCounter}>Increment</button>
    </>
  )
};

export default App;

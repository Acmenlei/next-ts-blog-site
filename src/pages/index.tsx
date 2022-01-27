import type { NextPage } from 'next'
import { memo, useState } from 'react';

const Home: NextPage = memo((props) => {
  const [counter, setCounter] = useState<number>(0);
  return (
    <>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>++</button>
    </>
  );
})

export default Home

import type { NextPage } from 'next'
import { memo, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
// local
import { fetchHomeCounter } from "@/services/modules/home"

const Home: NextPage = memo(() => {
  // redux hook
  const { counter } = useSelector((state: any) => {
    return {
      counter: state.getIn(["home", "counter"])
    }
  }, shallowEqual)
  // other hook
  const dispatch = useDispatch()
  return (
    <>
      <p>{counter}</p>
      <Button onClick={() => dispatch((fetchHomeCounter(1)))}>++</Button>
    </>
  );
})

export default Home

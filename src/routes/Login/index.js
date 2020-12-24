import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import MoonLoader from "react-spinners/MoonLoader";
import { useAppContext } from "../../libs/contextLib";
import { parseQuery } from "../../functions/Functions";

export default () => {
  const { code } = useParams();
  const { globalState, setGlobalState } = useAppContext();

  useEffect(async () => {
    if (code) {
      const res = await fetch(`https://login.exokit.org/?discordcode=${code}`, {method: 'POST'});
      const j = await res.json();
      const {mnemonic} = j;
      localStorage.setItem('globalState', JSON.stringify({...globalState, loginToken: mnemonic}));
      location.href = '/settings';
    } else {
      console.warn('no discord code provided', q);
      location.href = '/settings';
    }
  }, []);

  return( 
    <MoonLoader
      css={"display: inline-block"}
      size={50}
      color={"#c4005d"}
      loading={loading}
    />
  )
}

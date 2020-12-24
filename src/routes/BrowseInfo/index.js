import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-grid-system';
import { useParams } from "react-router-dom"
import { useAppContext } from "../../libs/contextLib";
import { getInventoryForCreator, getProfileForCreator } from "../../functions/UIStateFunctions.js";
import Loader from "../../components/Loader";

export default () => {
  const { id } = useParams();
  const { globalState, setGlobalState } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getInventoryForCreator(id, 0, true, globalState).then(res => {
      setItem(res.creatorInventories[id][0]);
      setLoading(false);
    });
  }, []);

  const Item = () => item ? 
    <Col sm={10}>
      <div className="profileHeader">
        <div className="profileName">
          <h1>{item.name}</h1>
          <p>Total Supply: {item.totalSupply}</p>
        </div>
        <img src={item.image} />
      </div>
    </Col>
  : null

  return (
    <Container>
      <Row style={{ justifyContent: "center" }}>
        <Loader loading={loading} />
        <Item />
      </Row>
    </Container>
  )
}

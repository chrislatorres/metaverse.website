import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MoonLoader from "react-spinners/MoonLoader";
import { Container, Row, Col } from 'react-grid-system';
import { useParams } from "react-router-dom"
import Web3 from 'web3';
import axios from "axios";
import { useAppContext } from "../../libs/contextLib";
import { getCreators } from "../../functions/UIStateFunctions.js";
import preview from "../../assets/images/preview.png";

export default () => {
  const { id } = useParams();
  const { globalState, setGlobalState } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [creators, setCreators] = useState(null);

  useEffect(() => {
    getCreators(0, globalState).then(res => {
      setCreators(res.creators[0]);
      setLoading(false);
    });
  }, []);

  const Creators = () => creators ? creators.map((item, i) =>
    item.address && item.name || item.avatarPreview ?
      <Col key={i} className="content" sm={2} style={{
        backgroundImage: `url("${item.avatarPreview ? item.avatarPreview : preview}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}>
        <Link to={"/accounts/" + item.address}>
          <div className="content-inner">
            <h3 className="contentText">{item.name ? item.name : "Anonymous"}</h3>
          </div>
        </Link>
      </Col>
    : null
   ) : null

  return (
    <>
      <Container>
       <Row style={{ justifyContent: "center" }}>
        {loading ?
              <MoonLoader
                css={"display: inline-block"}
                size={50}
                color={"#c4005d"}
                loading={loading}
              />
        :
          <>
            <Creators />
          </>
        }
        </Row>
      </Container>
    </>
  )
}

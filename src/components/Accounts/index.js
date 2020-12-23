import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MoonLoader from "react-spinners/MoonLoader";
import { Container, Row, Col } from 'react-grid-system';
import { useParams } from "react-router-dom"
import Web3 from 'web3';
import axios from "axios";
import { useAppContext } from "../../libs/contextLib";
import { getInventoryForCreator, getProfileForCreator } from "../../functions/UIStateFunctions.js";
import preview from "../../assets/images/preview.png";

export default () => {
  const { id } = useParams();
  const { globalState, setGlobalState } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getInventoryForCreator(id, 0, true, globalState).then(res => {
      setInventory(res.creatorInventories[id][0]);
    });

    getProfileForCreator(id, globalState).then(res => {
      setProfile(res.creatorProfiles[id]);
      setLoading(false);
      console.log(res.creatorProfiles[id]);
    });
  }, []);

  const Profile = () => profile ? 
    <Col sm={12} className="profileHeaderContainer">
      <div className="profileHeaderBackground" style={{ 
        backgroundImage: `url(${profile.homeSpacePreview})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }} />
      <div className="profileHeader">
        <div className="profileName">
          <h1 className="profileText">{profile.name ? profile.name : "Anonymous"}</h1>
          <div className="profileLoadout">
            {profile.loadout ? 
                JSON.parse(profile.loadout).map((item, i) => 
                  item && item[2] ? 
                    <img key={i} className="profileLoadoutPicture" src={item[2]} />
                  : null
                ) 
            : null}
          </div>
        </div>
        <img className="profilePicture" src={profile.avatarPreview ? profile.avatarPreview : preview} />
      </div>
    </Col>
  : null

  const Inventory = () => inventory ? inventory.map((item, i) =>
     <Col key={i} className="content" sm={2} style={{
       backgroundImage: `url("${item.image}")`,
       backgroundSize: "cover",
       backgroundRepeat: "no-repeat",
       backgroundPosition: "center center",
     }}>
       <Link to={"/browse/" + item.id}>
         <div className="content-inner">
           <h3 className="contentText">{item.name.replace(/\.[^/\\.]+$/, "")}</h3>
         </div>
       </Link>
     </Col>
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
            <Profile />
            <Inventory />
          </>
        }
        </Row>
      </Container>
    </>
  )
}

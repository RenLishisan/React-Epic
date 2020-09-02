import React from "react";
import {observer} from "mobx-react";
import {useStores} from "../stores";

const Home = observer(() => {
  const {UserStore} = useStores()
  return (
      <>
        <h1>{
          UserStore.currentUser ? <>
            Hello:{UserStore.currentUser.attributes.username}
          </> : <>"您尚未验证通行证"</>
        }</h1>
      </>
  );
})

export default Home;

import React from "react";
import {observer} from "mobx-react";
import {useStores} from "../stores";
import Uploader from '../components/Uploader'

const Home = observer(() => {
  const {UserStore} = useStores()
  return (
      <>
        {
          UserStore.currentUser ? <>
            Hello:{UserStore.currentUser.attributes.username}
          </> : <>您尚未验证通行证</>
        }
        <Uploader/>
      </>
  );
})

export default Home;

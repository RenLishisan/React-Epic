import React from 'react'
import {useStores} from "../stores";
import {observer} from "mobx-react";
import styled from "styled-components";

const Tips = styled.div`
  background:rgb(147,181,207);
  padding:10px;
  margin:30px 0;
  width:30%;
  color:rgb(236,78,138);
  border-radius:6px;
`

const Component = observer(({children}) => {
  const {UserStore} = useStores()
  return (
      <>
        {
          UserStore.currentUser ? null : <Tips>{children}</Tips>
        }

      </>
  )
})

export default Component;
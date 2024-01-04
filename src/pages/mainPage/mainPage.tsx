import React, {useEffect} from 'react';
import NavBar from "../../components/navBar/navBar";
import SideBar from "../../components/sideBar/sideBar";
import MainContent from "../../components/mainContent/mainContent";
import s from "./mainPage.module.scss"
import {useCreateEntityMutation} from "../../redux";

 function MainPage () {

   const [createEntity,{data}] = useCreateEntityMutation();

   useEffect(() => {
     createEntity(null).unwrap();
   }, []);

   if(!data){
     return <div>error</div>
   }
   const {id} = data;
   console.log(id)

  return (
      <div >
        <NavBar/>
        <div className={s.main}>
          <SideBar/>
          <MainContent eID={id}/>
        </div>

      </div>
  );
}

export default MainPage;

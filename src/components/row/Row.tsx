import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import s from "./row.module.scss"

import {RowType} from "../../types/rowType";
import EditForm from "../editForm/editForm";
import {useDeleteRowMutation} from "../../redux";


interface PropsTypes {
  currentData: RowType,
  eID:number,
  threeData: any,
  setTreeData: Dispatch<SetStateAction<any[]>>,
  createRow:any;
  currentRow:any
}

function Row({currentData,eID,threeData,setTreeData,createRow,currentRow}: PropsTypes) {

  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [data, setData] = useState<RowType>();
  const [deleteRow] = useDeleteRowMutation();


  useEffect(() => {
    if(currentData) setData(currentData)
  }, []);



  const handeToggleEdit = () => {
    setIsOpenEdit(prevState => !prevState)
  }
  const handleDeleteRow = async ()=>{
    try{
      await deleteRow({eID,rID:currentData.id})
    }catch(e){
      console.log(e,'delete error')
    }
  }

  const handleCreateRow = async () =>{
    await createRow({
      body: {
        "equipmentCosts": 0,
        "estimatedProfit": 0,
        "machineOperatorSalary": 0,
        "mainCosts": 0,
        "materials": 0,
        "mimExploitation": 0,
        "overheads": 0,
        "parentId": currentData.id,
        "rowName": '',
        "salary": 0,
        "supportCosts": 0

      }, eID: eID
    }).unwrap()
    // setTreeData(prevState => [...prevState,data])// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }



  return (
      <div className={s.mainContent}>
        <ul>
          <li className={s.img}>
            <div onClick={()=>handleCreateRow()}> +</div>
            <div onClick={()=> handleDeleteRow()}> -</div>
          </li>
          {
            isOpenEdit ? <EditForm eID={eID}
                                   currentData={currentData}
                                   setData={setData}
                                   setIsOpenEdit={setIsOpenEdit}
                                   isOpenEdit={isOpenEdit}
                                   data={data}
                                   setTreeData={setTreeData}
                                   threeData={threeData}

                />
                :
                <ul
                    onDoubleClick={(e) => handeToggleEdit()}>
                  <li className={s.name}>
                    {data?.rowName}
                  </li>
                  <li>{data?.salary}</li>
                  <li>{data?.equipmentCosts}</li>
                  <li>{data?.overheads}</li>
                  <li>{data?.estimatedProfit}</li>
                </ul>
          }

        </ul>
      </div>
  );
}

export default Row;

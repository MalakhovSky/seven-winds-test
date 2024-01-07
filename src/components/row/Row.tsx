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
  rowId:number,
  createHandeRow:any,
}

function Row({currentData,eID,threeData,setTreeData,rowId,createHandeRow,currentRow}: PropsTypes) {

  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [data, setData] = useState<RowType>();
  const [deleteRow] = useDeleteRowMutation();


  useEffect(() => {
    if(currentData) setData(currentData)
  }, []);



  const handeToggleEdit = () => {   // Меняет строку на инпуты по даблКлику
    setIsOpenEdit(prevState => !prevState)
  }




  // const handleCreateRow = async () =>{
  //   // await createRow({
  //   //   body: {
  //   //     "equipmentCosts": 0,
  //   //     "estimatedProfit": 0,
  //   //     "machineOperatorSalary": 0,
  //   //     "mainCosts": 0,
  //   //     "materials": 0,
  //   //     "mimExploitation": 0,
  //   //     "overheads": 0,
  //   //     "parentId": currentData.id,
  //   //     "rowName": '',
  //   //     "salary": 0,
  //   //     "supportCosts": 0
  //   //
  //   //   }, eID: eID
  //   // }).unwrap() // Запрос
  //   setTreeData(prevState => [...prevState, {}])// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // }
  const handleDeleteRow = async (id:number)=>{
    // try{
    //   await deleteRow({eID,rID:currentData.id})
    // }catch(e){
    //   console.log(e,'delete error')
    // } Запрос
    setTreeData(threeData.filter((row:any)=>row.id !== id))
  }


  return (
      <div className={s.mainContent}>
        <ul>
          <li className={s.img}>
            <div onClick={()=>createHandeRow()}> +</div>
            <div onClick={()=> handleDeleteRow(rowId)}> -</div>
          </li>
          {
            isOpenEdit ? <EditForm eID={eID}
                                   currentData={currentData}
                                   setData={setData}
                                   setIsOpenEdit={setIsOpenEdit}
                                   handeToggleEdit={handeToggleEdit}
                                   data={data}
                                   setTreeData={setTreeData}
                                   threeData={threeData}
                                   rowId={rowId}

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

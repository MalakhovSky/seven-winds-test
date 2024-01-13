import React, {useEffect, useState} from 'react';
import s from "./mainContent.module.scss"
import Row from "../row/Row";
import {useCreateRowMutation, useGetTreeRowsQuery} from "../../redux";
import EditForm from "../editForm/editForm";
import MainContentHeader from "../mainContentHeader/mainContentHeader";


interface PropsType {
  eID: number;
}


function MainContent({eID}: PropsType) {

  const {data:initialTreeData, isLoading} = useGetTreeRowsQuery(eID); // хук на еID
  const [createRow, {isError, data: currentRow}] = useCreateRowMutation(); // хук на создание строки
  const [threeData, setTreeData] = useState<any[]>([]); // данные дерева


  const createHandeRow  = async (rowName:string, equipment:number, profit:number, salary:number, overheads:number,rowId:number)  =>{

    try {
          await createRow({
            body: {
              "equipmentCosts": equipment? equipment: 0,
              "estimatedProfit": profit? profit :0,
              "machineOperatorSalary": 0,
              "mainCosts": 0,
              "materials": 0,
              "mimExploitation": 0,
              "overheads": overheads? overheads: 0,
              "parentId": rowId?rowId : undefined, ///// ВОПРОС
              "rowName": rowName?rowName :0,
              "salary": salary? salary: 0,
              "supportCosts": 0

            }, eID: eID
          }).unwrap()
        } catch {
          return isError
        }
      //
      // setTreeData(threeData.map((obj: any) => (
      //
      //     obj.id === rowId ? {
      //       ...obj,
      //       child:currentRow?.current
      //     } : obj)))
      }
  useEffect(() => {
    if(currentRow){

      // if(rowIdCallback){
      //   setTreeData(threeData.map((obj: any) => (
      //
      //             obj.id === rowIdCallback ? {
      //               ...obj,
      //               child:currentRow?.current
      //             } : obj)))}

      // if(currentRow){

      setTreeData((prevState) => [...prevState,currentRow.current])}

  }, [currentRow]);



  //
  console.log(currentRow,'CURRENT ROW')
  console.log(threeData,'TREEEEEE')

  if(threeData !== undefined){
    return (
        <div className={s.container}>
          <div className={s.header}>
            <div className={s.heading}>
              Строительно-монтажные работы
            </div>
          </div>
          <div className={s.mainContent}>
            <MainContentHeader/>
          </div>
          {threeData.length > 0?
              <ul>
                {
                  threeData?.map((obj,index)=>(

                      <Row
                          key={index}
                            currentData={obj}
                            eID={eID}
                            threeData={threeData}
                            setTreeData={setTreeData}
                            createRow={createRow}
                            currentRow={currentRow}
                          createHandeRow={createHandeRow}
                      rowId={obj.id}/>
                  ))
                }
              </ul>
              :
              <EditForm  createHandeRow={createHandeRow}/>
          }
        </div>
    )
  }else{
    return (<div>
      Error
    </div>)
  }

;
}

export default MainContent;

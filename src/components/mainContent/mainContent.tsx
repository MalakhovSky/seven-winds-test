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


  // useEffect(() => {
  //  if(initialTreeData) setTreeData(initialTreeData);
  // }, [initialTreeData]);

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
      }


  const updateHandeRow = (rowName:string, equipment:number, profit:number, salary:number, overheads:number) =>{


  }

  useEffect(() => {

  }, []);


  // const createHandeRow = async (e: React.KeyboardEvent<HTMLFormElement>,
  //                               name?: string,
  //                               equipment?: number,
  //                               profit?: number,
  //                               salary?: number,
  //                               overheads?: number,
  //                               parentId?:number) => {
  //   try {
  //
  //     // if (e.key === 'Enter') await createRow({
  //     //   body: {
  //     //     "equipmentCosts": equipment,
  //     //     "estimatedProfit": profit,
  //     //     "machineOperatorSalary": 0,
  //     //     "mainCosts": 0,
  //     //     "materials": 0,
  //     //     "mimExploitation": 0,
  //     //     "overheads": overheads,
  //     //     "parentId": parentId,
  //     //     "rowName": name,
  //     //     "salary": salary,
  //     //     "supportCosts": 0
  //     //
  //     //   }, eID: eID
  //     // }).unwrap() Запрос по энтеру
  //     console.log('created----------')
  //
  //   } catch {
  //     return isError
  //   }
  // }
  //
  useEffect(() => {
    if(currentRow) {
          setTreeData((prevState) => [...prevState,currentRow.current])} // иначе 1 элемент undefined,погуглить
  }, [currentRow]);

  //
  console.log(currentRow?.current,'CURRENT ROW')
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
              <div>
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
              </div>
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

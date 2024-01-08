import React, {useEffect, useState} from 'react';
import s from './editFrom.module.scss'
import {useUpdateRowMutation} from "../../redux";

interface PropsType {

}

function EditForm({
                    currentRow,
                    createHandeRow,
                    rowId,
                    eID,
                    currentData,
                    setData,
                    data,
                    handeToggleEdit,
                    setIsOpenEdit,
                    isOpenEdit,
                    setTreeData,
                    threeData
                  }: any) {
  const [rowName, setRowName] = useState<string>('');
  const [salary, setSalary] = useState<number>(0);
  const [equipment, setEquipment] = useState<number>(0);
  const [overheads, setOverheads] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  const [rowData, setRowData] = useState({});
  const [updateRow, {data: updatedData}] = useUpdateRowMutation();


  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowName(e.target.value)
  }
  const changeSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(+e.target.value)
  }
  const changeEquipment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEquipment(+e.target.value)
  }
  const changeOverheads = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOverheads(+e.target.value)
  }
  const changeProfit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfit(+e.target.value)
  }

  const onEnterCreate = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      createHandeRow(rowName, equipment, profit, salary, overheads,rowId)
      console.log(threeData)
    }
  }
  const onEnterUpdate = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      await updateRow({
            body: {
              "equipmentCosts": equipment,
              "estimatedProfit": profit,
              "machineOperatorSalary": 0,
              "mainCosts": 0,
              "materials": 0,
              "mimExploitation": 0,
              "overheads": overheads,
              "rowName": rowName,
              "salary": salary,
              "supportCosts": 0
            }, eID: eID, rID: rowId
        // currentData?.id
          })
      setTreeData(threeData.map((obj: any) => (
          obj.id === rowId ? {
            ...obj, rowName: rowName,
            salary: salary,
            equipmentCosts: equipment,
            overheads: overheads,
            estimatedProfit: profit
          } : obj
      )))
      setIsOpenEdit(false)

    }

  }
  // const onEnterCreate = (e: React.KeyboardEvent<HTMLFormElement>) => {
  //   if (e.key === 'Enter') createHandeRow(name, equipment, profit, salary, overheads)
  // }

  // const onEnterHandleUpdate = async (e: React.KeyboardEvent<HTMLFormElement>,
  //                                    name: string,
  //                                    equipment: number,
  //                                    profit: number,
  //                                    salary: number,
  //                                    overheads: number,
  // ) => {
  // if (e.key === 'Enter') {
  //   await updateRow({
  //     body: {
  //       "equipmentCosts": equipment,
  //       "estimatedProfit": profit,
  //       "machineOperatorSalary": 0,
  //       "mainCosts": 0,
  //       "materials": 0,
  //       "mimExploitation": 0,
  //       "overheads": overheads,
  //       "rowName": name,
  //       "salary": salary,
  //       "supportCosts": 0
  //     }, eID: eID, rID: currentData?.id
  //   })
  //     console.log('UPDATED=========')
  //     setIsOpenEdit(!isOpenEdit);
  //   }
  // }
  // useEffect(() => {
  //   if (updatedData)
  //     setData(updatedData.current)
  // }, [updatedData]);

  // onKeyDown={} к тэгу ФОРМ
  return (
      <>
        <form onKeyDown={!threeData ?
            (e) => onEnterCreate(e)
            :
            (e) => onEnterUpdate(e)}
              className={s.form}>
          <input onChange={(e) => changeName(e)} value={rowName} type="text" className={s.name}/>
          <input onChange={(e) => changeSalary(e)} value={salary} type="text"/>
          <input onChange={(e) => changeEquipment(e)} value={equipment} type="text"/>
          <input onChange={(e) => changeOverheads(e)} value={overheads} type="text"/>
          <input onChange={(e) => changeProfit(e)} value={profit} type="text"/>
        </form>
      </>

  );
}

export default EditForm;

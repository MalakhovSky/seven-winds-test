import React, {useEffect, useState} from 'react';
import s from './editFrom.module.scss'
import {useUpdateRowMutation} from "../../redux";

interface PropsType {

}

function EditForm({createHandeRow, eID, currentData, setData,data, setIsOpenEdit, isOpenEdit,setTreeData,threeData}: any) {
  const [name, setName] = useState<string>('');
  const [salary, setSalary] = useState<number>(0);
  const [equipment, setEquipment] = useState<number>(0);
  const [overheads, setOverheads] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  const [updateRow, {data: updatedData}] = useUpdateRowMutation();


  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
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
    if (e.key === 'Enter') createHandeRow(name, equipment, profit, salary, overheads)
  }
  // const onEnterCreate = (e: React.KeyboardEvent<HTMLFormElement>) => {
  //   if (e.key === 'Enter') createHandeRow(name, equipment, profit, salary, overheads)
  // }

  const onEnterHandleUpdate = async (e: React.KeyboardEvent<HTMLFormElement>,
                                     name: string,
                                     equipment: number,
                                     profit: number,
                                     salary: number,
                                     overheads: number,
  ) => {
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
          "rowName": name,
          "salary": salary,
          "supportCosts": 0
        }, eID: eID, rID: currentData?.id
      })
      console.log('UPDATED=========')
      setIsOpenEdit(!isOpenEdit);
    }
  }
  useEffect(() => {
    if (updatedData)
      setData(updatedData.current)
  }, [updatedData]);


  return (
      <>
        <form onKeyDown={data ?
            (e) => onEnterHandleUpdate(e, name, equipment, profit, salary, overheads)
            :
            (e) => createHandeRow(e,name, equipment, profit, salary, overheads)
        } className={s.form}>
          <input onChange={(e) => changeName(e)} value={name} type="text" className={s.name}/>
          <input onChange={(e) => changeSalary(e)} value={salary} type="text"/>
          <input onChange={(e) => changeEquipment(e)} value={equipment} type="text"/>
          <input onChange={(e) => changeOverheads(e)} value={overheads} type="text"/>
          <input onChange={(e) => changeProfit(e)} value={profit} type="text"/>
        </form>
      </>

  );
}

export default EditForm;

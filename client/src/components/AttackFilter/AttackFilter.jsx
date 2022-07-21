import React from 'react'
import { useDispatch } from 'react-redux'
import { filterAttack } from '../../redux/actions'
const AttackFilter = () => {
    const dispatch = useDispatch()
    const moreOrLessAttack = (e) => {
        dispatch(filterAttack(e.target.value))
    }


  return (
    <div>
        <select onChange={(e) => {moreOrLessAttack(e)}}>
            <option>Attack</option>
            <option value="more">More Attack</option>
            <option value="less">Less Attack</option>
        </select>
    </div>
  )
}

export default AttackFilter
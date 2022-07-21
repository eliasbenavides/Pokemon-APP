import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTypes, filterByTypes } from '../../redux/actions'
const TypesFilter = () => {
    const dispatch = useDispatch()
    const types = useSelector(state => state.types)
    useEffect(() => {
      dispatch(getAllTypes())
    }, [dispatch])



    const changeFilter = (e) =>{
      dispatch(filterByTypes(e.target.value))
    }

  return (
    <div>
        <select onChange={(e) => {changeFilter(e)}}>
            <option>Types</option>
            {types && types.map(type => (
                <option 
                    value={type.name}
                    key={type.id}
                >{type.name}</option>
            ))}
        </select>
    </div>
  )
}

export default TypesFilter  
import "./list.css"
import Sidebar from "../../sidebar/Sidebar"
import Datatable from "../datatable/Datatable"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        
        <Datatable/>
      </div>
    </div>
  )
}

export default List
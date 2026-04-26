import { Provider } from "react-redux"
import Upper from "../Upper"
import ChartStore from "../../redux/store";
import AuthStore from "../../store"
import Lower from "../Lower"

const Dashboard = () => {
  return (
    <>
      <Provider store={ChartStore}>

        <Upper />
      </Provider>
        <Provider store={AuthStore}>
          <Lower />
        </Provider>
    </>
  )
}

export default Dashboard
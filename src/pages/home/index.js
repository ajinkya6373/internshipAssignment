import "./home.css"
import { CardComponent } from "../../components"
import { Row, Col } from 'antd';
import { useEffect} from "react";
import axios from "axios";
import { useStateValue } from '../../context/userContext';
export default function HomePage() {
    const [{ users}, dispatch] = useStateValue()
    useEffect(() => {
        const fetchUser = () => {
            axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
                dispatch({type:"SET_USERS",payload:res.data})
            })
        }
        fetchUser();
    }, [dispatch])
    return (
            <Row >
                {users.length === 0 ?
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                    : users?.map((i) => (
                        <Col xs={24} sm={8} md={8} lg={8} xl={6} key={i.id}>
                            <CardComponent  data = {i}/>
                        </Col>
                    ))
                }
            </Row>
      

    )
}

import { useParams } from "react-router-dom";

interface RouteParams {
    coinId: string;
}

function Coin() {
    // 인터페이스를 설정하지 않고 아래와같이 설정 가능
    // const {coinId} = useParams<{coinId:string}>();
    // 인터페이스를 설정하면 아래와 같이 사용하면 되나, react-router-dom v6부터는 타입값이 없어도 가능
    // const {coinId} = useParams<RouteParams>();
    const {coinId} = useParams();

    return <h1>Coin: {coinId}</h1>;
}

export default Coin;